import { Link, Typography } from "@material-ui/core";

import InputBase from '@mui/material/InputBase'
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Skeleton } from '@mui/material';
import fetch from "./fetch";
import { fetchJson } from '../src/api';
import { useQuery } from "react-query";
import { useState } from "react";

export default function Characters(props) {
  // const { status, data } = useQuery("characters", () =>
  //   fetch(`https://swapi.dev/api/people/`)
  // );

  const [searchval, setSearchval]= useState('');
  const [people, setPeople] =useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    fetchJson('people')
    .then(peopleResponse => {
      setIsLoaded(true);
      setPeople(peopleResponse.results);
      setSearchval(peopleResponse.results);
      setIsLoaded(false);
  })
  }, []);


   
    // if (isLoaded === "true") return <p>Loading...</p>;
  // if (status === "error") return <p>Error :(</p>;

  function handleChange(e) {
    const input= e.target.value;
    if(input!='')
    {
    let filterResult= people.filter((filter,i)=> filter.name.toLowerCase().startsWith(input.toLowerCase()));
    setPeople(filterResult);
    }
    else
    setPeople(searchval);
  }
  
  // function handleSubmit(e) {
  //   //const input= e.target.value;
  //   e.preventDefault();
  //   //people.filter((filter,i)=> input?.toLowerCase()=== filter ? setPeople(filter): setPeople(''));
  // }

  return (
    <div>
    <input id="searchbar" onKeyUp={handleChange} placeholder = "Find a Character.." name="searchtxt" type="text" />
      {people.map((person) => {
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
