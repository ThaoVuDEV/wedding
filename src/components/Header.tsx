import React from "react";

interface HeaderProps {
  groomName: string;
  brideName: string;
}

export const Header: React.FC<HeaderProps> = ({ groomName, brideName }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose to-white flex flex-col items-center justify-center px-6 py-8">
      <div className="text-center space-y-6">
        <div className="mb-8">
          <h2 className="text-xl text-burgundy font-light tracking-widest mb-4">
            TOGETHER WITH THEIR FAMILIES
          </h2>
          <h1 className="text-5xl md:text-6xl font-serif text-burgundy mb-2">
            {groomName}
          </h1>
          <p className="text-2xl text-gray-600 font-light">and</p>
          <h1 className="text-5xl md:text-6xl font-serif text-burgundy mt-2">
            {brideName}
          </h1>
        </div>

        <div className="flex justify-center items-center gap-4 py-6">
          <div className="w-12 h-px bg-burgundy opacity-50"></div>
          <div className="text-3xl text-gold">💍</div>
          <div className="w-12 h-px bg-burgundy opacity-50"></div>
        </div>

        <p className="text-lg text-gray-700 font-light italic">
          Request the honour of your presence at the marriage of
        </p>
      </div>
    </div>
  );
};
