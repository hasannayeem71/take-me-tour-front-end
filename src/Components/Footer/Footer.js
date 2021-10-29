import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div>
      <div className="footer ">
        <div className="contain">
          <div className="col">
            <h1>make My trip</h1>
            <ul>
              <li>About</li>
              <li>Mission</li>
              <li>Services</li>
              <li>Social</li>
              <li>Get in touch</li>
            </ul>
          </div>
          <div className="col">
            <h1>Package</h1>
            <ul>
              <li>About</li>
            </ul>
          </div>
          <div className="col">
            <h1>Accounts</h1>
            <ul>
              <li>Login</li>
              <li>Edit Now</li>
              <li>My Package</li>
            </ul>
          </div>

          <div className="col social">
            <h1>Social</h1>
            <ul>
              <li>
                <img
                  alt="fb"
                  src="https://svgshare.com/i/5fq.svg"
                  width="32"
                  style={{ width: "32px" }}
                />
              </li>
              <li>
                <img
                  alt="fb"
                  src="https://svgshare.com/i/5eA.svg"
                  width="32"
                  style={{ width: "32px" }}
                />
              </li>
              <li>
                <img
                  alt="fb"
                  src="https://svgshare.com/i/5f_.svg"
                  width="32"
                  style={{ width: "32px" }}
                />
              </li>
            </ul>
          </div>
          <div className="col">
            <img
              src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/logo@2x.png"
              alt=""
            />
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
