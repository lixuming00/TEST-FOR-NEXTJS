import sqlite from 'sqlite';
import { hash } from 'bcrypt';

export default async function signUp(req, res) {
  const db = await sqlite.open('./mydb.sqlite');

  if(req.method === 'POST') {

    /*
    * params1 用户发来的密码
    * params2 轮数
    * params3 执行的方法
    * */
    // 用hash算法对用户发来的密码进行处理
    hash(req.body.password, 10, async function(err, hash) {
      // Store hash in your password DB.
      const statement = await db.prepare(
        'INSERT INTO Person (name, email, password) values (?, ?, ?)'
      );

      const result = await statement.run(
        req.body.name,
        req.body.email,
        hash
      );
      result.finalize();

      const person = await db.all('SELECT * FROM Person');
      res.status(200).json({
        code: 0,
        message: 'success',
        content:person
      });
    });
  } else {
    res.status(401).json({
      message: 'Failed, only support POST'
    })
  }
}