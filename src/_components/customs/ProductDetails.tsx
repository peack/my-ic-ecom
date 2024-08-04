import { Media, Product } from '@/payload/payload-types'
import Image from 'next/image'
import ItemCard from './ItemCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'

interface ProductDetailsProps {
  product: Product
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const productMedia = (product.meta?.image as Media) || null
  return (
    <>
      <div className="flex">
        <div className="flex shrink-0 justify-center">
          <Image
            src={productMedia.url ?? '/Image_NA.png'}
            width={700}
            height={500}
            sizes="80vw"
            style={{
              width: '80%',
              height: 'auto',
            }}
            alt={productMedia.alt ?? `Image of ${product.title}`}
          />
        </div>
      </div>
      <div className="flex">
        <span className="font-bold text-3xl">{product.title}</span>
      </div>
      <div className="flex">
        <span>{product.meta?.description}</span>
      </div>

      {/* <div className="">
        {product.relatedProducts?.map(relatedProd => (
          <ItemCard
            key={typeof relatedProd === 'string' ? relatedProd : relatedProd.id}
            product={relatedProd as Product}
            slug={typeof relatedProd === 'string' ? relatedProd : relatedProd.slug}
          />
        ))}
      </div> */}
      <div className="flex justify-center">
        <Carousel>
          <CarouselContent>
            {product.relatedProducts?.map(relatedProd => {
              const product = relatedProd as Product
              const productMedia = (product.meta?.image as Media) || null
              return (
                <CarouselItem
                  className="basis-1/2"
                  key={typeof relatedProd === 'string' ? relatedProd : relatedProd.id}
                >
                  <Link
                    href={`/products/${
                      typeof relatedProd === 'string' ? relatedProd : relatedProd.slug
                    }`}
                  >
                    <Image
                      width={150}
                      height={150}
                      src={productMedia.url ?? '/Image_NA.png'}
                      alt={productMedia.alt ?? `Image of ${product.title}`}
                    />
                  </Link>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  )
}

export default ProductDetails
