import classNames from 'classnames/bind';
import styles from './BrandSort.module.scss';
// import {price} from '../../assets/data'
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { brand, price } from '../../assets/data';
import { trashIcon } from '../../assets/icons';

const cx = classNames.bind(styles);

function SelectedSort({ category, data, handleFilter }) {

   console.log("selected sort ", data)
   const handleToggle = (string) => {
      let newChecked = data.brand;
      console.log("newchecked = ", newChecked);
      // const index = data.brand.indexOf(string);
      // newChecked.splice(index, 1);
      newChecked = newChecked.filter(brand =>  brand !== string)

      if (!newChecked.length) newChecked = '';
      // console.log("newChecked = ", newChecked)

      handleFilter(newChecked, 'brand');
   };

   const priceContent = price[category].find(
      (item) => JSON.stringify(item.array) === JSON.stringify(data.price)
   );

   // console.log('data selected sord = ', data);
   return (
      <>
         <h2>Bộ lọc:</h2>
         {data?.brand &&
            data?.brand?.map((item, index) => {
               return (
                  <div
                     onClick={() => handleToggle(item)}
                     className={cx('filter-item')}
                     key={index}
                  >
                     <p>
                        {item} 
                     </p>
                     <i className="material-icons">delete</i>
                  </div>
               );
            })}
         {data?.price && (
            <span
               onClick={() => handleFilter('', 'price')}
               className={cx('filter-item')}
            >
               {priceContent.text || ''}
               <i className="material-icons">delete</i>
            </span>
         )}
         {(data?.brand?.length > 1 ||
            (data?.brand?.length > 0 && data.price)) && (
            <button
               className={cx('clear-filter')}
               onClick={() => handleFilter('', 'clear')}
            >
               <span>
                  {/* <FontAwesomeIcon icon={faDeleteLeft}/> */}
                  <RiDeleteBack2Fill />
               </span>
            </button>
         )}
      </>
   );
}

export default SelectedSort;
