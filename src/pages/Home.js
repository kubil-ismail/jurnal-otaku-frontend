import React, { memo } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";

import Navbar from "components/ui/navbar";
import Footer from "components/ui/footer";
import { Button, Typography, Container, Grid, Divider } from "@mui/material";
import http from "utils/http";
import Slider from "react-slick";
import ReviewsBox from "components/pages/Home/ReviewsBox";
import NewsBox from "components/pages/Home/NewsBox";
import { useNavigate } from "react-router-dom";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Home() {
  let navigate = useNavigate();
  const [reviews, setReviews] = React.useState(null);
  const [news, setNews] = React.useState(null);
  const [banner, setBanner] = React.useState(null);
  const [anime, setAnime] = React.useState(null);

  React.useEffect(() => {
    http.get("/news").then(({ data }) => setNews(data.data.rows));
    http.get("/reviews").then(({ data }) => setReviews(data.data.rows));
    http.get("/banner").then(({ data }) => setBanner(data.data));
    http.get("/anime/best-of-week").then(({ data }) => setAnime(data.data));
  }, []);

  return (
    <Box height="100vh" id="home" width="100vw">
      <Navbar />

      <Box mb={5}>
        <Slider {...settings}>
          {banner?.map((val) => (
            <div>
              <Box
                height="350px"
                sx={{
                  backgroundImage: `url('${val.url}')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></Box>
            </div>
          ))}
        </Slider>
      </Box>

      <Container>
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <section>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography variant="h4">Recent News</Typography>
                <Button color="info" onClick={() => navigate("/news")}>
                  View All
                </Button>
              </Box>

              {news?.map((val, key) => (
                <Box mb={3} key={`news-${key}`}>
                  <NewsBox val={val} />
                </Box>
              ))}
            </section>

            <Divider sx={{ mb: 2 }} />

            <section>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography variant="h4">Recent Reviews</Typography>
                <Button color="info" onClick={() => navigate("/reviews")}>
                  View All
                </Button>
              </Box>

              {reviews?.map((val, key) => (
                <Box mb={3} key={`reviews-${key}`}>
                  <ReviewsBox index={key} val={val} />
                </Box>
              ))}
            </section>

            <Divider sx={{ mb: 2 }} />
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
                <Button
                  color="info"
                  onClick={() => navigate(`/anime/best-of-the-week`)}
                >
                  View All
                </Button>
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

Home.propTypes = {};

const mapStateToProps = (state) => ({
  example: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home));
