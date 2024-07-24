
import { Product } from "@/payload/payload-types";
import Image from "next/image"

interface ProductDetailsProps {
    product: Product
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {
    return (
        <>
            <div className="flex">
                <div className="">
                    <Image src={product.meta?.image?.url ?? "/Image_NA.png"} alt="image" width={700} height={500}  />
                </div>
                <div className="">
                    <span className="font-bold text-3xl">{product.title}</span>
                    {console.log(product)}
                </div>
            </div>
        </>
    )
}

export default ProductDetails