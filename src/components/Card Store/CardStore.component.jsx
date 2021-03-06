import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  details: {
    width: "100%",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 90,
    height: 90,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function CardStoreComponent(props) {
  const classes = useStyles();
  const theme = useTheme();
  const converDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.data?.store.storeName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.data?.store.address}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {converDate(props.data?.store.createAt)}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.data?.store.activate ? (
              <Chip
                variant="outlined"
                size="small"
                style={{ color: "green" }}
                label="Hoạt động"
              />
            ) : (
              <Chip
                variant="outlined"
                size="small"
                style={{ color: "red" }}
                label="Dừng hoạt động"
              />
            )}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
