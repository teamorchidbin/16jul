
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/settings/Profile";
import { General } from "./pages/settings/General";
import { Calendars } from "./pages/settings/Calendars";
import { Conferencing } from "./pages/settings/Conferencing";
import { Appearance } from "./pages/settings/Appearance";
import { OutOfOffice } from "./pages/settings/OutOfOffice";
import { ImportCalendly } from "./pages/settings/ImportCalendly";
import { Webhooks } from "./pages/settings/Webhooks";
import { ApiKeys } from "./pages/settings/ApiKeys";
import { EventTypes } from "./pages/EventTypes";
import { EditEvent } from "./pages/EditEvent";
import NotFound from "./pages/NotFound";
import Bookings from "./pages/Bookings";
import { Password } from "./pages/settings/Password";
import { Impersonation } from "./pages/settings/Impersonation";
import { TeamNew } from "./pages/settings/TeamNew";
import { TeamDetail } from "./pages/settings/TeamDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<EventTypes />} />
            <Route path="event/:eventId/:tab" element={<EditEvent />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="availability" element={<div className="p-8">Availability page coming soon</div>} />
            <Route path="teams" element={<div className="p-8">Teams page coming soon</div>} />
            <Route path="apps" element={<div className="p-8">Apps page coming soon</div>} />
            <Route path="routing-forms" element={<div className="p-8">Routing Forms page coming soon</div>} />
            <Route path="workflows" element={<div className="p-8">Workflows page coming soon</div>} />
            <Route path="insights" element={<div className="p-8">Insights page coming soon</div>} />
          </Route>
          
          <Route path="/settings" element={<Settings />}>
            <Route path="profile" element={<Profile />} />
            <Route path="general" element={<General />} />
            <Route path="calendars" element={<Calendars />} />
            <Route path="conferencing" element={<Conferencing />} />
            <Route path="appearance" element={<Appearance />} />
            <Route path="out-of-office" element={<OutOfOffice />} />
            <Route path="security/password" element={<Password />} />
            <Route path="security/impersonation" element={<Impersonation />} />
            <Route path="import/calendly" element={<ImportCalendly />} />
            <Route path="developer/webhooks" element={<Webhooks />} />
            <Route path="developer/api-keys" element={<ApiKeys />} />
            <Route path="teams/new" element={<TeamNew />} />
            <Route path="teams/:teamId" element={<TeamDetail />} />
            <Route path="teams/:teamId/:section" element={<TeamDetail />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
