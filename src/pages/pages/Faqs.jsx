import React, { useState } from 'react'
import Arrow from '../src/img/Arrow.png'
import Bell from '../src/img/Bell (1).png'
import Line from '../src/img/Line 2.png'
import { useNavigate } from 'react-router-dom'

const FAQs = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('General');
    const [openFaq, setOpenFaq] = useState(0); // Birinchi savol ochiq bo'lishi uchun

    const handleGoBack = () => {
        navigate('/account');
    };

    const faqData = [
        {
            question: "How do I make a purchase?",
            answer: "When you find a product you want to purchase, tap on it to view the product details. Check the price, description, and available options (if applicable), and then tap the \"Add to Cart\" button. Follow the on-screen instructions to complete the purchase, including providing shipping details and payment information."
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. For some regions, we also offer cash on delivery and installment payment options."
        },
        {
            question: "How do I track my orders?",
            answer: "You can track your orders by going to the 'My Orders' section in your account. There you will see a list of all your orders, their current status, and tracking information once they've been shipped."
        },
        {
            question: "Can I cancel or return an order?",
            answer: "Yes, you can cancel an order within 24 hours of placing it. For returns, we have a 30-day return policy for most items. Visit the order details in your account to initiate a cancellation or return."
        },
        {
            question: "How can I contact customer support for assistance?",
            answer: "You can contact our customer support team through the 'Help Center' section in your account, by emailing support@example.com, or by calling our toll-free number at 1-800-123-4567. Our support team is available 24/7."
        },
        {
            question: "How do I create an account?",
            answer: "To create an account, tap on the Account icon at the bottom of the screen, then select 'Sign Up'. Enter your email, create a password, and follow the prompts to complete your profile setup."
        }
    ];

    const handleFaqToggle = (index) => {
        if (openFaq === index) {
            setOpenFaq(null);
        } else {
            setOpenFaq(index);
        }
    };

    const tabs = ['General', 'Account', 'Service', 'Pay'];

    return (
        <div className='w-[390px] h-[844px] bg-white border border-black rounded-[20px]'>
            {/* Header */}
            <div className='flex items-center justify-between px-[24px] pt-[60px] pb-[16px]'>
                <button onClick={handleGoBack}>
                    <img className='w-[24px] h-[24px]' src={Arrow} alt="Back" />
                </button>
                <p className='text-[28px] font-bold'>FAQs</p>
                <button>
                    <img className='w-[24px] h-[24px]' src={Bell} alt="Notifications" />
                </button>
            </div>

            <div className='w-full border-b border-gray-200 mb-[16px]'></div>      {/* Category Tabs */}
            <div className='container mx-auto flex justify-between px-[24px] pb-[16px]'>
                <button className='w-[99px] h-[36px] border border-[#E6E6E6] bg-black hover:bg-white text-white hover:text-black rounded-[10px]'>General</button>
                <button className='w-[99px] h-[36px] border border-[#E6E6E6] bg-black hover:bg-white text-white hover:text-black rounded-[10px]'>Account</button>
                <button className='w-[99px] h-[36px] border border-[#E6E6E6] bg-black hover:bg-white text-white hover:text-black rounded-[10px]'>Service</button>
            </div>
            {/* Search Bar */}
            <div className='px-[16px] mb-[16px]'>
                <div className='relative flex items-center bg-gray-100 rounded-full px-[16px] py-[12px]'>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for questions..."
                        className='w-full bg-transparent outline-none ml-[8px] text-[16px]'
                    />
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-4H9m10 0h2"></path>
                    </svg>
                </div>
            </div>

            {/* FAQ Accordion */}
            <div className='px-[16px] overflow-y-auto max-h-[500px]'>
                {faqData.map((faq, index) => (
                    <div key={index} className='mb-[16px] bg-white rounded-xl border border-gray-200'>
                        <div
                            className='flex justify-between items-center p-[16px] cursor-pointer'
                            onClick={() => handleFaqToggle(index)}
                        >
                            <h3 className='text-[16px] font-semibold'>{faq.question}</h3>
                            <svg
                                className={`w-6 h-6 transition-transform ${openFaq === index ? 'transform rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={openFaq === index ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                            </svg>
                        </div>

                        {openFaq === index && (
                            <div className='px-[16px] pb-[16px] text-[14px] text-gray-600'>
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom Navigation */}

        </div>
    )
}

export default FAQs