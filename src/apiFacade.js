import facade from "./authFacade";

function apiFetchFacade() {
  function handleHttpErrors(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }

  const getApiFetch = (url) => {
    const options = facade.makeOptions("GET", true);
    return fetch(url, options).then(handleHttpErrors);
  };

  const getApiFetchWBody = (Body, url) => {
    const options = facade.makeOptions("POST", true, Body);
    return fetch(url, options).then(handleHttpErrors);
  };

  const createUser = (url) => {
    const options = facade.makeOptions("POST", true);
    return fetch(url, options).then(handleHttpErrors);
  };

  const deleteApiCall = (url) => {
    const options = facade.makeOptions("DELETE", true);
    return fetch(url, options).then(handleHttpErrors);
  };

  const putApiCallWBody = (Body, url) => {
    const options = facade.makeOptions("PUT", true, Body);
    return fetch(url, options).then(handleHttpErrors);
  };

  const putApiCall = (url) => {
    const options = facade.makeOptions("PUT", true);
    return fetch(url, options).then(handleHttpErrors);
  };

  return {
    getApiFetch,
    getApiFetchWBody,
    createUser,
    deleteApiCall,
    putApiCallWBody,
    putApiCall,
  };
}

export default apiFetchFacade;
