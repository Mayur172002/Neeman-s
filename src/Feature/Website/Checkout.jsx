import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import './Style.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { Get_Payment } from './Slice/CartSlice'
import { useParams } from 'react-router-dom'

function Checkout() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(Get_Payment())
    }, [])
    const { user_Id } = useParams()
    const { payment } = useSelector((state) => state.payment)
    const [filteredPayment, setFilteredPayment] = useState([]);
    const [specificId,setspecificId] = useState(null)
    useEffect(() => {
        if (payment.length > 0) {
            const PaymentId = payment.filter((item) => item.userId === user_Id);
            const ProductId = PaymentId.map((item)=>item.id)
            console.log(...ProductId);
            if (PaymentId.length > 0) {
                const lastProductId = PaymentId[PaymentId.length - 1].id;
                const result = parseInt(lastProductId, 10)
                console.log(result);
                setspecificId(lastProductId);
            }
    
            setFilteredPayment(PaymentId);
        }
    }, [payment, user_Id]);

     // const specificId = parseInt(ProductId);
            // console.log(specificId);
    const [data, setdata] = useState({
        Firstname: "",
        Lastname: "",
        country: "",
        address: "",
        city: "",
        postcode: "",
        phone: "",
        email: "",
    })
    const [errors, seterrors] = useState({
        Firstname: false,
        Lastname: false,
        country: false,
        address: false,
        city: false,
        postcode: false,
        phone: false,
        email: false,
    })
    const validation = (name, value) => {
        let error = false;
        switch (name) {
            case 'Firstname':
            case 'Lastname':
                if (value === "") {
                    toast.error(`Please enter a valid ${name}`)
                    error = true;
                } else if (!value.match(/^[a-zA-Z]+$/)) {
                    error = true;
                    toast.error("! Please enter only alphabetical characters")
                }
                break;
            case 'country':
            case 'address':
            case 'city':
            case 'postcode':
            case 'phone':
            case 'email':
                if (value === '') {
                    toast.error(`Please enter a valid ${name}`)
                    error = true;
                } else if (name === 'postcode' && value.length > 6) {
                    toast.error('! Only 6-digit numbers are allowed for the postcode')
                    error = true;
                } else if (name === 'phone' && value.length > 10) {
                    toast.error('! Only 10-digit numbers are allowed ')
                    error = true;
                } else if (name === 'city' && !value.match(/^[a-zA-Z]+$/)) {
                    toast.error("! Please enter only alphabetical characters")
                }
                break;
            default:
                break
        }
        seterrors({ ...errors, [name]: error })
    }
    const ChangeHandel = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value })
        validation(name, value)
    }
    const SubmitHandel = (e) => {
        e.preventDefault();
        // const isFormValid = Object.keys(data).every((key) =>
        //     validation(key, data[key])
        // );
        if (!validation) {
            alert('Form submitted successfully!')
            // if () {
            //     alert('Form submitted successfully!');
            //     // setData({ ...data, name: "", lastname: "", information: "", birthdate: "", contact: "" })
            // } 
        }
        else {
            toast.error('Please enter a valid Billing Details');
        }

    }
    const totalPrice = filteredPayment.filter((item)=>item.id === specificId).map((item) => item.totalPrice)
    const PriceNumber = totalPrice.toString().replace(/,/g, '')
    const PaymentHandel = () => {
        let discount = 0;
        let deliveryCharge = 0;
        if (PriceNumber > 2000) {
            discount = PriceNumber * 0.1;
            deliveryCharge = 100;
        } else {
            discount = PriceNumber * 0.07;
            deliveryCharge = 50;
        }
        const finalAmount = PriceNumber - discount + deliveryCharge
        return {
            discount: discount.toFixed(2),
            deliveryCharge: deliveryCharge,
            finalAmount: finalAmount.toFixed(2)
        }
    }
    const { discount, deliveryCharge, finalAmount } = PaymentHandel();
    // const ProductId = filteredPayment.map((item)=>item.id)
    // console.log(...ProductId);
    // const specificId = parseInt(ProductId);
    // console.log(specificId);
    
    return (
        <div>
            <Header />
            <Helmet>
                <script src="./Website/js/jquery.min.js"></script>
                <script src="./Website/js/jquery-migrate-3.0.1.min.js"></script>
                <script src="./Website/js/jquery.waypoints.min.js"></script>
                <script src="./Website/js/jquery.stellar.min.js"></script>
                <script src="./Website/js/owl.carousel.min.js"></script>
                <script src="./Website/js/aos.js"></script>
                <script src="./Website/js/scrollax.min.js"></script>
                <script src="../Website/js/main.js"></script>
            </Helmet>
            <div>
                <div className="hero-wrap hero-bread" style={{ backgroundImage: 'url("https://neemans.com/cdn/shop/articles/blogcover_footwearcapsulewardrobe_220523.jpg?v=1684842549&width=1600")', height: "600px" }}>
                    <div className="container">
                        <div className="row no-gutters slider-text align-items-center justify-content-center">
                        </div>
                    </div>
                </div>
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-10 ftco-animate">
                                <form action="#" method='post' className="billing-form" onSubmit={SubmitHandel} onChange={ChangeHandel}>
                                    <h3 className="mb-4 billing-heading">Billing Details</h3>
                                    <div className="row align-items-end">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="firstname">Firt Name</label>
                                                <input type="text" name='Firstname' value={data.Firstname} className={`form-control ${errors.Firstname ? 'error' : ''}`} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="lastname">Last Name</label>
                                                <input type="text" name='Lastname' value={data.Lastname} className={`form-control ${errors.Lastname ? 'error' : ''}`} />
                                            </div>
                                        </div>
                                        <div className="w-100" />
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="country">State / Country</label>
                                                <div className="select-wrap">
                                                    <div className="icon"><span className="ion-ios-arrow-down" /></div>
                                                    <select className={`form-control ${errors.country ? 'error' : ''}`} name='country' value={data.country}>
                                                        <option value="">Select Country</option>
                                                        <option value='India'>India</option>
                                                        <option value='France'>France</option>
                                                        <option value='Italy'>Italy</option>
                                                        <option value='Philippines'>Philippines</option>
                                                        <option value='South Korea'>South Korea</option>
                                                        <option value='Hongkong'>Hongkong</option>
                                                        <option value='Japan'>Japan</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-100" />
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="streetaddress">Street Address</label>
                                                <input type="text" className={`form-control ${errors.address ? 'error' : ''}`} name='address' value={data.address} placeholder="House number and street name" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className={`form-control ${errors.address ? 'error' : ''}`} name='address' value={data.address} placeholder="Appartment, suite, unit etc: (optional)" />
                                            </div>
                                        </div>
                                        <div className="w-100" />
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="towncity">Town / City</label>
                                                <input type="text" name='city' value={data.city} className={`form-control ${errors.city ? 'error' : ''}`} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="postcodezip">Postcode / ZIP *</label>
                                                <input type="number" name='postcode' value={data.postcode} className={`form-control ${errors.postcode ? 'error' : ''}`} />
                                            </div>
                                        </div>
                                        <div className="w-100" />
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone</label>
                                                <input type="number" name='phone' value={data.phone} className={`form-control ${errors.phone ? 'error' : ''}`} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="emailaddress">Email Address</label>
                                                <input type="text" name='email' value={data.email} className={`form-control ${errors.email ? 'error' : ''}`} />
                                            </div>
                                        </div>
                                        <div className="w-100" />
                                        <div className="col-md-12">
                                            <div className="form-group mt-4">
                                                <div className="radio">
                                                    <label className="mr-3"><input type="radio" name="optradio" /> Create an Account? </label>
                                                    <label><input type="radio" name="optradio" /> Ship to different address</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row mt-5 pt-3 d-flex">
                                        <div className="col-md-6 d-flex">
                                            {
                                                filteredPayment && filteredPayment.filter((item)=>item.id === specificId)
                                                .map((item, index) => {
                                                    return (
                                                        <div key={index} className="cart-detail cart-total bg-light p-3 p-md-4">
                                                            <h3 className="billing-heading mb-4">Cart Total</h3>
                                                            <p className="d-flex">
                                                                <span>Subtotal</span>
                                                                <span>Rs. {item.totalPrice}</span>
                                                            </p>
                                                            <p className="d-flex">
                                                                <span>Delivery</span>
                                                                <span>Rs. {deliveryCharge}</span>
                                                            </p>
                                                            <p className="d-flex">
                                                                <span>Discount</span>
                                                                <span>Rs. {discount}</span>
                                                            </p>
                                                            <hr />
                                                            <p className="d-flex total-price">
                                                                <span>Total</span>
                                                                <span>Rs. {finalAmount}</span>
                                                            </p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <div className="cart-detail bg-light p-3 p-md-4">
                                                <h3 className="billing-heading mb-4">Payment Method</h3>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <div className="radio">
                                                            <label><input type="radio" name="optradio" className="mr-2" /> Direct Bank Tranfer</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <div className="radio">
                                                            <label><input type="radio" name="optradio" className="mr-2" /> Check Payment</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <div className="radio">
                                                            <label><input type="radio" name="optradio" className="mr-2" /> Paypal</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <div className="checkbox">
                                                            <label><input type="checkbox" defaultValue className="mr-2" /> I have read and accept the terms and conditions</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p>
                                                    <button type='submit' className="btn btn-primary py-3 px-4">Place an order</button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Checkout