const util=require('util');
const Node=require('./Nodes/createNode');
const listener = require('libp2p-tcp/src/listener');
const connec=async () => {
  const node2 = await Node.nodeCreate()
  node2.connectionManager.on('peer:connect', async (connection) => {
    console.log('Connection established to:', connection.remotePeer.toB58String())
  })
  node2.on('peer:discovery', async (peerId) => {console.log('Discovered:', peerId.toB58String())
  })
    await node2.start()
    setInterval(() => {
      node2.pubsub.publish('MyApp', new util.TextEncoder().encode(`Peer With Handle XYZ AVAILABLE FOR CONNECTION AT ${node2.peerId.toB58String()}`))
    }, 10000)
}
connec()
