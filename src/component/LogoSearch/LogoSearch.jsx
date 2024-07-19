import React from 'react'
import Logo from '../../img/logo.png'
import { UilSearch } from "@iconscout/react-unicons";
import './Logosearch.css'

const LogoSearch=()=>{
    return(
        <div className='Logo-search'>
            <img src={Logo} alt=''></img>
            <div className='Search'>
                <input type='text' placeholder='#Explore'/>
                <div className='s-icon'>
                    <UilSearch/>
                </div>
            </div>
        </div>
    )
}

export default LogoSearch;