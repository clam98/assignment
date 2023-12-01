/*import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import ArtworkCard from "@/components/ArtworkCard";
import { Row, Col, Card,Container } from "react-bootstrap";

export default function Favourites(){

    const [favouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;
    return( 
      <>
      {favouritesList.length === 0? (
        <Card>
        <Card.Body>
          <Card.Text >
            <h4>Nothing Here</h4>
            Try adding some artwork.{" "}
          </Card.Text>
        </Card.Body>
      </Card>
      ) : (
        <Container>
        <Row>
          {favouritesList.map((objectID) => (
            <Col key={objectID} md={4} className="mb-3">
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      </Container>
      )}
      </>
    )
}*/
import { useAtom } from "jotai"
import { favouritesAtom } from "@/store"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import ArtworkCard from "@/components/ArtworkCard"

export default function Favourite() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom) // Getting a reference to the favouriteList from favouritesAtom
  if (!favouritesList) return null
  return (
    <>
      <Row className="gy-4">
        {favouritesList ? (
          favouritesList.map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <Card.Text as="div">
                <h4>Nothing Here</h4>
                Try adding some new artwork to the list.{" "}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  )
}