import {
  Box,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const bg = useColorModeValue("#D69ADE");
  const textColor = useColorModeValue("#EDE7F6", "#EDE7F6");

  return (
    <Box
      width="100%"
      as="footer"
      bg={bg}
      p={4}
      textAlign="center"
      color={textColor}>
      <Text mb={2} fontWeight="bold" fontSize="20px" color="#FFDFEF">
        Realizado con 💜 por Jazmín
      </Text>
      <Text mb={2} fontWeight="bold" fontSize="20px" color="#FFDFEF">
        © 2025 Todo Padel
      </Text>
      <HStack justify="center" spacing={4}>
        <IconButton
          fontSize="22px"
          as="a"
          href="https://www.linkedin.com/in/jazm%C3%ADn-aim%C3%A9-59869b150/"
          icon={<FaLinkedin />}
          variant="ghost"
          colorScheme="purple"
          aria-label="LinkedIn"
        />
        <IconButton
          fontSize="22px"
          as="a"
          href="https://www.instagram.com/jazfalcon_/"
          icon={<FaInstagram />}
          variant="ghost"
          colorScheme="purple"
          aria-label="Instagram"
        />
        <IconButton
          fontSize="22px"
          as="a"
          href="https://www.facebook.com/"
          icon={<FaFacebook />}
          variant="ghost"
          colorScheme="purple"
          aria-label="Facebook"
        />
      </HStack>
    </Box>
  );
}
