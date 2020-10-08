import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import SearchView from './views/SearchView'
import VideoView from './views/VideoView'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/video/:id">
            <VideoView />
          </Route>
          <Route path="/search">
            <SearchView />
          </Route>
          <Route path="/">
              <Redirect to="/search"/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
