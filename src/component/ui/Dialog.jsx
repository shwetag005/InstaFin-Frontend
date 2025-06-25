import React from "react";

export const Dialog = ({ open, children }) => {
  return open ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">{children}</div>
    </div>
  ) : null;
};

export const DialogContent = ({ className, children }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const DialogHeader = ({ children }) => {
  return <div className="text-lg font-semibold mb-2">{children}</div>;
};

export const DialogTitle = ({ children }) => {
  return <h2 className="text-xl font-bold">{children}</h2>;
};

export const DialogFooter = ({ children }) => {
  return <div className="flex justify-end mt-4 gap-2">{children}</div>;
};
