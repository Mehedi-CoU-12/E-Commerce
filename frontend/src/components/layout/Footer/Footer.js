import React from 'react'   
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import './Footer.css';

function Footer() {
  return (
    <footer id="footer" >
    
        <div className="leftFooter" >
            <h4>Download Our App</h4>
            <p>Download Our App For Android and IOS Mobile Phone</p>
            <img src={playStore} alt='playStore' />
            <img src={appStore} alt='appStore' />
        </div>

        <div className="midFooter" >
            <h1>ECOMMERCE.</h1>
            <p>High Quality is Our First Priority</p>
            <p>Copyrights 2024 &copy; MeMehedi</p>
        </div>

        <div className="rightFooter" >
            <h4>Follow Us</h4>
            <a href='http://facebook.com/mehedi' >Facebook</a>
            <a href='http://instagram.com/mehedi' >Instagram</a>
            <a href='http://youtube.com/mehedi' >YouTube</a>
        </div>
        
    </footer>
  )
}

export default Footer