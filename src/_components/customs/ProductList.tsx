'use client'

import { useProducts } from "@/_hooks/useProducts";
import ItemCard from "./ItemCard";
import Link from "next/link";

const  ProductList: React.FC = () => {
  const { products, loading, error } = useProducts();

    return (
        <>
            { loading ? <p>Loading...</p> : error ? <p>Error: {error}</p> :
                <div className="flex flex-wrap justify-center md:justify-start">
                {products.map((product) => (
                        <Link key={product.slug} href={`/products/${product.slug}`}>
                          <ItemCard product={product} slug={product.slug}/>
                        </Link>                          
                ))}
                </div>
            }
    </>
    )
}

export default ProductList