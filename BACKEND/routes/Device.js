const router = require("express").Router();
const fs = require('fs');
const path = require('path');
const Device = require("../models/Device");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET
});

// Route for adding a device
router.route("/add").post(upload.single('image'), async (req, res) => {
    const { deviceName, address, phone, serialNo, type, status } = req.body;

    try {
        // Upload image to Cloudinary
        const uploadRes = await cloudinary.uploader.upload(req.file.path, { folder: "devices" });

        // Get the image URL from Cloudinary response
        const imageUrl = uploadRes.secure_url;

        // Create new device with Cloudinary image URL
        const newDevice = new Device({
            deviceName,
            address,
            phone,
            serialNo,
            type,
            status,
            imageUrl
        });

        await newDevice.save();
        res.json({ status: "Device added", imageUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error adding device" });
    }
});

// Route for getting all devices
router.route("/").get((req, res) => {
    Device.find().then((devices) => {
        res.json(devices);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error fetching devices" });
    });
});

// Route for updating a device
router.route("/update/:id").put(upload.single('image'), async (req, res) => {
    const deviceId = req.params.id;
    const { deviceName, address, phone, serialNo, type, status } = req.body;
    let imageUrl;

    try {
        // Check if an image is included in the update request
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        // Update the device with new fields
        const updateFields = {
            deviceName,
            address,
            phone,
            serialNo,
            type,
            status
        };
        if (imageUrl) {
            updateFields.imageUrl = imageUrl;
        }

        await Device.findByIdAndUpdate(deviceId, updateFields);
        res.status(200).send({ status: "Device updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating device" });
    } finally {
        // Delete the uploaded image from the local storage
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
});

// Route for deleting a device
router.route("/delete/:id").delete(async (req, res) => {
    const deviceId = req.params.id;

    try {
        await Device.findByIdAndDelete(deviceId);
        res.status(200).send({ status: "Device deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting device" });
    }
});

// Route for getting a device by ID
router.route("/get/:id").get(async (req, res) => {
    const deviceId = req.params.id;

    try {
        const device = await Device.findById(deviceId);
        res.status(200).send({ status: "Device fetched", device });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching device" });
    }
});

//check serial number exists
router.get('/checkSerial/:serialNumber', async (req, res) => {
    const serialNumber = req.params.serialNumber;

    try {
        const device = await Device.findOne({ serialNo: serialNumber });

        if (device) {
            return res.json({ exists: true, message: "Serial number already exists" });
        } else {
            return res.json({ exists: false, message: "Serial number is unique" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
