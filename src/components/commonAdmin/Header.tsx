import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header className="bg-white w-full h-16 shadow-md flex items-center px-6 justify-between">
      <form>
        <input
          className="border rounded-md w-[300px] px-3 py-1"
          type="text"
          placeholder="Tìm kiếm"
        />
      </form>
      <div className="space-x-4">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </header>
  );
};

export default AdminHeader;