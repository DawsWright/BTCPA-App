import { useEffect, useState } from 'react';
import api from '../lib/api';

type Event = {
  id: number;
  title: string;
  description?: string;
  dateTime: string;
  totalSeats: number;
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
            {event.description && <p className="mt-1">{event.description}</p>}
            <p className="text-sm mt-1">Total Seats: {event.totalSeats}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}