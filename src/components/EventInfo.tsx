import React from "react";

interface EventInfoProps {
  date: string;
  time: string;
  venue: string;
  address: string;
}

export const EventInfo: React.FC<EventInfoProps> = ({
  date,
  time,
  venue,
  address,
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-8">
      <div className="max-w-md w-full space-y-12">
        <h2 className="text-4xl font-serif text-burgundy text-center mb-12">
          Ngày Kết Hôn
        </h2>

        <div className="space-y-8">
          <div className="border-l-4 border-gold pl-6">
            <h3 className="text-burgundy font-serif text-2xl mb-2">
              Thời Gian
            </h3>
            <p className="text-gray-700 text-lg font-light">{date}</p>
            <p className="text-gray-600 text-lg font-light">{time}</p>
          </div>

          <div className="border-l-4 border-gold pl-6">
            <h3 className="text-burgundy font-serif text-2xl mb-2">Địa Điểm</h3>
            <p className="text-gray-700 text-lg font-medium">{venue}</p>
            <p className="text-gray-600 text-base font-light mt-2">{address}</p>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <button className="px-8 py-3 bg-burgundy text-white rounded-full hover:bg-opacity-90 transition-all font-light tracking-wider">
            XEM BẢN ĐỒ
          </button>
        </div>
      </div>
    </div>
  );
};
