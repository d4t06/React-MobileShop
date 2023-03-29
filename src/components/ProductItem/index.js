import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import moneyFormat from '../../utils/moneyFormat.js';
import ProductSort from '../ProductSort';

const cx = classNames.bind(styles);
function ProductItem({ data: products, searchResultPage, category }) {

   // console.log("products = ", products)

   return (
      <div className={cx('product-container')}>
         <ProductSort category={category} />
         <div className="row">
            {products ? (
               products.map((item, index) => {
                  const feature = item.feature
                     .slice(0, item.feature.length - 5)
                     .split('*and*');
                  return (
                     <div
                        key={index}
                        className={cx(
                           'col',
                           searchResultPage ? 'col-3' : 'col-4'
                        )}
                     >
                        <div className={cx('product-item')}>
                           <Link
                              to={`/${item.category}/${item.href}`}
                              className={cx('product-item-frame')}
                           >
                              <img
                                 className={cx('product-item-image')}
                                 src={item.image}
                              />
                              {!!item.product_label && (
                                 <img
                                    className={cx('product-item-label')}
                                    src={item.product_label}
                                 />
                              )}
                           </Link>
                           <div className={cx('product-item-event')}>
                              {item.label && (
                                 <span className={cx('event-label')}>
                                    {item.label}
                                 </span>
                              )}
                           </div>
                           {item.intallment && (
                              <div className={cx('product-item-installment')}>
                                 <span>Trả góp 0%</span>
                              </div>
                           )}
                           <div className={cx('product-item-body')}>
                              <h4 className={cx('product-item_name')}>
                                 {item.name}
                              </h4>

                              <div className={cx('product-item_tags')}>
                                 {feature.map((tag, index) => (
                                    <p key={index} className={cx('tag')}>
                                       {tag}
                                    </p>
                                 ))}
                              </div>
                              {/* {item.category === 'dtdd' && (
                                 <div className={cx('product-item-memory')}>
                                    <button
                                       className={cx('memory-item', 'active')}
                                    >
                                       64GB
                                    </button>
                                    <button className={cx('memory-item')}>
                                       128GB
                                    </button>
                                 </div>
                              )} */}
                              {/* <div className={cx('gift')}>
                                 {!!item.gift && <span>{item.gift}</span>}
                              </div> */}
                              <div className={cx('product-item_price')}>
                                 <div className={cx('price-top')}>
                                    <span
                                       className={cx('product-item_price--old')}
                                    >
                                       {item.old_price &&
                                          moneyFormat(item.old_price)}
                                    </span>
                                    {item.old_price && (
                                       <span className={cx('discount-percent')}>
                                          -
                                          {(
                                             ((item.old_price -
                                                item.cur_price) /
                                                item.old_price) *
                                             100
                                          ).toFixed(0)}
                                          %
                                       </span>
                                    )}
                                 </div>

                                 <h1
                                    className={cx(
                                       'product-item_price--current'
                                    )}
                                 >
                                    {moneyFormat(item.cur_price)}
                                 </h1>
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })
            ) : (
               <h1 className='col-full' style={{marginTop:"30px", textAlign: "center"}}>Không tìm thấy !!!</h1>
            )}
         </div>
      </div>
   );
}

export default ProductItem;
