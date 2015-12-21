export function sendHttpError(res, data) {
  const {err, code} = data;

  if (err) {
    console.error(' <==== ERROR', data.err, data.err.stack);
  }

  res.send(code).json(err);
}
