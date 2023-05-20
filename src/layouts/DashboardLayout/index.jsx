import Header from '../../components/DashboardHeader'
import DashboardSibeBar from '../../components/DashboardSibeBar';

function DashboardLayout({children}) {
   return (
      <div className="app">
         <Header />
         <DashboardSibeBar/>
         <div style={{marginLeft: "200px", padding: "20px"}} className="dashboard_wrapper">
         {children}
         </div>
      </div>
   );
}

export default DashboardLayout;
