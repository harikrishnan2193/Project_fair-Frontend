import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Project from './pages/Project';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { useContext } from 'react';
import { isAuthTokenContext } from './context/ContextShare';

function App() {

  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path='/project' element={<Project/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/dashboard' element={isAuthToken?<Dashboard dashboard/>:<Home/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
