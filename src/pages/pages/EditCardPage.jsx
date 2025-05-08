// EditCardPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const EditCardPage = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('**** **** **** 2512');
  const [expiry, setExpiry] = useState('07/23');
  const [cvc, setCvc] = useState('345');

  const handleSave = () => {
    const newCard = {
      number: cardNumber,
      expiry,
      cvc
    };
    localStorage.setItem('cardInfo', JSON.stringify(newCard));
    navigate('/checkout'); // back to CheckoutPage
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <h2 className="text-xl font-bold text-center w-full">Edit Card</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Card Number</label>
          <input
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            className="w-full border p-3 rounded"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block font-semibold mb-1">Expiry Date</label>
            <input
              value={expiry}
              onChange={e => setExpiry(e.target.value)}
              className="w-full border p-3 rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block font-semibold mb-1">Security Code</label>
            <input
              value={cvc}
              onChange={e => setCvc(e.target.value)}
              className="w-full border p-3 rounded"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-3 rounded-xl mt-6"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditCardPage;
