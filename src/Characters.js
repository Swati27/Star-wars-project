import { Link, Typography } from "@material-ui/core";

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import fetch from "./fetch";
import { useQuery } from "react-query";

export default function Characters(props) {
  const { status, data } = useQuery("characters", () =>
    fetch(`https://swapi.dev/api/people/`)
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  return (
    <div>
      <Typography variant="h2">Characters</Typography>
      {data.results.map((person) => {
        const personUrlParts = person.url.split("/").filter(Boolean);
        const personId = personUrlParts[personUrlParts.length - 1];
        return (
          <article key={personId} style={{ margin: "16px 0 0" }}>
            <Link component={RouterLink} to={`/characters/${personId}`}>
              <Typography variant="h6">{person.name}</Typography>
            </Link>
          </article>
        );
      })}
    </div>
  );
}