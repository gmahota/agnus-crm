
import Channel  from '../../models/crm/channel'
import ChannelRepository  from '../../repository/crm/channelRepository'


const getById = (id:string) =>
    ChannelRepository.findById(id)

const getAll = () =>
    ChannelRepository.findAll()


const create = (Channel:Channel) =>
  ChannelRepository.create(Channel)

const getByName= (name:string) =>
    ChannelRepository.findByName(name)


export default {
  getAll,
  getById,
  create,
  getByName
}