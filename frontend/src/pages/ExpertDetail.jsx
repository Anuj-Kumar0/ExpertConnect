import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../api/axios";

import socket from "../socket/socket";

function ExpertDetail() {
    const { id } = useParams();

    const [expert, setExpert] = useState(null);

    const [bookedSlots, setBookedSlots] = useState([]);

    const [selectedDate, setSelectedDate] =
        useState("");

    const [selectedSlot, setSelectedSlot] =
        useState("");

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        notes: "",
    });

    useEffect(() => {
        fetchExpert();
    }, []);

    const fetchExpert = async () => {
        try {
            const [expertRes, bookingsRes] =
                await Promise.all([
                    api.get(`/experts/${id}`),

                    api.get(`/bookings/expert/${id}`),
                ]);

            setExpert(expertRes.data);

            const formattedBookings =
                bookingsRes.data.map((booking) => ({
                    date: booking.date,
                    slot: booking.slot,
                }));

            setBookedSlots(formattedBookings);
        } catch (error) {
            console.log(error);
        }
    };

    // Real-time listener

    useEffect(() => {
        socket.on("slotBooked", (data) => {
            if (data.expertId === id) {
                setBookedSlots((prev) => [
                    ...prev,
                    {
                        date: data.date,
                        slot: data.slot,
                    },
                ]);
            }
        });

        return () => {
            socket.off("slotBooked");
        };
    }, [id]);

    const isSlotBooked = (date, slot) => {
        return bookedSlots.some(
            (item) =>
                item.date === date &&
                item.slot === slot
        );
    };

    const handleBooking = async (e) => {
        e.preventDefault();

        setSuccess("");

        setError("");

        if (!selectedDate || !selectedSlot) {
            return setError("Please select a slot");
        }

        try {
            const bookingData = {
                expertId: id,

                ...formData,

                date: selectedDate,

                slot: selectedSlot,
            };

            const { data } = await api.post(
                "/bookings",
                bookingData
            );

            setSuccess(data.message);

            setSelectedSlot("");

            setFormData({
                name: "",
                email: "",
                phone: "",
                notes: "",
            });
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Booking failed"
            );
        }
    };

    if (!expert) return <h2>Loading...</h2>;

    return (
        <div className="min-h-screen p-6">

            <title>Book Session</title>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-3">
                    {expert.name}
                </h1>

                <p className="text-gray-600 mb-8">
                    {expert.bio}
                </p>

                <h2>Available Slots</h2>

                {expert.availableSlots.map((day, index) => (
                    <div key={index}>
                        <h3 className="text-xl font-semibold mt-6 mb-3">
                            {day.date}
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {day.slots.map((slot, idx) => (
                                <button
                                    key={idx}
                                    disabled={isSlotBooked(day.date, slot)}
                                    onClick={() => {
                                        setSelectedDate(day.date);
                                        setSelectedSlot(slot);
                                    }}
                                    className={`px-4 py-2 rounded-xl font-medium transition
    ${selectedSlot === slot &&
                                            selectedDate === day.date
                                            ? "bg-orange-500 text-white"
                                            : isSlotBooked(day.date, slot)
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : "bg-green-100 text-green-700 hover:bg-green-200"
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <h2 style={{ marginTop: "30px" }}>
                    Book Session
                </h2>

                <form
                    onSubmit={handleBooking}
                    className="space-y-4 mt-6"
                >
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                        required
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                        required
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Phone"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phone: e.target.value,
                            })
                        }
                    />

                    <textarea
                        placeholder="Notes"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                        value={formData.notes}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                notes: e.target.value,
                            })
                        }
                    />

                    <button type="submit" className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
                        Confirm Booking
                    </button>
                </form>

                {success && (
                    <p className="text-green-600 font-medium">
                        {success}
                    </p>
                )}

                {error && (
                    <p className="text-red-500 font-medium">{error}</p>
                )}
            </div>
        </div>
    );
}

export default ExpertDetail;