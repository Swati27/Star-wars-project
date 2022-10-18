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

import React from 'react';

function PersonTable({data, getList}) {
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
  )
}

export default PersonTable