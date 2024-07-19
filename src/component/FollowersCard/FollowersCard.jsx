import React from 'react'
import './FollowersCard.css'
import { Followers } from "../Data/Data";
import { Users } from '../Users/Users';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getAllUser } from "../../api/UserRequest";


const FollowersCard=()=>{
    const [persons, setPersons] = useState([])
    const {user} = useSelector((state)=> state.authReducer.authData);


    useEffect(()=>{
        const fetchPerson = async()=>{
            const {data} = await getAllUser();
            setPersons(data)
        }
        fetchPerson()
    },[])
    return <div className='Followers-Card'>
        <h3>People you may Know</h3>
        {persons.map((person, id)=>{
            if (person._id !== user._id) {
                return (
                    <Users person={person} key={id}/>
                )
            } 
        })}
    </div>
}

export default FollowersCard;