
const { expect } = require('chai');
const request = require('supertest');
const db = require('../models')
const app = require('./index');
const seed = require('../script/testseed');

describe('Order routes', () => {
    after(async function() {
      await db.sync({ force: true });
    });
  
    describe('/api/months/', () => {
      describe('month GET routes', () => {
        before(async function() {
          await seed();
        });
  
        after(async function() {
          await db.sync({ force: true });
        });
  
        it('GET /api/months/1 returns the correct month', () => {
          return request(app)
            .get('/api/months/1')
            .send({ monthId: 1 })
            .expect(200)
            .then(res => {
              const month = res.body;
              expect(month.id).to.be.equal(1);
            });
        });
  
     // End Month Get Routes
  
      describe('POST', () => {
        beforeEach(async function() {
          await seed();
          Trip.create({
            planetName: 'Jupiter',
            moonName: 'Io',
            price: 1800,
            startDate: '2017-08-09 04:05:02',
            numberOfNights: 4,
            description: 'One Way Trip',
            imagePath:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/225px-Io_highest_resolution_true_color.jpg'
          });
        });
  
        // A user can add a new order
        // Takes trip info, userId, Adds to order.
        it('User can add an item to an order with POST api/users/{{usersId}}/orders,  getting a 201 response on success', () => {
          return request(app)
            .post(`/api/users/1/orders`)
            .send({ userId: 1, tripId: 2 })
            .expect(201)
            .then(res => {
              expect(res.body.moonName).to.equal('Io');
            });
        });
  
        // Can add a trip with more than the default number of guests
        it('User can add an item to an order with POST api/users/{{usersId}}/orders,  getting a 201 response on success', () => {
          return request(app)
            .post(`/api/users/1/orders`)
            .send({ tripId: 2, numberOfGuests: 15 })
            .expect(201)
            .then(() => Order.findById(1, { include: [Trip] }))
            .then(order => {
              expect(order.trips.length).to.equal(2);
            });
        });
      }); // End POST Routes
      describe('POST', () => {
        beforeEach(async function() {
          await seed();
          await Trip.create({
            planetName: 'Jupiter',
            moonName: 'Io',
            price: 1800,
            startDate: '2017-08-09 04:05:02',
            numberOfNights: 4,
            description: 'One Way Trip',
            imagePath:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/225px-Io_highest_resolution_true_color.jpg'
          });
          await request(app)
            .post(`/api/users/1/orders`)
            .send({ userId: 2, tripId: 2 });
          console.log('Finished');
        });
  
        it('Returns an error if posting a trip already on the order with POST api/users/{{usersId}}/orders', () => {
          return request(app)
            .post(`/api/users/1/orders`)
            .send({ userId: 1, tripId: 2, numberOfGuests: 77 })
            .expect(500);
        });
      }); // End POST Routes
  
      describe('order PUT and Delete routes', () => {
        beforeEach(async function() {
          await seed();
        });
  
        it('User can update number of guests on a trip with PUT api/users/{{usersId}}/orders, getting a 200 response on success', () => {
          return request(app)
            .put(`/api/users/1/orders`)
            .send({ tripId: 1, numberOfGuests: 15 })
            .expect(200)
            .then(() => Order.findById(1, { include: [Trip] }))
            .then(order => {
              expect(order.trips[0].tripOrder.numberOfGuests).to.equal(15);
            });
        });
  
        it('User can delete a trip with DELETE api/users/{{usersId}}/orders, getting a 204 response on success', () => {
          return request(app)
            .delete(`/api/users/1/orders`)
            .send({ tripId: 1 })
            .expect(204)
            .then(() => Order.findById(1, { include: [Trip] }))
            .then(order => {
              expect(order.trips.length).to.equal(0);
            });
        });
      });
    }); // end describe('/api/orders')
  }); // end describe('Order routes')
  