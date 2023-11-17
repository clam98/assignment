
/*********************************************************************************
*  WEB422 – Assignment 4
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Carmen Student ID: 129950226 Date: Nov 3, 2023
*
********************************************************************************/ 
import useSWR from "swr";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {

  return (
    <>
    <Container>
      <Row>
        <Col md={6}>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" alt="metropolitan" fluid rounded/>
        </Col>
        <Col md={6}>
          <p>{`The Metropolitan Museum of Art in New York City, colloquially "the Met",[a] is the largest art museum in the Americas. In 2022 it welcomed 3,208,832 visitors, ranking it the third most visited U.S museum, and eighth on the list of most-visited art museums in the world.[6] Its permanent collection contains over two million works,[1] divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan's Upper East Side, is by area one of the world's largest art museums. The first portion of the approximately 2-million-square-foot (190,000 m2) building was built in 1880. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.`}</p>
        <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Link to wiki</a>
        </Col>
      </Row>
     
    </Container>
    
    </>
  );
}