const request = require("request");

const getWeather = (latLong, callback) => {
  // latLong should have been passed here if i had the right API
  let url =
    "https://prod.webdevelopmentsolution.net:3009/v1/admin/store/brand?page=1&search=AA";

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      return callback("Unable to connect to brands server.");
    } else if (!body["response"]["success"]) {
      return callback("Err getting brands from server.");
    }
    const brandList = body.data.brandList;
    callback(undefined, brandList);
  });
};

module.exports = getWeather;
