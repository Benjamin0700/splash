import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Liked = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (err) {
      console.error('Error loading favorites from localStorage:', err);
    }
  }, []);

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <div className="pb-16 bg-white min-h-screen">
      <div className="px-4 py-3">
        <h1 className="text-3xl text-center font-bold">Liked Products</h1>
        <div className="grid grid-cols-2 gap-4 px-4 mt-6">
          {favorites.length === 0 ? (
            <p className="text-center text-gray-500">No favorite products yet.</p>
          ) : (
            favorites.map(product => (
              <div 
                key={product._id || `product-${Math.random()}`} 
                className="mb-6 cursor-pointer transform transition-transform "
                onClick={() => handleProductClick(product._id)}
              >
                <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <img 
                    src={product.image || product.img || `/api/placeholder/240/320`} 
                    alt={product.title || "Product"} 
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `/api/placeholder/240/320`;
                    }}
                    loading="lazy"
                  />
                </div>
                <h3 className="font-medium text-lg truncate">{product.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">₩{product.price}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Liked;
