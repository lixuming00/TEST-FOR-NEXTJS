import Router from "next/router";

export const getResource = async (url, ctx) => {
  const cookie = ctx.req?.headers.cookie;
  const resp = await fetch(url,{
    headers: {
      cookie: cookie
    }
  });

  if(resp.status === 401 && !ctx.req) {
    await Router.replace('/login');
    return {};
  }

  if(resp.status === 401 && ctx.req) {
    ctx.res?.writeHead(302,{
      location: 'http://localhost:3000/login'
    });
    ctx.res?.end();
    return;
  }

  const data = await resp.json();
  return data;
};