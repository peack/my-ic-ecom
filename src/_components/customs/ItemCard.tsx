import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import Image from "next/image"
import { Product, Media } from "@/payload/payload-types"
import Link from "next/link"

interface ItemCardProps {
    slug: string
    product: Product
}
const ItemCard:React.FC<ItemCardProps> = (({ slug , product}) => {
    const productMedia = product.meta?.image as Media || null;
    return (
        <Card className="w-[300px]" key={slug}>
            <Link key={product.slug} href={`/products/${product.slug}`}>
            <CardHeader className="flex items-center space-x-4  p-4">
            <Image
             src={productMedia.url ?? "/Image_NA.png"}
             alt="image "
             width={250}
             height={200}
             className="rounded-s-sm border "
             />
             <span className="font-bold">{product.title}</span>
            </CardHeader>
            </Link>
            <CardContent>
            <p>{product.meta?.description }</p>
            </CardContent>
            <CardFooter className="flex justify-end p-4">
            </CardFooter>
        </Card>
    )
}
)

export default ItemCard
