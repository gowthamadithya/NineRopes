import { useEffect, useState } from "react";
import { Box, CircularProgress, NativeSelect, Stack, Typography } from "@mui/material";
import RedditApi, { accessExpiretime, fetchAccessToken } from "./api/redditApi";
import Klips from "./Klips";
import { useParams } from "react-router-dom";




export function Feed({ curRoute = null, isRope = null}) {

  const [klips, setKlips] = useState()
  const [selectedFeed, setselectedFeed] = useState('hot')
  const mediaTypes = ['all', 'video', 'image', 'audio']

  useEffect( () => {
    if (Date.now() > accessExpiretime){
      fetchAccessToken()
    }
  },[]);


  // const {urlParams} = useParams()
  // console.log(urlParams)
  // if (urlParams){
  //   setFeedPath(`/r/${isRope}/${selectedOption}?limit=100`)
  // }else{
  //   isRope ? setFeedPath(`/r/${isRope}/${selectedOption}?limit=100`)
  //   : setFeedPath(`/${selectedOption}?limit=100`)
  // }



  console.log("select option", selectedFeed)



  useEffect(() => {
    let feedPath
    // feedPath = '/api/subreddit_autocomplete?query=aizen&incude_over_18=false'
    if (curRoute) {
      feedPath = curRoute 
      console.log('entered if', feedPath)
    } else {
      feedPath = isRope ? `/r/${isRope}/${selectedFeed}?limit=100`
        : `/${selectedFeed}?limit=100`
      console.log('entered else', feedPath)
    }
    console.log(feedPath)
    RedditApi(feedPath, 'GET')
      .then(responseData => {
        console.log(responseData.data.children)
        setKlips(responseData.data.children);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      });
  }, [selectedFeed, curRoute, isRope]);




  const feedTypes = ['hot', 'best', 'top', 'new']
  const FeedDropdown = () => {
    return (
      <NativeSelect
        value={selectedFeed}
        sx={{ color: 'primary.main', backgroundColor: 'background.default' }}
        onChange={(e) => {
          setselectedFeed(e.target.value)
          setKlips()
        }}
      >
        {
          feedTypes?.map((feedType) => (
            <option value={feedType} key={feedType}>{feedType}</option>
          ))
        }
      </NativeSelect>
    )
  }



  const routeMap = {
    search: (<p>searchDetails for {curRoute}</p> ),
    rope: (<p>Rope details for {isRope}</p>)
  }


  // console.log("select value", selectedFeed)


  return (
    <>
      <Box
        sx={{
          height: '100%', // Full height of parent stack
          width: { xs: 'auto', md: 'calc(50%)' }, // Full width for small screens, adjusted width for medium and above
          borderRight: { md: 1 }, // Border on right for medium screens and above
          borderColor: 'divider',
          px: 2, // Padding for inner content
          // overflowY: 'scroll',
          backgroundColor: 'background.dark'
        }}
      >

        {/* {curRoute?.includes("search") ? (<p>searchDetails for {curRoute}</p> )
        : isRope ? (<p>Rope details for {isRope}</p>)
        : null} */}

        {/* {curRoute?.(curRoute.split("/"))[0] */}

        
        <Stack direction='row'>
          <Typography>
            <FeedDropdown />
          </Typography>
          <Typography>
            <button> hello </button>
          </Typography>

        </Stack>

        {klips ?
          (
            <Klips klips={klips} />
          ) :
          (
            <CircularProgress 
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
            />

          )}

      </Box>

      <Box
            sx={{
              height: 'auto', // Full height of parent stack
              display: { xs: 'none', md: 'block' }, // Hide on small screens, show on medium and above
              width: '480px', // Fixed width for large screens
              borderRight: 'divider' //'2px solid #3d3d3d', // Border on right
            }}
          >
            Favourite Ropes
      </Box>


    </>
  )

}



