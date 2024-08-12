import { useContext, useState, React } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const navLinks = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Browse",
        path: "/browse",
    },
    {
        title: <i className="fa-solid fa-magnifying-glass"></i>,
        path: "/search",
    },
    {
        title: <button>Sign Up</button>,
        path: "/signup",
    },
    {
        title: <button>Log In</button>,
        path: "/login",
    },
    {
        title: <i className="fa-regular fa-bell"></i>,
        path: "/notifications",
    },
    {
        title: "Write",
        path: "/editor",
    },
]

export default function Navigation () {

    const [ searchBoxVisisbility, setSearchBoxVisibility ] = useState(false)

    const { } = useContext(UserContext);

    return (
        <nav className="navbar">

            <span>Coffee Shop</span>

            <ul>
                { navLinks.map((link, index) => ( 
                  <li key = {index}>
                    <Link to ={link.path}>{link.title}</Link>
                </li>  
                ))}
            </ul>

        </nav>
    )
};