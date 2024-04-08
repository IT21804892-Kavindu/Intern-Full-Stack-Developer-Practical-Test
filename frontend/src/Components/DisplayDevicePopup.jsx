import React, { useState, useEffect } from "react";
import axios from "axios";

function DisplayDevicePopup({ onClose, deviceId }) {
    const [device, setDevice] = useState(null);

    useEffect(() => {
        const fetchDevice = async () => {
            try {
                const response = await axios.get(`http://localhost:4011/device/get/${deviceId}`);
                setDevice(response.data.device);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchDevice();
    }, [deviceId]);

    return (
        <div className="popupk"
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999, paddingTop: '150px' }}>

            <div className="popupInnerk"
                style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', maxWidth: '700px', width: '100%', textAlign: 'center', }}>

                <div className="popupk" style={{ position: 'relative' }}>
                    <button className="closeBtnk" type="button" aria-label="Close" onClick={onClose} style={{ position: 'absolute', top: '-20px', right: '-15px', zIndex: '1', background: 'none', border: 'none', fontSize: '1.5rem', color: '#000', cursor: 'pointer', outline: 'none' }}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                {device && (
                    <div>
                        <img
                            src={device.imageUrl}
                            alt={device.deviceName}
                            style={{ maxWidth: "100%", maxHeight: "300px" }}
                        />
                        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Details of the Device</p><br />
                        <p>Serial No: {device.serialNo}</p>
                        <p>Type: {device.type}</p>
                        <p>Status: {device.status}</p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default DisplayDevicePopup;
