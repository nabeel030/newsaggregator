import React from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPagination = () => {
        const pagesToShow = 5; // Show 5 pages around the current one
        const pageItems = [];

        // Show the "First" and "Prev" buttons
        pageItems.push(
            <Pagination.First key="first" onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        );
        pageItems.push(
            <Pagination.Prev key="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        );

        const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
        const endPage = Math.min(totalPages, currentPage + Math.floor(pagesToShow / 2));

        // Add ellipsis if there are pages before the visible range
        if (startPage > 1) {
            pageItems.push(<Pagination.Item key={1} onClick={() => handlePageChange(1)}>1</Pagination.Item>);
            pageItems.push(<Pagination.Ellipsis key="ellipsis1" disabled />);
        }

        // Show the visible range of pages
        for (let i = startPage; i <= endPage; i++) {
            pageItems.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        // Add ellipsis if there are pages after the visible range
        if (endPage < totalPages) {
            pageItems.push(<Pagination.Ellipsis key="ellipsis2" disabled />);
            pageItems.push(
                <Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                </Pagination.Item>
            );
        }

        // Show the "Next" and "Last" buttons
        pageItems.push(
            <Pagination.Next key="next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        );
        pageItems.push(
            <Pagination.Last key="last" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        );

        return pageItems;
    };

    if (totalPages <= 1) return null; // Hide pagination if there's only 1 page

    return (
        <div className="d-flex justify-content-center my-3">
            <Pagination>
                {renderPagination()}
            </Pagination>
        </div>
    );
};

export default CustomPagination;
