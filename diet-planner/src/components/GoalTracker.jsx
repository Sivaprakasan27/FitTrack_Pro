import React, { useEffect, useState } from "react";
import "./GoalTracker.css";

const GoalTracker = () => {
  const [goal, setGoal] = useState({
    startWeight: "",
    targetWeight: "",
    duration: "",
    mode: "",
  });

  const [dailyLogs, setDailyLogs] = useState([]);
  const [todayWeight, setTodayWeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [milestoneMessage, setMilestoneMessage] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [remainingWeight, setRemainingWeight] = useState(0);

  const loadGoalData = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.goal) {
      setGoal(currentUser.goal);
      setDailyLogs(currentUser.goal.dailyLogs || []);
      if (currentUser.goal.dailyLogs?.length > 0) {
        const latest =
          currentUser.goal.dailyLogs[currentUser.goal.dailyLogs.length - 1]
            .weight;
        setCurrentWeight(latest);
      } else {
        setCurrentWeight(currentUser.goal.startWeight);
      }
    }
  };

  useEffect(() => {
    loadGoalData();
    window.addEventListener("goalUpdated", loadGoalData);
    return () => window.removeEventListener("goalUpdated", loadGoalData);
  }, []);

  const handleModeSelect = (mode) => setGoal({ ...goal, mode });

  const handleLogWeight = () => {
    if (!todayWeight) return;
    const date = new Date().toLocaleDateString();
    const newWeight = parseFloat(todayWeight);
    const updatedLogs = [
      ...dailyLogs.filter((log) => log.date !== date),
      { date, weight: newWeight },
    ];

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const updatedUser = {
      ...currentUser,
      goal: { ...goal, dailyLogs: updatedLogs },
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === currentUser.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setDailyLogs(updatedLogs);
    setCurrentWeight(newWeight);
    setTodayWeight("");
  };

  const handleResetGoal = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const updatedUser = { ...currentUser, goal: null };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === currentUser.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setGoal({ startWeight: "", targetWeight: "", duration: "", mode: "" });
    setDailyLogs([]);
    setTodayWeight("");
    setCurrentWeight("");
    setMilestoneMessage("");
    setProgressPercent(0);
    setRemainingWeight(0);
  };

  useEffect(() => {
    if (!goal.startWeight || !goal.targetWeight || !currentWeight) return;

    const start = parseFloat(goal.startWeight);
    const target = parseFloat(goal.targetWeight);
    const current = parseFloat(currentWeight);
    let progress = 0;
    let remaining = 0;

    if (goal.mode === "loss") {
      progress = ((start - current) / (start - target)) * 100;
      remaining = Math.max(0, current - target);
    } else if (goal.mode === "gain") {
      progress = ((current - start) / (target - start)) * 100;
      remaining = Math.max(0, target - current);
    }

    progress = Math.max(0, Math.min(progress, 100));
    setProgressPercent(progress.toFixed(1));
    setRemainingWeight(remaining.toFixed(1));

    if (progress >= 100) {
      setMilestoneMessage("🎉 Congratulations! You’ve achieved your goal!");
    } else if (progress >= 75) {
      setMilestoneMessage("🔥 Almost there — 75% of your goal reached!");
    } else if (progress >= 50) {
      setMilestoneMessage("💪 Halfway there! Keep going strong!");
    } else if (progress >= 25) {
      setMilestoneMessage("⚡ Great start! Stay consistent!");
    } else {
      setMilestoneMessage("");
    }
  }, [currentWeight, goal]);

  return (
    <div className="goal-tracker card">
      <h3>🎯 Goal Tracker</h3>

      <div className="goal-inputs">
        <input
          type="number"
          placeholder="Start Weight (kg)"
          value={goal.startWeight}
          onChange={(e) => setGoal({ ...goal, startWeight: e.target.value })}
        />
        <input
          type="number"
          placeholder="Target Weight (kg)"
          value={goal.targetWeight}
          onChange={(e) => setGoal({ ...goal, targetWeight: e.target.value })}
        />
      </div>

      <div className="goal-modes">
        <button
          className={`mode-btn ${goal.mode === "loss" ? "active-loss" : ""}`}
          onClick={() => handleModeSelect("loss")}
        >
          🧘 Weight Loss
        </button>
        <button
          className={`mode-btn ${goal.mode === "gain" ? "active-gain" : ""}`}
          onClick={() => handleModeSelect("gain")}
        >
          🏋️ Weight Gain
        </button>
      </div>

      <div className="progress-overview">
        <h4>📊 Current Progress</h4>
        <p><strong>Starting Weight:</strong> {goal.startWeight || 0} kg</p>
        <p><strong>Current Weight:</strong> {currentWeight || 0} kg</p>
        <p><strong>Target Weight:</strong> {goal.targetWeight || 0} kg</p>
        <p><strong>Remaining:</strong> {remainingWeight} kg</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="progress-percent">Progress: {progressPercent}%</p>
      </div>

      {milestoneMessage && <p className="milestone-text">{milestoneMessage}</p>}

      <div className="daily-log">
        <h4>📅 Log Today’s Weight</h4>
        <div className="log-inputs">
          <input
            type="number"
            placeholder="Enter today's weight"
            value={todayWeight}
            onChange={(e) => setTodayWeight(e.target.value)}
          />
          <button className="btn-log" onClick={handleLogWeight}>Log</button>
        </div>
      </div>

      {dailyLogs.length > 0 && (
        <div className="log-history">
          <h4>📋 Recent Logs</h4>
          <ul>
            {dailyLogs.slice(-5).reverse().map((log, i) => (
              <li key={i}>
                {log.date}: <strong>{log.weight} kg</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="reset-section">
        <button className="btn-reset" onClick={handleResetGoal}>
          🔄 Reset Goal
        </button>
      </div>
    </div>
  );
};

export default GoalTracker;
