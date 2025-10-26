import React from 'react'
import mondayImg from "../assets/workout-monday.png";
import tuesdayImg from "../assets/workout-tuesday.png";
import wednesdayImg from "../assets/workout-wednesday.png";
import thursdayImg from "../assets/workout-thursday.png";
import fridayImg from "../assets/workout-friday.png";
import saturdayImg from "../assets/workout-saturday.png";
import sundayImg from "../assets/workout-sunday.png";
const sampleWorks =  {
  Underweight: {
    title: "🏋️‍♂️ Strength & Mass Gain Plan",
    days: [
      {
        day: "Monday",
        image: mondayImg,
        title: "Upper Body Strength",
        exercises: [
          { name: "Push-ups", sets: 3, reps: 12, time: "10 min" },
          { name: "Bench Press", sets: 3, reps: 10, time: "15 min" },
          { name: "Pull-ups", sets: 3, reps: 8, time: "8 min" },
        ],
        calories: 300,
        completion: 0,
      },
      {
        day: "Tuesday",
        image: tuesdayImg,
        title: "Lower Body Power",
        exercises: [
          { name: "Squats", sets: 4, reps: 12, time: "15 min" },
          { name: "Lunges", sets: 3, reps: 10, time: "10 min" },
          { name: "Calf Raises", sets: 3, reps: 15, time: "5 min" },
        ],
        calories: 320,
        completion: 0,
      },
      {
        day: "Wednesday",
        image: wednesdayImg,
        title: "Core & Balance",
        exercises: [
          { name: "Plank", sets: 3, reps: 1, time: "10 min" },
          { name: "Side Crunches", sets: 3, reps: 15, time: "10 min" },
        ],
        calories: 260,
        completion: 0,
      },
      {
        day: "Thursday",
        image: thursdayImg,
        title: "Full Body Strength",
        exercises: [
          { name: "Deadlifts", sets: 4, reps: 8, time: "20 min" },
          { name: "Dumbbell Curls", sets: 3, reps: 12, time: "10 min" },
        ],
        calories: 350,
        completion: 0,
      },
      {
        day: "Friday",
        image: fridayImg,
        title: "Endurance & Cardio",
        exercises: [
          { name: "Jogging", sets: 1, reps: 1, time: "20 min" },
          { name: "Jump Rope", sets: 3, reps: 100, time: "10 min" },
        ],
        calories: 280,
        completion: 0,
      },
      {
        day: "Saturday",
        image: saturdayImg,
        title: "Flexibility & Stretching",
        exercises: [
          { name: "Yoga Flow", sets: 1, reps: 1, time: "25 min" },
          { name: "Hamstring Stretch", sets: 2, reps: 10, time: "10 min" },
        ],
        calories: 200,
        completion: 0,
      },
      {
        day: "Sunday",
        image: sundayImg,
        title: "Active Rest",
        exercises: [
          { name: "Light Walk", sets: 1, reps: 1, time: "30 min" },
          { name: "Breathing Exercise", sets: 1, reps: 1, time: "10 min" },
        ],
        calories: 150,
        completion: 0,
      },
    ],
  },

  Normal: {
    title: "💪 Balanced Fitness Routine",
    days: [
      {
        day: "Monday",
        image: mondayImg,
        title: "Full Body Workout",
        exercises: [
          { name: "Jumping Jacks", sets: 3, reps: 30, time: "10 min" },
          { name: "Push-ups", sets: 3, reps: 12, time: "10 min" },
        ],
        calories: 250,
        completion: 0,
      },
      {
        day: "Tuesday",
        image: tuesdayImg,
        title: "Lower Body Sculpt",
        exercises: [
          { name: "Lunges", sets: 3, reps: 12, time: "10 min" },
          { name: "Squats", sets: 3, reps: 12, time: "10 min" },
        ],
        calories: 270,
        completion: 0,
      },
      {
        day: "Wednesday",
        image: wednesdayImg,
        title: "Core Focus",
        exercises: [
          { name: "Plank", sets: 3, reps: 1, time: "10 min" },
          { name: "Crunches", sets: 3, reps: 15, time: "8 min" },
        ],
        calories: 230,
        completion: 0,
      },
      {
        day: "Thursday",
        image: thursdayImg,
        title: "Upper Body",
        exercises: [
          { name: "Pull-ups", sets: 3, reps: 8, time: "10 min" },
          { name: "Dumbbell Rows", sets: 3, reps: 10, time: "8 min" },
        ],
        calories: 280,
        completion: 0,
      },
      {
        day: "Friday",
        image: fridayImg,
        title: "Cardio Burn",
        exercises: [
          { name: "Running", sets: 1, reps: 1, time: "20 min" },
          { name: "Jump Rope", sets: 3, reps: 80, time: "10 min" },
        ],
        calories: 300,
        completion: 0,
      },
      {
        day: "Saturday",
        image: saturdayImg,
        title: "Mobility & Stretch",
        exercises: [
          { name: "Yoga Flow", sets: 1, reps: 1, time: "20 min" },
          { name: "Neck Stretch", sets: 2, reps: 10, time: "5 min" },
        ],
        calories: 180,
        completion: 0,
      },
      {
        day: "Sunday",
        image: sundayImg,
        title: "Rest & Recovery",
        exercises: [
          { name: "Light Walk", sets: 1, reps: 1, time: "30 min" },
        ],
        calories: 120,
        completion: 0,
      },
    ],
  },

  Overweight: {
    title: "🔥 Fat Burn & Stamina Plan",
    days: [
      {
        day: "Monday",
        image: mondayImg,
        title: "Cardio Kickstart",
        exercises: [
          { name: "Brisk Walk", sets: 1, reps: 1, time: "20 min" },
          { name: "Jumping Jacks", sets: 3, reps: 30, time: "10 min" },
        ],
        calories: 320,
        completion: 0,
      },
      {
        day: "Tuesday",
        image: tuesdayImg,
        title: "Lower Body Strength",
        exercises: [
          { name: "Bodyweight Squats", sets: 3, reps: 15, time: "10 min" },
          { name: "Lunges", sets: 3, reps: 10, time: "10 min" },
        ],
        calories: 300,
        completion: 0,
      },
      {
        day: "Wednesday",
        image: wednesdayImg,
        title: "Core & Stability",
        exercises: [
          { name: "Plank", sets: 3, reps: 1, time: "8 min" },
          { name: "Leg Raises", sets: 3, reps: 12, time: "8 min" },
        ],
        calories: 250,
        completion: 0,
      },
      {
        day: "Thursday",
        image: thursdayImg,
        title: "HIIT Circuit",
        exercises: [
          { name: "Burpees", sets: 3, reps: 10, time: "10 min" },
          { name: "Mountain Climbers", sets: 3, reps: 15, time: "8 min" },
        ],
        calories: 350,
        completion: 0,
      },
      {
        day: "Friday",
        image: fridayImg,
        title: "Power Walk & Core",
        exercises: [
          { name: "Power Walk", sets: 1, reps: 1, time: "25 min" },
          { name: "Crunches", sets: 3, reps: 20, time: "10 min" },
        ],
        calories: 280,
        completion: 0,
      },
      {
        day: "Saturday",
        image: saturdayImg,
        title: "Stretch & Recovery",
        exercises: [
          { name: "Yoga", sets: 1, reps: 1, time: "25 min" },
        ],
        calories: 180,
        completion: 0,
      },
      {
        day: "Sunday",
        image: sundayImg,
        title: "Rest Day",
        exercises: [{ name: "Relaxation", sets: 1, reps: 1, time: "—" }],
        calories: 120,
        completion: 0,
      },
    ],
  },

  Obese: {
    title: "⚡ Low Impact Fat Reduction Plan",
    days: [
      {
        day: "Monday",
        image: mondayImg,
        title: "Walking & Stretching",
        exercises: [
          { name: "Walk", sets: 1, reps: 1, time: "25 min" },
          { name: "Shoulder Rolls", sets: 2, reps: 10, time: "5 min" },
        ],
        calories: 220,
        completion: 0,
      },
      {
        day: "Tuesday",
        image: tuesdayImg,
        title: "Chair Workouts",
        exercises: [
          { name: "Chair Squats", sets: 3, reps: 10, time: "10 min" },
          { name: "Arm Circles", sets: 2, reps: 15, time: "5 min" },
        ],
        calories: 230,
        completion: 0,
      },
      {
        day: "Wednesday",
        image: wednesdayImg,
        title: "Light Cardio",
        exercises: [
          { name: "Slow March", sets: 1, reps: 1, time: "20 min" },
          { name: "Side Bends", sets: 3, reps: 15, time: "8 min" },
        ],
        calories: 260,
        completion: 0,
      },
      {
        day: "Thursday",
        image: thursdayImg,
        title: "Core Mobility",
        exercises: [
          { name: "Seated Twist", sets: 2, reps: 10, time: "10 min" },
          { name: "Neck Stretch", sets: 2, reps: 10, time: "5 min" },
        ],
        calories: 200,
        completion: 0,
      },
      {
        day: "Friday",
        image: fridayImg,
        title: "Light Resistance",
        exercises: [
          { name: "Wall Push-ups", sets: 3, reps: 10, time: "10 min" },
          { name: "Step Touches", sets: 3, reps: 15, time: "8 min" },
        ],
        calories: 250,
        completion: 0,
      },
      {
        day: "Saturday",
        image: saturdayImg,
        title: "Stretch & Cool Down",
        exercises: [
          { name: "Yoga Stretch", sets: 1, reps: 1, time: "20 min" },
        ],
        calories: 150,
        completion: 0,
      },
      {
        day: "Sunday",
        image: sundayImg,
        title: "Rest & Walk",
        exercises: [
          { name: "Leisure Walk", sets: 1, reps: 1, time: "20 min" },
        ],
        calories: 120,
        completion: 0,
      },
    ],
  },
};
export default sampleWorks;