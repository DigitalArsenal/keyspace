import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import builtins from "rollup-plugin-polyfill-node";

export default {
  input: "./node_modules/bitcoinjs-lib/src/index.js",
  output: {
    dir: "lib",
    format: "cjs"
  },
  plugins: [builtins(), nodeResolve(), commonjs()]
};
