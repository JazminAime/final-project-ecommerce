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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const { name, description, price, image_url } = product;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="700px">
      <CardChakra maxW="sm" boxShadow="xl" margin="auto">
        <CardBody>
          <Image
            src={image_url}
            alt={name}
            borderRadius="lg"
            boxSize="300px"
            objectFit="cover"
          />
          <Stack mt="6" spacing="3">
            <Heading color="#AA60C8" size="md">
              {name}
            </Heading>
            <Text>{description}</Text>
            <Text color="blue.600" fontSize="2xl">
              $ {price}
            </Text>
          </Stack>
          <Button colorScheme="purple" onClick={() => navigate(-1)} mt={4}>
            Atrás
          </Button>

          <Button
            colorScheme="green"
            mt={4}
            width="full"
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
