import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header className="bg-white w-full shadow-md flex p-4 relative z-50">
      <div className="logo w-1/5">Admin</div>
      <div className="right-header w-4/5 flex justify-between">
        <form>
          <input
            className="border rounded-md w-[350px] px-2 py-1"
            type="text"
            placeholder="Tìm kiếm"
          />
        </form>
        <div className="space-x-4">
          <Link to={'logout'}>Logout</Link>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;