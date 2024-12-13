import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useSearchParams } from 'react-router-dom'; // If you're using react-router
import Shrink_Disciplines from '../constpdf/Shrink_Disciplines.pdf';

const OpenFirstFile = () => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();



  useEffect(() => {
    // Extract the page number from the URL query parameter
    const page = parseInt(searchParams.get('page'), 10) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Update the URL without reloading the page
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageNumber);
    window.history.pushState({}, '', url);
  };

  return (
    <div>
      <Document
        file={Shrink_Disciplines}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={currentPage} renderAnnotationLayer={false} renderTextLayer={false}/>
      </Document>
      <div>
        <button
          onClick={() =>
            handlePageChange(Math.max(1, currentPage - 1))
          }
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {numPages}
        </span>
        <button
          onClick={() =>
            handlePageChange(Math.min(numPages, currentPage + 1))
          }
          disabled={currentPage >= numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OpenFirstFile