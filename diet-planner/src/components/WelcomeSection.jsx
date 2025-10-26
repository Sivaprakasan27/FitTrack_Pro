import React, { useEffect, useState } from 'react'
import './WelcomeSection.css'




const WelcomeSection = () => {
    const [currentUser, setCurrentUser]=useState(null);
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("currentUser"));
        if(user){
            setCurrentUser(user);
        }
    },[]);
  return (
    <main className='dashboard-main'>
        <h2>Welcome, {currentUser?. name || currentUser?. username}!</h2>
        <p>This is your personalized Dieter Dashboard..</p>
    </main>
   
  )
}

export default WelcomeSection