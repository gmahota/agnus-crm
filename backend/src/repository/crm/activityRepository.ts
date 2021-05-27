import Activity  from "../../models/crm/activity";
import { getRepository } from "typeorm";

const findById = async function findById(id: string): Promise<Activity> {
  const ActivityRepository = getRepository(Activity);

  const item: Activity = await ActivityRepository.findOneOrFail({ id: id });

  return item;
};

const findAll = async function findAll(): Promise<Activity[]> {
  const ActivityRepository = getRepository(Activity);

  const Activitys: Activity[] = await ActivityRepository.find({
    order: {
      name: "ASC",
      id: "DESC",
    },
  });

  return Activitys;
};

const findByName = async function findByName(name: string): Promise<Activity> {
  const ActivityRepository = getRepository(Activity);

  const item: Activity = await ActivityRepository.findOneOrFail({ name: name });

  return item;
};

const create = async function create(
  item: Activity,
): Promise<Activity> {
  const ActivityRepository = getRepository(Activity);

  await ActivityRepository.save(item);

  return item;
};

export default {
  create,
  findById,
  findAll,
  findByName,
};
