import crypto from "crypto"

export const generateSecretKey = (): string => {
  const secretKey = crypto.randomBytes(32).toString("base64")
  return secretKey
}

export const secretKey: string = generateSecretKey()

const generateAdminSecretKey = () => {
  return crypto.randomBytes(32).toString("base64")
}

export const adminSecretKey: string = generateAdminSecretKey()
