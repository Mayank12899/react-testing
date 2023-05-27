import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import loading from "../../static/loading.gif"
const useStyles = makeStyles({
  root: {
    minWidth: 1366,
    minHeight: 768,
    margin: 10,
  },
  media: {
    height: 300,
  },
  addPost: {
    height: 512,
    width: 512,
  },
});

function Loader() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <img className={classes.addPost} src={loading} alt="loading..." />
      </CardContent>
    </Card>
  );
}

export default Loader;
