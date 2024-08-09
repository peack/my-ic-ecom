import { Metadata } from 'next'

import MyLogin from './LoginForm'

export default async function Login() {
  return (
    <>
      <MyLogin />
    </>
  )
}

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login or create an account to get started.',
}
