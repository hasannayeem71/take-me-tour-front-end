import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import CustomLoader from "../CustomLoader/CustomLoader";
import "./MyPackage.css";
const MyPackage = () => {
  const [myPackages, setMyPackage] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    document.title = "My-Packages";
    axios
      .post(
        `https://take-me-tour.herokuapp.com/user/package?email=${user.email}`
      )
      .then((res) => {
        setMyPackage(res.data);
      });
  }, [user.email]);
  //user cancel request handle here
  const handleCancel = (id) => {
    const assurance = window.confirm("Are you sure to cancel");
    if (!assurance) {
      return;
    }
    axios
      .delete(`https://take-me-tour.herokuapp.com/user/package/delete/${id}`)
      .then((res) => {
        if (res.data.acknowledged) {
          alert("Successfully Canceled");
          setMyPackage(myPackages.filter((pk) => pk._id !== id));
        }
      });
  };
  if (myPackages.length === 0) {
    return <CustomLoader />;
  }
  return (
    <div className="container mb-5">
      <h2 className="mb-3">My Packages</h2>
      <div>
        <Row xs={1} md={2} className="g-5">
          {myPackages.map((mypk) => (
            <div key={mypk._id}>
              <Col className="my-package-card">
                <Card>
                  <img src={mypk.img} alt="" className="" />
                  <div className="detail-in-my-package">
                    <h4>{mypk.eventTitle}</h4>
                    <small>Status: {mypk.status}</small>
                    <br />
                    <button onClick={() => handleCancel(mypk._id)}>
                      Cancel
                    </button>
                  </div>
                </Card>
              </Col>
            </div>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default MyPackage;
