import InfoItem from "./InfoItem";

import classNames from "classnames/bind";
import styles from "../Login/Login.module.scss";
import stylesMain from "./AddProduct.module.scss";
import request from "../../utils/request";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);
const cy = classNames.bind(stylesMain);

function AddProduct() {
   const [name, setName] = useState("");
   const nameRef = useRef("");
   const [brand, setBrand] = useState("");
   const [category, setCategory] = useState("");
   const [old_price, setOld_price] = useState("");
   const [cur_price, setCur_price] = useState("");
   const [image, setImage] = useState("");

   const [feature, setFeature] = useState("");
   const [features, setFeatures] = useState([]);

   const [quantity, setQuantity] = useState(0);

   const handleFeatures = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setFeatures([...features, feature]);
      setFeature("");
   };
   const handleDelete = (id) => {
      const newFeatures = [...features]
      newFeatures.splice(id, 1);
      setFeatures(newFeatures);

   };

   const handleData = () => {
      const productInfo = {
         name,
         category,
         brand,
         image,
         old_price: +cur_price,
         cur_price: +old_price
            };

      let featureText = '';
      features.map(item => {
         featureText += item + "*and*"
      })

      let href = name.toLowerCase().replaceAll(" ", "-")

      productInfo['feature'] = featureText;
      productInfo['href'] = href;

      return productInfo
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      const productInfo = handleData();

      console.log("product = ", productInfo);

      try {
         const response = await request.post(
            "/admin/products",
            JSON.stringify({
               ...productInfo
            }),
            {
               headers: { "Content-Type": "application/json" },
            }
         );

         console.log("response = ", response)
      } catch (error) {
         console.log({"message": error})
      }
   };
   useEffect(() => {
      nameRef.current.focus();
   }, []);

   return (
      <>
         <h1 className="title">Thêm sản phẩm</h1>
         <div className="row">
            <div className="col col-half">
               <h1>review</h1>
            </div>
            <div className="col col-half">
               <form
                  className={cx("login-form", "mt-15")}
                  onSubmit={(e) => handleSubmit(e)}
               >
                  <div className={cx("form-group")}>
                     <label htmlFor="">Tên sản phẩm</label>
                     <input
                        ref={nameRef}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                     />
                  </div>
                  <div className={cx("form-group")}>
                     <label htmlFor="">Hãng sản xuất</label>
                     <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                     >
                        <option value="">- - -</option>
                        <option value="iphone">Apple</option>
                        <option value="samsung">Samsung</option>
                        <option value="xiaomi">Xiaomi</option>
                        <option value="sony">Sony</option>
                        <option value="nokia">Nokia</option>
                        <option value="realme">Realme</option>
                     </select>
                  </div>
                  <div className={cx("form-group")}>
                     <label htmlFor="">Danh mục</label>
                     <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                     >
                        <option value="">- - -</option>
                        <option value="dtdd">Điện thoại</option>
                        <option value="laptop">Laptop</option>
                        <option value="phukien">Phụ kiện</option>
                     </select>
                  </div>
                  <div className={cx("form-group")}>
                     <label htmlFor="">Ảnh</label>
                     <input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        type="text"
                     />
                  </div>
                  <div className={cx("form-group")}>
                     <label htmlFor="">Tính năng nổi bật</label>
                     <div className={cy("info-item-container")}>
                        <InfoItem handleDelete={handleDelete} data={features} />
                     </div>
                     <input
                        value={feature}
                        onChange={(e) => setFeature(e.target.value)}
                        type="text"
                     />
                     <button
                        onClick={(e) => handleFeatures(e)}
                        className={cy("add-info-btn")}
                     >
                        Thêm
                     </button>
                  </div>
                  <div className="row">
                     <div className="col col-half">
                        <div className={cx("form-group")}>
                           <label htmlFor="">Giá cũ</label>

                           <input
                              value={old_price}
                              onChange={(e) => setOld_price(e.target.value)}
                              type="number"
                           />
                        </div>
                     </div>
                     <div className="col col-half">
                        <div className={cx("form-group")}>
                           <label htmlFor="">Giá mới</label>
                           <input
                              value={cur_price}
                              onChange={(e) => setCur_price(e.target.value)}
                              type="number"
                           />
                        </div>
                     </div>
                  </div>
                  <div className={cx("form-group")}>
                     <label htmlFor="">Số lượng</label>
                     <input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        type="number"
                     />
                  </div>
                  <button className={cx("submit-btn", "mt-15")} type="submit">
                     Tạo mới
                  </button>
               </form>
            </div>
         </div>
      </>
   );
}

export default AddProduct;
