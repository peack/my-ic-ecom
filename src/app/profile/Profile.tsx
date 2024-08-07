// 'use client'

import { User } from '@/payload/payload-types'
import { useRouter } from 'next/navigation'
import React, { Suspense } from 'react'
import ProfileHeader from './ProfileHeader'
import UserFavorites from './UserFavorites'
interface profileProps {
  user: User
}

export default async function Profile() {
  const router = useRouter()

  async function fetchMe() {
    let myUser: User | null = null
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await req
        .json()
        .then(data => data.user)
        .then(user => {
          myUser = user
          if (!user) {
            router.push('/login')
          }
        })
      return myUser
    } catch (err) {
      console.log(err)
    }
    return myUser
  }

  const user = await fetchMe()

  return (
    <>
      {!user ? (
        <>
          <div className="">Loading ...</div>
        </>
      ) : (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <ProfileHeader user={user} />
            <UserFavorites id={user.id} />
          </Suspense>
        </>
      )}
    </>
  )
}
