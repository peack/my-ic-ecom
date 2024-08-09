'use client'

import { useProducts } from '@/_hooks/useProducts'
import ItemCard from './ItemCard'
import { getMyFavorites, toggleFavorite } from '@/_hooks/useFavorites'
import { useEffect, useState } from 'react'
import { Product } from '@/payload/payload-types'

export function ProductList() {
  const { products, loading, error } = useProducts()
  const [myFavorites, setMyFavorites] = useState<string[]>([])

  useEffect(() => {
    async function fetchMyFavorites() {
      await getMyFavorites().then(favorites => {
        favorites ? setMyFavorites(favorites.map(favorite => favorite.id)) : setMyFavorites([])
      })
    }
    fetchMyFavorites()
  }, [])

  async function handleToggleFavorite(product: Product, isFavorite: boolean) {
    try {
      await toggleFavorite(product, isFavorite)
      isFavorite
        ? setMyFavorites(myFavorites.filter(favorite => favorite !== product.id))
        : setMyFavorites([...myFavorites, product.id])
    } catch (err) {
      console.log(err)
    }
  }

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
