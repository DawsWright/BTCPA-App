import { useEffect, useState } from 'react';
import api from '../lib/api';

type Event = {
  id: number;
  title: string;
  description?: string;
  dateTime: string;
  totalSeats: number;
  seatsBooked: number;
  ticketPrice: number;
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-2 border p-3 rounded shadow">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-sm text-gray-600">
              {new Date(event.dateTime).toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </p>
            <p className="text-sm mt-1">Tickets Available: {event.totalSeats - event.seatsBooked}</p>
            <p className="text-sm mt-1">Price: ${Number(event.ticketPrice).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}