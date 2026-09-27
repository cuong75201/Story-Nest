type Response<T> = {
  status: boolean
  message: string
  data: T | null
  error: ErrorType | null
}

type ErrorType = {
  code: string
  details: unknown | null
}

export type { Response }
