import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Insert_Product } from './Slice/ProductSlice';
import { get_categories } from './Slice/CategoriesSlice';
import { Helmet } from 'react-helmet';
import Select from 'react-select'
function Add_Product() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_categories())
    }, [])
    const { categories } = useSelector((state) => state.categories)
    console.log(categories);
    const [data, setdata] = useState({
        cate_Id: "",
        id: "",
        name: "",
        image: "",
        image1: "",
        image2: "",
        price: "",
        discount: "",
        color: "",
        pro_price: "",
        new_product: "",
    });
    const [selectedOption, setSelectedOption] = useState([]);
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        const selectId = selectedOption.map((option) => option.value).join('||');
        setdata({ ...data, cate_Id: selectId })
    };
    const multicate = categories.map((cate) => ({
        value: cate.id,
        label: cate.name

    }))
    const ChangeHandel = (e) => {
        setdata({ ...data, id: new Date().getTime().toString(), [e.target.name]: e.target.value })
        console.log(data);
    }
    const InputRef = useRef({})
    const Validation = () => {
        let ans = true
        const InputName = [
            // { name: "cate_Id", message: "Please Enter Select Categories..." },
            { name: "name", message: "Please Enter Name..." },
            { name: "image", message: "Please Enter Image..." },
            { name: "price", message: "Please Enter Price..." },
            { name: "pro_price", message: "Please Enter Product Price..." },
            { name: "color", message: "Please Enter Color..." },
            { name: "discount", message: "Please Enter Discount..." },
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
        if (data.new_product === "") {
            const { new_product, ...Submitdata } = data
            dispatch(Insert_Product(Submitdata))
            toast.success("Data add Success")
            setdata({ ...data, name: "", image: "", price: "", cate_Id: "", discount: "", color: "", pro_price: "",image1:"" ,image2:""})
            return false
        }
        else {
            if (Validation()) {
                dispatch(Insert_Product(data))
                toast.success("Data add Success")
                setdata({ ...data, name: "", image: "", price: "", cate_Id: "", discount: "", color: "", pro_price: "",new_product:"",image1:"",image2:"" })
                setSelectedOption([])
            }
        }

    }

    return (
        <div>
            <Helmet>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            </Helmet>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper mt-5">
                    <div className="main-panel">
                        <div className="row ">
                            <div class="container">
                                <div class="page-inner d-flex justify-content-center ">
                                    <div className="col-md-10 ">
                                        <div className="card ">
                                            <form className=" p-5 contact-form" method='post' onChange={ChangeHandel} onSubmit={SubmitHandel}>
                                                {/* <select class="form-select form-select-lg mb-3"  value={data.cate_Id} name='cate_Id' onChange={ChangeHandel}>
                                                    <option value='' >Select Categories</option>
                                                    {
                                                      categories && categories.map((value)=>{
                                                        return(
                                                            <option value={value.id}>{value.name}</option>
                                                        )
                                                      })  
                                                    }
                                                </select> */}
                                                <Select options={multicate} value={selectedOption} onChange={handleChange} isMulti={true} className="mb-3" placeholder="Select Categories" />
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
                                                    <input type="text" className="form-control" placeholder="Product original" name='pro_price' value={data.pro_price} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Product Color" name='color' value={data.color} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Product Discount" name='discount' value={data.discount} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="New Product" name='new_product' value={data.new_product} />
                                                </div>
                                                <div className="form-group d-flex justify-content-center ">
                                                    <button type='submit' className="Btn-1 rounded-pill" style={{ width: "250px" }}>Add Categories</button>
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

export default Add_Product