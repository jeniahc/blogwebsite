import "../assets/input.css";
import {useState} from 'react';

const InputBox = ({ name, type, id, value, placeholder, icon }) => {

const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className= "input-form">

            <i className={"fi " + icon + " input-icon"}></i>

            <input 
            name={name} 
            type={type === "password" ? passwordVisible ? "text" : "password" : type}
            placeholder={placeholder}
            defaultValue={value}
            id={id}
            autoComplete="off"
            className="input-box"
            />

            {
                type === "password" ?
                <i className={"fa-regular fa-eye" + (!passwordVisible ? "-slash": "") + 
                " input-icon"} onClick = {() => setPasswordVisible(currentVal => !currentVal)}></i>
                :""
            }
            

        </div>
    )
}

export default InputBox;