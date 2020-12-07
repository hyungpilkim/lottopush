const baseUrl = 'http://localhost:3002'

/**
 * GET
 */
const requestGet = (token, url, params, callback) => {
  let requrl = new URL(url)
  requrl.search = new URLSearchParams(params)

  fetch(requrl, {
    method: 'GET',
    headers: {
      'token': token
    }
  })
  .then(response => callback(response.json()))
  .catch(function (err) {
    console.log(err);
  });
}

/**
 * POST
 */
const requestPOST = (token, url, params, callback) => {
  fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
          'Content-Type': 'application/json',
          'token': token
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(params), // body data type must match "Content-Type" header
  })
  .then(response => callback(response.json()))
  .catch(function (err) {
    console.log(err);
  }); 
}


const login = (id, pw, callback) => {
  var url = baseUrl + '/auth/login';
  var params = {
    'username': id,
    'password': pw
  };

  requestPOST("", url, params, callback);
}

//푸시 보내기
const push = (token, userIds, title, body, callback) => {
  var params = {
    'userIds': userIds,
    'title': title,
    'body': body
  };

  var url = baseUrl + '/api/push/send';
  requestPOST(token, url, params, callback);
}

//푸시 히스토리
const user = (token, callback) => {
  var url = baseUrl + '/api/user';
  requestGet(token, url, {}, callback);
}

//푸시 히스토리
const history = (token, callback) => {
  var url = baseUrl + '/api/push/history';
  requestGet(token, url, {}, callback);
}

//히스토리 detail
const dtl = (token, push_id, callback) => {
  var url = baseUrl + '/api/push/historyDtl';
  var params = {'push_id': push_id};
  requestGet(token, url, params, callback);
}


  
export default {login, push, history, dtl, user};