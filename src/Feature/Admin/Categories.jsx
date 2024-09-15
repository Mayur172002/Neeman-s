import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Delete_categories, get_categories, Update_categories } from './Slice/CategoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
function Categories() {
    const dispatch = useDispatch()
    const { categories } = useSelector((state) => state.categories)
    useEffect(() => {
        dispatch(get_categories())
    }, [])
    const [data1, setdata1] = useState({
        name: "",
        image: "",
        quantity: "",
    });
    const EditHandel = async (id) => {
        const result = categories.filter((value) => { return value.id == id })
        console.log(result);
        setdata1(result[0])
    }
    const ChangeHandel = (e) => {
        setdata1({ ...data1, [e.target.name]: e.target.value })
    }
    const SubmitHandel = async (e) => {
        e.preventDefault()
        dispatch(Update_categories(data1))
        toast.success("Data Update Success")
        setdata1({ ...data1, name: "", image: "", quantity: "" })
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
                                    <h4 className="card-title">Categories Status</h4>
                                            <div className='d-flex  align-items-center'>
                                                <NavLink className="nav-link btn btn-success create-new-button" to="/add_cate">+ Add Categories</NavLink>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>

                                                        <th> Categories Image</th>
                                                        <th> Categories Name</th>
                                                        <th> Categories ID </th>
                                                        <th> Categories Quantity </th>
                                                        <th> Action </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        categories && categories.map((value, index) => {
                                                            return (

                                                                <tr key={index}>

                                                                    <td>
                                                                        <img src={value.image} style={{ width: "50px", height: "50px" }} alt="" />
                                                                    </td>
                                                                    <td>
                                                                        <span className="pl-2">{value.name}</span>
                                                                    </td>
                                                                    <td> {value.id} </td>
                                                                    <td>{value.quantity}</td>
                                                                    <td>
                                                                        <div className="form-button-action ">
                                                                            <button type="button" onClick={() => EditHandel(value.id)} className="btn btn-link btn-secondary" data-toggle="modal" data-target="#myModal">
                                                                                <i className="fa fa-edit" />
                                                                            </button>
                                                                            <button type="button" data-bs-toggle="tooltip" onClick={() => {
                                                                                dispatch(Delete_categories(value.id))
                                                                                toast.success("Delete Date Success")
                                                                                return dispatch(get_categories())
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
                                                                    <input type="text" className="form-control" placeholder="Categories Name" name='name' value={data1.name} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="url" className="form-control" placeholder="Categories Image" name='image' value={data1.image} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" placeholder="Categories Quantity" name='quantity' value={data1.quantity} />
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

export default Categories