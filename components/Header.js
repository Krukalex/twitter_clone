import Link from "next/link"

export default function Header(){
    return(
        <ul className="flex text-lg bg-slate-200 py-8 px-5 w-full text-center">
            <li className="mr-10"><Link href="/">Home</Link></li>
            <li className="mr-10"><Link href="/pages/notifications">Notifications</Link></li>
            <li className="mr-10"><Link href="/pages/messages">messages</Link></li>
            <li className="mr-10"><Link href="/pages/profile">Profile</Link></li>
            <button className="mr-10"><Link href="/pages/post">Post</Link></button>
        </ul>
    )
}