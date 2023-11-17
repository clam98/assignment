import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { useState } from "react";
import { useEffect } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({objectID}){

    const [favouritesList, setFavouritesList]= useAtom(favouritesAtom)
    const [showAdded, setShowAdded]= useState(false)

    const favouritesClicked= async() =>{
        if(showAdded){
            setFavouritesList(current => current.filter(fav => fav != objectID));
        }else{
            setFavouritesList(current => [...current, objectID]);
        }

        setShowAdded(!showAdded)
    }

    const { data, error } = useSWR(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
      fetcher);

    useEffect(() => {
        console.log(favouritesList)
      })
      if (error) {
        return <Error statusCode={404} />
      }

    if(data){
        return(
            <> 
            <Card style={{width : '18rem'}}>
            {data.primaryImage && <Card.Img src={ data.primaryImage || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />}
            <Card.Body>
                <Card.Title>{ data.title || 'N/A'}</Card.Title>
                <Card.Text>
                    {data.objectDate || 'N/A'}, {' '}
                    {data.classification || 'N/A'}, {' '}
                    {data.medium}
                    <br />
                    <br />
                    {data.artistDisplayName || 'N/A' && (
                        <a href={data.artistWikidata_URL || 'N/A'} target="_blank" rel="noreferrer">Wiki</a>
                    )}, {' '}
                    {data.creditLine}, {' '}
                    {data.dimensions}
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Button variant="primary">{objectID}</Button>
                </Link>
                <Button variant={showAdded? "primary" : "outline-success"} onClick={favouritesClicked}>
                {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                </Button>
            </Card.Body>
           
        </Card>
        </>
           
        );
    }else{
        return null;
    }
}
