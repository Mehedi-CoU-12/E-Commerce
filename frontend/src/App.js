import { useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js'
import { Route, Routes} from 'react-router-dom';
import webFont from 'webfontloader'
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js'
import Products from './components/Product/Products.js';
import Search from './components/Product/Search.js';

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
            <Route path='/products' Component={Products} />
            <Route path='/products/:keyword' Component={Products} />
            <Route path='/search' Component={Search} />
        </Routes>
        <Footer/> 
    </>  
  );
}

export default App;
