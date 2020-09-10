const util=require('util');
const Node=require('./Nodes/createNode');
const pubsubChat=require('./class/chat');
const connec=async () => {
  const node = await Node.nodeCreate()
    await node.start()
    const pub=new pubsubChat(node,pubsubChat.TOPIC,({from,message})=>
    {
      let fromMe=from===node.peerId.toB58String();
      let user = from.substring(0, 6)
    if (pub.userHandles.has(from)) {
      user = pub.userHandles.get(from)
    }
    console.info(`${fromMe ? pubsubChat.CLEARLINE : ''}${user}(${new Date(message.created).toLocaleTimeString()}): ${message.data.toString()}`)
    }) 
    process.stdin.on('data', async (message) => {
      // Remove trailing newline
      message = message.slice(0, -1)
      // If there was a command, exit early
      try {
        // Publish the message
        await pub.send(message)
      } catch (err) {

        console.error('Could not publish chat', err)
      }
    })
}
connec()
