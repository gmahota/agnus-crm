
import Lead  from '../../models/crm/Lead'
import LeadRepository  from '../../repository/crm/LeadRepository'


const getById = (id:string) =>
    LeadRepository.findById(id)

const getAll = () =>
    LeadRepository.findAll()


const create = (Lead:Lead) =>
  LeadRepository.create(Lead)

const getByName= (name:string) =>
    LeadRepository.findByName(name)


export default {
  getAll,
  getById,
  create,
  getByName
}