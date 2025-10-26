
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "./DietitianReports.css";

const DietitianReports = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const dieters = users.filter((u) => u.role === "Dieter");
    setClients(dieters);
  }, []);

  const handleDownloadReport = (client) => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Dieter Progress Report", 20, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Name: ${client.name || client.username}`, 20, y);
    y += 8;
    doc.text(`Email: ${client.email || "N/A"}`, 20, y);
    y += 8;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, y);
    y += 10;
    doc.text("===============================", 20, y);
    y += 10;

    // Goal Info
    const goal = client.goal;
    if (goal) {
      const goalType =
        goal.type ||
        (goal.targetWeight > goal.startWeight
          ? "Weight Gain"
          : goal.targetWeight < goal.startWeight
          ? "Weight Loss"
          : "N/A");

      doc.text(`Goal Type: ${goalType}`, 20, y);
      y += 8;
      doc.text(`Start Weight: ${goal.startWeight || 0} kg`, 20, y);
      y += 8;
      doc.text(`Target Weight: ${goal.targetWeight || 0} kg`, 20, y);
      y += 8;
      doc.text(`Duration: ${goal.duration || 0} days`, 20, y);
      y += 8;

      const dailyLogs = goal.dailyLogs || [];
      if (dailyLogs.length > 0) {
        const latest = dailyLogs[dailyLogs.length - 1].weight;
        const start = goal.startWeight;
        const target = goal.targetWeight;

        let progress = 0;
        if (target > start)
          progress = ((latest - start) / (target - start)) * 100;
        else progress = ((start - latest) / (start - target)) * 100;

        progress = Math.min(100, Math.max(progress, 0));

        doc.text(`Progress: ${progress.toFixed(1)}% completed`, 20, y);
        y += 10;

        doc.text("Recent Logs:", 20, y);
        y += 8;

        dailyLogs.slice(-5).forEach((log) => {
          doc.text(`• ${log.date} — ${log.weight} kg`, 25, y);
          y += 8;
        });

        y += 5;
        const weightDiff = latest - start;
        const result =
          weightDiff > 0
            ? `You have gained ${weightDiff.toFixed(1)} kg.`
            : weightDiff < 0
            ? `You have lost ${Math.abs(weightDiff).toFixed(1)} kg.`
            : "No change in weight yet.";
        doc.text(result, 20, y);
      } else {
        doc.text("No logs available yet.", 20, y);
      }
    } else {
      doc.text("No goal data found for this client.", 20, y);
    }

    doc.save(`${client.username}_Progress_Report.pdf`);
  };

  return (
    <div className="reports-section">
      <h2>📄 Dieter Reports</h2>

      <div className="reports-grid">
        {clients.length > 0 ? (
          clients.map((client, i) => (
            <div className="report-card" key={i}>
              <h3>{client.username}</h3>
              <p>
                <strong>Username:</strong> {client.username}
              </p>
              <p>
                <strong>Email:</strong> {client.email || "N/A"}
              </p>
              <p>
                <strong>Goal:</strong>{" "}
                {client.goal
                  ? client.goal.type ||
                    (client.goal.targetWeight > client.goal.startWeight
                      ? "Weight Gain"
                      : client.goal.targetWeight < client.goal.startWeight
                      ? "Weight Loss"
                      : "N/A")
                  : "N/A"}
              </p>

              <button
                className="btn-download"
                onClick={() => handleDownloadReport(client)}
              >
                ⬇️ Download Report
              </button>
            </div>
          ))
        ) : (
          <p>No dieter records found.</p>
        )}
      </div>
    </div>
  );
};

export default DietitianReports;
