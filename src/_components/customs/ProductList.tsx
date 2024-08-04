'use client'

import { useProducts } from '@/_hooks/useProducts'
import ItemCard from './ItemCard'

const ProductList: React.FC = () => {
  const { products, loading, error } = useProducts()

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="flex flex-wrap justify-center md:justify-start">
          {products.map(product => (
            <ItemCard key={product.slug} product={product} slug={product.slug} />
          ))}
        </div>
      )}
    </>
  )
}

export default ProductList
