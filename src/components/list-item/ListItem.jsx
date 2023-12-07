import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function ListItem({ _id, heading, image, userId, created_at, subscribers }) {
  return (
    <Card style={{ maxWidth: "38rem", paddingTop: "20px" }}>
      <Card.Img variant="top" src={image} style={{ maxWidth: "36em", height: "auto" }} />
      <Card.Body>
        <Card.Title>{heading}</Card.Title>
        {/* <Card.Title>{subscribers.length}</Card.Title> */}

        <Link to={`/item/${_id}`}>
          <Button variant="primary">See more</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
