import React from "react"


const StatsComponent=()=>{
             
    const Stats=[
        {count:"5K" , label:"Active Students"},
        {count:"10+" , label:"Mentors"},
        {count:"200+" , label:"Courses"},
        {count:"50+" , label:"Awards"},
    ]

    return (
        <div className="w-full flex justify-evenly bg-gray-500 p-4 mt-4">
                  {
                    Stats.map((data,index)=>{
                         return(
                            <div key={index}>
                                  <h1 className="text-2xl">{data.count}</h1>
                                  <h2 className="text-gray-300">{data.label}</h2>
                            </div>
                         )
                    })
                  }
        </div>
    )
}

export default StatsComponent;