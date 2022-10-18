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
import  fetchJson  from '../api/fetchData';
import { useQuery } from "react-query";
import { withRouter } from "react-router";

function Character(props) {
  const characterId = props.match.params.characterId;
  const { status, data } = useQuery(`character-${characterId}`, () =>
  fetchJson(`https://swapi.dev/api/people/${characterId}/`)
  );

  if (status === "loading") return <Skeleton variant="text"/>;
  if (status === "error") return <p>Error :(</p>;

  if (status !== "success") {
    return null;
  }
  return (
    <div>
      <Typography variant="h4" >{data.name}</Typography>
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
              <TableCell>{getList(data,'films')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Species</TableCell>
              <TableCell>{getList(data,'species')}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function getList(data, flag) {
   const dataList= (flag==='films') ? data?.films : data?.species;
   return dataList.map((field) => {
    const fieldUrlParts = field.split("/").filter(Boolean);
    const fieldId = fieldUrlParts[fieldUrlParts.length - 1];
    return <FetchList id={fieldId} key={`Film-${fieldId}` } flag={flag}/>;
  })
}

function FetchList(props) {
  const { id, flag } = props;
  const { data, status } = useQuery(`${flag}-${id}`, () =>
    fetchJson(`https://swapi.dev/api/${flag}/${id}/`)
  );
  if (status === "loading") return <Skeleton variant="text"/>;
  if (status === "error") return <p>Error :(</p>;
  return (
        <div>
          {flag==='films'? data.title: data?.name}
        </div>
  );
}



export default withRouter(Character);
