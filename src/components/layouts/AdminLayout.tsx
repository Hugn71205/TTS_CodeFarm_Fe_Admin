import { Outlet } from 'react-router-dom'
import AdminHeader from '../commonAdmin/Header'
import AdminSidebar from '../commonAdmin/Sidebar'

const AdminLayout = () => {
    return (
        <main className='bg-[#f6f9ff]'>
            <AdminHeader/>
            <div className='flex'>
            <AdminSidebar/>
            <div className='content w-full p-5'>
                <div className='bg-white p-5'>
                <Outlet/>
                </div>
            </div>
            </div>
        </main>
      )
}

export default AdminLayout