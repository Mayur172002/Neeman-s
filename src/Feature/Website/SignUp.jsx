import React, { useRef, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import './Style.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { Insert_User } from '../Website/Slice/UserSlice'
function SignUp() {
    const dispatch = useDispatch()
    const [data, setdata] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        confirmPass: "",
        image: "",
        number: "",
        status: "Unblock"
    })
    const ChangeHandel = (e) => {
        setdata({ ...data, id: new Date().getTime().toString(), [e.target.name]: e.target.value })
        console.log(data);
    }
    const InputRef = useRef({})
    const Validation = () => {
        let ans = true;
        const InputName = [
            { name: "name", message: "Please Enter Name..." },
            { name: "email", message: "Please Enter Email..." },
            { name: "image", message: "Please Enter Image..." },
            { name: "number", message: "Please Enter Number..." },
            { name: "password", message: "Please Enter Password..." },
            { name: "confirmPass", message: "Please Enter confirmPass..." }
        ];

        for (let i = 0; i < InputName.length; i++) {
            const Input = InputName[i];
            if (data[Input.name] === "") {
                toast.error(Input.message);
                if (InputRef.current[Input.name]) {
                    InputRef.current[Input.name].focus();
                }
                ans = false;
                break;
            }
        }
        return ans;
    };
    const SubmitHandel = async (e) => {
        e.preventDefault()
        if (Validation()) {
            if (data.password === data.confirmPass) {
                dispatch(Insert_User(data))
                toast.success("SignUp Successfully")
                setdata({ ...data, name: "", email: "", password: "", confirmPass: "", image: "", number: "" })
            }
            else {
                toast.error("Password does match!!")
                setdata({ ...data, password: "", confirmPass: "" })
            }
        }
    }
    return (
        <div>
            <Header />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center mt-5">Sign Up</h2>
                        <form method='post' onChange={ChangeHandel} onSubmit={SubmitHandel}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" name='name' value={data.name} ref={(e) => InputRef.current['name'] = e} className="form-control" id="username" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" name='email' value={data.email} ref={(e) => InputRef.current['email'] = e} className="form-control" id="email" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Image</label>
                                <input type="url" name='image' value={data.image} ref={(e) => InputRef.current['image'] = e} className="form-control" id="email" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Number</label>
                                <input type="number" name='number' value={data.number} ref={(e) => InputRef.current['number'] = e} className="form-control" id="email" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name='password' value={data.password} ref={(e) => InputRef.current['password'] = e} className="form-control" id="password" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                                <input type="password" name='confirmPass' value={data.confirmPass} ref={(e) => InputRef.current['confirmPass'] = e} className="form-control" id="confirm-password" />
                            </div>
                            <button className="Btn-1 w-100" type='submit' >Sign Up</button>
                        </form>
                        <p className="text-center mt-3">Already have an account? <NavLink to="/login" className='text-body'>Login</NavLink></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SignUp