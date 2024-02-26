// NavbarComponent.js
import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Aos from "aos";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/main.css";
import BulbPage from "./blinkled.js";

function NavbarComponent() {
  const [showBulbPage, setShowBulbPage] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleToggleBulbPage = () => {
    setShowBulbPage(!showBulbPage);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ right: "0", top: "0", left: "0", bottom: "0" }}
      >
        <Container style={{ margin: "0px 20px", borderRadius: "15px" }}>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ fontSize: "30px", fontWeight: "500", marginRight: "50px" }}
          >
            Home Automation
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/"
                style={styles}
                className="home"
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="https://docs.google.com/document/d/e/2PACX-1vTiHRq6yYC3WJDNK7dRni3fbA-5kXxlFx3TRGTVL1KcCuhhFpzSDJRto0pSNklG-BMRp5MecGolR_c_/pub"
                style={styles}
                className="home"
              >
                Docs
              </Nav.Link>
              <NavDropdown
                title="Sensors"
                style={styles}
                id="basic-nav-dropdown"
                className="home"
              >
                <NavDropdown.Item
                  onClick={() => scrollToSection("airsection")}
                >
                  Air Quality Sensor
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => scrollToSection("tempsection")}
                >
                  Temperature Sensor
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => scrollToSection("ultrasection")}
                >
                  Ultrasonic Sensor
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/bulb" onClick={handleToggleBulbPage}>
                  Blink an LED
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showBulbPage && (
        <div
          style={{
            position: "absolute",
            top: "70px", // Adjust this value based on your navbar height
            width: "100%",
          }}
        >
          <BulbPage onClose={() => setShowBulbPage(false)} />
        </div>
      )}
    </>
  );
}

export default NavbarComponent;
