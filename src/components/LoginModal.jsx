import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (username && password) {
      setLoading(true);
      setError('');
      try {
        await onLogin(username); // Trigger login with username (assume async function)
        setLoading(false);
        onClose(); // Close modal on successful login
      } catch (err) {
        setLoading(false);
        setError('Invalid credentials, please try again.');
      }
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    isOpen && (
      <div
        className='fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center'
        onClick={onClose}
      >
        <div
          className='bg-white p-6 border border-gray-300 rounded-lg shadow-lg relative z-60'
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <h2 className='text-2xl font-bold text-gray-900'>Login</h2>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='mt-4 p-2 border border-gray-300 rounded w-full'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-4 p-2 border border-gray-300 rounded w-full'
          />
          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
          <button
            onClick={handleLogin}
            className='mt-4 px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    )
  );
};

export default LoginModal;
