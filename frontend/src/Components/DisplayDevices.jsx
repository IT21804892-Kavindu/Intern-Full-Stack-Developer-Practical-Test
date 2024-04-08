import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayDevicePopup from "./DisplayDevicePopup";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function DisplayDevices() {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();
  const [devicePopupOpen, setDevicePopupOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const openDevicePopup = (deviceId) => {
    setSelectedDeviceId(deviceId);
    setDevicePopupOpen(true);
  };

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("http://localhost:4011/device/");
        setDevices(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDevices();
  }, []);

  const deleteDevice = async (deviceId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this device?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4011/device/delete/${deviceId}`);
      // Remove the deleted device from the state
      setDevices(devices.filter((device) => device._id !== deviceId));
      console.log("Device deleted successfully");
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: '150px' }}>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="d-flex justify-content-between align-items-center">
              <div style={{ padding: '10px', marginBottom: '10px' }}>
                <p style={{ color: '#737373', fontSize: '24px', fontWeight: 'bold', marginBottom: '5px', cursor: 'pointer', letterSpacing: '5px' }}>STORED DEVICES</p>
              </div>
              <button className="btn rounded-pill" style={{ width: '200px', background: '#737373', color: 'white' }}>
                <span onClick={() => navigate('add')}><b>Add Device</b></span>
              </button>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              {devices.map((device) => (
                <div key={device._id} className="mb-4">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="card h-100" style={{ backgroundColor: '#E4E4E4' }}>
                        <div className="card-body d-flex flex-column justify-content-between">
                          {/* Display image */}
                          {device.imageUrl && (
                            <img
                              src={device.imageUrl}
                              alt={device.deviceName}
                              style={{ maxWidth: "100%", maxHeight: "300px", cursor: "pointer" }}
                              onClick={() => openDevicePopup(device._id)}
                            />
                          )}

                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">

                      <div className="card h-100" style={{ backgroundColor: '#E4E4E4' }}>
                        <div className="card-body">
                          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Details of the Location</p><br />
                          <p>Location Name: {device.deviceName}</p>
                          <p>Address: {device.address}</p>
                          <p>Phone: {device.phone}</p><br />
                          <p style={{ fontSize: '10px', fontWeight: 'bold' }}>Click Image to view device details</p>

                          <div>
                            <button type="button" className="btn btn-success" style={{ marginRight: '10px' }}>
                              <span onClick={() => navigate(`edit/${device._id}`)}><b>Edit Device</b></span>
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => deleteDevice(device._id)} style={{ marginLeft: '10px' }}>
                              <b>Delete Device</b>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {devicePopupOpen && (
          <DisplayDevicePopup onClose={() => setDevicePopupOpen(false)} deviceId={selectedDeviceId} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DisplayDevices;
