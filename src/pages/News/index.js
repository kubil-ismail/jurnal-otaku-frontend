import React, { memo } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";

import Navbar from "components/ui/navbar";
import Footer from "components/ui/footer";
import { Typography, Container, Grid, Divider } from "@mui/material";
import http from "utils/http";
import NewsBox from "components/pages/Home/NewsBox";

function Index() {
  const [news, setNews] = React.useState(null);

  React.useEffect(() => {
    http.get("/news").then(({ data }) => setNews(data.data.rows));
  }, []);

  return (
    <Box height="100vh" id="home" width="100vw">
      <Navbar />

      <Container>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <section>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                my={2}
              >
                <Typography variant="h4">All News</Typography>
              </Box>

              {news?.map((val, key) => (
                <Box mb={3} key={`news-${key}`}>
                  <NewsBox val={val} />
                </Box>
              ))}
            </section>

            <Divider sx={{ mb: 2 }} />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}

Index.propTypes = {};

const mapStateToProps = (state) => ({
  example: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Index));
