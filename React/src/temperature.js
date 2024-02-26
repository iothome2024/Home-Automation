import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
const TemperatureGraph = () => {
    const [sensorData, setSensorData] = useState([]);
    const fetchData = () => {
      axios.get('http://127.0.0.1:5000/temperature')
        .then(response => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            const dataObject = response.data[0];
            if (dataObject.records && Array.isArray(dataObject.records)) {
              const formattedData = dataObject.records.map(record => ({
                time: new Date(record._time).toLocaleString(),
                value: record._value,
                field: record._field
              }));
              //console.log('Formatted data for chart:', formattedData);
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
    const axisLabelStyle = {
        fill: 'white',
      };
    return(
        <div>
          <LineChart width={800} height={500} data={sensorData}>
              <XAxis dataKey="time" tick={axisLabelStyle} />
              <YAxis dataKey="value" tick={axisLabelStyle} />
              <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" borderRadius="20px" />
              <Tooltip  contentStyle={{ backgroundColor: 'rgba(255,255,255)', border: 'none', borderRadius: '15px', color: 'black' }} />
              <Legend iconType="circle" wrapperStyle={{ color: 'white' }} />
              <Line type="monotone" dataKey="value" name="Temperature" stroke="blue" strokeWidth={1.5} dot={{ stroke: 'white', fill: 'blue', strokeWidth: 2, r: 4 }} />
              <Brush dataKey="time" height={20} stroke="rgb(22, 38, 183)" fill="rgba(255, 255, 255, 0.3)"  borderRadius="20px" />
              <ReferenceLine x="time" stroke="red"  />
            </LineChart>
        </div>
    )
};

export default TemperatureGraph;