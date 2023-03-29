import Header from "../../components/Header";
import Footer from "../../components/Footer"
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
const cx = classNames.bind(styles);

function DefaultLayout({ children, dispatch }) {
   return (
      <div className={cx("app")}>
         <Header dispatch={dispatch}/>
         <div className="container">{children}</div>
         <Footer />
      </div>
   );
}

export default DefaultLayout;
