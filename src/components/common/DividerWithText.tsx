"use client";

export const DiverWithText = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow h-px bg-gray-300" />
      <span className="px-4 text-sm text-gray-500">{text}</span>
      <div className="flex-grow h-px bg-gray-300" />
    </div>
  );
};
