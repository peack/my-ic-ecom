import { User } from 'payload/dist/auth'

interface profileProps {
  user: User
}

export default function ProfileHeader({ user }) {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Profile</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Welcome to your profile {user.name ?? ''}
      </p>
    </div>
  )
}
