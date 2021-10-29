import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import "./AddPackage.css";
const AddPackage = () => {
  const titleRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();
  const imgRef = useRef();
  const priceRef = useRef();
  const [smShow, setSmShow] = useState(false);
  const [message, setMessage] = useState("");
  //change title
  useEffect(() => {
    document.title = "Add-event";
  }, []);

  const handleSubmit = () => {
    if (
      titleRef.current.value === "" ||
      dateRef.current.value === "" ||
      descriptionRef.current.value === "" ||
      imgRef.current.value === "" ||
      priceRef.current.value === ""
    ) {
      setMessage("Fill all the field"); // if input are not fill then show a error message
      setSmShow(true);
    } else {
      //set all the data to a object
      const event = {
        title: titleRef.current.value,
        date: dateRef.current.value,
        description: descriptionRef.current.value,
        img: imgRef.current.value,
        price: priceRef.current.value,
      };

      //post this data to api
      axios
        .post("https://take-me-tour.herokuapp.com/packages", event)
        .then((res) => {
          if (res.data.acknowledged) {
            setMessage("Package Successfully added");
            setSmShow(true);
            titleRef.current.value = "";
            dateRef.current.value = "";
            descriptionRef.current.value = "";
            imgRef.current.value = "";
            priceRef.current.value = "";
          }
        });
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Col className="col-lg-9 col-sm-10 add-container ">
        <h3>Add New Package</h3>
        <div className="mt-3 p-5 bg-white rounded">
          <Row className="g-4">
            <Col md>
              <FloatingLabel
                controlId="floatingInputGrid"
                className="mt-4"
                label="Event title">
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  ref={titleRef}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel
                className="mt-4"
                controlId="floatingInputGrid"
                label="Event Date">
                <Form.Control
                  type="date"
                  placeholder="name@example.com"
                  ref={dateRef}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md>
              <textarea
                type="text"
                ref={descriptionRef}
                required
                placeholder="Description"
              />
            </Col>
            <Col md>
              <FloatingLabel
                className="mt-4"
                controlId="floatingInputGrid"
                label="Banner image url">
                <Form.Control
                  type="text"
                  placeholder="IMG URL"
                  ref={imgRef}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel
                className="mt-4"
                controlId="floatingInputGrid"
                label="Price">
                <Form.Control
                  type="number"
                  placeholder="price"
                  ref={priceRef}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <button className="submit-btn" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </Col>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">SET EVENT</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
    </div>
  );
};

export default AddPackage;
