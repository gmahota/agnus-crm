
import Rating from '../../models/crm/rating'
import RatingRepository from '../../repository/crm/ratingRepository'


const getById = (id: string) =>
  RatingRepository.findById(id)

const getAll = () =>
  RatingRepository.findAll()


const create = (item: Rating) =>
  RatingRepository.create(item)

const getByName = (name: string) =>
  RatingRepository.findByName(name)


export default {
  getAll,
  getById,
  create,
  getByName
}