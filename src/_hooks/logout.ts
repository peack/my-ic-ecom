import { useState } from 'react'

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const logout = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
        method: 'POST',
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.message || 'Failed to logout')

      console.log('Logged out successfully', data)
      return true
    } catch (err) {
      console.error('Logout error:', err)
      setError('Failed to logout. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { logout, isLoading, error }
}
