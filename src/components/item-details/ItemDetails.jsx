import { useEffect, useState } from "react";
import Comments from "../comments/Comments";

import * as itemService from "../../services/itemsService";
import { useNavigate, useParams } from "react-router-dom";
import OverlayLoader from "../loader/OverlayLoader";
export default function ItemDetails() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const isAuth = JSON.parse(localStorage.getItem("auth")).token;

  useEffect(() => {
    itemService
      .getOne(itemId)
      .then((result) => {
        setItem(result);
        setIsLoading(false);

        if (result.message) {
          throw new Error("Not Found!");
        }
      })
      .catch((err) => {
        navigate("/");
      });
  }, []);

  const getDetails = (item) => {
    if (item.details) {
      const details = item.details.split(",");
      return details;
    } else {
      return ["No project details added"];
    }
  };

  return (
    <>
      {isLoading ? (
        <OverlayLoader />
      ) : (
        <div className="container">
          <h1 className="my-4">{item?.heading}</h1>

          <div className="row">
            <div className="col-md-8">
              <img className="img-fluid" src={item.image} alt="" />
            </div>

            <div
              className="col-md-4"
              style={{ margin: "auto", overflow: "scroll", maxHeight: "535px" }}
            >
              <h3 className="my-3">Photo Description</h3>
              <p>{item.about}</p>
              <h3 className="my-3">Project Details</h3>
              <ul>
                {getDetails(item).map((d) => (
                  <li key={Math.random(1000) * 2}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
          {isAuth && <Comments item={item} />}
        </div>
      )}
    </>
  );
}
