import React from 'react'
import { Metadata } from 'next'

import { getMeUser } from '@/_utilities/getMeUser'
import { RenderParams } from '@/_components/customs/RenderParams/Index'
import MyLogin from './LoginForm'

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/home`,
  })

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
