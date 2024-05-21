import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const PriceRangeSlider = ({ minPrice, maxPrice, onPriceChange }) => {
  const [values, setValues] = useState([minPrice, maxPrice]);

  const handleChange = (values) => {
    setValues(values);
    onPriceChange(values);
  };

  return (
    <div className="price-range-slider">
      <Range
        values={values}
        step={1}
        min={minPrice}
        max={maxPrice}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-2 bg-gray-200 rounded"
            style={{
              background: getTrackBackground({
                values,
                colors: ["#ccc", "#548BF4", "#ccc"],
                min: minPrice,
                max: maxPrice,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} className="w-4 h-4 bg-blue-500 rounded-full shadow" />
        )}
      />
      <div className="flex justify-between mt-2">
        <span>৳ {values[0]}</span>
        <span>৳ {values[1]}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
