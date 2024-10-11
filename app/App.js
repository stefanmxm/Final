import React, { useState, useEffect } from "react";
import CustomerList from "./components/CustomerList";
import CustomerForm from "./components/CustomerForm";
import CustomerUpdate from "./components/CustomerUpdate";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  // Fetch customers from API (READ operation)
  useEffect(() => {
    fetch("/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  // Add new customer (CREATE operation)
  const addCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  // Update customer (UPDATE operation)
  const updateCustomer = (updatedCustomer) => {
    setCustomers(
      customers.map((customer) =>
        customer._id === updatedCustomer._id ? updatedCustomer : customer
      )
    );
    setCurrentCustomer(null); // Clear after updating
  };

  // Delete customer (DELETE operation)
  const deleteCustomer = (customerId) => {
    // Make API request to delete the customer from the backend
    fetch(`/api/customers/${customerId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCustomers(customers.filter((customer) => customer._id !== customerId));
        }
      })
      .catch((error) => console.error("Error deleting customer:", error));
  };

  return (
    <div>
      <h1>Customer Management</h1>

      {/* List all customers */}
      <CustomerList
        customers={customers}
        onDelete={deleteCustomer}
        onEdit={(customer) => setCurrentCustomer(customer)}
      />

      {/* Add new customer form */}
      <CustomerForm onAddCustomer={addCustomer} />

      {/* Update customer form (only shown when editing) */}
      {currentCustomer && (
        <CustomerUpdate
          currentCustomer={currentCustomer}
          onUpdateCustomer={updateCustomer}
        />
      )}
    </div>
  );
};

export default App;
