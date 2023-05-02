import { useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { useSelector, useDispatch } from "react-redux";
import config from "../../config";
import {
   ProductFilter,
   ImageSlider,
   ProductItem,
   QuickFilter,
   Button,
} from "../../components";
import { banner } from "../../assets/data";

import {
   fetchProducts,
   selectedAllStore,
   getMoreProducts,
} from "../../store/productsSlice";
import { selectedAllFilter } from "../../store/filtersSlice";

import NoProduct from "./NoProduct";
import Skeleton from "./Skeleton";
import ProductSort from "../../components/ProductSort";
const cx = classNames.bind(styles);

function Product() {
   // products, status, page, category
   const store = useSelector(selectedAllStore);
   const filterStore = useSelector(selectedAllFilter);
   const dispatchRedux = useDispatch();
   const { category } = useParams();

   const { products, page, status } = store;
   const { sort, filters } = filterStore;
   const { rows, count } = products || {};

   let countProduct = count - page * config.pageSize;
   if (countProduct < 0) countProduct = 0;

   useEffect(() => {
      dispatchRedux(fetchProducts({ category, page: 1 }));
   }, [category]);

   const handleGetMore = () => {
      // getAll(dispatchRedux, {category, page: page + 1 });
      dispatchRedux(
         getMoreProducts({ category, sort, filters, page: page + 1 })
      );
   };

   const renderProducts = () => {
      return rows.map((product) => {
         return <ProductItem key={product.name} data={product} />;
      });
   };

   console.log("product re-render", store);

   return (
      <div className={cx("product-container")}>
         <ImageSlider banner data={banner[category]} />

         <div className={cx("product-body", "row")}>
            <div className="col col-9">
               <QuickFilter category={category} count={count} />
               <ProductSort category={category} disable={status === 'loading'}/>
               {/* {status === 'loading' && <Skeleton data={rows}/>} */}
               {/* {status === "loading" && <h1>Đang tải...</h1>} */}

               {/* ngu, nếu thêm staus == 'successful' thì mội lần fetch sẽ bị giật */}
               {!!rows?.length ? (
                  <>
                     <div className={cx("product-container")}>
                        <div className="row">{renderProducts()}</div>
                     </div>
                     <div className={cx("pagination")}>
                        <Button
                           outline
                           rounded
                           mgauto
                           count={countProduct}
                           onClick={() => handleGetMore()}
                           describe="sản phẩm"
                           status={status}
                           icon={
                              <i
                                 className={cx("material-icons", "loading-btn")}
                              >
                                 sync
                              </i>
                           }
                        >
                           Xem thêm
                        </Button>
                     </div>
                  </>
               ) : (
                  status === "successful" && <NoProduct />
               )}
            </div>

            <ProductFilter category={category} disable={status === 'loading'}/>
         </div>
      </div>
   );
}

export default Product;
