import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";

import * as itemService from "../../services/itemsService";
import ListItem from "../list-item/ListItem";
import Loader from "../loader/Loader";

export default function List() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    itemService
      .getAll()
      .then((result) => {
        setItems(result), setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(items);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">{isLoading && <Loader />}</div>
      <Row xs={1} md={2} className="g-4" style={{ justifyContent: "space-evenly" }}>
        {items.map((item) => (
          <ListItem key={item._id} {...item} isLoading={isLoading} />
        ))}
      </Row>
    </div>
  );
}
