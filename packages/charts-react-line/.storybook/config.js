import { configure, addDecorator, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import centered from '@kadira/react-storybook-decorator-centered';

addDecorator(centered);
setAddon(infoAddon);

const req = require.context('../src', true, /[A-Z][a-z]*\.story\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
