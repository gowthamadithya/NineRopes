import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RedditApi from './api/redditApi'
import KlipDetails from './KlipDetails'
import Klips from './Klips'
import { Feed } from './Feed'
import Layout from './layout'

const SearchDetails = () => {
  const [searchResults, setSearchResults] = useState([])
  const {searchText} = useParams()
  const curRoute = `/search?q=${searchText}&limit=100`
  console.log("searchDetails", curRoute)

  const getSearchResults = () => {
    RedditApi(`/search?q=${searchText}`, 'GET')
      // console.log(`/search?q=${searchText}&limit=100`)
      .then(responseData => {
        console.log(responseData.data.children)
        setSearchResults(responseData.data.children);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      });
  }

  useEffect( () => {
    getSearchResults()
  },[]);

  return (
    // <Feed curRoute={curRoute} />
    <Klips klips={searchResults} />
  )
}

export default SearchDetails