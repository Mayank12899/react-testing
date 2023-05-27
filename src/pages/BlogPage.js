import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardActionArea, CardContent, CardMedia, Modal, TextField } from '@mui/material';
import BlogCardTest from '../components/Blogs/BlogCardTest';

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from '../config/firebase';
const storage = getStorage(app);
const db = getFirestore(app);
// const firebase
const blogData = [
  {
    id: 1,
    image: 'https://firebasestorage.googleapis.com/v0/b/foodpal-ab824.appspot.com/o/Quantiphi.png?alt=media&token=a5d5b7a6-75ea-49f7-9b53-6f0745917c4c',
    title: 'Blog 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    image: 'https://firebasestorage.googleapis.com/v0/b/foodpal-ab824.appspot.com/o/Quantiphi.png?alt=media&token=a5d5b7a6-75ea-49f7-9b53-6f0745917c4c',
    title: 'Blog 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    image: 'https://firebasestorage.googleapis.com/v0/b/foodpal-ab824.appspot.com/o/Quantiphi.png?alt=media&token=a5d5b7a6-75ea-49f7-9b53-6f0745917c4c',
    title: 'Blog 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const BlogPage = () => {
  const email = localStorage.getItem('email')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogShortDesc, setBlogShortDesc] = useState('');
  const [blogLongDesc, setBlogLongDesc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const getBlog = () => {

  }
  const uploadImage = async() => {
    const path = "blog/"+email+"/"+blogTitle; 
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, selectedFile).then((snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
    });
    const url = await getDownloadURL(ref(storage, path)).then((url)=>{
      console.log(url);
    })

    return url;
  }
  const handleFirebase = (url) => {
    setDoc(doc(db, "blogs", blogTitle),{
      image: url,
      title: blogTitle,
      description: blogShortDesc,
      longDescription: blogLongDesc 
    });
  }
  const handleCreateBlog = async() => {
    // Logic to create a new blog post
    // You can use the entered blog details: blogTitle, blogImage, blogShortDesc, blogLongDesc, and the selectedFile
    // For simplicity, we'll just console log the entered values in this example
    console.log('Blog Title:', blogTitle);
    console.log('Blog Short Description:', blogShortDesc);
    console.log('Blog Long Description:', blogLongDesc);
    console.log('Selected File:', selectedFile);
    setIsModalOpen(false);
    const url = await uploadImage();
    handleFirebase(url);
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  return (
    <Box sx={{ padding: "8%" }}>
      <Box sx={{ display: 'flex', position: "right" }}>
        <Button variant="contained" color="primary" sx={{borderRadius: "20px", backgroundColor: "#247480"}} onClick={() => setIsModalOpen(true)}>
          Create New Blog
        </Button>
      </Box>

      {/* Blog Cards */}
      <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: "20px" }}>
        {blogData.map((blog) => (
          <BlogCardTest
            key={blog.id}
            image={blog.image}
            title={blog.title}
            description={blog.description}
          />
        ))}
      </Box>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} sx={{borderRadius: "20px"}}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400, borderRadius: '10px' }}>
          <Typography variant="h6" gutterBottom>
            Create New Blog
          </Typography>
          <TextField
            label="Blog Title"
            variant="outlined"
            fullWidth
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Short Description"
            variant="outlined"
            fullWidth
            value={blogShortDesc}
            onChange={(e) => setBlogShortDesc(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Long Description"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={blogLongDesc}
            onChange={(e) => setBlogLongDesc(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleCreateBlog} sx={{marginTop:"20px", width:"100%", backgroundColor: "#247480", borderRadius: "10px"}}>
            Create
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default BlogPage;
