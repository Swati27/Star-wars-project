import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import React from "react";
import { Skeleton } from '@mui/material';
import fetch from "./fetch";
import { useQuery } from "react-query";
import { withRouter } from "react-router";

function Character(props) {
  const characterId = props.match.params.characterId;
  const { status, error, data } = useQuery(`character-${characterId}`, () =>
    fetch(`https://swapi.dev/api/people/${characterId}/`)
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  console.info({ data, status, error });

  if (status !== "success") {
    return null;
  }
  return (
    <div>
      <Typography variant="h2">{data.name}</Typography>
      <TableContainer component={Paper} style={{ maxWidth: "400px" }}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Feature</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Born</TableCell>
              <TableCell>{data.birth_year}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Eyes</TableCell>
              <TableCell>{data.eye_color}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hair</TableCell>
              <TableCell>{data.hair_color}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Height</TableCell>
              <TableCell>{data.height}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mass</TableCell>
              <TableCell>{data.mass}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Films</TableCell>
              <TableCell>{Filmss(data)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function Filmss(data) {
   return data.films.map((film) => {
    const filmUrlParts = film.split("/").filter(Boolean);
    const filmId = filmUrlParts[filmUrlParts.length - 1];
    return <Film id={filmId} key={`Film-${filmId}`} />;
  })
}

function Film(props) {
  const { id } = props;
  const { data, status } = useQuery(`film-${id}`, () =>
    fetch(`https://swapi.dev/api/films/${id}/`)
  );

  if (status === "loading") return <Skeleton variant="text"/>;
  if (status === "error") return <p>Error :(</p>;

  return (
        <div>
          {data.title}
        </div>
  );
}



export default withRouter(Character);
