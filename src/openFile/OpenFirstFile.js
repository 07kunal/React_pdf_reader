import React, { useEffect, useState, useMemo } from 'react';
import { Document, Page } from 'react-pdf';
import { useSearchParams , useLocation} from 'react-router-dom'; // If you're using react-router
import Shrink_Disciplines from '../constpdf/Shrink_Disciplines.pdf';

const OpenFirstFile = () => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  useEffect(() => {
    // Extract the page number from the URL query parameter
    const page = parseInt(searchParams.get('page'), 10) || currentPage;
    setCurrentPage(page);
     console.log('finding value of searchParams', searchParams.get('page'));

  }, [searchParams]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Update the URL without reloading the page
    const url = new URL(window.location.href);  // creating a url object using URL construction.
    url.searchParams.set('page', pageNumber);  // seting the query in the url using set method of searchParams
    window.history.pushState({}, '', url);
  };
//   function onItemClick({ pageNumber: itemPageNumber }) {
//     setCurrentPage(itemPageNumber);
//     const url = new URL(window.location.href);  // creating a url object using URL construction.
//     url.searchParams.set('page', itemPageNumber);  // seting the query in the url using set method of searchParams
//     window.history.pushState({}, '', url);

// }
  console.log('searchParam',searchParams);
  // console.log('searchLocation',search);
  return (
    <div>
      <Document
        file={Shrink_Disciplines}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={currentPage} renderAnnotationLayer={false} renderTextLayer={false} />
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