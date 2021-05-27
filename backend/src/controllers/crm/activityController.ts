import { Request, Response } from "express";
import activityService from "../../services/crm/activity";
import activity from "../../models/crm/activity";

export const get_all_activities = async (
  request: Request,
  response: Response,
) => {
  const activity = await activityService.getAll();
  return response.status(200).json(activity);
};

export const get_activity = async (request: Request, response: Response) => {
  const { id } = request.params;

  const activity = await activityService.getById(id);

  if (activity) {
    return response.status(200).json(activity);
  }
  return response.status(404).json(
    { msg: "no activity with that phoneNumber" },
  );
};

export const create_activity = async (request: Request, response: Response) => {
  const {
    id,
    name,
    createdAt,
    description,
    colorHex,
    leadlines
  } = await request.body;

  try {
    let activity: activity = {
      id,
      name,
      createdAt,
      description,
      colorHex,
      leadlines
    };

    activity = await activityService.create(activity);

    return response.status(200).json(activity);
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a activity with that i", error: e },
    );
  }
};

export const delete_activity = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await activityervice.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
      { msg: "error to create a order with that i" },
    );
  }
};
