import classNames from 'classnames/bind';
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={ cx("footer") }>
      <div className={ cx("footer-top") }>
        <div className={ cx('footer-item') }>
          <ul>
            <li>
              Giới thiệu về công ty
            </li>
            <li>
              Chính sách bảo mật
            </li>
            <li>
              Chính sách bảo hành
            </li>
            <li>
              Hệ thống cửa hàng
            </li>
          </ul>
        </div>
        <div className={ cx('footer-item') }>
          <ul>
            <li>
              Giới thiệu về công ty
            </li>
            <li>
              Chính sách bảo mật
            </li>
            <li>
              Chính sách bảo hành
            </li>
            <li>
              Hệ thống cửa hàng
            </li>
          </ul>
        </div>
        <div className={ cx('footer-item') }>
          <ul>
            <li>
              Giới thiệu về công ty
            </li>
            <li>
              Chính sách bảo mật
            </li>
            <li>
              Chính sách bảo hành
            </li>
            <li>
              Hệ thống cửa hàng
            </li>
          </ul>
        </div>
      </div>
      <div className={ cx("footer-bottom") }>
        <p className={ cx("copy-right") }>
          Nguyen Huu Dat ©
        </p>
      </div>
    </div>
  );
}
export default Footer;