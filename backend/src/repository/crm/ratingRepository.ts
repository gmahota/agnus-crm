import Rating  from "../../models/crm/rating";
import { getRepository } from "typeorm";

const findById = async function findById(id: string): Promise<Rating> {
  const RatingRepository = getRepository(Rating);

  const item: Rating = await RatingRepository.findOneOrFail({ id: id });

  return item;
};

const findAll = async function findAll(): Promise<Rating[]> {
  const RatingRepository = getRepository(Rating);

  const Ratings: Rating[] = await RatingRepository.find({
    order: {
      name: "ASC",
      id: "DESC",
    },
  });

  return Ratings;
};

const findByName = async function findByName(name: string): Promise<Rating> {
  const RatingRepository = getRepository(Rating);

  const item: Rating = await RatingRepository.findOneOrFail({ name: name });

  return item;
};

const create = async function create(
  item: Rating,
): Promise<Rating> {
  const RatingRepository = getRepository(Rating);

  await RatingRepository.save(item);

  return item;
};

export default {
  create,
  findById,
  findAll,
  findByName,
};
