import classNames from 'classnames/bind';
// import useStore from '../../hooks/useStore';
import styles from '../Products/Products.module.scss';
import { getSearchPage } from '../../store/actions';
import { Button, ProductItem } from '../../components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import searchService from '../../services/searchService';

import { useDispatch, useSelector } from 'react-redux';
import { selectedAllStore } from '../../store/productsSlice';

import { storeProduct } from '../../store/productsSlice';

const cx = classNames.bind(styles);

function SearchResultPage() {

   // const [state, dispatch] = useStore();
   const store = useSelector(selectedAllStore)
   const dispatchRedux = useDispatch()
   
   let { key } = useParams();

   const { products, page, category } = store.products
      ? store
      : { products: { count: "", rows: null }, category: `search=${key}`};


   const { count, rows } = products;

   let countProduct = count - (page * import.meta.env.VITE_PAGE_SIZE || 1);
   if (countProduct < 0) countProduct = 0;

   useEffect(() => {
      if (store.products?.rows && store.category.includes(key)) return;

      const fetchApi = async () => {
         const result = await searchService({ q: key });
         return result;
      };
      dispatchRedux(storeProduct({ status: 'loading' }));
      const handler = setTimeout(async () => {
         const result = await fetchApi();
         dispatchRedux(storeProduct({
            products: result,
            category: `search=${key}`,
         }));
      }, 1000);

      return () => {
         clearTimeout(handler);
      };
   }, [key]);

   const handleGetMore = () => {
      getSearchPage(dispatchRedux, { category: category, page: page + 1 });
   };

   console.log("redux store = ", store);

   return (
      <div className={cx('product-container')}>
         <>
            {store.status !== 'loading' ? (
               <div className={cx('product-body', 'row')}>
                  <div className="col col-full">
                     {products?.count ? <h1 className={cx("search-page-title")}>
                        Tìm thấy <span style={{color: "#cd1818"}}>{products.rows.length || 0}</span> kết quả cho từ khóa "{key}"
                     </h1> : <h1>Kết quả tìm kiếm cho từ khóa "{key}"</h1>}
                      <ProductItem data={rows} searchResultPage />
                     <div className={cx('pagination')}>
                        {count > 8 && <Button outline rounded count={countProduct} onClick={() => handleGetMore()} describe="sản phẩm">
                     Xem thêm
                  </Button>}
                     </div>
                  </div>
               </div>
            ) : <h1 className='col-full' style={{marginTop:"30px", textAlign: "center"}}>Đang tìm kiếm...</h1>}
         </>
      </div>
   );
}
export default SearchResultPage;
