import request from "./request";

export function getAlbums(id) {
  return request({
    url: "/top/album",
    params: {
      id,
    },
  });
}

export function getDishs() {
  return request ({
    url:"/album/newest"
  })
}
