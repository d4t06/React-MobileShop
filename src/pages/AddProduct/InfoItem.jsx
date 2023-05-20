import classNames from "classnames/bind";
import styles from "./AddProduct.module.scss";

const cx = classNames.bind(styles);

function InfoItem({ data, handleDelete }) {
   console.log(data);

   return (
      <>
         {data?.map((item, index) => {
            return (
               <div key={index} className={cx("info-item")}>
                  <span>{item}</span>
                  <i className="material-icons" onClick = {() => handleDelete(index)} >delete</i>
               </div>
            );
         })}
      </>
   );
}
export default InfoItem;
