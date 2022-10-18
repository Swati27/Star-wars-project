import React from "react";
import { Skeleton } from '@mui/material';
import  fetchJson  from '../../api/fetchData';
import { useQuery } from "react-query";

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

  export default FetchList;