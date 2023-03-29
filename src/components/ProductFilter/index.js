import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProducts } from '../../store/productsSlice';
import { selectedAllFilter, storeFilters } from '../../store/filtersSlice';
import useFilter from '../../hooks/useFilters';

import classNames from 'classnames/bind';
import styles from './ProductFilter.module.scss';

import Checkbox from './sections/Checkbox';
import Radiobox from './sections/Radiobox';

import { brand, price } from '../../assets/data';
import { getAll } from '../../store/actions';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductFilter({ category }) {
   const filtersStore = useSelector(selectedAllFilter);
   const dispatchRedux = useDispatch();
   const [Filters, setFilters] =  useState('');
   // const category = useParams()
   // const [filters, handleFilter] = useFilter();

   const showFilteredResults = (filters) => {

      console.log('show filter result');
      const { sort } = filtersStore;
      // getAll(dispatchRedux, { page: 1, sort, category, filters: filters });
      dispatchRedux(fetchProducts({page: 1, sort, category, filters: filters}))
      
      dispatchRedux(storeFilters({sort, filters: filters}))
   };

   // useEffect(() => {
   //    showFilteredResults(filters)
   // }, [filters])


   const handleFilter = (filters, by) => {
      let newFilters = { ...Filters };
      // console.log("old product filters = ", newFilters)
      // console.log('product filter = ', filters, by);

      // nếu chọn tất cả
      if (!filters) {
         delete newFilters[by];
      } else {
         newFilters[by] = filters;
      }

      // nếu không có filter gì cả
      if (!newFilters.price && !newFilters.brand) newFilters = '';

      // console.log("new product filters = ", newFilters)
      showFilteredResults(newFilters);
      setFilters(newFilters);
   };

   // khong can update o day
    useEffect(() => {
     // if (!Filters) return
   //   console.log("useEffect update productfilter global");
     setFilters(filtersStore.filters)
    }, [filtersStore])

   //  useEffect(() => {
   //   // if (!Filters) return
   //   console.log("useEffect update productfilter global");
   //  }, [store])

   return (
      <div className={cx('col', 'col-3')}>
         <div className={cx('product-filter')}>
            <div className={cx('filter-section')}>
               <h1 className={cx('filter-title')}>Hãng sản xuất</h1>
               <div className={cx('filter-list')}>
                  {/* {filterContiments.brand.map((item, index) => {}) */}
                  {/* phai render data lay ra tu checkbox component */}
                  {/* tại vì mỗi checkbook có một state riêng, state lấy dữ liệu từ nhiều item, nhưng không thể render nhiều checkbox */}
                  {/* ban đầu render nhiều checkbox */}
                  {/* fix: chỉ có mỗi checkbox nhưng trong checkbox có nhiều item */}
                  <Checkbox
                     data={brand[category]}
                     handleFilter={(filters) => handleFilter(filters, 'brand')}
                  />
                  {/* truyền handleFilter vào cop Checkbox, chực hiện sau trể về đối số là filter sau đó tt*/}
               </div>
            </div>
            <div className={cx('filter-section')}>
               <h1 className={cx('filter-title')}>Mức giá</h1>
               <div className={cx('filter-list', 'price')}>
                  <Radiobox
                     data={price[category]}
                     handleFilter={(filter) => handleFilter(filter, 'price')}
                  />
               </div>
            </div>
            {/* <div className={ cx('filter-section') }>
            <h2 className={ cx('filter-title') }>Tính năng đặc biệt</h2>
            <div className={ cx('filter-list') }>
              <Checkbox handleFilter={ (filter) => handleFilter(filter, 'feature') } by={'feature'} category={ "feature" } />
            </div>
          </div> */}
         </div>
      </div>
   );
}

export default ProductFilter;
