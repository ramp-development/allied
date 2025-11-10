import { cursor } from './cursor';
import { nav } from './nav';
import { textLoop } from './text-loop';
import { time } from './time';

export const components = () => {
  time();
  cursor();
  nav();
  textLoop();
};
