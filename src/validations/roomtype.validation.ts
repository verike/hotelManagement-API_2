import Joi from 'joi'

const schema = Joi.object({
  name: Joi.string().lowercase().required(),
  description: Joi.string().required()
});

export default schema