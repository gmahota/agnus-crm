import { Request, Response } from "express";
import opportunityService from "../../services/crm/opportunity";
import opportunity from "../../models/crm/opportunity";

export const get_all_opportunities = async (
  request: Request,
  response: Response,
) => {
  const opportunity = await opportunityService.getAll();
  return response.status(200).json(opportunity);
};

export const get_opportunity = async (request: Request, response: Response) => {
  const { id } = request.params;

  const opportunity = await opportunityService.getById(id);

  if (opportunity) {
    return response.status(200).json(opportunity);
  }
  return response.status(404).json(
    { msg: "no opportunity with that phoneNumber" },
  );
};

export const create_opportunity = async (request: Request, response: Response) => {
  const {
    id,
    name,
    description,
    stage,
    accountExecutive,
    customer,
    estimatedRevenue,
    estimatedClosingDate,
    probability,
    ratingID,
    createdAt
  } = await request.body;

  try {
    let opportunity: opportunity = {
      id,
      name,
      description,
      stage,
      accountExecutive,
      customer,
      estimatedRevenue,
      estimatedClosingDate,
      probability,
      ratingID,
      createdAt
    };

    opportunity = await opportunityService.create(opportunity);

    return response.status(200).json(opportunity);
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a opportunity with that i", error: e },
    );
  }
};

export const delete_opportunity = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await opportunityervice.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
      { msg: "error to create a order with that i" },
    );
  }
};
