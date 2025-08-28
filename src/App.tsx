import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import InteractiveBackground from "@/components/InteractiveBackground";
import Home from "@/pages/Home";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route 
        path="/admin" 
        component={() => {
          if (isLoading) {
            return (
              <div>
                <div>Loading...</div>
              </div>
            );
          }

          if (!isAuthenticated) {
            // Redirect to login
            window.location.href = '/api/login';
            return null;
          }

          if (!(user as any)?.isAdmin) {
            return (
              <div>
                <div>
                  <h1>Access Denied</h1>
                  <p>Admin privileges required</p>
                </div>
              </div>
            );
          }

          return <AdminDashboard />;
        }} 
      />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="codequest-theme">
        <TooltipProvider>
          <InteractiveBackground />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
