import React from 'react'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import { ClassProp } from 'class-variance-authority/dist/types'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { log } from 'console'

interface HeaderProps {
  slug: string
  navLinks: string[]
}

const Header: React.FC<HeaderProps> = ({ slug, navLinks }) => {
  return (
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 ">
            <NavigationMenu>
              <NavigationMenuList >
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link} >
                    <Link
                      href={`/${link.toLowerCase() || ""}`}
                      className={navigationMenuTriggerStyle() + link === 'Admin' ? 'flex-row-reverse' :'aa'  }
                    >
                      {link}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>
  )
}

export default Header
