'use client'

import defaultImg from '../../assets/default_img.png'
import { useState, useEffect, useContext } from 'react'
import { client } from '@/app/ApolloWrapper';
import { Context } from '@/app/layout';

export default function ProfilePage(){

    const {userData} = useContext(Context)

    if(!userData){
        return <p>log in to view this page</p>
    }

    const {email, username} = userData

    return(
        <>
        <div className='flex'>
            <div>
                <img src={defaultImg.src} width={200} height={200} alt='profile picture'/>
                <button>Upload new profile picture</button>
            </div>
            <div className='flex flex-col'>
                <input 
                    placeholder="username" 
                    value={username} 
                    onChange=""/>
                <input 
                    placeholder="email" 
                    value={email} 
                    onChange=""/>
            </div>
        </div>
        </>
    )
}