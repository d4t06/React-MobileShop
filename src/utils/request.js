import axios from "axios";

const request = axios.create({
   baseURL: "http://localhost:3000/api",
   withCredentials: true,
});

// export const get = async (path, option) => {
//    try {
//       const res = await request.get(path, option);
//       return res.data;

//    } catch (error) {
//       console.log(error)
//    } 
// };

// export const post = async (path, body, header) => {
//    try {
//       const res = await request.post(path, body, header);
//       return res.data;

//    } catch (error) {
//       console.log(error);
//    }
// };

export default request;
