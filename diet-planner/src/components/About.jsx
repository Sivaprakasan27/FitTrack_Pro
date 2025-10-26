import React from 'react'
import "./About.css";
import aboutImg from "../assets/617.jpg"
export const About = () => {
  return (
    <section id='about' className='about'>
        <div className='about-container'>
            {/*Left Side*/}
            <div className='about-text'>
                <h2>About Diet & Workout Planner</h2>
                <p>
                    Our smart planner helps you balance your meals and workouts 
                    by providing Personalized recommendations based on your BMI and fitness goals.
                    Stay on track and motivated every day! 
                </p>
                <ul>
                    <li>Personalized Diet & Workout Plans</li>
                    <li>Track Your Progress Easily</li>
                    <li>Simple & Quick Setup</li>
                </ul>
            </div>
            {/*Right Side */}
            <div className='about-image'>
                <img src={aboutImg} alt="About Planner" />
            </div>

        </div>

    </section>
  )
}
export default About;