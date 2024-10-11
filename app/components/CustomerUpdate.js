import React, { useState, useEffect } from "react";

const CustomerUpdate = ({ currentCustomer, onUpdateCustomer }) => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [memberNumber, setMemberNumber] = useState("");
  const [interests, setInterests] = useState("");

  useEffect(() => {
    if (currentCustomer) {
      setName(currentCustomer.name);
      setDateOfBirth(currentCustomer.dateOfBirth);
      setMemberNumber(currentCustomer.memberNumber);
      setInterests(currentCustomer.interests.join(","));
    }
  }, [currentCustomer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCustomer = {
      ...currentCustomer,
      name,
      dateOfBirth,
      memberNumber,
      interests: interests.split(","),
    };

    // Update in backend (optional)
    fetch(`/api/customers/${currentCustomer._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCustomer),
    })
      .then((response) => response.json())
      .then((data) => onUpdateCustomer(data));
  };

  return (
    <div>
      <h2>Update Customer</h2>
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
        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
};

export default CustomerUpdate;
