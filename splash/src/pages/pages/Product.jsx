import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Heart, Star } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState('M');
  const [liked, setLiked] = useState(false);

  const goBack = () => navigate(-1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('https://marsgoup-1.onrender.com/api/products');
        const foundProduct = response.data.find(p => p._id === id);
        setProduct(foundProduct);
      } catch (err) {
        console.error('Product fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleLike = () => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    const alreadyLiked = likedItems.some(p => p._id === product._id);

    if (!alreadyLiked) {
      likedItems.push(product);
      localStorage.setItem('likedItems', JSON.stringify(likedItems));
      setLiked(true);
    }
  };

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ ...product, size, quantity: 1 });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/cart');
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!product) return <div className="text-center p-10 text-red-500">Product not found</div>;

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Image & Back Button */}
      <div className="relative">
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-[400px] object-contain bg-white"
        />

        {/* Back Button */}
        <button
          onClick={goBack}
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <Heart className={liked ? 'text-red-500 fill-red-500' : ''} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">{product.title}</h2>

        <div className="flex items-center gap-1 text-yellow-500">
          <Star />
          <span>
            {product.rating?.rate || 4.0}/5 ({product.rating?.count || 45} reviews)
          </span>
        </div>

        <p className="text-gray-600">
          The name says it all, the right size slightly snugs the body leaving enough room for comfort in the sleeves and waist.
        </p>

        {/* Size Selection */}
        <div>
          <h4 className="font-semibold mb-2">Choose size</h4>
          <div className="flex gap-3">
            {['S', 'M', 'L'].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`w-10 h-10 rounded-full border ${
                  size === s ? 'bg-black text-white' : 'bg-white text-black'
                } transition`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-xl font-bold">${product.price}</div>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
