import React from 'react';
import { Col, Card } from "react-bootstrap";
import dateFormat from 'dateformat';
import Moment from 'react-moment';
import '../css/ArticleCard.css'; // Import the CSS file for styling
import PlaceholderImage from '../Images/placeholder.jpg';

const ArticleCard = ({ article }) => {
  return (
    <Col xs={12} md={4} lg={3} className="single-article">
        <a href={article.url} target='_blank'> 
          <Card className="fixed-height-card">
            {/* Article Image: Fallback to placeholder if no image is available */}
            <Card.Img
              src={article.image_url ? article.image_url : PlaceholderImage}
              variant="top"
            />

            <Card.Body className="card-body text-start p-1">
                <small className="text-muted">
                    <strong>{article.source}</strong> - &nbsp;          
                    <Moment fromNow>{article.published_at}</Moment>
                </small>
              {/* Article Title */}
              <Card.Title className="card-title mt-2">{article.title}</Card.Title>

              {/* Article Description */}
              <div
                className="card-text my-2"
                dangerouslySetInnerHTML={{
                  __html: article.description ? article.description : ''
                }}
              />

                <small className="text-muted d-flex justify-content-between">
                    <strong className='text-danger'>{article.category}</strong>
                    <strong>{article.author ? article.author : 'Anonymous'}</strong>
                    </small>
            </Card.Body>
          </Card>
        </a>
    </Col>
  );
};

export default ArticleCard;
