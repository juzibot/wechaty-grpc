# Opt-in event replay barrier

`EventRequest.replay_barrier` (field 3) defaults to false. A server sends
`EVENT_TYPE_REPLAY_COMPLETE` (40) only to streams requesting this capability.
Existing LOGIN and READY events retain their account lifecycle meanings.

The completion event has envelope `seq = 0` and a JSON payload:

```json
{"accountId":"current-account","throughSeq":42}
```

`accountId` is a string identifying the account on this stream. `throughSeq`
is a non-negative int32 identifying the fixed, durably stored replay watermark.
The server sends eligible replay events in ascending sequence through that
watermark before the marker, and orders subsequent live events after it.
An empty replay still produces a marker. The marker is not stored as a business
event and does not itself advance the client's durable event cursor.

Clients process the marker in their serial event-processing queue. Recovery
requires the same account's LOGIN, READY and processed replay marker on the
current stream generation. A stale stream cannot complete a newer recovery.
This acknowledges SDK event processing, not completion of all asynchronous
application listeners.

Older servers may ignore the request field. Absence of the marker must not be
treated as successful negotiated recovery. Roll out the server capability
before enabling strict recovery clients; keep the feature opt-in.
