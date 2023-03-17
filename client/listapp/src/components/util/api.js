module.exports = async function fetchEndpoint(
  endpoint,
  method,
  headers,
  credentials,
  body
) {
  let response = null;
  try {
    response = await fetch(endpoint, {
      method: method,
      headers: headers,
      credentials: credentials,
      body: body,
    });
  } catch (FetchError) {
    return { error: "Could not make a fetch" };
  }

  try {
    if (response.status === 400 || response.status === 404) {
      const error = await response.text();
      return { error };
    }
    if (response.status === 200) {
      const data = await response.json();
      return { data };
    }
  } catch (FetchError) {
    return { error: "Something went wrong!" };
  }
};
