interface Props {
  name: string;
  type?: "button" | "submit" | "reset";
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
  onClick: (name: any) => void;
}

const Button = ({
  name,
  type = "button",
  color = "primary",
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      className={"btn btn-" + color}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default Button;
