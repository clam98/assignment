import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import { useRouter } from 'next/router';
import {Row, Col} from "react-bootstrap";

export default function QueryById (){
    const router = useRouter();
    
    const {objectID} = router.query;
   
    if (objectID)
    return (
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
    )

}