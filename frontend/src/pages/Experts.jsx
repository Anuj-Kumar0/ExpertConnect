import { useEffect, useState } from "react";
import api from "../api/axios";

function Experts() {
    const [experts, setExperts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    useEffect(() => {
        fetchExperts();
    }, [search, category, page]);

    const fetchExperts = async () => {
        try {
            setLoading(true);

            const { data } = await api.get(
                `/experts?search=${search}&category=${category}&page=${page}`
            );

            setExperts(data.experts);

            setTotalPages(data.totalPages);
        } catch (error) {
            setError("Failed to load experts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
    }, [search, category]);

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto">

                <title>ExpertConnect</title>
                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">
                            ExpertConnect
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Book real-time sessions with experts
                        </p>
                    </div>

                    <a
                        href="/my-bookings"
                        className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
                    >
                        My Bookings
                    </a>
                </div>

                {/* Filters */}

                <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search experts..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
                    >
                        <option value="">
                            All Categories
                        </option>

                        <option value="Career Coach">
                            Career Coach
                        </option>

                        <option value="Fitness Trainer">
                            Fitness Trainer
                        </option>

                        <option value="Nutritionist">
                            Nutritionist
                        </option>
                    </select>
                </div>

                {/* States */}

                {loading && (
                    <p className="text-center text-lg">
                        Loading experts...
                    </p>
                )}

                {error && (
                    <p className="text-center text-red-500">
                        {error}
                    </p>
                )}

                {/* Expert Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {!loading &&
                        experts.length === 0 && (
                            <p>No experts found.</p>
                        )}

                    {experts.map((expert) => (
                        <div
                            key={expert._id}
                            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {expert.name}
                                </h2>

                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                                    ⭐ {expert.rating}
                                </span>
                            </div>

                            <p className="text-gray-500 mb-2">
                                {expert.category}
                            </p>

                            <p className="text-gray-600 mb-4">
                                {expert.experience} years
                                experience
                            </p>

                            <a
                                href={`/experts/${expert._id}`}
                                className="inline-block bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                            >
                                View Details
                            </a>
                        </div>
                    ))}
                </div>

                {/* Pagination */}

                <div className="flex justify-center items-center gap-4 mt-10">
                    <button
                        disabled={page === 1}
                        onClick={() =>
                            setPage((prev) => prev - 1)
                        }
                        className="bg-white px-5 py-2 rounded-xl shadow disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span className="font-medium">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() =>
                            setPage((prev) => prev + 1)
                        }
                        className="bg-white px-5 py-2 rounded-xl shadow disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Experts;