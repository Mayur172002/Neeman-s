import { BrowserRouter, Route, Routes } from "react-router-dom";
import './Feature/Website/Style.css'
import Home from './Feature/Website/Home.jsx'
import Shop from "./Feature/Website/Shop.jsx";
import About from "./Feature/Website/About.jsx";
import Blog from "./Feature/Website/Blog.jsx";
import Contact from "./Feature/Website/Contact.jsx";
import Single_Product from "./Feature/Website/Single_Product.jsx";
import Checkout from "./Feature/Website/Checkout.jsx";
import Login from "./Feature/Website/Login.jsx";
import SignUp from "./Feature/Website/SignUp.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./Feature/Website/Profile.jsx";
import Dashboard from "./Feature/Admin/Dashboard.jsx";
import Admin_Login from "./Feature/Admin/Admin_Login.jsx";
import Admin_SignUp from "./Feature/Admin/Admin_SignUp.jsx";
import Categories from "./Feature/Admin/Categories.jsx";
import Product from './Feature/Admin/Product.jsx'
import Add_Product from './Feature/Admin/Add_Product.jsx';
import Add_Categories from './Feature/Admin/Add_Categories.jsx'
import Add_Blog from "./Feature/Admin/Add_Blog.jsx";
import Blog_manage from "./Feature/Admin/Blog_manage.jsx";
import View_Cate from "./Feature/Website/View_Cate.jsx";
import A from "./Feature/Admin/A.jsx";
import OffCanvas from "./Feature/Website/OffCanvas.jsx";

function App() {
  
  return (
    <div>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/single_product/:id" element={<Single_Product/>}/>
          <Route path="/checkout/:user_Id" element={<Checkout/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/view_categories/:categories_ID" element={<View_Cate/>}/>
          <Route path="/ab" element={<OffCanvas/>}/>

          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/admin_login" element={<Admin_Login/>}/>
          <Route path="/admin_singup" element={<Admin_SignUp/>}/>
          <Route path="/manage_cate" element={<Categories/>}/>
          <Route path="/manage_product" element={<Product/>}/>
          <Route path="/add_product" element={<Add_Product/>}/>
          <Route path="/add_cate" element={<Add_Categories/>}/>
          <Route path="/manage_blog" element={<Blog_manage/>}/>
          <Route path="/add_blog" element={<Add_Blog/>}/>
          <Route path="/a" element={<A/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
