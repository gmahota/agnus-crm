
import Activity  from '../../models/crm/activity'
import ActivityRepository  from '../../repository/crm/activityRepository'


const getById = (id:string) =>
    ActivityRepository.findById(id)

const getAll = () =>
    ActivityRepository.findAll()


const create = (Activity:Activity) =>
  ActivityRepository.create(Activity)

const getByName= (name:string) =>
    ActivityRepository.findByName(name)


export default {
  getAll,
  getById,
  create,
  getByName
}