import sqlite from 'sqlite';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {secret} from "./secret";
import cookie from 'cookie';

export default async function SignUp(req, res) {
  const db = await sqlite.open('./mydb.sqlite');

  if(req.method === 'POST') {

    // 根据email向数据库查询个人信息
    const person = await db.get('SELECT * FROM Person where email = ?', [req.body.email]);

    // 将用户发来的明文密码通过算法之后与数据库中进行比较
    compare(req.body.password, person.password, function(err, result) {

      // 如果无错误提示并且结果为真，视为验证通过
      if(!err && result) {

        const claims = {
          sub: person.id,
          myPersonEmail: person.email
        };

        const options = {
          expiresIn: '1h'
        };

        // 生成token令牌
        const jwt = sign(
          claims,
          secret,
          options
        );

        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
          httpOnly: true,
          // secure: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: '3600',
          path: '/'
        }));
        // 将token返回给前端
        // res.json({authToken: jwt});
        res.json({message: '欢迎回来'});

      } else {

        res.json({message:'login failed'});

      }
    });

  } else {

    res.status(405).json({
      message: 'Failed, only support POST',
      code: 405
    })
  }
}