import React from 'react';
import UltrasonicGraph from './ultrasonicgraph';
import TemperatureAccordion from './temp_accordion.js';
import Footer from './footer.js';
import AirqualityGraph from './airquality.js';
import AirQualityAccordion from './airfilter_accordion.js';
import NavbarComponent from './navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BulbPage from './blinkled.js';


function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <Routes>
          <Route path="/" />
          <Route path="/bulb" element={<BulbPage />} />
        </Routes>
        <UltrasonicGraph />
        <TemperatureAccordion />
        <AirqualityGraph />
        <AirQualityAccordion />
        <Footer />
      </div>
    </Router>
  );
}

// const HomePage = () => {
//   return (
//     <div>
//       {/* Add any content you want to display on the home page */}
//       <h1>Welcome to the Home Page</h1>
//     </div>
//   );
// };

export default App;
