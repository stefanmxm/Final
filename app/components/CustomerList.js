import React, { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";

const CustomerList = ({ customers, onDelete, onEdit }) => {
  const [customerToDelete, setCustomerToDelete] = useState(null);

  // Function to trigger the delete confirmation
  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
  };

  // Function to handle cancellation of delete action
  const handleCancel = () => {
    setCustomerToDelete(null);
  };

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            <p>{customer.name}</p>
            <p>{customer.dateOfBirth}</p>
            <p>{customer.memberNumber}</p>
            <p>{customer.interests.join(", ")}</p>
            <button onClick={() => onEdit(customer)}>Edit</button>
            <button onClick={() => handleDeleteClick(customer)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Show delete confirmation dialog */}
      {customerToDelete && (
        <DeleteConfirmation
          customer={customerToDelete}
          onDelete={onDelete}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default CustomerList;
