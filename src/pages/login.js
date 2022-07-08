import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { api } from '../utils';

export default function Login() {

  const [email, setEmail] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [message, setMessage] = useState(null);

  const handle = {
    login: async e => {
      const resp = await fetch(api.login,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: pwd
        })
      });
      const json = await resp.json();
      setMessage(json);
    },

    changeValue: e => {
      const {value, name} = e.target;
      if(name === 'email') {
        setEmail(value);
      } else {
        setPwd(value);
      }
    }
  };

  return (
    <div>

      {/*{JSON.stringify(message)}*/}

      <h1 className={`item`}>LOGIN IN</h1>

      <Input
        className={`item`}
        placeholder="input email"
        value={email}
        name={`email`}
        onChange={handle.changeValue}
      />

      <Input.Password
        className={`item`}
        placeholder="input password"
        value={pwd}
        name={`password`}
        onChange={handle.changeValue}
      />

      <Button
        onClick={handle.login}
        className={`item`}
        type="primary">
        Submit
      </Button>

      <style>{`
      .item{
      margin-bottom: 10px;
      }
    `}</style>

    </div>
  )
}