import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('ongoing');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    const initializedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));

    const completed = initializedCart.filter(item => item.isCompleted);
    const inProgress = initializedCart.filter(item => !item.isCompleted);

    setCompletedItems(completed);
    setCartItems(inProgress);
  }, []);

  const updateLocalStorage = (items) => {
    const combinedItems = [...items, ...completedItems];
    localStorage.setItem('cart', JSON.stringify(combinedItems));
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
    const updatedCartItems = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCartItems);

    const combinedItems = [...updatedCartItems, ...completedItems];
    localStorage.setItem('cart', JSON.stringify(combinedItems));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 80;
  const finalTotal = total + shippingFee;

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold text-center w-full">Cart</h1>
      </div>

      {/* Ongoing Items */}
      {activeTab === 'ongoing' && (
        <div>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.img} alt={item.title} className="w-16 h-16 object-contain" />
                    <div>
                      <h2 className="font-semibold text-sm">{item.title}</h2>
                      <p className="text-gray-500 text-sm">Size: {item.size}</p>
                      <p className="text-gray-800 font-bold">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decreaseQty(item._id)} className="text-xl">−</button>
                    <span className="text-lg">{item.quantity}</span>
                    <button onClick={() => increaseQty(item._id)} className="text-xl">+</button>
                    <button onClick={() => removeFromCart(item._id)} className="text-red-500">🗑</button>
                  </div>
                </div>
              ))}

              <div className="text-right mt-4 font-bold text-lg">
                Sub-total: ${total.toFixed(2)}
                <br />
                Shipping fee: ${shippingFee}
                <br />
                <span className="text-xl">Total: ${finalTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-black text-white py-4 text-lg rounded-xl"
              >
                Go To Checkout →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Completed Items */}
      {activeTab === 'completed' && (
        <div>
          {completedItems.length === 0 ? (
            <p className="text-center text-gray-500">No completed orders</p>
          ) : (
            <div className="space-y-4">
              {completedItems.map(item => (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.img} alt={item.title} className="w-16 h-16 object-contain" />
                    <div>
                      <h2 className="font-semibold text-sm">{item.title}</h2>
                      <p className="text-gray-500 text-sm">Size: {item.size}</p>
                      <p className="text-gray-800 font-bold">${item.price}</p>
                    </div>
                  </div>
                  <div className="text-green-500">Completed</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
