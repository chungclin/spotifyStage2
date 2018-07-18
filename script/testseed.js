const db = require('../server/db');
const { Month, Day, Event } = require('../CalendarBackend/models')
const bluebird = require('bluebird');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');


  //create Seed for day
  const day = await Promise.all([
    Day.create({
      dayOfMonth: 29,
      monthId: 1
    })
  ]);

  console.log(`seeded ${day.length} day`);
  console.log(`seeded day successfully`);

  //create Seed for Month
  const month = await Promise.all([
    Month.create({ Month: 'January', id: 1 })
  ]);

  console.log(`seeded ${month.length} month`);
  console.log(`seeded month successfully`);

    //create Seed for Events
  const event = await Promise.all([
    Event.create({
      name: 'Buy Vegetables',
      description: 'Go to stop and shop',
      startTime: '11:30',
      endTime: '12:30',
      dayId: 29
    })
  ]);


  console.log(`seeded ${Events.length} events`);
  console.log(`seeded event successfully`);
}

module.exports = seed;
