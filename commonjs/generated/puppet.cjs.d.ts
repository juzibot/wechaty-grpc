/**
 * Huan(202108)
 *
 *  Re-exporting namespace declarations in ES6 ambient declaration #4336
 *    https://github.com/microsoft/TypeScript/issues/4336
 */

/**
 * Huan(202108): I want to `declare namespace puppet {...}`
 *  but it seemss the `export * from '../out/...js` is not working
 *
 * So I export them on the top level,
 *  then import them in another `puppet.js` file
 *  with the `puppet` namespace
 *
 * This is because the ESM module system need to do the following things
 *  when import a CJS module:
 *
 *  ```ts
 *  import pkg from './cjs-pkg'
 *  const puppet = pkg['puppet']
 *  ```
 */
export * from '../../out/wechaty/puppet/base_pb.js'
export * from '../../out/wechaty/puppet/contact_pb.js'
export * from '../../out/wechaty/puppet/download-upload_pb.js'
export * from '../../out/wechaty/puppet/event_pb.js'
export * from '../../out/wechaty/puppet/friendship_pb.js'
export * from '../../out/wechaty/puppet/location_pb.js'
export * from '../../out/wechaty/puppet/message_pb.js'
export * from '../../out/wechaty/puppet/mini-program_pb.js'
export * from '../../out/wechaty/puppet/referrer_pb.js'
export * from '../../out/wechaty/puppet/room_pb.js'
export * from '../../out/wechaty/puppet/room-invitation_pb.js'
export * from '../../out/wechaty/puppet/room-member_pb.js'
export * from '../../out/wechaty/puppet/tag_pb.js'
export * from '../../out/wechaty/puppet/url-link_pb.js'
export * from '../../out/wechaty/puppet/channel_pb.js'
export * from '../../out/wechaty/puppet/moment_pb.js'
export * from '../../out/wechaty/puppet/post_pb.js'
export * from '../../out/wechaty/puppet/conversation_pb.js'
export * from '../../out/wechaty/puppet/util_pb.js'
export * from '../../out/wechaty/puppet/verify-code_pb.js'
export * from '../../out/wechaty/puppet/call_pb.js'
export * from '../../out/wechaty/puppet/chat-history_pb.js'
export * from '../../out/wechaty/puppet/wecom_pb.js'

export * from '../../out/wechaty/puppet_grpc_pb.js'
export * from '../../out/wechaty/puppet_pb.js'
