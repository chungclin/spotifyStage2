
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
          Event.create({
            name: 'Buy Meat',
            description: 'Go to the market',
            startTime: '12:30',
            endTime: '14:30',
            dayId: 29
          })
        });
  
        it('User can add event with api/months/:monthid/day/:dayid/events,  getting a 201 response on success', () => {
          return request(app)
            .post(`/api/months/1/day/29/events`)
            .send({ monthId: 1, dayId: 29 })
            .expect(201)
            .then(res => {
              expect(res.body.name).to.equal('Buy Meat');
            });
        });
        
    // End Month Post Routes

      describe('order PUT and Delete routes', () => {
        beforeEach(async function() {
          await seed();
          Event.create({
            name: 'Buy Meat',
            description: 'Go to the supermarket!!!',
            startTime: '12:30',
            endTime: '14:30',
            dayId: 29,
            id: 2
          })
        });
  
        it('User can update an event PUT api/months/:monthid/day/:dayid/events/:eventsid, getting a 200 response on success', () => {
          return request(app)
            .put(`/api/months/1/days/29/events/1`)
            .send({ monthId: 1, dayId: 29 })
            .expect(200)
            .then(event => {
              expect(event.id).to.equal(2);
            });
        });
  
        it('User can delete a event with DELETE api/months/:monthid/day/:dayid/events/:eventid, getting a 204 response on success', () => {
          return request(app)
            .delete(`/api/months/1/day/29/events/2`)
            .send({ id: 2 })
            .expect(204)
            .then(deleted => {
              expect(deleted.id).to.equal(null);
            });
        });
      });
    }); 
  }); 