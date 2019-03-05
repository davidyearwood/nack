export default function postChannel(body) {
  const url = "/api/channels";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body
  });
}
