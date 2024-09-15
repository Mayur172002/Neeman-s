
/* Slick Slider */

// import React, { useEffect } from 'react';
// import $ from 'jquery';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import 'slick-carousel/slick/slick.min.js'; // Import the slick-carousel JavaScript

// function A() {
//   useEffect(() => {
//     // Initialize Slick slider
//     const slider = $('.slider');

//     slider.slick({
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       autoplay: false, // Initially disable autoplay
//       autoplaySpeed: 1000,
//       pauseOnHover: false // Disable built-in pause on hover
//     });

//     // Event listeners for play/pause on hover
//     slider.on('mouseenter', function() {
//       slider.slick('slickPlay');
//     });

//     slider.on('mouseleave', function() {
//       slider.slick('slickPause');
//     });

//     // Cleanup slick slider on unmount
//     return () => {
//       slider.slick('unslick');
//     };
//   }, []);

//   return (
//     <div>
//       <div className="slider" style={{overflow:"hidden"}}>
//         <div><img src="https://neemans.com/cdn/shop/files/ND_-_CFS_-_White_Blue_1_402x.jpg?v=1719391807" alt="White-Blue" /></div>
//         <div><img src="https://neemans.com/cdn/shop/files/ND_-_CFS_-_White_Blue_5_402x.jpg?v=1719391807" alt="White-Blue" /></div>
//         <div><img src="https://neemans.com/cdn/shop/files/ND_-_CFS_-_White_Blue_2_402x.jpg?v=1719391807" alt="White-Blue" /></div>
//       </div>
//     </div>
//   );
// }

// export default A;


