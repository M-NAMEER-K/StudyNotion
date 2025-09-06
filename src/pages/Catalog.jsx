

import React,{useState,useEffect} from 'react'
import Footer from "../components/common/Footer"
import {useParams} from "react-router-dom"
import {apiConnector} from "../services/apiConnector"
import {categories} from "../services/apis"
import CourseSlider from "../components/core/Dashboard/Catalog/CourseSlider"
import Course_Card from "../components/core/Dashboard/Catalog/Course_Card"
import {useSelector} from "react-redux"
import getCatalogPageData  from "../services/operations/pageAndComponent"
/*
const Catalog=()=>{

        const {catalogName}=useParams();
        const [catalogPageData,setCatalogPageData]=useState(null);
        const [categoryId,setCategoryId]=useState("");   

        //fetch all categories

        useEffect(()=>{
            const getCategories=async()=>{
                const res=await apiConnector("GET",categories.CATEGORIES_API);
                const category_id=res?.data?.data?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()===catalogName)[0]._id;
                  
                setCategoryId(category_id);

            }
    
            getCategories();
        },[catalogName]);

          useEffect(()=>{
                 const getCategoryDetails=async()=>{
                    try{
                         const res=await getCatalogPageData(categoryId);
                         console.log("catalog",catalogPageData);
                         console.log(res);
                         setCatalogPageData(res);
                    }
                    catch(err){
                        console.log(err);
                    }
                }
                    if(categoryId) {
            getCategoryDetails();
        }
          },[categoryId]);
             
      return(
        <div className="w-full">
               <div>
               <p>{`Home/Catalog/`} <span>{catalogPageData?.data?.selectedCategory?.name}</span></p>
               <p>{catalogPageData?.data?.selectedCategory?.name}</p>
               <p>{catalogPageData?.data?.selectedCategory?.description}</p>
            </div>

            <div>
                  <div>Courses to get you started</div>
                <div>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                <CourseSlider Courses={ catalogPageData?.data?.selectedCategory?.courses }/>
            </div>
            <div>
                 <div>Top Courses in {catalogPageData?.data?.selectedCategory?.courses}</div>
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses }/>
                </div>
            </div>

                <div>
                    <div>Frequently Bought together</div>
                      <div className="py-8">
                         <div className="grid grid-cols-1 lg:grid-cols-2">
                            {
                                catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,index)=>(
                                    <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                                ))
                            }
                         </div>
                      </div>
                </div>
            <Footer/>
        </div>
      )
}

export default Catalog;*/



const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }
    
      return (
        <>
          {/* Hero Section */}
          <div className=" w-full p-2">
            <div className="w-full p-2 ">
              <p className="text-sm text-gray-300">
                {`Home / Catalog / `}
                <span className="text-yellow-500">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-white">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-gray-300">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" w-full">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-gray-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-500 text-yellow-500"
                    : "text-gray-500"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-500 text-yellow-500"
                    : "text-gray-500"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.Course}
              />
            </div>
          </div>
          {/* Section 2 */}
          <div className=" w-full my-3">
            <div className="text-xl">
             
              Top courses in {catalogPageData?.data?.differentCategories?.name}
            </div>
            <div className="py-8">
             <CourseSlider
  Courses={
    Array.isArray(catalogPageData?.data?.differentCategories)
      ? catalogPageData.data.differentCategories.flatMap(
          (cat) => cat.Course || []
        )
      : []
  }
/>
            </div>
          </div>
    
          {/* Section 3 */}
          <div className=" w-full p-2">
            <div className="text-xl">Frequently Bought</div>
            <div className="py-8">
              <div className="flex">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[300px]"} />
                  ))}
              </div>
            </div>
          </div>
    
          <Footer />
        </>
      )
    }
    
    export default Catalog