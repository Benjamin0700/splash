import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    // Har bir itemga quantity qo‘shib chiqamiz
    const initializedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(initializedCart);
  }, []);

  const updateLocalStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const increaseQty = (id) => {
    const updated = cartItems.map(item =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
    updateLocalStorage(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems.map(item =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updated);
    updateLocalStorage(updated);
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
    updateLocalStorage(updated);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 80;
  const finalTotal = total + shippingFee;

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Savat</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">Savat bo‘sh</div>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item._id} className="flex items-center gap-4 mb-4 p-4 border rounded-xl shadow-sm">
              <img src={item.img} alt={item.title} className="w-24 h-24 object-contain bg-white rounded" />
              <div className="flex-1">
                <h2 className="text-lg font-medium">{item.title}</h2>
                <p className="text-gray-600">Narxi: ${item.price}</p>
              </div>
              <div className="flex items-center">
                <button onClick={() => decreaseQty(item._id)} className="px-2 text-xl">−</button>
                <span className="px-3">{item.quantity}</span>
                <button onClick={() => increaseQty(item._id)} className="px-2 text-xl">+</button>
              </div>
              <button onClick={() => removeFromCart(item._id)} className="text-red-500">🗑</button>
            </div>
          ))}

          <div className="border-t mt-6 pt-4 space-y-2 text-right text-lg">
            <p>Sub-total: ${total.toLocaleString()}</p>
            <p>VAT (%): $0.00</p>
            <p>Shipping fee: ${shippingFee}</p>
            <p className="font-bold">Total: ${finalTotal.toLocaleString()}</p>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-black text-white py-4 text-lg rounded-xl"
          >
            Go To Checkout →
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
