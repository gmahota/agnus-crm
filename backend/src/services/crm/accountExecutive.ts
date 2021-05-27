
import AccountExecutive from '../../models/crm/accountExecutive'
import AccountExecutiveRepository from '../../repository/crm/accountExecutiveRepository'


const getById = (id: string) =>
  AccountExecutiveRepository.findById(id)

const getAll = () =>
  AccountExecutiveRepository.findAll()


const create = (AccountExecutive: AccountExecutive) =>
  AccountExecutiveRepository.create(AccountExecutive)

const getByName = (name: string) =>
  AccountExecutiveRepository.findByName(name)


export default {
  getAll,
  getById,
  create,
  getByName
}