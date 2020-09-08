const protons=require('protons');
const fs=require('fs');
const {Request,Stats}=protons(fs.readFileSync('./Schema/sch.proto'));

class Chat
{
    /**
     * @params {Libp2p}
     * @params {string}
     * @params {function(Message)}
    */
   constructor(libp2p,topic)
   {
       this.libp2p=libp2p;
       this.topic=topic;
    this.connectedPeers=new Set();
    this.libp2p.connectionManager.on('peer:connect',(connection)=>
    {
        if(this.connectedPeers.has(connection.remotePeer.toB58String())) return
        this.connectedPeers.add(connection.remotePeer.toB58String())
    })
    
 }
}