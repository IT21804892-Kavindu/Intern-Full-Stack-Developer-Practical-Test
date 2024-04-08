const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    deviceName:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    serialNo:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    image: {
        data: Buffer, 
        contentType: String
    },
    imageUrl: { 
        type: String, 
        required: true,
    }
});

const Device = mongoose.model("Device", DeviceSchema);

module.exports = Device;