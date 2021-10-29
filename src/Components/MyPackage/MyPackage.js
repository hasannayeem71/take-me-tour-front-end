import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import CustomLoader from "../CustomLoader/CustomLoader";

const MyPackage = () => {
  const [myPackages, setMyPackage] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    document.title = "My-Packages";
    axios
      .post(`http://localhost:5000/user/package?email=${user.email}`)
      .then((res) => {
        setMyPackage(res.data);
      });
  }, [user.email]);
  const handleCancel = (id) => {
    const assurance = window.confirm("Are you sure to cancel");
    if (!assurance) {
      return;
    }
    axios
      .delete(`http://localhost:5000/user/package/delete/${id}`)
      .then((res) => {
        if (res.data.acknowledged) {
          alert("Successfully deleted");

          setMyPackage(myPackages.filter((pk) => pk._id !== id));
        }
      });
  };
  if (myPackages.length === 0) {
    return <CustomLoader />;
  }
  return (
    <div className="container">
      <h2>My Packages</h2>
      <div>
        <Row xs={1} md={2} className="g-4">
          {myPackages.map((mypk) => (
            <div key={mypk._id}>
              <Col className="d-flex">
                <img src={mypk.img} alt="" />
                <div>
                  <h4>{mypk.eventTitle}</h4>
                  <small>{mypk.status}</small>
                  <button onClick={() => handleCancel(mypk._id)}>Cancel</button>
                </div>
              </Col>
            </div>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default MyPackage;
