/* eslint-disable sort-keys */
import type {
  puppet,
}                       from '../src/mod.js'

type IPuppetServer = puppet.IPuppetServer

/**
 * Implements the SayHello RPC method.
 */
export const puppetServerImpl: IPuppetServer = {

  contactAlias: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  contactAvatar: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  contactCorporationRemark: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented')
  },

  contactDescription: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented')
  },

  contactDelete: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented')
  },

  contactList: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  contactPayload: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  contactPhone: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  contactSelfName: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  contactSelfRealName: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  contactSelfAka: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  contactPayloadModify: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  contactSelfQRCode: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  contactSelfSignature: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  contactSelfRoomAlias: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  conversationRead: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  ding: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  currentUser: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  dirtyPayload: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  event: (streamnigCall: any) => {
    void streamnigCall
    throw new Error('not implemented.')

  },

  friendshipAccept: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  friendshipAdd: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  friendshipPayload: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  friendshipSearchPhone: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  friendshipSearchWeixin: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  friendshipSearchHandle: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  logout: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageContact: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageFile: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageCallRecord: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageChatHistory: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageForward: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageImage: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageLocation: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageMiniProgram: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messagePayload: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageRecall: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageSendContact: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageSendFile: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageSendLocation: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageSendMiniProgram: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageSendText: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageSendUrl: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageUrl: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageSendChannel: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messageChannel: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  messagePreview: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  getMessageBroadcastTarget: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  createMessageBroadcast: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  getMessageBroadcastStatus: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomAdd: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomAnnounce: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomAvatar: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomCreate: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomDel: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomInvitationAccept: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomInvitationPayload: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomList: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomMemberList: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomMemberPayload: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomPayload: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomQRCode: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomQuit: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomTopic: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomRemark: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomOwnerTransfer: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomDismiss: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomPermission: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomAddAdmins: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  roomDelAdmins: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  start: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  stop: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  tagContactTagAdd: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  tagContactTagRemove: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  tagGroupAdd: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  tagGroupDelete: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  tagTagAdd: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  tagTagDelete: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  tagGroupList: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  tagGroupTagList: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  tagTagList: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  tagContactTagList: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  tagTagContactList: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  tagPayload: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  tagGroupPayload: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  momentPublish: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  momentUnpublish: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  postTap: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  momentSignature: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  momentCoverage: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  postPayload: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  postPayloadSayable: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  momentVisibleList: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  version: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  enterVerifyCode: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  cancelVerifyCode: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  refreshQRCode: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  getContactExternalUserId: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  GetRoomAntiSpamStrategyList: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  GetRoomAntiSpamStrategyEffectRoomList: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  ApplyRoomAntiSpamStrategy: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

  download: (call: any) => {
    void call
    throw new Error('not implemented.')
  },

  upload: (call: any, callback: any) => {
    void call
    void callback
    throw new Error('not implemented.')
  },

}
