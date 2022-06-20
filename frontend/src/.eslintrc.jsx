/* eslint-disable import/no-anonymous-default-export */
export default {
  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "react/prop-types": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    endOfLine: process.platform === "win32" ? "auto" : 0,
    "react/react-in-jsx-scope": 0,
  },
};
