export default function EditItem() {
  return (
    <div className="wrapper mt-4" style={{ minHeight: "78vh" }}>
      <div id="formContent">
        <h2 className="active">Edit Item </h2>

        <form>
          <input
            type="text"
            id="heading"
            className="fadeIn first"
            placeholder="heading"
            // name={CreateFormKeys.Heading}
            // value={values[CreateFormKeys.Heading]}
            // onChange={onChange}
            // onFocus={onTouch}
          />
          {/* {d["heading"] && <p className="form-error">{d.heading}</p>} */}

          <input
            type="text"
            id="about"
            className="fadeIn first"
            placeholder="about"
            // name={CreateFormKeys.About}
            // value={values[CreateFormKeys.About]}
            // onChange={onChange}
            // onFocus={onTouch}
          />
          {/* {d["about"] && <p className="form-error">{d.about}</p>} */}

          <input type="text" id="location" className="fadeIn first" placeholder="location" />

          <input type="text" id="image" className="fadeIn first" placeholder="image" />
          {/* {d["image"] && <p className="form-error">{d.image}</p>} */}
          <input
            type="text"
            id="details"
            className="fadeIn first"
            placeholder="more details (comma-separated)"
          />
          {/* <p className="form-error">{createError.message}</p> */}
          {/* {isLoading && (
          <div>
            <Loader />
          </div>
        )} */}

          <input type="submit" className="fadeIn first" value="Save" />
        </form>
      </div>
    </div>
  );
}
