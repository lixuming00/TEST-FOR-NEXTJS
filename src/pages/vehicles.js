import React from 'react';
import {getResource, api} from '../utils';

export default function Vehicles({data}) {

  return (
    <div>
      <h1>all vehicles page</h1>
      {JSON.stringify(data)}
    </div>
  )
}

Vehicles.getInitialProps = async function (ctx) {
  const data = await getResource(api.vehicles, ctx);
  return {data}
};

