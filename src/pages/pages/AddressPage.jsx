import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Navigatsiya uchun import

const AddressPage = ({ onAddressSelect }) => {
  const [newAddress, setNewAddress] = useState({
    city: '',
    state: '',
    neighborhood: '',
    postalCode: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: 'Home',
      address: '925 S Chugach St #APT 10, Alaska',
      default: true
    },
    {
      id: 2,
      label: 'Office',
      address: '2438 6th Ave, Ketchikan, Alaska',
      default: false
    },
    {
      id: 3,
      label: 'Apartment',
      address: '2551 Vista Dr #B301, Juneau, Alaska',
      default: false
    },
    {
      id: 4,
      label: 'Parent\'s House',
      address: '4821 Ridge Top Cir, Anchorage, Alaska',
      default: false
    }
  ]);
  const [lastAddress, setLastAddress] = useState(null);

  const navigate = useNavigate(); // navigate hookini chaqirish

  const handleAddAddress = () => {
    setIsAdding(true);
  };

  const handleSaveNewAddress = () => {
    const fullAddress = `${newAddress.neighborhood}, ${newAddress.city}, ${newAddress.state}`;
    const prevDefault = addresses.find(addr => addr.default);

    const newAddr = {
      id: addresses.length + 1,
      label: newAddress.city,
      address: fullAddress,
      default: true
    };

    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      default: false
    }));

    setLastAddress(prevDefault?.address);
    setAddresses([...updatedAddresses, newAddr]);
    setNewAddress({ city: '', state: '', neighborhood: '', postalCode: '' });
    setIsAdding(false); // Modalni yopish

    if (onAddressSelect) {
      onAddressSelect(newAddr);
    }

    navigate('/payment'); // Yangi manzil saqlangach, payment sahifasiga qaytish
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectAddress = (id) => {
    const selected = addresses.find((addr) => addr.id === id);
    const updated = addresses.map((addr) => ({
      ...addr,
      default: addr.id === id
    }));

    setAddresses(updated);
    if (onAddressSelect) onAddressSelect(selected);

    navigate('/payment'); // Manzil tanlanganda payment sahifasiga o'tish
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Address</h1>
      <h3 className="text-lg font-medium mb-2">Saved Address</h3>

      {addresses.map((address) => (
        <div key={address.id} className="flex items-center justify-between mb-4 p-4 border rounded-xl">
          <div>
            <div className="font-medium">{address.label}</div>
            <p className="text-gray-600">{address.address}</p>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="address"
              className="mr-2"
              checked={address.default}
              onChange={() => handleSelectAddress(address.id)}
            />
            {address.default && <span className="text-sm text-gray-500">Default</span>}
          </div>
        </div>
      ))}

      {isAdding ? (
        <div>
          <h3 className="text-lg font-medium mb-2">Add New Address</h3>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={newAddress.city}
            onChange={handleInputChange}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={newAddress.state}
            onChange={handleInputChange}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            name="neighborhood"
            placeholder="Neighborhood"
            value={newAddress.neighborhood}
            onChange={handleInputChange}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={newAddress.postalCode}
            onChange={handleInputChange}
            className="mb-4 p-2 border rounded w-full"
          />
          <button
            onClick={handleSaveNewAddress}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Save Address
          </button>

          {lastAddress && (
            <div className="mt-4 text-sm text-gray-600 italic">
              Previous address: <span className="font-medium text-black">{lastAddress}</span>
            </div>
          )}
        </div>
      ) : (
        <button onClick={handleAddAddress} className="w-full bg-gray-200 py-2 rounded">
          + Add New Address
        </button>
      )}
    </div>
  );
};

export default AddressPage;
