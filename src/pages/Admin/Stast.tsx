import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { FaChartLine, FaBoxOpen } from "react-icons/fa";


type ProductStats = {
  name: string;
  quantitySold: number;
};


const StatsPage = () => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [topProducts, setTopProducts] = useState<ProductStats[]>([]);


  useEffect(() => {
    axios.get("http://localhost:8888/stats/total-revenue")
      .then(res => setTotalRevenue(res.data.totalRevenue))
      .catch(console.error);


    axios.get("http://localhost:8888/stats/top-products")
      .then(res => setTopProducts(res.data))
      .catch(console.error);
  }, []);


  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        📊 Thống kê hệ thống
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-2xl shadow-lg flex items-center">
          <div className="text-green-700 text-4xl mr-4">
            <FaChartLine />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Tổng doanh thu năm</p>
            <p className="text-3xl font-bold text-green-800 mt-1">
              {totalRevenue.toLocaleString()} VND
            </p>
          </div>
        </div>


        <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 p-6 rounded-2xl shadow-lg flex items-center">
          <div className="text-indigo-700 text-4xl mr-4">
            <FaBoxOpen />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Tổng sản phẩm thống kê</p>
            <p className="text-3xl font-bold text-indigo-800 mt-1">
              {topProducts.length} sản phẩm
            </p>
          </div>
        </div>
      </div>


      <div className="bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Top 5 sản phẩm bán chạy</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="quantitySold" fill="#6366f1" name="Số lượng bán" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default StatsPage;


