const util=require('util');
const Node=require('./Nodes/createNode')
const connec=async () => {
  const node1 = await Node.nodeCreate()
  node1.connectionManager.on('peer:connect', async (connection) => {
    console.log('Connection established to:', connection.remotePeer.toB58String())	
// Emitted when a new connection has been created
  })
  node1.on('peer:discovery', async (peerId) => {console.log('Discovered:', peerId.toB58String())
  })
    await node1.start()
     node1.pubsub.on('MyApp', (data) => {
      console.log(data.data.toString());
    })
    await node1.pubsub.subscribe('MyApp')
}
connec()
