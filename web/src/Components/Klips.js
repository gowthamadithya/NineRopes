import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { NewPostContext, NewPostProvider } from "./Temp/NewPostContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";




export function Klips() {

  // need a better WA here 
  // const [klips, setKlips] = useState({title: "Sample Title", message: "Sample Message"} )

  const [klips, setKlips] = useState([])

  useEffect( () => {
    let processing = true
    axiosFetchData(processing)
    return () => {
        processing = false
    }
  },[])

  const axiosFetchData = async(processing) => {
    await axios.get('http://localhost:4000/rest/klips')
    .then(res => {
      if (processing) {
          setKlips(res.data)
      }
  })
    .catch(err => console.log(err))
  }

  console.log({klips})

  return (
    //know why <Klip klip={klip} /> not working here
    <div>
      {klips?.map(klip => {
        return (
          <Container fluid="md" className="klip" >
          <Row>
            <Col className="justify-content-md-center">
              image comes here
            </Col>
            <Col className="justify-content-md-center">
             <Row md="auto">
              {klip.title}
              </Row>
            <Row>
              {klip.message}
            </Row>
            <Col className="klip-options">
              <button >
                Klip It
              </button>
              <button >
                Like
              </button>
              <button>
                Share
              </button>
            </Col>
            </Col>
          </Row>
          </Container>
        );
      })}
    </div>
  );

}





// useEffect( () => {
//   axiosFetchData()
// },[])

// const axiosFetchData = async() => {
// await axios.get('http://localhost:4000/rest/klips')
// .then(res => res.data)
// .then(data => setPosts(data))
// .catch(err => console.log(err))
// }




function Klip({klip}) {
  return (
    <Container fluid="md" className="klip" >
    <Row>
      <Col className="justify-content-md-center">
        image comes here
      </Col>
      <Col className="justify-content-md-center">
       <Row md="auto">
        {klip.title}
        </Row>
      <Row>
        {klip.message}
      </Row>
      </Col>
    </Row>
    </Container>
  )
}

