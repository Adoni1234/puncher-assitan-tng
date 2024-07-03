// src/config.js
let apiUrl = '';

if (process.env.NODE_ENV === 'development') {
  apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4200';
} else if (process.env.NODE_ENV === 'production') {
  apiUrl = process.env.REACT_APP_API_URL || 'https://puncher-backend.somee.com';
}

const config = {
  apiUrl: apiUrl,
};

export default config;
