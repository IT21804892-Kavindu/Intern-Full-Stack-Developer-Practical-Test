import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import logo from './img/device.png';

export default function Header() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: "#737373" }}>
      <div className="container container-fluid">
      <Link to={'#'} className="navbar-brand">
      <img src={logo} alt="Logo" width="100" height="100" />
      </Link>
        <center>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
                <b><a className="nav-link active" aria-current="page" href="#" style={{fontSize: '30px', color: 'white'}}>DEVICE NEST</a></b>
              </li><span style={{ marginRight: "600px" }}></span>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/" style={{fontSize: '20px', color: 'white', marginTop: '10px'}}>HOME</a>
              </li><span style={{ marginRight: "50px" }}></span>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" style={{fontSize: '20px', color: 'white', marginTop: '10px'}}>ABOUT</a>
              </li><span style={{ marginRight: "10px" }}></span>
            </ul>
          </div>
        </center>
        <div>
          <span style={{ marginRight: "10px" }}></span>
          <Link to={"#"} type='button' className="btn rounded-pill" style={{ background:'#737373', color:'white', fontSize: '3 0px' }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
</div>
  )
}
