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
      bg="#FFDFEF">
      {/* Header */}
      <GridItem area="header">
        <Header />
      </GridItem>

      {/* Main */}
      <GridItem
        area="main"
        minH="100vh"
        bg="transparent"
        display="flex"
        marginTop="80px"
        marginBottom="80px"
        flexDirection="column"
        justifyContent="flex-start"
        paddingBottom="50px"
        p="4">
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
