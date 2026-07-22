import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './components/BookingPage';
import { ThemeProvider } from './ThemeContext';
import WhatsAppWidget from './components/WhatsAppWidget';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
        <WhatsAppWidget />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
