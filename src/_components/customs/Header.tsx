'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import { useAuth } from '@/_providers/Auth'
import { User } from '@/payload/payload-types'
import { ListItem } from './Header/ListItem'
import { UserMenu } from './Header/UserMenu'

interface HeaderProps {
  slug: string
  navLinks: string[]
}

const Header: React.FC<HeaderProps> = ({ slug, navLinks }) => {
  const { user, logout } = useAuth()

  const [loggedInUser, setLoggedInUser] = useState<User | undefined>(user)

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 ">
        <div className="container mx-auto flex justify-between items-center">
          <NavigationMenu>
            <NavigationMenuList className="">
              {navLinks.map(link => (
                <NavigationMenuItem key={link}>
                  <Link
                    href={`/${link.toLowerCase() || ''}`}
                    className={
                      navigationMenuTriggerStyle() + link === 'Admin' ? 'flex-row-reverse' : 'aa'
                    }
                  >
                    {link}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center"></div>
          <UserMenu user={user} loggedInUser={loggedInUser} />
        </div>
      </div>
    </header>
  )
}

export default Header
