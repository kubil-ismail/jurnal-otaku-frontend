import React, { memo } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";

import Navbar from "components/ui/navbar";
import Footer from "components/ui/footer";
import {  Typography, Container, Grid,  } from "@mui/material";
import http from "utils/http";

function Home() {
  const [anime, setAnime] = React.useState(null);

  React.useEffect(() => {
    http.get("/anime/best-of-week").then(({ data }) => setAnime(data.data));
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
                <Typography variant="h4">Best Anime</Typography>
              </Box>

              <Grid container spacing={2}>
                {anime?.map((val, key) => (
                  <Grid item lg={4} key={key}>
                    <Box mb={3} key={`best-anime-${key}`}>
                      <Grid container spacing={1}>
                        <Grid item md={4} xs={4}>
                          <img
                            src={val.cover}
                            alt="thumbnail"
                            width="100%"
                            style={{ borderRadius: 5 }}
                            height="125px"
                          />
                        </Grid>
                        <Grid item md={8} xs={8}>
                          <Typography variant="h6" noWrap>
                            {val?.name}
                          </Typography>

                          <Box display="flex" alignItems="center" gap={1}>
                            <Box ml="-1px">
                              {[...new Array(parseInt(val.rating))]?.map(
                                (res, _key) => (
                                  <i
                                    className="star"
                                    key={`rating-${key}-${_key}`}
                                  ></i>
                                )
                              )}

                              {[...new Array(5 - parseInt(val.rating))]?.map(
                                (res, _key) => (
                                  <i
                                    className="star star-none"
                                    key={`norating-${key}-${_key}`}
                                  ></i>
                                )
                              )}
                            </Box>
                            <Typography sx={{ fontSize: "12px" }}>
                              ({val?.total} Reviews)
                            </Typography>
                          </Box>

                          <Typography sx={{ fontSize: "13px" }}>
                            <b>Status :</b> {val?.status}
                          </Typography>

                          <Typography sx={{ fontSize: "13px" }}>
                            <b>Relase Year :</b> {val?.release}
                          </Typography>

                          <Typography sx={{ fontSize: "13px" }}>
                            <b>Producer :</b> {val?.producer}
                          </Typography>

                          <Typography sx={{ fontSize: "13px" }}>
                            <b>Duration :</b> {val?.duration}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </section>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}

Home.propTypes = {};

const mapStateToProps = (state) => ({
  example: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home));
