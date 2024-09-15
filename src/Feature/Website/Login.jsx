import React, { useRef, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import './Style.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
    const redirect = useNavigate()
    const [mydata, setdata] = useState({
        email: "",
        password: ""
    });
    const ChangeHandel = (e) => {
        setdata({ ...mydata, [e.target.name]: e.target.value })
        console.log(mydata);
    }

    const InputRef = useRef({})
    const Validation = () => {
        let ans = true;
        const InputName = [
            { name: "email", message: "Please Enter Email..." },
            { name: "password", message: "Please Enter Password..." }
        ];

        for (let i = 0; i < InputName.length; i++) {
            const Input = InputName[i];
            if (mydata[Input.name] === "") {
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
            const result = await axios.get(`http://localhost:3000/user?email=${mydata.email}`)
            console.log(result);
            if (result.data.length > 0) {
                if (result.data[0].password == mydata.password) {
                    if (result.data[0].status == "Unblock") {
                        localStorage.setItem('wid', result.data[0].id)
                        localStorage.setItem('wname', result.data[0].name)
                        toast.success("Login Success !!")
                        return redirect('/')
                    }
                    else {
                        toast.error("Your Account Blocked Contact Neeman's Shop !!")
                        setdata({ email: "", password: "" })
                        return false
                    }
                }
                else {
                    toast.error("Password does not match !!")
                    setdata({ ...mydata, email: "", password: "" })
                    return false
                }
            }
            else {
                toast.error("Email does not Exist !!")
                setdata({ ...mydata, email: "", password: "" })
                return false
            }
        }
    }
    return (
        <div>
            <Header />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center mt-5">LOGIN</h2>
                        <form method='post' onChange={ChangeHandel} onSubmit={SubmitHandel}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" name='email' ref={e => (InputRef.current['email'] = e)} value={mydata.email} className="form-control" id="email" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" ref={e => (InputRef.current['password'] = e)} name='password' value={mydata.password} className="form-control" id="password" />
                            </div>
                            <div className='mb-3'>
                                    <label className='' for="offer_sms_checkbox"><NavLink to={"/forget_password"} style={{color:"black"}}>Forget Password?</NavLink></label>
                            </div>
                            <button className="Btn-1 w-100" type='submit' >Login</button>
                            {/* <button type="submit" className="btn btn-primary w-100">Login</button> */}
                        </form>
                        <p className="text-center mt-3">Don't have an account? <NavLink to="/signup" className='text-body'>Sign up</NavLink></p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Login