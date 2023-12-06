import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

export default function Create() {
  return (
    <div className="wrapper mt-4" style={{ minHeight: "75vh" }}>
      <div id="formContent">
        <h2 className="active">New Item </h2>

        <form>
          <input type="text" id="heading" className="fadeIn first" placeholder="heading" />

          <input type="text" id="about" className="fadeIn first" placeholder="about" />

          <input type="text" id="location" className="fadeIn first" placeholder="location" />

          <input type="text" id="image" className="fadeIn first" placeholder="image" />

          <input
            type="text"
            id="more"
            className="fadeIn first"
            placeholder="more details (comma-separated)"
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
