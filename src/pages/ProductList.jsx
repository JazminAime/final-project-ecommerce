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
} from "@chakra-ui/react";
import { db } from "../firebase/config";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isFavoriteFilter, setIsFavoriteFilter] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const filteredProducts = isFavoriteFilter
    ? products.filter((product) => product.isFavorite === true)
    : products;

  return (
    <Box p={10} mt={{ base: "130", md: "50px" }} textAlign="center">
      <Box mb={4}>
        <Checkbox
          isChecked={isFavoriteFilter}
          onChange={() => setIsFavoriteFilter(!isFavoriteFilter)}>
          Mostrar solo favoritos
        </Checkbox>
      </Box>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 3 }}
        spacing={6}
        maxW="1200px"
        margin="auto">
        {filteredProducts.map((product) => (
          <Card
            key={product.uid || product.name}
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
            </CardBody>

            <CardFooter justify="space-between" flexDirection="row" p={4}>
              <Link to={`/products/${product.id}`}>
                <Button colorScheme="purple" width="full">
                  Ver Detalle
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Products;
