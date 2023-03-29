import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Button({
   full,
   half,
   describe,
   rounded,
   count,
   outline,
   children,
   fill,
   onClick,
}) {
   const classes = cx('wrapper', {
      disable: count === 0,
      outline,
      fill,
      rounded,
      full,
      half,
   });
   return (
      <button onClick={onClick} className={classes}>
         <span>
            {children} {count} {describe}
         </span>
      </button>
   );
}

export default Button;
