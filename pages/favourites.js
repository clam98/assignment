import { useAtom } from "jotai";
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
}