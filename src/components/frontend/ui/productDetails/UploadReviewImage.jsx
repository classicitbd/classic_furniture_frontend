import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

const UploadReviewImage = () => {
  const [images, setImages] = useState([])
  const [selectedImageCount, setSelectedImageCount] = useState(0)
  const handleImageChange = e => {
    const selectedImages = Array.from(e.target.files)
    setImages([...images, ...selectedImages])
    setSelectedImageCount(selectedImages?.length)
  }

  const handleRemoveImage = index => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)
    setSelectedImageCount(updatedImages?.length)
  }
  return (
    <div className="text-sm py-3">
      <div className="text-sm py-3">
        <p>Upload Multiple Image</p>
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <div className="w-20 h-20">
        <label htmlFor="fileInput">
          <span className="w-20 h-20 bg-gray-200 flex items-center justify-center cursor-pointer">
            <FaPlus className="text-3xl text-gray-600" />
          </span>
        </label>
      </div>
      <p className="text-sm pt-2 text-gray-700">
        Selected images: {selectedImageCount}
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-20 h-20 object-cover"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="text-sm bg-red-700 font-semibold text-white px-3 py-1.5 mt-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UploadReviewImage
