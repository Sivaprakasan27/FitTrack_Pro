import React, { useEffect, useState } from "react";
import "./DietitianClients.css";

const DietitianClients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedClient, setEditedClient] = useState({});

  // Load Dieter Users
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const dieters = users.filter((u) => u.role === "Dieter");
    setClients(dieters);
  }, []);

  // View Client Info
  const handleView = (client) => {
    setSelectedClient(client);
    setEditedClient(client);
    setEditMode(false);
  };

  // Delete Client
  const handleDelete = (username) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    const updatedClients = clients.filter((c) => c.username !== username);
    setClients(updatedClients);

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = allUsers.filter((u) => u.username !== username);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Handle Edit Change
  const handleChange = (e) => {
    setEditedClient({ ...editedClient, [e.target.name]: e.target.value });
  };

  // Save Changes
  const handleSave = () => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = allUsers.map((u) =>
      u.username === editedClient.username ? editedClient : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setClients(updatedUsers.filter((u) => u.role === "Dieter"));
    setSelectedClient(editedClient);
    setEditMode(false);
  };

  return (
    <section className="clients-section">
      <h2>👩‍⚕️ Your Clients</h2>

      <div className="clients-grid">
        {clients.length === 0 ? (
          <p>No clients found.</p>
        ) : (
          clients.map((client) => (
            <div className="client-card" key={client.username}>
              <div className="client-header">
                <h3>{client.name || client.username}</h3>
              </div>

              <div className="client-body">
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Username:</strong> {client.username}</p>
                <p><strong>Goal:</strong>{" "}
                  {client.goal
                    ? client.goal.targetWeight > client.goal.startWeight
                      ? "Weight Gain"
                      : "Weight Loss"
                    : "No Goal Set"}
                </p>
              </div>

              <div className="client-footer">
                <button className="btn-view" onClick={() => handleView(client)}>
                  View
                </button>
                <button className="btn-delete" onClick={() => handleDelete(client.username)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Overlay */}
      {selectedClient && (
        <div className="client-overlay">
          <div className="client-modal">
            {!editMode ? (
              <>
                <h3>👁 Client Details</h3>
                <div className="client-details">
                  <p><strong>Name:</strong> {selectedClient.name}</p>
                  <p><strong>Email:</strong> {selectedClient.email}</p>
                  <p><strong>Username:</strong> {selectedClient.username}</p>
                  <p><strong>Role:</strong> {selectedClient.role}</p>
                  {selectedClient.age && <p><strong>Age:</strong> {selectedClient.age}</p>}
                  {selectedClient.height && <p><strong>Height:</strong> {selectedClient.height} cm</p>}
                  {selectedClient.weight && <p><strong>Current Weight:</strong> {selectedClient.weight} kg</p>}

                  {selectedClient.goal ? (
                    <>
                      <h4>🎯 Goal Info</h4>
                      <p>Start Weight: {selectedClient.goal.startWeight} kg</p>
                      <p>Target Weight: {selectedClient.goal.targetWeight} kg</p>
                      <p>Duration: {selectedClient.goal.duration} days</p>
                      <p>
                        Goal Type:{" "}
                        {selectedClient.goal.targetWeight > selectedClient.goal.startWeight
                          ? "Weight Gain"
                          : "Weight Loss"}
                      </p>

                      {selectedClient.goal.dailyLogs?.length > 0 && (
                        <>
                          <h4>📅 Recent Logs</h4>
                          <ul>
                            {selectedClient.goal.dailyLogs
                              .slice(-5)
                              .reverse()
                              .map((log, i) => (
                                <li key={i}>
                                  {log.date} - <strong>{log.weight} kg</strong>
                                </li>
                              ))}
                          </ul>
                        </>
                      )}
                    </>
                  ) : (
                    <p>No goal data available.</p>
                  )}
                </div>

                <div className="btn-row">
                  <button className="btn-edit" onClick={() => setEditMode(true)}>
                    ✏️ Edit
                  </button>
                  <button className="btn-close" onClick={() => setSelectedClient(null)}>
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>✏️ Edit Client</h3>
                <div className="client-details">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editedClient.name || ""}
                    onChange={handleChange}
                  />

                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={editedClient.email || ""}
                    onChange={handleChange}
                  />

                  <label htmlFor="age">Age</label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={editedClient.age || ""}
                    min={0}
                    onChange={handleChange}
                  />

                  <label htmlFor="height">Height (cm)</label>
                  <input
                    id="height"
                    type="number"
                    name="height"
                    placeholder="Height (cm)"
                    value={editedClient.height || ""}
                    min={0}
                    onChange={handleChange}
                  />

                  <label htmlFor="weight">Current Weight (kg)</label>
                  <input
                    id="weight"
                    type="number"
                    name="weight"
                    placeholder="Current Weight (kg)"
                    value={editedClient.weight || ""}
                    min={0}
                    onChange={handleChange}
                  />

                  <label htmlFor="password">New Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    value={editedClient.password || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="btn-row">
                  <button className="btn-save" onClick={handleSave}>
                    Save
                  </button>
                  <button className="btn-close" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default DietitianClients;
