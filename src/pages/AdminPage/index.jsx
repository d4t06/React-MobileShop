import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import styles from "./Admin.module.scss";
import useRefreshToken from "../../hooks/useRefreshToken";

const cx = classNames.bind(styles);

function AdminPage() {
   const [user, setUser] = useState([]);
   // const refresh = useRefreshToken();
   const privateRequest = usePrivateRequest();
   const navigate = useNavigate();
   // const location = useLocation;

   // useEffect(() => {
   //    let isMounted = true;
   //    const controller = new AbortController();

   //    const fetch = async () => {
   //       try {
   //          const response = await privateRequest.get('/admin/users', {
   //             signal: controller.signal,
   //          });

   //          console.log('response.data = ', response.data);
   //          isMounted && setUser(response.data);

   //       } catch (error) {
   //          console.log({message: error})
   //          navigate('/unauthorized');
   //       }
   //    };
   //    fetch();

   //    return () => {
   //       isMounted = false;
   //       controller.abort();
   //    };
   // }, []);

   return (
      <div className={cx("dashboard")}>
         <h1 className={cx("title")}>Tât cả sản phẩm</h1>
         <table className={cx("table")}>
            <thead>
               <tr>
                  <th style={{ width: "5%" }}>STT</th>
                  <th></th>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>1</td>
                  <td className={cx("product-image")}>
                     <img
                        src="https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-1-600x600.jpg
"
                        alt=""
                     />
                  </td>
                  <td>Iphone 11</td>
                  <td>8.999.000</td>
                  <td>10</td>
               </tr>
            </tbody>
         </table>
      </div>
   );
}
export default AdminPage;
