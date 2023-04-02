import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./layouts/Home";
import Home2 from "./layouts/Home2";

function App() {
  return (
    <div className='App'>
      <HashRouter>
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/' element={<Home2 />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
