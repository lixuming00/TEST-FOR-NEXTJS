import sqlite from 'sqlite';

export default async function getPeopleById(req, res) {

  const db = await sqlite.open('./mydb.sqlite');

  if (req.method === 'PUT') {
    const statement = await db.prepare(
      'UPDATE Person SET name = ?, email = ? where id = ?'
    );
    const result = await statement.run(
      req.body.name,
      req.body.email,
      req.query.id
    );
    result.finalize();
  }

  const people = await db.all('SELECT * FROM Person where id = ?', [req.query.id]);

  res.json(people);
}

