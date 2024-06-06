// import { useState } from "react";
// import { Range, getTrackBackground } from "react-range";

// const PriceRangeSlider = ({ minPrice, maxPrice, onPriceChange }) => {
//   const [values, setValues] = useState([minPrice, maxPrice]);

//   const handleChange = (values) => {
//     setValues(values);
//     onPriceChange(values);
//   };

//   return (
//     <div className="price-range-slider">
//       <Range
//         values={values}
//         step={1}
//         min={minPrice}
//         max={maxPrice}
//         onChange={handleChange}
//         renderTrack={({ props, children }) => (
//           <div
//             {...props}
//             className="w-full h-2 bg-gray-200 rounded"
//             style={{
//               background: getTrackBackground({
//                 values,
//                 colors: ["#ccc", "#548BF4", "#ccc"],
//                 min: minPrice,
//                 max: maxPrice,
//               }),
//             }}
//           >
//             {children}
//           </div>
//         )}
//         renderThumb={({ props }) => (
//           <div {...props} className="w-4 h-4 bg-blue-500 rounded-full shadow" />
//         )}
//       />
//       <div className="flex justify-between mt-2">
//         <span>৳ {values[0]}</span>
//         <span>৳ {values[1]}</span>
//       </div>
//     </div>
//   );
// };

// export default PriceRangeSlider;

// PriceRangeSlider.js

import { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const PriceRangeSlider = ({ maxPrice, loading, onPriceChange }) => {
  const [values, setValues] = useState([1, maxPrice ? maxPrice : 200000]);

  const handleChange = (values) => {
    setValues(values);
    onPriceChange(values);
  };

  return (
    <div>
      <Range
        values={values}
        step={1}
        min={1}
        max={maxPrice ? maxPrice : 200000}
        onChange={handleChange}
        // onFinalChange={handlePriceChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              background: getTrackBackground({
                values,
                colors: ["#ccc", "#00b4d8", "#ccc"],
                min: 1,
                max: maxPrice ? maxPrice : 200000,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            className="outline-none"
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: "#00b4d8",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          />
        )}
      />

      {loading ? (
        <div className="text-center text-sm pt-1">
          <MiniSpinner />{" "}
        </div>
      ) : (
        <div className="flex justify-between mt-2">
          <span>৳ {values[0]} </span>
          <span>৳ {values[1]} </span>
        </div>
      )}
    </div>
  );
};

export default PriceRangeSlider;
