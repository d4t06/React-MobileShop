import * as request from '../utils/request'


export const searchService = async (query) => {
   // phai xu li sort
   const {sort, ...rest} = query

    try {
        const response = await request.get(`products/search`, {
           params: {
            ...rest,
            ...sort
           }
        });
        console.log("response searchService = ", response)
        return response;
     } catch (error) {
        console.log("có lỗi trong quá trình lấy dữ liệu", error);
     }
}

export default searchService