import React, { useState, useEffect } from "react";
import "./DietitianDashboard.css";
import DietitianHeader from "./DietitianHeader";
import DietitianClients from "./DietitianClients";
import DietitianReports from "./DietitianReports";
import DietitianFeedback from "./DietitianFeedback";
import DietitianProfile from "./DietitianProfile";
import DietitianSettings from "./DietitianSettings";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const DietitianDashboard = () => {
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [stats, setStats] = useState({
    totalDieters: 0,
    reports: 0,
    feedbacks: 0,
    goalsAchieved: 0,
  });
  const [weightTrend, setWeightTrend] = useState([]);
  const [goalStages, setGoalStages] = useState([]);

  // Load data
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.username) setUsername(currentUser.username);

    updateStats();
    const interval = setInterval(updateStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateStats = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const feedbacks = JSON.parse(localStorage.getItem("dieterFeedback")) || [];

    const dieters = users.filter((u) => u.role === "Dieter");
    const reports = dieters.filter(
      (u) => u.goal && u.goal.dailyLogs?.length > 0
    );
    const goals = dieters.filter((u) => {
      if (!u.goal) return false;
      const latest = u.goal.dailyLogs?.slice(-1)[0]?.weight || 0;
      return (
        (u.goal.targetWeight > u.goal.startWeight &&
          latest >= u.goal.targetWeight) ||
        (u.goal.targetWeight < u.goal.startWeight &&
          latest <= u.goal.targetWeight)
      );
    });

    setStats({
      totalDieters: dieters.length,
      reports: reports.length,
      feedbacks: feedbacks.length,
      goalsAchieved: goals.length,
    });

    // Weight Trend (average of all dieters)
    const dateMap = {};
    dieters.forEach((d) => {
      d.goal?.dailyLogs?.forEach((log) => {
        if (!dateMap[log.date]) dateMap[log.date] = [];
        dateMap[log.date].push(log.weight);
      });
    });

    const trend = Object.entries(dateMap).map(([date, weights]) => ({
      date,
      avgWeight: (
        weights.reduce((a, b) => a + b, 0) / weights.length
      ).toFixed(1),
    }));
    setWeightTrend(trend.sort((a, b) => new Date(a.date) - new Date(b.date)));

    // Goal Completion Stages
    const stages = { "25%": 0, "50%": 0, "75%": 0, "100%": 0 };
    dieters.forEach((d) => {
      const g = d.goal;
      if (!g || !g.startWeight || !g.targetWeight) return;
      const latest = g.dailyLogs?.slice(-1)[0]?.weight || g.startWeight;

      let progress = 0;
      if (g.targetWeight > g.startWeight)
        progress =
          ((latest - g.startWeight) / (g.targetWeight - g.startWeight)) * 100;
      else
        progress =
          ((g.startWeight - latest) / (g.startWeight - g.targetWeight)) * 100;

      if (progress >= 100) stages["100%"]++;
      else if (progress >= 75) stages["75%"]++;
      else if (progress >= 50) stages["50%"]++;
      else if (progress >= 25) stages["25%"]++;
    });

    setGoalStages([
      { stage: "25%", dieters: stages["25%"] },
      { stage: "50%", dieters: stages["50%"] },
      { stage: "75%", dieters: stages["75%"] },
      { stage: "100%", dieters: stages["100%"] },
    ]);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  const handleNavigate = (tab) => setActiveTab(tab);

  return (
    <div className="dietitian-dashboard">
      <DietitianHeader
        username={username}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        onViewProfile={() => setShowProfile(true)}
        onViewSettings={() => setShowSettings(true)}
      />

      {/* ======= DASHBOARD ======= */}
      {activeTab === "dashboard" && (
        <>
          <section className="dietitian-welcome">
            <h2>Welcome back, {username || "Dietitian"} 👩‍⚕️</h2>
            <p>
              Monitor your dieters’ performance, progress, and insights in
              real-time.
            </p>
          </section>

          {/* Stats Cards */}
          <section className="dashboard-cards">
            <div className="card">
              <h3>👥 Total Dieters</h3>
              <p>{stats.totalDieters}</p>
            </div>
            <div className="card">
              <h3>📄 Reports Generated</h3>
              <p>{stats.reports}</p>
            </div>
            <div className="card">
              <h3>💬 Feedback Received</h3>
              <p>{stats.feedbacks}</p>
            </div>
            <div className="card">
              <h3>🏆 Goals Achieved</h3>
              <p>{stats.goalsAchieved}</p>
            </div>
          </section>

          {/* Progress Analytics */}
          <section className="dietitian-insights">
            <h2>📊 Progress Analytics</h2>

            {/* Weight Trend */}
            <div className="chart-section">
              <h4>📈 Average Weight Trend</h4>
              {weightTrend.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weightTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="avgWeight"
                      stroke="#00e0ff"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p>No weight data available.</p>
              )}
            </div>

            {/* Goal Completion Chart */}
            <div className="chart-section">
              <h4>🏆 Goal Completion Distribution</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={goalStages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="dieters" fill="#00c49f" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      )}

      {/* ======= CLIENTS SECTION ======= */}
      {activeTab === "clients" && <DietitianClients />}

      {/* ======= REPORTS SECTION ======= */}
      {activeTab === "reports" && <DietitianReports />}

      {/* ======= FEEDBACK SECTION ======= */}
      {activeTab === "feedback" && <DietitianFeedback />}

      {/* ======= PROFILE OVERLAY ======= */}
      {showProfile && <DietitianProfile onClose={() => setShowProfile(false)} />}

      {/* ======= SETTINGS OVERLAY ======= */}
      {showSettings && (
        <DietitianSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default DietitianDashboard;
