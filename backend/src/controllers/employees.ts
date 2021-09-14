import { Request, Response } from 'express';

import db from '../models';

function makeBarcode(length: number) {
  let result: string     = '';
  let characters         = '0123456789';
  const charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export async function getAllEmployees(req: Request, res: Response) {
  const employees = await db.Employee.findAll({
    where: {
      archived: false,
    }
  });

  res.json(employees);
}

export async function getArchivedEmployees(req: Request, res: Response) {
  const employees = await db.Employee.findAll({
    where: {
      archived: true,
    }
  });

  res.json(employees);
}

export async function getEmployee(req: Request, res: Response) {
  const employees = await db.Employee.findOne({
    where: {
      id: req.params.id,
    },
    include: db.Time,
  });

  if (employees == null) {
    res.status(404);
    res.json({
      error: 'Not found',
    });
    return;
  }

  res.json(employees);
}

export async function addEmployee(req: Request, res: Response) {
  try {
    const employee = await db.Employee.create({
      barcode: req.body.barcode,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    res.json(employee);
  } catch (err: any) {
    res.status(505);
    res.json({
      error: 'Error while inserting data in database',
    });
  }
}

export async function updateEmployee(req: Request, res: Response) {
  try {
    let employee = await db.Employee.findOne({
      where: {
        id: req.params.id,
      },
    });
    employee.barcode = req.body.barcode;
    employee.firstName = req.body.firstName,
    employee.lastName = req.body.lastName,

    employee = await employee.save();

    res.json(employee);
  } catch (err: any) {
    res.status(505);
    res.json({
      error: 'Error while updateing data in database',
    });
  }
}

export async function deleteEmployee(req: Request, res: Response) {
  try {
    let employee = await db.Employee.findOne({
      where: {
        id: req.params.id,
      },
    });
    employee.archived = true;

    employee = await employee.save();

    res.json(employee);
  } catch (err: any) {
    res.status(505);
    res.json({
      error: 'Error while updateing data in database',
    });
  }
}
