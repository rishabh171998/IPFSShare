const Libp2p = require('libp2p')
//Transport
const TCP = require('libp2p-tcp')
const Websockets = require('libp2p-websockets')
const WebRtcStar = require('libp2p-webrtc-star')
const wrtc = require('wrtc')
//Stream Muxer
const Mplex = require('libp2p-mplex')
//conn encryp
const SECIO = require('libp2p-secio')
const { NOISE } = require('libp2p-noise')
//Peer-Discovery
const MulticastDNS = require('libp2p-mdns')
const Gossipsub = require('libp2p-gossipsub')
const createNode = async () => {
  const node = await Libp2p.create({
    addresses: {
      listen: [
        //List Of Address
        '/ip4/0.0.0.0/tcp/0',
        '/ip4/0.0.0.0/tcp/0/ws',
        '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/'
      ]
    },
    modules: {
      transport: [TCP,Websockets,WebRtcStar],
      streamMuxer: [Mplex],
      connEncryption: [NOISE, SECIO],
      peerDiscovery: [MulticastDNS],
      pubsub:Gossipsub
    },
    config: {
      peerDiscovery: {
        [MulticastDNS.tag]: {
          interval: 20e3,
          enabled: true
        }
      },
      transport:{
          [WebRtcStar.prototype[Symbol.toStringTag]]:{
          wrtc
          }
        }
      }
    })
return node
}

module.exports.nodeCreate=createNode;