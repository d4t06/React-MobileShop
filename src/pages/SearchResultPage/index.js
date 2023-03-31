import classNames from "classnames/bind";
// import useStore from '../../hooks/useStore';
import styles from "../Products/Products.module.scss";
import { getAllSearchPage } from "../../store/actions";
import { Button, ProductItem } from "../../components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import config from "../../config";
// import searchService from '../../services/searchService';

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectedAllStore } from "../../store/productsSlice";

// import { storeProduct, fetchProductsSearchPage } from '../../store/productsSlice';
import ProductSort from "../../components/ProductSort";
import NoProduct from "../Products/NoProduct";
// import { selectedAllFilter } from '../../store/filtersSlice';

const cx = classNames.bind(styles);

function SearchResultPage() {
  const store = useSelector(selectedAllStore);
  const dispatchRedux = useDispatch();

  let { key } = useParams();

  const { products, page, category, status } = store;
  const { count, rows } = products || {};

  let countProduct = count - page * config.pageSize;
  if (countProduct < 0) countProduct = 0;

  useEffect(() => {
    console.log(category.includes(key));
    if (rows && category.includes(key)) return;
    dispatchRedux(fetchProducts({ category: `search=${key}` }));
  }, [key]);

  const renderProducts = () => {
    return rows.map((product) => {
      return <ProductItem key={product.href} data={product} searchResultPage />;
    });
  };

  const handleGetMore = () => {
    getAllSearchPage(dispatchRedux, {
      status,
      category: category,
      page: page + 1,
    });
  };

  return (
    <div className={cx("product-container")}>
      <>
        {status === "loading" && <h1>Loading</h1>}
        {rows && status === "successful" && (
          <div className={cx("product-body", "row")}>
            <div className="col col-full">
              {rows ? (
                <h1 className={cx("search-page-title")}>
                  Tìm thấy{" "}
                  <span style={{ color: "#cd1818" }}>
                    {products.rows.length || 0}
                  </span>{" "}
                  kết quả cho từ khóa "{key}"
                </h1>
              ) : (
                <h1>Kết quả tìm kiếm cho từ khóa "{key}"</h1>
              )}
              <ProductSort category={category} />
              <div className="products-container">
                <div className="row">{renderProducts()}</div>
              </div>
              <div className={cx("pagination")}>
                {count > 8 && (
                  <Button
                    outline
                    rounded
                    count={countProduct}
                    onClick={() => handleGetMore()}
                    describe="sản phẩm"
                  >
                    Xem thêm
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        {!rows && <NoProduct />}
      </>
    </div>
  );
}
export default SearchResultPage;
