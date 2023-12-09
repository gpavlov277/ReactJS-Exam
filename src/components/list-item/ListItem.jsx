import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function ListItem({ _id, heading, image, userId, created_at, subscribers }) {
  return (
    <Card style={{ maxWidth: "38rem", paddingTop: "20px" }}>
      <div style={{ maxWidth: "36em", height: "16em" }}>
        <Card.Img
          variant="top"
          src={image}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
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
