import React from 'react'
import "./Features.css";
import dietIcon from "../assets/undraw_diet_zdwe.svg";
import workoutIcon from "../assets/undraw_athletes-training_koqa.svg";
import progressIcon from "../assets/undraw_percentages_wi9e.svg";
import quickIcon from "../assets/undraw_booking_1ztt.svg";

export const Features = () => {
  return (
    <section id='features' className='features'>
      
        <h2 className='features-title'>Why Choose our Planner?</h2>
           
            <p className='features-subtext'>
                Smart, Simple and Personalized just for you.
                </p>
       
        <div className='features-grid'>
            <div className='feature-card'>
                <img src={dietIcon} alt="Diet Plans" className='feature-icon'/>
                <h3>Personalized Diet Plans</h3>
                <p>Tailored meals based on your BMI and Lifestyle.</p>
            </div>

            <div className='feature-card'>
                <img src={workoutIcon} alt="Workout Routines" className='feature-icon' />
                <h3>Smart Workout Routines</h3>
                <p>Step-by-step exercises designed for your fitness level.</p>
            </div>
            
            <div className='feature-card'>
                <img src={progressIcon} alt="Track Progress" className='feature-icon' />
                <h3>Track Progress</h3>
                <p>Monitor BMI and stay motivated with progress updates.</p>
            </div>
            
            <div className='feature-card'>
                <img src={quickIcon} alt="Quick Setup" className='feature-icon' />
                <h3>Quick & Easy Setup</h3>
                <p>Just enter height and weight - get Started instantly.</p>
            </div>
        </div>
    </section>
  )
}
export default Features;
