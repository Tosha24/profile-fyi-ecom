import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrease}
        className="px-2 py-1 bg-gray-300 text-gray-700 rounded"
      >
        -
      </button>
      <span className="px-3 py-1 border border-gray-300 rounded">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="px-2 py-1 bg-gray-300 text-gray-700 rounded"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;