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
      await logout()
        .then(() => {
          if (!user) {
            setMessage(message => {
              router.push('/')
              return { description: 'You are logged out', isError: true }
            })
          }
          router.refresh()
        })
        .catch(err => {
          setMessage(message => {
            router.push('/')
            return { description: `Error: ${err.message}`, isError: true }
          })
        })
    }

    performLogout()
  }, [])

  return <Alert variant={message.isError ? 'destructive' : 'default'}>{message.description}</Alert>
}
