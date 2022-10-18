import { Route, Link as RouterLink, Switch } from "react-router-dom";

import Character from "./components/CharacterDetails";
import Characters from "./components/Characters";
import { Link } from "@material-ui/core";
import React from "react";

export default function Layout(props) {
  return (
    <div className="App">
      <h1>Star Wars World</h1>
      <nav>
      <Link component={RouterLink} to="/">
        </Link>
        <Link component={RouterLink} to="/characters">
          <button>Characters</button>
        </Link>
      </nav>
      <div className= "content">
        <Switch>
        <Route exact path="/">
            <Characters />
          </Route>
        <Route exact path="/characters">
            <Characters />
          </Route>
          <Route exact path="/characters/:characterId">
            <Character />
          </Route>
        </Switch>
        </div>
    </div>
  );
}
