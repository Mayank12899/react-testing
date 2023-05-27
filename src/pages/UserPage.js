import React from 'react';
import { Box, Typography, Avatar, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const UserPage = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: "100%" }}>
      <Box sx={{ padding: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">John Doe</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    johndoe@example.com
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" gutterBottom>
                    Bio
                  </Typography>
                  <Typography variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus justo.
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Button variant="contained" style={{backgroundColor: "#247480", padding: "10px" }}>
                    Edit Profile
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default UserPage;
