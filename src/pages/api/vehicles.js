import sqlite from 'sqlite';

export default async function getAllVehicles(req,res) {

  const db = await sqlite.open('./mydb.sqlite');
  const vehicles = await db.all('SELECT * FROM Vehicle');

  res.json(vehicles)
}

