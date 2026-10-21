# Room member lazy loading (V3)

An adapter may defer loading room members after login. Two events and one RPC
describe that process; room payloads carry no loading state.

| Item | Payload | Meaning |
|---|---|---|
| `EVENT_TYPE_ROOM_MEMBER_LOAD` (39) | `{"roomId":"<id>"}` | Members of this room are now loaded; cached room and member data must be refreshed. |
| `EVENT_TYPE_ROOM_MEMBER_LAZY_LOAD_FINISHED` (41) | `{}` | Every lazily loaded room of the account has its members loaded. |
| `RoomMemberLazyLoadNow` | empty request / response | Load all remaining rooms immediately instead of at the paced rate. |

Event 39 previously carried the retired V1 load-state payload; V1 room payload
fields 13–16 are reserved and must not be reused.
