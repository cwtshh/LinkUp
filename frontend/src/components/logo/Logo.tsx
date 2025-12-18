import logo from "../../assets/logo.png";
const Logo = ({ size }: { size: "sm" | "md" | "lg" }) => {
  let dimension: string;

  switch (size) {
    case "sm":
      dimension = "w-16 h-16"; // 64px
      break;
    case "md":
      dimension = "w-24 h-24"; // 96px
      break;
    case "lg":
      dimension = "w-32 h-32"; // 128px
      break;
    default:
      dimension = "w-24 h-24";
  }
  return <img src={logo} alt="LinkUp Logo" className={dimension} />;
};

export default Logo;
