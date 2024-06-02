import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RedditApi from './api/redditApi'
import Klips from './Klips'

const RopeDetails = () => {
    const {ropeName} = useParams()
    const [ropeResults, setRopeResults] = useState([])

    const getRopeResults = () => {
      RedditApi(`/r/${ropeName}`, 'GET')
        // console.log(`/search?q=${searchText}&limit=100`)
        .then(responseData => {
          console.log(responseData.data.children)
          setRopeResults(responseData.data.children);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          // Handle error state if needed
        });
    }

    useEffect( () => {
      getRopeResults()
    },[ropeName]);

  return (
    <Klips klips={ropeResults} />
  )
}

export default RopeDetails