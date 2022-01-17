const axios = require("axios");
// const base_uel = "https://deltrix.herokuapp.com/"
// const base_uel = "https://deltrix-ecommerce.herokuapp.com/";
// const base_uel = "http://localhost:8000/"; //  #=> #=> #=> LOCALHOST
const base_uel = "http://54.183.217.110/";
// http://localhost:3000/admin/Products
export const post = (body, url) => {
  console.log(body);
  return new Promise((resolve, reject) => {
    axios
      .post(base_uel + url, body)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const get = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(base_uel + url)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const put = (body, url) => {
  return new Promise((resolve, reject) => {
    axios
      .put(base_uel + url, body)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const _delete = (_id, url) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(base_uel + url, { data: { _id: _id } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
