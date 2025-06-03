import { Link } from "react-router-dom";

const Breadcrumb = () => (
  <div className="flex items-center text-sm mb-8">
    <Link to="/" className="text-gray-500 hover:text-gray-900">
      Ecommerce
    </Link>
    <span className="mx-2 text-gray-400">/</span>
    <span className="font-medium text-black">Login</span>
  </div>
);

export default Breadcrumb;