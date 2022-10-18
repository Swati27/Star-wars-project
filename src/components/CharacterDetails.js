import { CircularProgress } from '@mui/material';
import  FetchList  from "./FilmsSpeciesList/FetchList";
import PersonTable from "./customComponents/PersonTable";
import React from "react";
import  fetchJson  from '../api/fetchData';
import { useQuery } from "react-query";
import { withRouter } from "react-router";

function Character(props) {
  const characterId = props.match.params.characterId;
  const { status, data } = useQuery(`character-${characterId}`, () =>
  fetchJson(`https://swapi.dev/api/people/${characterId}/`)
  );

  if (status === "loading") return <CircularProgress />;
  if (status === "error") return <p>Error :(</p>;

  const getList=(data, flag) => {
    const dataList= (flag==='films') ? data?.films : data?.species;
    return dataList.map((field) => {
     const fieldUrlParts = field.split("/").filter(Boolean);
     const fieldId = fieldUrlParts[fieldUrlParts.length - 1];
     return <FetchList id={fieldId} key={`Film-${fieldId}` } flag={flag}/>;
   })
 }

  return (
   <PersonTable data={data} getList={getList}/>
  );
}


export default withRouter(Character);
