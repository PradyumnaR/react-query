import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/posts'>Traditional posts</Link>
        </li>
        <li>
          <Link to='/rq-posts'>RQ posts</Link>
        </li>
        <li>
          <Link to='/paginated-fruits'>Paginated fruits</Link>
        </li>
        <li>
          <Link to='/infinite-fruits'>Infinite fruits</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
