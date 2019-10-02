// AJAX GET Request
const api = 'https://sandbox.iexapis.com/stable/';
const token = '?token=Tpk_7190efa09280470180ab8bb6635da780';

const getAPI = function(method, param, callback) {
  const req = new XMLHttpRequest();
  req.open(method.toLowerCase(), api + param + token);
  req.send();
  req.onload = () => {
    const data = JSON.parse(req.responseText);
    callback(data);
  };
};

export default getAPI;
