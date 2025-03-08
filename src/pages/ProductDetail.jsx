import {
  Card as CardChakra,
  CardBody,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Button,
  Box,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { getAuth } from "firebase/auth";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const toast = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = getAuth();

  const isAuthenticated = auth.currentUser !== null;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          setError("Producto no encontrado");
        }
      } catch {
        setError("Hubo un problema al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh">
        <Text fontSize="2xl">Cargando...</Text>
      </Box>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!product) {
    return <Text>No se encontró el producto.</Text>;
  }

  const { name, description, price, image_url, stock } = product;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Necesitas iniciar sesión",
        description:
          "Por favor, inicia sesión para agregar productos al carrito.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return navigate("/login"); // Redirigir a la página de login si no está autenticado
    }

    if (stock > 0) {
      // Si hay stock, agregar al carrito
      addToCart({ id, name, price, image_url });

      // Restar la cantidad correspondiente del stock
      const docRef = doc(db, "products", id);
      try {
        await updateDoc(docRef, {
          stock: stock - 1, // Decrementar el stock
        });
        toast({
          title: "Producto agregado al carrito",
          description: "¡El producto ha sido agregado con éxito al carrito!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error al actualizar el stock:", error);
        toast({
          title: "Error",
          description: "Hubo un problema al actualizar el stock.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      alert("Lo siento, no hay suficiente stock disponible.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={{ base: "auto", sm: "700px" }}
      mt={{ base: "100px", sm: "0" }}>
      <CardChakra
        maxW={{ base: "90%", sm: "80%", md: "sm" }}
        boxShadow="xl"
        margin="auto">
        <CardBody>
          <Image
            src={image_url}
            alt={name}
            borderRadius="lg"
            boxSize={{ base: "250px", sm: "300px" }}
            objectFit="cover"
          />
          <Stack mt="6" spacing="3">
            <Heading color="#AA60C8" size={{ base: "sm", md: "md" }}>
              {name}
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>{description}</Text>
            <Text color="blue.600" fontSize="2xl">
              $ {price}
            </Text>
            <Text color="red.600">Stock disponible: {stock}</Text>
          </Stack>
          <Button colorScheme="purple" onClick={() => navigate(-1)} mt={4}>
            Atrás
          </Button>

          <Button
            colorScheme="green"
            mt={4}
            width="full"
            onClick={handleAddToCart}
            leftIcon={<Icon as={FaShoppingCart} />}>
            Agregar al carrito
          </Button>
        </CardBody>
        <Divider />
        <Divider />
      </CardChakra>
    </Box>
  );
};

export default ProductDetails;
