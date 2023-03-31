import axios from "axios";

const request = axios.create({
   baseURL: "http://localhost:3000/api",
});

export const getProducts = async (querys) => {
   // console.log("service querys", querys)
   const {filters, sort, ...rest} = querys
   
   if (!querys) {
      console.log("product service missing query");
      return []
   }
   try {
      const response = await request.get(`/products`, {
         params: {
            ...rest,
            ...filters, //brand='samsung,iphone'
            ...sort //column=cur_price&type=asc
         }
      })
      return response.data
   } catch (error) {
      console.log("loi getProducts services", error);
   }
};
export const getProductDetail = async (querys) => {
   if (!querys) {
      console.log("product service missing query");
   }
   const {category, href} = querys
   try {
      const response = await request.get(`/products/${category}/${href}`, {
         params: {
         }
      })
      return response.data
   } catch (error) {
      console.log("loi getProductDetail services", error);
   }
};

export const buyProduct = async (data) => {
   if (!data) {
      console.log("data missing !");
      return
   }
   try {
      request.post('/products', {
         body: {
            ...data
         }
      })
   } catch (error) {
      console.log('buy product fail, ', error)
   }
}
