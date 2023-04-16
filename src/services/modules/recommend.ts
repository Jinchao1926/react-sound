import { rsRequest } from ".."

export function fetchBanners() {
  return rsRequest.get({
    url: '/banner'
  })
}
