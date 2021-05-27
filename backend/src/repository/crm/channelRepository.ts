import Channel  from "../../models/crm/channel";
import { getRepository } from "typeorm";

const findById = async function findById(id: string): Promise<Channel> {
  const ChannelRepository = getRepository(Channel);

  const item: Channel = await ChannelRepository.findOneOrFail({ id: id });

  return item;
};

const findAll = async function findAll(): Promise<Channel[]> {
  const ChannelRepository = getRepository(Channel);

  const Channels: Channel[] = await ChannelRepository.find({
    order: {
      name: "ASC",
      id: "DESC",
    },
  });

  return Channels;
};

const findByName = async function findByName(name: string): Promise<Channel> {
  const ChannelRepository = getRepository(Channel);

  const item: Channel = await ChannelRepository.findOneOrFail({ name: name });

  return item;
};

const create = async function create(
  item: Channel,
): Promise<Channel> {
  const ChannelRepository = getRepository(Channel);

  await ChannelRepository.save(item);

  return item;
};

export default {
  create,
  findById,
  findAll,
  findByName,
};
