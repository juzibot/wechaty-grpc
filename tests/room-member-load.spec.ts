import { test } from 'tstest'

import { puppet } from '../src/cjs.js'
import { Timestamp } from '../src/google.js'

const REVISION = '184467440737095516160'

test('room payload appended fields survive single and batch encoding', t => {
  const room = new puppet.RoomPayloadResponse()
  t.equal(room.getMemberCount(), 0)
  t.equal(room.getMemberLoadMode(), 0)
  t.equal(room.getMemberLoadStatus(), 0)
  t.equal(room.getMemberLoadRevision(), '')
  t.equal(room.hasMemberLoadedAt(), false)
  room.setId('room')
  room.setTopic('topic')
  room.setMemberIdsList([ 'member' ])
  room.setCreateTime(Timestamp.fromDate(new Date(1600000000000)))
  room.setMemberCount(123)
  room.setMemberLoadMode(puppet.RoomMemberLoadMode.ROOM_MEMBER_LOAD_MODE_LAZY)
  room.setMemberLoadStatus(puppet.RoomMemberLoadStatus.ROOM_MEMBER_LOAD_STATUS_LOADED)
  room.setMemberLoadRevision(REVISION)
  room.setMemberLoadedAt(Timestamp.fromDate(new Date(1700000000123)))
  const decoded = puppet.RoomPayloadResponse.deserializeBinary(room.serializeBinary())
  t.same(decoded.toObject(), room.toObject())
  const batch = new puppet.BatchRoomPayloadResponse()
  batch.setRoomPayloadsList([ room ])
  const decodedBatch = puppet.BatchRoomPayloadResponse.deserializeBinary(batch.serializeBinary())
  t.same(decodedBatch.getRoomPayloadsList()[0]?.toObject(), room.toObject())
  t.equal(decoded.getMemberLoadRevision(), REVISION)
  t.equal(decoded.getMemberLoadedAt()?.toDate().getTime(), 1700000000123)
  const numbered = new puppet.RoomPayloadResponse()
  numbered.setMemberCount(1)
  numbered.setMemberLoadMode(1)
  numbered.setMemberLoadStatus(1)
  numbered.setMemberLoadRevision('0')
  numbered.setMemberLoadedAt(new Timestamp())
  t.same([ ...numbered.serializeBinary() ], [ 96, 1, 104, 1, 112, 1, 122, 1, 48, 130, 1, 0 ])
  const legacy = puppet.RoomPayloadResponse.deserializeBinary(Uint8Array.from([ 10, 4, 114, 111, 111, 109 ]))
  t.equal(legacy.getId(), 'room')
  t.equal(legacy.getMemberLoadMode(), 0)
  t.end()
})

test('snapshot response reuses member payloads and preserves continuation and JSON events', t => {
  const response = new puppet.RoomMemberSnapshotResponse()
  t.same(response.getMembersList(), [])
  t.equal(response.getNextPageToken(), '')
  t.equal(response.hasLoadedAt(), false)
  response.setId('room')
  response.setRevision(REVISION)
  response.setLoadedAt(Timestamp.fromDate(new Date(1700000000123)))
  const member = new puppet.RoomMemberPayloadResponse()
  member.setId('member')
  member.setRoomAlias('alias')
  response.setMembersList([ member ])
  response.setNextPageToken('next')
  const decoded = puppet.RoomMemberSnapshotResponse.deserializeBinary(response.serializeBinary())
  t.same(decoded.toObject(), response.toObject())
  t.equal(decoded.getRevision(), REVISION)
  t.equal(decoded.getMembersList()[0]?.getRoomAlias(), 'alias')
  t.equal(decoded.getNextPageToken(), 'next')
  const event = new puppet.EventResponse()
  event.setType(puppet.EventType.EVENT_TYPE_ROOM_MEMBER_LOAD)
  event.setPayload(JSON.stringify({ revision: REVISION, roomId: 'room', status: 3, taskId: 'task' }))
  const decodedEvent = puppet.EventResponse.deserializeBinary(event.serializeBinary())
  t.equal(decodedEvent.getType(), 39)
  t.equal(decodedEvent.getPayload(), event.getPayload())
  t.end()
})

