import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  FormLabel,
  FormControl,
  Alert,
  AlertIcon,
  Heading,
} from "@chakra-ui/react";

const Login = () => {
  const { login, signInWithGoogle, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Redirige a Home si ya está logueada
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      width="350px"
      maxWidth="600px"
      mx="auto"
      mt="100px"
      p="12"
      bg="#FFDFEF"
      borderRadius="10px"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.1)">
      <Heading textAlign="center" mb="6" color="#AA60C8">
        Iniciar Sesión
      </Heading>
      <form onSubmit={handleLogin}>
        <FormControl isRequired mb="4">
          <FormLabel color="#AA60C8">Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo electrónico"
            bg="white"
            border="1px solid #D69ADE"
            borderRadius="5px"
            _focus={{ borderColor: "#AA60C8" }}
            _hover={{ borderColor: "#D69ADE" }}
            width="100%"
          />
        </FormControl>
        <FormControl isRequired mb="4">
          <FormLabel color="#AA60C8">Contraseña</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            bg="white"
            border="1px solid #D69ADE"
            borderRadius="5px"
            _focus={{ borderColor: "#AA60C8" }}
            _hover={{ borderColor: "#D69ADE" }}
            width="100%"
          />
        </FormControl>
        <Button
          type="submit"
          bg="#AA60C8"
          color="white"
          width="100%"
          _hover={{ bg: "#D69ADE" }}
          mb="4">
          Iniciar sesión
        </Button>
      </form>
      <Button
        onClick={handleGoogleLogin}
        bg="#D69ADE"
        color="white"
        width="100%"
        _hover={{ bg: "#EABDE6" }}>
        Iniciar sesión con Google
      </Button>
      {error && (
        <Alert status="error" mt="4">
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default Login;
