import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      minWidth: 400,
      margin: 10,
    },
    media: {
      height: 200,
    },
    actions: {
      justifyContent: "center",
      margin: 15,
    },
  });

function BlogCard({blog}) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
          <CardActionArea onClick={() => console.log(blog)}>
            <CardMedia
              className={classes.media}
              image={blog.url}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {blog.dish}
              </Typography>
              <Typography gutterBottom variant="body2" component="h2">
                Title: {blog.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.actions}>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                
              }}
            >
              <EditIcon />
              Edit
            </Button>
            <Button size="small" color="primary" onClick={()=> {console.log("Delete")}}>
              <DeleteIcon />
              Delete
            </Button>
          </CardActions>
        </Card>
      );
}

export default BlogCard;