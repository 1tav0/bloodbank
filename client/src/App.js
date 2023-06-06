import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index';
import Register from './pages/Register/index'
import Login from './pages/Login/index'
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
