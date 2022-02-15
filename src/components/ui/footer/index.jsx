import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Index() {
  return (
    <Box bgcolor="#181818" py={5}>
      <Container>
        <Box display="flex" justifyContent="center" mb={1}>
          <img src="/images/logo.png" width="50px" alt="logo" />
        </Box>

        <Typography align="center" color="#999">
          COPYRIGHT 2013 - 2021 © JURNAL OTAKU INDONESIA. ALL RIGHTS RESERVED,
          UNLESS OTHERWISE INDICATED.
        </Typography>
      </Container>
    </Box>
  );
}

export default Index;
