import { Button, Link } from "@material-ui/core";
import { Route, Link as RouterLink, Switch } from "react-router-dom";

import Character from "./Character";
import Characters from "./Characters";
import Home from "./Home";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useIsFetching } from "react-query";

export default function Layout(props) {
  const classes = useStyles();
  const isFetching = useIsFetching();
  // eslint-disable-next-line
  const [fetching, setFetching] = React.useState(0);

  React.useEffect(() => {
    setFetching((prevFetching) => {
      if (isFetching > prevFetching) {
        setFetching(isFetching);
      } else {
        setTimeout(() => {
          setFetching(isFetching);
        }, 200);
      }
    });
  }, [isFetching]);

  return (
    <div className="App">
      <nav className={classes.menu}>
        <Link component={RouterLink} to="/characters">
          <Button color="primary">Characters</Button>
        </Link>
      </nav>
      <main className={classes.main}>
        <Switch>
          <Route exact path="/characters">
            <Characters />
          </Route>
          <Route exact path="/characters/:characterId">
            <Character />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    margin: "0 auto",
    padding: "16px"
  },
  menu: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#CCC",
    "& button": {
      margin: theme.spacing(1)
    }
  },
  rotatingIcon: {
    animation: "$spinning-animation infinite 2s linear",
    color: "green",
    fontSize: 18
  },
  "@keyframes spinning-animation": {
    from: { transform: "rotate(360deg)" },
    to: { transform: "rotate(0deg)" }
  }
}));
