import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import moneyFormat from '../../utils/moneyFormat';
import { useRef } from 'react';
import * as productServices from '../../services/productServices'

const cx = classNames.bind(styles);

function Cart({data, onClose}) {
   const genderRef = useRef()
   const nameRef = useRef()
   const phoneRef = useRef()
   const couponRef = useRef()
   const {name, cur_price, href} = data

   const handleSubmit = () => {

      const data = {
         name: nameRef.current.value,
         gender: genderRef.current.value,
         phone: phoneRef.current.value,
         product: name,
         price: cur_price,
         href: href,
      }
      productServices.buyProduct(data)
      onClose()
      // console.log(data)
   }

   return (
      <>
      <div className={cx('product-cart')}>
         <div className={cx('cart-header')}>
            <h1>Có 1 sản phẩm trong giỏ hàng</h1>
            <button className={cx('close-btn')} onClick = {() => onClose()}>Đóng</button>
         </div>
         {data && (
         <>
         <div className={cx('cart-container')}>
            <div className={cx('cart-item')}>
               <div className={cx('item-image-frame')}>
                  <img
                     src={data.image}
                     alt=""
                  />
               </div>
               <div className={cx('item-description')}>
                  <h1>{data.name}</h1>
                  <h2>Màu sắc: Đen</h2>
                  <h2>Số lượng: 1</h2>
               </div>
               <div className={cx('item-price')}>
                  <h2 className={cx('cur_price')}>{moneyFormat(data.cur_price)}đ</h2>
                  <span className={cx('old_price')}>
                     {moneyFormat(data.old_price)}đ
                  </span>
               </div>
            </div>
            <form className={cx('form')}>
               <div className={cx('input-group')}>
                  <select name="gender" ref={genderRef} className={cx('select')}>
                     <option value="male">Anh</option>
                     <option value="female">Chị</option>
                  </select>
               </div>
               <div className={cx('form-group')}>
                  <div className={cx('input-group')}>
                     <label>Họ và tên Anh, Chị:</label>
                     <input name='name' autoComplete='false' type="text" ref={nameRef}/>
                  </div>
                  <div className={cx('input-group')}>
                     <label>Số điện thoại:</label>
                     <input name='phone' type="text" ref={phoneRef} />
                  </div>
               </div>
               <div className={cx("input-group")}>
                  <label>Mã giảm giá,voucher mua sắm:</label>
                     <input name='Coupon' type="text" ref={couponRef} />
               </div>
            </form>
         </div>
         <div className={cx('cart-footer')}>
            <div className={cx('total')}>
               <h1>Tổng tiền:</h1>
               <h1 className={cx('total-price')} style={{ float: 'right' }}>
                  {moneyFormat(data.cur_price)}đ
               </h1>
            </div>
            <button onClick={(e) => handleSubmit(e)} className={cx('buy-btn')}>Đặt hàng</button>
         </div>
         </>
         )}
      </div>
      </>
   );
}
export default Cart;
