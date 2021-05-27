import Opportunity  from "../../models/crm/opportunity";
import { getRepository } from "typeorm";

const findById = async function findById(id: string): Promise<Opportunity> {
  const OpportunityRepository = getRepository(Opportunity);

  const item: Opportunity = await OpportunityRepository.findOneOrFail({ id: id });

  return item;
};

const findAll = async function findAll(): Promise<Opportunity[]> {
  const OpportunityRepository = getRepository(Opportunity);

  const Opportunitys: Opportunity[] = await OpportunityRepository.find({
    order: {
      name: "ASC",
      id: "DESC",
    },
  });

  return Opportunitys;
};

const findByName = async function findByName(name: string): Promise<Opportunity> {
  const OpportunityRepository = getRepository(Opportunity);

  const item: Opportunity = await OpportunityRepository.findOneOrFail({ name: name });

  return item;
};

const create = async function create(
  item: Opportunity,
): Promise<Opportunity> {
  const OpportunityRepository = getRepository(Opportunity);

  await OpportunityRepository.save(item);

  return item;
};

export default {
  create,
  findById,
  findAll,
  findByName,
};
