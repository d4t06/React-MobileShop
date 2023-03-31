import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productServices from '../services/productServices'
import searchService from "../services/searchService";

const initialState = {
    status: 'idle',
    // products: {rows: '', count: 0},
    products: {},
    category: '',
    page: 1,
}

export const fetchProducts = createAsyncThunk('/products/fetchProducts', async(query) => {
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
        return {products: response, ...query};
    } catch (error) {
        console.log("fetchProducts error", error)
    }
})

export const getMoreProducts = createAsyncThunk('/products/getMoreProducts', async(query) => {
    try {
        const response = await productServices.getProducts(query);
        return {products:response, ...query}

    } catch (error) {
        console.log("fetchProducts error", error)
    }
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // fetchProducts
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading'
            }) 
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log("fetchProducts =", action);
                    state.products = action.payload.products

                    state.status = 'successful'    
                    state.page= action.payload.page || 1;
                    state.category= action.payload.category || '';            
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'error'
            })

            // getMoreProducts
            .addCase(getMoreProducts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getMoreProducts.fulfilled, (state, action) => {
                console.log("getMoreProducts =", action)
                state.products.count= action.payload.products.count;
                state.products.rows.push(...action.payload.products.rows);

                state.status = 'successful'    
                state.page= action.payload.page;
                state.category= action.payload.category || '';    
            })
            .addCase(getMoreProducts.rejected, (state, action) => {
                state.status = 'error'
            })
    }
})

export const selectedAllStore = (state) => state.products

export const { storeProduct } = productsSlice.actions

export default productsSlice.reducer
