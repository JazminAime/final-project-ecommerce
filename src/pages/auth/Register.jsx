import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { password, email } from "../../utils/validation";
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

const Register = () => {
  const { registerUser, user } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirige a Home si ya está logueada
    }
  }, [user, navigate]);

  const handleRegister = async (data) => {
    try {
      await registerUser(data.email, data.password);
      navigate("/"); // Redirige a Home después de registrar
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      width="350px"
      maxWidth="500px"
      mx="auto"
      mt="100px"
      p="6"
      bg="#FFDFEF"
      borderRadius="10px"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.1)">
      <Heading textAlign="center" mb="6" color="#AA60C8">
        Registrarse
      </Heading>
      <form onSubmit={handleSubmit(handleRegister)}>
        <FormControl isRequired mb="4" isInvalid={errors.email}>
          <FormLabel color="#AA60C8">Email</FormLabel>
          <Input
            type="email"
            {...register("email", email)}
            placeholder="Ingrese su correo electrónico"
            bg="white"
          />
          {errors.email && (
            <Alert status="error" mt="2">
              <AlertIcon />
              {errors.email.message}
            </Alert>
          )}
        </FormControl>

        <FormControl isRequired mb="4" isInvalid={errors.password}>
          <FormLabel color="#AA60C8">Contraseña</FormLabel>
          <Input
            type="password"
            {...register("password", password)}
            placeholder="Ingrese su contraseña"
            bg="white"
          />
          {errors.password && (
            <Alert status="error" mt="2">
              <AlertIcon />
              {errors.password.message}
            </Alert>
          )}
        </FormControl>

        <Button
          type="submit"
          bg="#AA60C8"
          color="white"
          width="100%"
          _hover={{ bg: "#D69ADE" }}>
          Registrar
        </Button>
      </form>

      {error && (
        <Alert status="error" mt="4">
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default Register;
