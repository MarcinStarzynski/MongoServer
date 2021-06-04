const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw an error if there is no arguments', () => {
        const emp = new Employee({});

        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        });
    });

    it('should throw error if arguments have incorrect types', () => {

        const emp = new Employee({ firstName: {}, lastName: {}, department: [], salary: 'j3' });

        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
            expect(err.errors.salary).to.exist;
        }); 

    });

    it('should throw error if there are not all arguments', () => {

        const cases = [
            {lastName: 'Kovalsky', department: 'IT', salary: 2000},
            {firstName: 'John',  department: 'IT', salary: 2000},
            {firstName: 'John', lastName: 'Kovalsky', salary: 2000},
            { department: 'IT', salary: 2000}
        ];

        for(let employeeData of cases) {
            const emp = new Employee(employeeData);

            emp.validate(err => {
                expect(err.errors).to.exist;
            });
        };

    });

    it('should render properly if everything is ok', () => {

        const emp = new Employee({firstName: 'John', lastName: 'Kovalsky', department: 'IT', salary: 2000});

        emp.validate(err => {
            expect(err).to.not.exist;
        });

    });

    after(() => {
        mongoose.models = {};
    });
})