import axios from "axios";
import { BASE_URL } from "../../../../utils/baseURL";

const ImageUploader = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      // Endpoint URL of your server where the file will be uploaded to DigitalOcean Spaces
      `${BASE_URL}/imageUpload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const imageUrl = response?.data?.data?.Location;
    return [imageUrl, response?.data?.success];
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export default ImageUploader;



// import axios from "axios";

// const CLOUDINARY_PRESET = "ml_default";
// const CLOUDINARY_CLOUDENAME = "dykzl2grb";

// const ImageUploader = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", CLOUDINARY_PRESET);

//   try {
//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDENAME}/image/upload`,
//       formData
//     );
//     const publicId = response?.data?.public_id;

//     const imageUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUDENAME}/image/upload/f_webp/${publicId}`;
//     // const thumbnailUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUDENAME}/image/upload/c_fill,h_150,w_150,f_webp/${publicId}`;

//     // console.log(response?.);

//     // return [imageUrl, thumbnailUrl];
//     return [imageUrl, response?.statusText];
//   } catch (error) {
//     console.error("Error uploading image:", error);

//     if (error.response) {
//       console.error("Error response:", error.response.data);
//     }
//     throw error; // Rethrow the error to handle it further up the call stack
//   }
// };

// export default ImageUploader;

