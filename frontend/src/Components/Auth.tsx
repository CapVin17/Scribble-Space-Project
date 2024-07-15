import { signinInput } from "@capvin17/medium-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({type}: {type: "signin" | "signup"}) => {
    const navigate = useNavigate();
    const [postInputs, setpostInputs] = useState<signinInput>({
        name: "",
        email: "",
        password: "",
    })

    async function sendRequest()
    {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"? "signup" : "signin"}`,postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate('/blogs');
        } catch (error) {
            alert("Error while signup: Maybe the user already exists try other name")
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-7 pb-10">
                <div className="font-bold text-4xl">
                    Create an account
                </div>
                <div className="text-md text-slate-400 text-center">
                    {type === "signup" ? "Already have an account? " : "Dont have an account"}
                    <Link to={type === "signin" ? "/signup" : "/signin"} className="underline hover:underline-offset-2 pl-1">
                        {type === "signup" ? "Sign In" : "Sign Up"}
                    </Link>
                </div>
            </div>
            <div>
                {type === "signup"? <LabeledInput label = "Name" placeholder="Enter your username" onChange={(e) => {
                setpostInputs({
                    ...postInputs, // logs old data over here
                    name: e.target.value,
                })
                }}  /> : null} 
                <LabeledInput label = "Email" placeholder="Enter your email" onChange={(e) => {
                setpostInputs({
                    ...postInputs, // logs old data over here
                    email: e.target.value,
                })
                }}  />
                <LabeledInput label = "Password" type = {"password" }placeholder="Enter your password" onChange={(e) => {
                setpostInputs({
                    ...postInputs, // logs old data over here
                    password: e.target.value
                })
                }}  />
                <button type="button" onClick={sendRequest} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-5">{type === "signup"? "Sign Up" : "Sign In"}</button>
            </div>
            </div>
            </div>
    </div>
}

interface LabeledInputType{
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabeledInput({onChange, label, placeholder,type} : LabeledInputType) 
{
    return <div>
        <div>
            <label className="block mb-2 text-sm text-black font-semibold">{label}</label>
            <input onChange = {onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-6 " placeholder={placeholder} required />
        </div>
    </div>
}
