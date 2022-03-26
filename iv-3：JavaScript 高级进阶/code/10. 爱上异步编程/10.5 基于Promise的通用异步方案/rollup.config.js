// rollup.config.js
// import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from 'rollup-plugin-typescript2';

// import nodePolyfills from 'rollup-plugin-node-polyfills';

const NODE_ENV = process.env.NODE_ENV || "test";
console.log("NODE_ENV", NODE_ENV);

export default {
  input: "src/index.ts",
  output: {
    name: "AsyncMessager",
    file: "dist/asyncMessager.js",
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
