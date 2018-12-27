const builder = {
  buildJS: componentName => `import React from "react";
  import PropTypes from "prop-types";
  function ${componentName}() {

  }

  export default ${componentName};
  `
};

module.exports = builder;
