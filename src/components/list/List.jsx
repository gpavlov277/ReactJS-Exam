import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";

import * as itemService from "../../services/itemsService";
import ListItem from "../list-item/ListItem";

export default function List() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    itemService
      .getAll()
      .then((result) => setItems(result))
      .catch((err) => console.log(err));
  }, []);

  console.log(items);

  return (
    <div className="container mt-4">
      <Row xs={1} md={2} className="g-4" style={{ justifyContent: "space-evenly" }}>
        {items.map((item) => (
          <ListItem key={item._id} {...item} />
        ))}
      </Row>
    </div>
  );
}
