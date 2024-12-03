import { useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js'
import { Route, Routes} from 'react-router-dom';
import webFont from 'webfontloader'
import Home from './components/Home/Home.js';

function App() {

    useEffect(()=>{
        webFont.load({
            google:{
                families:['Roboto','Droid Sans','Chilanka'],
            }
        })
    },[])

  return (
    <>
        <Header/>
        <Routes>    
            <Route path='/' Component={Home} />
        </Routes>
        <Footer/> 
    </>  
  );
}

export default App;
