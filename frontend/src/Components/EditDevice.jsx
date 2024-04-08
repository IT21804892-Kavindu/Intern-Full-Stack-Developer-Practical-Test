import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function EditDevice() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        deviceName: "",
        address: "",
        phone: "",
        phoneError: "",
        serialNo: "",
        type: "",
        status: "",
        image: null,
    });

    useEffect(() => {
        const fetchDevice = async () => {
            try {
                const response = await axios.get(`http://localhost:4011/device/get/${id}`);
                const { device } = response.data;
                setFormData({
                    deviceName: device.deviceName,
                    address: device.address,
                    phone: device.phone,
                    serialNo: device.serialNo,
                    type: device.type,
                    status: device.status,
                    image: null, // Initially set to null as we don't retrieve image data here
                    phoneError: "",
                });
            } catch (error) {
                console.error("Error fetching device:", error);
            }
        };

        fetchDevice();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        validatePhoneNumber();
        if (formData.phoneError) {
            return;
        }
        try {
            const formDataWithImage = new FormData();
            formDataWithImage.append("deviceName", formData.deviceName);
            formDataWithImage.append("address", formData.address);
            formDataWithImage.append("phone", formData.phone);
            formDataWithImage.append("serialNo", formData.serialNo);
            formDataWithImage.append("type", formData.type);
            formDataWithImage.append("status", formData.status);
            formDataWithImage.append("image", formData.image);

            await axios.put(`http://localhost:4011/device/update/${id}`, formDataWithImage, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Device updated successfully");
            navigate(-1); // Navigate to previous page
        } catch (error) {
            console.error("Error updating device:", error);
        }
    };

    const validatePhoneNumber = () => {
        if (!formData.phone.match(/^\d{10}$/)) {
            setFormData({ ...formData, phoneError: "Invalid Phone number format" });
        } else {
            setFormData({ ...formData, phoneError: "" });
        }
    };

    return (
        <div>
            <Header />
            <div className="container" style={{ marginTop: "150px" }}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Device</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="deviceName" style={{ textAlign: 'left', display: 'block' }}>Device Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="deviceName"
                                            placeholder="Enter device name"
                                            value={formData.deviceName}
                                            onChange={(e) => setFormData({ ...formData, deviceName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address" style={{ textAlign: 'left', display: 'block' }}>Address:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder="Enter address"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone" style={{ textAlign: 'left', display: 'block' }}>Phone:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Enter phone number"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            onBlur={validatePhoneNumber}
                                            required
                                        />
                                        {formData.phoneError && <span style={{ color: 'red' }}>{formData.phoneError}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="serialNo" style={{ textAlign: 'left', display: 'block' }}>Serial No:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="serialNo"
                                            placeholder="Enter serial number"
                                            value={formData.serialNo}
                                            onChange={(e) => setFormData({ ...formData, serialNo: e.target.value })}
                                            required
                                            disabled
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="type" style={{ textAlign: 'left', display: 'block' }}>Type:</label>
                                        <select
                                            className="form-control"
                                            id="type"
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            required
                                        >
                                            <option value="">Select type</option>
                                            <option value="pos">POS</option>
                                            <option value="kiosk">Kiosk</option>
                                            <option value="signage">Signage</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status" style={{ textAlign: 'left', display: 'block' }}>Status:</label>
                                        <select
                                            className="form-control"
                                            id="status"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            required
                                        >
                                            <option value="">Select status</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                    {/* <div className="form-group">
                                        <label htmlFor="image">Image:</label>
                                        <input
                                            type="file"
                                            className="form-control-file"
                                            id="image"
                                            accept="image/*"
                                            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                        />
                                    </div> */}
                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default EditDevice;
