import React from "react";
import image from './animations/image.png';
import styles from './styles/accordion.css';
import {  useState } from 'react';
const UltrasonicAccordion = React.memo(() => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
    const handleAccordionToggle = () => {
      setIsAccordionOpen(!isAccordionOpen);
    };
    
  
  return (
    <div className='button_bg'>
      <button className='learnmore'style={styles} onClick={handleAccordionToggle}>{isAccordionOpen ? 'Close Details' : 'Learn More'}</button>

      {isAccordionOpen && (
        <div className='para' style={styles}  data-aos="fade-in">
            <ul className='content' style={styles}>
              <li>
                <img src={image} alt="ultrasonic sensor" style={{height:'250px',width:'250px',backgroundSize:'cover'}} />
              </li>
              <li>
                <h2 style={{textAlign:'center',fontFamily:"Times new roman",fontStyle:"normal"}}>Ultrasonic Sensor</h2>
                <br/>
                <p style={{textAlign:'left',padding:'10px 30px',fontFamily:"poppins"}}>
                  <b>1. Echolocation Principle:</b> 
                        - Ultrasonic sensors emit high-frequency sound waves, measuring the time for wave reflection to determine object distance.
                   <br/>
                  <b>2. Distance Measurement:</b> 
                        - Used for non-contact distance measurement, with ranges varying from centimeters to meters.
                    <br/>
                  <b>3. Versatile Applications:</b> 
                        - Widely applied in robotics, industrial automation, automotive systems, and consumer electronics for tasks like object detection and proximity sensing.
                    <br/>
                  <b>4. Key Components:</b> 
                       - Typically composed of a transducer emitting ultrasonic waves and a receiver calculating distance based on wave travel time. Some models include adjustable sensitivity and temperature compensation.
                </p>
              </li>
            </ul>
        </div>
      )}
    </div>
  );
});
export default UltrasonicAccordion;