import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import CustomLoader from "../CustomLoader/CustomLoader";

const Book = () => {
  const { id } = useParams();
  const uri = `http://localhost:5000/packages/${id}`;
  const [event, setEvent] = useState({});
  const phoneRef = useRef();
  const { user } = useAuth();
  const [smShow, setSmShow] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  useEffect(() => {
    document.title = "Booking-package";
    axios.get(uri).then((res) => setEvent(res.data));
  }, [uri]);
  //handle package order
  const handleOrder = (e) => {
    const data = {
      bookingDate: date,
      userName: user.displayName,
      userEmail: user.email,
      phoneNumber: phoneRef.current.value,
      eventTitle: event.title,
      status: "pending",
      img: event.img,
    };
    axios.post("http://localhost:5000/user/package/book", data).then((res) => {
      if (res.data.acknowledged) {
        setMessage("Package Successfully Added");
        setSmShow(true);
        phoneRef.current.value = "";
      }
    });
    e.preventDefault();
  };
  if (!event._id) {
    return <CustomLoader />;
  }
  return (
    <div className="container">
      <Row xs={1} md={2} className="g-4">
        <Col>
          <img src={event.img} alt="" />
          <p>{event.title}</p>
          <p>{event.price}</p>
        </Col>
        <Col>
          <h4>Booking information</h4>
          <form onSubmit={handleOrder} className="d-flex flex-column">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={user.displayName} readOnly />
            <label htmlFor="email">Email</label>
            <input type="text" value={user.email} readOnly />
            <input
              type="number"
              placeholder="Phone Number"
              ref={phoneRef}
              required
            />
            <label htmlFor="ename">Event Name</label>
            <input
              type="text"
              name="ename"
              placeholder="Event name"
              value={event.title || ""}
              readOnly
            />
            <input
              type="text"
              placeholder="price"
              value={event.price || ""}
              readOnly
            />
            <input type="submit" value="submit" />
          </form>
        </Col>
      </Row>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Make my trip
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
          <button onClick={() => history.push("/")}>back to home</button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Book;
