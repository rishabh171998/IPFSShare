const protons=require('protons');
const {Request,Stats}=protons(`
message Request
{
    enum Type
    {
        SEND_MESSAGE = 0;
        UPDATE_PEER = 1;
        STATS = 2;
    }
    required Type type=1;

    optional UpdatePeer updatePeer=2;

    optional Stats stat=3;

    optional SendMessages sendMessage=4;
}

message UpdatePeer {
  optional bytes userHandle = 1;
}
message SendMessages{
    required bytes data=1;
    optional int64 created=2;

    optional bytes id=3;
}

message Stats{
      map<string,string> connectedPeers=1;
}
`)
class Chat
{
    /**
     * @params {Libp2p}
     * @params {string}
     * @params {function(Message)}
    */
   constructor(libp2p,topic,messageHandler)
   {
       this.libp2p=libp2p;
       this.topic=topic;
       this.userHandles = new Map([
        [libp2p.peerId.toB58String(), 'Rishabh_135']
      ])
       this.messageHandler = messageHandler
   
       this.connectedPeers = new Set()
       this.libp2p.connectionManager.on('peer:connect', async (connection) => {
         if (this.connectedPeers.has(connection.remotePeer.toB58String())) return
         this.connectedPeers.add(connection.remotePeer.toB58String())
        
        try{ 
          await this.sendStats(this.userHandles)
        }catch(err)
        {
          console.error(err);
        }

      })
       this.libp2p.connectionManager.on('peer:disconnect', async (connection) => {
         if (this.connectedPeers.delete(connection.remotePeer.toB58String())) {
           try{
           await this.sendStats(this.connectedPeers)
          }catch(err)
          {
            console.error(err);
          }
         }
       })
    if(this.libp2p.isStarted()) this.join();
 }
 onStart()
 {
     this.join();
 }
 onStop()
 {
     this.leave();
 }
 /**
   * Subscribes to `Chat.topic`. All messages will be
   * forwarded to `messageHandler`
   * @private
   */
  join()
  {
    this.libp2p.pubsub.subscribe(this.topic, (message) => {
        try {
          const request = Request.decode(message.data)
          switch (request.type) {
            case Request.Type.SEND_MESSAGE:
              this.messageHandler({
                from: message.from,
                message: request.sendMessage
              })
              break
              case Request.Type.STATS:
                
                 console.log(request.stat.connectedPeers.first)
               
                break
            default:
              // Do nothing
          }
        } catch (err) {
          console.error(err)
        }

      })
    }
    leave () {
        this.libp2p.pubsub.unsubscribe(this.topic)
      }
  async updatePeer(name)
  {
      const msg=Request.encode(
          {
            type:Request.Type.UPDATE_PEER,
            updatePeer:
            {
                userHandle:Buffer.from(name)
            }
          }
      )
      try 
      {
          await this.libp2p.pubsub.publish(this.topic,msg)

      }catch(err)
      {
          console.error('Could Not Publish Name Change',err);
      }
      
    }
  /**
   * Sends the updated stats to the pubsub network
   * @param {Array<Buffer>} connectedPeers
   */
   async sendStats(connectedPeers)
   {
       const msg=Request.encode(
           {
               type:Request.Type.STATS,
               stat:
               {
                connectedPeers:connectedPeers
               }
           }
       )
       try {
        await this.libp2p.pubsub.publish(this.topic, msg)
      } catch (err) {
        console.error('Could not publish stats update', err)
      }
   }
   /**
   * Publishes the given `message` to pubsub peers
   * @throws
   * @param {Buffer|string} message The chat message to send
   */
  async send (message) {
    const msg = Request.encode({
      type: Request.Type.SEND_MESSAGE,
      sendMessage: {
      // id: (~~(Math.random() * 1e9)).toString(36) + Date.now(),
        data: Buffer.from(message),
        //created: Date.now()
      }
    })
    await this.libp2p.pubsub.publish(this.topic, msg)
  }
}
module.exports = Chat
module.exports.TOPIC = '/libp2p/example/chat/1.0.0'
module.exports.CLEARLINE = '\033[1A'
