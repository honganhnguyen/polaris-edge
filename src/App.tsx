import AppRoutes from 'routes';
import './i18n/config';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <AppRoutes />
      </AnimatePresence>
    </div>
  );
}

export default App;
