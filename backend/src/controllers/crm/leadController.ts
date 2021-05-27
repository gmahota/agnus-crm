import { Request, Response } from "express";
import leadService from "../../services/crm/lead";
import lead from "../../models/crm/lead";

export const get_all_leads = async (
  request: Request,
  response: Response,
) => {
  const lead = await leadService.getAll();
  return response.status(200).json(lead);
};

export const get_lead = async (request: Request, response: Response) => {
  const { id } = request.params;

  const lead = await leadService.getById(id);

  if (lead) {
    return response.status(200).json(lead);
  }
  return response.status(404).json(
    { msg: "no lead with that phoneNumber" },
  );
};

export const create_lead = async (request: Request, response: Response) => {
  const {
    id,
    name,
    description,
    street1,
    street2,
    city,
    province,
    country,
    isQualified,
    isConverted,
    channel,
    customer,
    accountExecutive,
    leadlines,
    createdAt
  } = await request.body;

  try {
    let lead: lead = {
      id,
      name,
      description,
      street1,
      street2,
      city,
      province,
      country,
      isQualified,
      isConverted,
      channel,
      customer,
      accountExecutive,
      leadlines,
      createdAt
    };

    lead = await leadService.create(lead);

    return response.status(200).json(lead);
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a lead with that i", error: e },
    );
  }
};

export const delete_lead = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await leadervice.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
      { msg: "error to create a order with that i" },
    );
  }
};
