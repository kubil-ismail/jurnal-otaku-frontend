import React, { memo } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";

import Navbar from "components/ui/navbar";
import Footer from "components/ui/footer";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Button, Container, Grid } from "@mui/material";

import http from "utils/http";
import { useLocation } from "react-router-dom";

function Detail() {
  let location = useLocation();
  let paramId = location.pathname.split("/")[3];

  const [news, setNews] = React.useState(null);
  const [anime, setAnime] = React.useState(null);

  React.useEffect(() => {
    http
      .get(`/reviews/detail/${paramId}`)
      .then(({ data }) => setNews(data.data));
    http.get("/anime/best-of-week").then(({ data }) => setAnime(data.data));
  }, [paramId]);

  return (
    <Box height="100vh" width="100vw">
      <Navbar />

      <Container sx={{ py: 3 }}>
        <Box mb={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/news/all">
              News
            </Link>
            <Typography color="text.primary">{news?.title}</Typography>
          </Breadcrumbs>
        </Box>

        <Grid container spacing={2}>
          <Grid item md={9}>
            <img
              src={news?.anime.cover}
              alt="news cover"
              style={{
                margin: "0px 10px 10px 0px",
                borderRadius: "5px",
              }}
              height="300px"
            />
            <Grid container spacing={1}>
              <Grid item md={12} xs={12}>
                <div>
                  <Typography variant="h4" gutterBottom>
                    {news?.title}
                  </Typography>
                  <div dangerouslySetInnerHTML={{ __html: news?.value }} />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <section>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography variant="h4">Anime of the week</Typography>
                <Button color="info">View All</Button>
              </Box>

              {anime?.map((val, key) => (
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
              ))}
            </section>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}

Detail.propTypes = {};

const mapStateToProps = (state) => ({
  example: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Detail));
