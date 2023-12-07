import Loader from "../loader/Loader";
import { useContext } from "react";
import ItemContext from "../../contexts/itemContext";
import useForm from "../../hooks/useForm";

const CreateFormKeys = {
  Heading: "heading",
  About: "about",
  Location: "location",
  Image: "image",
  Details: "details",
};
export default function Create() {
  const { onCreateSubmit, test } = useContext(ItemContext);
  const { values, onChange, onSubmit, formValidate } = useForm(onCreateSubmit, {
    [CreateFormKeys.Heading]: "",
    [CreateFormKeys.About]: "",
    [CreateFormKeys.Location]: "",
    [CreateFormKeys.Image]: "",
    [CreateFormKeys.Details]: "",
  });

  return (
    <div className="wrapper mt-4" style={{ minHeight: "78vh" }}>
      <div id="formContent">
        <h2 className="active">New Item </h2>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="heading"
            className="fadeIn first"
            placeholder="heading"
            name={CreateFormKeys.Heading}
            value={values[CreateFormKeys.Heading]}
            onChange={onChange}
          />

          <input
            type="text"
            id="about"
            className="fadeIn first"
            placeholder="about"
            name={CreateFormKeys.About}
            value={values[CreateFormKeys.About]}
            onChange={onChange}
          />

          <input
            type="text"
            id="location"
            className="fadeIn first"
            placeholder="location"
            name={CreateFormKeys.Location}
            value={values[CreateFormKeys.Location]}
            onChange={onChange}
          />

          <input
            type="text"
            id="image"
            className="fadeIn first"
            placeholder="image"
            name={CreateFormKeys.Image}
            value={values[CreateFormKeys.Image]}
            onChange={onChange}
          />

          <input
            type="text"
            id="details"
            className="fadeIn first"
            placeholder="more details (comma-separated)"
            name={CreateFormKeys.Details}
            value={values[CreateFormKeys.Details]}
            onChange={onChange}
          />

          <div>
            <Loader />
          </div>

          <input type="submit" className="fadeIn first" value="Add" />
        </form>
      </div>
    </div>
  );
}
