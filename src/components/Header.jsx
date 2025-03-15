import {
  Box,
  Flex,
  Link,
  Button,
  Spacer,
  HStack,
  Text,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RiShoppingCartFill } from "react-icons/ri";
import logo from "../assets/favicon.png";

const Header = () => {
  const { user, logout } = useAuth();

  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box bg="purple.300" p={4} color="white">
      <Flex align="center" justify="space-between" wrap="wrap">
        <Link
          as={RouterLink}
          to="/"
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: "none" }}>
          <Box
            bg="purple.400"
            p={2}
            borderRadius="50%"
            display="inline-block"
            mr={3}
            boxShadow="lg">
            <Image src={logo} alt="Todo Padel" height="70px" />
          </Box>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="purple.100"
            fontFamily="serif"
            _hover={{ color: "#fafafa" }}>
            Todo Padel
          </Text>
        </Link>

        <Spacer />

        <HStack spacing={4} wrap="wrap" justify="center">
          <Link as={RouterLink} to="/" fontSize="lg" fontWeight="semibold">
            Home
          </Link>
          <Link
            as={RouterLink}
            to="/products"
            fontSize="lg"
            fontWeight="semibold">
            Lista de productos
          </Link>

          {user ? (
            <>
              <Link
                as={RouterLink}
                to="/mis-pedidos"
                fontSize="lg"
                fontWeight="semibold">
                Mis Pedidos
              </Link>
              <Button
                backgroundColor="white"
                color="#AA60C8"
                variant="outline"
                onClick={logout}
                _hover={{ bg: "#AA60C8", color: "white" }}
                _active={{ bg: "#AA60C8", color: "white" }}
                fontFamily="Poppins, sans-serif"
                fontWeight="bold"
                borderRadius="30px"
                px="8"
                py="3"
                border="2px solid #AA60C8"
                size={buttonSize}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button
                as={RouterLink}
                to="/login"
                bg="white"
                color="#AA60C8"
                variant="solid"
                _hover={{ bg: "#AA60C8", color: "white" }}
                _active={{ bg: "#AA60C8", color: "white" }}
                fontFamily="Poppins, sans-serif"
                fontWeight="bold"
                borderRadius="30px"
                px="8"
                py="3"
                border="2px solid #AA60C8"
                size={buttonSize}>
                Iniciar Sesión
              </Button>
              <Button
                as={RouterLink}
                to="/register"
                bg="white"
                color="#AA60C8"
                variant="solid"
                _hover={{ bg: "#AA60C8", color: "white" }}
                _active={{ bg: "#AA60C8", color: "white" }}
                fontFamily="Poppins, sans-serif"
                fontWeight="bold"
                borderRadius="30px"
                px="8"
                py="3"
                border="2px solid #AA60C8"
                size={buttonSize}>
                Registrarse
              </Button>
            </>
          )}

          <Link as={RouterLink} to="/cart">
            <RiShoppingCartFill fontSize="30px" />
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
