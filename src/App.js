import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import PostTraditional from "./components/PostTraditional";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import PostRQ from "./components/PostRQ";
import PostDetailsRQ from "./components/PostDetailsRQ";
import PaginatedQueries from "./components/PaginatedQueries";
import InfiniteQueries from "./components/InfiniteQueries";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/posts' element={<PostTraditional />} />
          <Route exact path='/rq-posts' element={<PostRQ />} />
          <Route exact path='/rq-posts/:postId' element={<PostDetailsRQ />} />
          <Route
            exact
            path='/paginated-fruits'
            element={<PaginatedQueries />}
          />
          <Route exact path='/infinite-fruits' element={<InfiniteQueries />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
