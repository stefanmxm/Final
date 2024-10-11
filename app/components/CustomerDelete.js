import React from "react";

const DeleteConfirmation = ({ customer, onDelete, onCancel }) => {
  return (
    <div className="delete-confirmation">
      <p>Are you sure you want to delete {customer.name}?</p>
      <button onClick={() => onDelete(customer._id)}>Yes, Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default DeleteConfirmation;
