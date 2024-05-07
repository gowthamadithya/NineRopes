import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import SideBar from "./sidebar";
import RedditApi, { fetchAccessToken } from "./api/redditApi";
import Klips from "./Klips";




export function Feed() {

  const Theme = useTheme();

  const [klips, setKlips] = useState([])
  const [selectValue, setSelectValue] = useState('Hot')
  const feedTypes = [{name: 'Hot'}, {name: 'New'}, {name: 'Top'}]
  const [selectedOption, setSelectedOption] = useState('Home')
  const [accessToken, setaccessToken] = useState('')

  const Func = function(data) {
    console.log(data);
}

  useEffect(() => {
    RedditApi('/r/bleach?limit=100', 'GET')
      .then(responseData => {
        console.log(responseData.data.children)
        setKlips(responseData.data.children);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      });
  }, [selectValue, selectedOption]);


  useEffect( () => {
    fetchAccessToken()
  },[]);


    const SelectDropdown = () => {
        return (
          <select 
          value={selectValue} 
          style={{color: Theme.palette.primary.main, backgroundColor: Theme.palette.background.default}}
          onChange={(e)=> setSelectValue(e.target.value)}
          >
           {
           feedTypes?.map( (feedType) => (
           <option value={feedType.name} key={feedType.name}>{feedType.name}</option>
           ))
           }
         </select>
    )
  }

console.log("select value", selectValue)
console.log("select option", selectedOption)

  return (
    <>
        <Stack
      sx={{
        backgroundColor: Theme.palette.background.default,
        flexDirection: { xs: 'column', md: 'row' },
        height: '100vh', // Set the stack height to match viewport height
      }}
    >
      <Box
        sx={{
          color: Theme.palette.text.primary,
          backgroundColor: Theme.palette.background.default,
          height: 'auto', // Full height of parent stack
          borderRight: { md: 1 }, // Border on right for medium screens and above
          borderColor: Theme.palette.divider,
          borderBottom: { md: 'none', xs: 1 }, // Border on bottom for medium screens and above
          px: { xs: 0, md: 2 }, // Padding for inner content
          width: { xs: 'auto', md: '30%' }, // Full width for small screens, auto for medium and above
          // "&:hover": {
          //   backgroundColor: Theme.palette.primary.main,
          // }
        }}
      >
        <SideBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        {/* <Typography
          variant="body2"
          sx={{ mt: { sx: 1, md: 1.5 }, 
          color: Theme.palette.primary.main,
          backgroundColor: Theme.palette.background.default,
          display: { xs: 'none', md: 'block' }
         }}
        >
          Copyright © 2024 Klip Book
        </Typography> */}
      </Box>

      <Box
        sx={{
          height: 'auto', // Full height of parent stack
          width: { xs: 'auto', md: 'calc(100% - 480px)' }, // Full width for small screens, adjusted width for medium and above
          borderRight: { md: 1 }, // Border on right for medium screens and above
          borderColor: Theme.palette.divider,
          px: 2, // Padding for inner content
          overflowY: 'scroll'
        }}
      >
        <Typography>
          <SelectDropdown />
        </Typography>
        <Klips klips={klips} />
      </Box>

      <Box
        sx={{
          height: 'auto', // Full height of parent stack
          display: { xs: 'none', md: 'block' }, // Hide on small screens, show on medium and above
          width: '480px', // Fixed width for large screens
          borderRight: '2px solid #3d3d3d', // Border on right
        }}
      >
        Favourite Ropes
      </Box>
    </Stack>


    </>

  )

}



