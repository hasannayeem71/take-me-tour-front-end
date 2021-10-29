import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CustomLoader from "../CustomLoader/CustomLoader";

const ManageAll = () => {
  const [allPackage, setAllPackage] = useState([]);

  useEffect(() => {
    document.title = "Manage-All";
    axios
      .get("https://take-me-tour.herokuapp.com/user/package")
      .then((res) => setAllPackage(res.data));
  }, []);

  //update user added events status
  const handleApprove = (service) => {
    if (service.status === "Approved") {
      alert("Already Approved");
      return;
    }
    const assurance = window.confirm("Confirm Approve?");
    if (!assurance) {
      return;
    }
    const updatedPackage = {
      bookingDate: service.bookingDate,
      eventTitle: service.eventTitle,
      phoneNumber: service.phoneNumber,
      status: "Approved",
      userEmail: service.userEmail,
      userName: service.userName,
      img: service.img,
    };

    axios
      .put(
        `https://take-me-tour.herokuapp.com/user/package/update/${service._id}`,
        updatedPackage
      )
      .then((res) => {
        if (res.data.acknowledged) {
          alert("Approved");
          const updatedPackage = allPackage.find(
            (pk) => pk._id === service._id
          );
          allPackage.pop(updatedPackage);
          updatedPackage.status = "Approved";
          const newPackage = [...allPackage, updatedPackage];
          setAllPackage(newPackage);
        }
      });
  };

  //delete one data from user added packages
  const handleDelete = (id) => {
    const assurance = window.confirm("Are you sure to delete");
    if (!assurance) {
      return;
    }
    axios
      .delete(`https://take-me-tour.herokuapp.com/user/package/delete/${id}`)
      .then((res) => {
        if (res.data.acknowledged) {
          alert("Successfully deleted");
          setAllPackage(allPackage.filter((pk) => pk._id !== id));
        }
      });
  };

  if (allPackage.length === 0) {
    return <CustomLoader />;
  }
  return (
    <div className="container">
      <h2>Manage all package </h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Package Name</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Phone Number</th>
            <th>Booking Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allPackage.map((onePackage) => (
            <tr key={onePackage._id}>
              <td>{onePackage.eventTitle}</td>
              <td>{onePackage.userName}</td>
              <td>{onePackage.userEmail}</td>
              <td>{onePackage.phoneNumber}</td>
              <td>{onePackage.bookingDate}</td>
              <td>{onePackage.status}</td>
              <td className="d-flex justify-content-between align-items-center">
                <i
                  className="fas fa-check text-success"
                  onClick={() => {
                    handleApprove(onePackage);
                  }}
                  title="approve"></i>
                <i
                  className="fas fa-trash-alt text-danger"
                  onClick={() => {
                    handleDelete(onePackage._id);
                  }}
                  title="delete"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageAll;
