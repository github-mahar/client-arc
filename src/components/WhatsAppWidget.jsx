import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import whatsappIcon from '../assets/whatsapp.svg';

const WHATSAPP_NUMBER = '+923458612538'; // Replace with actual number
const DEFAULT_MESSAGE = 'Hello! I would like to know more about your counseling services.';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [mounted, setMounted] = useState(false);
  const [pulse, setPulse] = useState(true);
  const location = useLocation();

  const isBookingPage = location.pathname === '/booking';
  const fabBottom = isBookingPage ? '5.25rem' : '1.5rem';
  const popupBottom = isBookingPage ? '9.25rem' : '5.5rem';

  useEffect(() => {
    setMounted(true);
    // Stop the pulse animation after 10 seconds
    const timer = setTimeout(() => setPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      '_blank'
    );
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat popup */}
      <div
        className={`whatsapp-popup ${isOpen ? 'whatsapp-popup--open' : ''}`}
        style={{
          position: 'fixed',
          bottom: popupBottom,
          right: '1.5rem',
          zIndex: 9998,
          width: 'min(360px, calc(100vw - 3rem))',
          pointerEvents: isOpen ? 'auto' : 'none',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
          transition: 'opacity 0.3s ease, transform 0.3s ease, bottom 0.3s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: '#075e54',
            borderRadius: '1rem 1rem 0 0',
            padding: '1.25rem 1.25rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            <img src={whatsappIcon} alt="WhatsApp" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                color: 'white',
                fontWeight: 700,
                fontSize: '1rem',
                lineHeight: 1.3,
                fontFamily: "'El Messiri', sans-serif",
              }}
            >
              ARC Counselling
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: '0.8rem',
                lineHeight: 1.4,
              }}
            >
              Typically replies within an hour
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              padding: '4px',
              transition: 'color 0.2s',
              lineHeight: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Chat body */}
        <div
          style={{
            background: '#e5ddd5',
            padding: '1.25rem 1rem',
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8bfb6' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          {/* Greeting bubble */}
          <div
            style={{
              background: 'white',
              borderRadius: '0 0.75rem 0.75rem 0.75rem',
              padding: '0.75rem 1rem',
              fontSize: '0.9rem',
              lineHeight: 1.55,
              color: '#303030',
              maxWidth: '85%',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontWeight: 600, color: '#075e54', marginBottom: '0.25rem', fontSize: '0.8rem' }}>
              ARC Counseling
            </div>
            👋 Hi there! How can I help you today? Feel free to send us a message and we'll get back to you as soon as possible.
            <div
              style={{
                fontSize: '0.7rem',
                color: '#999',
                textAlign: 'right',
                marginTop: '0.35rem',
              }}
            >
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        {/* Input area */}
        <div
          style={{
            background: '#f0f0f0',
            borderRadius: '0 0 1rem 1rem',
            padding: '0.75rem',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'flex-end',
          }}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            rows={1}
            style={{
              flex: 1,
              resize: 'none',
              border: 'none',
              borderRadius: '1.25rem',
              padding: '0.65rem 1rem',
              fontSize: '0.88rem',
              fontFamily: "'DM Sans', sans-serif",
              background: 'white',
              color: '#303030',
              outline: 'none',
              lineHeight: 1.4,
              maxHeight: '80px',
              overflowY: 'auto',
            }}
          />
          <button
            onClick={handleSend}
            aria-label="Send message on WhatsApp"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        id="whatsapp-widget-fab"
        onClick={() => {
          setIsOpen(!isOpen);
          setPulse(false);
        }}
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
        style={{
          position: 'fixed',
          bottom: fabBottom,
          right: '1.5rem',
          zIndex: 9999,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: isOpen ? '#075e54' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          boxShadow: isOpen ? '0 8px 24px rgba(7, 94, 84, 0.4)' : '0 8px 24px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, bottom 0.3s ease',
          transform: mounted ? 'scale(1)' : 'scale(0)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {/* Pulse ring */}
        {pulse && !isOpen && (
          <span
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              border: '2px solid #25d366',
              animation: 'whatsapp-pulse 2s ease-out infinite',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Icon */}
        <div
          style={{
            width: '100%',
            height: '100%',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <img src={whatsappIcon} alt="WhatsApp" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
          )}
        </div>
      </button>

      {/* Keyframe animation */}
      <style>{`
        @keyframes whatsapp-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </>
  );
}
