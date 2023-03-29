import { useState } from "react";
import { useSelector } from "react-redux"
import { selectedAllFilter } from "../store/filtersSlice"

const useFilter = () => {
    const filtersFromStore = useSelector(selectedAllFilter);
    // console.log("filtersFromStore", filtersFromStore)
    const [filters, setFilters] = useState(filtersFromStore)

    const handleFilter = (filter, by) => {
        let newFilters = { ...filters };
          // console.log("old product filters = ", newFilters)
          // console.log('product filter = ', filters, by);
    
          // nếu chọn tất cả
          if (!filter) {
             delete newFilters[by];
          } else {
             newFilters[by] = filter;
          }
    
          // nếu không có filter gì cả
          if (!newFilters.price && !newFilters.brand) newFilters = '';
    
          
          console.log('newFilters =', newFilters); 
          setFilters(newFilters)
        }
        console.log("useFilter = ", filters)
    return [filters, handleFilter];
}

export default useFilter