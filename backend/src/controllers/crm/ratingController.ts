import { Request, Response } from "express";
import ratingService from "../../services/crm/rating";
import rating from "../../models/crm/rating";

export const get_all_ratings = async (
  request: Request,
  response: Response,
) => {
  const rating = await ratingService.getAll();
  return response.status(200).json(rating);
};

export const get_rating = async (request: Request, response: Response) => {
  const { id } = request.params;

  const rating = await ratingService.getById(id);

  if (rating) {
    return response.status(200).json(rating);
  }
  return response.status(404).json(
    { msg: "no rating with that phoneNumber" },
  );
};

export const create_rating = async (request: Request, response: Response) => {
  const {
    id,
    name,
    description,
    colorHex,
    createdAt
  } = await request.body;

  try {
    let rating: rating = {
      id,
      name,
      description,
      colorHex,
      createdAt
    };

    rating = await ratingService.create(rating);

    return response.status(200).json(rating);
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a rating with that i", error: e },
    );
  }
};

export const delete_rating = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await ratingervice.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
      { msg: "error to create a order with that i" },
    );
  }
};
