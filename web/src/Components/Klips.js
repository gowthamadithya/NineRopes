import {
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
  Button,
  IconButton,
  Slider,
  CircularProgress,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Forward10Icon from "@mui/icons-material/Forward10";
import Replay10Icon from "@mui/icons-material/Replay10";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const Klips = ({ klips }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      borderBottom={2}
      sx={{
        height: '100%',
        width: 'auto',
        overflowY: 'scroll',
      }}
    >
      {klips?.map((klip, index) => (
        <React.Fragment key={klip.data.id}>
          <Klip klip={klip} />
          {index !== klips.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Stack>
  );
};





const Klip = ({ klip }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState()

  const handleMoreClick = () => {
    setExpanded(!expanded);
  };

  const klipTypes = {
    video: klip.data.is_video,
    gallery: klip.data.is_gallery,
    image: /\.(jpeg|jpg|png)$/.test(klip.data.url),
  };

  const isTextLong = klip.data.selftext && klip.data.selftext.length > 100;

  return (
    <Box
      sx={{
        width: 'auto',
        backgroundColor: 'background.default',
        color: 'text.primary',
        margin: '10px',
        padding: '10px',
        border: 1,
        borderRadius: '20px',
        borderColor: 'divider',
        boxShadow: theme.shadows[1],
        transition: theme.transitions.create(['box-shadow'], {
          duration: theme.transitions.duration.standard,
        }),
        '&:hover': {
          boxShadow: theme.shadows[2],
        },
      }}
    >

      <Stack>

        <Typography variant="h6" sx={{ marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {klip.data.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: '10px',
            maxHeight: expanded ? 'none' : '50px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {klip.data.selftext ? (expanded ? klip.data.selftext : `${klip.data.selftext.slice(0, 100)}...`) : null}
        </Typography>

        {isTextLong && (
          <Button onClick={handleMoreClick} sx={{ marginTop: '10px' }}>
            {expanded ? 'Hide' : 'More'}
          </Button>
        )}
      </Stack>

      <Box>

        {klipTypes.video && <VideoKlip videoLink={klip.data.media.reddit_video.dash_url} />}

        {klipTypes.image && (
          <img
            src={klip.data.url}
            alt="klip Media"
            style={{ width: '100%', objectFit: 'cover' }}
          />
        )}

        {klipTypes.gallery && <p>gallery is not implemented yet</p>}
      </Box>


      <Stack>

        <Button onClick={handleMoreClick} sx={{ marginTop: '10px' }}>
          {liked ? 'unLIke' : 'like'}
        </Button>
      </Stack>
    </Box>
  );
}








const VideoKlip = ({ videoLink }) => {
  const playerRef = useRef(null);
  const previewPlayerRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSkip = (seconds) => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + seconds, 'seconds');
    }
  };

  const handleSliderChange = (event, newValue) => {
    const time = (newValue / 100) * duration;
    setSeekTime(time);
    setShowPreview(true);
  };

  const handleSliderChangeCommitted = (event, newValue) => {
    const time = (newValue / 100) * duration;
    setSeekTime(time);
    if (playerRef.current) {
      playerRef.current.seekTo(time, 'seconds');
    }
    setShowPreview(false);
  };

  useEffect(() => {
    if (previewPlayerRef.current) {
      previewPlayerRef.current.seekTo(seekTime);
    }
  }, [seekTime]);

  const handlePlayPause = () => {
    setPlaying((prev) => !prev);
  };

  const handleMute = () => {
    setMuted((prev) => !prev);
  };

  const handleFullscreen = () => {
    if (playerRef.current.wrapper) {
      if (!document.fullscreenElement) {
        playerRef.current.wrapper.requestFullscreen();
        setFullscreen(true);
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  return (
    <Box sx=
    {{ 
      position: 'relative',
    }}>
      <ReactPlayer
        ref={playerRef}
        url={videoLink}
        playing={playing}
        muted={muted}
        controls={false}
        onBuffer={() => setLoading(true)}
        onBufferEnd={() => setLoading(false)}
        onReady={() => setDuration(playerRef.current.getDuration())}
        width="100%"
        height="100%"
        config={{
          file: {
            attributes: {
              crossOrigin: 'anonymous'
            },
          },
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: ['1rem', '2rem'],
          width: '100%',
          px: ['1rem', '2rem'],
          boxSizing: 'border-box',
          zIndex: 2,
        }}
      >
        <Slider
          aria-label="Seek bar"
          min={0}
          max={100}
          value={(seekTime / duration) * 100}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderChangeCommitted}
          sx={{
            color: 'primary.main',
            height: 4,
            '& .MuiSlider-thumb': {
              height: 12,
              width: 12,
              backgroundColor: 'primary.main',
              '&:focus, &:hover, &.Mui-active': {
                boxShadow: 'inherit',
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.5,
              backgroundColor: 'background.default',
            },
          }}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: ['0.1rem', '0.2rem'],
          right: '20px',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={handleMute} sx={{ color: 'white' }}>
          {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
        <IconButton onClick={handleFullscreen} sx={{ color: 'white' }}>
          {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: { xs: '5rem', md: '9rem' },
          transform: 'translateY(-50%)',
          zIndex: 2,
        }}
      >
        <IconButton onClick={() => handleSkip(-10)} sx={{ color: 'white' }}><Replay10Icon /></IconButton>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: { xs: '5rem', md: '9rem' },
          transform: 'translateY(-50%)',
          zIndex: 2,
        }}
      >
        <IconButton onClick={() => handleSkip(10)} sx={{ color: 'white' }}><Forward10Icon /></IconButton>
      </Box>

      {loading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}
        >
          <IconButton onClick={handlePlayPause} sx={{ color: 'white' }}>
            {playing ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Box>
      )}

{showPreview && (
        <Box
          sx={{
            position: 'absolute',
            bottom: ['2.7rem', '2.5rem'],
            left: `${(seekTime / duration) * 100}%`,
            transform: 'translateX(-50%)',
            zIndex: 1000,
            backgroundColor: 'white',
            color: 'black',
            padding: '0.1rem',
            borderRadius: '0.2rem',
            textAlign: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ReactPlayer
            ref={previewPlayerRef}
            url={videoLink}
            playing={false}
            muted
            controls={false}
            width="6rem"
            height="3.4rem"
            config={{
              file: {
                attributes: {
                  crossOrigin: 'anonymous',
                },
              },
            }}
          />
          <Typography variant="caption">
            {Math.floor(seekTime / 60)}:{Math.floor(seekTime % 60).toString().padStart(2, '0')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};


export default Klips;







