const builder = {
  buildJS: (componentName, ...params) => `import React from "react";
  import PropTypes from "prop-types";
  function ${componentName}({ ${params.split(",")} }) {

  }

  export default ${componentName};
  `
};

module.exports = builder;
