'use server'
import payload from 'payload'
import { NextApiRequest, NextApiResponse } from 'next'
import qs from 'qs'

export async function onUpdatePassword(token, newPassword) {
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token.value,
        password: newPassword,
      }),
    })
    const data = await req.json().then(data => console.log(data))
  } catch (err) {
    console.log(err)
  }
  console.log(token)
  console.log(newPassword)
}

export async function onUpdatePassNoMail(id, newPassword) {
  const stringifiedQuery = qs.stringify(
    {
      where: {
        id: {
          contains: id,
        },
      },
    },
    { addQueryPrefix: true },
  )

  console.log(stringifiedQuery)
  console.log(id)
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${stringifiedQuery}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: newPassword,
      }),
    })
    const data = await req.json()

    // Check if the request was successful
    if (req.ok) {
      return { success: true, data }
    } else {
      return { success: false, error: data }
    }
  } catch (err) {
    console.log(err)
    return { success: false, error: err.message }
  }
}

export async function getMyFavorites(id: string) {
  console.log(`useris ${id}`)
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await req.json()
    console.log(data)
  } catch (err) {
    console.error('Error fetching posts:', err)
    // res.status(500).json({ error: 'Unable to fetch posts' });
  }
}

// export async function fetchUserFavorites(userId: string) {
//   try {
//     const result = await getMyFavorites(userId)
//     console.log(result)
//     if (result && result.docs && result.docs.length > 0) {
//       // Assuming the first doc contains the user's favorites
//       return { success: true, favorites: result.docs[0].favorites }
//     } else {
//       return { success: false, message: 'No favorites found or user not found' }
//     }
//   } catch (error) {
//     console.error('Error fetching favorites:', error)
//     return { success: false, message: 'An error occurred while fetching favorites' }
//   }
// }
