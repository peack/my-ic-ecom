'use client'
import React, { useEffect, useState } from 'react'
import ProductDetails from '@/_components/customs/ProductDetails'
import { fetchDoc } from '@/_api/fetchDoc'
import { Product } from '@/payload/payload-types'
import { notFound } from 'next/navigation'

export default function Page({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDoc<Product>({
          collection: 'products',
          slug: params.slug,
        })
        setProduct(data)
      } catch (error) {
        console.log(error) //UPDATE error
      }
    }

    fetchData()
  }, [params.slug])

  return <>{product ? <ProductDetails product={product} /> : <>niet</>}</>
}
