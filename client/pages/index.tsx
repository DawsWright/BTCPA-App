import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/events').then(res => setEvents(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Upcoming Events</h1>
      <ul>
        {events.map((event: any) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}