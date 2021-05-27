import Lead  from "../../models/crm/lead";
import { getRepository } from "typeorm";

const findById = async function findById(id: string): Promise<Lead> {
  const LeadRepository = getRepository(Lead);

  const item: Lead = await LeadRepository.findOneOrFail({ id: id });

  return item;
};

const findAll = async function findAll(): Promise<Lead[]> {
  const LeadRepository = getRepository(Lead);

  const Leads: Lead[] = await LeadRepository.find({
    order: {
      name: "ASC",
      id: "DESC",
    },
  });

  return Leads;
};

const findByName = async function findByName(name: string): Promise<Lead> {
  const LeadRepository = getRepository(Lead);

  const item: Lead = await LeadRepository.findOneOrFail({ name: name });

  return item;
};

const create = async function create(
  item: Lead,
): Promise<Lead> {
  const LeadRepository = getRepository(Lead);

  await LeadRepository.save(item);

  return item;
};

export default {
  create,
  findById,
  findAll,
  findByName,
};
