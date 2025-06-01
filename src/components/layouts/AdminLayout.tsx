import { Outlet } from 'react-router-dom';
import AdminHeader from '../commonAdmin/Header';
import AdminSidebar from '../commonAdmin/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#f6f9ff]">
      <AdminSidebar />

      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main className="p-5 overflow-auto flex-1">
          <div className="bg-white p-5 rounded shadow">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;