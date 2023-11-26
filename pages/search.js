import { Row, Col, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import styles from '@/styles/History.module.css'
import { addToHistory } from "@/lib/userData";

export default function Search(){
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const submitForm = async (data) => {
		let queryString = ""
		queryString = queryString + data.searchBy + "=true"

		if (data.geoLocation){
            queryString = queryString + "&geoLocation=" + data.geoLocation
        }

		if (data.medium){
            queryString = queryString + "&medium=" + data.medium
        }

        queryString += `&isOnView=${data.isOnView}`;
        queryString += `&isHighlight=${data.isHighlight}`;
        queryString += `&q=${data.q}`;

		setSearchHistory(await addToHistory(queryString)) 
        
		router.push(`/artwork?${queryString}`)
	}

    console.log(searchHistory)

    return(
      <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
          <Col>
          <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control type="text" name="q" {...register("q", { required : true })}></Form.Control>
              { errors.q && <div className="is-valid">This field is required</div>}
          </Form.Group>
          </Col>
      </Row>
      <Row>
          <Col md={4}>
              <Form.Label>Search By</Form.Label>
              <Form.Select name="searchBy" {...register("searchBy")}>
                  <option value="title">Title</option>
                  <option value="tags">Tags</option>
                  <option value="artistOrCulture">Artist or Culture</option>
              </Form.Select>
          </Col>
          <Col md={4}>
              <Form.Group className="mb-3">
                  <Form.Label>Geo Location</Form.Label>
                  <Form.Control type="text" placeholder="" name="geoLocation" {...register("geoLocation")}/>
                  <Form.Text className="text-muted">
                  Case Sensitive String (ie &ldquo;Europe&ldquo;, &ldquo;France&ldquo;, &ldquo;Paris&ldquo;, &ldquo;China&ldquo;, &ldquo;New York&ldquo;, etc.), with multiple values separated by the | operator
                  </Form.Text>
              </Form.Group>
          </Col>
          <Col md={4}>
              <Form.Group className="mb-3">
                  <Form.Label>Medium</Form.Label>
                  <Form.Control type="text" placeholder="" name="medium" {...register("medium")}/>
                  <Form.Text className="text-muted">
                  Case Sensitive String (ie: &ldquo;Ceramics&ldquo;, &ldquo;Furniture&ldquo;, &ldquo;Paintings&ldquo;, &ldquo;Sculpture&ldquo;, &ldquo;Textiles&ldquo;, etc.), with multiple values separated by the | operator
                  </Form.Text>
              </Form.Group>
          </Col>
      </Row>
      <Row>
          <Col>
          <Form.Check
              type="checkbox"
              label="Highlighted"
              name="isHighlight"
              {...register("isHighlight")}
          />
          <Form.Check
              type="checkbox"
              label="Currently on View"
              name="isOnView"
              {...register("isOnView")}
          />
          </Col>
      </Row>
      <Row>
          <Col>
          <br />
          <Button variant="btn btn-primary" type="submit">
              Submit
          </Button>
          </Col>
      </Row>
  </Form>
    );
}  

