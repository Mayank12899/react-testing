import React from 'react';
import { Box, Typography, Button, Card, CardActionArea, CardContent, CardMedia, Modal, TextField } from '@mui/material';

const BlogCardTest = ({ image, title, description }) => {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={image} alt={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };
  
export default BlogCardTest;