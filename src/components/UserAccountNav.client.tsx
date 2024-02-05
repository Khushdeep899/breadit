"use client"

import { FC } from 'react'
import { User } from 'next-auth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/DropdownMenu'
import { UserAvatar } from './UserAvatar'
import { AvatarProps } from '@radix-ui/react-avatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'



interface UserAccountNavProps extends AvatarProps {
    user : Pick<User, 'name' | 'image' | 'email' >
  
}

const UserAccountNav: FC<UserAccountNavProps> = ({user}) => {

  return (
    <DropdownMenu>           {/* https://ui.shadcn.com/docs/components/dropdown-menu */}
      <DropdownMenuTrigger>
        <UserAvatar 
        className = 'h-8 w-8'
        user={{
          name: user.name || null, image: user.image || null,
        }} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-white' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.name && <p className='font-medium'>{user.name}</p>}
            {user.email && (
              <p className='w-[200px] truncate text-sm text-muted-foreground'>
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>

          <Link href='/' >  Feed</Link>        

        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>

          <Link href='/r/create' >  Create Channel</Link>        

        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>

          <Link href='/settings' >  Settings</Link>        

        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='cursor-pointer'
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            })
          }}>
          Sign out

        </DropdownMenuItem>

        </DropdownMenuContent>

    </DropdownMenu>
  )
}

export default UserAccountNav