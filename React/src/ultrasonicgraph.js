import React, { useEffect, useState } from 'react';
import TemperatureGraph from './temperature';
import axios from 'axios';
import styles from './styles/main.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import useTypingEffect from './animations/typing';
import UltrasonicAccordion from './ultra_accordion';



import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ReferenceLine,
} from 'recharts';


const UltrasonicGraph = () => {
  const [sensorData, setSensorData] = useState([]);
  const { typedText, isTypingComplete } = useTypingEffect('Ultrasonic Sensor Data');

  const fetchData = () => {
    axios.get('http://127.0.0.1:5000')
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const dataObject = response.data[0];
          if (dataObject.records && Array.isArray(dataObject.records)) {
            const formattedData = dataObject.records.map(record => ({
              time: new Date(record._time).toLocaleString(),
              value: record._value,
              field: record._field
            }));
            console.log('Formatted data for chart:', formattedData);
            setSensorData(formattedData);
          } else {
            console.error('Invalid data structure received from Flask - missing records array:', dataObject);
          }
        } else {
          console.error('Invalid data structure received from Flask - empty or not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Fetch data every 10 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchData, 200000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const backgroundStyle = {
    position: 'absolute',
    width: '100%',
    height: '800px', 
    overflow: 'hidden',
    background: 'linear-gradient(rgb(10, 31, 101), rgb(2, 1, 7))'
  };

  const pseudoElementStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // background: `url(${image})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover',
    // filter: 'blur(20px)',
    
  };

  const chartContainerStyle = {
    position: 'relative',
    height: '800px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'rgb(34, 44, 137)',
  };
  const lineChartStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '10px',
    padding: '20px',
    Transition:'5s'
  };
  const axisLabelStyle = {
    fill: 'white',
  };

  useEffect(() =>{
    Aos.init({duration:2000})
  }
  );
  return (
    <div style={{height:'auto'}}>
      <div style={backgroundStyle}>
        <div style={pseudoElementStyle}></div>
      </div>
      <div id="ultrasection">
        <div className="container" style={chartContainerStyle}>
        <h1  style={{ marginBottom: isTypingComplete ? '60px' : '0', fontSize: '60px', color: 'white' }}>{typedText}</h1>
          {isTypingComplete && (
            <div style={lineChartStyle} data-aos="fade-in">
              <LineChart width={800} height={500} data={sensorData}>
                <XAxis dataKey="time" tick={axisLabelStyle} />
                <YAxis dataKey="value" tick={axisLabelStyle} />
                <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" borderRadius="20px" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255)', border: 'none', borderRadius: '15px', color: 'black' }} />
                <Legend iconType="circle" wrapperStyle={{ color: 'white' }} />
                <Line type="monotone" dataKey="value" name='Distance' stroke="blue" strokeWidth={1.5} dot={{ stroke: 'white', fill: 'blue', strokeWidth: 2, r: 4 }} />
                <Brush dataKey="time" height={20} stroke="rgb(22, 38, 183)" fill="rgba(255, 255, 255, 0.3)"  borderRadius="20px" />
                <ReferenceLine x="time" stroke="red"  />
              </LineChart>
            </div>
          )}
        </div>
      </div>
      <UltrasonicAccordion/>
      <div id="tempsection">
        <div className='background' style={styles}>
          <div className='container2'data-aos="fade-right" style={chartContainerStyle}>
            <h1 style={styles} className='headi' data-aos="fade-up">Temperature Sensor Data</h1>
            <div style={lineChartStyle} data-aos="fade-in">
              <TemperatureGraph/>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default UltrasonicGraph;
