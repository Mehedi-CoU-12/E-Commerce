import { useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js'
import { Route, Routes} from 'react-router-dom';
import webFont from 'webfontloader'
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js'

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
            <Route path='/product/:id' Component={ProductDetails} />
        </Routes>
        <Footer/> 
    </>  
  );
}

export default App;
