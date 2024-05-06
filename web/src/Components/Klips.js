import { Box, Button, Card, CardActions, CardContent, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const Klips = ({ klips }) => {
  return (
    <Stack
      direction= 'column'
      flexDirection= 'auto'
      sx={{
        overflowY: 'auto'
      }}
    >
      {klips?.map(klip => <Klip klip={klip} />)}
    </Stack>
  )
}


function Klip({ klip }) {
  const Theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleMoreClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Box
      sx={{
        width: 'auto',
        height: expanded ? 'auto' : 200,
        overflow: 'hidden',
        backgroundColor: Theme.palette.background.default,
        color: Theme.palette.text.primary,
        margin: '5px',
        padding: '10px',
        border: 1,
        borderRadius: '20px',
        borderColor: Theme.palette.divider,
        transition: 'height 0.3s ease',
        "&:hover": {
          backgroundColor: Theme.palette.primary.main,
          transform: 'scale(1.03)',
          // height: 'auto',
          // width: 'auto'
        }
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '2px' }}>
        {klip.data.title} 
      </Typography>
      <Typography variant="h8" sx={{ marginBottom: '2px' }}>
        {klip.message}
      </Typography>
      {/* Image/Video Section */}
      {klip.data.is_video ? (
        <video controls style={{ width: '100%', height: 'auto' }}>
          <source src={klip.data.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : !klip.data.is_video ? (
        <img src={klip.data.url} alt="klip Media" style={{ width: '100%', height: 'auto' }} />
      ) : null}

      {/* <Typography variant="body1" sx={{ marginBottom: '10px' }}>
        {expanded ? klip.content : `${klip.message.slice(0, 100)}...`}
      </Typography>
      {!expanded && (
        <Button size="small" color="primary" onClick={handleMoreClick}>
          More
        </Button>
      )} */}
    </Box>
  )
}




export default Klips