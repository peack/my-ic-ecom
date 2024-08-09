import React, { useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Image from 'next/image'
import { Product, Media } from '@/payload/payload-types'
import Link from 'next/link'
import { StarIcon } from 'lucide-react'
import { useAuth } from '@/_providers/Auth'
import { LoginAlert } from './Alerts/LoginAlert'

interface ItemCardProps {
  slug: string
  product: Product
  isFavorite: boolean
  toggleFavorite?: (product: Product, isFavorite: boolean) => void
}

const ItemCard: React.FC<ItemCardProps> = ({ slug, product, isFavorite, toggleFavorite }) => {
  const productMedia = (product.meta?.image as Media) || null
  const iconClass = isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
  const status = useAuth().status
  return (
    <Card className="w-[300px]" key={slug}>
      <Link key={product.slug} href={`/products/${product.slug}`}>
        <CardHeader className="flex items-center space-x-4  p-4">
          <Image
            src={productMedia.url ?? '/Image_NA.png'}
            alt="image "
            width={250}
            height={200}
            className="rounded-s-sm border "
          />
          <span className="font-bold">{product.title}</span>
        </CardHeader>
      </Link>
      <CardContent>
        <p>{product.meta?.description}</p>
      </CardContent>
      <CardFooter className={'flex justify-end p-4'}>
        {status === 'loggedIn' ? (
          <StarIcon className={iconClass} onClick={() => toggleFavorite(product, isFavorite)} />
        ) : (
          <LoginAlert>
            <StarIcon className={iconClass} />
          </LoginAlert>
        )}
      </CardFooter>
    </Card>
  )
}

export default ItemCard
