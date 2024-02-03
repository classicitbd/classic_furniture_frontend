const BigSpinner = () => {
  return (
    <>
      <div className="min-h-screen">
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          <div className="col-span-12 min-h-screen">
            <div className="bg-white shadow-md rounded-md p-4 min-h-screen">
              <h5 className="font-bold text-xl mb-4">
                <span className="bg-gray-300 h-6 w-6 rounded-full inline-block"></span>
                <a
                  className="btn btn-primary disabled inline-block w-6"
                  aria-disabled="true"
                ></a>
              </h5>
              <hr className="my-4" />

              <div className="flex justify-between mb-4">
                <div className="w-1/6 h-6 bg-gray-300 rounded-md"></div>
                <div className="w-1/6 h-6 bg-gray-300 rounded-md"></div>
              </div>

              <div className="bg-gray-300 mb-1 h-6 rounded-md"></div>

              <div className="flex gap-1 overflow-hidden mb-1">
                <div className="w-1/6 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-1/6 h-4 bg-gray-300 rounded-md"></div>
              </div>

              {/* Repeat the above block for other rows as needed */}

              <div className="flex my-3">
                <div className="w-1/2">
                  <div className="bg-gray-300 h-6 rounded-md"></div>
                </div>

                <div className="w-1/2 flex justify-end gap-2">
                  <div className="w-1/6 h-6 bg-gray-300 rounded-md"></div>
                  <div className="w-1/12 h-6 bg-gray-300 rounded-md"></div>
                  <div className="w-1/12 h-6 bg-gray-300 rounded-md"></div>
                </div>
              </div>

              {/* Now again repeat */}
              <div className="flex justify-between mb-4">
                <div className="w-1/6 h-6 bg-gray-300 rounded-md"></div>
                <div className="w-1/6 h-6 bg-gray-300 rounded-md"></div>
              </div>

              <div className="bg-gray-300 mb-1 h-6 rounded-md"></div>

              <div className="flex gap-1 overflow-hidden mb-1">
                <div className="w-1/6 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-1/6 h-4 bg-gray-300 rounded-md"></div>
              </div>

              {/* Repeat the above block for other rows as needed */}

              <div className="flex my-3">
                <div className="w-1/2">
                  <div className="bg-gray-300 h-6 rounded-md"></div>
                </div>

                <div className="w-1/2 flex justify-end gap-2">
                  <div className="w-1/6 h-6 bg-gray-300 rounded-md"></div>
                  <div className="w-1/12 h-6 bg-gray-300 rounded-md"></div>
                  <div className="w-1/12 h-6 bg-gray-300 rounded-md"></div>
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <div className="w-1/6 h-6 bg-gray-300 rounded-md"></div>
                <div className="w-1/6 h-6 bg-gray-300 rounded-md"></div>
              </div>

              <div className="bg-gray-300 mb-1 h-6 rounded-md"></div>

              <div className="flex gap-1 overflow-hidden mb-1">
                <div className="w-1/6 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-1/6 h-4 bg-gray-300 rounded-md"></div>
              </div>

              {/* Repeat the above block for other rows as needed */}

              <div className="flex my-3">
                <div className="w-1/2">
                  <div className="bg-gray-300 h-6 rounded-md"></div>
                </div>

                <div className="w-1/2 flex justify-end gap-2">
                  <div className="w-1/6 h-6 bg-gray-300 rounded-md"></div>
                  <div className="w-1/12 h-6 bg-gray-300 rounded-md"></div>
                  <div className="w-1/12 h-6 bg-gray-300 rounded-md"></div>
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <div className="w-1/6 h-6 bg-gray-300 rounded-md"></div>
                <div className="w-1/6 h-6 bg-gray-300 rounded-md"></div>
              </div>

              <div className="bg-gray-300 mb-1 h-6 rounded-md"></div>

              <div className="flex gap-1 overflow-hidden mb-1">
                <div className="w-1/6 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-1/6 h-4 bg-gray-300 rounded-md"></div>
              </div>

              {/* Repeat the above block for other rows as needed */}

              <div className="flex my-3">
                <div className="w-1/2">
                  <div className="bg-gray-300 h-6 rounded-md"></div>
                </div>

                <div className="w-1/2 flex justify-end gap-2">
                  <div className="w-1/6 h-6 bg-gray-300 rounded-md"></div>
                  <div className="w-1/12 h-6 bg-gray-300 rounded-md"></div>
                  <div className="w-1/12 h-6 bg-gray-300 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BigSpinner;
