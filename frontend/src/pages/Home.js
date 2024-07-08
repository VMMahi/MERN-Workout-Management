import { useState, useEffect } from "react";
import Workoutdetails from '../components/workoutdetails';
import WorkoutForm from "../components/Workoutform";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
const Home = ()=> {

    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(()=>{
        const fetchworkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_WORKOUTS', payload:json})
            }
        }
        fetchworkouts()
    },[dispatch]);

    return (
        <div className="Home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <Workoutdetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
}

export default Home;
