import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();
  const { name, tickets, total, eventTitle } = router.query;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Tickets Successfully Reserved!</h1>
      <p className="mb-2">Thank you <strong>{name}</strong>!</p>
      <p className="mb-2">You've reserved <strong>{tickets}</strong> ticket(s) for <strong>{eventTitle}</strong>.</p>
      <p className="mb-4">Amount due upon arrival: <strong>${total}</strong></p>

      <button
        onClick={() => router.push('/')}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back to Home Page
      </button>
    </div>
  );
}