import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import Image from "next/image"
import { Product } from "@/payload/payload-types"

interface ItemCardProps {
    slug: string
    product: Product
}
const ItemCard:React.FC<ItemCardProps> = (({ slug , product}) => {
    return (
        <Card className="w-[300px]" key={slug}>
            <CardHeader className="flex items-center space-x-4  p-4">
            <Image
             src={ product.meta?.image?.url ?? "/Image_NA.png"}
             alt="image "
             width={250}
             height={200}
             className="rounded-s-sm border "
             />
             <span className="font-bold">{product.title}</span>
            </CardHeader>
            <CardContent>
            <p>{product.meta?.description }</p>
            </CardContent>
            <CardFooter>
            <p>Icon here</p>
            </CardFooter>
        </Card>
    )
}
)

export default ItemCard
