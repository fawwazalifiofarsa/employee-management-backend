import * as express from 'express';
import { findEmployees } from './database'; // Import the findEmployees function

export const employeeRouter = express.Router();
employeeRouter.use(express.json());

// Use the findEmployees function to retrieve employees
employeeRouter.get('/', async (req, res) => {
  try {
    const employees = await findEmployees({}); // Pass an empty filter for all employees
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// employeeRouter.get('/:id', async (req,res) => {
//     try {
//         const id = req?.params?.id;
//         const query = {_id: new mongodb.ObjectId(id)}
//         const employee = await employeesCollection.employees.findOne(query);

//         if (employee) {
//             res.status(200).send(employee)
//         } else {
//             res.status(404).send(`Failed to find an employee with ID: ${id}`)
//         }
//     } catch (error) {
//         res.status(404).send(`Failed to find an employee with ID: ${req?.params?.id}`)
//     }
// })

// employeeRouter.post('/', async (req,res) => {
//     try {
//         const employee = req.body;
//         const result = await employeesCollection.employees.insertOne(employee);

//         if (result.acknowledged) {
//             res.status(201).send(`Created a new employee with ID: ${result.insertedId}`)
//         } else {
//             res.status(500).send(`Failed to create new employee`)
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(400).send(error.message)
//     }
// })

// employeeRouter.put('/:id', async (req,res) => {
//     try {
//         const id = req?.params?.id;
//         const employee = req.body;
//         const query = {_id: new mongodb.ObjectId(id)}
//         const result = await employeesCollection.employees.updateOne(query, {$set: employee})

//         if (result && result.matchedCount) {
//             res.status(200).send(`Updated an employee with ID: ${id}`)
//         } else if (!result.matchedCount) {
//             res.status(404).send(`Failed to find an employee with ID: ${id}`)
//         } else {
//             res.status(304).send(`Failed to update an employee with ID: ${id}`)
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).send(error.message);
//     }
// })

// employeeRouter.delete('/:id', async (req,res) => {
//     try {
//         const id = req?.params?.id;
//         const query = {_id: new mongodb.ObjectId(id)}
//         const result = await employeesCollection.employees.deleteOne(query)

//         if (result && result.deletedCount) {
//             res.status(202).send(`Deleted an employee with ID: ${id}`)
//         } else if (!result) {
//             res.status(400).send(`Failed to delete an employee with ID: ${id}`)
//         } else {
//             res.status(404).send(`Failed to find an employee with ID: ${id}`)
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).send(error.message);
//     }
// })