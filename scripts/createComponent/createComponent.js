const fs = require("fs");
const path = require("path");
const { buildJS } = require("./builder");
const { capitalizeFirstLetter } = require("../../common/utils/string-utils");

const componentPath = "src/components/presentational";
const fileNamePrefix = {
  js: ".js",
  jsx: ".jsx"
};

const findRoot = () => {
  let thisPath = path.resolve(__dirname);
  while (!fs.existsSync(path.join(thisPath, "package.json"))) {
    thisPath = path.join(thisPath, "..");
  }

  return thisPath;
};

const doesPageExist = (componentName, root) => {
  const newPath = path.join(root, componentPath, componentName);
  if (
    fs.existsSync(newPath + fileNamePrefix.js) ||
    fs.existsSync(newPath + fileNamePrefix.jsx)
  ) {
    console.log(`Page ${componentName} already exists`);
    return true;
  }

  return false;
};

const createComponentTitle = componentName =>
  componentName
    .split("_")
    .map(word => capitalizeFirstLetter(word[0]) + word.slice(1))
    .join(" ");

const createComponent = (root, componentName) => {
  const isNotValidComponentName =
    componentName.includes("-") || componentName.includes(" ");
  if (isNotValidComponentName) {
    console.log(
      `Component: ${componentName} wasn't created because of a dash or space in its name.`
    );
    return false;
  }

  const componentAbsolutePath = `${path.join(root, componentName)}.jsx`;
  const componentTitle = createComponentTitle(componentName);
  const componentData = buildJS(componentTitle);

  console.log(`Creating file: ${componentName}`);

  try {
    fs.writeFileSync(componentAbsolutePath, componentData);
  } catch (error) {
    console.log(error);
  }

  console.log(`File created: ${componentAbsolutePath}`);
};

(() => {
  const root = findRoot();
  process.argv
    .slice(2)
    .filter(componentName => doesPageExist(componentName, root) === false)
    .map(componentName =>
      createComponent(path.join(root, componentPath), componentName)
    );
})();
