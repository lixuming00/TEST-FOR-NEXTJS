import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { api } from '../utils';

export default function SignUp() {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [message, setMessage] = useState();

  const handle = {
    signUp: async (e) => {
      const resp = await fetch(api.signUp,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: pwd
        })
      });
      const json = await resp.json();
      setMessage(json);
    },

    changeValue: async (e) => {
      const {value, name} = e.target;
      switch (name) {
        case 'name':
          return setName(value);
        case 'email':
          return setEmail(value);
        case 'password':
          return setPwd(value);
        default:
          return null;
      }
    }
  };

  return (
    <div>

      {JSON.stringify(message)}

      <h1 className={`item`}>SIGN UP</h1>

      <Input
        className={`item`}
        placeholder="input name"
        value={name}
        name={`name`}
        onChange={handle.changeValue}
      />

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
        onClick={handle.signUp}
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