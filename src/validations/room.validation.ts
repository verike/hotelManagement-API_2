import Joi from 'joi'

const schema = Joi.object({
  name: Joi.string().lowercase().required(),
  roomtype: Joi.required(),
  price: Joi.number().required(),
  description: Joi.string().required()
});

export default schema