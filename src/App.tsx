
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { EventTypes } from './pages/EventTypes';
import { Bookings } from './pages/Bookings';
import { Availability } from './pages/Availability';
import { EditAvailability } from './pages/EditAvailability';
import { Teams } from './pages/Teams';
import { RoutingForms } from './pages/RoutingForms';
import { EditRoutingForm } from './pages/EditRoutingForm';
import { EditEvent } from './pages/EditEvent';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import { SchedulingComingSoon } from './pages/SchedulingComingSoon';

// Settings pages
import { Profile } from './pages/settings/Profile';
import { General } from './pages/settings/General';
import { Calendars } from './pages/settings/Calendars';
import { Conferencing } from './pages/settings/Conferencing';
import { Appearance } from './pages/settings/Appearance';
import { OutOfOffice } from './pages/settings/OutOfOffice';
import { Password } from './pages/settings/Password';
import { Impersonation } from './pages/settings/Impersonation';
import { ImportCalendly } from './pages/settings/ImportCalendly';
import { Webhooks } from './pages/settings/Webhooks';
import { ApiKeys } from './pages/settings/ApiKeys';
import { TeamDetail } from './pages/settings/TeamDetail';
import { TeamNew } from './pages/settings/TeamNew';

// Team settings pages
import { TeamProfile } from './pages/settings/teams/TeamProfile';
import { TeamMembers } from './pages/settings/teams/TeamMembers';
import { TeamEventTypes } from './pages/settings/teams/TeamEventTypes';
import { TeamAppearance } from './pages/settings/teams/TeamAppearance';
import { TeamBookingLimits } from './pages/settings/teams/TeamBookingLimits';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="event-types" element={<EventTypes />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="availability" element={<Availability />} />
          <Route path="availability/:scheduleId" element={<EditAvailability />} />
          <Route path="teams" element={<Teams />} />
          <Route path="routing-forms" element={<RoutingForms />} />
          <Route path="routing-forms/:formId" element={<EditRoutingForm />} />
          <Route path="event/:eventId/:tab?" element={<EditEvent />} />
          <Route path="apps" element={<SchedulingComingSoon />} />
          <Route path="workflows" element={<SchedulingComingSoon />} />
          <Route path="insights" element={<SchedulingComingSoon />} />
          
          {/* Settings Routes */}
          <Route path="settings" element={<Settings />} />
          <Route path="settings/profile" element={<Profile />} />
          <Route path="settings/general" element={<General />} />
          <Route path="settings/calendars" element={<Calendars />} />
          <Route path="settings/conferencing" element={<Conferencing />} />
          <Route path="settings/appearance" element={<Appearance />} />
          <Route path="settings/out-of-office" element={<OutOfOffice />} />
          <Route path="settings/security/password" element={<Password />} />
          <Route path="settings/security/impersonation" element={<Impersonation />} />
          <Route path="settings/import/calendly" element={<ImportCalendly />} />
          <Route path="settings/developer/webhooks" element={<Webhooks />} />
          <Route path="settings/developer/api-keys" element={<ApiKeys />} />
          <Route path="settings/teams/new" element={<TeamNew />} />
          <Route path="settings/teams/:teamId" element={<TeamDetail />} />
          <Route path="settings/teams/:teamId/profile" element={<TeamProfile />} />
          <Route path="settings/teams/:teamId/members" element={<TeamMembers />} />
          <Route path="settings/teams/:teamId/event-types" element={<TeamEventTypes />} />
          <Route path="settings/teams/:teamId/appearance" element={<TeamAppearance />} />
          <Route path="settings/teams/:teamId/booking-limits" element={<TeamBookingLimits />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
