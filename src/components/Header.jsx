import React from 'react';
import { Search, ShoppingCart, MoreVertical, Menu, Pencil, LogIn } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0D14] text-[14px] font-sans antialiased border-b border-transparent">
      <div className="mx-auto w-full px-4 lg:px-8 h-[72px] flex items-center justify-between relative">

        <div className="md:hidden flex flex-1 justify-start">
          <button className="text-[#8F939D] hover:text-white transition-colors cursor-pointer shrink-0">
            <Menu className="h-8 w-8" />
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
    </header>
  );
}
