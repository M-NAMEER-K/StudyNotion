import { useState } from 'react'
import {Routes,Route} from "react-router-dom"
import './App.css'
import Navbar from "./components/common/Navbar"
import Home from "./pages/Home"
import OpenRoute from "./components/core/Auth/OpenRoute"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail"
import About from "./pages/About"
import MyProfile from "./pages/MyProfile"
import Dashboard from "./pages/Dashboard"
import Settings from "./components/core/Dashboard/Settings";
import Error from "./pages/Error"
import { ACCOUNT_TYPE } from "./utils/constants";
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import {useSelector} from "react-redux"
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourse from "./components/core/Dashboard/MyCourses"
import AddCategory from "./components/core/Dashboard/AddCourse/AddCategory"
/*import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";*/
import Cart from "./components/core/Dashboard/Cart";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import EditCourse from "./components/core/Dashboard/EditCourse"
import Catalog from "./pages/Catalog"
import CourseDetails from "./pages/CourseDetails"
import ViewCourse from "./pages/ViewCourse"
import Contact from "./pages/Contact"
import VideoDetails from "./components/core/ViewCourse/VideoDetails"
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor"

function App() {
  
const { user } = useSelector((state) => state.profile)

  return (
     <div className="min-h-screen w-screen bg-gray-800 text-white">
      <Navbar/>
        <Routes>
         
            <Route path="/" element={<Home/>}/>
            <Route path="/catalog/:catalogName" element={<Catalog/>}/>
            <Route path="/courses/:courseId" element={<CourseDetails/>} />
             <Route path="/signup" element={<OpenRoute> <Signup/></OpenRoute>}/>
             <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
             <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>} />
              <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>} />
              <Route path="/update-password/:token" element={<OpenRoute><UpdatePassword/></OpenRoute>} />
               <Route path="/about" element={<About/>} />
               <Route path="/contact" element={<Contact />} />
               <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
                <Route path="/dashboard/my-profile"  element={<MyProfile/>}/>
                 <Route path="/dashboard/settings"  element={<Settings/>}/>
                 
                 {user?.accountType===ACCOUNT_TYPE.STUDENT && (
                  <>
                    <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
                   <Route path="/dashboard/cart" element={<Cart/>}/>
                  </>
                 )}
                 {
                     user?.accountType===ACCOUNT_TYPE.ADMIN && (
                    <>
                      <Route path="/dashboard/createCategory" element={<AddCategory/>}/>
                    </>
                     )


                 }

                 {
                      user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
                        <>
                           <Route path="dashboard/instructor" element={<Instructor/>}></Route>
                         <Route path="/dashboard/add-course" element={<AddCourse/>} />
                         <Route path="/dashboard/my-courses" element={<MyCourse/>} />
                       
                          <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>} />
                        </>
                      )
               }
                </Route>
              
               <Route path="*" element={<Error/>} />
                <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
             <Route
  path="/dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
  element={<VideoDetails />}
/>
            </>
          )}
        </Route>
        </Routes>
     </div>
  )
}

export default App
