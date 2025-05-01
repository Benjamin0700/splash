import {
  ChevronLeft, ChevronRight, Package, Users,
  BookOpen, CreditCard, Bell, HelpCircle,
  Headphones, LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AccountPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Token yoki auth ma'lumotini localStorage/sessionStorage'dan o'chiring (agar kerak bo‘lsa)
    localStorage.removeItem('token'); // faqat agar siz token ishlatsangiz
    navigate('/auth');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Account</h1>
        </div>
        <button>
          <Bell size={24} />
        </button>
      </header>

      {/* Account Menu */}
      <div className="flex-1">
        <MenuLink icon={<Package size={24} />} text="My Orders" onClick={() => navigate('/cart')} />
        <div className="h-2 bg-gray-100" />

        <MenuLink icon={<Users size={24} />} text="My Details" onClick={() => navigate('/my-details')} />
        <div className="border-t border-gray-200" />

        <MenuLink icon={<BookOpen size={24} />} text="Address Book" onClick={() => navigate('/address-book')} />
        <div className="border-t border-gray-200" />

        <MenuLink icon={<CreditCard size={24} />} text="Payment Methods" onClick={() => navigate('/payment')} />
        <div className="border-t border-gray-200" />

        <MenuLink icon={<Bell size={24} />} text="Notifications" onClick={() => navigate('/notifications')} />
        <div className="h-2 bg-gray-100" />

        <MenuLink icon={<HelpCircle size={24} />} text="FAQs" onClick={() => navigate('/faqs')} />
        <div className="border-t border-gray-200" />

        <MenuLink icon={<Headphones size={24} />} text="Help Center" onClick={() => navigate('/help')} />
        <div className="h-2 bg-gray-100" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-5 text-red-500"
        >
          <LogOut size={24} className="mr-4" />
          <span className="flex-1 text-left text-lg">Logout</span>
        </button>
      </div>
    </div>
  );
}

function MenuLink({ icon, text, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center px-4 py-5">
      <div className="mr-4 text-gray-700">{icon}</div>
      <span className="flex-1 text-left text-lg">{text}</span>
      <ChevronRight size={24} className="text-gray-400" />
    </button>
  );
}
