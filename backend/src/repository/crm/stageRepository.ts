import Stage  from "../../models/crm/stage";
import { getRepository } from "typeorm";

const findById = async function findById(id: string): Promise<Stage> {
  const StageRepository = getRepository(Stage);

  const item: Stage = await StageRepository.findOneOrFail({ id: id });

  return item;
};

const findAll = async function findAll(): Promise<Stage[]> {
  const StageRepository = getRepository(Stage);

  const Stages: Stage[] = await StageRepository.find({
    order: {
      name: "ASC",
      id: "DESC",
    },
  });

  return Stages;
};

const findByName = async function findByName(name: string): Promise<Stage> {
  const StageRepository = getRepository(Stage);

  const item: Stage = await StageRepository.findOneOrFail({ name: name });

  return item;
};

const create = async function create(
  item: Stage,
): Promise<Stage> {
  const StageRepository = getRepository(Stage);

  await StageRepository.save(item);

  return item;
};

export default {
  create,
  findById,
  findAll,
  findByName,
};
