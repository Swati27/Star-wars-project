import { Link, Typography } from "@material-ui/core";

import { CircularProgress } from '@mui/material';
import  PersonCard  from "./PersonCard";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import  fetchJson  from '../api/fetchData';
import { useQuery } from "react-query";
import { useState } from "react";

export default function Characters(props) {
  const { status, data } = useQuery("characters", () =>
  fetchJson(`https://swapi.dev/api/people/`)
  );

  // const [searchval, setSearchval]= useState();
  // const [people, setPeople] =useState([data?.results]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  // function handleChange(e) {
  //   const input= e.target.value;
  //   if(input!=='')
  //   {
  //   let filterResult= people.filter((filter,i)=> filter.name.toLowerCase().startsWith(input.toLowerCase()));
  //   setPeople(filterResult);
  //   }
  //   else
  //   setPeople(searchval);
  // }

  return (
    <div>
      {data?.results.map((person) => {
        const personUrlParts = person.url.split("/").filter(Boolean);
        const personId = personUrlParts[personUrlParts.length - 1];
        return (
          <article key={personId} style={{ margin: "16px 0 0" }}>
            <Link component={RouterLink} to={`/characters/${personId}`}>
              <PersonCard person={person}></PersonCard>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
