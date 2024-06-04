import { Autocomplete, IconButton, Paper, Stack, TextField, getStepConnectorUtilityClass } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
// import homeLogo from '../homeLogo.png'
import RedditApi from './api/redditApi';

export const NavBar = ()=> {
  return (
    <>
    <Stack 
      direction={'row'} 
      alignItems={'center'} 
      padding={2}
      sx={{
        background: 'primary.main',
        position: 'sticky',
        top: 0,
        justifyContent: 'space-between',
        borderBottom: '1px solid', // Border on right for medium screens and above
        borderColor: 'divider',
        }} 
    > 
    <Link to='/' style={{display: 'flex',
      alignItems: 'center',
      color: 'purple'
      }}>
    {/* <img 
    height = '30vh'
    width= '100vh'
    src={homeLogo} alt='homeLogo' /> */}
    NineRopes
    </Link>
    
    <SearchBar />

    </Stack>

    </>
  )
}




const SearchBar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  console.log({searchText});

  const getSearchResults = (inputValue) => {
    RedditApi(`/api/subreddit_autocomplete?query=${inputValue}&include_over_18=false`, 'GET')
      .then(responseData => {
        console.log(responseData.subreddits);
        setSearchResults(responseData.subreddits);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      });
  };

  const handleSearch = () => {
    navigate(`/search/${searchText}`);
  };

  const handleOptionClick = (selectedValue) => {
    navigate(`/rope/${selectedValue}`);
  };

  return (
    <Autocomplete
      freeSolo
      options={searchResults?.map((option) => option.name)}
      onInputChange={(event, newInputValue) => {
        // Handle the input change event here
        setSearchText(newInputValue);
        getSearchResults(newInputValue);
      }}
      onChange={(event, value) => {
        // Handle option selection
        if (value) {
          handleOptionClick(value);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          sx={{
            width: { xs: '8rem', md: '20rem' }
          }}
        />
      )}
    />
  );
};

export default SearchBar;


