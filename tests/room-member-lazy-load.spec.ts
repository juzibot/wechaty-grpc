#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { test } from 'tstest'

import util from 'util'

import { grpc, puppet } from '../src/mod.js'

import { puppetServerImpl } from './puppet-server-impl.js'

type LazyLoadNowHandler = puppet.IPuppetServer['roomMemberLazyLoadNow']

test('room member lazy load events keep 39 and add 41 with JSON payloads', t => {
  t.equal(puppet.EventType.EVENT_TYPE_ROOM_MEMBER_LOAD, 39)
  t.equal(puppet.EventType.EVENT_TYPE_REPLAY_COMPLETE, 40)
  t.equal(puppet.EventType.EVENT_TYPE_ROOM_MEMBER_LAZY_LOAD_FINISHED, 41)

  const loaded = new puppet.EventResponse()
  loaded.setType(puppet.EventType.EVENT_TYPE_ROOM_MEMBER_LOAD)
  loaded.setPayload(JSON.stringify({ roomId: 'room' }))
  const decodedLoaded = puppet.EventResponse.deserializeBinary(loaded.serializeBinary())
  t.equal(decodedLoaded.getType(), 39)
  t.same(JSON.parse(decodedLoaded.getPayload()), { roomId: 'room' })

  const finished = new puppet.EventResponse()
  finished.setType(puppet.EventType.EVENT_TYPE_ROOM_MEMBER_LAZY_LOAD_FINISHED)
  finished.setPayload('{}')
  const decodedFinished = puppet.EventResponse.deserializeBinary(finished.serializeBinary())
  t.equal(decodedFinished.getType(), 41)
  t.same(JSON.parse(decodedFinished.getPayload()), {})
  t.end()
})

test('V1 member loading messages and room payload accessors are gone', t => {
  const generated = puppet as unknown as Record<string, unknown>
  for (const name of [
    'RoomMemberLoadMode',
    'RoomMemberLoadStatus',
    'RoomMemberSyncRequest',
    'RoomMemberLoadStateRequest',
    'RoomMemberLoadStateResponse',
    'RoomMemberSnapshotRequest',
    'RoomMemberSnapshotResponse',
  ]) {
    t.equal(generated[name], undefined, `${name} removed`)
  }
  const room = new puppet.RoomPayloadResponse() as unknown as Record<string, unknown>
  t.equal(room['getMemberLoadMode'], undefined)
  t.equal(room['getMemberLoadRevision'], undefined)
  t.type(room['getMemberCount'], 'function', 'member_count (12) is kept')

  // A V1 sender writing field 13 (varint 2) must decode as an unknown field, not a known one.
  const legacy = puppet.RoomPayloadResponse.deserializeBinary(Uint8Array.from([ 10, 4, 114, 111, 111, 109, 104, 2 ]))
  t.equal(legacy.getId(), 'room')
  const expected = new puppet.RoomPayloadResponse()
  expected.setId('room')
  t.same(legacy.toObject(), expected.toObject())
  t.end()
})

test('RoomMemberLazyLoadNow is an empty unary RPC', t => {
  const generated = puppet.PuppetService as unknown as Record<string, unknown>
  for (const name of [ 'roomMemberSync', 'roomMemberLoadState', 'roomMemberSnapshot' ]) {
    t.equal(generated[name], undefined, `${name} RPC removed`)
  }
  const definition = puppet.PuppetService.roomMemberLazyLoadNow
  t.equal(definition.path, '/wechaty.Puppet/RoomMemberLazyLoadNow')
  t.equal(definition.requestStream, false)
  t.equal(definition.responseStream, false)
  t.same([ ...new puppet.RoomMemberLazyLoadNowRequest().serializeBinary() ], [])
  t.same([ ...new puppet.RoomMemberLazyLoadNowResponse().serializeBinary() ], [])
  t.end()
})

test('RoomMemberLazyLoadNow round-trips over a real gRPC channel', async t => {
  let calls = 0
  const server = new grpc.Server()
  const roomMemberLazyLoadNow: LazyLoadNowHandler = (_call, callback) => {
    calls++
    callback(null, new puppet.RoomMemberLazyLoadNowResponse())
  }
  server.addService(puppet.PuppetService, { ...puppetServerImpl, roomMemberLazyLoadNow })
  const port = await util.promisify(server.bindAsync.bind(server))(
    '127.0.0.1:0',
    grpc.ServerCredentials.createInsecure(),
  )
  const client = new puppet.PuppetClient(`127.0.0.1:${port}`, grpc.credentials.createInsecure())
  try {
    const response = await util.promisify(client.roomMemberLazyLoadNow.bind(client))(
      new puppet.RoomMemberLazyLoadNowRequest(),
    )
    t.ok(response instanceof puppet.RoomMemberLazyLoadNowResponse)
    t.equal(calls, 1)
  } finally {
    client.close()
    await new Promise<void>(resolve => server.tryShutdown(() => resolve()))
  }
})
