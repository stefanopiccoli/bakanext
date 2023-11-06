import Axios from "axios";

export const uploadImage = async (formData: FormData) => {
  try {
    const res = await Axios.post(
      "https://api.cloudinary.com/v1_1/dqsepq604/image/upload",
      formData
    );

    if (res.data.secure_url) return res;
    else throw "secure_url not returned!";
  } catch (e) {
    throw "Error while uploading the image! "+e;
  }
};
