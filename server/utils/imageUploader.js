const cloudinary = require("cloudinary").v2;

// ------------------ IMAGE UPLOAD ------------------
exports.uploadImageToCloudinary = async (file, folder, height, width, quality) => {
  try {
    const options = { folder, resource_type: "image" };

    if (height) options.height = height;
    if (width) options.width = width;
    if (quality) options.quality = quality;

    // crop fill so it maintains aspect ratio while forcing dimensions
    if (height || width) {
      options.crop = "fill";
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    console.error("Cloudinary Image Upload Error:", error);
    throw error;
  }
};

// ------------------ VIDEO UPLOAD ------------------
exports.uploadVideoToCloudinary = async (file, folder) => {
  try {
    const options = {
      folder,
      resource_type: "video",  // ensures video upload
    };

    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    console.error("Cloudinary Video Upload Error:", error);
    throw error;
  }
};