import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "../src/components/ui/toaster";
import { Toaster as Sonner } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "../src/pages/Home";
import Blogs from "../src/pages/Blogs";
import NotFound from "../src/pages/NotFound";
import HomePage from "./HomePage";
import AuthForm from "./Auth";
import BusinessIdeaValidator from "./pages/Validator";
import Navbar from "./components/ui/Navbar";
import CaseStudiesPage from "./CaseStudies";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs" element={<Blogs />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/home" element={<Home/>} />
            <Route path="/api/auth" element={<AuthForm/>} />
            <Route path="/validator" element={<BusinessIdeaValidator/>} />
            <Route path="/casestudies" element={<CaseStudiesPage/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
