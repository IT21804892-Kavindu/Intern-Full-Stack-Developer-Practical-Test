import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";

function AddDevice() {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [deviceName, setDeviceName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [serialNo, setSerialNo] = useState("");
    const [serialError, setSerialError] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");

    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewImage(URL.createObjectURL(file)); // Preview image
    };

    const validatePhoneNumber = () => {
        if (!phone.match(/^\d{10}$/)) {
            setPhoneError("Invalid Phone number format");
        } else {
            setPhoneError("");
        }
    };

    const validateSerialNumber = async () => {
        try {
            const response = await axios.get(`http://localhost:4011/device/checkSerial/${serialNo}`);
            if (response.data.exists) {
                setSerialError("Serial number already exists.");
            } else {
                setSerialError("");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const sendData = async (e) => {
        e.preventDefault();
        validatePhoneNumber();
        await validateSerialNumber();
        if (phoneError || serialError) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("deviceName", deviceName);
            formData.append("address", address);
            formData.append("phone", phone);
            formData.append("serialNo", serialNo);
            formData.append("type", type);
            formData.append("status", status);

            const response = await axios.post("http://localhost:4011/device/add", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log("Device added successfully!");
                alert("Device added successfully!")
                // Reset fields after submission
                setImage(null);
                setPreviewImage(null);
                setDeviceName("");
                setAddress("");
                setPhone("");
                setSerialNo("");
                setType("");
                setStatus("");
                navigate(-1);
            } else {
                console.error("Failed to add device");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="container" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Add New Device</div><br />
                            <div className="card-body">
                                <form onSubmit={sendData}>
                                    <div className="form-group">
                                        <label htmlFor="deviceName" className="form-label" style={{ textAlign: 'left', display: 'block' }}>Location Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="deviceName"
                                            placeholder="Enter location name"
                                            value={deviceName}
                                            onChange={(e) => setDeviceName(e.target.value)}
                                            required
                                        />
                                    </div><br />
                                    <div className="form-group">
                                        <label htmlFor="address" style={{ textAlign: 'left', display: 'block' }}>Address:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder="Enter address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        />
                                    </div><br />
                                    <div className="form-group">
                                        <label htmlFor="phone" style={{ textAlign: 'left', display: 'block' }}>Phone:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Enter phone number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            onBlur={validatePhoneNumber}
                                            required
                                        />
                                        {phoneError && <span style={{ color: 'red' }}>{phoneError}</span>}
                                    </div><br />
                                    <div className="form-group">
                                        <label htmlFor="serialNo" style={{ textAlign: 'left', display: 'block' }}>Serial No:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="serialNo"
                                            placeholder="Enter serial number"
                                            value={serialNo}
                                            onChange={(e) => setSerialNo(e.target.value)}
                                            onBlur={validateSerialNumber}
                                            required
                                        />
                                        {serialError && <span style={{ color: 'red' }}>{serialError}</span>}
                                    </div><br />

                                    <div className="form-group">
                                        <label htmlFor="type" style={{ textAlign: 'left', display: 'block' }}>Type:</label>
                                        <select
                                            className="form-control"
                                            id="type"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                            required
                                        >
                                            <option value="">Select type</option>
                                            <option value="pos">POS</option>
                                            <option value="kiosk">Kiosk</option>
                                            <option value="signage">Signage</option>
                                        </select>
                                    </div><br />


                                    <div className="form-group">
                                        <label htmlFor="status" style={{ textAlign: 'left', display: 'block' }}>Status:</label>
                                        <select
                                            className="form-control"
                                            id="status"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            required
                                        >
                                            <option value="">Select status</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div><br />

                                    <div className="form-group">
                                        <label htmlFor="image" style={{ textAlign: 'left', display: 'block' }}>Image:</label><br />
                                        <input
                                            type="file"
                                            className="form-control-file"
                                            id="image"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            required
                                        />
                                    </div><br />
                                    {previewImage && (
                                        <div>
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                style={{ maxWidth: "300px", maxHeight: "300px" }}
                                            />
                                        </div>
                                    )}<br />
                                    <button type="submit" className="btn rounded-pill" style={{ width: '200px', background: '#737373', color: 'white' }}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddDevice;
