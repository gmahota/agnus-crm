import { Request, Response } from "express";
import channelService from "../../services/crm/channel";
import channel from "../../models/crm/channel";

export const get_all_channels = async (
  request: Request,
  response: Response,
) => {
  const channel = await channelService.getAll();
  return response.status(200).json(channel);
};

export const get_channel = async (request: Request, response: Response) => {
  const { id } = request.params;

  const channel = await channelService.getById(id);

  if (channel) {
    return response.status(200).json(channel);
  }
  return response.status(404).json(
    { msg: "no channel with that phoneNumber" },
  );
};

export const create_channel = async (request: Request, response: Response) => {
  const {
    id,
    name,
    createdAt,
    description,
    colorHex,
    leads
  } = await request.body;

  try {
    let channel: channel = {
      id,
      name,
      createdAt,
      description,
      colorHex,
      leads
    };

    channel = await channelService.create(channel);

    return response.status(200).json(channel);
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a channel with that i", error: e },
    );
  }
};

export const delete_channel = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await channelervice.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
      { msg: "error to create a order with that i" },
    );
  }
};
