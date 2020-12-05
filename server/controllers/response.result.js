
Response = (res, resultStatus, data) => {
    res.status(200).send({status:resultStatus.code, message:resultStatus.message, data:data});
}

Response.success = {status:200, code:0, message:'success'};
Response.needparam = {status:200, code:2, message:'need param'};
Response.unauthorized = {status:200, code:3, message:'un authorized'};
Response.notfound = {status:200, code:4, message:'not found'};
Response.dberror = {status:200, code:10, message:'db error'};

module.exports = Response;