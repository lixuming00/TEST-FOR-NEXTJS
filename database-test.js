const sqlite = require('sqlite');

async function setUp() {
  const db = await sqlite.open('./mydb.sqlite');
  await db.migrate({force: 'last'});

  const peoples = await db.all('SELECT * FROM person');
  console.log('all peoples', JSON.stringify(peoples, null, 2));

  const vehicles = await db.all('SELECT * FROM vehicle');
  console.log('all vehicles', JSON.stringify(vehicles, null, 2));

}

setUp();