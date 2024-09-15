import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import { Delete_Blog, Edit_Blog, Get_Blog } from './Slice/BlogSlice'
import '../Website/Style.css'
function Blog_manage() {
    const dispatch = useDispatch()
    const { blog } = useSelector((state) => state.blog)
    console.log(blog);
    useEffect(() => {
        dispatch(Get_Blog())
    }, [])
    const [data1, setdata1] = useState({
        name: "",
        image: "",
        description: "",
    });
    const EditHandel = async (id) => {
        const result = blog.filter((value) => { return value.id == id })
        console.log(result);
        setdata1(result[0])
    }
    const ChangeHandel = (e) => {
        setdata1({ ...data1, [e.target.name]: e.target.value })
    }
    const SubmitHandel = async (e) => {
        e.preventDefault()
        dispatch(Edit_Blog(data1))
        toast.success("Data Update Success")
        setdata1({ ...data1, name: "", image: "", description: "" })
    }
    return (
        <div>
            <div className="container-scroller">

                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <div className="main-panel">
                        <div className="row ">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                    <div className='d-flex flex-wrap justify-content-between mb-3 '>
                                    <h4 className="card-title">Blog Status</h4>
                                            <div className='d-flex  align-items-center'>
                                                <NavLink className="nav-link btn btn-success create-new-button" to="/add_blog">+ Add Blog</NavLink>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>

                                                        <th> Blog ID </th>
                                                        <th> Blog Image</th>
                                                        <th> Blog Name</th>
                                                        {/* <th> Categories Quantity </th> */}
                                                        <th> Action </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        blog && blog.map((value, index) => {
                                                            return (

                                                                <tr key={index}>

                                                                    <td> {value.id} </td>
                                                                    <td>
                                                                        <img src={value.image} style={{ width: "50px", height: "50px" }} alt="" />
                                                                    </td>
                                                                    <td className='text-center' >
                                                                        <span >{value.name}</span>
                                                                    </td>
                                                                    {/* <td>{value.quantity}</td> */}
                                                                    <td>
                                                                        <div className="form-button-action ">
                                                                            <button type="button" onClick={() => EditHandel(value.id)} className="btn btn-link btn-secondary" data-toggle="modal" data-target="#myModal">
                                                                                <i className="fa fa-edit" />
                                                                            </button>
                                                                            <button type="button" data-bs-toggle="tooltip" onClick={() => {
                                                                                dispatch(Delete_Blog(value.id))
                                                                                toast.success("Delete Date Success")
                                                                                return dispatch(Get_Blog())
                                                                            }} title className="btn btn-link btn-danger ml-2" data-original-title="Remove">
                                                                                <i className="fa fa-times" />
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                            <div className="modal" id="myModal">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        {/* Modal Header */}
                                                        <div className="modal-header">
                                                            <button type="button" className="close" data-dismiss="modal">×</button>
                                                        </div>
                                                        {/* Modal body */}
                                                        <div className="modal-body">
                                                            <form className=" contact-form" method='post' onChange={ChangeHandel} onSubmit={SubmitHandel}>
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" placeholder="Blog Name" name='name' value={data1.name} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="url" className="form-control" placeholder="Blog Image" name='image' value={data1.image} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" placeholder="Blog description" name='description' value={data1.description} />
                                                                </div>
                                                                <div className="form-group d-flex justify-content-center ">
                                                                    <button type='submit' className="btn btn-success py-3 px-5" >Save</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        {/* Modal footer */}

                                                    </div>
                                                </div>
                                            </div>
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

export default Blog_manage