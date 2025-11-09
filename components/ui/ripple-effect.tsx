import React from "react";

const RippleEffect = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-[#35ffc3] animate-[ripple_0.7s_linear_infinite]" />
      <style>{`
        @keyframes ripple {
          0% {
            box-shadow:
              0 0 0 0 rgba(101, 255, 120, 0.3),
              0 0 0 0.25em rgba(101, 255, 120, 0.3),
              0 0 0 0.75em rgba(101, 255, 120, 0.3);
          }
          100% {
            box-shadow:
              0 0 0 0.25em rgba(101, 255, 120, 0.3),
              0 0 0 0.5em rgba(101, 255, 120, 0.3),
              0 0 0 1em rgba(101, 255, 120, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default RippleEffect;
