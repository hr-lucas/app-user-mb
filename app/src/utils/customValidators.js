import { isCPF, isPhone, isDate, isCNPJ } from 'brazilian-values'

const phone = (value) => {
  return isPhone(value)
}

const cpf = (value) => {
  return isCPF(value)
}

const cnpj = (value) => {
  return isCNPJ(value)
}

const date = (value) => {
  return isDate(value)
}
export { phone, cpf, date, cnpj }
