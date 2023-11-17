import useSWR from 'swr';
import {useState, useEffect} from 'react';
import ArtworkCard from '@/components/ArtworkCard';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import { useRouter } from 'next/router';
import Error from 'next/error';
import {Row, Col, Pagination, Card} from "react-bootstrap";


const PER_PAGE = 12;
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index(){
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`, fetcher);

  function previous () {
    if(page >1) {
        setPage(page -1 )
    } 
  }
   
  function next () {
    if(page<artworkList.length){
        setPage(page +1 )
    }
  }

  useEffect(() => {
      let results = [];

      if(data){
          for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
              const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
              results.push(chunk);
            }
            setArtworkList(results);
            setPage(1);
                }
  }, [data]);


  if(error){
      return <Error statusCode={404} />
   }

  if(artworkList){
      return(
          <>
              {artworkList.length > 0 ? (
                <Row className="gy-4">
                  {artworkList[page - 1].map((currentObjectID) =>(
                      <Col lg={3} key={currentObjectID}>
                          <ArtworkCard objectID={currentObjectID} />
                      </Col>
                  ))}
                </Row>
              ) : (
              <Card>
                  <Card.Body>
                      <h4>Nothing Here</h4>
                      Try searching for something else.
                  </Card.Body>
              </Card>
              )}

              {artworkList.length > 0 ? (
                  <Row className="mt-4">
                      <Col>
                          <Pagination>
                              <Pagination.Prev onClick={previous} />
                              <Pagination.Item>{page}</Pagination.Item>
                              <Pagination.Next onClick={next} />
                            </Pagination>
                     </Col>
                            
                 </Row>
              ) : null}
          </>
      );
  }

  return null;
}
