import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import CustomLoader from "../CustomLoader/CustomLoader";
import Package from "../Package/Package";

const Home = () => {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    document.title = "Home";
    axios
      .get("https://take-me-tour.herokuapp.com/packages")
      .then((res) => setPackages(res.data));
  }, []);
  if (packages.length === 0) {
    return <CustomLoader />;
  }
  return (
    <div className="container mb-3">
      <div className="mt-5 mb-4">
        <img
          src="https://indiater.com/wp-content/uploads/2019/02/free-travel-facebook-timeline-cover-banner-psd-template.jpg"
          alt=""
          className="w-100"
        />
      </div>
      <div>
        <h1 className="mb-5">Best-selling Holiday Destinations</h1>
        <Row xs={1} md={4} className="g-4 ">
          {
            packages.map((pack) => (
              <Package key={pack._id} pack={pack} />
            )) //pack for single package
          }
        </Row>
      </div>
    </div>
  );
};

export default Home;
