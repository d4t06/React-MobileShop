import classNames from "classnames/bind";
// import useStore from '../../hooks/useStore';
import styles from "../Products/Products.module.scss";
import { getAllSearchPage } from "../../store/actions";
import { Button, ProductItem } from "../../components";
import { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../config";
// import searchService from '../../services/searchService';

import { useDispatch, useSelector } from "react-redux";
import {
   fetchProducts,
   selectedAllStore,
   getMoreProducts,
} from "../../store/productsSlice";
import { selectedAllFilter } from "../../store/filtersSlice";

// import { storeProduct, fetchProductsSearchPage } from '../../store/productsSlice';
import ProductSort from "../../components/ProductSort";
import NoProduct from "../Products/NoProduct";
// import { selectedAllFilter } from '../../store/filtersSlice';

const cx = classNames.bind(styles);

function SearchResultPage() {
   const store = useSelector(selectedAllStore);
   const filterStore = useSelector(selectedAllFilter);
   const dispatchRedux = useDispatch();
   const [isLoading, setIsLoading] = useState(false);

   let { key } = useParams();
   const { products, page, category, status } = store;
   const { sort } = filterStore;

   const { count, rows, page_size } = products || {};

   let countProduct = count - page * page_size;
   if (countProduct < 0) countProduct = 0;

   useEffect(() => {
      // console.log(category.includes(key));
      if (rows && category.includes(key)) return;

      setIsLoading(true);
      dispatchRedux(fetchProducts({ category: `search=${key}` }));

      setTimeout(() => {
         setIsLoading(false);
      }, 2000);
   }, [key]);

   const renderProducts = () => {
      return rows.map((product) => {
         return (
            <ProductItem key={product.href} data={product} searchResultPage />
         );
      });
   };

   const handleGetMore = () => {
      // getAllSearchPage(dispatchRedux, {
      //    status,
      //    category: category,
      //    page: page + 1,
      // });

      // dùng extra reducer thay vì dùng action
      dispatchRedux(getMoreProducts({ category, sort, page: page + 1 }));
   };

   return (
      <div className={cx("product-container")}>
         <>
            <div className={cx("product-body", "row")}>
               <div className="col col-full">
                  {!isLoading ? (
                     <h1 className={cx("search-page-title")}>
                        Tìm thấy{" "}
                        <span style={{ color: "#cd1818" }}>
                           {products?.count || 0}
                        </span>{" "}
                        kết quả cho từ khóa "{key}"
                     </h1>
                  ) : (
                     <h1>Kết quả tìm kiếm cho từ khóa "{key}"</h1>
                  )}

                  {isLoading && (
                     <i className={cx("material-icons", "loading-btn", "mt-10")}>sync</i>
                  )}
                  {!!rows?.length && !isLoading && (
                     <>
                        <ProductSort disable={status === 'loading'} category={category} />
                        <div className="products-container">
                           <div className="row">{renderProducts()}</div>
                        </div>
                        <div className={cx("pagination")}>
                           {count > 8 && (
                              <Button
                                 mgauto
                                 outline
                                 rounded
                                 count={countProduct}
                                 onClick={() => handleGetMore()}
                                 describe="sản phẩm"
                                 status={status}
                                 icon={ <i className={cx("material-icons", "loading-btn")}>sync</i> }
                              >
                                 Xem thêm
                              </Button>
                           )}
                        </div>
                     </>
                  )}
               </div>
            </div>
            {!rows?.length && status !== "loading" && <NoProduct />}
         </>
      </div>
   );
}
export default SearchResultPage;
