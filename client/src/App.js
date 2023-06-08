import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index';
import Register from './pages/Register/index'
import Login from './pages/Login/index'
import { ConfigProvider } from 'antd';
import ProtectedPage from './components/ProtectedPage'; //way of keeping authorixation logic separetely from home 
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import { useEffect } from 'react';
import { SetLoading } from './redux/loadersSlice';

function App() {
  //for spinner to show when we refresh the home page 
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loaders)

  useEffect(() => {
    //check if user is logged in 
    const token = localStorage.getItem("token")
    if(token){
      dispatch(SetLoading(true))
    }
  },[])
  return (
    <div>
      {loading && <Spinner />}
      <ConfigProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<ProtectedPage><Home /></ProtectedPage>} />
            <Route exact path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </div>
  );
}

export default App;
