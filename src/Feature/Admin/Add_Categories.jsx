import React, { useRef, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Insert_categories } from './Slice/CategoriesSlice';
import { Helmet } from 'react-helmet';

function Add_Categories() {
    const dispatch = useDispatch()
    const [data, setdata] = useState({
        id: "",
        name: "",
        image: "",
        quantity: "",
    });

    const ChangeHandel = (e) => {
        setdata({ ...data, id: new Date().getTime().toString(), [e.target.name]: e.target.value })
        console.log(data);
    }
    const InputRef = useRef({})
    const Validation = () => {
        let ans = true
        const InputName = [
            { name: "name", message: "Please Enter Categories Name..." },
            { name: "image", message: "Please Enter Image..." },
            { name: "quantity", message: "Please Enter Quantity..." },
        ]
        for (let i = 0; i < InputName.length; i++) {
            const Input = InputName[i]
            console.log(data[Input.name]);
            if (data[Input.name] === "") {
                toast.error(Input.message);
                if (InputRef.current[Input.name]) {
                    InputRef.current[Input.name].focus();
                }
                ans = false
                break;
            }
        }
        return ans

    }
    const SubmitHandel = async (e) => {
        e.preventDefault()
        if (Validation()) {
            dispatch(Insert_categories(data))
            toast.success("Data add Success")
            setdata({ ...data, name: "", image: "", quantity: "" })
        }
    }
    return (
        <div>
            <Helmet>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            </Helmet>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper mt-5">
                    <div className="main-panel">
                        <div className="row">
                            <div class="container">
                                <div class="page-inner d-flex justify-content-center ">
                                    <div className="col-md-10 ">
                                        <div className="card ">
                                            <form className=" p-5 contact-form" method='post' onChange={ChangeHandel} onSubmit={SubmitHandel}>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Categories Name" name='name' value={data.name} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="url" className="form-control" placeholder="Categories Image" name='image' value={data.image} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Categories Quantity" name='quantity' value={data.quantity} />
                                                </div>
                                                <div className="form-group d-flex justify-content-center ">
                                                    <button type='submit' className="Btn-1 rounded-pill" style={{width:"250px"}}>Add Categories</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add_Categories