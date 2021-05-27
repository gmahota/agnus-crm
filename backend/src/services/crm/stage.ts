
import Stage from '../../models/crm/stage'
import StageRepository from '../../repository/crm/stageRepository'


const getById = (id: string) =>
  StageRepository.findById(id)

const getAll = () =>
  StageRepository.findAll()


const create = (item: Stage) =>
  StageRepository.create(item)

const getByName = (name: string) =>
  StageRepository.findByName(name)


export default {
  getAll,
  getById,
  create,
  getByName
}