import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/FeaturedArticle.css'; // Import CSS for styling
import PlaceholderImage from '../Images/placeholder.jpg';
import Moment from 'react-moment';

const FeaturedArticle = ({article}) => {
  return (
    <Container className="my-5 border-radius mb-2">
      <Row className="featured-article align-items-stretch">
        {/* Left: Image Section */}
        <Col md={6} className="p-0">
          <img
            src={article.image_url ? article.image_url : PlaceholderImage} alt={article.title}
            className="img-fluid featured-img"
          />
        </Col>

        {/* Right: Info Section */}
        <Col md={6} className="p-4 d-flex flex-column justify-content-between text-start">
          {/* Muted text at the top */}
          <div className="text-muted" style={{ fontSize: '14px' }}>
            {article.source} - <Moment fromNow>{article.published_at}</Moment>
          </div>

          <h2 className="featured-title">
              {article.title}
          </h2>

          <div className="text-muted featured-summary" style={{ fontSize: '14px' }}>
             {article.description}
          </div>

          {/* h5: Subheading or author information */}
          <div className='d-flex justify-content-between'>
            <h5 className="featured-author">
              {article.author}
            </h5>
            <a href={article.url} className="see-all-link" target='_blank'>Read more →</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturedArticle;
