import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './Style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Delete_CartItem, Get_CartItem, Get_Payment, incrementQuantity, Insert_Payment, updateCartItemQuantity } from './Slice/CartSlice';
import { toast } from 'react-toastify';
import { Get_Product } from '../Admin/Slice/ProductSlice';
import { useNavigate } from 'react-router-dom';
function OffCanvas({ isOffcanvasOpen, setIsOffcanvasOpen }) {
    const redirect = useNavigate()
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);
    const { product } = useSelector((state) => state.product)
    const user_Id = localStorage.getItem('wid')
    const UserDatafind = cart.filter((item) => item.userId === user_Id)
    // const [UserData, setUserData] = useState(false)

    const { payment } = useSelector((state) => state.payment)
    useEffect(() => {
        dispatch(Get_CartItem());
        dispatch(Get_Product())
        dispatch(Get_Payment())
    }, [dispatch]);
    const refreshproduct = () => {
        dispatch(Get_CartItem())
    }
    const [isLoading, setIsLoading] = useState(false);
    const handleMouseEnter = (e) => {
        const track = e.currentTarget.querySelector('.slick-track1');
        track.style.animationPlayState = 'paused';
    };
    const handleMouseLeave = (e) => {
        const track = e.currentTarget.querySelector('.slick-track1');
        track.style.animationPlayState = 'running';
    };
    useEffect(() => {
        if (isOffcanvasOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOffcanvasOpen]);
    const [banner, setbanner] = useState(false)
    const [emptyCart, setemptyCart] = useState(true)
    const Bannerresult = cart.find((item) => item.quantity > 0)
    useEffect(() => {
        if (UserDatafind.length > 0 && Bannerresult) {
            // setUserData(true)
            setbanner(true)
            setemptyCart(false)
        }
        else {
            setbanner(false)
            setemptyCart(true)
            // setUserData(false)
        }
    }, [Bannerresult, UserDatafind])
    const TotalPrice = UserDatafind.reduce((PrevItem, Item) => {
        try {
            const priceString = typeof Item.price === 'string' ? Item.price : String(Item.price);
            const price = priceString ? parseInt(priceString.replace(/,/g, ''), 10) : 0;
            return PrevItem + price;
        } catch (error) {
            console.error('Error parsing price:', error);
            return PrevItem;
        }
    }, 0).toLocaleString('en-US');

    // const handleDecrement = (id) => {
    //     setIsLoading(true)
    //     setTimeout(() => {
    //         setIsLoading(false)
    //         dispatch(decrementQuantity(id))
    //         const item = cart.find((item) => item.id === id);
    //         if (item && item.quantity > 1) {
    //             const updatedItem = {
    //                 id: item.id,
    //                 quantity: item.quantity - 1,
    //                 price: item.price
    //             };
    //             dispatch(updateCartItemQuantity(updatedItem));
    //         }
    //     }, 3000);
    // }
    const handleIncrement = (id) => {
        const item = cart.find((value) => value.id === id && value.userId === user_Id); //&& value.userId === user_Id
        if (item) {
            const originalPrice = parseInt(item.originalPrice.replace(/,/g, ''), 10);
            const newQuantity = item.quantity + 1;
            setIsLoading(true)
            setTimeout(() => {
                const updatedPrice = (originalPrice * newQuantity).toLocaleString('en-US');
                setIsLoading(false)
                // dispatch(incrementQuantity(id));
                // const result = { ...item,
                //     quantity: newQuantity,
                //     price: updatedPrice }
                //     console.log(result);
                dispatch(updateCartItemQuantity({
                    ...item,
                    quantity: newQuantity,
                    price: updatedPrice
                })).then(() => {
                    refreshproduct()
                })
            }, 3000);
        }
    };
    const handleDecrement = (id) => {
        const item = cart.find((value) => value.id === id);
        if (item && item.quantity > 1) {
            const originalPrice = parseInt(item.originalPrice.replace(/,/g, ''), 10);
            const newQuantity = item.quantity - 1;
            const updatedPrice = (originalPrice * newQuantity).toLocaleString('en-US');
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                // dispatch(decrementQuantity(id));
                dispatch(updateCartItemQuantity({
                    ...item,
                    quantity: newQuantity,
                    price: updatedPrice
                })).then(() => {
                    refreshproduct()
                })
            }, 3000);
        }
    };
    const HandelDelete = (id) => {
        setIsLoading(true)
        dispatch(Delete_CartItem(id))
        const fullLoadTimeout = setTimeout(() => {
            setIsLoading(false)
            toast.success('Delete Date Success')
            refreshproduct()
            setIsOffcanvasOpen(false)
        }, 3000);
        return () => {
            clearInterval(fullLoadTimeout)
        }
    }
    const getCartHeading = () => {
        const result = UserDatafind.reduce((acc, item) => acc + item.quantity, 0);
        if (result === 2) {
            return (
                <> Add 1 more product for <span>Extra 10% off</span></>
            );
        } else if (result >= 3) {
            return (
                <>🎉Congrats! <span> Extra 10% Off </span> applied.</>
            );
        } else {
            return (
                <> Add 1 more product for <span>Extra 7% off</span></>
            );
        }
    };
    const quantityindex = () => {
        return UserDatafind.reduce((total, item) => total + item.quantity, 0) > 1;
    }
    const quantityindex2 = () => {
        return UserDatafind.reduce((total, item) => total + item.quantity, 0) > 2
    }
    const Replaceresult = TotalPrice.replace(/,/g, '')
    const PriceNumber = parseFloat(Replaceresult)
    const result = UserDatafind.reduce((total, item) => total + item.quantity, 0);
    const [Priceresult, setPriceresult] = useState(null)
    const [Discount, setDiscount] = useState(null);
    const [DiscountText, setDiscountText] = useState('')
    const [DiscountPrice, setDiscountPrice] = useState(TotalPrice)
    useEffect(() => {
        if (quantityindex()) {
            setDiscount(TotalPrice)
        } else {
            setDiscount()
        }
    }, [TotalPrice, quantityindex()])
    useEffect(() => {
        let discount = 0
        let discountprice = TotalPrice
        if (result >= 3) {
            discount = Math.round(PriceNumber * 0.1)
            setDiscountText('Extra 10% off')
            discountprice = PriceNumber - discount
        } else if (result === 2) {
            discount = Math.round(PriceNumber * 0.07)
            setDiscountText('Extra 7% off')
            discountprice = PriceNumber - discount
        }
        setPriceresult(discount.toLocaleString('en-US'))
        setDiscountPrice(discountprice.toLocaleString('en-US'))
    }, [result, PriceNumber, cart])
 
    const PaymentHandel = () => {
        const ProductwithId = cart.filter((item) => item.userId === user_Id);
        console.log('Filtered Products:', ProductwithId);
        if (ProductwithId && ProductwithId.length > 0) {
            const PaymentId = payment.reduce((maxId, item) => Math.max(maxId, item.id), 0);
            const newOrderId = PaymentId + 1;
            const CartItem = {
                id: newOrderId,
                userId: user_Id,
                products: ProductwithId,
                totalPrice: DiscountPrice
            };
            // console.log(CartItem);
            dispatch(Insert_Payment(CartItem))
        } else {
            console.log("Product not found!!");
        }
    };
    const PaymentHandelRedirect = (e) => {
        e.preventDefault();
        PaymentHandel();
        redirect('checkout/' + user_Id);
    }
    return (
        <div className={`goto-here ${isOffcanvasOpen ? 'show' : ''}`} id="demo" style={{ display: isOffcanvasOpen ? 'block' : 'none' }}>
            {isLoading && (
                <div className="range-loader">
                    <div className='loader-bar'></div>
                </div>
            )}
            <Helmet>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            </Helmet>
            <div class={`offcanvas ${isOffcanvasOpen ? 'show' : ''}`} id="demo" style={{ display: isOffcanvasOpen ? 'block' : 'none' }}>
                <div class="offcanvas-header  ">
                    <div className='d-flex justify-content-between py-3 px-2'>
                        <span class="Drawer__Title Heading u-h4">Cart </span>
                        <button type="button" class="btn-close" onClick={() => setIsOffcanvasOpen(false)} id="closeButton">
                            <i class="fa-solid fa-x"></i>
                        </button>
                    </div>
                    <div className="Empty-announcementBar__Wrapper slick-initialized slick-slider1"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div aria-live="polite" className="slick-list1 draggable">
                            <div className="slick-track1" role="listbox">
                                <div
                                    className="empty-anc-text slick-slide"
                                    data-slick-index={0}
                                    aria-hidden="false"
                                    tabIndex={-1}
                                >
                                    7 Days Free Exchange
                                </div>
                                <div
                                    className="empty-anc-text slick-slide"
                                    data-slick-index={1}
                                    aria-hidden="false"
                                    tabIndex={-1}
                                >
                                    Delivered in 4-5 days
                                </div>
                                <div
                                    className="empty-anc-text slick-slide"
                                    data-slick-index={2}
                                    aria-hidden="false"
                                    tabIndex={-1}
                                >
                                    Free Delivery
                                </div>
                                <div
                                    className="empty-anc-text slick-slide"
                                    data-slick-index={3}
                                    aria-hidden="false"
                                    tabIndex={-1}
                                >
                                    7 Days Free Exchange
                                </div>
                                <div
                                    className="empty-anc-text slick-slide"
                                    data-slick-index={4}
                                    aria-hidden="false"
                                    tabIndex={-1}
                                >
                                    Delivered in 4-5 days
                                </div>
                                <div
                                    className="empty-anc-text slick-slide"
                                    data-slick-index={5}
                                    aria-hidden="false"
                                    tabIndex={-1}
                                >
                                    Free Delivery
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        banner && (
                            <div className="sc-cart-banner" data-offer1="Extra 7% off" data-offer2="Extra 10% off" data-offer3="🎉Congrats! <span> Extra 10% Off </span> applied.">
                                <div className="sc-cart-heading 112233 active">
                                    {getCartHeading()}
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
                                    <div className={`sc-cart-offer1 step ${quantityindex() ? 'active' : ''}`}>
                                        <div className={quantityindex() ? 'offers-block' : ''}>
                                            <div className="offers">
                                                <strong>7%</strong> off
                                            </div>
                                        </div>
                                        <span>Buy any 2</span>
                                    </div>
                                    <div className={`sc-cart-offer2 step ${quantityindex2() ? 'active' : ''}`}>
                                        <div className={quantityindex2() ? 'offers-block' : ''}>
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
                        )
                    }
                </div>
                {
                    emptyCart && (
                        <>
                            <div class="emptyCart-header">
                                <div class="bagImg center">
                                    <img class="img-fluid lazy" loading="lazy" width="auto" height="auto" alt="Empty bag" src="//cdn.shopify.com/s/files/1/2428/5565/files/Cart-image_110x.png?v=1666963566" />
                                </div>
                                <h4 class="cart-header h4 center margin-0">
                                    Your bag is empty
                                </h4>
                                <p class="subheading center">
                                    Start shopping with Neeman’s
                                </p>
                            </div>
                            <div class="mostly-bought-text">Mostly Bought -</div>
                            <div className="Grid__Cell-flex">

                                {

                                    product && product.filter((item, index) => [0, 3, 6, 11, 12, 15].includes(index)).map((item, index) => {
                                        return (
                                            <div key={index} className="prod-img-price-wrapper empty-cart-upsell" >
                                                <div className="empty-cart-prod-img">
                                                    <img className="lazy" loading="lazy" width="auto" height="auto" src={item.image} alt="Black" />
                                                </div>
                                                <div className="prod-name-price-wrapper">
                                                    <div className="empty-cart-prod-name">{item.name}</div>
                                                    <div className="prod-price-wrapper">
                                                        <div className="empty-cart-prod-price">Rs. {item.price}</div>
                                                        <div className="empty-cart-prod-comp-price"><del>Rs. {item.pro_price}</del></div>
                                                        <div className="empty-cart-discount">
                                                            {item.discount}% OFF
                                                        </div>
                                                    </div>
                                                    <div className="empty-cart-quick-view-btn Button Button--secondary empty-cart-qv-btn-mob-animation">
                                                        <a href="">
                                                            <div className="empty_Btn" onClick={(e) => { e.preventDefault(); redirect('/single_product/' + item.id) }}>
                                                                VIEW PRODUCT
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                        </>
                    )
                }

                <div class="offcanvas-body p-3">
                    {
                        UserDatafind && UserDatafind.map((value, index) => {
                            return (
                                <div key={index} className="CartItemWrapper"><div className="CartItem">
                                    <div className="CartItem__ImageWrapper AspectRatio">
                                        <div className="AspectRatio AspectRatioDrawer" >
                                            <a href="">
                                                <img className="CartItem__Image" width height loading="lazy" src={value.image} alt="Black/Tan" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="CartItem__Info ml-2">
                                        <h2 className="CartItem__Title ">{value.name}</h2>
                                        <div className="CartItem__Meta Heading Text--subdued">
                                            <div className="CartItem__PriceList">
                                                <span>{value.price}</span>
                                                <strike>{value.pro_price}</strike>
                                                <span className="discount__cart">{value.discount}% OFF</span>
                                            </div><p className="CartItem__Variant" style={{ display: 'none' }}>Black/Tan / UK 6</p>
                                            <p className="cart-item__variant-title">Color:  {value.color}</p>
                                            <p className="cart-item__variant-title">Size: UK {value.size}</p>
                                            <ul className="CartItem__PropertyList">
                                            </ul></div><div className="CartItem__Actions Heading Text--subdued" style={{ textAlign: 'center' }}>
                                            <div className="CartItem__QuantitySelector">
                                                <div className="QuantitySelector"><a className="QuantitySelector__Button Link Link--primary m" href="#" onClick={(e) => { e.preventDefault(); handleDecrement(value.id) }}>
                                                    <svg className="Icon Icon--minus " role="presentation" viewBox="0 0 16 2">
                                                        <path d="M1,1 L15,1" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square" />
                                                    </svg></a>
                                                    <input type="text" name="" id="" className="QuantitySelector__CurrentQuantity" value={value.quantity} />
                                                    <a className="QuantitySelector__Button Link Link--primary p" href="#" onClick={(e) => { e.preventDefault(); handleIncrement(value.id) }}>
                                                        <svg className="Icon Icon--plus " role="presentation" viewBox="0 0 16 16">
                                                            <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square">
                                                                <path d="M8,1 L8,15" />
                                                                <path d="M1,8 L15,8" />
                                                            </g>
                                                        </svg></a>
                                                </div>
                                            </div>
                                            <div className='breadcrumbs-content'>
                                                <a href='#' className="CartItem__Remove" onClick={(e) => {
                                                    e.preventDefault(); HandelDelete(value.id)
                                                }}>Remove</a>
                                            </div>
                                        </div>
                                    </div></div></div>
                            )
                        })
                    }
                </div>
                {
                   banner && (
                        <div className="Drawer__Footer-inner ">
                            <div className={`coupon-apply-text-block ${quantityindex() ? 'active' : ''}`}>
                                <div className="coupon-apply-text-icon 1111">
                                    <img width height loading="lazy" alt="checkmark_small.gif" className="animated" src="//cdn.shopify.com/s/files/1/2428/5565/files/checkmark_small.gif?v=1708059875" style={{ display: 'none' }} />
                                    <img width height loading="lazy" alt="Icon" className="static" src="//cdn.shopify.com/s/files/1/2428/5565/files/checkmark_small.png?v=1708075127" style={{ display: 'inline' }} />
                                    <span className="coupon-apply-text"><span className="offer_text">{DiscountText}</span>auto-applied;
                                        <br /> You saved extra<span className="offer_price"> Rs. {Priceresult}</span></span>
                                </div>
                                <div className="icon-close1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" stroke="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                </div>
                            </div>
                            <div className='Footer-inner px-2'>
                                <p className="Cart__Taxes Text--subdued">
                                    Shipping &amp; taxes calculated at checkout
                                </p>
                                <div className="price-txxt d-flex justify-content-between">
                                    <div> Subtotal:</div>
                                    <div className="wh-price">
                                        <strike className='mr-1'>{Discount}</strike>
                                        <span className="wh-original-price">Rs.{DiscountPrice}</span>
                                    </div>
                                </div>
                                <div className="gokwik-checkout">
                                    <button className='Btn-1'
                                        id="button-gokwik"
                                        type="button" onClick={PaymentHandelRedirect}
                                        style={{ height: "54px", letterSpacing: "2px" }}  >
                                        <span className="btn-text">
                                            <span className="plc-ord-text">PLACE ORDER</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default OffCanvas;
