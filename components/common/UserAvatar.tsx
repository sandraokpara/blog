"use client"

import React, { FC } from "react"
import { AvatarProps } from "@radix-ui/react-avatar"
import { User } from "next-auth"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/Avatar"
import { Icons } from "@/components/common/Icons"

interface UserAvatarProps extends AvatarProps {
  user:
    | {
        name?: string | null | undefined
        email?: string | null | undefined
        image?: string | null | undefined
      }
    | undefined
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user?.image ? (
        <AvatarImage
          src={user.image}
          alt="profile picture"
          referrerPolicy="no-referrer"
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="h-4 w-4 lg:h-5 lg:w-5" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export default UserAvatar
