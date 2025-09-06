const Category=require("../models/Category");

//create Tag Handler function

exports.createCategory=async (req,res) =>{
    try{
          //fetch data
          const {name,description}=req.body;
          //validation 
          if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
          }

          //create entry in DB
          const categoryDetails = await Category.create({name:name,description:description});
          console.log(categoryDetails);
                      
          return res.status(200).json({
            success:true,
            message:"Tag created successfully"
          });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

//getAllTags handler function
 exports.showAllCategories=async (req,res)=>{
    try{
            const allTags=await Category.find({},{name:true,description:true});
            return res.status(200).json({
                success:true,
                message:"All tags returned successfully",
                data:allTags,
                allTags
            });
    }
    catch(err){
          return res.status(500).json({
            success:false,
            message:err.message
          });
    }
 }

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "Course",
        match: { status: "Published" },
        populate: [{ path: "instructor" }, { path: "ratingAndReviews" }]
      })
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    const differentCategories = await Category.find({
      _id: { $ne: categoryId }
    })
      .populate("Course")
      .exec();

    const allCategories = await Category.find()
      .populate({
        path: "Course",
        match: { status: "Published" },
        populate: [{ path: "instructor" }, { path: "ratingAndReviews" }]
      })
      .exec();
        console.log("allCourses" ,allCategories);
    const allCourses = allCategories.flatMap((cat) => cat.Course);
    console.log("allCourses" ,allCourses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      message: "Category page details fetched successfully",
      data: {
        selectedCategory,
        differentCategories,
        mostSellingCourses,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Category Page error",
      err:err.message
    });
  }
};



