import { Icon, IconButton, IconButtonProps, LightMode } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import * as React from "react";

export const FavouriteButton = (props) => {
  const { isBookmark } = props;
  return (
    <LightMode>
      <IconButton
        isRound
        bg="transparent !important"
        boxShadow="none"
        color="white"
        size="sm"
        _hover={{ transform: "scale(1.1)" }}
        sx={{ ":hover > svg": { transform: "scale(1.1)" } }}
        transition="all 0.15s ease"
        icon={
          isBookmark ? (
            <Icon as={FaHeart} color="white" transition="all 0.15s ease" fontSize={16} />
          ) : (
            <Icon as={FiHeart} color="white" transition="all 0.15s ease" fontSize={16} />
          )
        }
        {...props}
      />
    </LightMode>
  )
}
