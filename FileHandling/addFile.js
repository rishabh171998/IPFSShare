const fs=require('fs');
const ipfsClient = require('ipfs-http-client');
require('dotenv').config()
    const ipfs=new ipfsClient({host:process.env.API_HOST,port:process.env.HTTP_PORT,protocol:process.env.PROTOCOL})
    const addFile = async(fileName , filePath) => {
        const file = fs.readFileSync(filePath);
        const fileAdded = await ipfs.add({path : fileName,content: file,trickle:true});
        console.log(fileAdded);
        const fileHash = fileAdded.cid.toString();
        return fileHash;
    };
    module.exports.addFile=addFile;
