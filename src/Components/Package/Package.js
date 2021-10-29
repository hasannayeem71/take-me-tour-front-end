import React from "react";
import { Card, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import "./Package.css";
const Package = ({ pack }) => {
  const { title, img, _id, description } = pack; //pack for single package
  const history = useHistory();
  return (
    <Col>
      <Card className="home-card">
        <img src={img} alt="" className="home-page-card-img" />
        <h1>{title}</h1>
        <p className="text-left">{description?.slice(0, 50)}</p>
        <button onClick={() => history.push(`/package/book/${_id}`)}>
          Book Now
        </button>
      </Card>
    </Col>
  );
};

export default Package;
