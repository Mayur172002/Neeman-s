import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useParams } from 'react-router-dom'
import { Get_Product } from '../Admin/Slice/ProductSlice'
import Header from './Header'
import { Helmet } from 'react-helmet'
import Footer from './Footer'
import { get_categories } from '../Admin/Slice/CategoriesSlice'
import { Get_CartItem, Insert_Cart, updateCartItemQuantity } from './Slice/CartSlice'
import { toast } from 'react-toastify'
import $ from 'jquery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.min.js';
import OffCanvas from './OffCanvas'

function View_Cate() {
    const Iamges = [
        { src: 'https://neemans.com/cdn/shop/files/BWC_-_Collection_Page_Image_500_x_530_px_402x.jpg?v=1710500486' },
        { src: 'https://neemans.com/cdn/shop/files/2_ND--breatherslides-women_Collection-Page-Banner-_500-x-530-px_402x.jpg?v=1713601172' },
        { src: 'https://neemans.com/cdn/shop/files/Cotton-Classic-collections_image_402x.jpg?v=1663866252' },
        { src: 'https://neemans.com/cdn/shop/files/Eco-Slides-collections_image_402x.jpg?v=1663866252' },
        { src: 'https://neemans.com/cdn/shop/files/Hipster_-_Collection_Page_Image_500_x_530_px_402x.jpg?v=1705410484' },
        { src: 'https://neemans.com/cdn/shop/files/2_ND_citystrides_Collection-Page-Banner-_500-x-530-px_402x.jpg?v=1719310222' },
        { src: 'https://neemans.com/cdn/shop/files/GFS_-_Collection_Page_Image_500_x_530_px_402x.jpg?v=1704368599' },
        { src: 'https://neemans.com/cdn/shop/files/DPL_-_Collection_Page_Image_500_x_530_px_402x.jpg?v=1701157783' },
        { src: 'https://neemans.com/cdn/shop/files/LUB_-_Collection_Page_Image_500_x_530_px_402x.jpg?v=1718802522' },
        { src: 'https://neemans.com/cdn/shop/files/PSF_-_Collection_Page_Image_500_x_530_px_402x.jpg?v=1712922960' },
        { src: 'https://neemans.com/cdn/shop/files/ALF_-_Collection_Page_Image_500_x_530_px_402x.jpg?v=1713794986' },
        { src: 'https://neemans.com/cdn/shop/files/2_ND---humbleflips_Collection-Page-Banner-_500-x-530-px_402x.jpg?v=1710433979' },
        { src: 'https://neemans.com/cdn/shop/files/CFS_-_Collection_Page_Image_500_x_530_px_402x.jpg?v=1719838369' },
        { src: 'https://neemans.com/cdn/shop/files/collections_cork_sandals_402x.jpg?v=1673526039' },
        { src: 'https://neemans.com/cdn/shop/files/TOK_-_Collection_Page_Image_500_x_530_px_402x.jpg?v=1720595712' },
        { src: 'https://neemans.com/cdn/shop/files/2_ND--eighties_Collection-Page-Banner-_500-x-530-px_402x.jpg?v=1719311980' },
        { src: 'https://neemans.com/cdn/shop/files/CWS_-_Collection_Page_Image_500_x_530_px_402x.jpg?v=1715087926' },
    ]
    const dispatch = useDispatch()
    const { product } = useSelector((state) => state.product)
    const { categories } = useSelector((state) => state.categories)
    const { cart } = useSelector((state) => state.cart)
    const { categories_ID } = useParams()
    useEffect(() => {
        dispatch(get_categories())
        dispatch(Get_Product())
    }, [])
    /* Title code */
    const cate_name = categories.filter((value) => { return value.id === categories_ID })
    console.log(cate_name);
    useEffect(() => {
        if (cate_name) {
            cate_name && cate_name.map((value) => {
                if (value.id.slice(0, 2)) {
                    document.title = `Footwear for ${value.name} - Buy Online Get Upto % Off In July 26, 2024 - Neeman's`
                }
                if (value.id.slice(2, 4)) {
                    document.title = `${value.name} Collection - Buy Online Get Upto % Off In July 26, 2024 - Neeman's`
                }
                if (value.id.slice(4, 12)) {
                    document.title = `Buy ${value.name} For Men & Women Online with Discount upto 50% - Buy Online Get Upto % Off In July 26, 2024 - Neeman's`
                }
            })
        }
    }, [])
    const Product_cate = product.filter((value) => {
        const categories1 = value.cate_Id.split('||');
        // console.log("cate", categories1);
        return categories1.includes(categories_ID)
    })
    console.log("Filtered products:", Product_cate);
     /* Pegination code */
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15;
    const imagesPerPage = 5;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.max(
        Math.ceil(Product_cate.length / productsPerPage),
        Math.ceil(Iamges.length / productsPerPage)
    );
    // const totalPages = Math.ceil(Product_cate.length / productsPerPage);
    const [selectedOption, setSelectedOption] = useState('Featured');
    /* Filter product code */
    const sortedData = useMemo(() => {
        const parsePrice = (pricestring) => {
            return parseFloat(pricestring.replace(/[^0-9.]/g, '')) || 0;
        }
        let sorted = [...Product_cate];
        switch (selectedOption) {
            case 'Price - Low to High':
                sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
                break;
            case 'Price - High to Low':
                sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
                break
            case 'Best Selling':
                sorted = sorted.filter((value) => value.new_product === 'new');
                break;
            default:
                break;
        }
        console.log('Sorted Data:', sorted);
        return sorted;
    }, [Product_cate, selectedOption]);
    const currentProducts = useMemo(() => {
        return sortedData.slice(indexOfFirstProduct, indexOfLastProduct)
    }, [sortedData, indexOfFirstProduct, indexOfLastProduct])
    const handleOptionClick = (option, e) => {
        e.preventDefault();
        setSelectedOption(option);
        document.getElementById('dropdown-toggle').checked = false;
    };
    /* Auto slider (slick slider) */
    useEffect(() => {
        const sliders = $('.slider');
        if (sliders.length) {
            sliders.slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 1000,
                pauseOnHover: false
            });
        }
        return () => {
            if (sliders.length && sliders.hasClass('slick-initialized')) {
                sliders.slick('unslick');
            }
        };
    }, currentProducts, []);
    const handleMouseEnter = (id) => {
        const index = currentProducts.findIndex(product => product.id === id);
        if (index !== -1) {
            $(`.slider[data-product-id=${id}]`).slick('slickPlay');
        }
    };
    const handleMouseLeave = (id) => {
        $(`.slider[data-product-id=${id}]`).slick('slickPause');
    };
    /* Add To Cart */
    const [show, setShow] = useState(false);
    const user_Id = localStorage.getItem('wid')
    const [currentProductId, setCurrentProductId] = useState(null);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const refreshproduct = () => {
        dispatch(Get_CartItem())
    }
    const handleSizeChange = (e) => {
        const selected = e.target.value;
        console.log('Selected size:', selected);
        setSelectedSize(selected);
        setTimeout(() => {
            if (selected) {
                setIsOffcanvasOpen(!isOffcanvasOpen);
                refreshproduct();
            }
        }, 2000);
    }
    const openModal = (id) => {
        if (!user_Id) {
            toast.error('Please Login Here')
            return false
        }
        setCurrentProductId(id);
        setShow(true);
    };
    const closeModal = () => {
        setSelectedSize(null)
        setShow(false);
    };
    const Add_Cart = () => {
        const AddtoProduct = currentProducts.find((product) => product.id === currentProductId);
        const CartItemId = cart.find((value) => value.id === currentProductId && value.size === selectedSize)
        console.log(CartItemId);
        if (AddtoProduct) {
            if (!selectedSize) {
                return false;
            }
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
            closeModal();
        }
        else {
            toast.error("Product not found");
        }
    };
 
    return (
        <div>
            <Header />
            <Helmet>
                <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.stellar.js/0.6.2/jquery.stellar.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/owl.carousel2/2.3.4/owl.carousel.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/scrollax/1.0.0/scrollax.min.js"></script>
                <script src="../Website/js/main.js"></script>
                {/* <script src="./Website/js/jquery.min.js"></script>
                <script src="./Website/js/jquery-migrate-3.0.1.min.js"></script>
                <script src="./Website/js/jquery.waypoints.min.js"></script>
                <script src="./Website/js/jquery.stellar.min.js"></script>
                <script src="./Website/js/owl.carousel.min.js"></script>
                <script src="./Website/js/aos.js"></script>
                <script src="./Website/js/scrollax.min.js"></script> */}
            </Helmet>
            <div>
                <div className="hero-wrap hero-bread" style={{ backgroundImage: 'url("https://neemans.com/cdn/shop/files/Why_neemans_banner_2_1_1920x800.jpg?v=1689873004")', height: "600px" }}>
                    <div className="container">
                        <div className="row no-gutters slider-text align-items-center justify-content-center">
                        </div>
                    </div>
                </div>

                <div className="container-fluid px-5 mt-5 ">
                    {
                        cate_name && cate_name.map((value, index) => {
                            return (
                                <h2 key={index} className="collection_page_heading text-center">{value.name}'s collection</h2>
                            )
                        })
                    }
                    <div class="heading-and-arrow px-4" >
                        <div class="collection-breadcrumb">
                            <div class="breadcrumbs-content home-svg bread-home-svg">
                                <a aria-label="Home" href="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                        <path
                                            d="M17.0961 8.33617L10.8461 2.4393C10.843 2.43663 10.8402 2.43376 10.8375 2.4307C10.6074 2.22143 10.3075 2.10547 9.99648 2.10547C9.68545 2.10547 9.38558 2.22143 9.15547 2.4307L9.14688 2.4393L2.90391 8.33617C2.77656 8.45327 2.67491 8.59553 2.60538 8.75395C2.53586 8.91236 2.49997 9.08348 2.5 9.25648V16.4791C2.5 16.8107 2.6317 17.1286 2.86612 17.363C3.10054 17.5974 3.41848 17.7291 3.75 17.7291H7.5C7.83152 17.7291 8.14946 17.5974 8.38388 17.363C8.6183 17.1286 8.75 16.8107 8.75 16.4791V12.7291H11.25V16.4791C11.25 16.8107 11.3817 17.1286 11.6161 17.363C11.8505 17.5974 12.1685 17.7291 12.5 17.7291H16.25C16.5815 17.7291 16.8995 17.5974 17.1339 17.363C17.3683 17.1286 17.5 16.8107 17.5 16.4791V9.25648C17.5 9.08348 17.4641 8.91236 17.3946 8.75395C17.3251 8.59553 17.2234 8.45327 17.0961 8.33617ZM16.25 16.4791H12.5V12.7291C12.5 12.3976 12.3683 12.0797 12.1339 11.8453C11.8995 11.6108 11.5815 11.4791 11.25 11.4791H8.75C8.41848 11.4791 8.10054 11.6108 7.86612 11.8453C7.6317 12.0797 7.5 12.3976 7.5 12.7291V16.4791H3.75V9.25648L3.75859 9.24867L10 3.35414L16.2422 9.24711L16.2508 9.25492L16.25 16.4791Z"
                                            fill="#222222"></path>
                                    </svg>
                                </a>
                            </div>
                            <NavLink to={'/'}>
                                <div class="breadcrumbs-arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                                        <path d="M4.5 2.47913L8.25 6.22913L4.5 9.97913" stroke="#808080" stroke-linecap="round" stroke-linejoin="round">
                                        </path>
                                    </svg>
                                </div>
                            </NavLink>
                            <div class="breadcrumbs-content 55555">
                                <NavLink aria-label="All Products" to="/shop" style={{ color: "black" }}> All Products </NavLink>
                            </div>

                            <div class="breadcrumbs-arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                                    <path d="M4.5 2.47913L8.25 6.22913L4.5 9.97913" stroke="#808080" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                </svg>
                            </div>
                            <div class="breadcrumbs-content 55555">
                                <a aria-label="All Products" href="/collections/all-products" style={{ color: "black" }}> Shoes </a>
                            </div>

                            <div class="breadcrumbs-arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                                    <path d="M4.5 2.47913L8.25 6.22913L4.5 9.97913" stroke="#808080" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                </svg>
                            </div>


                            {
                                cate_name && cate_name.map((value, index) => {
                                    return (
                                        <div key={index} class="breadcrumbs-content breadcrumbs-last-child 66666" style={{ fontSize: "16px" }}>
                                            {value.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div class="swiper-button-wrapper">
                            <div class="dropdown">
                                <input type="checkbox" id="dropdown-toggle" />
                                <label for="dropdown-toggle" className="dropbtn text-secondary">
                                    Sort By : <span class="btn-text text-body">{selectedOption}</span>
                                    <span class="arrow"></span>
                                </label>
                                <div class="dropdown-content">
                                    <a href="#" onClick={(e) => handleOptionClick('Featured', e)}>Featured</a>
                                    <a href="#" onClick={(e) => handleOptionClick('Best Selling', e)}>Best Selling</a>
                                    <a href="#" onClick={(e) => handleOptionClick('Price - Low to High', e)}>Price - Low to High</a>
                                    <a href="#" onClick={(e) => handleOptionClick('Price - High to Low', e)}>Price - High to Low</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    user_Id && (
                        <div>
                            {show && (
                                <div className="modal_size" style={{ display: 'block' }}>
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title model_title">Select Size(UK)</h4>
                                            <button type="button" className="close" onClick={closeModal}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M15.625 4.375L4.375 15.625" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M15.625 15.625L4.375 4.375" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <ul class="size-selection-list mt-3">
                                                {
                                                    [6, 7, 8, 9, 10, 11, 12].map((size, index) => (
                                                        <li className="size-selection-item" key={index} onClick={Add_Cart} id="toggleButton">
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
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                <section className=" pt-5 mt-5 bg-light">
                    <div className="container-fluid">
                        <div className="row justify-content-center px-5">
                        <div className="col-md-4 col-lg-3">
                                    <div className="d-flex flex-column">
                                        {
                                            Iamges && Iamges.slice(indexOfFirstImage, indexOfLastImage).map((value, index) => {
                                                return (
                                                    <div class={`product_meta_image ${index === 0 ? '' : 'mt-5 pt-3'}`} key={index}>
                                                        <picture>
                                                            <img width="auto" height="auto" loading="lazy" class="Single_product_image lazyload lazy z 2222" src={value.src} alt="The SneakPops" />
                                                        </picture>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            <div className="col-md-8 col-lg-9 col-md-12">
                                <div className="row ">
                                    {
                                        currentProducts && currentProducts.map((value, index) => {
                                            return (
                                                <div key={index} className="col-sm-12 col-md-12 col-lg-4 ftco-animate d-flex">
                                                    <div className="product d-flex flex-column">
                                                        <Link to={"/single_product/" + value.id}>

                                                            <a href="#"
                                                                onMouseEnter={() => handleMouseEnter(value.id)}
                                                                onMouseLeave={() => handleMouseLeave(value.id)} data-product-id={value.id} className="img-prod slider" style={{ overflow: "hidden" }}>
                                                                <div><img className='img-fluid' src={value.image} alt="First Image" /></div>
                                                                <div><img className='img-fluid' src={value.image1} alt="Secound Image" /></div>
                                                                <div><img className='img-fluid' src={value.image2} alt="Third Image" /></div>
                                                                {/* <img className="img-fluid" src={value.image} alt="Colorlib Template" /> */}
                                                            </a>
                                                            <div className="text py-3 pb-4 px-3">
                                                                <div className="d-flex">
                                                                    <div className="cat">
                                                                        <span>{value.color}</span>
                                                                    </div>
                                                                    <div className="rating">
                                                                        <p className="text-right mb-0">
                                                                            <a href="#"><span className="ion-ios-star-outline" /></a>
                                                                            <a href="#"><span className="ion-ios-star-outline" /></a>
                                                                            <a href="#"><span className="ion-ios-star-outline" /></a>
                                                                            <a href="#"><span className="ion-ios-star-outline" /></a>
                                                                            <a href="#"><span className="ion-ios-star-outline" /></a>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <h3><a href="#">{value.name}</a></h3>
                                                                <div className="pricing">
                                                                    <p className="price"><b><span> Rs.{value.price}</span> <span className="ml-1 price-dc text-secondary" style={{ fontSize: "13px" }}>Rs.{value.pro_price}</span></b></p>
                                                                </div>
                                                                <p className="bottom-area d-flex px-3 mt-4">
                                                                    <a href="#" className=" text-center py-2 mr-1 Btn-1" onClick={(e) => { e.preventDefault(); openModal(value.id) }}><span>Add to cart <i className="ion-ios-add ml-1" /></span></a>
                                                                    <a href="#" className=" text-center py-2 Btn-1">Buy now<span><i className="ion-ios-cart ml-1" /></span></a>
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
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
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-gallery">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 heading-section text-center mb-4 ftco-animate">
                                <h2 className="mb-4">Follow Us On Instagram</h2>
                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in</p>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid px-0">
                        <div className="row no-gutters">
                            <div className="col-md-4 col-lg-2 ftco-animate">
                                <a href="Website/images/gallery-1.jpg" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: 'url(Website/images/gallery-1.jpg)' }}>
                                    <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                        <span className="icon-instagram" />
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4 col-lg-2 ftco-animate">
                                <a href="Website/images/gallery-2.jpg" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: 'url(Website/images/gallery-2.jpg)' }}>
                                    <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                        <span className="icon-instagram" />
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4 col-lg-2 ftco-animate">
                                <a href="Website/images/gallery-3.jpg" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: 'url(Website/images/gallery-3.jpg)' }}>
                                    <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                        <span className="icon-instagram" />
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4 col-lg-2 ftco-animate">
                                <a href="Website/images/gallery-4.jpg" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: 'url(Website/images/gallery-4.jpg)' }}>
                                    <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                        <span className="icon-instagram" />
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4 col-lg-2 ftco-animate">
                                <a href="Website/images/gallery-5.jpg" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: 'url(Website/images/gallery-5.jpg)' }}>
                                    <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                        <span className="icon-instagram" />
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4 col-lg-2 ftco-animate">
                                <a href="Website/images/gallery-6.jpg" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: 'url(Website/images/gallery-6.jpg)' }}>
                                    <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                        <span className="icon-instagram" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
            <OffCanvas isOffcanvasOpen={isOffcanvasOpen} setIsOffcanvasOpen={setIsOffcanvasOpen} />
        </div>
    )
}

export default View_Cate