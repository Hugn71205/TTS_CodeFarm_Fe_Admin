import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

const Customers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8888/auth/list')
      setUsers(response.data)
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      setLoading(false)
    }
  }

  const toggleBlockUser = async (user) => {
    const action = user.isBlocked ? 'mở khóa' : 'khóa'
    const confirmAction = window.confirm(`Bạn có chắc chắn muốn ${action} người dùng này?`)
    if (!confirmAction) return

    try {
      setUpdatingId(user._id)
      await axios.patch(`http://localhost:8888/auth/block/${user._id}`, {
        isBlocked: !user.isBlocked,
      })
      fetchUsers() // reload danh sách
    } catch (err) {
      alert(`Không thể ${action}: ` + (err.response?.data?.message || err.message))
    } finally {
      setUpdatingId(null)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách khách hàng</h2>

      {loading && <p className="text-gray-500">Đang tải dữ liệu khách hàng...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {!loading && !error && (
        <>
          {users.length === 0 ? (
            <p className="text-gray-500">Không có người dùng nào.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tên</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SĐT</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Vai trò</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Trạng thái</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ngày tạo</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{user.name}</td>
                      <td className="px-4 py-3 text-sm">{user.email}</td>
                      <td className="px-4 py-3 text-sm">{user.sdt || 'Chưa có'}</td>
                      <td className="px-4 py-3 text-sm">
                        {user.isAdmin ? (
                          <span className="text-green-600 font-semibold">Admin</span>
                        ) : (
                          <span className="text-gray-600">Khách</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {user.isBlocked ? (
                          <span className="text-red-500 font-medium">Đã khóa</span>
                        ) : (
                          <span className="text-green-500">Hoạt động</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">{dayjs(user.createdAt).format('DD/MM/YYYY')}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleBlockUser(user)}
                          disabled={updatingId === user._id}
                          className={`px-4 py-2 text-white text-sm rounded-md transition-all ${
                            updatingId === user._id
                              ? 'bg-gray-400 cursor-not-allowed'
                              : user.isBlocked
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-red-600 hover:bg-red-700'
                          }`}
                        >
                          {updatingId === user._id
                            ? 'Đang xử lý...'
                            : user.isBlocked
                            ? 'Mở khóa'
                            : 'Khóa'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Customers
