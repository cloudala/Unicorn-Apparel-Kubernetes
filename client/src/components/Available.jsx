import React from 'react';

export default function Available({ count }) {
  return (
    <p className={`font-semibold mt-0 mb-2 ${count > 0 ? 'text-green-600' : 'text-red-600'}`}>
      {count > 0 ? `Available: ${count}` : 'Out of Stock'}
    </p>
  );
}
