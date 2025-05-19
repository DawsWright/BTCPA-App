'use client';
import { useRouter } from 'next/router';
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

export default function EventList() {
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


  const router = useRouter();

  const eventRedirect = (eventId: number) => {
    router.push(`/events/${eventId}`);
  }

  const homeRedirect = () => {
    router.push('/'); 
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-2 border p-3 rounded shadow">
            <button onClick={(e) => {
              e.stopPropagation();
              eventRedirect(event.id);
            }} 
            className="text-xl font-semibold">
                {event.title}
            </button>
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
          </li>
        ))}
      </ul>
      <button
      onClick={homeRedirect}
      className="px-4 py-2 bg-blue-500 text-white rounded"
      >
      Back To Home Page
      </button>
    </div>
  );
}