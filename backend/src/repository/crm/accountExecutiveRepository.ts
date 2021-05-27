import AccountExecutive  from "../../models/crm/accountExecutive";
import { getRepository } from "typeorm";

const findById = async function findById(id: string): Promise<AccountExecutive> {
  const AccountExecutiveRepository = getRepository(AccountExecutive);

  const item: AccountExecutive = await AccountExecutiveRepository.findOneOrFail({ id: id });

  return item;
};

const findAll = async function findAll(): Promise<AccountExecutive[]> {
  const AccountExecutiveRepository = getRepository(AccountExecutive);

  const AccountExecutives: AccountExecutive[] = await AccountExecutiveRepository.find({
    order: {
      name: "ASC",
      id: "DESC",
    },
  });

  return AccountExecutives;
};

const findByName = async function findByName(name: string): Promise<AccountExecutive> {
  const AccountExecutiveRepository = getRepository(AccountExecutive);

  const item: AccountExecutive = await AccountExecutiveRepository.findOneOrFail({ name: name });

  return item;
};

const create = async function create(
  item: AccountExecutive,
): Promise<AccountExecutive> {
  const AccountExecutiveRepository = getRepository(AccountExecutive);

  await AccountExecutiveRepository.save(item);

  return item;
};

export default {
  create,
  findById,
  findAll,
  findByName,
};
