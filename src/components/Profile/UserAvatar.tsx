import {
  Avatar,
  AvatarBadge,
  AvatarProps,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { GoVerified } from "react-icons/go";
import { isMobile } from "react-device-detect";

interface UserAvatarProps extends AvatarProps {
  isVerified?: boolean;
}

export const UserAvatar = (props: UserAvatarProps) => {
  const { isVerified, ...avatarProps } = props;
  const avatarColor = useColorModeValue("white", "gray.700");
  const iconColor = useColorModeValue("blue.500", "blue.200");

  return (
    <Avatar
      size={isMobile ? "xl" : "2xl"}
      {...avatarProps}
      borderWidth="4px"
      borderColor={"primary.300"}
    >
      {isVerified && (
        <AvatarBadge
          borderWidth="4px"
          borderColor={avatarColor}
          insetEnd="3"
          bottom="3"
          bg={avatarColor}
        >
          <Icon as={GoVerified} fontSize="2xl" color={iconColor} />
        </AvatarBadge>
      )}
    </Avatar>
  );
};
