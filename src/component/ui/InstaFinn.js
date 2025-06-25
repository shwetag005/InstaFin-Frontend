import React from 'react';

const InstaFinn = ({isPanel=false,isAdmin=false}) => {
  return (
    <div>
      <h1 className="ml-2 text-4xl font-bold text-gray-900 glow">
        InstaFinn
      </h1>
      {isPanel && isAdmin && <p className="text-xs font-semibold text-gray-700 ml-24">Admin Panel</p>}
    </div>
  );
};

export default InstaFinn;