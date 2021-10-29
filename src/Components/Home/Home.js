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
      .get("http://localhost:5000/packages")
      .then((res) => setPackages(res.data));
  }, []);
  if (packages.length === 0) {
    return <CustomLoader />;
  }
  return (
    <div className="container">
      aikhane slider bosbe
      <div>
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
