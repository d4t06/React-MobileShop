


import useStore from "../hooks/useStore";
import {getAll} from '../store/actions'



const handleFilter = (filters, by, state) => {

    console.log("filters");

    const newFilters = {...state}; // lay tu state
    newFilters[by] = filters; // cap nhap

    console.log(newFilters)
    return newFilters

 };

 function Filter() {
    const [state, dispatch] = useStore()
        const showFilteredResults = (filters) => {
            // const {data, status, href, ...rest} = state
            // getAll(dispatch, {...rest ,filters:filters})
        }

        // if (newFilters) showFilteredResults(newFilters)
 }
 
 export default Filter;
export {handleFilter};


