import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)'
      }}>
        <h1>Welcome to MedStore</h1><br></br>
        <h6>Efficiently Manage Your Medical Inventory with MedStore...</h6><br></br>
        <div>
          <p style={{ textIndent: '45px' }}>Login above to continue...</p>
          <p>Don't have an account?<a href='/register'> Sign Up</a> here...</p>
        </div>
      
      </div>
    </div>
  );
}

export default App;
