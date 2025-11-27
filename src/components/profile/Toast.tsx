"use client";

import React, { useEffect, useState, useRef } from "react";
import { FiCheckCircle } from "react-icons/fi";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, duration = 2000 }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        closeTimerRef.current = setTimeout(() => {
          onClose();
        }, 300); // Wait for fade out animation
      }, duration);

      return () => {
        clearTimeout(timer);
        if (closeTimerRef.current) {
          clearTimeout(closeTimerRef.current);
        }
      };
    } else {
      setShouldRender(false);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, duration]);

  if (!isVisible && !shouldRender) return null;

  return (
    <div
      className={`absolute top-4 right-4 z-10 transition-all duration-300 ${
        isVisible && shouldRender
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2"
      }`}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-(--colorGrey) px-4 py-3 flex items-center gap-3 min-w-[250px] max-w-[350px]">
        <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
        <p className="text-sm font-normal text-preto flex-1">{message}</p>
      </div>
    </div>
  );
};

export default Toast;

