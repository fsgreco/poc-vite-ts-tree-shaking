import { MyButton } from "@components";
import { Link } from "react-router-dom";

export const HomePage = () => (
  <div>
    This is the generated root route. <MyButton label="HELLO FRIEND" />
    <Link to="/page-2">Click here for page 2.</Link>
  </div>
);

export default HomePage