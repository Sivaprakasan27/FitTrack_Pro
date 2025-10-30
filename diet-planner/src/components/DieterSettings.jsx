import React, { useState } from "react";
import "./DieterSettings.css";
import jsPDF from "jspdf";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DieterSettings = ({ user, onClose }) => {
 
  const [feedback, setFeedback] = useState("");

  // PDF Report
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Header Section
    doc.setFillColor(230, 240, 255);
    doc.rect(0, 0, 210, 25, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("DIETER PROGRESS REPORT", 20, 17);

    // Basic Info
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Name: ${user?.name || user?.username}`, 20, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 45);

    // Separator Line
    doc.setDrawColor(180);
    doc.line(20, 50, 190, 50);

    const goal = user?.goal || {};
    let y = 65;

    if (goal.startWeight && goal.targetWeight) {
      const dailyLogs = goal.dailyLogs || [];
      const currentWeight = dailyLogs.length
        ? dailyLogs[dailyLogs.length - 1].weight
        : goal.startWeight;

      const goalType =
        goal.targetWeight < goal.startWeight ? "Weight Loss" : "Weight Gain";

      let progress = 0;
      if (goalType === "Weight Loss") {
        progress =
          ((goal.startWeight - currentWeight) /
            (goal.startWeight - goal.targetWeight)) *
          100;
      } else {
        progress =
          ((currentWeight - goal.startWeight) /
            (goal.targetWeight - goal.startWeight)) *
          100;
      }

      progress = Math.min(Math.max(progress, 0), 100).toFixed(1);

      // Section Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Goal Overview", 20, y);
      y += 10;

      doc.setFont("helvetica", "normal");
      doc.text(`Goal Type: ${goalType}`, 25, y);
      y += 8;
      doc.text(`Start Weight: ${goal.startWeight} kg`, 25, y);
      y += 8;
      doc.text(`Current Weight: ${currentWeight} kg`, 25, y);
      y += 8;
      doc.text(`Target Weight: ${goal.targetWeight} kg`, 25, y);
      y += 8;
      doc.text(`Duration: ${goal.duration || 0} days`, 25, y);
      y += 8;
      doc.text(`Progress: ${progress}% completed`, 25, y);
      y += 15;

      
      doc.setDrawColor(230);
      doc.line(20, y, 190, y);
      y += 10;

      // Recent Logs
      if (dailyLogs.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.text("Recent Weight Logs", 20, y);
        y += 10;

        doc.setFont("helvetica", "normal");
        dailyLogs.slice(-5).forEach((log) => {
          doc.text(`${log.date} — ${log.weight} kg`, 25, y);
          y += 8;
        });
        y += 10;
      }

      // Separator
      doc.setDrawColor(230);
      doc.line(20, y, 190, y);
      y += 10;

      // Weight Trend Summary
      const logs = goal.dailyLogs || [];
      if (logs.length > 1) {
        const first = logs[0].weight;
        const last = logs[logs.length - 1].weight;
        const trend =
          last < first
            ? `You have lost ${(first - last).toFixed(1)} kg overall.`
            : `You have gained ${(last - first).toFixed(1)} kg overall.`;

        doc.setFont("helvetica", "bold");
        doc.text("Weight Trend Summary", 20, y);
        y += 10;

        doc.setFont("helvetica", "normal");
        doc.text(trend, 25, y);
        y += 10;
      }

      // Final Congratulations
      if (
        (goalType === "Weight Loss" && currentWeight <= goal.targetWeight) ||
        (goalType === "Weight Gain" && currentWeight >= goal.targetWeight)
      ) {
        y += 10;
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 128, 0);
        doc.text("Congratulations! You achieved your target goal!", 25, y);
      }
    } else {
      doc.text("No goal data available for this user.", 20, y);
    }

    doc.save(`${user?.username || "Dieter"}_Report.pdf`);
  };

  
  //  Feedback Submit
  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      const allFeedback =
        JSON.parse(localStorage.getItem("dieterFeedback")) || [];
      allFeedback.push({
        user: user?.username,
        message: feedback,
        date: new Date().toLocaleString(),
      });
      localStorage.setItem("dieterFeedback", JSON.stringify(allFeedback));
      setFeedback("");
    }
  };

  // Weight Trend Data
  const weightLogs = user?.goal?.dailyLogs || [];

  return (
    <div className="profile-overlay">
      <div className="settings-modal">
        <h2>⚙️ Dieter Settings</h2>

        {/*  Download Progress Report */}
        <div className="settings-section">
          <h4>📄 Download Progress Report</h4>
          <button className="btn-download" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        </div>

        {/*  Milestones */}
        <div className="settings-section">
          <h4>🎯 Goal Milestones</h4>
          <ul className="milestone-list">
            <li>25% — Great Start!</li>
            <li>50% — Halfway There!</li>
            <li>75% — Almost Done!</li>
            <li>100% — Goal Achieved 🎉</li>
          </ul>
        </div>

        {/*  Weight Trends */}
        <div className="settings-section">
          <h4>📈 Weight Trends</h4>
          {weightLogs.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weightLogs}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis
                  label={{
                    value: "Weight (kg)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#007BFF"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No weight logs yet. Log your progress to view trends!</p>
          )}
        </div>


        {/*  Feedback */}
        <div className="settings-section">
          <h4>💬 Feedback</h4>
          <textarea
            placeholder="Share your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button className="btn-submit" onClick={handleFeedbackSubmit}>
            Submit Feedback
          </button>
        </div>

        <div className="btn-row">
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DieterSettings;
