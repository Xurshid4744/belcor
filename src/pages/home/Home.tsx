import React from "react";
import { Box, Container } from "@mui/material";
import ManagementTable from "./_sections/ManagementTable";
import FilterTable from "./_sections/FilterTable";

const Home: React.FC = () => {
  return (
    <Container
      component="main"
      sx={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        width: "1000px",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <FilterTable />
        <ManagementTable />
      </Box>
    </Container>
  );
};

export default Home;
