import React, { useRef, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import { toast } from 'react-toastify';

function Contact() {
    const [data, setdata] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const ChangeHandel = (e) => {
        const User_Id = localStorage.getItem("wid")
        setdata({ ...data, User_Id: User_Id, [e.target.name]: e.target.value })
        console.log(data);
    }
    const InputRef = useRef({})
    const Validation = () => {
        let ans = true
        const InputName = [
            { name: "name", message: "Please Enter Name..." },
            { name: "email", message: "Please Enter Email..." },
            { name: "subject", message: "Please Enter Subject..." },
            { name: "message", message: "Please Enter Message..." }
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
            if (localStorage.getItem('wid')) {
                const result = await axios.post(`http://localhost:3000/contact`, data)
                console.log(result.data);
                if (result.status == 201) {
                    toast.success("Data add Success")
                    setdata({ ...data, name: "", email: "", subject: "", message: "" })
                }
            }
            else {
                toast.error('Please Login Hare...')
                setdata({ ...data, name: "", email: "", subject: "", message: "" })
            }
        }
    }
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
                {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false"></script> */}
                {/* <script src="./Website/js/google-map.js"></script> */}
                <script src="./Website/js/main.js"></script>
                <script src="./Website/js/slider.js"></script>
            </Helmet>
            <div class="range-loader1">
                    <div class="loader-bar1"></div>
                </div>
            <div>
                <div className="hero-wrap hero-bread" style={{ backgroundImage: 'url("Website/images/bg_6.jpg")' }}>
                    <div className="container">
                        <div className="row no-gutters slider-text align-items-center justify-content-center">
                            <div className="col-md-9 ftco-animate text-center">
                                <p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home</a></span> <span>Contact</span></p>
                                <h1 className="mb-0 bread">Contact Us</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="ftco-section contact-section bg-light">
                    <div className="container">
                        <div className="row d-flex mb-5 contact-info">
                            <div className="w-100" />
                            <div className="col-md-3 d-flex">
                                <div className="info bg-white p-4">
                                    <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex">
                                <div className="info bg-white p-4">
                                    <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex">
                                <div className="info bg-white p-4">
                                    <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex">
                                <div className="info bg-white p-4">
                                    <p><span>Website</span> <a href="#">yoursite.com</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="row block-9">
                            <div className="col-md-6 order-md-last d-flex">
                                <form className="bg-white p-5 contact-form" method='post' onChange={ChangeHandel} onSubmit={SubmitHandel}>
                                    <div className="form-group">
                                        <input type="text" ref={e => (InputRef.current['name'] = e)} name='name' value={data.name} className="form-control" placeholder="Your Name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" ref={e=> (InputRef.current['email'] = e)} name='email' value={data.email} className="form-control" placeholder="Your Email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" ref={e => (InputRef.current['subject'] = e)} name='subject' value={data.subject} className="form-control" placeholder="Subject" />
                                    </div>
                                    <div className="form-group">
                                        <textarea cols={30} rows={7} ref={e => (InputRef.current['message'] = e)} name='message' value={data.message} className="form-control" placeholder="Message" />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary py-3 px-5">Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-6 d-flex">
                                {/* <div id="map" className="bg-white" /> */}
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9766600176195!2d77.6517389!3d12.9092216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1543d36265b5%3A0x647510c3cdb0d21a!2sNeeman's%20Store%20HSR%20Layout!5e0!3m2!1sen!2sin!4v1720088933384!5m2!1sen!2sin" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Contact