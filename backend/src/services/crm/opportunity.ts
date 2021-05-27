
import Opportunity  from '../../models/crm/opportunity'
import OpportunityRepository  from '../../repository/crm/opportunityRepository'


const getById = (id:string) =>
    OpportunityRepository.findById(id)

const getAll = () =>
    OpportunityRepository.findAll()


const create = (Opportunity:Opportunity) =>
  OpportunityRepository.create(Opportunity)

const getByName= (name:string) =>
    OpportunityRepository.findByName(name)


export default {
  getAll,
  getById,
  create,
  getByName
}