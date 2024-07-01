const Joi = require('joi');

const customMessages = {
  'string.empty': 'O campo {#label} não pode estar vazio',
  'any.required': 'O campo {#label} é obrigatório',
  'string.email': 'O campo {#label} deve ser um email válido',
  'any.only': 'O campo {#label} deve ser {#valids}',
};

const schemas = {
  PF: Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'O campo email não pode estar vazio',
      'any.required': 'O campo email é obrigatório',
      'string.email': 'O campo email deve ser um email válido'
    }),
    typeForm: Joi.string().valid('PF').required().messages({
      'string.empty': 'O campo tipo de formulário não pode estar vazio',
      'any.required': 'O campo tipo de formulário é obrigatório',
      'any.only': 'O campo tipo de formulário deve ser PF'
    }),
    name: Joi.string().required().messages({
      'string.empty': 'O campo nome não pode estar vazio',
      'any.required': 'O campo nome é obrigatório'
    }),
    cpf: Joi.string().required().messages({
      'string.empty': 'O campo CPF não pode estar vazio',
      'any.required': 'O campo CPF é obrigatório'
    }),
    birthDate: Joi.string().required().messages({
      'string.empty': 'O campo data de nascimento não pode estar vazio',
      'any.required': 'O campo data de nascimento é obrigatório'
    }),
    phone: Joi.string().required().messages({
      'string.empty': 'O campo telefone não pode estar vazio',
      'any.required': 'O campo telefone é obrigatório'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'O campo senha não pode estar vazio',
      'any.required': 'O campo senha é obrigatório'
    }),
  }),
  PJ: Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'O campo email não pode estar vazio',
      'any.required': 'O campo email é obrigatório',
      'string.email': 'O campo email deve ser um email válido'
    }),
    typeForm: Joi.string().valid('PJ').required().messages({
      'string.empty': 'O campo tipo de formulário não pode estar vazio',
      'any.required': 'O campo tipo de formulário é obrigatório',
      'any.only': 'O campo tipo de formulário deve ser PJ'
    }),
    companyName: Joi.string().required().messages({
      'string.empty': 'O campo nome da empresa não pode estar vazio',
      'any.required': 'O campo nome da empresa é obrigatório'
    }),
    cnpj: Joi.string().required().messages({
      'string.empty': 'O campo CNPJ não pode estar vazio',
      'any.required': 'O campo CNPJ é obrigatório'
    }),
    creationDate: Joi.string().required().messages({
      'string.empty': 'O campo data de criação não pode estar vazio',
      'any.required': 'O campo data de criação é obrigatório'
    }),
    phone: Joi.string().required().messages({
      'string.empty': 'O campo telefone não pode estar vazio',
      'any.required': 'O campo telefone é obrigatório'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'O campo senha não pode estar vazio',
      'any.required': 'O campo senha é obrigatório'
    }),
  }),
};


const validateData = (data, existingUsers) => {
  const schema = schemas[data.typeForm];
  if (!schema) {
    return ['Tipo de formulário inválido'];
  }

  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    return error.details.map(detail => detail.message);
  }

  const userExists = existingUsers.find(
    user => user.cpf === data.cpf || user.cnpj === data.cnpj || user.email === data.email
  );

  if (userExists) {
    return ['CPF, CNPJ ou email já cadastrado'];
  }

  return null;
};

module.exports = validateData;
