// Footer.js
import React from 'react';
import styles from './styles/footer.css';


const Footer = () => {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
    
        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",    
          });
        }
      };
    
  return (
    <footer style={styles} className='footer-container'>
        <div className='footer-padding'>
            <div className='footer-links'>
                <div className='footer-links-div'>
                    <h3>Our Website</h3>
                    <hr />
                    <a href='/'className='a' ><h1>Home Automation</h1></a>
                </div>
                <div className='footer-links-div'>
                    <h3>Services</h3>
                    <hr></hr>
                    <a className='a' onClick={() => scrollToSection("basic-nav-dropdown")}>Sensors </a>
                    <a href='/AboutUs' className='a'>About Us</a>
                    <a href='https://docs.google.com/document/d/e/2PACX-1vTiHRq6yYC3WJDNK7dRni3fbA-5kXxlFx3TRGTVL1KcCuhhFpzSDJRto0pSNklG-BMRp5MecGolR_c_/pub'className='a' >Documentation</a>
                </div>
                <div className='footer-links-div'>
                    <h3>Contact Us</h3>
                    <hr></hr>
                    <h6>Phone : +91 9014517595</h6>
                    <h6>Email : 2024iot_project@gmail.com</h6>
                    <h6>Location : CyberTowers, Hyderabad</h6>
                    <h6></h6>
                </div>
            </div>
        </div>
        
    <p className='copyright' style={{textAlign:'center', letterSpacing:'20px'}}>&copy; 2024 All Rights Reserved</p>
    </footer>
  );
};


export default Footer;
