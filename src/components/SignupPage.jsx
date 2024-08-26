import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
function SignupPage({ onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    localStorage.setItem('user', JSON.stringify({ email, password }));
    onSignup();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Signup</h2>
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full p-2 text-white bg-green-500 rounded"
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default SignupPage;
