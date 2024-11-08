import { useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js'
import {BrowserRouter as Router} from 'react-router-dom';
import webFont from 'webfontloader'

function App() {

    useEffect(()=>{
        webFont.load({
            google:{
                families:['Roboto','Droid Sans','Chilanka'],
            }
        })
    },[])

  return (
    <Router>
        <Header/>
        <Footer/>   
    </Router>
  );
}

export default App;
