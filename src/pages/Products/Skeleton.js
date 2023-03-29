import classNames from 'classnames/bind';
import styles from '../../components/ProductItem/ProductItem.module.scss';

const cx = classNames.bind(styles);
function Skeleton({ data: products, searchResultPage }) {

   // console.log("products = ", products)

   return (
      <div className={cx('product-container')}>
         <div className="row">
            {products && (
               products.map((item, index) => {
                  return (
                     <div
                        key={index}
                        className={cx(
                           'col',
                           searchResultPage ? 'col-3' : 'col-4'
                        )}
                     >
                        <div className={cx('product-item')}>
                           <div
                              to={`/${item.category}/${item.href}`}
                              className={cx('product-item-frame')}
                           >
                            skeleton
                           </div>
                           
                           <div className={cx('product-item-body')}>
                              <h4 className={cx('product-item_name')}>
                                skeleton
                              </h4>

                              <div className={cx('product-item_tags')}>
                                skeleton
                              </div>
                              
                              <div className={cx('product-item_price')}>
                                 <div className={cx('price-top')}>
                                    skeleton
                                 </div>

                                 <h1
                                    className={cx(
                                       'product-item_price--current'
                                    )}
                                 >
                                   skeleton
                                 </h1>
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })
            )}
         </div>
      </div>
   );
}

export default Skeleton;
