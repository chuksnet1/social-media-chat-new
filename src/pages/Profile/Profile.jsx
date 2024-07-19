import React from 'react';
import './Profile.css'
import ProfileLeft from '../../component/ProfileLeft/ProfileLeft';
import ProfileCard from '../../component/ProfileCard/ProfileCard';
import PostSide from '../../component/PostSide/PostSide';
import RightSide from '../../component/RightSide/RightSIde';


const Profile=()=>{
    return <div className='Profile'>
        <ProfileLeft/>
        <div className='profile-center'>
            <ProfileCard location= "profilePage"/>
            <PostSide/>
        </div>
        <RightSide/>
    </div>
}

export default Profile;