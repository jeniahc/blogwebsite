import express from "express";
//import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import nanoid from "nanoid";
import jwt from "jsonwebtoken";
import cors from "cors";
require('dotenv').config()

import User from "./src/pages/user.js";

const server = express();
const PORT = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json());
server.use(cors());

//mongoose.connect(process.env.REACT_APP_DB_Location, {
   // autoIndex: true
//})

    const formatDatatoSend = (user) => {

        const access_token = jwt.sign({ id: user_id }, process.env.REACT_APP_SECRET_ACCESS_KEY)

        return {
            access_token,
            profile_img: user.personal_info.profile_img,
            username: user.personal_info.username,
            fullname: user.personal_info.fullname
        }
    }

const generateUsername = async (email) => {
    let username = email.split("@")[0];

    let isUsernameNotUnique = await User.exists({ "personal_info.username" : username }).then((result) => result)
    
    isUsernameNotUnique ? username += nanoid().substring(0, 5) : "";

    return username;
}

server.post("/signup", (req, res) => {

    console.log(req.body)

    res.json(req.body)

    let { fullname, email, password } = req.body;

    //validating data from frontend

    if(fullname.length < 2){
        return res.status(403).json({ "Error" : "Full name must be at least 2 letters long"})
    }
    if(!email.length){
        return res.status(403).json({ "Error" : "Email is invalid"})
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({ "Error" : "Full name must be at least 2 letters long"})
    }
    if(!passwordRegex.test(password)){
        return res.status(403).json({ "Error" : "Password should be 6 to 20 characters long, with at least 1 numeric, 1 uppercase letter and 1 special character."})
    }

    bcrypt.hash(password, 10, async (err, hashed_password) =>{
        
        let username = await generateUsername(email);

        let user = new User({
            personal_info: { fullname, email, password: hashed_password, username }
        })

        user.save().then((u) => {
            return res.status(200).json(formatDatatoSend(u))
        })

        .catch(err => {
            return res.status(500).json({ "error": err.message })
        })
    })

})

server.post("/login", (req, res) => {

    let { email, password } = req.body;

    
    User.findOne({ "personal_info.email": email })
    .then((user) => {
        if(!user){
        return res.status(403).json({ "Error": "Email not found" });
    }
       
        bycript.compare(password, user.personal_info.password, (err, result) => {

            if(err){
                return res.status(403).json({ "Error": "Email occurred while login. Please try again." });
            }

            if(!result){
                return res.status(403).json({ "Error": "Incorrect password" });
            } else {
                return res.status(200).json(formatDatatoSend(user))
            }

        })

    })
    .catch(err =>{
        console.log(err.message);
        return res.status(500).json({ "Error": err.messsage })
    })

})

server.listen(PORT, () => {
    console.log("listening on port -> " + PORT);
})

