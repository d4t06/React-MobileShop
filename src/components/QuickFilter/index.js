import { useEffect, useState } from 'react';
import useFilter from '../../hooks/useFilters';
import { fetchProducts } from '../../store/productsSlice';

import classNames from 'classnames/bind';
import styles from './BrandSort.module.scss';

import DemandItem from './demandItem';
import SelectedSort from './SelectedSort';
import { brand, demand } from '../../assets/data/brands';

import { getAll } from '../../store/actions';

import { useDispatch, useSelector } from 'react-redux';
import { selectedAllStore } from '../../store/productsSlice';

const cx = classNames.bind(styles);

function QuickFilter({ category, count }) {
   // const [state, dispatch] = useStore();
   const store = useSelector(selectedAllStore)
   const dispatchRedux = useDispatch()
   // const [Filters, setFilters] = useState('');
   const [filters, handleFilter] = useFilter();

   // console.log("quick filter = ", filters)

   const isFiltered =
   (JSON.stringify(filters) !== '{}' && filters?.brand) ||
   filters?.price;


   const showFilteredResults = (filters) => {
      const { page, sort, category } = store;
      // if (status === 'idle') {
      //    console.log('show filter result');
         getAll(dispatchRedux, { page, sort, category, filters: filters });
         // dispatchRedux(fetchProducts({page, sort, category, filters: filters}))
      // }
   };

   // const handleFilter = (filters, by) => {
   //    let newFilters = { ...Filters };
   //    // console.log("old product filters = ", newFilters)
   //    // console.log('product filter = ', filters, by);

   //    // nếu chọn tất cả
   //    if (!filters) {
   //       delete newFilters[by];
   //    } else {
   //       newFilters[by] = filters;
   //    }

   //    // nếu không có filter gì cả
   //    if (!newFilters.price && !newFilters.brand) newFilters = '';

   //    // console.log("new product filters = ", newFilters)
   //    showFilteredResults(newFilters);
   //    setFilters(newFilters);
   // };

   // // khong can update o day
   //  useEffect(() => {
   //   // if (!Filters) return
   // //   console.log("useEffect update productfilter global");
   //   setFilters(store.filters)
   //  }, [store])

   useEffect(() => {
      console.log('show filter result');
      showFilteredResults(filters)
   },[filters])


   // useEffect(() => {
   //    // console.log("state filter useEffect = ", Filters);
   //    // if (!Filters) return
   //    // console.log("useEffect");
   //    setFilters(store.filters);
   // }, [store]);

   return (
      <>
         <div className={cx('brand-sort')}>
            {category === 'dtdd' ? (
               <h1>
                  Điện thoại {`( `}
                  <span style={{ color: '#cd1818' }}>{count}</span>
                  {` )`} sản phẩm
               </h1>
            ) : (
               <h1>
                  Laptop {`( `}
                  <span style={{ color: '#cd1818' }}>{count}</span>
                  {` )`} sản phẩm
               </h1>
            )}
            {/* <h1 className={cx('count')}>{`(${count}) Sản phẩm`}</h1> */}
            <div className={cx('container')}>
               {/* selected sort luon thay dổi mỗi khi state thay dổi */}
               {isFiltered ? (
                  <SelectedSort
                     category={category}
                     data={filters}
                     handleFilter={(filter, by) => handleFilter(filter, by)}
                  />
               ) : (
                  <DemandItem
                     category={category}
                     data={brand[category]}
                     handleFilter={(filter, by) => handleFilter(filter, by)}
                  />
               )}
            </div>
         </div>
         {/* <div className={cx('demand-sort')}>
          <h1>Nhu cầu</h1>
            <div className={cx('container')}>
               <DemandItem
                  demand
                  data={demand[category]}
                  handleFilter={ (filter) => handleFilter(filter, 'price') }
               />
            </div>
         </div> */}
      </>
   );
}

export default QuickFilter;
