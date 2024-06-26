/* eslint-disable sort-keys */
import util from 'util'

import {
  grpc,
  puppet,
}                       from '../src/mod.js'

import {
  puppetServerImpl,
}                     from '../tests/puppet-server-impl.js'

let eventStream: undefined | grpc.ServerWritableStream<puppet.EventRequest, puppet.EventResponse>

/**
 * Huan(202003): gRPC Wait for Ready Semantics
 *  https://github.com/grpc/grpc/blob/master/doc/wait-for-ready.md
 */
const dingQueue = [] as string[]

/**
 * Implements the SayHello RPC method.
 */
const puppetServerExample: puppet.IPuppetServer = {
  ...puppetServerImpl,

  event: (streammingCall) => {
    console.info('event(streamingCall)')

    if (eventStream) {
      console.info('event() end old eventStream to accept the new one.')
      eventStream.end()
      eventStream = streammingCall
    }

    eventStream = streammingCall
    while (dingQueue.length > 0) {
      const data = dingQueue.shift()
      const eventResponse = new puppet.EventResponse()
      eventResponse.setType(puppet.EventType.EVENT_TYPE_DONG)
      eventResponse.setPayload(data!)
      eventStream.write(eventResponse)
    }
    /**
      * Detect if Inexor Core is gone (GRPC disconnects)
      *  https://github.com/grpc/grpc/issues/8117#issuecomment-362198092
      */
    eventStream.on('cancelled', () => {
      console.info('eventStream.on(calcelled)')
      eventStream?.end()
      eventStream = undefined
    })
  },

  ding: (call, callback) => {
    const data = call.request.getData()
    console.info(`ding(${data})`)
    console.info('metadata:', call.metadata.getMap())
    console.info('getPeer:', call.getPeer())
    console.info('getDeadLine:', call.getDeadline())
    // console.info('getDeadLine:', call.)
    if (!eventStream) {
      dingQueue.push(data)
    } else {
      const eventResponse = new puppet.EventResponse()
      eventResponse.setType(puppet.EventType.EVENT_TYPE_DONG)
      eventResponse.setPayload(data)
      eventStream.write(eventResponse)
    }

    callback(null, new puppet.DingResponse())
  },
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
async function main () {
  const server = new grpc.Server()
  server.addService(
    puppet.PuppetService,
    puppetServerExample,
  )
  const serverBindPromise = util.promisify(
    server.bindAsync.bind(server),
  )

  const port = await serverBindPromise(
    '127.0.0.1:8788',
    grpc.ServerCredentials.createInsecure(),
  )
  console.info('Listen on port:', port)
  server.start()
  return 0
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
