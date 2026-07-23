import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './components/BookingPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import { ThemeProvider } from './ThemeContext';
import WhatsAppWidget from './components/WhatsAppWidget';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
        </Routes>
        <WhatsAppWidget />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
