import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import moneyFormat from "../../utils/moneyFormat.js";
// import ProductSort from "../ProductSort";

const cx = classNames.bind(styles);
function ProductItem({ data, searchResultPage }) {
  // console.log("products = ", products)

  const feature = data?.feature.slice(0, data.feature.length - 5).split("*and*");

  return (
        <div className={cx("col", searchResultPage ? "col-3" : "col-4")}>
          <div className={cx("product-item")}>
            <Link
              to={`/${data.category}/${data.href}`}
              className={cx("product-item-frame")}
            >
              <img className={cx("product-item-image")} src={data.image} />
              {!!data.product_label && (
                <img
                  className={cx("product-item-label")}
                  src={data.product_label}
                />
              )}
            </Link>
            <div className={cx("product-item-event")}>
              {data.label && (
                <span className={cx("event-label")}>{data.label}</span>
              )}
            </div>
            {data.intallment && (
              <div className={cx("product-item-installment")}>
                <span>Trả góp 0%</span>
              </div>
            )}
            <div className={cx("product-item-body")}>
              <h4 className={cx("product-item_name")}>{data.name}</h4>

              <div className={cx("product-item_tags")}>
                {feature?.map((tag, index) => (
                  <p key={index} className={cx("tag")}>
                    {tag}
                  </p>
                ))}
              </div>
              {/* {data.category === 'dtdd' && (
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
                                 {!!data.gift && <span>{data.gift}</span>}
                              </div> */}
              <div className={cx("product-item_price")}>
                <div className={cx("price-top")}>
                  <span className={cx("product-item_price--old")}>
                    {data.old_price && moneyFormat(data.old_price)}
                  </span>
                  {data.old_price && (
                    <span className={cx("discount-percent")}>
                      -
                      {(
                        ((data.old_price - data.cur_price) / data.old_price) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  )}
                </div>

                <h1 className={cx("product-item_price--current")}>
                  {moneyFormat(data.cur_price)}
                </h1>
              </div>
            </div>
          </div>
        </div>
  );
}

export default ProductItem;
