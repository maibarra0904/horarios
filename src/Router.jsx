import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Schedule from './components/Schedule';
import Home from './components/Home';
import Individual from './components/Individual';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/individual/:id" element={<Individual />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;