import { rsRequest } from "@/services"

// 获取所有榜单
export function fetchTopList() {
  return rsRequest.get({
    url: '/toplist'
  })
}