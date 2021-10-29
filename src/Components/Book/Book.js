import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import CustomLoader from "../CustomLoader/CustomLoader";
import "./Book.css";
const Book = () => {
  const { id } = useParams();
  const uri = `https://take-me-tour.herokuapp.com/packages/${id}`;
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
      status: "Pending",
      img: event.img,
    };
    axios
      .post("https://take-me-tour.herokuapp.com/user/package/book", data)
      .then((res) => {
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
    <div className="container  pt-5">
      <Row xs={1} md={2} className="g-4">
        <Col className="booking-details">
          <h2>{event.title}</h2>
          <img src={event.img} alt="" className="img-fluid" />
          <p>{event.description}</p>
          <p>Price : ${event.price}</p>
        </Col>
        <Col>
          <h2>Booking information</h2>
          <form onSubmit={handleOrder} className=" booking-form">
            <div className="single-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={user.displayName}
                readOnly
              />
            </div>
            <div className="single-input">
              <label htmlFor="email">Email</label>
              <input type="text" value={user.email} readOnly />
            </div>
            <div className="single-input">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                ref={phoneRef}
                required
              />
            </div>
            <div className="single-input">
              <label htmlFor="ename">Event</label>
              <input
                type="text"
                name="ename"
                placeholder="Event name"
                value={event.title || ""}
                readOnly
              />
            </div>
            <div className="single-input">
              <label htmlFor="price">Price</label>
              <input
                name="price"
                type="text"
                placeholder="price"
                value={event.price || ""}
                readOnly
              />
            </div>
            <div className="single-input">
              <button type="submit" value="submit">
                Confirm Booking
              </button>
            </div>
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
