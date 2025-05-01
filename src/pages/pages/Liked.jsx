import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Liked = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = localStorage.getItem('favorites');
        const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];

        const response = await fetch('https://marsgoup-1.onrender.com/api/products');
        const allProducts = await response.json();

        // Faqat localStorage'dagi ID'lar bo‘yicha filter
        const filtered = allProducts.filter(p => favoriteIds.includes(p._id));
        setFavorites(filtered);
      } catch (err) {
        console.error('Error fetching or filtering products:', err);
      }
    };

    fetchFavorites();
  }, []);

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <div className="pb-16 bg-white min-h-screen">
      <div className="p-10 text-center text-gray-600">
        <h2 className="text-2xl font-semibold">Liked Products</h2>
        <div className="grid grid-cols-2 gap-4 px-4 mt-2">
          {favorites.length === 0 ? (
            <div className="col-span-2 flex justify-center items-center=">
              <p className="text-center text-gray-500">No favorite products yet.</p>
            </div>
          ) : (
            favorites.map(product => (
              <div
                key={product._id}
                className="mb-6 cursor-pointer transform transition-transform"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <img
                    src={product.image || product.img || `/api/placeholder/240/320`}
                    alt={product.title || "Product"}
                    className="w-full h-64 object-contain bg-white"
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
