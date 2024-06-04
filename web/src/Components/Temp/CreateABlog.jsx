import { useReducer, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import { useContext } from 'react';
import { NewPostContext, NewPostDispatchContext, NewPostProvider } from "./NewPostContext";
import axios from "axios";


// import { Provider, useSelector, useDispatch } from 'react-redux'
// import {ADDPOST} from "../store/actions/postData.actions"
// import store from '../store';





// export function CreateABlogWrapper(){
//   return(
//     <NewPostProvider>
//       <CreateABlog />
//     </NewPostProvider>
//   )
// }

function Title({ onTitleInput }) {

  return ( <div>
    <InputGroup className="mb-3" onChange={(e) => onTitleInput(e.target.value)}>
      <Form.Control
        placeholder="Enter the Title here"
        aria-label="Enter the Title here"
        aria-describedby="basic-addon2"
      />
    </InputGroup>

  </div> );
}


function Content({onStoryInput}) {

  return ( 
    <InputGroup onChange={(e) => onStoryInput(e.target.value)}>
      <Form.Control 
      as="textarea" 
      placeholder="Description"
      aria-label="Description"
      aria-describedby="basic-addon2"
      style={{ height: '60vh' }}
       />
    </InputGroup>
   );
}


function Poster({onPosterInput, poster}) {
  // const [Poster, setPoster] = useState();
  // function handleChange(e) {
  // console.log(e.target.files);
  // setPoster(URL.createObjectURL(e.target.files[0]));
  // }
  return (    
  <label> Poster:
      <input type="file" onChange={(e) => onPosterInput(e.target.files[0])} />
      <Image src={poster} roundedCircle />
    </label> 
    );
}


function CreateABlog() {
  // const dispatch = useDispatch()
  // const postData = useSelector(state => state.postData)




  async function post() {
    console.log('post clicked');
    try {
      const response = await axios.post(
        'https://ominous-orbit-rp4wvjrvw4whxpv9-3000.app.github.dev/blogs',
        [{ title: "inputtitle" }, { poster: "image path" }, { description: "userinputdescription" }],
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTZjMGRiZmJiOWE0Mzc5MmVkMWJmZjAiLCJlbWFpbCI6InB2bkBnbWFpbC5jb20iLCJpYXQiOjE3MDIwNDc4MTIsImV4cCI6MTcwMjA1MTQxMn0.nYVoybaWD-zvYKa2I9TRuPDhfVnDR0-pWj3g9QSzpd0',
          },
        }
      );
      console.log('Post Request Successful:', response.data);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  
    // Dispatch your action using the Formik values
    // [{title: "inputtitle"}, {poster: "image path"}, {description: "userinputdescription"}] -> dynamic
  }




  // function postwReducer(){
  //   console.log('post clicked')
  //   dispatch({ type: "addPost", payload: {
  //     id: 2,
  //     title: title,
  //     poster: poster,
  //     story: story,
  //    } });
  //   // dispatch({type: "addPost", payload: [
  //   //   {title: title},
  //   //   {poster: poster},
  //   //   {story: story},
  //   // ]})
  //   console.log('post ended')
  // }


  // function postwRedux(){
  //   console.log('post clicked')
  //   debugger
  //   dispatch({ type: "addPost", payload: {
  //     id: 2,
  //     title: title,
  //     poster: poster,
  //     story: story,
  //    } });
  //   console.log('post ended')
  // }


  const [ title, setTitle ] = useState();
  // const TitleUpdater = (arg) =>
  // dispatch({ type: "TitleUpdate", payload: arg });
   const TitleUpdater = (arg) => setTitle(arg)
  // console.log({title})


  const [story, setStory] = useState();
  // const StoryUpdater = (arg) =>
  // dispatch({ type: "ContentUpdate", payload: arg });
  const StoryUpdater = (arg) => setStory(arg)
  //console.log({story})
  
  const [poster, setPoster] = useState();
  // const PosterUpdater = (arg) =>
  // dispatch({ type: "PosterUpdate", payload: arg });
  const PosterUpdater = (arg) => setPoster(arg)
  //console.log({poster})



  return ( 
    <div >
      
    <Container fluid = "xxl">
      <Row>
        <Col></Col>
        <Col className="text-title"> Create A Blog </Col>
        <Col></Col>
      </Row>
    </Container>


    <Container>
      <Row>
        <Title onTitleInput={TitleUpdater} />
        <Poster onPosterInput={PosterUpdater} poster={poster}/>
        <Content onStoryInput= {StoryUpdater}/>
      </Row>
    <Row style={{textAlign:'center'}}>

    <Button variant="outline-secondary" style={{width:'100px'}} onClick={post()}>
      Post
    </Button>
{/* 
      <input
          type="text"
          value={postData.title}
          onChange={(e) =>
            dispatch({ type: "TitleUpdate", payload: e.target.value })
          }
        /> */}
    </Row>
    </Container>

    </div>
    
    );
}




export default CreateABlog;

