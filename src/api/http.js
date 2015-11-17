export function sendHttpError(res, data) {
  console.error(' <==== ERROR', data.err);
  res.send(data.code).json(data.err);
}