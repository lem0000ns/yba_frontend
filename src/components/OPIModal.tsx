const OPIModal = () => {
  return (
    <>
      <p
        className="opimodal"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        What is OPI?
      </p>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              backgroundColor: "rgba(24, 0, 48, 1)",
            }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                What is OPI?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              OPI (Offensive Performance Index) is a value that measures a
              single player's offensive score for a particular game. Its
              calculation is dependent on minutes played, points, assists,
              efficiency, turnovers, and total points scored by their team.
              Values are normalized from 0 to 1 in each season, such that there
              is one player statline with an OPI value of 1 for each season.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OPIModal;
