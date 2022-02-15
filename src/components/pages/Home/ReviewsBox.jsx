import React, { memo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import moment from "moment";
import { useNavigate } from "react-router-dom";

function ReviewsBox(props) {
  let navigate = useNavigate();
  const { val, index } = props;

  return (
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
            <i className="star" key={`rating-${index}-${_key}`}></i>
          ))}

          {[...new Array(5 - val?.rating)]?.map((res, _key) => (
            <i className="star star-none" key={`norating-${index}-${_key}`}></i>
          ))}
        </Box>

        <div dangerouslySetInnerHTML={{ __html: val.value }} />

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <Grid item>
            <Button
              color="error"
              sx={{ p: 0 }}
              endIcon={<ArrowRightAltIcon />}
              onClick={() => navigate(`/reviews/detail/${val.id}`)}
            >
              Continue Reading
            </Button>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center" gap={1}>
              <AccountCircleIcon fontSize="small" htmlColor="#A5A5A5" />
              <Typography color="#A5A5A5">
                {val?.user.fullname} | {moment(val.createdAt).fromNow()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

ReviewsBox.propTypes = {};

export default memo(ReviewsBox);
