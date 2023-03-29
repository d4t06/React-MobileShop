import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../ProductFilter.module.scss';
// import Continents from './Continents'
// import useStore from '../../../hooks/useStore';
import { useSelector } from 'react-redux';
import { selectedAllFilter } from '../../../store/filtersSlice';
const cx = classNames.bind(styles);


function Radiobox({ handleFilter, data }) {
   const filtersStore = useSelector(selectedAllFilter)
   // const [state, dispatch] = useStore()
   const [checked, setChecked] = useState();

   // console.log("checked radio = ", checked)

   const handleToggle = (array) => {
      if (JSON.stringify(array) ===  JSON.stringify(checked)) return

      // console.log("price value =", array)
      // neu chon tat ca
      handleFilter(array);
      setChecked(array)
   };

   useEffect(() => {
      setChecked(filtersStore.filters.price || '')
   }, [filtersStore.filters])

   return (
      <>
         {data.map((item, index) => {
            return (
               <div key={index} className={cx('filter-item')}>
                  <a to={'/ddtd'}>
                     <input
                        type="radio"
                        id={item.text + index}
                        checked={JSON.stringify(checked) === JSON.stringify(item.array) ? true : false}
                        onChange={(e) => handleToggle(item.array, e)}
                     />
                     <label className={cx('label')} htmlFor={item.text + index}>{item.text}</label>
                  </a>
               </div>
            );
         })}
      </>
   );
}

export default Radiobox;
