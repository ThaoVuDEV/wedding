import React from "react";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  menuItems: string[];
  currentPage: number;
}

export const NavMenu: React.FC<NavMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  menuItems,
  currentPage,
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Menu Button */}
      <button
        onClick={() => (isOpen ? onClose : onNavigate(-1))}
        className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-burgundy text-white flex items-center justify-center transition-all transform hover:scale-110 lg:hidden"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Navigation Menu */}
      <nav
        className={`fixed left-0 top-0 h-screen w-64 bg-burgundy text-white z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:h-screen lg:w-auto lg:bg-transparent lg:top-auto`}
      >
        <div className="p-6 pt-20 lg:pt-6 lg:hidden flex flex-col gap-4">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                onNavigate(idx);
                onClose();
              }}
              className={`text-left px-4 py-3 rounded-lg transition-all ${
                currentPage === idx
                  ? "bg-white text-burgundy font-medium"
                  : "text-white hover:bg-white hover:bg-opacity-10"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:flex-col lg:gap-2 lg:p-6">
          {menuItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`text-xs font-light px-2 py-2 rounded transition-all ${
                currentPage === idx
                  ? "text-burgundy font-medium"
                  : "text-gray-600 hover:text-burgundy"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};
