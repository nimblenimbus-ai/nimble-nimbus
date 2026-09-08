import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import About from "@/pages/about";
import Labs from "@/pages/labs";
import Ventures from "@/pages/ventures";
import Nexus from "@/pages/nexus";
import Insights from "@/pages/insights";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/labs" component={Labs} />
        <Route path="/ventures" component={Ventures} />
        <Route path="/nexus" component={Nexus} />
        <Route path="/insights" component={Insights} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
