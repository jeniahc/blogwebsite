import AnimationWrapper from "../common/pageanimation";
import InputBox from "../components/input";
import { useRef, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../App";
import { storeInSession } from "../common/session";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
//import { useQuery } from "react-query";

//import { authWithGoogle } from "..common/firebase";

import "../assets/input.css";


const UserAuthForm = ({ type }) => {

    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext)

    console.log(access_token)

    const userAuthThroughServer = (serverRoute, formData) => {

        console.log('http://localhost:3000' + serverRoute, formData)

        axios.post('http://localhost:3000' + serverRoute, formData)
        .then(({ data }) => {

            storeInSession("user", JSON.stringify(data))
            console.log(sessionStorage)

            setUserAuth(data)

            console.log(data);
          //  response: {
             //   data: {
                    
             //   }
           // }
        })
        .catch(({ response }) => {
            toast.error(response.data.error)
        })
       // axios {
           // response: {
             //   data: {

              //  }
           // }
       // }

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        let serverRoute = type === "log-in" ? "/login" : "/signup";

        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        //formData

        let form = new FormData(e.currentTarget);
        let formData = {};

        for(let [key, value] of form.entries()){
            formData[key] = value;
        }

        let { fullname, email, password } = formData;

        //form validation
       
        if(fullname){
            if(fullname.length < 2){
                return toast.error("Full name must be at least 2 letters long")
             }
        }
        if(email){
            if(!email.length){
                return toast.error("Enter email")
            }
        }
        if(!emailRegex.test(email)){
            return toast.error("Email is invalid")
        }
        if(!passwordRegex.test(password)){
            return toast.error("Password should be 6 to 20 characters long, with at least 1 numeric, 1 uppercase letter and 1 special character.")
        }

        userAuthThroughServer(serverRoute, formData)

    }


    return (

        access_token ?
        <Navigate to="/" />
        :

        <AnimationWrapper keyValue={type}>
        <section className="user-auth">
            <Toaster />
            <form onSubmit = {handleSubmit} >
                <h1>
                    {type === "Log In" ? "Welcome Back" : "Join Coffee Shop"}
                </h1>

                {
                    type !== "Log In" ?
                    
                    <InputBox
                    name="fullname"
                    type="text"
                    placeholder="Full Name"
                    icon="fa-regular fa-user"
                    />
                    :""
                }
                    <InputBox
                    name="email"
                    type="email"
                    placeholder="Email"
                    onkeyup="showHint(this.value)"
                    icon="fa-regular fa-envelope"
                    />

                    <InputBox
                    name="password"
                    type="password"
                    placeholder="Password"
                    icon="fa-solid fa-lock"
                    />

                <button 
                    className="loginBtn"
                    type="submit"
                    >
                    { type }
                </button>
                <div className="">
                    <hr />
                    <p>or</p>
                    <hr />
                </div>
                <button className="loginBtn">
                    Login with Google
                </button>

                {
                    type === "Log In" ?
                    <p>
                        Don't have an account ?
                        <Link to="/signup" className="link">
                            Sign up here
                        </Link>
                    </p>
                    :
                    <p>
                        Already a member ?
                        <Link to="/login" className="link">
                            Log in here
                        </Link>
                    </p>
                }

            </form>
        </section>
        </AnimationWrapper>
    )
}

export default UserAuthForm;