import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import Context from '../../store/Context';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { getAll } from '../../store/actions';
import * as productServices from '../../services/productServices';
import { useSelector, useDispatch } from 'react-redux';
import {
   ProductFilter,
   ImageSlider,
   ProductItem,
   QuickFilter,
   Button,
} from '../../components';
import { banner } from '../../assets/data';
import { fetchProducts, selectedAllStore, storeProduct } from '../../store/productsSlice';
import NoProduct from './NoProduct';
import Skeleton from './Skeleton';
const cx = classNames.bind(styles);

function Product() {
   const store = useSelector(selectedAllStore);
   const dispatchRedux = useDispatch();
   // const [state, dispatch] = useContext(Context);
   const { category } = useParams();
   // console.log('state = ', state);

   // const { data, status, page, ...rest } = state;
   const { products, page, ...rest } = store;
   const { rows, count } = products ? products : [];

   let countProduct = count - page * import.meta.env.VITE_PAGE_SIZE;
   if (countProduct < 0) countProduct = 0;

   useEffect(() => {
      // const fetch = async () => {
      //    const result = await productServices.getProducts({
      //       category,
      //       page: 1,
      //    });
      //    if (result) {
      //       // dispatch({
      //       //    payload: result,
      //       //    page: 1,
      //       // });
      //       dispatchRedux(
      //          storeProduct({ products: result, page: 1, category })
      //       );
      //    }
      //    return;
      // };
      // fetch();
      if (store.status === 'idle') {
         dispatchRedux(fetchProducts({category, page: 1}))
      }
   }, [category]);

   const handleGetMore = () => {
      // const { data, status, ...rest } = state;
      getAll(dispatchRedux, { ...rest, category: category, page: page + 1 });
   };

   console.log('product re-render', store);

   return (
      <div className={cx('product-container')}>
         <ImageSlider banner data={banner[category]} />

         <div className={cx('product-body', 'row')}>
            <div className="col col-9">
               <QuickFilter category={category} count={count} />

               {store.status === 'loading' && <Skeleton data={rows}/>}

               {count !== 0 && store.status === 'successful' ? (
                  <>
                     <ProductItem data={rows} category={category} />
                     <div className={cx('pagination')}>
                        <Button
                           outline
                           rounded
                           count={countProduct}
                           onClick={() => handleGetMore()}
                           describe="sản phẩm"
                        >
                           Xem thêm
                        </Button>
                     </div>
                  </>
               ) : <NoProduct />}
            </div>

            <ProductFilter category={category} />
         </div>
      </div>
   );
}

export default Product;
