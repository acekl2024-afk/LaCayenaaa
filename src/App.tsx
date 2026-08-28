import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CartDrawer } from './components/CartDrawer';
import { DishCustomizationModal } from './components/DishCustomizationModal';
import { ToastContainer } from './components/Toast';
import { MediaLibraryModal } from './components/MediaLibraryModal';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { OrderPage } from './pages/OrderPage';
import { OrderConfirmedPage } from './pages/OrderConfirmedPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'menu':
        return <MenuPage />;
      case 'order':
        return <OrderPage />;
      case 'order-confirmed':
        return <OrderConfirmedPage />;
      case 'reservations':
        return <ReservationsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'blog':
        return <BlogPage />;
      case 'blog-post':
        return <BlogPostPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E8] font-sans antialiased text-[#1E1B18] selection:bg-[#B52A2A] selection:text-white">
      {/* Global Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Cart Side Drawer */}
      <CartDrawer />

      {/* Dish Customization & Add Modal */}
      <DishCustomizationModal />

      {/* Notification Toasts */}
      <ToastContainer />

      {/* Restaurant Media Library & Upload Manager */}
      <MediaLibraryModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
