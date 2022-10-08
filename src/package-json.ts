/**
 * This file was auto generated from scripts/generate-version.sh
 */
import type { PackageJson } from 'type-fest'
export const packageJson: PackageJson = {
  "name": "@juzi/wechaty-grpc",
  "version": "1.0.18",
  "description": "gRPC for Wechaty",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/esm/src/mod.js",
      "require": "./dist/cjs/src/mod.js"
    }
  },
  "typings": "./dist/esm/src/mod.d.ts",
  "engines": {
    "node": ">=16",
    "npm": ">=7"
  },
  "scripts": {
    "clean": "shx rm -fr dist/* out/*",
    "dist": "npm-run-all clean generate build dist:copy dist:commonjs",
    "build": "tsc && tsc -p tsconfig.cjs.json",
    "dist:commonjs": "jq -n \"{ type: \\\"commonjs\\\" }\" > dist/cjs/package.json",
    "dist:copy": "npm-run-all copy:esm copy:cjs",
    "copy:esm": "shx cp -R out/ dist/esm && shx cp -R proto/ dist/esm && shx cp -R commonjs/ dist/esm/",
    "copy:cjs": "shx cp -R out/ dist/cjs && shx cp -R proto/ dist/cjs && shx cp -R commonjs/ dist/cjs/",
    "dist:py": "python3 setup.py sdist bdist_wheel",
    "publish:py": "twine upload dist/*",
    "example:server": "nodemon --exec ts-node examples/server.ts",
    "example:client": "ts-node examples/client.ts",
    "generate": "bash -x scripts/generate-stub.sh",
    "lint": "npm-run-all lint:es lint:ts lint:proto",
    "lint:es": "eslint --ignore-pattern fixtures/ \"src/**/*.ts\" \"tests/**/*.ts\" \"examples/**/*.ts\"",
    "lint:ts": "tsc --isolatedModules --noEmit",
    "lint:proto": "echo \"SKIP proto lint due to not support options\" || bash -c 'protoc -I third-party -I proto --lint_out=sort_imports:. $(find proto/ -type f -name *.proto)'",
    "install:protoc": "bash -x scripts/install-protoc.sh",
    "test": "npm-run-all lint test:unit test:commonjs",
    "test:pack": "bash -x scripts/npm-pack-testing.sh",
    "test:unit": "cross-env NODE_OPTIONS=\"--no-warnings --loader=ts-node/esm\" tap \"src/**/*.spec.ts\" \"tests/**/*.spec.ts\"",
    "test:commonjs": "cross-env TS_NODE_PROJECT=tsconfig.cjs.json NODE_OPTIONS=--require=ts-node/register tap \"commonjs/**/*.spec.ts\""
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/juzibot/wechaty-grpc.git"
  },
  "keywords": [
    "grpc",
    "chatie",
    "chatbot",
    "hostie",
    "puppet",
    "wechaty"
  ],
  "author": "Huan LI <zixia@zixia.net>",
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/juzibot/wechaty-grpc/issues"
  },
  "homepage": "https://github.com/juzibot/wechaty-grpc#readme",
  "dependencies": {
    "@grpc/grpc-js": "^1.3.7",
    "google-protobuf": "^3.18.0",
    "stronger-typed-streams": "^0.2.0"
  },
  "devDependencies": {
    "@chatie/eslint-config": "^0.14.1",
    "@chatie/semver": "^0.4.7",
    "@chatie/tsconfig": "^0.20.2",
    "@types/google-protobuf": "^3.15.5",
    "@types/protobufjs": "^6.0.0",
    "cross-env": "^7.0.3",
    "grpc_tools_node_protoc_ts": "^5.3.2",
    "grpc-tools": "^1.11.2",
    "grpcc": "^1.1.3",
    "nodemon": "^2.0.12",
    "npm-run-all": "^4.1.5",
    "request": "^2.88.2",
    "shx": "^0.3.3",
    "ts-protoc-gen": "^0.15.0",
    "tstest": "^0.7.3"
  },
  "files": [
    "bin/",
    "dist/",
    "out/",
    "src/"
  ],
  "publishConfig": {
    "access": "public",
    "tag": "next"
  },
  "tap": {
    "check-coverage": false
  }
} as any
