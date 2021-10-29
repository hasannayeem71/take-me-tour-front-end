import React from "react";
import { Card, Col } from "react-bootstrap";
import { useHistory } from "react-router";
const Package = ({ pack }) => {
  const { title, img, _id } = pack; //pack for single package
  const history = useHistory();
  return (
    <Col>
      <Card>
        <img src={img} alt="" />
        <h1>{title}</h1>
        <button onClick={() => history.push(`/package/book/${_id}`)}>
          Book Now
        </button>
      </Card>
    </Col>
  );
};

export default Package;
