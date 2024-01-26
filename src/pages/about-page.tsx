import { MyProgressBox } from "@components";
import { Link } from "react-router-dom";

export const AboutPage = () => (
  <div>
    <MyProgressBox />
    <Link to="/">Click here to go back to root page.</Link>
  </div>
);

export default AboutPage