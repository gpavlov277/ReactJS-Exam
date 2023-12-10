import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as itemService from "../../services/itemsService";
import useForm from "../../hooks/useForm";
import ItemContext from "../../contexts/itemContext";
import Loader from "../loader/Loader";
export default function EditItem() {
  const EditFormKeys = {
    Heading: "heading",
    About: "about",
    Location: "location",
    Image: "image",
    Details: "details",
  };

  const { itemId } = useParams();
  const [item, setItem] = useState({
    heading: "",
    about: "",
    location: "",
    image: "",
    details: "",
  });

  const navigate = useNavigate();
  const { onEditSubmit, isLoading, editError, setEditError, userId } = useContext(ItemContext);

  useEffect(() => {
    itemService
      .getOne(itemId)
      .then((data) => {
        setItem(data);

        if (data.userId._id !== userId) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, [itemId]);

  const onChange = (e) => {
    setItem((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  const onTouch = (e) => {
    onChange(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formInput = Object.fromEntries(new FormData(e.target));
    onEditSubmit(formInput, itemId);
  };

  return (
    <div className="wrapper mt-4" style={{ minHeight: "78vh" }}>
      <div id="formContent">
        <h2 className="active">Edit Item </h2>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="heading"
            className="fadeIn first"
            placeholder="heading"
            name={EditFormKeys.Heading}
            value={item[EditFormKeys.Heading]}
            onChange={onChange}
            onFocus={onTouch}
          />
          {/* {d["heading"] && <p className="form-error">{d.heading}</p>} */}

          <input
            type="text"
            id="about"
            className="fadeIn first"
            placeholder="about"
            name={EditFormKeys.About}
            value={item[EditFormKeys.About]}
            onChange={onChange}
            onFocus={onTouch}
          />
          {/* {d["about"] && <p className="form-error">{d.about}</p>} */}

          <input
            type="text"
            id="location"
            className="fadeIn first"
            placeholder="location"
            name={EditFormKeys.Location}
            value={item[EditFormKeys.Location]}
            onChange={onChange}
            onFocus={onTouch}
          />

          <input
            type="text"
            id="image"
            className="fadeIn first"
            placeholder="image"
            name={EditFormKeys.Image}
            value={item[EditFormKeys.Image]}
            onChange={onChange}
            onFocus={onTouch}
          />
          {/* {d["image"] && <p className="form-error">{d.image}</p>} */}
          <input
            type="text"
            id="details"
            className="fadeIn first"
            placeholder="more details (comma-separated)"
            name={EditFormKeys.Details}
            value={item[EditFormKeys.Details]}
            onChange={onChange}
            onFocus={onTouch}
          />

          <p className="form-error mb-2">{editError?.message}</p>
          {isLoading && (
            <div>
              <Loader />
            </div>
          )}

          <input type="submit" className="btn btn-success fadeIn mb-3 mt-0" value="Save" />

          <input
            onClick={() => {
              navigate(`/item/${item._id}`);
            }}
            type="button"
            className="btn btn-danger mb-3 mt-0 fadeIn"
            style={{
              padding: "13px 50px",
              fontSize: "13px",
              textTransform: "uppercase",
            }}
            value="Cancel"
          />
        </form>
      </div>
    </div>
  );
}
