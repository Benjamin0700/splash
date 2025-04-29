import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Bell, SlidersHorizontal, Mic } from "lucide-react"; // import ikonkalar
import { useNavigate } from 'react-router-dom';

const Discover = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Get favorites from localStorage on initial load
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

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Error saving favorites to localStorage:', err);
    }
  }, [favorites]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('https://marsgoup-1.onrender.com/api/products');
      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Mahsulotlarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const filterProducts = () => {
    if (!Array.isArray(products)) return [];

    return products.filter(product => {
      const categoryMatch =
        activeCategory === 'All' ||
        (product.category && product.category === activeCategory) ||
        (product.categories && product.categories.includes(activeCategory));

      const searchMatch =
        !searchQuery ||
        (product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase()));

      return categoryMatch && searchMatch;
    });
  };

  const toggleFavorite = (e, productId) => {
    if (!productId) return;

    e.stopPropagation();

    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const categories = ['All', 'Tshirts', 'Jeans', 'Shoes'];
  const filteredProducts = filterProducts();

  return (
    <div className="pb-16 bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Discover</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2" aria-label="Notifications">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 flex items-center space-x-3 gap-2">
          <div className="flex flex-1 items-center bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search for clothes..."
              className="ml-2 bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
              value={searchQuery}
              onChange={handleSearch}
              aria-label="Search"
            />
            <Mic className="w-5 h-5 text-gray-500" />
          </div>

          {/* Filter Button */}
          <button className="bg-black text-white p-2 rounded-xl" aria-label="Filters">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Categories */}
      <div className=" mt-4 flex gap-2 px-4 overflow-x-auto pb-2 mb-4 hide-scrollbar">
        {categories.map(category => (
          <button
            key={category}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === category
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products */}
      {loading ? (
        <div className="flex justify-center items-center p-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : error ? (
        <div className="p-4 text-center text-red-500">
          {error}
        </div>
      ) : !filteredProducts || filteredProducts.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
          <p className="text-xl font-medium">No products found</p>
          <p className="mt-2">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 px-4">
          {filteredProducts.map(product => (
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
                <button
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  onClick={(e) => toggleFavorite(e, product._id)}
                  aria-label={favorites.includes(product._id) ? "Remove from favorites" : "Add to favorites"}
                >
                  {favorites.includes(product._id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="red" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  )}
                </button>
                {product.discountPercentage && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{product.discountPercentage}%
                  </div>
                )}
              </div>
              <h3 className="font-medium text-lg truncate">{product.title}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">₩{product.price}</span>
                  {product.discountPercentage && (
                    <span className="text-gray-500 line-through text-sm">
                      ₩{Math.round(Number(product.price) * (1 + Number(product.discountPercentage) / 100))}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Discover;
