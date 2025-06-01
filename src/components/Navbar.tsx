"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
        setIsScrolled(false);
        return;
      }

      setIsScrolled(true);
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const navItems = [
    "Features",
    "Stats",
    "Pricing",
    "About",
    "Contact",
    "_Dashboard",
  ];

  return (
    <motion.nav
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300",
        isScrolled
          ? "h-16 bg-background/95 backdrop-blur-md shadow-sm"
          : "h-20 bg-transparent backdrop-blur-sm"
      )}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <motion.a
          href="/"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img src="/src/assets/react.svg" className="h-7 w-7" alt="Logo" />
          <span className="text-lg font-medium tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            ExpenseAI
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={
                  item.startsWith("_")
                    ? `${item.toLowerCase().slice(1)}`
                    : `#${item.toLowerCase()}`
                }
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {item.startsWith("_") ? item.slice(1) : item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </nav>
          <ModeToggle />
        </div>

        {/* Mobile Navigation Toggle - Only hamburger button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 focus:outline-none rounded-full hover:bg-accent/50 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="x-icon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu-icon"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background border-b overflow-hidden fixed top-16 left-0 w-full"
          >
            <div className="container mx-auto px-4 py-6 h-full flex flex-col justify-between">
              <nav className="flex flex-col space-y-5 items-center justify-center mt-10">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={
                      item.startsWith("_")
                        ? `${item.toLowerCase().slice(1)}`
                        : `#${item.toLowerCase()}`
                    }
                    className="text-xl py-3 font-medium text-muted-foreground hover:text-primary transition-colors flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.startsWith("_") ? item.slice(1) : item}
                  </motion.a>
                ))}
                <motion.div
                  className="pt-4 border-t flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navItems.length * 0.05 + 0.1 }}
                >
                  <span className="text-sm text-muted-foreground mr-3">
                    Theme
                  </span>
                  <ModeToggle />
                </motion.div>
              </nav>

              <motion.button
                className="mx-auto mb-10 p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.05 + 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
