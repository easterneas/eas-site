import type { AxiosHeaders } from "axios"

type StrapiResponse<T> = {
  data: T
  meta: StrapiMetadata
}
