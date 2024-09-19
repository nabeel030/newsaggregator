import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import apiClient from '../Services/api';
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom'; // Import useSearchParams
import ArticleFilter from './ArticleFilter'; // Import the filter component
import FeaturedArticle from './FeaturedArticle';
import LoadingSpinner from './LoadingSpinner';
import CustomPagination from './CustomPagination';
import Banner from './Banner';

const ArticleList = ({home}) => {
    const location = useLocation();

    const [articles, setArticles] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [spinner, setSpinner] = useState(false);
    const [query, setQuery] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');

    const [filters, setFilters] = useState({
        keyword: '',
        category: '',
        source: '',
        date: ''
    });

    useEffect(() => {
        const fetchArticles = async (page, filters) => {
            setSpinner(true);
            try {
                const { keyword, category, source, date } = filters;

                let articlesEndPoint = `/api/articles?page=${page}`;
                let personalisedArticlesEndPoint = `/api/personalised-articles?page=${page}`;
                
                let response; // Declare response outside the if-else block
                
                if (home) {
                    response = await apiClient.get(articlesEndPoint, {
                        params: { keyword, category, source, date },
                    });
                } else {
                    setArticles([]);
                    response = await apiClient.get(personalisedArticlesEndPoint, {
                        params: {keyword: query}
                    });
                }
                
                // You can now use response here
                
                
                setArticles(response.data.data);
                setTotalPages(response.data.last_page);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
            setSpinner(false)
        };

        fetchArticles(currentPage, filters);
    }, [currentPage, filters, location, query]);


    // Handle page change
    const handlePageChange = (page) => {
        setSearchParams({ page }); // Update the page in the URL
    };

    // Handle filter change
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters); // Update filters state
        setSearchParams({ page: 1 }); // Reset to page 1 when filters change
    };

    return (
        <>
            {home ? <Banner /> : ''}
            {
                (Array.isArray(articles) && articles.length > 0 && home) ? <FeaturedArticle article={articles[0]} /> : ''
            }


            <Container>
                <Row className="articles-wrapper">
                    {spinner ? <LoadingSpinner /> : ''}
                    {home ? <ArticleFilter onFilterChange={handleFilterChange} /> : ''}

                    <div className='d-flex justify-content-between'>
                        <h3 className='text-start mt-3'>{home ? 'News and Articles' : 'Personalised News & Articles'}</h3>
                        {!home && Array.isArray(articles) && articles.length > 0 ? 
                        <Col md={4} className='mt-3'>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by keyword"
                                className="form-control"
                            />
                        </Col> : ''
                        }
                    </div>
                    <hr />
                    {Array.isArray(articles) && articles.length > 0 ? (
                        articles.map((article) => (
                            <ArticleCard key={article.url} article={article} />
                        ))
                    ) : (
                        <div>
                            {home ? 'No news and articles available' : 'Login and save preferences to see personalised news and articles'}
                        
                        </div>
                    )}
                </Row>

                {/* Pagination Controls */}
                {Array.isArray(articles) && articles.length > 0 ?
                    <div className='d-flex justify-content-center my-3'>
                        <CustomPagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div> : ''}

            </Container>
        </>
    );
};

export default ArticleList;