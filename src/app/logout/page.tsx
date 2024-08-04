'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLogout } from '@/_hooks/logout'
import { Alert } from '@/components/ui/alert'
import { useAuth } from '@/_providers/Auth'

interface logoutMessageProps {
  description: string
  isError: boolean
}
export default function Logout() {
  // const { logout, isLoading, error } = useLogout()
  const router = useRouter()
  const { setUser, logout, user } = useAuth()

  const [message, setMessage] = useState<logoutMessageProps>({
    description: 'Loading',
    isError: false,
  })

  useEffect(() => {
    const performLogout = async () => {
      if (!user) {
        setMessage(message => {
          return { description: 'You are logged out', isError: true }
        })
        return
      }
      await logout().catch(err => {
        setMessage(message => {
          return { description: `Error: ${err.message}`, isError: true }
        })
      })
    }

    performLogout()
  }, [])

  return <Alert variant={message.isError ? 'destructive' : 'default'}>{message.description}</Alert>
}
