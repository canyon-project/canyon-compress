const testCoverageData = require('./test-coverage.json')
const protobuf = require("protobufjs");
const {compress, decompress} = require("@mongodb-js/zstd");
const ssss = require("./coverage2.json")
const fs = require("node:fs");


function jianchaJiaZhuanhuan(coverageData) {
    return Object.fromEntries(Object.entries(coverageData).map(([key, value]) => [
        key,
        {
            ...value,
            b: Object.fromEntries(Object.entries(value.b).map(([k, v]) => [k, { data: v }]))
        }
    ]));
}



function main(coverageData) {

    return new Promise((resolve, reject) => {

        protobuf.load("coverage.proto", function(err, root) {
            if (err)
                throw err;

            // Obtain a message type
            const AwesomeMessage = root.lookupType("CoverageData");

            // Exemplary payload
            const payload = {
                data: jianchaJiaZhuanhuan(coverageData)
            }

            // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
            const errMsg = AwesomeMessage.verify(payload);
            if (errMsg)
                throw Error(errMsg);

            // Create a new message
            const message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

            // Encode a message to an Uint8Array (browser) or Buffer (node)
            const buffer2 = AwesomeMessage.encode(message).finish();
            // ... do something with buffer

            // resolve(buffer);

            // console.log(buffer2)

            resolve(compress(buffer2));

        });
    });


}



function jieya(buffer) {

    return new Promise((resolve, reject) => {
        decompress(buffer).then((res) => {
            protobuf.load("coverage.proto", function(err, root) {
                    if (err)
                        throw err;

                    // Obtain a message type
                    const AwesomeMessage = root.lookupType("CoverageData");



                    var message = AwesomeMessage.decode(res);
                    // ... do something with message

                    // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

                    // Maybe convert the message back to a plain object
                    var object = AwesomeMessage.toObject(message, {
                        longs: String,
                        enums: String,
                        bytes: String,
                        // see ConversionOptions
                    });


                    resolve(object);

                }
            )
        })
    });
}


main(testCoverageData).then((buffer) => {
    // console.log(buffer);
    // 检查buffer 多少字节
    // console.log(buffer.length)
    // jieya(buffer).then((res) => {
    //     console.log(res)
    // })
    fs.writeFileSync('coverage3.json',buffer)
}).catch(err=>{
    console.log(err)
})


compress(Buffer.from(JSON.stringify(ssss))).then((res)=>{
    console.log(res.length,'???')
})
