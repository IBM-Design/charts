import data from './data';
import Radar from '../';

const a = new Radar('svg', data, {
  'size': 800,
  'margins': {top: 70, right: 70, bottom: 70, left: 70},
  'colors': ['#EDC951', '#CC333F', '#00A0B0'],
  'units': '%',
  'levels': 5,
  'opacityArea': 0.4,
  'labelFactor': 30,
  'shape': 'circle',
  'wrapWidth': 60,
});

a.draw();
