const Pagination = ({ pagination, onPageChange }) => {
    const { page, totalPages, hasNextPage, hasPreviousPage } = pagination;

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="mt-8 flex items-center justify-center gap-2 font-[Georgia]">
            <button
                disabled={!hasPreviousPage}
                onClick={() => onPageChange(page - 1)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Previous
            </button>

            {pages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`h-10 w-10 rounded-lg border text-sm font-semibold transition ${page === pageNumber
                        ? "border-[#43245c] bg-[#43245c] text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                disabled={!hasNextPage}
                onClick={() => onPageChange(page + 1)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;

