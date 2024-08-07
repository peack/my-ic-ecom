'use client'

import { User } from '@/payload/payload-types'
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import ProfileHeader from './ProfileHeader'
import ProfilePasswordForm from '@/_components/customs/Profile/ProfilePasswordForm'
import { onUpdatePassword } from './utils'
import UserFavorites from './UserFavorites'

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchMe() {
      try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await req.json()
        if (data.user) {
          setUser(data.user)
        } else {
          router.push('/login')
        }
      } catch (err) {
        console.log(err)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMe()
  }, [router])

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (!user) {
    return null // or a loading state, though this should be caught by the isLoading check
  }

  return (
    <>
      <ProfileHeader user={user} />
      <ProfilePasswordForm user={user} onUpdatePassword={onUpdatePassword} />
      <UserFavorites id={user.id} />
    </>
  )
}