test('room member enums and unary RPC definitions are exported', t => {
  t.same(puppet.RoomMemberLoadMode, {
    ROOM_MEMBER_LOAD_MODE_LAZY: 2,
    ROOM_MEMBER_LOAD_MODE_NORMAL: 1,
    ROOM_MEMBER_LOAD_MODE_UNSPECIFIED: 0,
  })
  t.same(puppet.RoomMemberLoadStatus, {
    ROOM_MEMBER_LOAD_STATUS_FAILED: 4,
    ROOM_MEMBER_LOAD_STATUS_LOADED: 3,
    ROOM_MEMBER_LOAD_STATUS_LOADING: 2,
    ROOM_MEMBER_LOAD_STATUS_PENDING: 1,
    ROOM_MEMBER_LOAD_STATUS_UNSPECIFIED: 0,
  })
  t.equal(puppet.EventType.EVENT_TYPE_ROOM_MEMBER_LOAD, 39)
  for (const name of [ 'roomMemberSync', 'roomMemberLoadState', 'roomMemberSnapshot' ] as const) {
    const definition = puppet.PuppetService[name]
    t.equal(definition.path, `/wechaty.Puppet/${name[0]!.toUpperCase()}${name.slice(1)}`)
    t.equal(definition.requestStream, false)
    t.equal(definition.responseStream, false)
    t.type(puppet.PuppetClient.prototype[name], 'function')
  }
  t.end()
})

test('sync, state and snapshot requests preserve defaults and pagination on the wire', t => {
  const sync = new puppet.RoomMemberSyncRequest()
  t.equal(sync.getForce(), false)
  sync.setId('room')
  sync.setForce(true)
  const decodedSync = puppet.RoomMemberSyncRequest.deserializeBinary(sync.serializeBinary())
  t.equal(decodedSync.getId(), 'room')
  t.equal(decodedSync.getForce(), true)
  const state = new puppet.RoomMemberLoadStateRequest()
  state.setId('room')
  t.equal(puppet.RoomMemberLoadStateRequest.deserializeBinary(state.serializeBinary()).getId(), 'room')
  const snapshot = new puppet.RoomMemberSnapshotRequest()
  t.equal(snapshot.getPageToken(), '')
  t.equal(snapshot.getPageSize(), 0)
  snapshot.setId('room')
  snapshot.setRevision(REVISION)
  snapshot.setPageToken('opaque-token')
  snapshot.setPageSize(500)
  const decoded = puppet.RoomMemberSnapshotRequest.deserializeBinary(snapshot.serializeBinary())
  t.same(decoded.toObject(), { id: 'room', pageSize: 500, pageToken: 'opaque-token', revision: REVISION })
  t.end()
})

test('load state response preserves large revision, timestamp and error', t => {
  const response = new puppet.RoomMemberLoadStateResponse()
  t.equal(response.getStatus(), 0)
  t.equal(response.getRevision(), '')
  t.equal(response.hasLoadedAt(), false)
  response.setId('room')
  response.setTaskId('task')
  response.setStatus(puppet.RoomMemberLoadStatus.ROOM_MEMBER_LOAD_STATUS_FAILED)
  response.setRevision(REVISION)
  response.setLoadedAt(Timestamp.fromDate(new Date(1700000000123)))
  response.setError('unavailable')
  const decoded = puppet.RoomMemberLoadStateResponse.deserializeBinary(response.serializeBinary())
  t.equal(decoded.getId(), 'room')
  t.equal(decoded.getTaskId(), 'task')
  t.equal(decoded.getStatus(), 4)
  t.equal(decoded.getRevision(), REVISION)
  t.equal(decoded.getLoadedAt()?.toDate().getTime(), 1700000000123)
  t.equal(decoded.getError(), 'unavailable')
  t.end()
})
