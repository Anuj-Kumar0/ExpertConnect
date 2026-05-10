import { useState } from "react";

import api from "../api/axios";

function MyBookings() {
    const [email, setEmail] = useState("");

    const [bookings, setBookings] = useState([]);

    const [error, setError] = useState("");

    const fetchBookings = async () => {
        try {
            setError("");

            const { data } = await api.get(
                `/bookings?email=${email}`
            );

            setBookings(data);
        } catch (error) {
            setError("Failed to fetch bookings");
        }
    };


    return (
        <div className="min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">
                    My Bookings
                </h1>

                <div className="flex gap-3 mb-8">

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <button onClick={fetchBookings} className="bg-black text-white px-6 rounded-xl hover:bg-gray-800">
                        Search
                    </button>
                </div>

                {error && (
                    <p style={{ color: "red" }}>{error}</p>
                )}

                <div style={{ marginTop: "20px" }}>
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white rounded-2xl shadow-sm p-6 mb-5"
                        >
                            <h3>
                                {booking.expertId?.name}
                            </h3>

                            <p>Date: {booking.date}</p>

                            <p>Slot: {booking.slot}</p>

                            <p
                                className={`font-medium ${booking.status === "Pending"
                                        ? "text-orange-500"
                                        : booking.status === "Confirmed"
                                            ? "text-blue-500"
                                            : "text-green-600"
                                    }`}
                            >
                                Status: {booking.status}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyBookings;