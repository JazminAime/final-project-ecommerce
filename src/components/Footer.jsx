import {
  Box,
  Text,
  IconButton,
  Flex,
  Divider,
  Image,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Footer() {
  const bg = useColorModeValue("#D69ADE");
  const textColor = useColorModeValue("#EDE7F6", "#EDE7F6");

  return (
    <Box width="100%" as="footer" bg={bg} p={4} color={textColor}>
      <Flex justify="center" align="center" textAlign="center">
        <Flex align="center" flex="1" justify="center" mb={4}>
          <Image
            src={logo}
            alt="Logo"
            height={{ base: "100px", md: "120px" }}
          />
        </Flex>

        <Divider
          orientation="vertical"
          height="40px"
          borderColor="white"
          mx={2}
        />

        <Flex
          align="center"
          flex="1"
          justify="center"
          direction="column"
          textAlign="center"
          mb={4}>
          <Text mb={2} fontWeight="bold" fontSize="20px" color="#FFDFEF">
            By Jazmín 💜
          </Text>
          <Text mb={2} fontWeight="bold" fontSize="20px" color="#FFDFEF">
            © 2025 Todo Padel
          </Text>
        </Flex>

        <Divider
          orientation="vertical"
          height="40px"
          borderColor="white"
          mx={2}
        />

        <Flex align="center" flex="1" justify="center" mb={4}>
          <VStack direction="column" spacing={4} align="center">
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
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
}
