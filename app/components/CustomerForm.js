import React, { useState } from "react";

const CustomerForm = ({ onAddCustomer }) => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [memberNumber, setMemberNumber] = useState("");
  const [interests, setInterests] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      name,
      dateOfBirth,
      memberNumber,
      interests: interests.split(","),
    };

    // Add to backend (optional)
    fetch("/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => response.json())
      .then((data) => onAddCustomer(data));

    // Clear form
    setName("");
    setDateOfBirth("");
    setMemberNumber("");
    setInterests("");
  };

  return (
    <div>
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <input
          type="number"
          placeholder="Member Number"
          value={memberNumber}
          onChange={(e) => setMemberNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Interests (comma-separated)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default CustomerForm;
