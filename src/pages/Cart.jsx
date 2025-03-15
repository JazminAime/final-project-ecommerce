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
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { collection, doc, setDoc } from "firebase/firestore";

const Cart = () => {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "No estás autenticado",
        description: "Por favor, inicia sesión para realizar la compra.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
      return;
    }

    try {
      const orderRef = doc(collection(db, "orders"));
      const orderData = {
        userId: user.uid,
        orderId: orderRef.id,
        totalPrice: total,
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        date: new Date(),
      };

      await setDoc(orderRef, orderData);

      toast({
        title: "Compra Finalizada",
        description: "¡Tu compra ha sido realizada con éxito!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
      toast({
        title: "Error",
        description:
          "Hubo un problema al procesar tu compra. Intenta nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
