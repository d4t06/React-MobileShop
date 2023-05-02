import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectedAllFilter, storingFilters } from '../../store/filtersSlice';
import classNames from 'classnames/bind';
import styles from './ProductSort.module.scss';

// import { getAll, getSearchPage } from '../../store/actions';
import { fetchProducts } from '../../store/productsSlice';
const cx = classNames.bind(styles);

const continents = [
   {
      id: 1,
      value: 'Mới nhất',
      column: '',
      type: '',
   },
   {
      id: 2,
      value: 'Giá thấp',
      column: 'cur_price',
      type: 'asc',
   },
   {
      id: 3,
      value: 'Giá cao',
      column: 'cur_price',
      type: 'desc',
   },
   {
      id: 4,
      value: 'Trả góp 0%',
      column: 'intallment',
      type: true,
   },
];

function ProductSort({ category, disable }) {
   const filtersStore = useSelector(selectedAllFilter);
   const dispatchRedux = useDispatch();
   const [checked, setChecked] = useState(1);

   const { filters } = filtersStore;

   useEffect(() => {
      if (checked === 1) return;
      setChecked(1);
   }, [category]);

   const handleSort = (id) => {
      if (id) {
         let newSort = {
            column: continents[id - 1].column,
            type: continents[id - 1].type,
         };

         // nếu là tất cả
         if (!newSort.column) newSort = '';

         dispatchRedux(
            fetchProducts({ page: 1, category, filters, sort: newSort })
         );
         dispatchRedux(storingFilters({ filters, sort: newSort }));

         setChecked(id);
      }
   };

   const handleToggle = (id) => {
      console.log('id =', id);
      console.log('checked = ', checked);
      if (id !== checked) {
         handleSort(id);
      }
   };

   return (
      <div className={cx('product-sort', {disable})}>
         <h1>Xem theo</h1>
         <ul className={cx('btn-group')}>
            {continents.map((item, index) => {
               return (
                  <li
                     className={cx(
                        'sort-btn',
                        index + 1 === checked ? 'active' : ''
                     )}
                     key={item.id}
                     onClick={() => handleToggle(item.id)}
                  >
                     {item.value}
                  </li>
               );
            })}
         </ul>
      </div>
   );
}

export default ProductSort;
