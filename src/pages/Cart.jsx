import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Divider,
  Image,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const toast = useToast();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Heading size="lg" mb={4}>
          🛒 Carrito vacío
        </Heading>
        <Link to="/">
          <Button colorScheme="purple">Volver a la tienda</Button>
        </Link>
      </Box>
    );
  }

  const handleCheckout = () => {
    toast({
      title: "Compra Finalizada",
      description: "¡Tu compra ha sido realizada con éxito!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    clearCart();

    navigate("/");
  };

  return (
    <Box maxW="800px" mx="auto" py={10}>
      <Heading mb={6}>Tu Carrito 🛒</Heading>
      <Stack spacing={4}>
        {cart.map((item) => (
          <Box
            key={item.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md">
            <Stack direction="row" align="center">
              <Image
                src={item.image_url}
                alt={item.name}
                boxSize="100px"
                borderRadius="md"
              />
              <Box flex="1">
                <Text fontSize="lg" fontWeight="bold">
                  {item.name}
                </Text>
                <Text>Cantidad: {item.quantity}</Text>
                <Text>Precio: ${item.price * item.quantity}</Text>
              </Box>
              <Button colorScheme="red" onClick={() => removeFromCart(item.id)}>
                <Icon as={FaTrash} />
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Divider my={6} />
      <Text fontSize="xl" fontWeight="bold">
        Total: ${total}
      </Text>
      <Stack direction="row" mt={4} spacing={4}>
        <Button colorScheme="green" onClick={handleCheckout}>
          Finalizar Compra
        </Button>
        <Button colorScheme="red" onClick={clearCart}>
          Vaciar Carrito
        </Button>
      </Stack>
    </Box>
  );
};

export default Cart;
