import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function DashboardHeader() {
   return (
      <div className={cx("header__wrapper")}>
         <div className="container">
            <div className={cx("header")}>
               <h1><Link to='/dashboard'>HD SHOP</Link></h1>
               <h2>Hello datnh ! </h2>
            </div>
         </div>
      </div>
   );
}

export default DashboardHeader;
