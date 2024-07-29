'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import { cn } from '@/lib/utils'
import { useAuth } from '@/_providers/Auth'

interface HeaderProps {
  slug: string
  navLinks: string[]
}

const Header: React.FC<HeaderProps> = ({ slug, navLinks }) => {
  const { user, logout } = useAuth()

  useEffect(() => {
    console.log('User changed:', user)
  }, [user])

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
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem key={'user'}>
                <NavigationMenuTrigger>
                  {user ? user.name ?? user.email : 'Login'}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2  p-6 md:w-[120px] ]">
                    <ListItem
                      title={user ? 'Profile' : 'LogIn'}
                      href={user ? '/profile' : '/login'}
                    />
                    {user?.roles?.includes('admin') && <ListItem title="Dash" href="/admin" />}
                    {user && <ListItem title="Logout" href="/logout" />}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  )
}

export default Header

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'
