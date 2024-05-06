import { IconButton, Paper, Stack, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import homeLogo from '../homeLogo.png'
import RedditApi from "./api/redditApi";

export default function NavBar() {
  const Theme = useTheme()
  return (
    <>
    <Stack 
      direction={'row'} 
      alignItems={'center'} 
      padding={2}
      sx={{background: Theme.palette.background.dark,
        position: 'sticky',
        top: 0,
        justifyContent: 'space-between'
        }} 
    > 
    <Link to='/' style={{display: 'flex',
      alignItems: 'center'
      }}>
    <img 
    height = '30vh'
    width= '100vh'
    src={homeLogo} alt='homeLogo' />
    </Link>
    
    <SearchBar />

    </Stack>
    <Outlet />
    </>
  )
}



const SearchBar = () => {
  const [searchText, setsearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = () => {
    RedditApi('/r/search?limit=100', 'GET')
      .then(responseData => {
        console.log(responseData)
        setSearchResults(responseData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      });
  }

  return ( 
    <Paper 
      component='form'
      onSubmit={()=> handleSearch()}
      sx={{
        borderRadius: 20,
        paddingLeft: 2,
        boxShadow: 'none',
        marginRight: {sm: 5}
      }}
    >
      <input
        placeholder='Search...'
        value=""
        onChange={(e) => setsearchText(e.target.value)}
      />
      <IconButton 
        type='submit'
        sx={{
          // color: '#009ffd',
          // border: '1px',
          // outline: 'none'
        }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
