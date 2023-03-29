import classNames from "classnames/bind";
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)




function Modal({ children, setShowModal }) {
   // if (!showModal) return null;
   // console.log(showModal)
   return (
      <>
         <div className={cx("overlay")}
         onClick={() => setShowModal(false)}></div>
        {children && <div className={cx('modal')}>{children}</div>}
      </>
   );
}

export default Modal;
