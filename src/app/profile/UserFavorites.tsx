import { useState, useEffect } from 'react'
import { Product } from '@/payload/payload-types'

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
          <h1>User Favorites</h1>
          <ul>
            {userFavorites.map(favorite => (
              <li key={favorite.id}>{favorite.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </>
  )
}
