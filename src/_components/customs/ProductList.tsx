'use client'

import { useProducts } from '@/_hooks/useProducts'
import ItemCard from './ItemCard'
import { getMyFavorites } from '@/_hooks/getMyFavorites'
import { useEffect, useState } from 'react'

export function ProductList() {
  const { products, loading, error } = useProducts()
  const [myFavorites, setMyFavorites] = useState<string[]>([])

  function handleToggleFavorite(id: string, isFavorite: boolean) {
    console.log(id, isFavorite)
  }

  useEffect(() => {
    async function fetchMyFavorites() {
      await getMyFavorites().then(favorites =>
        favorites ? setMyFavorites(favorites) : setMyFavorites([]),
      )
    }
    fetchMyFavorites()
  }, [])

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="flex flex-wrap justify-center md:justify-start">
          {products.map(product => {
            return (
              <ItemCard
                key={product.slug}
                product={product}
                slug={product.slug}
                isFavorite={myFavorites.includes(product.id) ?? false}
                toggleFavorite={handleToggleFavorite}
              />
            )
          })}
        </div>
      )}
    </>
  )
}
