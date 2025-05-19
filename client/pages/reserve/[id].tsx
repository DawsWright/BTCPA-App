'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../lib/api';

type Event = {
  id: number;
  title: string;
  description?: string;
  dateTime: string;
  totalSeats: number;
  seatsBooked: number;
  ticketPrice: number;
};

export default function Reserve() {
  const [event, setEvent] = useState<Event | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return; 

    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error('Failed to fetch event:', err);
      }
    };

    fetchEvent();
  }, [id]);

  const eventRedirect = (eventId: number) => {
    router.push(`../events/${eventId}`);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!event) return;
        
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const totalPrice = event.ticketPrice * tickets;
    const fullName = `${firstName} ${lastName}`;

    // Optionally send reservation to API
    // await api.post('/reservations', { eventId: id, name, email, tickets });

    router.push({
      pathname: '/success',
      query: {
        name: fullName,
        tickets,
        total: totalPrice.toFixed(2),
        eventTitle: event.title,
      },
    });
  };

  return (
    <div>
    {event ? (
      <>
      <h1 className="text-2xl font-bold mb-4">Reserve Tickets for {event.title}</h1>
          <form onSubmit={formSubmit} className="space-y-4">
        <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            />
        </div>

        <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            />
        </div>

        <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>

        <div>
            <label className="block mb-1 font-medium">Number of Tickets</label>
            <input
            type="number"
            min={1}
            max={event.totalSeats - event.seatsBooked}
            className="w-full px-3 py-2 border rounded"
            value={tickets}
            onChange={(e) => setTickets(Number(e.target.value))}
            required
            />
        </div>

        <div className="space-x-2">
            <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
            >
            Reserve
            </button>
            <button
            type="button"
            onClick={() => eventRedirect(event.id)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
            >
            Cancel
            </button>
        </div>
    </form>
            </>
    ) : (
      <p>Loading...</p>
    )}
    </div>
  );
}