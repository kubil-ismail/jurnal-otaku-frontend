import React, { memo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

import moment from "moment";
import { useNavigate } from "react-router-dom";

function NewsBox(props) {
  let navigate = useNavigate();
  const { val } = props;

  return (
    <Grid container spacing={3}>
      <Grid item md={2} xs={4}>
        <img
          src={val?.cover}
          alt="thumbnail"
          width="100%"
          style={{
            borderRadius: 5,
            border: "1px solid rgb(165 165 165 / 18%)",
          }}
          height="160px"
        />
      </Grid>
      <Grid item md={10} xs={8}>
        <Typography variant="h6" noWrap>
          {val.title}
        </Typography>
        <Typography color="#A5A5A5" gutterBottom>
          Posted on {moment(val.createdAt).format("DD MMM YYYY")}
        </Typography>

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
              onClick={() => navigate(`/news/detail/${val.id}`)}
            >
              Continue Reading
            </Button>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center" gap={1}>
              <ModeCommentIcon fontSize="small" htmlColor="#A5A5A5" />
              <Typography color="#A5A5A5">46 Comments</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default memo(NewsBox);
