import {ValidationError} from 'yup'

interface ValidationErrors{
  [key: string] : string
}

export default function GetValidationError(error: ValidationError): ValidationErrors{
  const Errors: ValidationErrors = {}

  error.inner.forEach(err => {
    Errors[err.path] = err.message
  })


  return Errors
}
