import { rsRequest } from "@/services"

export function fetchBanners() {
  return rsRequest.get({
    url: '/banner'
  })
}
