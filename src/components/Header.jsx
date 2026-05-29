import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, MoreVertical, Menu, Pencil, LogIn, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0D14] text-[14px] font-sans antialiased border-b border-transparent">
      <div className="mx-auto w-full px-4 lg:px-8 h-[72px] flex items-center justify-between relative bg-[#0B0D14] z-50">

        <div className="md:hidden flex flex-1 justify-start">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#8F939D] hover:text-white transition-colors cursor-pointer shrink-0 p-2 -ml-2"
          >
            {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-4 lg:gap-8 shrink-0 flex-1 md:flex-none">
          <div className="flex items-center cursor-pointer text-[#13AFF0]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 32" className="h-9 w-auto">
              <path fill="#13AFF0" fillRule="evenodd" d="M35 24.354c0-.704-.208-1.36-.565-1.91L22.937 2.525A3.54 3.54 0 0 0 19.813.652h-6.077l17.76 30.666 2.8-4.833c.553-.925.704-1.334.704-2.131m-35-.037 2.956 5.093h.001a3.54 3.54 0 0 0 3.157 1.938h19.624l-4.072-7.03zM10.832 5.621l7.938 13.701H2.893z" clipRule="evenodd" />
            </svg>
          </div>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6 font-medium text-[#8F939D]">
            <button className="hover:text-white transition-colors cursor-pointer text-[#A0A4AB]">Explore</button>
            <button className="hover:text-white transition-colors cursor-pointer">Learn</button>
            <button className="hover:text-white transition-colors cursor-pointer">Shop</button>
            <button className="hover:text-white transition-colors cursor-pointer whitespace-nowrap">Find a Job</button>
            <button className="hover:text-white transition-colors cursor-pointer">Hire</button>
          </nav>
        </div>

        <div className="hidden md:flex flex-1 justify-center w-full px-4">
          <div className="relative w-full max-w-[700px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-[#555A64] pointer-events-none" />
            <input
              type="text"
              placeholder="Search"
              className="w-full h-10 bg-[#15171E] border border-[#242730] rounded-full pl-10 pr-4 text-[14px] text-white placeholder-[#555A64] focus:outline-none focus:border-[#3A3F4B] focus:bg-[#1A1D24] transition-colors"
            />
          </div>
        </div>

        <div className="flex md:flex-none flex-1 items-center justify-end gap-3 shrink-0">
          <button className="hidden sm:block text-[#8F939D] hover:text-white transition-colors relative" title="Cart">
            <ShoppingCart className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-2 lg:ml-2">
            <button className="hidden md:flex h-10 bg-[#2A2C32] hover:bg-[#34373F] text-white font-medium text-[14px] px-5 rounded items-center gap-2 transition-colors cursor-pointer">
              <Pencil className="h-4 w-4 text-white" />
              Sign up
            </button>
            <button className="h-10 md:h-10 bg-[#13AFF0] hover:bg-[#25B9F5] text-white font-bold text-[14px] px-5 rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-sky-500/20">
              <LogIn className="md:hidden h-5 w-5 stroke-[2.5]" />
              <span className="hidden sm:inline">Sign In</span>
              <span className="sm:hidden font-semibold">Sign In</span>
            </button>
          </div>

          <button className="hidden md:block text-[#8F939D] hover:text-white transition-colors ml-1 cursor-pointer">
            <MoreVertical className="h-6 w-6" />
          </button>
        </div>

      </div>

      <nav 
        className={`md:hidden absolute top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-[#101115] flex flex-col z-40 overflow-y-auto pb-10 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="px-5 py-4 flex flex-col gap-6">
            <div className="flex items-center justify-between text-gray-400">
                <button className="hover:text-white transition p-1">
                    <ShoppingCart className="w-6 h-6" />
                </button>
                <button className="flex items-center gap-2 hover:text-white transition font-medium text-sm tracking-wide p-1">
                    <Pencil className="w-4 h-4" />
                    SIGN UP
                </button>
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-500" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full bg-[#1e2025] text-white border border-gray-700 rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:border-gray-500 focus:bg-[#25282e] transition" 
                />
            </div>

            <ul className="flex flex-col mt-2 gap-1">
                <li><button className="w-full text-left block py-3 text-[19px] text-gray-300 hover:text-white transition">Explore</button></li>
                <li><button className="w-full text-left block py-3 text-[19px] text-gray-300 hover:text-white transition">Learn</button></li>
                <li><button className="w-full text-left block py-3 text-[19px] text-gray-300 hover:text-white transition">Shop</button></li>
                <li><button className="w-full text-left block py-3 text-[19px] text-gray-300 hover:text-white transition">Find a Job</button></li>
                <li><button className="w-full text-left block py-3 text-[19px] text-gray-300 hover:text-white transition">Hire</button></li>
                <li><button className="w-full text-left block py-3 text-[19px] text-gray-300 hover:text-white transition">More</button></li>
            </ul>
        </div>
      </nav>
    </header>
  );
}
