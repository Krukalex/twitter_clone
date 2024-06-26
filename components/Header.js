'use client'

import Link from "next/link"
import { useContext } from "react";
import { Context } from "@/app/layout";

export default function Header(){
    const {loggedIn, setLoggedIn} = useContext(Context)


    function handleLogout(){
        setLoggedIn(false)

    }

    return(
        <div className="flex w-full bg-slate-200 text-lg justify-between">
            <ul className="flex text-lg py-8 px-5 text-center">
                <li className="mr-10"><Link href="/">Home</Link></li>
                {loggedIn && <li className="mr-10"><Link href="/pages/notifications">Notifications</Link></li>}
                {loggedIn && <li className="mr-10"><Link href="/pages/messages">Messages</Link></li>}
                {loggedIn && <li className="mr-10"><Link href="/pages/profile">Profile</Link></li>}
                {loggedIn && <li className="mr-10"><Link href="/pages/post">Post</Link></li>}
            </ul>
            {loggedIn ? 
                <button className="mx-10" onClick={handleLogout}>Logout</button> 
                : <button className="mx-10"><Link href='/pages/login'>Login</Link></button> }
        </div>
    )
}