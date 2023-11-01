// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import path from "path";
// import nodePolyfills from 'rollup-plugin-node-polyfills';

const NODE_ENV = process.env.NODE_ENV || "test";
console.log("NODE_ENV", NODE_ENV);

export default {
  input: "src/index.ts",
  output: {
    name: "EVM",
    file: "dist/evm.js",
    format: "umd",
  },
  plugins: [
    typescript({
      sourceMap: true
    }),
    resolve(),
    commonjs({ extensions: [".js", ".ts"] }),
  ],
};
