const Pagination = ({
  totalProducts,
  productsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-end flex-wrap mt-0 mb-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 py-2 text-white bg-blue-500 rounded-tl rounded-bl hover:bg-blue-600 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Preview
      </button>

      <div className="flex">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 text-white hover:bg-blue-700 ${
              currentPage === index + 1 ? "bg-blue-600" : "bg-blue-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 text-white bg-blue-500 rounded-tr rounded-br hover:bg-blue-600 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
