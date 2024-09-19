import React, { useState, useEffect } from 'react';
import apiClient from '../Services/api';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../css/ArticleFilter.css'; // Import your custom CSS file
import '../css/StoryTemplate.css'

const ArticleFilter = ({ onFilterChange }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);

    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSource, setSelectedSource] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                const response = await apiClient.get('/api/articles/filters');
                setCategories(response.data.categories);
                setSources(response.data.sources);
            } catch (error) {
                console.error('Error fetching filter options:', error);
            }
        };

        fetchFilterOptions();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange({
            searchKeyword,
            category: selectedCategory,
            source: selectedSource,
            date: selectedDate,
        });
    };

    const handleFilterClick = (category, source) => {
        onFilterChange((prevFilters) => ({
            ...prevFilters,
            category: category,
            source: source,
        }));

        setSelectedCategory(category);
        setSelectedSource(source);
    };

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((word) => word[0].toUpperCase())
            .slice(0, 2) // Get at most 2 initials
            .join('');
    };

    const onKeywordChange = (sKeyword) => {
        setSearchKeyword(sKeyword);

        onFilterChange((prevFilters) => ({
            ...prevFilters,
            keyword: sKeyword
        }));
    }

    const onDateChange = (date) => {
        onFilterChange((prevFilters) => ({
            ...prevFilters,
            date: date
        }));

        setSelectedDate(date);
    }

    const resetFilter = () => {
        setSelectedCategory(null);
        setSelectedSource(null);
        setSearchKeyword('')
        setSelectedDate(null);

        onFilterChange({})
    }

    return (
        <>
            <Row className="mb-1 mt-4 ms-0 ps-4">
                <Col md={4}>
                    {showFilter && (
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => onKeywordChange(e.target.value)}
                            placeholder="Search By keyword"
                            className="form-control"
                        />
                    )}
                </Col>

                <Col md={4}>
                    {showFilter && (
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => onDateChange(e.target.value)}
                            className="form-control"
                        />
                    )}
                </Col>

                <Col md={4} className='d-flex justify-content-end'>
                    <Button variant="outline-success" onClick={toggleFilter}>
                        {showFilter ? 'Hide Filter' : 'Show Filter'}
                    </Button>
                    <Button variant="outline-secondary" onClick={resetFilter} className='ms-2'>
                        Reset Filter
                    </Button>
                </Col>
            </Row>
            {showFilter ?
                <div className='ps-3'>
                    <div className="category-story pb-0">
                        <div className="category-header">
                            <h5 className='m-0'>Categories</h5>
                        </div>
                        <div className="story-list">
                            {categories.map((category, index) => (
                                <div key={index} className="story-item">
                                    <div className={`story-img ${selectedCategory === category ? 'selected' : ''}`}
                                        onClick={() => handleFilterClick(category, selectedSource)}>
                                        <span>{getInitials(category)}</span>
                                    </div>
                                    <div className="story-label" title={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="category-story pt-2">
                        <div className="category-header">
                            <h5 className='m-0'>Sources</h5>
                        </div>
                        <div className="story-list">
                            {sources.map((source, index) => (
                                <div key={index} className="story-item">
                                    <div className={`story-img ${selectedSource === source ? 'selected' : ''}`}
                                        onClick={() => handleFilterClick(selectedCategory, source)}>
                                        <span>{getInitials(source)}</span>
                                    </div>
                                    <div className="story-label" title={source}>{source}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                : ''}

        </>
    );
};

export default ArticleFilter;
