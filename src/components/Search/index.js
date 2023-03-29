import { useEffect, useState } from 'react';
import {useNavigate, Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//    faCircleXmark,
//    faSearch,
//    faSpinner,
// } from '@fortawesome/free-solid-svg-icons';
import moneyFormat from '../../utils/moneyFormat';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import searchService from '../../services/searchService';
import PopupStyles from '../Popup/Popup.module.scss';
import useDebounce from '../../hooks/useDebound';
import Popup from '../Popup';
// import useStore from '../../hooks/useStore';

const cx = classNames.bind(styles);
const cy = classNames.bind(PopupStyles);

function Search({setShowModal}) {
   const [loading, setLoading] = useState(false);
   const [query, setQuery] = useState('');
   const [searchResult, setSearchResult] = useState('');
   const [show, setShow] = useState(false);
   // const inputRef = useRef()

   let debounceValue = useDebounce(query, 1000);

   useEffect(() => {
      if (!query.trim()) return;

      const fetchApi = async () => {
         const result = await searchService({ q: debounceValue });
         return result;
      };

      setLoading(true);
      const handler = setTimeout(async () => {
         const result = await fetchApi();

         setSearchResult(result || '');
         setLoading(false);
      }, 100);

      return () => {
         clearTimeout(handler);
      };
   }, [debounceValue]);

   const handleSearchText = (e) => {
      handleShow(true)
      setQuery(e.target.value)
      if (!query) setSearchResult([])
   }

   const handleClear = (e) => {
      e.stopPropagation()
      setQuery('');
      debounceValue = '';
      setSearchResult([]);
   };

   const handleShow = (value) => {
      setShow(value);
      setShowModal(value)
   };

   // const [state, dispatch] = useStore();
   const navigate = useNavigate()

   const handleDetailPage = (params) => {
      handleShow(false)
      navigate(`/${params.category}/${params.href}`);
   };


   const handleSubmit = (e) => {

      e.preventDefault()
      // setIsSubmit(true)
      handleShow(false);

      // if (searchResult.rows?.length) {

      //    console.log('has result');
      //    dispatch({
      //       type: 'GET_ALL',
      //       status: 'finished',
      //       href: '',
      //       category: `search=${debounceValue}`,
      //       payload: searchResult,
      //    });
      // } 
      navigate(`/search/${query}`);
   };

   // console.log('search re render');
   return (
      <Popup
         content={
            !!searchResult ? (
               <div className={cy('wrap')}>
                  <h2 className={cy('search-result-title')}>
                     Sản phẩm được gợi ý
                  </h2>
                  <ul>
                     {searchResult &&
                        searchResult.rows?.map((item) => {
                           return (
                              <Link
                                 to={`/${item.category}/${item.href}`}
                                 className={cy('product-item')}
                                 key={item.id}
                                 onClick={() => {
                                    handleDetailPage({
                                       href: item.href,
                                       category: item.category,
                                    });
                                 }}
                              >
                                 <div className={cy('product-img')}>
                                    <img src={item.image} alt="" />
                                 </div>
                                 <div className={cy('product-info')}>
                                    <h2 className={cy('title')}>{item.name}</h2>
                                    {item.old_price && (
                                       <>
                                          <span className={cy('old_price')}>
                                             {moneyFormat(item?.old_price)}₫
                                          </span>
                                          <span
                                             className={cy('discount-percent')}
                                          >
                                             -
                                             {(
                                                ((+item.old_price -
                                                   +item.cur_price) /
                                                   +item.old_price) *
                                                100
                                             ).toFixed(0)}
                                             %
                                          </span>
                                       </>
                                    )}
                                    <p className={cy('cur_price')}>
                                       {moneyFormat(item.cur_price)}₫
                                    </p>
                                 </div>
                              </Link>
                           );
                        })}
                  </ul>
               </div>
            ) : (
               false
            )
         }
         option={{
            visible: show && searchResult.rows?.length && query,
            appendTo: () => document.body,
            onClickOutside: () => handleShow(false),
         }}
      >
         <div className={cx('wrap')}>
            <form className={cx('form')} onSubmit={(e) => handleSubmit(e)}>
               <input
                  className={cx('input')}
                  type="text"
                  placeholder="Hôm nay bạn muốn tìm gì..."
                  value={query}
                  onChange={(e) => handleSearchText(e)}
                  onFocus={() => handleShow(true)}
                  onKeyDown={(e) => { e.key === 'Enter' && handleSubmit(e); }}
               />
               {loading && query && (
                  <button className={cx('loading-btn')}>
                     {/* <FontAwesomeIcon icon={faSpinner} /> */}
                  </button>
               )}
               {!loading && query && (
                  <button
                     className={cx('clear-btn')}
                     onClick={(e) => handleClear(e)}
                  >
                     {/* <FontAwesomeIcon icon={faCircleXmark} /> */}
                  </button>
               )}
               <button onClick={(e) => handleSubmit(e)} className={cx('search-btn')}>
                  {/* <FontAwesomeIcon icon={faSearch} /> */}
               </button>
            </form>
         </div>
      </Popup>
   );
}
export default Search;
