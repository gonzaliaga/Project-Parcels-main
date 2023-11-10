import { Contactanos } from "./Contact"

const validations = (info: Contactanos) => {
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  const regexPhone = /^\d+(\.\d +)?$/
  let error: Contactanos = {}

  info.phone = info.phone?.toString()

  if (info.firstName === "") {
    error.firstName = "Debes escribir tu nombre..."
  }
  if (info.lastName === "") {
    error.lastName = "Debes escribir tu apellido..."
  }

  if (!info.email) {
    info.email = ""
    if (!regexEmail.test(info.email)) {
      error.email = "Debe ser un correo electronico valido..."
    }
  }
  if (!info.phone) {
    info.phone = ""
    if (!regexPhone.test(info.phone)) {
      error.phone = "debes escribir tu número de teléfono..."
    }
  }
  if (info.reason === "") {
    error.reason = "Debes seleccionar una opcion..."
  }
  if (info.message === "") {
    error.message = "Escribe el mensaje que nos deseas comunicar..."
  }

  if (info.firstName === "") {
    error.firstName = "Debes escribir tu nombre..."
  }
  if (info.lastName === "") {
    error.lastName = "Debes escribir tu apellido..."
  }

  if (!info.email) {
    info.email = ""
    if (!regexEmail.test(info.email)) {
      error.email = "Debe ser un correo electronico valido..."
    }
  }
  if (!info.phone) {
    info.phone = ""
    if (!regexPhone.test(info.phone)) {
      error.phone = "debes escribir tu número de teléfono..."
    }
  }
  if (info.phone == "0") {
    info.phone = ""
    if (!regexPhone.test(info.phone)) {
      error.phone = "debes escribir tu número de teléfono..."
    }
  }
  if (info.reason === "") {
    error.reason = "Debes seleccionar una opcion..."
  }
  if (info.message === "") {
    error.message = "Escribe el mensaje que nos deseas comunicar..."
  }

  return error
}

export default validations
