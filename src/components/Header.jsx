import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Col,
  Collapse,
  Container,
  FloatingLabel,
  Form,
  ListGroup,
  Modal,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faBars,
  faLocationDot,
  faSearch,
  faTimes,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

import useInput from "../hooks/use-input";
import Brand from "./Brand";
import SearchedCityPage from "../pages/SearchedCity";
import { manuallySetTheme } from "../store/theme/theme-slice";

const Header = ({ searched }) => {
  const [modal, setModal] = useState(false);
  const [offcanvas, setOffcanvas] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const dispatch = useDispatch();
  const locationsState = useSelector((state) => state.location);
  const { location } = locationsState;
  const theme = useSelector((state) => state.theme.theme);

  const {
    state: { input: city },
    handleOnChange: handleCityOnChange,
  } = useInput();

  const handleModal = () => setModal(!modal);
  const handleOffcanvas = () => setOffcanvas(!offcanvas);
  const handleCollapse = () => setCollapse(!collapse);

  const toggleTheme = () => {
    dispatch(manuallySetTheme(theme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <>
      <header className="App-header py-3">
        <Container>
          <Row className="align-items-center">
            <Col xs="2">
              {searched ? (
                <Link to="..">
                  <FontAwesomeIcon icon={faAngleLeft} size="xl" />
                </Link>
              ) : (
                <FontAwesomeIcon
                  className="d-md-none"
                  icon={faBars}
                  size="xl"
                  style={{ cursor: "pointer" }}
                  onClick={handleOffcanvas}
                />
              )}
            </Col>
            <Col xs="6">
              {location !== null && (
                <span className="h4">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span className="ms-2">{location}</span>
                </span>
              )}
            </Col>
            <Col xs="2">
              {!searched && (
                <FontAwesomeIcon
                  icon={faSearch}
                  size="xl"
                  style={{ cursor: "pointer" }}
                  onClick={handleModal}
                />
              )}
            </Col>
            <Col xs="2">
              <Button onClick={toggleTheme} variant="outline-secondary" size="sm">
                <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
              </Button>
            </Col>
          </Row>
        </Container>
      </header>
      {window.matchMedia("(max-width: 768px").matches ? (
        <Offcanvas show={modal} onHide={handleModal} placement="bottom">
          <Offcanvas.Header className="d-block p-4">
            <div className="d-flex align-items-start mb-3">
              <span className="h4">Search City</span>
              <FontAwesomeIcon
                icon={faTimes}
                size="xl"
                className="ms-auto"
                style={{ cursor: "pointer" }}
                onClick={handleModal}
              />
            </div>
            <FloatingLabel label="Search City">
              <Form.Control
                type="text"
                name="city"
                placeholder="Searcy City"
                value={city}
                onChange={handleCityOnChange}
                autoComplete="off"
              />
            </FloatingLabel>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup>
              <SearchedCityPage city={city} />
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      ) : (
        <Modal
          show={modal}
          onHide={handleModal}
          fullscreen="md-down"
          centered
          scrollable
        >
          <Modal.Header className="d-block">
            <div className="d-flex align-items-start mb-3">
              <span className="h4">Search City</span>
              <FontAwesomeIcon
                icon={faTimes}
                size="xl"
                className="ms-auto"
                style={{ cursor: "pointer" }}
                onClick={handleModal}
              />
            </div>
            <FloatingLabel label="Search City">
              <Form.Control
                type="text"
                name="city"
                placeholder="Search City"
                value={city}
                onChange={handleCityOnChange}
                autoComplete="off"
              />
            </FloatingLabel>
          </Modal.Header>
          <Modal.Body style={city === "" ? undefined : { height: "300px" }}>
            <ListGroup>
              <SearchedCityPage city={city} />
            </ListGroup>
          </Modal.Body>
        </Modal>
      )}
      <Offcanvas show={offcanvas} onHide={handleOffcanvas} placement="start">
        <Offcanvas.Header>
          <Brand
            className="d-flex align-items-center text-center"
            onClick={handleOffcanvas}
          />
          <FontAwesomeIcon
            icon={faTimes}
            size="xl"
            className="ms-auto"
            style={{ cursor: "pointer" }}
            onClick={handleOffcanvas}
          />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Offcanvas.Title>Developer Contact</Offcanvas.Title>
          <Button
            type="button"
            variant="link"
            className="d-flex align-items-center w-100 px-0 mb-3"
            onClick={handleCollapse}
          >
            <img
              src="https://avatars.githubusercontent.com/u/69708483?s=400&u=7e5e2f43e9d02dec298e7bb375f265db157e20c1&v=4"
              width={48}
              alt="Developer Icon"
              className="rounded-circle"
            />
            <div className="text-start ms-3">
              <span>Sameer Mankotia</span>
              <br />
              <span className="text-muted">MERN Developer</span>
            </div>
            <div className="ms-auto">
              <motion.div
                animate={collapse ? { rotateZ: 180 } : { rotateZ: 0 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
              >
                <FontAwesomeIcon icon={faAngleDown} size="lg" />
              </motion.div>
            </div>
          </Button>
          
          {/* Additional information in collapse (optional) */}
          <Collapse in={collapse}>
            <div className="mt-3">
              {/* You can add additional information here if needed */}
            </div>
          </Collapse>
        </Offcanvas.Body>
      </Offcanvas>
      <footer className="text-center py-3">
        <Container>
          <p className="mb-0">Created by Sameer Mankotia</p>
        </Container>
      </footer>
    </>
  );
};

export default Header;