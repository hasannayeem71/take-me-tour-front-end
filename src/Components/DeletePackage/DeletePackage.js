import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import CustomLoader from "../CustomLoader/CustomLoader";

const DeletePackage = () => {
  const [allPackage, setAllPackage] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    document.title = "Delete-Package";
    axios.get("https://take-me-tour.herokuapp.com/packages").then((res) => {
      setAllPackage(res.data);
    });
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`https://take-me-tour.herokuapp.com/packages/${id}`)
      .then((res) => {
        if (res.data) {
          setSmShow(false);
          setAllPackage(allPackage.filter((pk) => pk._id !== id));
        }
      });
  };
  if (allPackage.length === 0) {
    return <CustomLoader />;
  }
  return (
    <div className="container" style={{ minHeight: "70vh" }}>
      <h4>DELETE PACKAGE</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Added Date</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allPackage.map((onePackage) => (
            <tr key={onePackage._id}>
              <td>{onePackage.title}</td>
              <td>{onePackage.date}</td>
              <td>{onePackage.description?.slice(0, 25)}..</td>
              <td>${onePackage.price}</td>
              <td>
                <i
                  className="fas fa-trash-alt text-danger"
                  onClick={() => {
                    setMessage("Are you sure to Delete");
                    setSmShow(true);
                    setId(onePackage._id);
                  }}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Delete Package
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              handleDelete(id);
            }}>
            OK
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeletePackage;
