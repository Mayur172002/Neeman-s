import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import './Style.css'
import { useDispatch, useSelector } from 'react-redux'
import { get_categories } from '../Admin/Slice/CategoriesSlice'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Get_Product } from '../Admin/Slice/ProductSlice'
import { Get_CartItem, Insert_Cart, updateCartItemQuantity } from './Slice/CartSlice'
import { toast } from 'react-toastify'
import OffCanvas from './OffCanvas'
function Home() {
    const redirect = useNavigate()
    const dispatch = useDispatch()
    const { categories } = useSelector((state) => state.categories)
    const { product } = useSelector((state) => state.product)
    const search = useSelector((state) => state.product.search);
    const { cart } = useSelector((state) => state.cart)
    useEffect(() => {
        dispatch(get_categories())
        dispatch(Get_Product())
        dispatch((Get_CartItem()))
    }, [Get_CartItem])
    const new_product = product.filter((value) => value.new_product === "new")
    const [show, setShow] = useState(false);
    const user_Id = localStorage.getItem('wid')
    const [currentProductId, setCurrentProductId] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [MainImage, setMainImage] = useState({})
    const HandelImagesChange = (imgId, image) => {
        setMainImage(mainImg => ({
            ...mainImg, [imgId]: image
        }))
    }
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
    useEffect(() => {
        if (isOffcanvasOpen || show) {
            document.body.style.overflow = "hidden"
        }
        else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [])
    const Add_Cart = () => {
        const AddtoProduct = new_product.find((product) => product.id === currentProductId);
        const CartItemId = cart.find((value) => value.id === currentProductId && value.size === selectedSize && value.userId === user_Id) //&& value.userId === user_Id
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
    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => resolve(src);
                script.onerror = () => reject(new Error(`Failed to load script ${src}`));
                document.head.appendChild(script);
            });
        };
        const loadScripts = async () => {
            const scripts = [
                './Website/js/jquery.min.js',
                './Website/js/jquery-migrate-3.0.1.min.js',
                './Website/js/jquery.waypoints.min.js',
                './Website/js/jquery.stellar.min.js',
                './Website/js/owl.carousel.min.js',
                './Website/js/aos.js',
                './Website/js/scrollax.min.js',
                './Website/js/main.js',
                'https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/js/bootstrap.bundle.min.js',
                'https://code.jquery.com/jquery-3.5.1.slim.min.js',
                'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
            ];

            try {
                for (const src of scripts) {
                    await loadScript(src);
                    // console.log(`Loaded script: ${src}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadScripts();
    }, []);

    return (
        <div class="goto-here">
            <Header />
            {/* <Helmet>
                <script src="./Website/js/jquery.min.js"></script>
                <script src="./Website/js/jquery-migrate-3.0.1.min.js"></script>
                <script src="./Website/js/jquery.waypoints.min.js"></script>
                <script src="./Website/js/jquery.stellar.min.js"></script>
                <script src="./Website/js/owl.carousel.min.js"></script>
                <script src="./Website/js/aos.js"></script>
                <script src="./Website/js/scrollax.min.js"></script>
                <script src="./Website/js/main.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
            </Helmet> */}
            <section id="home-section" className="hero">
                <div className="home-slider owl-carousel">
                    <div className="slider-item js-fullheight">
                        <div className="container-fluid p-0">
                            <img className="one-third order-md-last img-fluid" src="https://neemans.com/cdn/shop/files/oxford-knits_D_Webbanner_1920_800_x1360.jpg?v=1720702081" alt />
                        </div>
                    </div>
                    <div className="slider-item js-fullheight">
                        <div className="container-fluid p-0">
                            <img className="one-third order-md-last img-fluid" src="https://neemans.com/cdn/shop/files/block-heel-laofer_D_Webbanner_1920_800_x1360.jpg?v=1720702087" alt />
                        </div>
                    </div>  <div className="slider-item js-fullheight">
                        <div className="container-fluid p-0">
                            <img className="one-third order-md-last img-fluid" src="https://neemans.com/cdn/shop/files/brunchloafers_D_Webbanner_1920_800_x1360.jpg?v=1720618912" alt />
                        </div>
                    </div>
                    <div className="slider-item js-fullheight">
                        <div className="container-fluid p-0">
                            <img className="one-third order-md-last img-fluid" src="https://neemans.com/cdn/shop/files/Web-Banner_The-Comfornauts_DF_050724_x1360.jpg?v=1720162345" alt />
                        </div>
                    </div>
                </div>
                <div className="sc-desk-shipping d-flex flex-wrap">
                    <div className="sc-desk-shipping-item">
                        <div className="sc-shipping-icon"> <svg width={56} height={57} viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.688477" width={56} height={56} rx={28} fill="#C4E7D2" />
                            <path d="M27.3553 34.2945C30.4169 34.2945 32.8988 31.8126 32.8988 28.751C32.8988 25.6894 30.4169 23.2075 27.3553 23.2075C24.2937 23.2075 21.8118 25.6894 21.8118 28.751C21.8118 31.8126 24.2937 34.2945 27.3553 34.2945Z" stroke="#007E45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.4583 39.7507C19.2925 38.1077 20.5653 36.7277 22.1358 35.7637C23.7062 34.7998 25.5129 34.2896 27.3556 34.2896C29.1983 34.2896 31.005 34.7998 32.5754 35.7637C34.1459 36.7277 35.4187 38.1077 36.2529 39.7507" stroke="#007E45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M40.4758 27.6422C40.9435 30.4213 40.5159 33.2772 39.2547 35.7975C37.9934 38.3178 35.9639 40.372 33.459 41.6636C30.9542 42.9551 28.1036 43.4172 25.319 42.9831C22.5344 42.5489 19.9599 41.241 17.9671 39.2482C15.9743 37.2554 14.6664 34.6809 14.2323 31.8963C13.7981 29.1117 14.2602 26.2612 15.5517 23.7563C16.8433 21.2514 18.8975 19.2219 21.4178 17.9607C23.9381 16.6994 26.794 16.2718 29.5731 16.7396" stroke="#007E45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M38.691 18.1944L38.689 18.1942C38.4781 18.1746 38.2793 18.0957 38.1134 17.9693C37.948 17.8433 37.8224 17.6756 37.7463 17.4868C37.7463 17.4867 37.7463 17.4867 37.7463 17.4866C37.7462 17.4865 37.7461 17.4863 37.7461 17.4861L36.9925 15.6162L36.2389 17.4861C36.2389 17.4863 36.2388 17.4865 36.2387 17.4866C36.2387 17.4867 36.2387 17.4867 36.2387 17.4868C36.1627 17.6756 36.037 17.8433 35.8716 17.9693C35.7058 18.0957 35.5069 18.1746 35.2961 18.1942L35.294 18.1944L33.285 18.3752L34.8354 19.7834L34.8373 19.7852C34.9896 19.9245 35.0997 20.1011 35.1595 20.2945C35.2193 20.4878 35.2275 20.6934 35.1838 20.8905C35.1838 20.8906 35.1838 20.8906 35.1837 20.8906L34.7302 22.9354L36.396 21.8832L38.691 18.1944ZM38.691 18.1944L40.7 18.3752M38.691 18.1944L40.7 18.3752M40.7 18.3752L39.1496 19.7834L39.1496 19.7834L39.1477 19.7852C38.9954 19.9245 38.8853 20.1011 38.8255 20.2945C38.7658 20.4878 38.7575 20.6934 38.8013 20.8905C38.8013 20.8906 38.8013 20.8906 38.8013 20.8906L39.2548 22.9354L37.5891 21.8832C37.589 21.8831 37.5889 21.8831 37.5888 21.883C37.4114 21.7708 37.2051 21.7099 36.9925 21.7099C36.7801 21.7099 36.5739 21.7707 36.3966 21.8828L40.7 18.3752Z" stroke="#007E45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> </div>
                        <div className="sc-shipping-text"> 2M+ Happy Customers </div>
                    </div>
                    <div className="sc-desk-shipping-item" style={{ borderLeft: '1px solid #C4E7D2' }}>
                        <div className="sc-shipping-icon"> <svg xmlns="http://www.w3.org/2000/svg" width={56} height={56} viewBox="0 0 49 48" fill="none">
                            <rect x="0.5" width={48} height={48} rx={24} fill="#C4E7D2" />
                            <path d="M29.9294 23.6272L29.332 22.904L29.9236 22.4636L30.9901 22.3092L32.956 22.3569L32.9948 22.5625L32.6003 22.771L32.2894 22.8528C32.2894 22.8528 32.1629 23.0965 32.2894 23.2255C32.3449 23.2822 32.956 23.6865 33.4957 24.1133C34.1964 24.8056 35.1928 24.9957 35.3875 24.3411C35.7347 23.1746 35.4824 22.6081 35.7859 21.8007C36.0458 20.9446 36.0283 19.772 36.6892 19.152C36.8548 18.9966 37.1638 18.6776 37.4243 18.6816C37.5459 18.6834 37.6466 18.4196 37.7358 18.3372C38.0095 18.0844 38.019 17.655 37.7566 17.3905C37.2032 16.8325 35.9549 16.3245 35.2714 16.9146C34.9847 17.1621 34.5784 16.7574 34.3569 16.9895L34.0346 17.3273C33.8521 17.5186 33.6212 17.6143 33.3837 17.7158V17.8746L32.9657 18.2097L32.9191 18.3873L32.3029 18.6799L32.0465 18.6193V18.8385L32.4079 18.9891L32.4608 19.08L32.5318 19.5689L30.1477 19.7723L29.8549 19.6918L29.661 18.6799L29.5485 18.5677L29.1165 18.7401C29.1043 19.2732 29.0459 19.8044 28.971 20.332C28.2635 20.4484 27.8778 20.3962 27.1276 20.1602C26.0236 19.2412 24.9627 19.4303 23.7827 19.0414L23.0874 18.5936L22.0833 18.0595L22.3353 17.213L22.8897 16.6421L22.3254 16.3932L21.2447 15.5056L21.0331 15.6368L20.9535 15.5083L20.8764 14.9419L20.6362 14.3639L21.0803 14.5251L21.6165 14.2019C21.5997 14.015 21.5921 13.8773 21.456 13.5782L21.0816 13.1494C21.0863 12.8759 21.2023 12.7865 21.5363 12.7265L21.6491 12.3835L22.0528 12.0036L22.2583 11.2206C22.0281 10.982 21.773 10.8468 21.4483 10.7776L20.8196 10.9404L20.2108 11.2644L19.7979 11.0637L19.3279 10.9457L19.119 10.5926C18.6336 10.0812 18.4117 9.88385 18.0382 9.63443L17.2573 9.65181L16.7931 9.69641L16.2723 9.90406L15.7329 10.4335L15.6735 10.6202L15.7901 10.8377L16.2945 11.0626L16.7017 11.467L16.9091 11.521L16.9811 11.7083L16.3818 12.2514L16.5085 13.6684L17.1386 13.9852L17.4633 14.2932L17.9259 14.5173L17.7921 14.7715L17.4039 14.8961L17.2415 15.0788L17.2669 15.8033L17.133 15.879L16.6957 16.4278L16.1775 16.9642L15.8921 17.5461L15.4163 18.013L14.6899 18.8332L13.7319 19.0482L13.3127 18.7332L12.5504 19.5447L12.4605 19.7012L12.5252 19.9582L13.0662 20.1202L12.9929 20.7051L13.4864 21.133L13.75 22.0156L13.8006 22.4674L13.6004 22.5742L13.2199 22.4471L12.6824 22.5845L11.6101 22.5032L11.0527 22.7609C11.0527 22.7609 11.3161 24.2597 11.741 24.6003C12.1659 24.9409 12.2308 25.1682 12.3899 25.3845L12.8 25.8861L13.224 26.153L13.8301 26.0413L14.5001 25.7286L14.7162 25.375L14.8349 24.5899C14.8349 24.5899 15.0947 24.5899 15.0367 25.1347L15.2515 25.2491L15.0221 25.6088C15.0221 25.6088 15.4981 26.0413 15.0367 27.0222L15.1057 27.8467L15.4602 29.3761L15.6941 30.6565L16.0003 31.3236L16.4854 32.2192L16.8026 33.4607L17.5397 34.871L18.2409 36.5247L18.668 37.7517C18.876 38.0828 19.0453 38.2192 19.3968 38.3619C19.6898 38.3482 19.8451 38.3712 20.217 38.0765L20.2868 37.6123C20.5769 37.3511 20.7702 37.2941 21.1801 37.2833C21.1801 37.2833 21.1551 37.1145 21.1382 37.0272C21.1085 36.8742 21.2474 36.7382 21.2474 36.7382L21.8037 36.2821L22.2611 36.0665" stroke="#007E45" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M30.5376 27.6512C30.3148 27.3957 30.0503 27.1929 29.7592 27.0546C29.468 26.9163 29.156 26.8451 28.8408 26.8451C28.5257 26.8451 28.2136 26.9163 27.9225 27.0546C27.6313 27.1929 27.3668 27.3957 27.144 27.6512L26.6817 28.1813L26.2193 27.6512C25.7693 27.1353 25.1589 26.8454 24.5225 26.8454C23.8861 26.8454 23.2757 27.1353 22.8257 27.6512C22.3757 28.1672 22.1229 28.8669 22.1229 29.5966C22.1229 30.3263 22.3757 31.0261 22.8257 31.542L23.2881 32.0721L26.6817 35.963L30.0753 32.0721L30.5376 31.542C30.7605 31.2866 30.9373 30.9833 31.058 30.6495C31.1786 30.3157 31.2407 29.9579 31.2407 29.5966C31.2407 29.2353 31.1786 28.8775 31.058 28.5437C30.9373 28.2099 30.7605 27.9066 30.5376 27.6512Z" stroke="#007E45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> </div>
                        <div className="sc-shipping-text"> Proudly Made in India </div>
                    </div>
                    <div className="sc-desk-shipping-item" style={{ borderLeft: '1px solid #C4E7D2' }}>
                        <div className="sc-shipping-icon"> <svg width={56} height={56} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width={56} height={56} rx={28} fill="#C4E7D2" />
                            <path d="M27.3964 20.3011V21.0982C25.0735 23.1521 24.7454 25.0835 25.8856 27.1189M27.3964 20.3011L27.012 19.6467V18.0628H30.0427V19.6467L29.7392 20.3011M27.3964 20.3011H29.7392M25.8856 27.1189V32.5034M25.8856 27.1189H31.1128M25.8856 32.5034C25.5757 32.7229 25.0125 33.5153 25.0125 34.1351C25.0125 34.9099 24.7533 38.1591 26.2642 38.1591H30.8325C32.2425 38.1591 31.9561 35.5935 31.9561 34.1351C31.9561 33.3636 31.1128 32.6584 31.1128 32.6584M25.8856 32.5034L31.1128 32.6584M31.1128 32.6584V27.1189M31.1128 27.1189C32.1321 26.1117 32.5795 23.1941 29.7392 21.0982V20.3011" stroke="#007E45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M41.9414 32.1947C43.2717 27.6404 42.127 22.9505 39.2961 19.5649C37.6726 17.6233 35.4946 16.1107 32.9109 15.2987M15.6724 32.239C14.9496 29.8033 14.8958 27.1384 15.6611 24.5184C17.0097 19.9016 20.5768 16.5364 24.8623 15.2446M38.4714 38.0495C36.9132 39.6012 35.0021 40.7552 32.9138 41.415C30.4165 42.204 27.6659 42.2862 24.9631 41.4967C22.6375 40.8175 20.6296 39.5753 19.0442 37.9619M36.7087 36.2847L40.0525 36.2475L40.0829 39.5328M13.0556 32.4784L16.235 34.203L18.2418 31.0988M33.282 18.1629L31.6998 14.9449L35.0513 13.0893" stroke="#007E45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> </div>
                        <div className="sc-shipping-text"> 3.2M+ Plastic bottles recycled </div>
                    </div>
                    <div className="sc-desk-shipping-item" style={{ borderLeft: '1px solid #C4E7D2' }}>
                        <div className="sc-shipping-icon"> <svg width={57} height={56} viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" width={56} height={56} rx={28} fill="#C4E7D2" />
                            <path d="M20.4243 16.1686C24.4178 16.1686 27.6528 19.3307 27.6528 23.2342V32.7659C27.6528 36.6693 24.4178 39.8314 20.4243 39.8314C19.5482 39.8314 18.6807 39.6628 17.8713 39.3351C17.0619 39.0074 16.3264 38.527 15.7069 37.9215C14.4558 36.6986 13.7529 35.04 13.7529 33.3105V22.6895C13.7529 20.96 14.4558 19.3014 15.7069 18.0785C16.958 16.8556 18.6549 16.1686 20.4243 16.1686Z" stroke="#007E45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M33.7586 39.5081H33.8086V39.4581V38.6113V38.5613H33.7586H31.5001V36.7466H33.6134H33.6634V36.6966V35.8582V35.8082H33.6134H31.5001V34.2521H33.7586H33.8086V34.2021V33.3594V33.3094H33.7586H30.5078H30.4578V33.3594V39.4581V39.5081H30.5078H33.7586ZM37.6129 39.4736L37.6241 39.5081H37.6605H38.4928H38.5287L38.5402 39.4741L40.1779 34.6203C40.1745 34.6864 40.1707 34.7588 40.1665 34.8376L40.1664 34.8383C40.1586 35.033 40.1507 35.2389 40.1429 35.4559L40.1428 35.4565C40.1376 35.6737 40.135 35.8758 40.135 36.0626V39.4581V39.5081H40.185H41.0841H41.1341V39.4581V33.3594V33.3094H41.0841H39.7649H39.729L39.7175 33.3434L38.1087 38.1044L36.5537 33.3439L36.5425 33.3094H36.5062H35.1831H35.1331V33.3594V39.4581V39.5081H35.1831H36.039H36.089V39.4581V36.1126C36.089 35.9062 36.085 35.6901 36.0772 35.4643C36.0693 35.2388 36.0601 35.0271 36.0497 34.8293C36.0457 34.7539 36.0418 34.6845 36.0382 34.6212L37.6129 39.4736ZM42.7294 39.4581V39.5081H42.7794H43.7217H43.7717V39.4581V33.3594V33.3094H43.7217H42.7794H42.7294V33.3594V39.4581Z" fill="#007E45" stroke="#007E45" strokeWidth="0.1" />
                            <path d="M43.0071 17.7618L31.2222 29.2673M33.9139 21.2244C34.4428 21.2244 34.9501 21.019 35.3241 20.6534C35.6981 20.2878 35.9082 19.792 35.9082 19.275C35.9082 18.7579 35.6981 18.2621 35.3241 17.8965C34.9501 17.5309 34.4428 17.3256 33.9139 17.3256C33.3849 17.3256 32.8777 17.5309 32.5036 17.8965C32.1296 18.2621 31.9195 18.7579 31.9195 19.275C31.9195 19.792 32.1296 20.2878 32.5036 20.6534C32.8777 21.019 33.3849 21.2244 33.9139 21.2244ZM40.664 29.2128C41.193 29.2128 41.7003 29.0074 42.0743 28.6418C42.4483 28.2763 42.6584 27.7804 42.6584 27.2634C42.6584 26.7464 42.4483 26.2506 42.0743 25.885C41.7003 25.5194 41.193 25.314 40.664 25.314C40.1351 25.314 39.6278 25.5194 39.2538 25.885C38.8798 26.2506 38.6697 26.7464 38.6697 27.2634C38.6697 27.7804 38.8798 28.2763 39.2538 28.6418C39.6278 29.0074 40.1351 29.2128 40.664 29.2128Z" stroke="#007E45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></div>
                        <div className="sc-shipping-text"> No Cost EMIs via UPI </div>
                    </div>
                </div>
            </section>
            <div class="range-loader1">
                <div class="loader-bar1"></div>
            </div>
            {/* {
                isLoading && (
                    <div className="range-loader">
                        <div className='loader-bar '></div>
                    </div>
                )
            } */}
            <section className="ftco-section ftco-no-pt ftco-no-pb">
                <div className="container-fuild" style={{ backgroundColor: "#f9f6f1" }}>
                    <div className="heading-section text-center pt-4">
                        <h2 className="cool-header">Shop by collection</h2>
                    </div>
                    <div className="row no-gutters ftco-services px-5">
                        {
                            categories && categories.slice(0, 4).map((value, index) => {
                                return (
                                    <div key={index} className="col-sm-12 col-md-6 col-lg-3 ">
                                        <Link to={'/view_categories/' + value.id}>
                                            <div className="media block-6 services p-4 py-md-5">
                                                <img src={value.image} alt="" style={{ width: "100%" }} />
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            <section className=" bg-light px-3">
                <Helmet>
                    <script src="./Website/js/slider.js"></script>
                </Helmet>
                <main className='px-5 '>
                    <div class="heading-and-arrow">
                        <a href="/collections/newest-products"><h3 class="cool-header">New Launches</h3></a>
                        <div class="swiper-button-wrapper">
                            <div class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide" aria-disabled="true" id="prev">
                                <svg class="arrow-svg aish19" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_349_614)"><path class="path-class" d="M14.4391 15.999L21.0391 9.39904L19.1537 7.51371L10.6684 15.999L19.1537 24.4844L21.0391 22.599L14.4391 15.999Z" fill="black"></path></g><defs><clipPath id="clip0_349_614"><rect width="32" height="32" fill="white" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 32 32)"></rect></clipPath></defs></svg>
                            </div>
                            <div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide" aria-disabled="false" id="next">
                                <svg class="arrow-svg aish19" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_319_616)"><path class="path-class" d="M17.5609 15.999L10.9609 9.39904L12.8463 7.51371L21.3316 15.999L12.8463 24.4844L10.9609 22.599L17.5609 15.999Z" fill="black"></path></g><defs><clipPath id="clip0_319_616"><rect width="32" height="32" fill="white" transform="translate(0 32) rotate(-90)"></rect></clipPath> </defs></svg>
                            </div>
                        </div>
                    </div>
                    <div className="slider-wrapper ">
                        <div className="slider-screen ">
                            <div className="slider-container ">
                                {
                                    new_product && new_product.filter((searchProduct) => {
                                        return search === '' ? true : searchProduct.name.toLowerCase().includes(search.toLowerCase())
                                    }).slice(0, 10).map((value) => {
                                        return (
                                            <div className="product d-flex flex-column slides">
                                                <div class="all-tag">
                                                    <div class="tag-content" style={{ background: "linear-gradient(47deg, #007E45 -1.87%, #6DC794 101.87%)" }}>New</div>
                                                </div>
                                                <Link to={"/single_product/" + value.id} className="img-prod" style={{ height: "520px" }}>
                                                    <img className="img-fluid" src={MainImage[value.id] || value.image} alt="Colorlib Template" />
                                                </Link>
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
                                                    <div className="pricing">
                                                        <h4 className='text-start' style={{ fontSize: "16px" }}><b>{value.name}</b></h4>
                                                        <p className="price"><span className="price-sale"><b>Rs. {value.price}</b></span><span className="ml-2 price-dc" style={{ fontSize: "13px" }}>RS.{value.pro_price}</span><span className="ml-1" style={{ color: "green", fontSize: "13px" }}><b className='ml-1'>{value.discount}% OFF</b></span></p>
                                                    </div>
                                                    <div className="d-flex justify-content-center align-items-center mt-2" >
                                                        <button type='button' className='Btn-1' style={{ width: "310px", height: "50px" }} onClick={() => { openModal(value.id) }}><a href="#" className="text-light d-flex" style={{ fontSize: "17px" }}>
                                                            <div className="d-flex justify-content-center align-items-center " >
                                                                <svg className="pdp-cart-svg" width={25} height={25} style={{ marginRight: 16, display: 'block' }} viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clipPath="url(#clip0_435_19167)">
                                                                        <path style={{ transition: 'stroke .45s ease' }} className="svg-path" d="M9.22168 22C9.78629 22 10.2217 21.5646 10.2217 21C10.2217 20.4354 9.78629 20 9.22168 20C8.65707 20 8.22168 20.4354 8.22168 21C8.22168 21.5646 8.65707 22 9.22168 22Z" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path style={{ transition: 'stroke .45s ease' }} className="svg-path" d="M20.2217 22C20.7863 22 21.2217 21.5646 21.2217 21C21.2217 20.4354 20.7863 20 20.2217 20C19.6571 20 19.2217 20.4354 19.2217 21C19.2217 21.5646 19.6571 22 20.2217 22Z" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path style={{ transition: 'stroke .45s ease' }} className="svg-path" d="M1.22168 1H5.22168L7.22168 13.9999C7.31516 14.4706 7.84788 14.699 8.22168 14.9999C8.59548 15.3008 8.74191 16.0091 9.22168 15.9999H19.2217C19.7015 16.0091 20.8479 15.3008 21.2217 14.9999C21.5955 14.699 21.1282 14.4706 21.2217 13.9999L23.2217 5.99997H6.22168" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_435_19167">
                                                                            <rect width={25} height={25} fill="white" transform="translate(0.22168)" />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            </div>
                                                            ADD TO CART</a></button>
                                                    </div>
                                                    <p className="bottom-area d-flex justify-content-around px-3 bg-light">
                                                        {['image', 'image1', 'image2'].map((imgkey, index) => (
                                                            <a href="#" key={index} onClick={(e) => { e.preventDefault(); HandelImagesChange(value.id, value[imgkey]) }} className="bg-light d-flex align-items-center border rounded" style={{ height: "60px", width: "70px" }}>
                                                                <img className="img-fluid " style={{ height: "50px" }} src={value[imgkey]} alt="Colorlib Template" />
                                                            </a>
                                                        ))}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-4" >
                        <button className='Btn-1' onClick={() => redirect('/shop')} style={{ width: "220px", height: "50px" }}><Link className="text-light" style={{ fontSize: "17px" }}> VIEW ALL PRODUCTS<svg className='ml-2' style={{ marginTop: "-4px" }} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 4.5L16.5 12L9 19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg></Link></button>
                    </div>
                </main>
            </section>
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
            <section className="ftco-section ftco-no-pt ftco-no-pb">
                <div className="container-fuild py-5" style={{ backgroundColor: "#f9f6f1" }}>
                    <div className="heading-section text-center">
                        <h2 className="mt-2 cool-header">Explore our categories</h2>
                    </div>
                    <div className="row no-gutters ftco-services px-5 ">
                        {
                            categories && categories.slice(4, 12).map((value, index) => {
                                return (
                                    <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                                        <Link to={'/view_categories/' + value.id}>
                                            <div className="media block-6 services p-4">
                                                <img src={value.image} alt="" style={{ width: "100%" }} />
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="d-flex justify-content-center align-items-center py-5" >
                        <button className='Btn-1' onClick={() => redirect('/shop')} style={{ width: "220px", height: "50px" }}><a href="#" className="text-light" style={{ fontSize: "17px" }}> VIEW ALL PRODUCTS<svg className='ml-2' style={{ marginTop: "-4px" }} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 4.5L16.5 12L9 19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg></a></button>
                    </div>
                    <section id="" className="mt-3" >
                        <div className="heading-section text-center">
                            <img type="image" style={{ width: "100%" }} class="ban-image " src="//neemans.com/cdn/shop/files/Offer_Heading_Desktop_a0c2e60b-dbab-4088-834d-40e9d7ce2ddf.jpg?v=1720181852&amp;width=1920" alt="" />
                        </div>
                        <div className="home-slider owl-carousel" style={{ backgroundColor: "transparent", height: "400px", }}>
                            <div className="slider-item js-fullheight" >
                                <div className="container-fluid p-0">
                                    <img className="one-third order-md-last img-fluid" src="https://neemans.com/cdn/shop/files/Offers_desktop_01_x1360.jpg?v=1720180265" alt />
                                </div>
                            </div>
                            <div className="slider-item js-fullheight">
                                <div className="container-fluid p-0">
                                    <img className="one-third order-md-last img-fluid" src="https://neemans.com/cdn/shop/files/Offers_desktop_02_x1360.jpg?v=1720180266" alt />
                                </div>
                            </div>
                            <div className="slider-item js-fullheight">
                                <div className="container-fluid p-0">
                                    <img className="one-third order-md-last img-fluid" src="https://neemans.com/cdn/shop/files/Offers_desktop_03_x1360.jpg?v=1720180265" alt />
                                </div>
                            </div>
                            <div className="slider-item js-fullheight">
                                <div className="container-fluid p-0">
                                    <img className="one-third order-md-last img-fluid" src="https://neemans.com/cdn/shop/files/Offers_desktop_04_x1360.jpg?v=1720180267" alt />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <section className="ftco-section ftco-deal px-5 " >
                <div className='px-4'>
                    <div className="py-3" style={{ backgroundColor: "#e3e6f1" }}>
                        <div className="row">
                            <div className="col-md-6" >
                                <img src="Website/images/BWCruise-Black.png" className="img-fluid" alt />
                            </div>
                            <div className="col-md-6">
                                <div className="heading-section heading-section">
                                    <span className="subheading">Deal of the month</span>
                                    <h2 className="mb-3">Deal of the month</h2>
                                </div>
                                <div id="timer" className="d-flex mb-4 ">
                                    <div className="time text-info" id="days" />
                                    <div className="time text-info pl-4" id="hours" />
                                    <div className="time text-info pl-4" id="minutes" />
                                    <div className="time text-info pl-4" id="seconds" />
                                </div>
                                <div className="text-deal">
                                    <h2><a href="#">BEGIN WALK - CRUISE</a></h2>
                                    <p className="price"><span className="price-sale text-body">₹4,299</span> <span className="mr-2 price-dc text-dark" style={{ fontSize: "16px" }}>₹6,999</span></p>
                                    <ul className="thumb-deal d-flex mt-4">
                                        <li className="img" style={{ backgroundImage: 'url(Website/images/BWCruise-Teal.png)' }} />
                                        <li className="img" style={{ backgroundImage: 'url(Website/images/BWCruise-Blue.png)' }} />
                                        <li className="img" style={{ backgroundImage: 'url(Website/images/BWCruise-Grey.png)' }} />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className=" bg-light px-3">
                <Helmet>
                    <script src="./Website/js/slider.js"></script>
                </Helmet>
                <main className='px-5 '>
                    <div class="heading-and-arrow">
                        <a href="/collections/newest-products"><h3 class="cool-header"> Best sellers</h3></a>
                        <div class="swiper-button-wrapper">
                            <div class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide" aria-disabled="true" id="prev_secound">
                                <svg class="arrow-svg aish19" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_349_614)"><path class="path-class" d="M14.4391 15.999L21.0391 9.39904L19.1537 7.51371L10.6684 15.999L19.1537 24.4844L21.0391 22.599L14.4391 15.999Z" fill="black"></path></g><defs><clipPath id="clip0_349_614"><rect width="32" height="32" fill="white" transform="matrix(-1.31134e-07 -1 -1 1.31134e-07 32 32)"></rect></clipPath></defs></svg>
                            </div>
                            <div class="swiper-button-next " tabindex="0" role="button" aria-label="Next slide" aria-disabled="false" id="next_secound">
                                <svg class="arrow-svg aish19" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_319_616)"><path class="path-class" d="M17.5609 15.999L10.9609 9.39904L12.8463 7.51371L21.3316 15.999L12.8463 24.4844L10.9609 22.599L17.5609 15.999Z" fill="black"></path></g><defs><clipPath id="clip0_319_616"><rect width="32" height="32" fill="white" transform="translate(0 32) rotate(-90)"></rect></clipPath> </defs></svg>
                            </div>
                        </div>
                    </div>
                    <div className="slider-wrapper ">
                        <div className="slider-screen ">
                            <div className="slider-container_secound">
                                {
                                    new_product && new_product.filter((searchProduct) => {
                                        return search === '' ? true : searchProduct.name.toLowerCase().includes(search.toLowerCase())
                                    }).slice(10, 19).map((value) => {
                                        return (
                                            <div className="product d-flex flex-column slides">
                                                <div class="all-tag">
                                                    <div class="tag-content" style={{ background: "linear-gradient(45deg, #364ECA 0%, #45A1E4 100%)" }}>Best seller</div>
                                                </div>
                                                <a href="#" className="img-prod" style={{ height: "520px" }}>
                                                    <img className="img-fluid" src={MainImage[value.id] || value.image} alt="Colorlib Template" />
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
                                                    <div className="pricing">
                                                        <h4 className='text-start' style={{ fontSize: "16px" }}><b>{value.name}</b></h4>
                                                        <p className="price"><span className="price-sale"><b>Rs. {value.price}</b></span><span className="ml-1 price-dc" style={{ fontSize: "13px" }}>RS.{value.pro_price}</span><span className="ml-1" style={{ color: "green", fontSize: "13px" }}><b>{value.discount}% OFF</b></span></p>
                                                    </div>
                                                    <div className="d-flex justify-content-center align-items-center mt-2" >
                                                        <button type='button' className='Btn-1' style={{ width: "310px", height: "50px" }} onClick={() => { openModal(value.id) }}><a href="#" className="text-light d-flex" style={{ fontSize: "17px" }}>
                                                            <div className="d-flex justify-content-center align-items-center " >
                                                                <svg className="pdp-cart-svg" width={25} height={25} style={{ marginRight: 16, display: 'block' }} viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clipPath="url(#clip0_435_19167)">
                                                                        <path style={{ transition: 'stroke .45s ease' }} className="svg-path" d="M9.22168 22C9.78629 22 10.2217 21.5646 10.2217 21C10.2217 20.4354 9.78629 20 9.22168 20C8.65707 20 8.22168 20.4354 8.22168 21C8.22168 21.5646 8.65707 22 9.22168 22Z" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path style={{ transition: 'stroke .45s ease' }} className="svg-path" d="M20.2217 22C20.7863 22 21.2217 21.5646 21.2217 21C21.2217 20.4354 20.7863 20 20.2217 20C19.6571 20 19.2217 20.4354 19.2217 21C19.2217 21.5646 19.6571 22 20.2217 22Z" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path style={{ transition: 'stroke .45s ease' }} className="svg-path" d="M1.22168 1H5.22168L7.22168 13.9999C7.31516 14.4706 7.84788 14.699 8.22168 14.9999C8.59548 15.3008 8.74191 16.0091 9.22168 15.9999H19.2217C19.7015 16.0091 20.8479 15.3008 21.2217 14.9999C21.5955 14.699 21.1282 14.4706 21.2217 13.9999L23.2217 5.99997H6.22168" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_435_19167">
                                                                            <rect width={25} height={25} fill="white" transform="translate(0.22168)" />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            </div>
                                                            ADD TO CART</a></button>
                                                    </div>
                                                    <p className="bottom-area d-flex justify-content-around px-3 bg-light">
                                                        {['image', 'image1', 'image2'].map((imgkey, index) => (
                                                            <a href="#" key={index} className="bg-light d-flex align-items-center border rounded" onClick={(e) => { e.preventDefault(); HandelImagesChange(value.id, value[imgkey]) }} style={{ height: "60px", width: "70px" }}>
                                                                <img className="img-fluid " style={{ height: "50px" }} src={value[imgkey]} alt="Colorlib Template" />
                                                            </a>
                                                        ))}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-4" >
                        <button className='Btn-1' onClick={() => redirect('/shop')} style={{ width: "220px", height: "50px" }}><Link className="text-light" style={{ fontSize: "17px" }}> VIEW ALL PRODUCTS<svg className='ml-2' style={{ marginTop: "-4px" }} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 4.5L16.5 12L9 19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg></Link></button>
                    </div>
                </main>
            </section>
            <section className="px-3" >
                <div className="row">
                    <div className="col-md-12" >
                        <img src="https://neemans.com/cdn/shop/files/Offline_store.jpg?v=1712241901&width=1520" className="img-fluid" alt />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <img src="https://neemans.com/cdn/shop/files/Bulk_enquires_desktop_9efa04f3-7756-4e75-a8a1-d76c7d4615ec.jpg?v=1712241901&width=1520" className="img-fluid" alt />
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
                            <a href="https://neemans.com/cdn/shop/files/ND_-_Urban_Casuals_-_Fusion_Black_-_Web_Optimized_g_75e78e03-8ff6-4fb5-8b6a-f0b23ab378cc_800x.jpg?v=1722068705" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: 'url(https://neemans.com/cdn/shop/files/ND_-_Urban_Casuals_-_Fusion_Black_-_Web_Optimized_g_75e78e03-8ff6-4fb5-8b6a-f0b23ab378cc_800x.jpg?v=1722068705)' }}>
                                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                    <span className="icon-instagram" />
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 col-lg-2 ftco-animate">
                            <a href="https://neemans.com/cdn/shop/products/ND-SoleMaxSlipOn-UltraGrey-_WebOptimized_g_800x.jpg?v=1692035751" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: 'url(https://neemans.com/cdn/shop/products/ND-SoleMaxSlipOn-UltraGrey-_WebOptimized_g_402x.jpg?v=1692035751)' }}>
                                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                    <span className="icon-instagram" />
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 col-lg-2 ftco-animate">
                            <a href="https://neemans.com/cdn/shop/files/Hipster-_Section_2.jpg?v=1705410484" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: 'url(https://neemans.com/cdn/shop/files/Hipster-_Section_2.jpg?v=1705410484)' }}>
                                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                    <span className="icon-instagram" />
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 col-lg-2 ftco-animate">
                            <a href="https://neemans.com/cdn/shop/files/BSW_-_Section_3.jpg?v=1713601171" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: 'url(https://neemans.com/cdn/shop/files/BSW_-_Section_2.jpg?v=1713601172)' }}>
                                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                    <span className="icon-instagram" />
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 col-lg-2 ftco-animate">
                            <a href="https://neemans.com/cdn/shop/products/ND-SpolightSlipOn-HaleBlack-RedSole-_WebOptimized_g_800x.jpg?v=1691045215" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: 'url(https://neemans.com/cdn/shop/products/ND-SpolightSlipOn-HaleBlack-RedSole-_WebOptimized_g_800x.jpg?v=1691045215)' }}>
                                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                    <span className="icon-instagram" />
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 col-lg-2 ftco-animate">
                            <a href="https://neemans.com/cdn/shop/products/Neemans-CottonClassicSneaker-CoralRed-Model-ComfortableShoes-IvoryCream_800x.jpg?v=1690983187" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: 'url(https://neemans.com/cdn/shop/products/Neemans-CottonClassicSneaker-CoralRed-Model-ComfortableShoes-IvoryCream_800x.jpg?v=1690983187)' }}>
                                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                    <span className="icon-instagram" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* <Helmet>
                    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
                </Helmet> */}
            <OffCanvas isOffcanvasOpen={isOffcanvasOpen} setIsOffcanvasOpen={setIsOffcanvasOpen} />
            <Footer />
        </div>
    )
}

export default Home