export function errorHandler(err, url, payload, options = {}) {
  console.log(
    `${err.status ? err.status : 'Error fetching data'}: ${
      err.statusText
    } - ${url}`,
    err,
    payload
  );
  if (!options.preventError) {
    throw err;
  }
  throw err;
}

function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(res);
  }
  return res.json();
}

export const getRequest = async (url, header) => {
  let params = {
    method: 'GET',
    headers: {
      ...header,
    },
  };

  const data = await fetch(url, params)
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => errorHandler(err, url));
  return data;
};

export const postRequest = async (url, body) => {
  const params = {
    method: 'POST',
    body: JSON.stringify({
      ...body
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const data = await fetch(url, params)
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => errorHandler(err, url));
  return data;
};

export const putRequest = async (url, body) => {
  const params = {
    method: 'PUT',
    body: JSON.stringify({
      ...body
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const data = await fetch(url, params)
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => errorHandler(err, url));
  return data;
};

export const deleteRequest = async (url) => {
  let params = {
    method: 'DELETE',
  };
  const data = await fetch(url, params)
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => errorHandler(err, url));
  return data;
};
