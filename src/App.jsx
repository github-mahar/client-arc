import HomePage from './HomePage';
import { ThemeProvider } from './ThemeContext';
import WhatsAppWidget from './components/WhatsAppWidget';

function App() {
  return (
    <ThemeProvider>
      <HomePage />
      <WhatsAppWidget />
    </ThemeProvider>
  );
}

export default App
