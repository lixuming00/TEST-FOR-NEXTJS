import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axios from "axios";

export default function Person({_data}) {
  const router = useRouter();
  const {query} = router;
  console.log('client_query',query)

  const ax_options = {
    method: 'GET',
    url: `http://localhost:4001/vehicles`,
    params: {
      ownerName: query.ownerName,
      vehicle: query.vehicle
    }
  };

  const [data,setData] = useState([_data]);
  useEffect(()=> {
    // console.log('_data.length',_data.length)
    // 如果服务端已经请求了数据，则不再执行客户端请求
    if(_data.length > 0) {
      return ;
    }
    (async ()=>{
      const resp = await axios(ax_options);
      const { data : _data1 } = resp;
      // console.log('_data1',_data1)
      setData(_data1);
    })()
  },[]);

  if(!data) {
    return <div>
      loading...
    </div>
  }

  return (
    <div>
      {/*<h1>since page</h1>*/}
      {/*<h1>{query.person}'s {query.vehicle}</h1>*/}

      <pre>
        {JSON.stringify(data,null,4)}
      </pre>
    </div>
  )
}

Person.getInitialProps = async (ctx) => {
  // 如果不是服务端获取的数据，则返回一个空数组
  if(!ctx.req){
    return {_data : []}
  }
  // 将[query] 从ctx中解构出来
  const { query } = ctx;
  console.log('query',query)
  // 将地址栏中获取到的内容作为请求的参数，进而达到过滤数据的目的
  const response = await fetch('http://localhost:4001/vehicles?ownerName='
    + query.person
    +'&vehicle='
    + query.country);
  const _data = await response.json();

  return {_data}
};