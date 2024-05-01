import Link from "next/link"

export default function Header(){
    return(
        <ul className="flex">
            <li className="mx-5"><Link href="/">Home</Link></li>
            <li className="mx-5"><Link href="/pages/notifications">Notifications</Link></li>
            <li className="mx-5"><Link href="/pages/messages">messages</Link></li>
            <li className="mx-5"><Link href="/pages/profile">Profile</Link></li>
            <button className="mx-5"><Link href="/pages/post">Post</Link></button>
        </ul>
    )
}