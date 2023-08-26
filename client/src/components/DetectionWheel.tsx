import React from "react";

interface DetectionWheelProps {
  totalVendors: number;
  threatVendors: number;
  unsecureVendors: number;
}

const DetectionWheel: React.FC<DetectionWheelProps> = ({
  totalVendors,
  threatVendors,
  unsecureVendors,
}) => {
  return (
    <div className="relative inline-block">
      <div
        className={`w-16 h-16 border-4 rounded-full ${
          threatVendors > 0 ? `border-red-600` : `border-green-500`
        } ${unsecureVendors > 0 ? `border-yellow-500` : `border-green-500`}`}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`font-semibold text-lg sm:text-xl dark:text-white text-center flex flex-col`}
        >
          <span
            className={`text-3xl sm:text-3xl ${
              threatVendors > 0 ? `text-red-600` : `text-green-500`
            }`}
          >
            {threatVendors}
          </span>
          <span className="text-gray-500 text-sm sm:text-base">
            /{totalVendors}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetectionWheel;
