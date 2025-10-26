import React, { useEffect, useState } from "react";
import "./DieterProfile.css";

const DieterProfile = ({ user, onClose }) => {
  const[currentUser, setCurrentUser]=useState(user);

  //live updates from localstorage whenever user change BMI details
  useEffect(()=>{
    const handleStorageChange=()=>{
      const updatedUser = JSON.parse(localStorage.getItem('currentUser'));
      if(updatedUser){
        setCurrentUser(updatedUser);
      }
    };

    //Listen to change made in localstorage(BMI Updates)
    window.addEventListener("storage",handleStorageChange);

    //check immediately in case user recalculated BMI
    handleStorageChange();

    return()=>{
      window.removeEventListener("storage",handleStorageChange);
    };
  },[]);

  if (!currentUser) return null;

  return (
    <div className="profile-overlay">
      <div className="profile-modal">
        <h2>👤 My Profile</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> {currentUser.name}</p>
          <p><strong>Username:</strong> {currentUser.username}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Role:</strong> {currentUser.role}</p>

          {user.role ==="Dieter" && (
            <>
             <p><strong>Age:</strong>{currentUser.age || "Notset"}</p>
             <p><strong>Height:</strong>{currentUser.height ? `${currentUser.height} cm` : "Not set"}</p>
             <p><strong>Weight:</strong>{currentUser.weight ? `${currentUser.weight} kg`: "Not set"}</p>
             <p><strong>BMI:</strong> {currentUser.bmi || "Not calculated yet"}</p>
             <p><strong>Category:</strong> {currentUser.bmiCategory || "Not determined"}</p>
            </>
          )}
        </div>

        <div className="btn-row">
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default DieterProfile;
