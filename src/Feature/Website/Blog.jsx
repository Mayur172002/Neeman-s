import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Get_Blog } from '../Admin/Slice/BlogSlice'
import './Style.css'
function Blog() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(Get_Blog())
    }, [])
    const { blog } = useSelector((state) => state.blog)
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
                <script src="./Website/js/slider.js"></script>
            </Helmet>
            <div class="range-loader1">
                    <div class="loader-bar1"></div>
                </div>
            <div>
                <div className="hero-wrap hero-bread" style={{ backgroundImage: 'url("https://neemans.com/cdn/shop/articles/imgpsh_fullsize_anim_4.jpg?v=1662189487&width=1600")', height: "600px" }}>
                    <div className="container">
                       
                    </div>
                </div>
                <section className="ftco-section ftco-degree-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 order-lg-last ftco-animate">
                                <div className="row">
                                    {
                                        blog && blog.map((value, index) => {
                                            return (
                                                <div key={index} className="col-md-12 d-flex ftco-animate">
                                                    <div className="blog-entry align-self-stretch d-md-flex">
                                                        <a className="block-20" style={{ backgroundImage: `url(${value.image})` }}>
                                                        </a>
                                                        <div className="text d-block pl-md-4">
                                                            <div className="meta mb-3">
                                                                <div><a href="#">April 9, 2019</a></div>
                                                                <div><a href="#">Admin</a></div>
                                                                <div><a href="#" className="meta-chat"><span className="icon-chat" /> 3</a></div>
                                                            </div>
                                                            <h3 className="heading"><a href="#">{value.name}</a></h3>
                                                            <p className='product_name'>{value.description}</p>
                                                            <p><a href="blog-single.html" className="btn btn-primary py-2 px-3">Read more</a></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="row mt-2">
                                    <div className="col">
                                        <div className="block-27">
                                            <ul>
                                                <li><a href="#">&lt;</a></li>
                                                <li className="active"><span>1</span></li>
                                                <li><a href="#">2</a></li>
                                                <li><a href="#">3</a></li>
                                                <li><a href="#">4</a></li>
                                                <li><a href="#">5</a></li>
                                                <li><a href="#">&gt;</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div> {/* .col-md-8 */}
                            <div className="col-lg-4 sidebar ftco-animate">
                                <div className="sidebar-box">
                                    <form action="#" className="search-form">
                                        <div className="form-group">
                                            <span className="icon ion-ios-search" />
                                            <input type="text" className="form-control" placeholder="Type a keyword and hit enter" />
                                        </div>
                                    </form>
                                </div>
                                <div className="sidebar-box ftco-animate">
                                    <h3 className="heading">Categories</h3>
                                    <ul className="categories">
                                        <li><a href="#">Shoes <span>(12)</span></a></li>
                                        <li><a href="#">Men's Shoes <span>(22)</span></a></li>
                                        <li><a href="#">Women's <span>(37)</span></a></li>
                                        <li><a href="#">Accessories <span>(42)</span></a></li>
                                        <li><a href="#">Sports <span>(14)</span></a></li>
                                        <li><a href="#">Lifestyle <span>(140)</span></a></li>
                                    </ul>
                                </div>
                                <div className="sidebar-box ftco-animate">
                                    <h3 className="heading">Recent Blog</h3>
                                    <div className="block-21 mb-4 d-flex">
                                        <a className="blog-img mr-4" style={{ backgroundImage: 'url(Website/images/image_1.jpg)' }} />
                                        <div className="text">
                                            <h3 className="heading-1"><a href="#">Even the all-powerful Pointing has no control about the blind texts</a></h3>
                                            <div className="meta">
                                                <div><a href="#"><span className="icon-calendar" /> April 27, 2019</a></div>
                                                <div><a href="#"><span className="icon-person" /> Admin</a></div>
                                                <div><a href="#"><span className="icon-chat" /> 19</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="block-21 mb-4 d-flex">
                                        <a className="blog-img mr-4" style={{ backgroundImage: 'url(Website/images/image_2.jpg)' }} />
                                        <div className="text">
                                            <h3 className="heading-1"><a href="#">Even the all-powerful Pointing has no control about the blind texts</a></h3>
                                            <div className="meta">
                                                <div><a href="#"><span className="icon-calendar" /> April 27, 2019</a></div>
                                                <div><a href="#"><span className="icon-person" /> Admin</a></div>
                                                <div><a href="#"><span className="icon-chat" /> 19</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="block-21 mb-4 d-flex">
                                        <a className="blog-img mr-4" style={{ backgroundImage: 'url(Website/images/image_3.jpg)' }} />
                                        <div className="text">
                                            <h3 className="heading-1"><a href="#">Even the all-powerful Pointing has no control about the blind texts</a></h3>
                                            <div className="meta">
                                                <div><a href="#"><span className="icon-calendar" /> April 27, 2019</a></div>
                                                <div><a href="#"><span className="icon-person" /> Admin</a></div>
                                                <div><a href="#"><span className="icon-chat" /> 19</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidebar-box ftco-animate">
                                    <h3 className="heading">Tag Cloud</h3>
                                    <div className="tagcloud">
                                        <a href="#" className="tag-cloud-link">shop</a>
                                        <a href="#" className="tag-cloud-link">products</a>
                                        <a href="#" className="tag-cloud-link">shirt</a>
                                        <a href="#" className="tag-cloud-link">jeans</a>
                                        <a href="#" className="tag-cloud-link">shoes</a>
                                        <a href="#" className="tag-cloud-link">dress</a>
                                        <a href="#" className="tag-cloud-link">coats</a>
                                        <a href="#" className="tag-cloud-link">jumpsuits</a>
                                    </div>
                                </div>
                                <div className="sidebar-box ftco-animate">
                                    <h3 className="heading">Paragraph</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut, sunt placeat nam vero culpa sapiente consectetur similique, inventore eos fugit cupiditate numquam!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> {/* .section */}

              
            </div>
            <Footer />
        </div>
    )
}

export default Blog