import { Grid, GridItem } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Routing from "../routes/Routing";
import ScrollToTop from "../components/ScrollToTop";

const AppLayout = () => {
  return (
    <Grid
      templateAreas={`"header"
                      "main"
                      "footer"`}
      gridTemplateRows={"80px 1fr 50px"}
      gridTemplateColumns={"1fr"}
      gap="1"
      fontWeight="bold"
      minHeight="100vh"
      bg="#FFDFEF" // Fondo lila claro para toda la app
    >
      {/* Header */}
      <GridItem area="header">
        <Header />
      </GridItem>

      {/* Main */}
      <GridItem
        area="main"
        minH="100vh"
        bg="transparent" // Fondo transparente para que se vea el lila
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        paddingBottom="50px"
        p="4" // Padding para separar contenido de los bordes
      >
        <ScrollToTop />
        <Routing />
      </GridItem>

      {/* Footer */}
      <GridItem area="footer">
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default AppLayout;
