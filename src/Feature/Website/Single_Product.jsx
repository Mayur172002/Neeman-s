
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Get_Product } from '../Admin/Slice/ProductSlice';
import AOS from 'aos';
import $ from 'jquery'
import 'aos/dist/aos.css';
import OffCanvas from './OffCanvas';
import { Get_CartItem, Insert_Cart, updateCartItemQuantity } from './Slice/CartSlice';
import { toast } from 'react-toastify';

function Single_Product() {
    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.product);
    const { cart } = useSelector((state) => state.cart)
    const { id } = useParams();
    useEffect(() => {
        dispatch(Get_Product());
        AOS.init();
    }, [dispatch]);
    const single_product = product.filter((value) => value.id === id);
    const res = single_product.map((option) => option.price).toString().replace(/,/g, '')
    const dis_price = Math.round(res * 0.9).toLocaleString()
    useEffect(() => {
        if ($('#gallery').length) {
            $('#gallery').slick({
                vertical: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                infinite: true,
                autoplay: false,
                pauseOnHover: true,
                initialSlide: 0,
            });

            $('#gallery').on('wheel', function (e) {
                e.preventDefault();
                if (e.originalEvent.deltaY < 0) {
                    $(this).slick('slickPrev');
                } else {
                    $(this).slick('slickNext');
                }
            });
        }
        return () => {
            if ($('#gallery').hasClass('slick-initialized')) {
                $('#gallery').slick('unslick');
            }
        };
    }, []);

    /* Add to Cart */
    const [selectedSize, setSelectedSize] = useState(null);
    const user_Id = localStorage.getItem('wid')
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const handleSizeChange = (e) => {
        const selected = e.target.value;
        console.log('Selected size:', selected);
        setSelectedSize(selected);
        setCurrentProductId(id);
    }
    const refreshproduct = () => {
        dispatch(Get_CartItem())
    }
    const Add_Cart = () => {
        if (selectedSize) {

            const AddtoProduct = single_product.find((product) => product.id === currentProductId);
            console.log(AddtoProduct);
            const CartItemId = cart.find((value) => value.id === currentProductId && value.size === selectedSize)
            // console.log(CartItemId);
            if (AddtoProduct) {
                setTimeout(() => {
                    setIsOffcanvasOpen(!isOffcanvasOpen);
                    refreshproduct();
                }, 2000)
                const productPrice = parseFloat(AddtoProduct.price.replace(/,/g, ''));
                if (CartItemId) {
                    const updatedQuantity = CartItemId.quantity + 1;
                    const updatedTotalPrice = updatedQuantity * productPrice;
                    console.log(updatedTotalPrice);
                    const updatedCartItem = { ...CartItemId, quantity: updatedQuantity, price: updatedTotalPrice.toLocaleString('en-US') }
                    dispatch(updateCartItemQuantity(updatedCartItem))
                    toast.success(`Product quantity updated to ${updatedCartItem.quantity && updatedCartItem.price}`);
                } else {
                    const ProductwithUserId = { ...AddtoProduct, userId: user_Id, size: selectedSize, quantity: 1, originalPrice: AddtoProduct.price };
                    dispatch(Insert_Cart(ProductwithUserId));
                    toast.success("Product Add To Cart Success");
                }
            }
            else {
                toast.error("Product not found");
            }
        }
        else {
            toast.error('Please Select The Size')
        }
    };
    return (
        <div>
            <Header />
            <Helmet>
                <script src="/Website/js/jquery.min.js"></script>
                <script src="/Website/js/jquery-migrate-3.0.1.min.js"></script>
                <script src="/Website/js/jquery.waypoints.min.js"></script>
                <script src="/Website/js/jquery.stellar.min.js"></script>
                <script src="/Website/js/owl.carousel.min.js"></script>
                <script src="/Website/js/aos.js"></script>
                <script src="/Website/js/scrollax.min.js"></script>
                <script src="/Website/js/main.js"></script>
                <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
                <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel/slick/slick.min.js"></script>
            </Helmet>
            <div>

                <section className="ftco-section">
                    <div className="container">
                        {
                            single_product.map((value, index) => (
                                <div key={index} className="row">
                                    <div className="col-lg-6 mb-5 ftco-animate" id="gallery" >
                                        <div className='div_img'>
                                            <a href="" className=""><img src={value.image} className="img-fluid sing_img" alt="Product" /></a>
                                        </div>
                                        <div className='div_img'>
                                            <a href="" className=""><img src={value.image1} className="img-fluid sing_img" alt="Product" /></a>
                                        </div>
                                        <div className='div_img'>
                                            <a href="" className=""><img src={value.image2} className="img-fluid sing_img" alt="Product" /></a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 product-details pl-md-5 ftco-animate">
                                        <h3>{value.name}</h3>
                                        <div className="rating d-flex">
                                            <p className="text-left mr-4">
                                                <a href="#" className="mr-2">5.0</a>
                                                <a href="#"><span className="ion-ios-star-outline" /></a>
                                                <a href="#"><span className="ion-ios-star-outline" /></a>
                                                <a href="#"><span className="ion-ios-star-outline" /></a>
                                                <a href="#"><span className="ion-ios-star-outline" /></a>
                                                <a href="#"><span className="ion-ios-star-outline" /></a>
                                            </p>
                                            <p className="text-left mr-4">
                                                <a href="#" className="mr-2" style={{ color: '#000' }}>100 <span style={{ color: '#bbb' }}>Rating</span></a>
                                            </p>
                                            <p className="text-left">
                                                <a href="#" className="mr-2" style={{ color: '#000' }}>500 <span style={{ color: '#bbb' }}>Sold</span></a>
                                            </p>
                                        </div>
                                        <p className="price"><span className="price-sale"><b>Rs. {value.price}</b></span><span className="ml-2 price-dc" style={{ fontSize: "13px", color: "grey" }}> <del>RS.{value.pro_price}</del></span>
                                            <span className="ml-1" style={{ color: "green", fontSize: "15px" }}><b>{value.discount}% OFF</b></span></p>
                                        <p style={{ marginTop: "-20px" }}>Inclusive of all taxes</p>
                                        <div class="view-offers-section-wrapper">
                                            <div class="vo-sec-content-wrapper px-2 d-flex justify-content-end">
                                                <div class="view-offers-section-text-wrapper">
                                                    <div class="view-offers-section-text1">Get this for as low as
                                                        <span class="vo-price" id="vo-price">Rs. {dis_price}</span>
                                                    </div>
                                                    <div class="view-offers-section-text2">with these offers.</div>
                                                </div>
                                                <div class="vo-text-svg-wrapper">
                                                    <div class="view-offers-text">View OFFERS</div>
                                                    <div class="view-offers-svg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 17" fill="none"><path d="M6 3.5L11 8.5L6 13.5" stroke="#A47D47" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="container-fuild mt-3">
                                            <div>
                                                <span class="ProductForm__Label text">Select Size (UK) :
                                                    <a type="button" class="ProductForm__LabelLink Link Text--subdued aaa" data-toggle="modal" data-target="#myModal">
                                                        SIZE CHART
                                                    </a>
                                                </span>
                                            </div>
                                            <ul class="size-selection-list mt-3">
                                                {
                                                    [6, 7, 8, 9, 10, 11, 12].map((size, index) => (
                                                        <li className="size-selection-item" key={index} id="toggleButton">
                                                            <input
                                                                type="radio"
                                                                id={`size${size}`}
                                                                name="size"
                                                                value={size}
                                                                onChange={handleSizeChange}
                                                                className="size-selection-radio"
                                                                checked={selectedSize === size.toString()}
                                                            />
                                                            <label htmlFor={`size${size}`} className="size-selection-label" >
                                                                {size}
                                                            </label>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                            {/* <ul class="size-selection-list mt-3">
                                                <li class="size-selection-item">
                                                    <input type="radio" id="size6" name="size" value="6" class="size-selection-radio" />
                                                    <label for="size6" class="size-selection-label">6</label>
                                                </li>
                                                <li class="size-selection-item">
                                                    <input type="radio" id="size7" name="size" value="7" class="size-selection-radio" />
                                                    <label for="size7" class="size-selection-label">7</label>
                                                </li>
                                                <li class="size-selection-item">
                                                    <input type="radio" id="size8" name="size" value="8" class="size-selection-radio" />
                                                    <label for="size8" class="size-selection-label">8</label>
                                                </li>
                                                <li class="size-selection-item">
                                                    <input type="radio" id="size9" name="size" value="9" class="size-selection-radio" />
                                                    <label for="size9" class="size-selection-label">9</label>
                                                </li>
                                                <li class="size-selection-item">
                                                    <input type="radio" id="size10" name="size" value="10" class="size-selection-radio" />
                                                    <label for="size10" class="size-selection-label">10</label>
                                                </li>
                                                <li class="size-selection-item">
                                                    <input type="radio" id="size11" name="size" value="11" class="size-selection-radio" />
                                                    <label for="size11" class="size-selection-label">11</label>
                                                </li>
                                                <li class="size-selection-item">
                                                    <input type="radio" id="size12" name="size" value="12" class="size-selection-radio" />
                                                    <label for="size12" class="size-selection-label">12</label>
                                                </li>

                                            </ul> */}
                                        </div>
                                        {/* <div className="row mt-3">
                                            <div className="col-md-6">
                                                <div className="form-group d-flex">
                                                    <div className="select-wrap">
                                                        <div className="icon"><span className="ion-ios-arrow-down" /></div>
                                                        <select name id className="form-control">
                                                            <option value>Small</option>
                                                            <option value>Medium</option>
                                                            <option value>Large</option>
                                                            <option value>Extra Large</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-100" />
                                            <div className="input-group col-md-6 d-flex mb-3">
                                                <span className="input-group-btn mr-2">
                                                    <button type="button" className="quantity-left-minus btn" data-type="minus" data-field>
                                                        <i className="ion-ios-remove" />
                                                    </button>
                                                </span>
                                                <input type="text" id="quantity" name="quantity" className="quantity form-control input-number" defaultValue={1} min={1} max={100} />
                                                <span className="input-group-btn ml-2">
                                                    <button type="button" className="quantity-right-plus btn" data-type="plus" data-field>
                                                        <i className="ion-ios-add" />
                                                    </button>
                                                </span>
                                            </div>
                                            <div className="w-100" />
                                            <div className="col-md-12">
                                                <p style={{ color: '#000' }}>80 piece available</p>
                                            </div>
                                        </div> */}
                                        <p><a href="cart.html" className="Btn-1 py-3 px-5 mr-2 text-light" onClick={(e) => {
                                            e.preventDefault(); Add_Cart();
                                        }}>Add to Cart</a><a href="cart.html" className="Btn-1 mt-2 text-light">Buy now</a></p>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="modal" id="myModal">
                            <div className="modal-dialog">
                                <div className="modal-content" style={{ height: "600px", width: "700px" }}>
                                    {/* Modal Header */}
                                    <div class="modal-header">
                                        <h4 class="modal-title">Size chart</h4>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    {/* Modal body */}
                                    <div className="modal-body">
                                        <div style={{ objectFit: "cover" }}>
                                            <img src="https://neemans.com/cdn/shop/files/Slipper_size_chart_desktop.jpg?v=1688741206" width="100%" alt="chart" />
                                        </div>
                                    </div>
                                    {/* Modal footer */}

                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-12 nav-link-wrap">
                                <div className="nav nav-pills d-flex text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <a className="nav-link ftco-animate active mr-lg-1" id="v-pills-1-tab" data-toggle="pill" href="#v-pills-1" role="tab" aria-controls="v-pills-1" aria-selected="true">Description</a>
                                    <a className="nav-link ftco-animate mr-lg-1" id="v-pills-2-tab" data-toggle="pill" href="#v-pills-2" role="tab" aria-controls="v-pills-2" aria-selected="false">Manufacturer</a>
                                    <a className="nav-link ftco-animate" id="v-pills-3-tab" data-toggle="pill" href="#v-pills-3" role="tab" aria-controls="v-pills-3" aria-selected="false">Reviews</a>
                                </div>
                            </div>
                            <div className="col-md-12 tab-wrap">
                                <div className="tab-content bg-light" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="day-1-tab">
                                        <div className="p-4">
                                            <h3 className="mb-4">Product Description</h3>
                                            <p>Description content goes here...</p>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-2" role="tabpanel" aria-labelledby="v-pills-day-2-tab">
                                        <div className="p-4">
                                            <h3 className="mb-4">Manufactured By</h3>
                                            <p>Manufacturer content goes here...</p>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-3" role="tabpanel" aria-labelledby="v-pills-day-3-tab">
                                        <div className="row p-4">
                                            <div className="col-md-12">
                                                <h3 className="mb-4">Customer Reviews</h3>
                                                <div className="review">
                                                    <div className="user-img" style={{ backgroundImage: 'url("/Website/images/person_1.jpg")' }} />
                                                    <div className="desc">
                                                        <h4>
                                                            <span className="text-left">John Doe</span>
                                                            <span className="text-right">14 March 2023</span>
                                                        </h4>
                                                        <p className="star">
                                                            <span>
                                                                <i className="ion-ios-star-outline" />
                                                                <i className="ion-ios-star-outline" />
                                                                <i className="ion-ios-star-outline" />
                                                                <i className="ion-ios-star-outline" />
                                                                <i className="ion-ios-star-outline" />
                                                            </span>
                                                            <span className="text-right"><a href="#" className="reply"><i className="icon-reply" /></a></span>
                                                        </p>
                                                        <p>Customer review goes here...</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
            <OffCanvas isOffcanvasOpen={isOffcanvasOpen} setIsOffcanvasOpen={setIsOffcanvasOpen} />
        </div>
    );
}

export default Single_Product;
