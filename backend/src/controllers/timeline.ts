import { Request, Response } from 'express';

import db from '../models';

function sameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

export async function getAllTimes(req: Request, res: Response) {
  const times = await db.Time.findAll({
    where: {
      EmployeeId: req.params.employeeId,
    }
  });

  res.json(times);
}

export async function getTime(req: Request, res: Response) {
  const time = await db.Time.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (time == null) {
    res.status(404);
    res.json({
      error: 'Not found',
    });
    return;
  }

  res.json(time);
}

export async function registerTime(req: Request, res: Response) {
  try {
    const employee = await db.Employee.findOne({
      where: {
        barcode: req.body.barcode,
        archived: false,
      },
    });

    if (employee == null) {
      res.status(404);
      res.json({
        error: 'Not found user with requested barcode',
      });
      return;
    }

    let time = await db.Time.findOne({
      where: {
        EmployeeId: employee.id,
        open: true,
      },
    });

    if (time == null) {
      time = await db.Time.create({
        EmployeeId: employee.id,
        entry: new Date(),
        total: 0,
        open: true,
      });
    } else {
      if (sameDay(time.entry, new Date()))  {
        time.exit = new Date();
        time.total = Math.abs(time.exit - time.entry) / 36e5;
        time.open = false;

        time = await time.save();
      } else {
        time.exit = time.entry;
        time.open = false;
        time.total = 0;
        await time.save();

        time = await db.Time.create({
          EmployeeId: employee.Id,
          entry: new Date(),
          total: 0,
        });
      }
    }

    res.json(time);
  } catch (err: any) {
    console.log(err);
    res.status(505);
    res.json({
      error: 'Error while updateing data in database',
    });
  }
}

export async function updateTime(req: Request, res: Response) {
  try {
    let time = await db.Time.findOne({
      where: {
        id: req.params.id,
      },
    });
    time.entry = req.body.entry;
    time.exit = req.body.exit,
    time.total = Math.abs(time.exit - time.entry) / 36e5;
    time.open = req.body.open,

    time = await time.save();

    res.json(time);
  } catch (err: any) {
    res.status(505);
    res.json({
      error: 'Error while updateing data in database',
    });
  }
}
