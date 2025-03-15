import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Image,
  Heading,
  Card,
  CardBody,
  CardFooter,
  SimpleGrid,
  Checkbox,
  IconButton,
  Spinner,
  Text,
  Input,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { db } from "../firebase/config";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isFavoriteFilter, setIsFavoriteFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(productList);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box p={10} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Cargando productos...</Text>
      </Box>
    );
  }

  const filteredProducts = products.filter((product) => {
    const isFavorite = isFavoriteFilter ? product.isFavorite === true : true;
    const matchesSearchQuery = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return isFavorite && matchesSearchQuery;
  });

  return (
    <Box p={10} mt={{ base: "130", md: "50px" }} textAlign="center">
      <Box mb={4}>
        <Input
          placeholder="Buscar por nombre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="md"
          maxW="300px"
          margin="auto"
          borderColor="purple.500"
          focusBorderColor="purple.400"
          mb={4}
        />
      </Box>

      <Box mb={6}>
        <Checkbox
          isChecked={isFavoriteFilter}
          onChange={() => setIsFavoriteFilter(!isFavoriteFilter)}
          colorScheme="purple"
          size="lg"
          borderColor="purple.400"
          _hover={{ borderColor: "purple.600" }}
          _checked={{
            bg: "purple.100",
            borderColor: "purple.100",
            color: "white",
          }}>
          <Text fontSize="lg" fontWeight="semibold" color="purple.500">
            Mostrar solo favoritos
          </Text>
        </Checkbox>
      </Box>

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 3 }}
        spacing={6}
        maxW="1200px"
        margin="auto">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              maxW={{ base: "100%", sm: "xs" }}
              borderWidth="1px"
              borderColor="purple.500"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="xl"
              bg="white"
              _hover={{
                transform: "scale(1.02)",
                boxShadow: "lg",
                cursor: "pointer",
              }}
              transition="transform 0.3s ease, box-shadow 0.3s ease">
              <Image
                src={product.image_url}
                alt={product.name}
                boxSize="auto"
                objectFit="contain"
                height={{ base: "200px", sm: "300px" }}
                width="100%"
              />
              <CardBody p={4}>
                <Heading size="md" color="purple.700">
                  {product.name}
                </Heading>

                {product.isFavorite && (
                  <IconButton
                    icon={<StarIcon />}
                    colorScheme="yellow"
                    variant="solid"
                    aria-label="Favorito"
                    size="sm"
                    isRound
                    mt={2}
                    borderRadius="full"
                    bg="yellow.400"
                    _hover={{ bg: "yellow.500" }}
                  />
                )}
              </CardBody>

              <CardFooter justify="space-between" flexDirection="row" p={4}>
                <Link to={`/products/${product.id}`}>
                  <Button colorScheme="purple" width="full">
                    Ver Detalle
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Text fontSize="xl" color="purple.500" mt={4}>
            No se encontraron productos para mostrar.
          </Text>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Products;
