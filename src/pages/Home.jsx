import { Box, Button, Text, Image, Center, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png"; // Asegúrate de tener el logo en la carpeta correcta

const Home = () => {
  return (
    <Box minHeight="100vh" p={10} mt={30}>
      <Center>
        <VStack spacing={6} textAlign="center">
          <Image src={logo} alt="Todo Padel" boxSize="250px" />

          <Text
            fontSize="3xl"
            fontWeight="bold"
            color="#AA60C8"
            fontFamily="serif">
            ¡Bienvenido/a a Todo Padel!
          </Text>

          <Text fontSize="lg" color="#AA60C8">
            Haz click en el botón para ver todos nuestros productos en stock
          </Text>

          <Button
            as={RouterLink}
            to="/products"
            bg="white"
            color="#AA60C8"
            fontWeight="bold"
            _hover={{ bg: "#AA60C8", color: "white" }}
            _active={{ bg: "#AA60C8", color: "white" }}
            borderRadius="30px"
            px="8"
            py="3"
            border="2px solid #AA60C8">
            Ver Productos en Stock
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default Home;
