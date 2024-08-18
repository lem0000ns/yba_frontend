interface Props {
  source: any;
}

const Image = ({ source }: Props) => {
  return <img src={source} alt="..." className="image"></img>;
};

export default Image;
