import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import ProductDetailItem from '../../components/DetailProductItem';
import * as productServices from '../../services/productServices';

function DetailPage() {
   const { category, key } = useParams()
   const [product, setProduct] = useState('');

   useEffect(() => {
      const fetchData = async () => {
         const response = await productServices.getProductDetail({href: key, category: category})
         console.log(response);
         if (response) setProduct(response)
      }
      fetchData()
   }, [key])

   //product = [{name:adf,price:.....}]
   return <> {product && <ProductDetailItem data={product[0]} />} </>
}
export default DetailPage;
