import * as productServices from '../services/productServices';
import searchService from '../services/searchService';

import { storeProduct } from './productsSlice';

const getAll = async (dispatch, query) => {
   try {
      const response = await productServices.getProducts(query);
      if (response) {
         dispatch(storeProduct({
            products: response,
            ...query,
         }));
         // setTimeout(async () => {
         // }, 500);
      } else {
         console.log('action getProduct response undefine');
      }
   } catch (error) {
      console.log('loi trong action', error);
   }
};

const getSearchPage = async (dispatch, query) => {

   // console.log("getSearchPage query = ", query);

   try {
      const key = query.category.split('search=')[1]; //search=iphone 14
      const response = await searchService({ q: key, page: query.page, sort: query.sort });
      dispatch(storeProduct({
         products: response,
         ...query,
      }));
   } catch(err) {
      console.log('action getSearchPage response undefine ', err);
   }
};

export { getAll, getSearchPage };
