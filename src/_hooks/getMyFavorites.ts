import { Product, User } from '@/payload/payload-types'

export const getMyFavorites = async () => {
  let favorites: string[] = []
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    await req.json().then(data => {
      const user = data.user as User
      if (!user) return
      const myFavorites: Product[] = user.favorites as Product[]
      favorites = myFavorites.map(favorite => favorite.id)
    })
  } catch (err) {
    console.log(err)
  }
  return favorites
}
