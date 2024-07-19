import React from 'react'
import './profileSide.css'
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard/ProfileCard';
import FollowersCard from '../FollowersCard/FollowersCard';


const profileSide=()=>{
    return(
        <div className='profile-side'> 
            <LogoSearch/>
            <ProfileCard location='homepage'/>
            <FollowersCard/>
        </div>
    )
}

export default profileSide;