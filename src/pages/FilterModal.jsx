import React from 'react';

const FilterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-end sm:items-center">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-96 p-6 max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filter Options</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-lg">&times;</button>
        </div>
        <div className="space-y-4">
          {/* Filter options */}
          <div>
            <label className="block text-sm font-medium">Price Range</label>
            <input
              type="range"
              min="0"
              max="1000"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Sort By</label>
            <select className="w-full border rounded p-2">
              <option value="">Select</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
