const { createContext } = require("react");

//mimicking useState
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;