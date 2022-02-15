import React from "react";
import Auth from "layouts/Auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import moment from "moment";
import Autocomplete from "@mui/material/Autocomplete";

import Navbar from "components/ui/navbar";
import FormDialog from "components/ui/dialog/FormDialog";

import http from "utils/http";

function MyReviews() {
  let profile = JSON.parse(localStorage.getItem("profile"));
  const [reviews, setReviews] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [animeList, setAnimeList] = React.useState([]);
  const [rating, setRating] = React.useState(null);
  const [textReviews, setTextReview] = React.useState(null);
  const [animeSelected, setAnimeSelected] = React.useState(null);

  React.useEffect(() => {
    http
      .get(`/reviews/profile/${profile.id}`)
      .then(({ data }) => setReviews(data.data?.rows ?? null));
    http.get("/anime").then(({ data }) => setAnimeList(data.data));
    
    // eslint-disable-next-line
  }, []);

  const clearDialog = () => {
    setOpenDialog(false);
    setRating(null);
    setTextReview(null);
  };

  const handleSubmit = () => {
    http
      .post("/reviews", {
        title: "-",
        value: `<div class="spaceit textReadability word-break pt8 mt8" style="clear: both; border-top: 1px solid #ebebeb;">${textReviews}</div>`,
        rating: rating,
        anime_id: animeSelected,
        user_id: profile.id,
      })
      .then(() => {
        clearDialog();
        http
          .get(`/reviews/profile/${profile.id}`)
          .then(({ data }) => setReviews(data.data?.rows ?? null));
      })
      .catch(() => clearDialog());
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container sx={{ my: 3 }}>
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="center"
                  //   flexDirection="column"
                >
                  <Avatar>{profile.fullname.charAt(0)}</Avatar>
                </Box>
                <Typography variant="h5" align="center">
                  {profile.fullname}
                </Typography>
                <Typography align="center">{profile.email}</Typography>
                <Typography align="center">
                  Member since {moment(profile.createdAt).format("DD MMM YYYY")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Typography variant="h4">Recent News</Typography>
                  <Button color="info" onClick={() => setOpenDialog(true)}>
                    Add New
                  </Button>
                </Box>

                <Divider sx={{ mb: 2, mt: 1 }} />

                {reviews === null || reviews?.length === 0 ? (
                  <Typography>Reviews not found</Typography>
                ) : (
                  <></>
                )}

                {reviews?.map((val, key) => (
                  <Box mb={3} key={`reviews-${key}`}>
                    <Grid container spacing={3}>
                      <Grid item md={2} xs={4}>
                        <img
                          src={val?.anime?.cover}
                          alt="thumbnail"
                          width="100%"
                          style={{ borderRadius: 5 }}
                          height="160px"
                        />
                      </Grid>
                      <Grid item md={10} xs={8}>
                        <Typography variant="h6" noWrap>
                          {val?.anime?.name}
                        </Typography>
                        <Box ml="-1px" mb={1}>
                          {[...new Array(val?.rating)]?.map((res, _key) => (
                            <i
                              className="star"
                              key={`rating-${key}-${_key}`}
                            ></i>
                          ))}

                          {[...new Array(5 - val?.rating)]?.map((res, _key) => (
                            <i
                              className="star star-none"
                              key={`norating-${key}-${_key}`}
                            ></i>
                          ))}
                        </Box>

                        <div dangerouslySetInnerHTML={{ __html: val.value }} />
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <FormDialog
        title="Add review"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleSubmit={() => handleSubmit()}
      >
        <>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={animeList}
            fullWidth
            getOptionLabel={(props) => props.name}
            onChange={(e, props) => {
              if (props) {
                setAnimeSelected(props.id);
              }
            }}
            renderInput={(params) => <TextField {...params} label="Anime" />}
          />

          <TextField
            placeholder="Your Rating"
            onChange={(e) => setRating(e.target.value)}
            fullWidth
            inputProps={{ max: 5, min: 0 }}
            type="number"
          />

          <TextField
            multiline
            rows={4}
            placeholder="Type your reviews..."
            onChange={(e) => setTextReview(e.target.value)}
            fullWidth
          />
        </>
      </FormDialog>

      {/* <Footer /> */}
    </React.Fragment>
  );
}

function Root() {
  return (
    <Auth>
      <MyReviews />
    </Auth>
  );
}
export default Root;
