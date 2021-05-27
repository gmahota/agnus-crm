import { Request, Response } from "express";
import accountExecutiveService from "../../services/crm/accountExecutive";
import accountExecutive from "../../models/crm/accountExecutive";

export const get_all_accountExecutives = async (
  request: Request,
  response: Response,
) => {
  const accountExecutive = await accountExecutiveService.getAll();
  return response.status(200).json(accountExecutive);
};

export const get_accountExecutive = async (request: Request, response: Response) => {
  const { id } = request.params;

  const accountExecutive = await accountExecutiveService.getById(id);

  if (accountExecutive) {
    return response.status(200).json(accountExecutive);
  }
  return response.status(404).json(
    { msg: "no accountExecutive with that phoneNumber" },
  );
};

export const create_accountExecutive = async (request: Request, response: Response) => {
  const {
    id,
    name,
    description,
    phone,
    email,
    street1,
    street2,
    city,
    province,
    country,
    systemUserID,
    createdAt
  } = await request.body;

  try {
    let accountExecutive: accountExecutive = {
      id,
      name,
      description,
      phone,
      email,
      street1,
      street2,
      city,
      province,
      country,
      systemUserID,
      createdAt
    };

    accountExecutive = await accountExecutiveService.create(accountExecutive);

    return response.status(200).json(accountExecutive);
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a accountExecutive with that i", error: e },
    );
  }
};

export const delete_accountExecutive = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await accountExecutiveervice.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
      { msg: "error to create a order with that i" },
    );
  }
};
