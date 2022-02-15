import React, { memo } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";

import Navbar from "components/ui/navbar";
import Footer from "components/ui/footer";
import { Typography, Container, Grid } from "@mui/material";
import http from "utils/http";
import ReviewsBox from "components/pages/Home/ReviewsBox";

function Index() {
  const [reviews, setReviews] = React.useState(null);

  React.useEffect(() => {
    http.get("/reviews").then(({ data }) => setReviews(data.data.rows));
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
                <Typography variant="h4">Recent Reviews</Typography>
              </Box>

              {reviews?.map((val, key) => (
                <Box mb={3} key={`reviews-${key}`}>
                  <ReviewsBox index={key} val={val} />
                </Box>
              ))}
            </section>
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
