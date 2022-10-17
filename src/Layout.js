import { Button, Link } from "@material-ui/core";
import { Route, Link as RouterLink, Switch } from "react-router-dom";

import Character from "./Character";
import Characters from "./Characters";
import Film from "./Film";
import Films from "./Films";
import Home from "./Home";
import LoopIcon from "@material-ui/icons/Loop";
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
        <Link component={RouterLink} to="/">
          <Button color="primary">Home</Button>
        </Link>
        <Link component={RouterLink} to="/films">
          <Button color="primary">Films</Button>
        </Link>
        <Link component={RouterLink} to="/characters">
          <Button color="primary">Characters</Button>
        </Link>
        {isFetching > 0 && <LoopIcon className={classes.rotatingIcon} />}
      </nav>
      <main className={classes.main}>
        <Switch>
          <Route exact path="/films">
            <Films />
          </Route>
          <Route exact path="/films/:filmId">
            <Film />
          </Route>
          <Route exact path="/characters">
            <Characters />
          </Route>
          <Route exact path="/characters/:characterId">
            <Character />
          </Route>
          <Route path="/">
            <Home />
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
