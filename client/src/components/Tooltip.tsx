import React, { useState } from "react";

type TooltipProps = {
  content: React.ReactNode; // The content to be displayed inside the tooltip
  showDelay?: number; // Delay (in milliseconds) before the tooltip appears on hover
  hideDelay?: number; // Delay (in milliseconds) before the tooltip disappears on mouse leave
  width?: string; // The width of the tooltip
  position?: "top" | "bottom" | "left" | "right"; // Tooltip position (default is 'top')
  children: React.ReactNode; // The element that the tooltip is applied to
};

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  width,
  showDelay = 300,
  hideDelay = 200,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  let timeoutId: number;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      setIsVisible(true);
    }, showDelay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className="relative inline-block">
          <div
            className={`absolute bg-gray-900 text-white p-2 rounded-lg shadow-md ${position} transform -translate-x-1/2 ${
              position === "top" || position === "bottom" ? "left-1/2" : ""
            } ${position === "left" || position === "right" ? "top-1/2" : ""}`}
          >
            <div className={`text-sm font-medium ${width}`}>{content}</div>
          </div>
          <div
            className={`absolute ${position === "top" ? "bottom-0" : ""}${
              position === "bottom" ? "top-0" : ""
            }${position === "left" ? "right-0" : ""}${
              position === "right" ? "left-0" : ""
            } w-0 h-0`}
          >
            <div
              className={`border-solid border w-3 h-3 ${
                position === "top" ? "border-t-4 border-l-4" : ""
              }${position === "bottom" ? "border-b-4 border-r-4" : ""}${
                position === "left" ? "border-l-4 border-t-4" : ""
              }${position === "right" ? "border-r-4 border-b-4" : ""}`}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
