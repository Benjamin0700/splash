import React, { useState } from 'react';

const sampleAddresses = [
  { id: 1, street: '45 Amir Temur', city: 'Tashkent', country: 'Uzbekistan', postcode: '100100' },
  { id: 2, street: '12 Sayilgoh', city: 'Tashkent', country: 'Uzbekistan', postcode: '100011' },
  { id: 3, street: '87 Shohruh', city: 'Samarkand', country: 'Uzbekistan', postcode: '140100' },
];

export default function Address({ onClose }) {
  const [selected, setSelected] = useState(null);

  const handleApply = () => {
    if (selected) {
      localStorage.setItem('selectedAddress', JSON.stringify(selected));
      const existing = JSON.parse(localStorage.getItem('addresses')) || [];
      const updated = existing.filter(a => a.id !== selected.id).concat(selected);
      localStorage.setItem('addresses', JSON.stringify(updated));
      onClose();
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Select Address</h2>
      <div className="space-y-2">
        {sampleAddresses.map((addr) => (
          <div
            key={addr.id}
            onClick={() => setSelected(addr)}
            className={`p-3 border rounded-lg cursor-pointer ${
              selected?.id === addr.id ? 'border-black' : 'border-gray-300'
            }`}
          >
            <p className="font-medium">{addr.street}</p>
            <p className="text-sm text-gray-600">
              {addr.city}, {addr.country} {addr.postcode}
            </p>
          </div>
        ))}
      </div>
      <button
        className="mt-4 bg-black text-white px-6 py-2 rounded-lg w-full font-semibold"
        onClick={handleApply}
        disabled={!selected}
      >
        Apply
      </button>
    </div>
  );
}
