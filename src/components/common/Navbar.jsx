import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import {useLocation,matchPath} from "react-router-dom"
import {useSelector} from "react-redux"
import { IoIosArrowDown } from "react-icons/io";
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from "../core/Auth/ProfileDropDown"
import {apiConnector} from "../../services/apiConnector"
import {categories} from "../../services/apis"
 

const Navbar=()=>{

        const {token}=useSelector((state)=>state.auth);
         const {user}=useSelector((state)=>state.profile);
         const {totalItems}=useSelector((state)=>state.cart);
      
         const [subLinks,setSubLinks]=useState([]);

    const fetchSubLinks=async ()=>{
                    try{
                    const result=await apiConnector("GET",categories.CATEGORIES_API)
                          console.log(result.data.data);
                    setSubLinks(result.data.data);
                    }
                    catch(err){
                        console.log("could not fetch category list: ",err);
                    }
                }  

         useEffect(()=>{
                fetchSubLinks()
         },[])

     const location=useLocation();

         const matchRoute=(route)=>{
      return matchPath({path:route},location.pathname);
}
   return(
    <div className="w-full flex border-b-[1px] border-b-gray-600 bg-gray-900 p-4   mb-8">
        <Link to="/"> <img src={Logo} alt="" /></Link>
        
        
            <ul className=" w-[50%] flex items-center justify-evenly">
                {
                    NavbarLinks.map( (link,index)=>{
                        return  <li key={index}>
                             {
                                link.title==="Catalog"?(<div className=" relative w-full flex justify-center items-center gap-x-1 group">
                                     <p className="text-gray-400">{link.title}</p><IoIosArrowDown />
                                       
                                     <div className=" invisible opcaity-0 transition-all duration:200 group-hover:visible group-hover:opcaity-100 absolute top-[70px]  w-[300px] p-4 bg-white rounded-lg">
                                                       <div className="absolute bg-white p-4 w-[30px] -top-[15px] left-[160px] rotate-45"></div>
                                                        
                                                        {            

                                                           subLinks.length>0 ?(subLinks.map((subLink,index)=>(
                                                                <Link  to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index}>
                                                                    <p className="text-black hover:bg-gray-400">{subLink.name}</p>
                                                                </Link>
                                                            ))):(<div>No Course Found </div>)
                                                        }
                                    </div> 

                                </div>):(
                                    <Link to={link?.path}> <p className={` ${matchRoute(link?.path)?"text-yellow-500":"text-gray-400"}`}>{link.title}</p></Link>
                                )
                             }
                          </li>
                    })
                }
            </ul>

            {/* login,signup dashboard */}
            <div className="w-[30%] flex justify-end gap-x-4  items-center">
                
                  {
                    user && user?.accountType!="Instructor" && (
                        <Link to="/dashboard/cart" className="relative flex items-center gap-x-2">
                            <AiOutlineShoppingCart/>
                            {
                                totalItems > 0 && (
                                    <span>{totalItems}</span>
                                )
                            }
                        </Link>
                    )
                  }
                  {
                    token===null && (
                        <Link to="/login">
                            <button className="border bg-gray-800 text-gray-400 rounded-lg p-2 mr-2">Log in</button>
                        </Link>
                    )
                  }
                  {
                    token===null && (
                        <Link to="/signup">
                          <button className="border bg-gray-800 text-gray-400 rounded-lg p-2">Sign Up</button>
                        </Link>
                    )
                  }{
                    token!==null && <ProfileDropDown/>
                  }
            </div>
        
    </div>
   )
}


export default Navbar;