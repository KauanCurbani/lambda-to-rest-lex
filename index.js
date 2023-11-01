const {
  LexRuntimeV2Client,
  RecognizeTextCommand,
} = require("@aws-sdk/client-lex-runtime-v2");

exports.handler = (event, context, callback) => {
  try {
    const client = new LexRuntimeV2Client({ region: "us-east-1" });
    var body = event["body"];

    var params = {
      botAliasId: process.env.BOT_ALIAS,
      botId: process.env.BOT_NAME,
      text: body["message"],
      sessionId: body["userId"],
      localeId: "pt_BR",
    };

    const command = new RecognizeTextCommand(params);

    client.send(command).then(
      (data) => {
        console.log(data);
        const response = {
            "statusCode": 200,
            "body": data,
            "isBase64Encoded": false
        };
        callback(null, response);
        return response;
      },
      (error) => {
        console.log(error);
        const response = {
            "statusCode": 500,
            "error": error,
            "isBase64Encoded": false
        };
        callback(error, {});
        return response
      }
    );
  } catch (e) {
    console.log(e);
    callback(e);
    return e
  }
};
