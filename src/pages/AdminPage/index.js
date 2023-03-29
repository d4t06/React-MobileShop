import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import usePrivateRequest from '../../hooks/usePrivateRequest';
import styles from './Admin.module.scss';
import useRefreshToken from '../../hooks/useRefreshToken';

const cx = classNames.bind(styles);

function AdminPage() {
   const [user, setUser] = useState([]);
   const refresh = useRefreshToken();
   const privateRequest = usePrivateRequest();
   const navigate = useNavigate();
   const location = useLocation;

   useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();

      const fetch = async () => {
         try {
            const response = await privateRequest.get('/admin/users', {
               signal: controller.signal,
            });

            console.log('response.data = ', response.data);
            isMounted && setUser(response.data);

         } catch (error) {
            console.log({message: error})
            navigate('/unauthorized');
         }
      };
      fetch();

      return () => {
         isMounted = false;
         controller.abort();
      };
   }, []);

   return (
      <div className={cx('admin-page')}>
         <p className={cx('admin-page-header')}>Admin page</p>
         <table className={cx('user-table')}>
            <thead>
               <tr>
                  <th>ID</th>
                  <th style={{ width: '50%' }}>Tên</th>
                  <th >Hành động</th>
               </tr>
            </thead>

            {user?.map((user, index) => {
               return (
                  <tbody key={index}>
                     <tr>
                        <td>#</td>
                        <td>{user.username}</td>
                        <td>
                           <a href="">Xóa vĩnh viễn</a>
                        </td>
                        <td>
                           <a href="">khôi phục</a>
                        </td>
                     </tr>
                  </tbody>
               );
            })}
         </table>
      </div>
   );
}
export default AdminPage;
