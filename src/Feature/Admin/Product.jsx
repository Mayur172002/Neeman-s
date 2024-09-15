import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { toast } from 'react-toastify'
import { get_categories } from './Slice/CategoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Delete_Product, Edit_Product, Get_Product } from './Slice/ProductSlice'
import { NavLink } from 'react-router-dom'
import Select from 'react-select'
function Product() {
    const dispatch = useDispatch()
    const { product } = useSelector((state) => state.product)
    const { categories } = useSelector((state) => state.categories)
    useEffect(() => {
        dispatch(Get_Product())
        dispatch(get_categories())
    }, [dispatch])
    const [data, setdata] = useState({
        cate_Id: "",
        price: "",
        name: "",
        image: "",
        discount: "",
        color: "",
        pro_price: "",
        image1: "",
        image2: "",
    });
    const [selectedOption, setSelectedOption] = useState([])
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        const selectId = selectedOption.map((option) => option.value).join('||');
        setdata({ ...data, cate_Id: selectId })

    };
    const multicate = categories.map((cate) => ({
        value: cate.id,
        label: cate.name
    }))
    const EditHandel = async (id) => {
        const result = product.filter((value) => { return value.id == id })
        console.log(result);
        setdata(result[0])
    }
    const ChangeHandel = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    const SubmitHandel = async (e) => {
        e.preventDefault()
        dispatch(Edit_Product(data))
        toast.success("Data Update Success")
        setdata({ ...data, name: "", image: "", price: "", discount: "", cate_Id: "", pro_price: "", color: "", image1: "", image2: "" })
        setSelectedOption([])
        dispatch(Get_Product())
        // setTimeout(() => {
        //     window.location.reload();
        // }, 2000);
    }
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);
    console.log("Current Products:", currentProducts);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(product.length / productsPerPage);
    return (
        <div>

            <div className="container-scroller ">
                <Navbar />
                <div className="container-fluid page-body-wrapper ">
                    <div className="main-panel">
                        <div className="row ">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body ">
                                        <div className='d-flex flex-wrap justify-content-between mb-3 '>
                                            <h4 className="card-title">Prodcut Status</h4>
                                            <div className='d-flex  align-items-center'>
                                                <NavLink className="nav-link btn btn-success create-new-button" to="/add_product">+ Add Product</NavLink>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>

                                                        <th>Categories ID</th>
                                                        <th> Prodcut Image</th>
                                                        <th> Prodcut Name</th>
                                                        <th> Prodcut Price </th>
                                                        <th> Prodcut Color </th>
                                                        <th>Product Discount</th>
                                                        <th> Action </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentProducts && currentProducts.map((value, index) => {
                                                            return (

                                                                <tr key={index}>

                                                                    <td> {value.id} </td>
                                                                    <td>
                                                                        <img src={value.image} style={{ width: "50px", height: "50px" }} alt="" />
                                                                    </td>
                                                                    <td>
                                                                        <span className="pl-2">{value.name}</span>
                                                                    </td>
                                                                    <td>₹{value.price}</td>
                                                                    <td>{value.color}</td>
                                                                    <td>{value.discount}% off</td>
                                                                    <td>
                                                                        <div className="form-button-action ">
                                                                            <button type="button" onClick={() => EditHandel(value.id)} className="btn btn-link btn-secondary" data-toggle="modal" data-target="#myModal">
                                                                                <i className="fa fa-edit" />
                                                                            </button>
                                                                            <button type="button" data-bs-toggle="tooltip" onClick={() => {
                                                                                dispatch(Delete_Product(value.id))
                                                                                toast.success("Delete Date Success")
                                                                                return currentProducts
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
                                            <div className="row mt-5">
                                                <div className="col text-center">
                                                    <div className="block-27">
                                                        <ul>
                                                            <li>
                                                                <a href="#" onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}>
                                                                    &lt;
                                                                </a>
                                                            </li>
                                                            {[...Array(totalPages).keys()].map((_, index) => {
                                                                const page = index + 1;
                                                                return (
                                                                    <li
                                                                        key={page}
                                                                        className={currentPage === page ? 'active' : ''}
                                                                        onClick={() => paginate(page)}
                                                                    >
                                                                        <a href="#">{page}</a>
                                                                    </li>
                                                                );
                                                            })}
                                                            <li>
                                                                <a href="#" onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : currentPage)}>
                                                                    &gt;
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal" id="myModal">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        {/* Modal Header */}
                                                        <div className="modal-header">
                                                            <button type="button" className="close" data-dismiss="modal">×</button>
                                                        </div>
                                                        {/* Modal body */}
                                                        <div className="modal-body">
                                                            <form className=" p-5 contact-form" method='post' onChange={ChangeHandel} onSubmit={SubmitHandel}>
                                                                {/* <select class="form-select form-select-lg mb-3" value={data.cate_Id} name='cate_Id' onChange={ChangeHandel} style={{ width: "100%", height: "30px" }}>
                                                                    <option value='' >Select Categories</option>
                                                                    {
                                                                        categories && categories.map((value) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select> */}
                                                                <Select options={multicate} value={selectedOption} onChange={handleChange} isMulti={true} className="mb-3 text-dark" placeholder="Select Categories" />
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" placeholder="Product Name" name='name' value={data.name} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="url" className="form-control" placeholder="Product Image 1" name='image' value={data.image} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="url" className="form-control" placeholder="Product Image 2" name='image1' value={data.image1} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="url" className="form-control" placeholder="Product Image 3" name='image2' value={data.image2} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" placeholder="Product Price" name='price' value={data.price} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" placeholder="Product Color" name='color' value={data.color} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" placeholder="Product Price" name='pro_price' value={data.pro_price} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" placeholder="Product Discount" name='discount' value={data.discount} />
                                                                </div>
                                                                <div className="form-group d-flex justify-content-center ">
                                                                    <button type='submit' className="btn btn-success py-3 px-5 ">Save</button>
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
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Product