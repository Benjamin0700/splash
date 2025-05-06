import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    // Find the item with the matching id and decrease its quantity
    const updated = cartItems.map(item =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }  // Decrease quantity
        : item
    ).filter(item => item.quantity > 0);  // Remove items with 0 quantity

    setCartItems(updated);
    updateLocalStorage(updated);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 80;
  const finalTotal = total + shippingFee;

  const handleCheckout = () => {
    navigate('/payment');
  };

  const markItemsAsCompleted = () => {
    // Mark items as completed after successful payment
    const updatedCart = cartItems.map(item => ({
      ...item,
      isCompleted: true,
    }));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // Update the state
    setCartItems([]);
    setCompletedItems(updatedCart);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Savat</h1>

      {/* Toggle Switch */}
      <div className="flex bg-gray-200 rounded-full p-1 w-64 mx-auto mb-6">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`flex-1 py-2 rounded-full text-center font-medium transition ${activeTab === 'ongoing' ? 'bg-white text-black shadow' : 'text-gray-500'
            }`}
        >
          Ongoing
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 rounded-full text-center font-medium transition ${activeTab === 'completed' ? 'bg-white text-black shadow' : 'text-gray-500'
            }`}
        >
          Completed
        </button>
      </div>

      {/* Ongoing Items */}
      {activeTab === 'ongoing' && (
        <div>
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

              {/* Mark as completed for testing */}
              <button
                onClick={markItemsAsCompleted}
                className="mt-6 w-full bg-green-500 text-white py-4 text-lg rounded-xl"
              >
                Mark Items as Completed
              </button>
            </>
          )}
        </div>
      )}

      {/* Completed Items */}
      {activeTab === 'completed' && (
        <div>
          {completedItems.length === 0 ? (
            <div className="text-center text-gray-600">Hech narsa topilmadi</div>
          ) : (
            completedItems.map(item => (
              <div key={item._id} className="flex items-center gap-4 mb-4 p-4 border rounded-xl shadow-sm">
                <img src={item.img} alt={item.title} className="w-24 h-24 object-contain bg-white rounded" />
                <div className="flex-1">
                  <h2 className="text-lg font-medium">{item.title}</h2>
                  <p className="text-gray-600">Narxi: ${item.price}</p>
                </div>
                <div className="text-green-500">Completed</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
