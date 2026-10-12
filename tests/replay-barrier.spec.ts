import { test } from 'tstest'

import { puppet } from '../src/cjs.js'

test('replay capability is opt-in and preserves the existing resume cursor', t => {
  const legacy = puppet.EventRequest.deserializeBinary(Uint8Array.from([ 8, 7, 18, 1, 97 ]))
  t.equal(legacy.getSeq(), 7)
  t.equal(legacy.getAccountId(), 'a')
  t.equal(legacy.getReplayBarrier(), false)
  t.same([ ...legacy.serializeBinary() ], [ 8, 7, 18, 1, 97 ])
  legacy.setReplayBarrier(true)
  t.same([ ...legacy.serializeBinary() ], [ 8, 7, 18, 1, 97, 24, 1 ])
  const decoded = puppet.EventRequest.deserializeBinary(legacy.serializeBinary())
  t.equal(decoded.getReplayBarrier(), true)
  t.equal(decoded.getSeq(), 7)
  t.equal(decoded.getAccountId(), 'a')
  t.end()
})

test('replay completion carries a watermark without advancing the business event cursor', t => {
  const response = new puppet.EventResponse()
  response.setType(puppet.EventType.EVENT_TYPE_REPLAY_COMPLETE)
  response.setPayload(JSON.stringify({ accountId: 'account', throughSeq: 42 }))
  const decoded = puppet.EventResponse.deserializeBinary(response.serializeBinary())
  t.equal(decoded.getType(), 40)
  t.equal(decoded.getSeq(), 0)
  t.same(JSON.parse(decoded.getPayload()), { accountId: 'account', throughSeq: 42 })
  t.equal(puppet.EventType.EVENT_TYPE_READY, 23)
  t.equal(puppet.EventType.EVENT_TYPE_ROOM_MEMBER_LOAD, 39)
  t.end()
})
