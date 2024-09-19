import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Toast, ToastContainer } from 'react-bootstrap';
import apiClient from '../Services/api';
import LoadingSpinner from '../Components/LoadingSpinner';

const PreferencesForm = () => {
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false); // State to control toast visibility
    const [toastVariant, setToastVariant] = useState(''); // State to control toast variant (success or error)

    useEffect(() => {
        const fetchPreferencesData = async () => {
            try {
                const response = await apiClient.get('/api/preferences-data');
                setCategories(response.data.categories);
                setSources(response.data.sources);
                setAuthors(response.data.author);
                setSelectedCategories(response.data.userCategories);
                setSelectedSources(response.data.userSources);
                setSelectedAuthors(response.data.userAuthors);
            } catch (error) {
                console.error('Error fetching preferences data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPreferencesData();
    }, []);

    // Handle form submission to save preferences
    const handleSavePreferences = async () => {
        setSaving(true);
        setMessage('');
        try {
            const response = await apiClient.post('/api/preferences/save', {
                categories: selectedCategories,
                sources: selectedSources,
                authors: selectedAuthors,
            });
            setMessage(response.data.msg || 'Preferences saved successfully!');
            setToastVariant('success');
        } catch (error) {
            console.error('Error saving preferences:', error);
            setMessage('Failed to save preferences! Try again.');
            setToastVariant('danger');
        } finally {
            setSaving(false);
            setShowToast(true); // Show the toast
        }
    };

    // Handle checkbox change
    const handleCheckboxChange = (value, setSelected, selectedValues) => {
        if (selectedValues.includes(value)) {
            setSelected(selectedValues.filter((item) => item !== value));
        } else {
            setSelected([...selectedValues, value]);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <div className='d-flex justify-content-between'>
                        <h4 className="mb-0">Select options for personalised news</h4>
                        <Button variant="outline-success" onClick={handleSavePreferences}>
                            Save Preferences
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col md={12} className='text-start'>
                                <h5>Categories</h5>
                                <Row>
                                    {categories.map((category, index) => (
                                        <Col xs={6} sm={4} md={2} key={`category-${index}`} className="mb-2"> {/* 3 columns per row */}
                                            <Form.Check
                                                inline
                                                type="checkbox"
                                                value={category}
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleCheckboxChange(category, setSelectedCategories, selectedCategories)}
                                                id={`category-${index}`}
                                                label={
                                                    <span title={category} style={{
                                                        display: 'inline-block',
                                                        maxWidth: '150px', // Set max width
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}>
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </span>
                                                }
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="text-start mt-4">
                                <h5>Sources</h5>
                                <Row>
                                    {sources.map((source, index) => (
                                        <Col xs={6} sm={4} md={2} key={`source-${index}`} className="mb-2"> {/* 3 columns per row */}
                                            <Form.Check
                                                inline
                                                type="checkbox"
                                                value={source}
                                                checked={selectedSources.includes(source)}
                                                onChange={() => handleCheckboxChange(source, setSelectedSources, selectedSources)}
                                                id={`source-${index}`}
                                                label={
                                                    <span title={source} style={{
                                                        display: 'inline-block',
                                                        maxWidth: '150px', // Set max width
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}>
                                                        {source}
                                                    </span>
                                                }
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col md={12} className='text-start'>
                                <h5>Authors</h5>
                                <Row>
                                    {authors.map((author, index) => (
                                        <Col xs={6} sm={4} md={2} key={`author-${index}`} className="mb-2"> {/* 3 columns per row */}
                                            <Form.Check
                                                inline
                                                type="checkbox"
                                                value={author}
                                                checked={selectedAuthors.includes(author)}
                                                onChange={() => handleCheckboxChange(author, setSelectedAuthors, selectedAuthors)}
                                                id={`author-${index}`}
                                                label={
                                                    <span title={author.replace(/^By\s+/i, '')} style={{
                                                        display: 'inline-block',
                                                        maxWidth: '150px', // Set max width
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}>
                                                        {author.replace(/^By\s+/i, '')}
                                                    </span>
                                                }
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            {/* Toast Notification */}
            <ToastContainer className="p-3" position="top-end">
                <Toast bg={toastVariant} onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Body className='text-white'>{message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default PreferencesForm;
