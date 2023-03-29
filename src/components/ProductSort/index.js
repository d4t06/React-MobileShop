import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectedAllFilter } from '../../store/filtersSlice';
import classNames from 'classnames/bind';
import styles from './ProductSort.module.scss';

import { getAll, getSearchPage } from '../../store/actions';
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

function ProductSort({category}) {
   const filtersStore = useSelector(selectedAllFilter)
   const dispatchRedux = useDispatch()
   const [checked, setChecked] = useState(1);

   const {filters} = filtersStore

   useEffect(() => {
      if (checked ===  1) return;
      setChecked(1)
   }, [category])

   const handleSort = (id) => {
      // console.log("sort state ", state)
      if (id) {
         let sort = {
            column: continents[id - 1].column,
            type: continents[id - 1].type,
         };

         // nếu là tất cả
         if (!sort.column) sort = '';

         // nếu sort ở search page
         if (category.includes('search')) {
            getSearchPage(dispatchRedux,{ category, page, sort });
         } else dispatchRedux(fetchProducts({page: 1, category, filters, sort: sort}))
   };
}

   const handleToggle = (id) => {
      console.log(id);
      if (id !== checked) {
         handleSort(id);
         setChecked(id);
      }
   };

  console.log(filtersStore?.sort)

   return (
      <div className={cx('product-sort')}>
         <h1>Xem theo</h1>
         <ul className={cx('btn-group')}>
            {continents.map((item) => {
               return (
                  <li
                     className={cx(
                        'sort-btn',
                        filtersStore?.sort[0] === item.column ? 'active' : ''
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
