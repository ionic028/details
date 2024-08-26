import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function Dashboard({ onLogout }) {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleAddOrUpdateUser = () => {
    if (editingIndex !== null) {
      const updatedUsers = users.map((user, index) =>
        index === editingIndex ? { name, age, date } : user
      );
      setUsers(updatedUsers);
      setEditingIndex(null);
    } else {
      setUsers([...users, { name, age, date }]);
    }
    setName('');
    setAge('');
    setDate('');
  };

  const handleEditUser = (index) => {
    setEditingIndex(index);
    setName(users[index].name);
    setAge(users[index].age);
    setDate(users[index].date);
  };

  const handleDeleteUser = (index) => {
    const filteredUsers = users.filter((_, i) => i !== index);
    setUsers(filteredUsers);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          className="p-2 text-white bg-red-500 rounded"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="p-2 border rounded"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="date"
          className="p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className="p-2 text-white bg-blue-500 rounded"
          onClick={handleAddOrUpdateUser}
        >
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Age</th>
            <th className="p-2 border-b">Date</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td className="p-2 border-b">{user.name}</td>
              <td className="p-2 border-b">{user.age}</td>
              <td className="p-2 border-b">{user.date}</td>
              <td className="p-2 border-b">
                <button
                  className="mr-2 text-blue-500"
                  onClick={() => handleEditUser(index)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteUser(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
