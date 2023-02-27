import Joi from'joi'

const schema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required().lowercase(),
  role: Joi.string().required(),
  password: Joi.string().min(8).max(30).required()
});

export default schema;