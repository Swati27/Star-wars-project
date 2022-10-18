import { CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { Link } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import  PersonCard  from "./customComponents/PersonCard";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import  fetchJson  from '../api/fetchData';
import { useQuery } from "react-query";
import { useState } from "react";

export default function Characters(props) {
  const { status, data } = useQuery("characters", () =>
  fetchJson(`https://swapi.dev/api/people/`)
  );

  const [people, setPeople] =useState([]);

  if (status === "loading") return <CircularProgress/>;
  if (status === "error") return <p>Error :(</p>;
  
  const handleChange=(e)=> {
    const input= e.target.value;
    if(input!=='')
    {
    let filterResult= data?.results.filter((filter,i)=> filter.name.toLowerCase().startsWith(input.toLowerCase()));
    setPeople(filterResult);
    console.log(people);
    }
     else
     setPeople(data?.results);
  }

  const displayCharacters=(characterList)=>{
    return characterList && characterList.map((person) => {
      const personUrlParts = person.url.split("/").filter(Boolean);
      const personId = personUrlParts[personUrlParts.length - 1];
      return (
        <article key={personId} style={{ margin: "16px 0 0" }}>
          <Link component={RouterLink} to={`/characters/${personId}`}>
            <PersonCard person={person}></PersonCard>
          </Link>
        </article>
      );
    })
  }

  return (
    <div>
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
       <InputBase id="searchbar" onKeyUp={handleChange} name="searchtxt" type="text" 
        placeholder="Search a Character.." sx={{ ml: 1, flex: 1 }}/>
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon/>
      </IconButton>
      </Paper>
        {people.length>=1 ? displayCharacters(people): displayCharacters(data?.results)}
    </div>
  );
}
