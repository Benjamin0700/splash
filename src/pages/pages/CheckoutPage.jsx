import React, { useState, useEffect } from 'react';
import { ChevronLeft, Bell, MapPin, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Address from './AddressPage';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    const savedSelectedAddress = localStorage.getItem('selectedAddress');
    if (savedSelectedAddress) {
      setSelectedAddress(JSON.parse(savedSelectedAddress));
    } else if (savedAddresses.length > 0) {
      setSelectedAddress(savedAddresses[0]);
    }
  }, []);

  const handleDeleteAddress = (addressId) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== addressId);
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
    }
  }, [selectedAddress]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 flex justify-between items-center">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Checkout</h1>
        <Bell size={24} />
      </header>

      <div className="flex-1 p-4 space-y-6">
        {/* Delivery Address */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-md">Delivery Address</h2>
            <button
              className="text-sm font-medium text-black underline"
              onClick={() => setShowAddressModal(true)}
            >
              Change
            </button>
          </div>

          {selectedAddress ? (
            <div className="flex items-start space-x-3">
              <MapPin className="mt-1 text-gray-500" />
              <div>
                <p className="font-medium">{selectedAddress.street}</p>
                <p className="text-gray-600 text-sm">
                  {selectedAddress.city}, {selectedAddress.country} {selectedAddress.postcode}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">No address selected.</p>
          )}
        </div>

        <hr />

        {/* Payment Method */}
        <div>
          <h2 className="font-semibold text-md mb-3">Payment Method</h2>
          <div className="flex space-x-2">
            <button className="flex-1 border border-black rounded-lg px-4 py-2 flex justify-center items-center bg-black text-white font-semibold">
              Card
            </button>
            <button className="flex-1 border rounded-lg px-4 py-2 flex justify-center items-center">
              Cash
            </button>
            <button className="flex-1 border rounded-lg px-4 py-2 flex justify-center items-center">
               Pay
            </button>
          </div>

          {/* Selected card info */}
          <div className="mt-4 border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">VISA</p>
              <p className="text-gray-700 tracking-widest">**** **** **** 2512</p>
            </div>
            <Pencil size={20} className="text-gray-500" />
          </div>
        </div>

        <hr />

        {/* Order Summary */}
        <div>
          <h2 className="font-semibold text-md mb-3">Order Summary</h2>
          <div className="flex justify-between text-gray-700 mb-1">
            <span>Sub-total</span>
            <span>$5,870</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-1">
            <span>VAT (%)</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-1">
            <span>Shipping fee</span>
            <span>$80</span>
          </div>
          <div className="border-t mt-2 mb-2"></div>
          <div className="flex justify-between font-bold text-black text-lg">
            <span>Total</span>
            <span>$5,950</span>
          </div>
        </div>

        {/* Promo Code */}
        <div className="flex">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 border rounded-l-lg p-3 text-sm"
          />
          <button className="bg-black text-white px-6 rounded-r-lg font-semibold">
            Add
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <button className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg">
          Place Order
        </button>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4">
            <Address
              onClose={() => {
                const saved = JSON.parse(localStorage.getItem('addresses')) || [];
                if (saved.length > 0) {
                  setSelectedAddress(saved[saved.length - 1]);
                }
                setShowAddressModal(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
