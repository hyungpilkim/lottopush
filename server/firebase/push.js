const admin = require("firebase-admin");
const serviceAccount = require("./lottois-firebase-adminsdk-m2kme-2469f9edd4.json");
const Push = require("../models/push.model");
admin.initializeApp({   
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://lottois.firebaseio.com",
});

send = (toDeviceToken, title, body) => {
    var registrationToken = toDeviceToken;
    var payload = {
      notification: {
        title: title,
        body: body,
      },
      data: {
        type: "screen",
        value: "generator",
      },
    };
  
    try {
        console.log("send :" + registrationToken)
        return admin
            .messaging()
            .sendToDevice(registrationToken, payload);
    } catch (error) {
        console.log("Error sending message:", error);
    }
}

FireBase = function() {
    
}


FireBase.sendMessage = (toDeviceTokens, title, body) => {
    try {
        if (toDeviceTokens && title && body) {
            return send(toDeviceTokens, title, body);
        } else {
            return -1;
        }
    } catch(e) {
        throw 'err ' + e;
    }
}



module.exports = FireBase;