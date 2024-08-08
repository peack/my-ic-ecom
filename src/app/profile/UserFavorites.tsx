import { useState, useEffect } from 'react'
import { Media, Product } from '@/payload/payload-types'
import { Card, CardContent } from '@/_components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'

interface UserFavoritesProps {
  id: string
}

export default function UserFavorites({ id }: UserFavoritesProps) {
  const [userFavorites, setUserFavorites] = useState<Product[]>([])
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMyFavorites(userId: string) {
      try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (req.ok) {
          const data = await req.json().then(data => {
            const myFavorites: Product[] = data.favorites
            return myFavorites
          })
          if (data.length > 0) {
            console.log(data)
            setUserFavorites(data)
          }
        } else {
          setMessage('Error fetching favorites')
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
        setMessage('You have no favorites, add some now!')
      }
    }
    fetchMyFavorites(id)
  }, [])

  return (
    <>
      {userFavorites && userFavorites.length > 0 ? (
        <div>
          <h2 className=" text-2xl font-extrabold tracking-tight lg:text-2xl py-5">
            User Favorites
          </h2>
          {userFavorites.length > 4 ? (
            <div className="flex justify-start px-10">
              <Carousel className="w-[300px]">
                <CarouselContent>
                  {userFavorites.map(favorite => {
                    return (
                      <CarouselItem className="basis-1/3 md:basis-1/4" key={favorite.slug}>
                        {userFavoriteCard(favorite)}
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ) : (
            <div className="flex justify-start gap-1">
              {userFavorites.map(favorite => {
                return userFavoriteCard(favorite)
              })}
            </div>
          )}
        </div>
      ) : (
        <p>{message}</p>
      )}
    </>
  )
}

function userFavoriteCard(favorite: Product) {
  const favoriteMedia: Media = (favorite.meta?.image as Media) || null
  return (
    <Card key={favorite.id} className="w-[80px] p-1">
      <CardContent className="p-0">
        <Link href={`/products/${favorite.slug}`}>
          <Image
            src={favoriteMedia.url ?? '/Image_NA.png'}
            alt="image "
            width={80}
            height={80}
            className="rounded-md border "
          />
        </Link>
      </CardContent>
    </Card>
  )
}
