import React from "react";
import image from './animations/temp.png';
import styles from './styles/accordion.css';
import {  useState } from 'react';
const TemperatureAccordion = React.memo(() => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
    const handleAccordionToggle = () => {
      setIsAccordionOpen(!isAccordionOpen);
    };
    
  
    return (
      <div className='button_bg1'>
        <button className='learnmore'style={styles} onClick={handleAccordionToggle}>{isAccordionOpen ? 'Close Details' : 'Learn More'}</button>
  
        {isAccordionOpen && (
          <div className='para' style={styles}  data-aos="fade-in">
            {/* Detailed information about the ultrasonic sensor */}
              <ul className='content' style={styles}>
                <li>
                  <img src={image} alt="Temperature sensor" style={{height:'250px',width:'250px',backgroundSize:'cover'}} />
                </li>
                <li>
                  <h2 style={{textAlign:'center',fontFamily:"Times new roman",fontStyle:"normal"}}>Temperature Sensor</h2>
                  <br/>
                  <p style={{textAlign:'left',padding:'10px 30px',fontFamily:"poppins"}}>
                    <b>1.Hygrometer and Thermometer Combo:</b> 
                          The DHT11 sensor combines a humidity sensor (hygrometer) and a temperature sensor (thermometer) in a single module.
                    <br/>
                    <b>2.Environment Monitoring:</b> 
                          Primarily used for monitoring ambient conditions, providing simultaneous measurements of relative humidity and temperature.
                      <br/>
                    <b>3.Low-Cost Solution:</b> 
                          Known for its affordability and simplicity, making it a popular choice for hobbyist projects, home automation, and basic weather stations
                      <br/>
                    <b>4.Digital Output:</b> 
                          Outputs digital signals that can be easily read by microcontrollers, simplifying integration with various electronic systems.
                  </p>
                </li>
              </ul>
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    );
  });

export default TemperatureAccordion;