import { X } from "lucide-react";
import React from "react";

const Modal = ({ onClose, children }) => {
  return (
    <>
      <div className="backdrop">
        <div
          className="fixed inset-0 bg-gray-600/75 transition-opacity"
          aria-hidden="true" 
        ></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <button className="absolute right-2 top-2 z-20" onClick={onClose}>
                <X className="size-6 text-gray-700 cursor-pointer" />
              </button>
              <div className="relative bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
