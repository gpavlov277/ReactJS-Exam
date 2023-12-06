import { useEffect, useState } from "react";
import Comments from "../comments/Comments";

import * as itemService from "../../services/itemsService";
import { useParams } from "react-router-dom";
export default function ItemDetails() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    itemService
      .getOne(itemId)
      .then((result) => setItem(result))
      .catch((err) => console.log(err));
  }, []);

  console.log(item);
  return (
    <div className="container">
      <h1 className="my-4">{item?.themeName}</h1>

      <div className="row">
        <div className="col-md-8">
          <img className="img-fluid" src={item.themeImg} alt="" />
        </div>

        <div className="col-md-4">
          <h3 className="my-3">Photo Description</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio,
            gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et,
            interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.
          </p>
          <h3 className="my-3">Project Details</h3>
          <ul>
            <li>Lorem Ipsum</li>
            <li>Dolor Sit Amet</li>
            <li>Consectetur</li>
            <li>Adipiscing Elit</li>
          </ul>
        </div>
      </div>
      <Comments item={item} />
    </div>
  );
}
