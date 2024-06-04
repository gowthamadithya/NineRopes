import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { sideBarOptions } from "../utils/constants";
import { useState } from "react";


const SideBar = () => {
    const [selectedOption, setSelectedOption ] = useState()
    const Theme  = useTheme()
  return (
      <Box
          sx={{
              color: 'text.primary',
              backgroundColor: 'background.default',
              height: 'auto', // Full height of parent stack
              borderRight: { md: 1 }, // Border on right for medium screens and above
              borderColor: 'divider',
              borderBottom: { md: 'none', xs: 1 }, // Border on bottom for medium screens and above
              px: { xs: 0, md: 2 }, // Padding for inner content
              width: { xs: 'auto', md: '30%' }, // Full width for small screens, auto for medium and above
          }}
      >
          <Stack
              direction='row'
              sx={{
                  overflowY: 'auto',
                  height: '100%', // Ensure sidebar takes full height
                  width: '100%',
                  flexDirection: { xs: 'row', md: 'column' },
                  gap: 1, // Add some spacing between buttons
                  paddingY: 2, // Add vertical padding to buttons
              }}
          >
              {sideBarOptions.map((option) => (
                  <Button
                      key={option.name}
                      onClick={() => setSelectedOption(option.name)}
                      sx={{
                          display: 'flex',
                          overflow: 'hidden',
                          alignItems: 'center',
                          backgroundColor: option.name === selectedOption ? 'primary.main' : 'transparent',
                          color: option.name === selectedOption ? 'text.primary' : 'primary.main',
                          borderRadius: '999px', // Make button round
                          border: 1,
                          borderColor: 'divider',
                          cursor: 'pointer',
                          transition: Theme.transitions.create('background-color', {
                            duration: Theme.transitions.duration.short,
                            easing: Theme.transitions.easing.easeInOut,
                          }),
                          '&:hover': {
                            backgroundColor: Theme.palette.primary.main,
                            color: 'text.primary' // background on hover
                          },
                      }}
                  >
                      <span
                          style={{
                              marginRight: 8,
                              opacity: selectedOption === option.name ? 1 : 0.6
                          }}
                      >
                          {option.icon}</span>
                      <span>{option.name}</span>
                  </Button>
              ))}
          </Stack>
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

  )
}

export default SideBar;
