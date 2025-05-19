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

export default function Event() {
  const [event, setEvent] = useState<Event | null>(null);
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

  const listRedirect = () => {
    router.push('/eventList'); 
  };

  const reserveRedirect = (eventId: number) => {
    router.push(`/reserve/${eventId}`); 
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Event Details</h1>
    {event ? (
      <>
        <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
        <p>{event.description}</p>
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
        <p>Ticket Price: ${Number(event.ticketPrice).toFixed(2)}</p>
      </>
    ) : (
      <p>Loading...</p>
    )}
      <div className="space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          reserveRedirect(event.id);
        }} 
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Reserve Tickets
      </button>
      <button
        onClick={listRedirect}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back To Events
      </button>
      </div>
    </div>
  );
}