import React, { useEffect, useState } from 'react'
import '../Website/Style.css'
import { Helmet } from 'react-helmet';
function A() {
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const handleMouseEnter = (e) => {
        const track = e.currentTarget.querySelector('.slick-track1');
        track.style.animationPlayState = 'paused';
    };

    const handleMouseLeave = (e) => {
        const track = e.currentTarget.querySelector('.slick-track1');
        track.style.animationPlayState = 'running';
    };
    return (
        <div>
            <Helmet>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            </Helmet>
            <div className='container py-5'>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium excepturi quod in et facere eveniet tempore distinctio quidem quos, natus dignissimos quasi. Eveniet, reiciendis. Id obcaecati reprehenderit odio iure impedit!
                </div>
                <button className='' onClick={() => setIsOffcanvasOpen(true)}>Open</button>

                <div class={`offcanvas ${isOffcanvasOpen ? 'show' : ''}`} id="demo" style={{
                    display: isOffcanvasOpen ? 'block' : 'none',
                    ...(function () {
                        document.body.style.backgroundColor = isOffcanvasOpen ? 'black' : 'white';
                    })()
                }}
                >
                    <div class="offcanvas-header ">
                        <div className='d-flex justify-content-between py-3 px-2'>
                            <span class="Drawer__Title Heading u-h4 ">Cart </span>
                            <button type="button" className="btn-close " style={{ border: "none !important" }} onClick={() => setIsOffcanvasOpen(false)} id="closeButton">
                                <i class="fa-solid fa-x"></i>
                            </button>
                        </div>
                        <div
                            className="Empty-announcementBar__Wrapper slick-initialized slick-slider"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div aria-live="polite" className="slick-list draggable">
                                <div className="slick-track1" role="listbox">
                                    <div
                                        className="empty-anc-text slick-slide1"
                                        data-slick-index={0}
                                        aria-hidden="false"
                                        tabIndex={-1}
                                    >
                                        7 Days Free Exchange
                                    </div>
                                    <div
                                        className="empty-anc-text slick-slide1"
                                        data-slick-index={1}
                                        aria-hidden="false"
                                        tabIndex={-1}
                                    >
                                        Delivered in 4-5 days
                                    </div>
                                    <div
                                        className="empty-anc-text slick-slide1"
                                        data-slick-index={2}
                                        aria-hidden="false"
                                        tabIndex={-1}
                                    >
                                        Free Delivery
                                    </div>
                                    <div
                                        className="empty-anc-text slick-slide1"
                                        data-slick-index={3}
                                        aria-hidden="false"
                                        tabIndex={-1}
                                    >
                                        7 Days Free Exchange
                                    </div>
                                    <div
                                        className="empty-anc-text slick-slide1"
                                        data-slick-index={4}
                                        aria-hidden="false"
                                        tabIndex={-1}
                                    >
                                        Delivered in 4-5 days
                                    </div>
                                    <div
                                        className="empty-anc-text slick-slide1"
                                        data-slick-index={5}
                                        aria-hidden="false"
                                        tabIndex={-1}
                                    >
                                        Free Delivery
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sc-cart-banner" data-offer1="Extra 7% off" data-offer2="Extra 10% off" data-offer3="🎉Congrats! <span> Extra 10% Off </span> applied.">
                            <div className="sc-cart-heading 112233 active">
                                Add 1 more product for <span>Extra 10% off</span>
                            </div>
                            <div className="sc-cart-offer">
                                <div className="sc-cart-icon step  active">
                                    <div className="offers-block">
                                        <div className="offers">
                                            <svg width={27} height={27} viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_2624_2824)">
                                                    <path d="M10.4544 22.3019C10.4544 22.6166 10.3611 22.9241 10.1863 23.1858C10.0115 23.4474 9.76303 23.6513 9.47233 23.7717C9.18162 23.8921 8.86175 23.9236 8.55314 23.8622C8.24453 23.8009 7.96106 23.6493 7.73857 23.4268C7.51608 23.2044 7.36456 22.9209 7.30317 22.6123C7.24179 22.3037 7.27329 21.9838 7.3937 21.6931C7.51411 21.4024 7.71803 21.1539 7.97965 20.9791C8.24127 20.8043 8.54886 20.711 8.86351 20.711C9.28545 20.711 9.6901 20.8786 9.98845 21.177C10.2868 21.4753 10.4544 21.88 10.4544 22.3019ZM19.2044 20.711C18.8898 20.711 18.5822 20.8043 18.3206 20.9791C18.0589 21.1539 17.855 21.4024 17.7346 21.6931C17.6142 21.9838 17.5827 22.3037 17.6441 22.6123C17.7055 22.9209 17.857 23.2044 18.0795 23.4268C18.302 23.6493 18.5854 23.8009 18.894 23.8622C19.2027 23.9236 19.5225 23.8921 19.8132 23.7717C20.1039 23.6513 20.3524 23.4474 20.5272 23.1858C20.702 22.9241 20.7953 22.6166 20.7953 22.3019C20.7953 21.88 20.6277 21.4753 20.3294 21.177C20.031 20.8786 19.6264 20.711 19.2044 20.711ZM23.822 7.51142C23.7481 7.41118 23.6516 7.32971 23.5404 7.27358C23.4291 7.21745 23.3063 7.18823 23.1817 7.18827H5.71351L4.90712 4.36441C4.81088 4.03265 4.60978 3.74098 4.33393 3.53306C4.05807 3.32513 3.7223 3.21214 3.37686 3.211H1.70442C1.49345 3.211 1.29113 3.29481 1.14195 3.44398C0.992773 3.59316 0.908966 3.79549 0.908966 4.00645C0.908966 4.21742 0.992773 4.41975 1.14195 4.56892C1.29113 4.7181 1.49345 4.80191 1.70442 4.80191H3.37686L6.97431 17.389C7.11827 17.8866 7.41958 18.3243 7.83311 18.6364C8.24664 18.9484 8.75013 19.1181 9.2682 19.1201H18.8246C19.3353 19.1219 19.8331 18.959 20.244 18.6556C20.6548 18.3522 20.957 17.9244 21.1056 17.4357L23.9423 8.21739C23.9789 8.0985 23.987 7.97271 23.9661 7.8501C23.9452 7.7275 23.8959 7.6115 23.822 7.51142Z" fill="currentColor" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2624_2824">
                                                        <rect width="25.4545" height="25.4545" fill="white" transform="translate(0.908966 0.824646)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="sc-cart-offer1 step  active">
                                    <div className="offers-block">
                                        <div className="offers">
                                            <strong>7%</strong> off
                                        </div>
                                    </div>
                                    <span>Buy any 2</span>
                                </div>
                                <div className="sc-cart-offer2 step">
                                    <div className="offers-block">
                                        <div className="offers">
                                            <strong>10%</strong> off
                                        </div>
                                    </div>
                                    <span>Buy any 3</span>
                                </div>
                            </div>
                            <div className="sc-cart-offer-second">
                                <span className="sc-cart-offer3">
                                    <span style={{ marginLeft: 8 }} />
                                </span>
                            </div>
                        </div>

                    </div>
                    <div class="offcanvas-body p-3">
                        <div className="CartItemWrapper"><div className="CartItem">
                            <div className="CartItem__ImageWrapper AspectRatio">
                                <div className="AspectRatio AspectRatioDrawer" >
                                    <a href="">
                                        <img className="CartItem__Image" width height loading="lazy" src="//cdn.shopify.com/s/files/1/2428/5565/files/Black-Tan_e2fcef52-a178-4297-8c59-e9219fe23695_240x.png?v=1720589730" alt="Black/Tan" />
                                    </a>
                                </div>
                            </div>
                            <div className="CartItem__Info ml-2">
                                <h2 className="CartItem__Title "> Brunch Loafers</h2>
                                <div className="CartItem__Meta Heading Text--subdued">
                                    <div className="CartItem__PriceList">
                                        <span>Rs. 2,279</span>
                                        <strike>Rs. 4,299</strike>
                                        <span className="discount__cart">46% OFF</span>
                                    </div><p className="CartItem__Variant" style={{ display: 'none' }}>Black/Tan / UK 6</p>
                                    <p className="cart-item__variant-title">Color: Black/Tan</p>
                                    <p className="cart-item__variant-title">Size: UK 6</p>
                                    <ul className="CartItem__PropertyList">
                                    </ul></div><div className="CartItem__Actions Heading Text--subdued" style={{ textAlign: 'center' }}>
                                    <div className="CartItem__QuantitySelector">
                                        <div className="QuantitySelector"><a className="QuantitySelector__Button Link Link--primary m" href="" >{/* snippets%2Ficon.liquid */}<svg className="Icon Icon--minus " role="presentation" viewBox="0 0 16 2">
                                            <path d="M1,1 L15,1" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square" />
                                        </svg></a>
                                            <input type="text" name="updates[]" id="" className="QuantitySelector__CurrentQuantity" pattern="[0-9]*" data-line={1} defaultValue={1} /><a onclick="window.updateCart_qty(); webengage_updateCart_qty()" className="QuantitySelector__Button Link Link--primary p" title="Set quantity to 2" href="/cart/change?quantity=2&line=1" data-quantity={2} data-line={1} data-action="update-item-quantity">{/* snippets%2Ficon.liquid */}<svg className="Icon Icon--plus " role="presentation" viewBox="0 0 16 16">
                                                <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square">
                                                    <path d="M8,1 L8,15" />
                                                    <path d="M1,8 L15,8" />
                                                </g>
                                            </svg></a>
                                        </div>
                                    </div>
                                    <div className='breadcrumbs-content'>
                                        <a href='#' className="CartItem__Remove">Remove</a>
                                    </div>
                                </div>
                            </div></div></div>
                        <div className="CartItemWrapper"><div className="CartItem">
                            <div className="CartItem__ImageWrapper AspectRatio">
                                <div className="AspectRatio AspectRatioDrawer" >
                                    <a href="">
                                        <img className="CartItem__Image" width height loading="lazy" src="//cdn.shopify.com/s/files/1/2428/5565/files/Black-Tan_e2fcef52-a178-4297-8c59-e9219fe23695_240x.png?v=1720589730" alt="Black/Tan" />
                                    </a>
                                </div>
                            </div>
                            <div className="CartItem__Info ml-2">
                                <h2 className="CartItem__Title "> Brunch Loafers</h2>
                                <div className="CartItem__Meta Heading Text--subdued">
                                    <div className="CartItem__PriceList">
                                        <span>Rs. 2,279</span>
                                        <strike>Rs. 4,299</strike>
                                        <span className="discount__cart">46% OFF</span>
                                    </div><p className="CartItem__Variant" style={{ display: 'none' }}>Black/Tan / UK 6</p>
                                    <p className="cart-item__variant-title">Color: Black/Tan</p>
                                    <p className="cart-item__variant-title">Size: UK 6</p>
                                    <ul className="CartItem__PropertyList">
                                    </ul></div><div className="CartItem__Actions Heading Text--subdued" style={{ textAlign: 'center' }}>
                                    <div className="CartItem__QuantitySelector">
                                        <div className="QuantitySelector"><a className="QuantitySelector__Button Link Link--primary m" href="" >{/* snippets%2Ficon.liquid */}<svg className="Icon Icon--minus " role="presentation" viewBox="0 0 16 2">
                                            <path d="M1,1 L15,1" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square" />
                                        </svg></a>
                                            <input type="text" name="updates[]" id="" className="QuantitySelector__CurrentQuantity" pattern="[0-9]*" data-line={1} defaultValue={1} /><a onclick="window.updateCart_qty(); webengage_updateCart_qty()" className="QuantitySelector__Button Link Link--primary p" title="Set quantity to 2" href="/cart/change?quantity=2&line=1" data-quantity={2} data-line={1} data-action="update-item-quantity">{/* snippets%2Ficon.liquid */}<svg className="Icon Icon--plus " role="presentation" viewBox="0 0 16 16">
                                                <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square">
                                                    <path d="M8,1 L8,15" />
                                                    <path d="M1,8 L15,8" />
                                                </g>
                                            </svg></a>
                                        </div>
                                    </div>
                                    <div className='breadcrumbs-content'>
                                        <a href='#' className="CartItem__Remove">Remove</a>
                                    </div>
                                </div>
                            </div></div></div>
                        <div className="CartItemWrapper"><div className="CartItem">
                            <div className="CartItem__ImageWrapper AspectRatio">
                                <div className="AspectRatio AspectRatioDrawer" >
                                    <a href="">
                                        <img className="CartItem__Image" width height loading="lazy" src="//cdn.shopify.com/s/files/1/2428/5565/files/Black-Tan_e2fcef52-a178-4297-8c59-e9219fe23695_240x.png?v=1720589730" alt="Black/Tan" />
                                    </a>
                                </div>
                            </div>
                            <div className="CartItem__Info ml-2">
                                <h2 className="CartItem__Title "> Brunch Loafers</h2>
                                <div className="CartItem__Meta Heading Text--subdued">
                                    <div className="CartItem__PriceList">
                                        <span>Rs. 2,279</span>
                                        <strike>Rs. 4,299</strike>
                                        <span className="discount__cart">46% OFF</span>
                                    </div><p className="CartItem__Variant" style={{ display: 'none' }}>Black/Tan / UK 6</p>
                                    <p className="cart-item__variant-title">Color: Black/Tan</p>
                                    <p className="cart-item__variant-title">Size: UK 6</p>
                                    <ul className="CartItem__PropertyList">
                                    </ul></div><div className="CartItem__Actions Heading Text--subdued" style={{ textAlign: 'center' }}>
                                    <div className="CartItem__QuantitySelector">
                                        <div className="QuantitySelector"><a className="QuantitySelector__Button Link Link--primary m" href="" >{/* snippets%2Ficon.liquid */}<svg className="Icon Icon--minus " role="presentation" viewBox="0 0 16 2">
                                            <path d="M1,1 L15,1" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square" />
                                        </svg></a>
                                            <input type="text" name="updates[]" id="" className="QuantitySelector__CurrentQuantity" pattern="[0-9]*" data-line={1} defaultValue={1} /><a onclick="window.updateCart_qty(); webengage_updateCart_qty()" className="QuantitySelector__Button Link Link--primary p" title="Set quantity to 2" href="/cart/change?quantity=2&line=1" data-quantity={2} data-line={1} data-action="update-item-quantity">{/* snippets%2Ficon.liquid */}<svg className="Icon Icon--plus " role="presentation" viewBox="0 0 16 16">
                                                <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square">
                                                    <path d="M8,1 L8,15" />
                                                    <path d="M1,8 L15,8" />
                                                </g>
                                            </svg></a>
                                        </div>
                                    </div>
                                    <div className='breadcrumbs-content'>
                                        <a href='#' className="CartItem__Remove">Remove</a>
                                    </div>
                                </div>
                            </div></div></div>
                        <div className="CartItemWrapper"><div className="CartItem">
                            <div className="CartItem__ImageWrapper AspectRatio">
                                <div className="AspectRatio AspectRatioDrawer" >
                                    <a href="">
                                        <img className="CartItem__Image" width height loading="lazy" src="//cdn.shopify.com/s/files/1/2428/5565/files/Black-Tan_e2fcef52-a178-4297-8c59-e9219fe23695_240x.png?v=1720589730" alt="Black/Tan" />
                                    </a>
                                </div>
                            </div>
                            <div className="CartItem__Info ml-2">
                                <h2 className="CartItem__Title "> Brunch Loafers</h2>
                                <div className="CartItem__Meta Heading Text--subdued">
                                    <div className="CartItem__PriceList">
                                        <span>Rs. 2,279</span>
                                        <strike>Rs. 4,299</strike>
                                        <span className="discount__cart">46% OFF</span>
                                    </div><p className="CartItem__Variant" style={{ display: 'none' }}>Black/Tan / UK 6</p>
                                    <p className="cart-item__variant-title">Color: Black/Tan</p>
                                    <p className="cart-item__variant-title">Size: UK 6</p>
                                    <ul className="CartItem__PropertyList">
                                    </ul></div><div className="CartItem__Actions Heading Text--subdued" style={{ textAlign: 'center' }}>
                                    <div className="CartItem__QuantitySelector">
                                        <div className="QuantitySelector"><a className="QuantitySelector__Button Link Link--primary m" href="" >{/* snippets%2Ficon.liquid */}<svg className="Icon Icon--minus " role="presentation" viewBox="0 0 16 2">
                                            <path d="M1,1 L15,1" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square" />
                                        </svg></a>
                                            <input type="text" name="updates[]" id="" className="QuantitySelector__CurrentQuantity" pattern="[0-9]*" data-line={1} defaultValue={1} /><a onclick="window.updateCart_qty(); webengage_updateCart_qty()" className="QuantitySelector__Button Link Link--primary p" title="Set quantity to 2" href="/cart/change?quantity=2&line=1" data-quantity={2} data-line={1} data-action="update-item-quantity">{/* snippets%2Ficon.liquid */}<svg className="Icon Icon--plus " role="presentation" viewBox="0 0 16 16">
                                                <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square">
                                                    <path d="M8,1 L8,15" />
                                                    <path d="M1,8 L15,8" />
                                                </g>
                                            </svg></a>
                                        </div>
                                    </div>
                                    <div className='breadcrumbs-content'>
                                        <a href='#' className="CartItem__Remove">Remove</a>
                                    </div>
                                </div>
                            </div></div></div>

                    </div>

                    <div className="Drawer__Footer-inner">
                        <div className="coupon-apply-text-block active">
                            <div className="coupon-apply-text-icon 1111">
                                {/* <img class="animated" src="//cdn.shopify.com/s/files/1/2428/5565/files/checkmark1_small.gif?v=1708059875"> */}
                                <img width height loading="lazy" alt="checkmark_small.gif" className="animated" src="//cdn.shopify.com/s/files/1/2428/5565/files/checkmark_small.gif?v=1708059875" style={{ display: 'none' }} />
                                <img width height loading="lazy" alt="Icon" className="static" src="//cdn.shopify.com/s/files/1/2428/5565/files/checkmark_small.png?v=1708075127" style={{ display: 'inline' }} />
                                <span className="coupon-apply-text"><span className="offer_text">Extra 10% off</span>auto-applied;
                                    <br /> You saved extra<span className="offer_price"> Rs. 549.70</span></span>
                            </div>
                            <div className="icon-close1">
                                 <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" stroke="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg> 
                            </div>
                        </div>
                        {/* <hr /> */}
                        <div className='Footer-inner px-2'>
                            <p className="Cart__Taxes Text--subdued">
                                Shipping &amp; taxes calculated at checkout
                            </p>
                            <div className="price-txxt d-flex justify-content-between">
                                <div> Subtotal:</div>
                                <div className="wh-price">
                                    <span className="wh-discount-price mr-1">Rs. 5,178</span>
                                    <span className="wh-original-price">Rs. 4,815.54</span>
                                </div>
                            </div>
                            <div className="gokwik-checkout">
                                <button className='Btn-1'
                                    id="button-gokwik"
                                    type="button"
                                    style={{ height: "54px", letterSpacing: "2px" }}  >
                                    <span className="btn-text">
                                        <span className="plc-ord-text">PLACE ORDER</span>
                                    </span>

                                    <div style={{ display: 'none' }}>
                                        <div className="cir-loader">Loading..</div>
                                    </div>
                                </button>
                            </div>
                            <button
                                id="int-chk-btn"
                                type="submit"
                                name="checkout"
                                style={{ display: 'none' }}
                                className="Cart__Checkout aish Button Button--secondary Button--full gokwik-checkout-mob-animation"
                            >
                                <span
                                    className="plc-ord-text"
                                    style={{ fontSize: '16px', fontWeight: '600', letterSpacing: '1px' }}
                                >
                                    PLACE ORDER
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default A
