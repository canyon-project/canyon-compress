const testCoverageData = require('./test-coverage.json')
const protobuf = require("protobufjs");
const fs = require("node:fs");
protobuf.load("coverage.proto", function(err, root) {
    if (err)
        throw err;

    // Obtain a message type
    var AwesomeMessage = root.lookupType("CoverageData");
    console.log(AwesomeMessage,'AwesomeMessage')
    // Exemplary payload
    var payload = {
        data:{
            [testCoverageData.path]:testCoverageData
        }
    }

    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = AwesomeMessage.verify(payload);
    if (errMsg)
        throw Error(errMsg);

    // Create a new message
    var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

    // Encode a message to an Uint8Array (browser) or Buffer (node)
    var buffer = AwesomeMessage.encode(message).finish();
    // ... do something with buffer

    // console.log(message,'message')

    // Decode an Uint8Array (browser) or Buffer (node) to a message
    var message = AwesomeMessage.decode(buffer);
    // ... do something with message

    // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

    // Maybe convert the message back to a plain object
    var object = AwesomeMessage.toObject(message, {
        longs: String,
        enums: String,
        bytes: String,
        // see ConversionOptions
    });

    console.log(object,'object')
    fs.writeFileSync('coverage2.json',JSON.stringify(object.data['main.js'],null,2))
});
