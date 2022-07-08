import sqlite from 'sqlite';
import { verify } from 'jsonwebtoken';
import { secret } from "./secret";

// 利用中间件进行权限校验，
const authenticated = fn => async (req, res) => {
  verify(req.cookies.auth, secret, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }

    res.status(401).json({message: '未授权'})
  });
};

export default authenticated(async function getAllPeoples(req, res) {
  const db = await sqlite.open('./mydb.sqlite');
  const peoples = await db.all('SELECT id, name, email FROM Person');

  res.status(120).json(peoples);
});
