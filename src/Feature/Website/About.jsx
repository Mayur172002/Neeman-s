import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'

function About() {
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
                <script src="./Website/js/main.js"></script>
                <script src="./Website/js/slider.js"></script>
            </Helmet>
            <div>
            <div class="range-loader1">
                    <div class="loader-bar1"></div>
                </div>
                <div className="hero-wrap hero-bread" style={{ backgroundImage: 'url("https://neemans.com/cdn/shop/articles/imgpsh_fullsize_anim_3.png?v=1685431508&width=1600")' ,height: "600px" }}>
                    {/* <div className="container">
                        <div className="row no-gutters slider-text align-items-center justify-content-center">
                            <div className="col-md-9 ftco-animate text-center">
                                <p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home</a></span> <span>About</span></p>
                                <h1 className="mb-0 bread">About Us</h1>
                            </div>
                        </div>
                    </div> */}
                </div>
                <section className="ftco-section ftco-no-pt ftco-no-pb">
                    <div className="container">
                        <div className="row no-gutters ftco-services">
                            <div className="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                                <div className="media block-6 services p-4 py-md-5">
                                    <div className="icon d-flex justify-content-center align-items-center mb-4">
                                        <span className="flaticon-bag" />
                                    </div>
                                    <div className="media-body">
                                        <h3 className="heading">Free Shipping</h3>
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                                <div className="media block-6 services p-4 py-md-5">
                                    <div className="icon d-flex justify-content-center align-items-center mb-4">
                                        <span className="flaticon-customer-service" />
                                    </div>
                                    <div className="media-body">
                                        <h3 className="heading">Support Customer</h3>
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                                <div className="media block-6 services p-4 py-md-5">
                                    <div className="icon d-flex justify-content-center align-items-center mb-4">
                                        <span className="flaticon-payment-security" />
                                    </div>
                                    <div className="media-body">
                                        <h3 className="heading">Secure Payments</h3>
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section ftco-no-pb ftco-no-pt ">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 p-md-5 img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url(Website/images/s.png)' }}>
                                <a href="https://cdn.shopify.com/videos/c/o/v/7f0aa914f8f14035bf36ce5e06c15047.mp4" className="icon popup-vimeo d-flex justify-content-center align-items-center">
                                    <span className="icon-play" />
                                </a>
                            </div>
                            <div className="col-md-7 py-md-5 wrap-about pb-md-5 ftco-animate" style={{ backgroundColor: "#f5f5ee" }}>
                                <div className="heading-section-bold mb-4 mt-md-5">
                                    <div className="ml-md-0">
                                        <h3 className="mb-4">There's comfort & then there's Neeman's comfort!</h3>
                                    </div>
                                </div>
                                <div className="pb-md-5 pb-4">
                                    <p>‘I only wear Neeman’s now!’, say a lot of our customers. At Neeman’s, we design our products to be your comfort zone every day. This is why 90% of our customers rate us 4.5* for comfort and 1 in every 4 customers own more than a pair.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container mt-5 mb-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8 heading-section text-center  ftco-animate">
                            <h2 className="mb-4">Always on trend for you!</h2>
                            <p>‘Hey, where did you get those shoes from?’ is a question our consumers are getting used to answering, quite proudly. At Neeman’s, we are committed to upping your fashion quotient by aligning our designs with the trends of today, so you look and feel good.</p>
                        </div>
                    </div>
                </div>
                <section className="ftco-section mb-5 ftco-no-pb ftco-no-pt " >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7 py-md-5 wrap-about pb-md-5 ftco-animate" style={{ backgroundColor: "#d1e8e2" }}>
                                <div className="heading-section-bold mb-4 mt-md-5">
                                    <div className="ml-md-0">
                                        <h3 className="mb-4">There's comfort & then there's Neeman's comfort!</h3>
                                    </div>
                                </div>
                                <div className="pb-md-5 pb-4">
                                    <p>‘I only wear Neeman’s now!’, say a lot of our customers. At Neeman’s, we design our products to be your comfort zone every day. This is why 90% of our customers rate us 4.5* for comfort and 1 in every 4 customers own more than a pair.</p>
                                </div>
                            </div>
                            <div className="col-md-5 p-md-5 img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url(https://neemans.com/cdn/shop/files/Merino_Wool_-_DF_b3a16de7-3631-42d5-a695-edfba845d7bf_1024x1024.jpg?v=1687184876)' }}>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container mb-5">
                    <div className="row justify-content-center">
                        <img data-src="//neemans.com/cdn/shop/files/shoe_2_17b36158-a6b6-4eac-8005-abd7c3c30de3_1024x1024.gif?v=1687183802" class="lazyload lazy img-fluid" src="//neemans.com/cdn/shop/files/shoe_2_17b36158-a6b6-4eac-8005-abd7c3c30de3_1024x1024.gif?v=1687183802"></img>
                    </div>
                </div>
              
            </div>

            <Footer />
        </div>
    )
}

export default About