'use client'

import { fetchDoc } from '@/_api/fetchDoc';
import { Product } from '@/payload/payload-types';
import { useState, useEffect } from 'react';

interface ProductResponse {
    doc: Product;
    totalDocs: number;
  }
  interface hookProp {
    slug: string
  }

  export default function useProductDetails({slug}: hookProp) {
    const [product, setProduct] = useState<Product>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
        async function fetchProduct({slug}) {
            let product: Product | null = null

            try {
                product = await fetchDoc<Product>({
                    collection: 'products',
                    slug: slug
                })
                setProduct(product);
                
            } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            }  
        }
        fetchProduct({slug});
    return { product: product, loading, error };
  }