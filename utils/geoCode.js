const request = require("request");

const geoCode = (address, callback) => {
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZGV2LWNoaXJhZyIsImEiOiJja3E1M2x0cWcwNDA0MnZtbXZic3I2ZDd4In0.pDBSkGhtoyUfwCEhR0iPpQ`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      return callback("Unable to connect");
    } else if (body.features.length == 0) {
      return callback("Unable to find location");
    }
    let lat = body.features[0].center[1];
    let long = body.features[0].center[0];
    let fullName = body.features[0].place_name;
    callback(undefined, { fullName, lat, long });
  });
};

module.exports = geoCode;
