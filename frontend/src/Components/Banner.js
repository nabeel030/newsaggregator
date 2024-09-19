import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Banner.css'

const Banner = () => {
  return (
    <Container className="bg-light py-5 border-radius">
      <Row className="justify-content-center">
        <Col xs="auto" className="text-muted banner-muted-text">
          Welcome to Quick News
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h3 className="text-dark text-center banner-heading">
            The central website to read news from all over the worl with over 70 news sources
          </h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
