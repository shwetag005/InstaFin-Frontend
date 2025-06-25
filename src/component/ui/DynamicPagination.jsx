import { useState, useEffect } from "react";

const DynamicPagination = ({
  data=[],
  currentPageNumber=()=>{},
  itemsPerPageOptions = [5, 10, 20, 50],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  // Update currentItems when data, page, or itemsPerPage change
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    currentPageNumber(startIndex,endIndex);
  }, [data]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handlePageChange(currentPage);
  },[itemsPerPage])
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      
      setCurrentPage(page);
    }
     const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    currentPageNumber(startIndex,endIndex);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = windowWidth < 640 ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) pages.push(i);

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Items per page selector */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center">
          <label
            htmlFor="itemsPerPage"
            className="mr-2 text-sm font-medium text-gray-700"
          >
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          items
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 flex justify-center sm:justify-start">
          <nav
            className="inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Previous</span> &larr;
            </button>

            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof page === "number" && handlePageChange(page)
                }
                disabled={page === "..."}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === currentPage
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                } ${page === "..." ? "cursor-default" : "cursor-pointer"}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Next</span> &rarr;
            </button>
          </nav>
        </div>

        {/* Page jump */}
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-2">Go to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) : 1;
              handlePageChange(page);
            }}
            className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default DynamicPagination;
