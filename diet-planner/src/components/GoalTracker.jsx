import React, { useEffect, useState } from "react";
import "./GoalTracker.css";

const GoalTracker = () => {
  const [goal, setGoal] = useState({
    startWeight: "",
    targetWeight: "",
    mode: "",
  });
  const [dailyLogs, setDailyLogs] = useState([]);
  const [todayWeight, setTodayWeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [message, setMessage] = useState("");

  const loadGoal = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user?.goal) {
      const g = user.goal;
      setGoal(g);
      setDailyLogs(g.dailyLogs || []);
      if (g.dailyLogs?.length > 0)
        setCurrentWeight(g.dailyLogs[g.dailyLogs.length - 1].weight);
    }
  };

  useEffect(() => {
    loadGoal();
    window.addEventListener("goalUpdated", loadGoal);
    return () => window.removeEventListener("goalUpdated", loadGoal);
  }, []);

  const handleMode = (m) => setGoal({ ...goal, mode: m });

  const handleLog = () => {
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
    localStorage.setItem(
      "users",
      JSON.stringify(users.map((u) =>
        u.username === currentUser.username ? updatedUser : u
      ))
    );

    setDailyLogs(updatedLogs);
    setCurrentWeight(newWeight);
    setTodayWeight("");
  };

  const resetGoal = () => {
    setGoal({ startWeight: "", targetWeight: "", mode: "" });
    setDailyLogs([]);
    setTodayWeight("");
    setCurrentWeight("");
    setProgress(0);
    setRemaining(0);
    setMessage("");
  };

  useEffect(() => {
    if (!goal.startWeight || !goal.targetWeight || !currentWeight) return;

    const start = parseFloat(goal.startWeight);
    const target = parseFloat(goal.targetWeight);
    const current = parseFloat(currentWeight);

    let p = 0;
    let r = 0;

    if (goal.mode === "loss") {
      p = ((start - current) / (start - target)) * 100;
      r = current - target;
    } else if (goal.mode === "gain") {
      p = ((current - start) / (target - start)) * 100;
      r = target - current;
    }

    p = Math.max(0, Math.min(p, 100));
    r = Math.max(0, r);

    setProgress(p.toFixed(1));
    setRemaining(r.toFixed(1));

    if (p >= 100) setMessage("🎉 Goal achieved! Incredible work!");
    else if (p >= 75) setMessage("🔥 Almost there — 75% done!");
    else if (p >= 50) setMessage("💪 Halfway there — keep pushing!");
    else if (p >= 25) setMessage("⚡ Great start — stay consistent!");
    else setMessage("");
  }, [goal, currentWeight]);

  return (
    <div className="goal-card">
      <h3>🎯 Goal Tracker</h3>
      <p className="goal-sub">
        Set your goal and track your progress every day.
      </p>

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
          onClick={() => handleMode("loss")}
        >
          🧘 Weight Loss
        </button>
        <button
          className={`mode-btn ${goal.mode === "gain" ? "active-gain" : ""}`}
          onClick={() => handleMode("gain")}
        >
          🏋️ Weight Gain
        </button>
      </div>

      {goal.startWeight && goal.targetWeight && (
        <div className="progress-section">
          <div className="progress-header">
            <p>
              <strong>Current:</strong> {currentWeight || 0} kg
            </p>
            <p>
              <strong>Remaining:</strong> {remaining} kg
            </p>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">Progress — {progress}%</p>
          {message && <p className="goal-message">{message}</p>}
        </div>
      )}

      <div className="log-section">
        <h4>📅 Log Today's Weight</h4>
        <div className="log-inputs">
          <input
            type="number"
            placeholder="Today's weight"
            value={todayWeight}
            onChange={(e) => setTodayWeight(e.target.value)}
          />
          <button onClick={handleLog} className="log-btn">
            Log
          </button>
        </div>
      </div>

      {dailyLogs.length > 0 && (
        <div className="log-history">
          <h4>📋 Recent Logs</h4>
          <ul>
            {dailyLogs.slice(-4).reverse().map((log, i) => (
              <li key={i}>
                {log.date}: <strong>{log.weight} kg</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="reset-btn" onClick={resetGoal}>
        🔄 Reset Goal
      </button>
    </div>
  );
};

export default GoalTracker;
