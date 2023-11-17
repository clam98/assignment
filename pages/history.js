import { useRouter } from "next/router"
import { useAtom } from "jotai"
import { searchHistoryAtom } from "@/store"
import { ListGroup, Button, Card } from "react-bootstrap"
import styles from '@/styles/History.module.css';

export default function SearchHistory() {

  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // Getting a reference to the favouriteList from favouritesAtom

  let parsedHistory = [];

  console.log(searchHistory)
  
  searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    console.log(parsedHistory)


  function historyClicked(e,index) {
    router.push(`/artwork?${searchHistory[index]}`)
  };

  function removeHistoryClicked(e, index) {
    e.stopPropagation() // stop the event from trigging other events
    setSearchHistory((current) => {
      let x = [...current]
      x.splice(index, 1)
      return x
    })
  }
 
  return (
    <>
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body>
            <Card.Text as="div">
              <h4>Nothing Here</h4>
              Try searching for some artwork.{" "}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item 
              className={styles.historyListItem}
              key={index}
              onClick={(e) => historyClicked(e, index)}
            >
              {" "}
              {Object.keys(historyItem).map(key => (
                <>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  )
}