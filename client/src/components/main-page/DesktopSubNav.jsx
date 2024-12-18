import React from "react";
import {
  Box,
  Stack,
  Link,
  Text,
  Icon,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const DesktopSubNav = ({ label, path, subLabel }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (path) {
      navigate(path);
    } else {
      e.preventDefault();
    }
  };

  return (
    <Link
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
      onClick={handleClick} // Usa `handleClick` para manejar la navegación
      cursor="pointer"
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};
