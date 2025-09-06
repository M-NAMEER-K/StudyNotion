import React from "react"
import * as Icons from "react-icons/vsc"
import {useDispatch} from "react-redux"
import {useLocation,matchPath,NavLink} from "react-router-dom"


const SidebarLink=({link , iconName})=>{

         const Icon = Icons[iconName] || (() => <span />) // fallback
        const location=useLocation();
        const dispatch=useDispatch();

      const matchRoute = (route) => matchPath({ path: route }, location.pathname);




    return(    
              <NavLink to={link.path} className={ `    ${matchRoute(link.path)?"bg-yellow-800":"bg-opacity-0"}
               relative px-8 py-2 text-sm font-medium w-full`} >
                    
                <span className={`absolute  left-0 top-0 h-full bg-yellow-500 ${matchRoute(link.path)?"opacity-100":"opacity-0"}`}></span>
                <div className="flex justify-start item-center gap-x-2">
                    <Icon className="text-lg"/>
                    <span>{link.name}</span>
                </div>
                 </NavLink>
    
    )
}

export default SidebarLink;