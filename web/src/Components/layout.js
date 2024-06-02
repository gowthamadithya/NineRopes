import React, { useEffect, useState } from 'react'
import SideBar from './sidebar'
import { Box, Stack, useTheme } from '@mui/material'
import { Feed } from './Feed'
import Klips from './Klips'
import { accessExpiretime, fetchAccessToken } from './api/redditApi'
import { Outlet } from 'react-router-dom'

const Layout = ({curRoute = null}) => {
    const [selectedOption, setSelectedOption] = useState('hot')
    const Theme = useTheme()
    
    return (
      <>
      {curRoute ? <>search</> : <p>layout</p>}
      <Feed />
      <Outlet />
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

export default Layout