import { Api } from "nocodb-sdk"

const baseURL = process.env.NEXT_PUBLIC_NOCODB_BASE_URL as string
const token = process.env.NEXT_PUBLIC_NOCODB_TOKEN as string

if (!baseURL || !token) {
  throw new Error("NocoDB env vars not set: NEXT_PUBLIC_NOCODB_BASE_URL & NEXT_PUBLIC_NOCODB_TOKEN")
}

export const nocodb = new Api({
  baseURL,
  headers: {
    "xc-token": token,
  },
})
