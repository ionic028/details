import  { useState } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);  // This should trigger the logout and show the login page
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        showSignup ? (
          <SignupPage onSignup={handleSignup} />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
      {!isAuthenticated && (
        <button
          className="absolute bottom-4 right-4 p-2 text-white bg-blue-500 rounded"
          onClick={() => setShowSignup(!showSignup)}
        >
          {showSignup ? 'Go to Login' : 'Go to Signup'}
        </button>
      )}
    </div>
  );
}

export default App;
