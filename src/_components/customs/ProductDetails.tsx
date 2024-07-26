
import { Media, Product } from "@/payload/payload-types";
import Image from "next/image"

interface ProductDetailsProps {
    product: Product
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {
    const productMedia = product.meta?.image as Media || null;
    return (
        <>
            <div className="flex">
                <div className="flex shrink-0 justify-center">
                    <Image src={productMedia.url ?? "/Image_NA.png"} 
                    width={700} height={500}  
                    sizes="80vw"
                    style={{
                      width: '80%',
                      height: 'auto',
                    }}
                     alt={productMedia.alt ?? `Image of ${product.title}`}  />
                </div>
            </div>
                <div className="flex">
                    <span className="font-bold text-3xl">{product.title}</span>
                    
                </div>
                <div className="flex">
                <span>{product.meta?.description}</span>
                </div>
        </>
    )
}

export default ProductDetails