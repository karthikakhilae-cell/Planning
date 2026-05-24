import { BrowserRouter as Router, Routes, Route, useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { cloneElement, ReactElement } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import PageTransition from "./components/layout/PageTransition";
import AIAssistant from "./components/ai/AIAssistant";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Lab from "./pages/Lab";
import About from "./pages/About";
import Thinking from "./pages/Thinking";
import Blogs from "./pages/Blogs";
import Life from "./pages/Life";
import Arts from "./pages/Arts";
import Journal from "./pages/Journal";
import Store from "./pages/Store";
import Contact from "./pages/Contact";
import HireMe from "./pages/HireMe";
import NotFound from "./pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation();
  
  const element = useRoutes([
    { path: "/", element: <PageTransition><Landing /></PageTransition> },
    { path: "/home", element: <PageTransition><Home /></PageTransition> },
    { path: "/work", element: <PageTransition><Work /></PageTransition> },
    { path: "/lab", element: <PageTransition><Lab /></PageTransition> },
    { path: "/about", element: <PageTransition><About /></PageTransition> },
    { path: "/thinking", element: <PageTransition><Thinking /></PageTransition> },
    { path: "/blogs", element: <PageTransition><Blogs /></PageTransition> },
    { path: "/life", element: <PageTransition><Life /></PageTransition> },
    { path: "/arts", element: <PageTransition><Arts /></PageTransition> },
    { path: "/journal", element: <PageTransition><Journal /></PageTransition> },
    { path: "/store", element: <PageTransition><Store /></PageTransition> },
    { path: "/contact", element: <PageTransition><Contact /></PageTransition> },
    { path: "/hire-me", element: <PageTransition><HireMe /></PageTransition> },
    { path: "*", element: <PageTransition><NotFound /></PageTransition> },
  ]);

  if (!element) return null;

  return (
    <AnimatePresence mode="wait">
      {cloneElement(element as ReactElement, { key: location.pathname })}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-bg selection:bg-accent selection:text-white">
        <Navbar />
        <AnimatedRoutes />
        <AIAssistantWrapper />
        <Footer />
      </div>
    </Router>
  );
}

function AIAssistantWrapper() {
  const location = useLocation();
  if (location.pathname === "/") return null;
  return <AIAssistant />;
}
