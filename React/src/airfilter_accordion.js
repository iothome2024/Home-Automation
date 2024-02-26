import React from "react";
import image from './animations/airquality.jpg';
import styles from './styles/accordion.css';
import {  useState } from 'react';
const AirQualityAccordion = React.memo(() => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
    const handleAccordionToggle = () => {
      setIsAccordionOpen(!isAccordionOpen);
    };
    
  
    return (
      <div className='button_bg2'>
        <button className='learnmore'style={styles} onClick={handleAccordionToggle}>{isAccordionOpen ? 'Close Details' : 'Learn More'}</button>
  
        {isAccordionOpen && (
          <div className='para' style={styles}  data-aos="fade-in">
            {/* Detailed information about the ultrasonic sensor */}
              <ul className='content' style={styles}>
                <li>
                  <img src={image} alt="Air filter sensor" style={{height:'250px',width:'250px',backgroundSize:'cover'}} />
                </li>
                <li>
                <h2 style={{textAlign:'center',fontFamily:"Times new roman",fontStyle:"normal"}}>Air Quality Sensor</h2>
                <br/>
                <p style={{textAlign:'left',padding:'10px 30px',fontFamily:"poppins"}}>
                  <b>1.Particulate Matter Sensing:</b> 
                          The GP2Y10 sensor is designed to detect and measure the concentration of particulate matter in the air, especially fine dust particles.
                   <br/>
                  <b>2.Air Quality Assessment:</b> 
                          Primarily used for assessing air quality in indoor environments by quantifying the presence of dust and particulates.
                    <br/>
                  <b>3.Infrared Sensing Technology</b> 
                        Utilizes an infrared LED and photodetector to calculate the level of dust particles based on the light scattered or reflected by the particles.
                    <br/>
                  <b>4.Compact and Precise:</b> 
                        Compact in size and offers a relatively precise measurement of particulate concentration, suitable for applications like air purifiers and air quality monitoring devices.
                </p>
                </li>
              </ul>
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    );
  });

export default AirQualityAccordion;