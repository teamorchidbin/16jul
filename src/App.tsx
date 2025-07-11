
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/settings/Profile";
import { EventTypes } from "./pages/EventTypes";
import { EditEvent } from "./pages/EditEvent";
import NotFound from "./pages/NotFound";

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
            <Route path="bookings" element={<div className="p-8">Bookings page coming soon</div>} />
            <Route path="availability" element={<div className="p-8">Availability page coming soon</div>} />
            <Route path="teams" element={<div className="p-8">Teams page coming soon</div>} />
            <Route path="apps" element={<div className="p-8">Apps page coming soon</div>} />
            <Route path="routing-forms" element={<div className="p-8">Routing Forms page coming soon</div>} />
            <Route path="workflows" element={<div className="p-8">Workflows page coming soon</div>} />
            <Route path="insights" element={<div className="p-8">Insights page coming soon</div>} />
          </Route>
          
          <Route path="/settings" element={<Settings />}>
            <Route path="profile" element={<Profile />} />
            <Route path="general" element={<div className="p-8">General settings coming soon</div>} />
            <Route path="calendars" element={<div className="p-8">Calendar settings coming soon</div>} />
            <Route path="conferencing" element={<div className="p-8">Conferencing settings coming soon</div>} />
            <Route path="appearance" element={<div className="p-8">Appearance settings coming soon</div>} />
            <Route path="out-of-office" element={<div className="p-8">Out of office settings coming soon</div>} />
            <Route path="security/password" element={<div className="p-8">Password settings coming soon</div>} />
            <Route path="security/impersonation" element={<div className="p-8">Impersonation settings coming soon</div>} />
            <Route path="import/calendly" element={<div className="p-8">Calendly import coming soon</div>} />
            <Route path="developer/webhooks" element={<div className="p-8">Webhooks settings coming soon</div>} />
            <Route path="developer/api-keys" element={<div className="p-8">API keys settings coming soon</div>} />
            <Route path="teams/new" element={<div className="p-8">Add team coming soon</div>} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
