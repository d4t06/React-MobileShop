import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// custom hooks
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';
import useLocalStorage from '../hooks/useLocalStorage';

const PersistLogin = () => {
   const { auth } = useAuth();
   const refresh = useRefreshToken();
   const [isLoading, setIsLoading] = useState(true);
   const [persist] = useLocalStorage('persist', false) //[persist, setPersist]

   
   useEffect(() => {
      let isMounted = true;

      const verifyRefreshToken = async () => {
         try {
            await refresh();
         } catch (error) {
            console.error(error);
         } finally {
            isMounted && setIsLoading(false);
         }
      };

      !auth.token && persist ? verifyRefreshToken() : setIsLoading(false);

      return () => isMounted= false;
   }, []);

   // useEffect(() => {
   //    console.log(`isLoading = ${isLoading}`);
   //    console.log('auth =', auth);
   // }, [isLoading]);

   // console.log("persist login");
   return (
      <>
         {!persist 
            ? <Outlet />
            : isLoading 
               ? ''
               : <Outlet />}
      </>
   );
};

export default PersistLogin;
