import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productServices from '../services/productServices'
import searchService from "../services/searchService";

const initialState = {
    status: 'idle',
    products: {},
    category: '',
    page: 1,
}

export const fetchProducts = createAsyncThunk('/products', async(query) => {
    try {
        let response;
        if (query.category.includes("search")) {
            console.log('include search')
            const key = query.category.split('search=')[1]; //search=iphone 14
             response = await searchService({ q: key, page: query.page, sort: query.sort });
        }
        else {
             response = await productServices.getProducts(query);
        }
        // setTimeout(() => {
        // }, 500);
        return {products: response, ...query};
    } catch (error) {
        console.log("fetchProducts error", error)
    }
})

// export const fetchProductsSearchPage = createAsyncThunk('/products', async(query) => {
//     try {
        
//         return {products: response, ...query};
//     } catch (error) {
//         console.log("fetchProducts error", error)
//     }
// })

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        storeProduct(state, action) {
            // console.log(action)

            state.products = action.payload.products;
            state.page= action.payload.page;
            state.category= action.payload.category;
            state.status = action.payload.status
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchProducts
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading'
            }) 
            .addCase(fetchProducts.fulfilled, (state, action) => {
                
                    state.status = 'successful'    
                    state.page= action.payload.page || 1;
                    state.products = action.payload.products || {};
                    state.category= action.payload.category || '';            
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'error'
            })

            // // fetchProductsSearchPage
            // .addCase(fetchProductsSearchPage.pending, (state, action) => {
            //     state.status = 'loading'
            // })
            // .addCase(fetchProductsSearchPage.fulfilled, (state, action) => {
            //         state.status = 'successful'    
            //         state.page= action.payload.page || 1;
            //         state.products = action.payload.products || {};
            //         state.category= action.payload.category || '';    
            // })
            // .addCase(fetchProductsSearchPage.rejected, (state, action) => {
            //     state.status = 'error'
            // })
    }
})

export const selectedAllStore = (state) => state.products

export const { storeProduct } = productsSlice.actions

export default productsSlice.reducer
