import { Request, Response } from "express";
import stageService from "../../services/crm/stage";
import stage from "../../models/crm/stage";

export const get_all_stages = async (
  request: Request,
  response: Response,
) => {
  const stage = await stageService.getAll();
  return response.status(200).json(stage);
};

export const get_stage = async (request: Request, response: Response) => {
  const { id } = request.params;

  const stage = await stageService.getById(id);

  if (stage) {
    return response.status(200).json(stage);
  }
  return response.status(404).json(
    { msg: "no stage with that phoneNumber" },
  );
};

export const create_stage = async (request: Request, response: Response) => {
  const {
    id,
    name,
    description,
    colorHex,
    createdAt
  } = await request.body;

  try {
    let stage: stage = {
      id,
      name,
      description,
      colorHex,
      createdAt
    };

    stage = await stageService.create(stage);

    return response.status(200).json(stage);
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a stage with that i", error: e },
    );
  }
};

export const delete_stage = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await stageervice.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
      { msg: "error to create a order with that i" },
    );
  }
};
