import React from 'react';
import {getResource, api} from '../utils';

export default function Persons({data}) {

  return (
    <div>
      <h1>all persons page</h1>
      {JSON.stringify(data)}
    </div>
  )
}

Persons.getInitialProps = async function (ctx) {
  const data = await getResource(api.persons, ctx);
  return {data}
};

