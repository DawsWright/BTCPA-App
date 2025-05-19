'use client';
import { useRouter } from 'next/router';
import React from 'react';

export default function Home() {
  const router = useRouter();

  const listRedirect = () => {
    router.push('/eventList'); 
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bay Tree Council for the Performing Arts</h1>
      <div className="space-x-2">
      <button
        onClick={listRedirect}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        See Events
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Employee Login
      </button>
      </div>
    </div>
  );
}