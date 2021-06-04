const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {

    it('should throw an error if no "name" arg', () => {
        const dep = new Department({});

        dep.validate(err => {
            expect(err.errors.name).to.exist;
        });

    });

    it('should throw an error if "name" is not a string', () => {

        const cases = [{}, []];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validate(err => {
            expect(err.errors.name).to.exist;
          });
      
        }
      
    });

    it('should throw an error if "name" is longer than 20 or shorter than 5 letters', () => {

        const cases = ['abcd', 'konstantynopolitańczykowianeczka'];
        for(let name of cases) {
            const dep = new Department({ name });

            dep.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }

    });

    it('should render properly if everything is ok', () => {

        const cases = ['Marcin', 'Patryk'];
        for(let name of cases) {
            const dep = new Department({ name });

            dep.validate(err => {
                expect(err).to.not.exist;
            });
        }

    });

    after(() => {
        mongoose.models = {};
    });
});
