
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Index } from './pages/Index';
import { EventTypes } from './pages/EventTypes';
import { EditEvent } from './pages/EditEvent';
import Bookings from './pages/Bookings';
import { Availability } from './pages/Availability';
import { EditAvailability } from './pages/EditAvailability';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import { SchedulingComingSoon } from './pages/SchedulingComingSoon';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/event-types" replace />} />
            <Route path="event-types" element={<EventTypes />} />
            <Route path="event/:eventId/setup" element={<EditEvent />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="availability" element={<Availability />} />
            <Route path="availability/:scheduleId" element={<EditAvailability />} />
            <Route path="settings/*" element={<Settings />} />
            <Route path="scheduling-coming-soon" element={<SchedulingComingSoon />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
