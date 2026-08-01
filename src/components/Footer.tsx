import React from "react";

interface FooterProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
}

export const Footer: React.FC<FooterProps> = ({
  groomName,
  brideName,
  weddingDate,
}) => {
  return (
    <div className="min-h-screen bg-burgundy text-white flex flex-col items-center justify-center px-6 py-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h2 className="text-5xl font-serif mb-4">
            {groomName} & {brideName}
          </h2>
          <div className="flex justify-center items-center gap-4 py-6">
            <div className="w-12 h-px bg-gold opacity-50"></div>
            <div className="text-3xl text-gold">💍</div>
            <div className="w-12 h-px bg-gold opacity-50"></div>
          </div>
          <p className="text-xl font-light mb-4">{weddingDate}</p>
        </div>

        <p className="text-white font-light italic mb-8">
          "Two hearts, one love, forever."
        </p>

        <div className="space-y-4 pt-8">
          <p className="text-sm font-light opacity-75">
            Thank you for celebrating our special day!
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="text-gold hover:text-white transition-colors"
            >
              📧
            </a>
            <a
              href="#"
              className="text-gold hover:text-white transition-colors"
            >
              📱
            </a>
            <a
              href="#"
              className="text-gold hover:text-white transition-colors"
            >
              🌐
            </a>
          </div>
        </div>

        <p className="text-xs font-light opacity-50">
          © 2024 All rights reserved
        </p>
      </div>
    </div>
  );
};
