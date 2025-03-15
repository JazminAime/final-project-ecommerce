import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Box, Text, List, ListItem, Heading } from "@chakra-ui/react";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const db = getFirestore();
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid));

        try {
          const querySnapshot = await getDocs(q);
          const ordersData = querySnapshot.docs.map((doc) => {
            const orderData = doc.data();
            const date = orderData.date.toDate();
            return { ...orderData, date };
          });
          setOrders(ordersData);
        } catch (error) {
          console.error("Error al obtener los pedidos:", error);
        }
      };

      fetchOrders();
    }
  }, [user]);

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="purple">
        Mis Pedidos
      </Heading>
      {orders.length === 0 ? (
        <Text>No has realizado compras aún.</Text>
      ) : (
        <List spacing={4}>
          {orders.map((order) => (
            <ListItem key={order.orderId}>
              <Box
                p={4}
                borderWidth={1}
                borderRadius="md"
                boxShadow="lg"
                bg="white"
                mb={4}
                _hover={{ boxShadow: "xl", cursor: "pointer" }}>
                <Text fontWeight="bold" fontSize="lg" mb={2}>
                  Pedido ID: {order.orderId}
                </Text>
                <Text fontSize="md" mb={2}>
                  <strong>Total:</strong> ${order.totalPrice}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  <strong>Fecha:</strong>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </Text>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MyOrders;
