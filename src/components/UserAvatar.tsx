import { User } from 'next-auth'
import { AvatarProps } from '@radix-ui/react-avatar'
import { FC } from 'react'


import Image from 'next/image'
import { Avatar, AvatarFallback } from './ui/Avatar'
import { Icons } from './Icons'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name' >
}

export const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className='relative aspect-square h-full w-full'>
          <Image
            fill
            src={user.image}
            alt='profile picture'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
          <Icons.user className='h-4 w-4' />
        </AvatarFallback>
      )}
    </Avatar>
  )
}