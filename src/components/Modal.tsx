interface Props {
  color?:
    | "primary"
    | "danger"
    | "success"
    | "secondary"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link";
  title: string;
  enterMessage: string;
  textBox: JSX.Element;
  helperText: string[];
}

const Modal = ({
  color = "light",
  title,
  enterMessage,
  textBox,
  helperText,
}: Props) => {
  return (
    <div>
      <button
        type="button"
        className={`btn btn-${color}`}
        data-bs-toggle="modal"
        data-bs-target="#filterModal"
      >
        {title}
      </button>

      <div
        className="modal fade"
        id="filterModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                style={{ color: "black" }}
                className="modal-title fs-5"
                id="exampleModalLabel"
              >
                {enterMessage}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {textBox}

            <div className="modal-footer">
              <div
                className="form-text text-muted"
                style={{ textAlign: "left" }}
              >
                <p style={{ color: "purple", marginLeft: "20px" }}>
                  FORMAT: {"{"}stat{"}"}
                  {"{"}op{"}"}
                  {"{"}num{"}"} e.g. points{">"}30
                </p>
                <ul>
                  {helperText.map((value: string) => {
                    return <li>{value}</li>;
                  })}
                </ul>
                <p style={{ color: "purple", marginLeft: "20px" }}>
                  click ',' to add filter
                </p>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
