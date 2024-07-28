'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLogout } from '@/_hooks/logout'

export default function Logout() {
  const { logout, isLoading, error } = useLogout()
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      const success = await logout()
      if (success) {
        router.push('/home')
      }
    }

    performLogout()
  }, [])

  if (isLoading) return <p>Logging out...</p>
  if (error) return <p>Error: {error}</p>
  return <p>Redirecting...</p>
}
