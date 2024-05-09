import React, { useEffect, useState } from 'react'
import SuggestProductCard from './SuggestProductCard'
import Loader from '../../../common/Loader/Loader'

const SuggestProduct = () => {
  const [products, setProducts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data?.products?.slice(0, 6))
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loader />
  }
  return (
    <div>
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 grid-cols-2  gap-4">
        {products?.map(product => (
          <div key={product.id}>
            <SuggestProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SuggestProduct
