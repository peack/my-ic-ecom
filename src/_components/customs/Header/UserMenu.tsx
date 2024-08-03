import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/_components/ui/navigation-menu'
import { ListItem } from './ListItem'

export function UserMenu({ user, loggedInUser }) {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem key={'user'}>
            <NavigationMenuTrigger>
              {user ? user?.name ?? user.email : 'Login'}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2  p-6 md:w-[120px] ]">
                <ListItem
                  title={user?.name ? 'Profile' : 'LogIn'}
                  href={user ? '/profile' : '/login'}
                />
                {user?.roles?.includes('admin') && <ListItem title="Dash" href="/admin" />}
                {user && <ListItem title="Logout" href="/logout" />}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}
