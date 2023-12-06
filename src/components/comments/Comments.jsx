import "./Comments.css";

export default function Comments({ item }) {
  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-center row">
        <div className="d-flex flex-column col-md-12">
          <div className="d-flex flex-row align-items-center text-left comment-top p-2 bg-white border-bottom px-4">
            <div className="profile-image">
              <img className="rounded-circle" src={item?.userId?.userImg} width="70" height="70" />
            </div>
            <div className="d-flex flex-column-reverse flex-grow-0 align-items-center votings ml-1">
              <i className="fa fa-sort-up fa-2x hit-voting"></i>
              <span className="m-1">
                {item?.subscribers?.length}
                <span>❤️</span>
              </span>
              <i className="fa fa-sort-down fa-2x hit-voting"></i>
            </div>
            <div className="d-flex flex-column ml-4">
              <div className="d-flex flex-row post-title">
                <h5 className="m-0">{item?.userId?.username}</h5>
              </div>

              <div className="d-flex flex-row align-items-center align-content-center post-title">
                <span className="bdge m-2">{item?.themeName}</span>
                <span className="mr-2 dot"></span>
                <span className="m-2">{item?.created_at}</span>
              </div>
            </div>
          </div>
          <div className="coment-bottom bg-white p-2 px-4">
            <div className="d-flex flex-row add-comment-section mt-4 mb-4">
              <img
                className="img-fluid img-responsive rounded-circle mr-5"
                src="https://i.imgur.com/qdiP4DB.jpg"
                width="70px"
              />
              <input type="text" className="btn" placeholder="Add comment" />
              <button
                className="btn btn-primary"
                type="button"
                style={{ maxHeight: "40px", alignSelf: "center" }}
              >
                Comment
              </button>
            </div>

            <div className="commented-section mt-2">
              <div className="d-flex flex-row align-items-center commented-user">
                <h5 className="m-2">Nasko Dimitrov</h5>
                <span className="mr-2 dot"></span>
                <span className="m-2">4 hours ago</span>
              </div>
              <div className="comment-text-sm">
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
              </div>

              <div className="reply-section">
                <div className="d-flex flex-row align-items-center voting-icons">
                  <i className="fa fa-sort-up fa-2x mt-3 hit-voting"></i>
                  <i className="fa fa-sort-down fa-2x mb-3 hit-voting"></i>
                  <span className="ml-2">10</span>
                  <span className="dot m-2"></span>
                  <h6 className="ml-2 mb-0">Likes</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
