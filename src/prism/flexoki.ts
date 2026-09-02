/**
 * Flexoki syntax themes for prism-react-renderer.
 *
 * Token colors are transposed from the official Flexoki VS Code port
 * (flexoki-main/vscode/*.json) onto Prism's token names. Flexoki uses
 * 600-level accents on paper for light and 400-level on black for dark;
 * the two themes below are exact mirrors of each other.
 *
 * Flexoki by Steph Ango — https://stephango.com/flexoki (MIT).
 */
import type {PrismTheme} from 'prism-react-renderer';

type Ramp = {
  fg: string;
  bg: string;
  muted: string;
  faint: string;
  red: string;
  orange: string;
  yellow: string;
  green: string;
  cyan: string;
  blue: string;
  purple: string;
  magenta: string;
};

const light: Ramp = {
  fg: '#100F0F', // black
  bg: '#F2F0E5', // base-50, lifted off the paper page background
  muted: '#6F6E69', // base-600 — comments, punctuation
  faint: '#B7B5AC', // base-300 — doc comments
  red: '#AF3029',
  orange: '#BC5215',
  yellow: '#AD8301',
  green: '#66800B',
  cyan: '#24837B',
  blue: '#205EA6',
  purple: '#5E409D',
  magenta: '#A02F6F',
};

const dark: Ramp = {
  fg: '#CECDC3', // base-200
  bg: '#1C1B1A', // base-950, lifted off the black page background
  muted: '#878580', // base-500
  faint: '#575653', // base-700
  red: '#D14D41',
  orange: '#DA702C',
  yellow: '#D0A215',
  green: '#879A39',
  cyan: '#3AA99F',
  blue: '#4385BE',
  purple: '#8B7EC8',
  magenta: '#CE5D97',
};

function buildTheme(c: Ramp): PrismTheme {
  return {
    plain: {
      color: c.fg,
      backgroundColor: c.bg,
    },
    styles: [
      {types: ['comment', 'prolog', 'cdata'], style: {color: c.muted, fontStyle: 'italic'}},
      {types: ['doctype'], style: {color: c.faint}},
      {types: ['punctuation'], style: {color: c.muted}},
      {types: ['keyword', 'atrule'], style: {color: c.green}},
      {types: ['operator'], style: {color: c.red}},
      {types: ['string', 'char', 'attr-value', 'regex'], style: {color: c.cyan}},
      {types: ['builtin'], style: {color: c.cyan}},
      {types: ['number'], style: {color: c.purple}},
      {types: ['boolean', 'attr-name', 'entity', 'namespace', 'selector'], style: {color: c.yellow}},
      {types: ['tag', 'url', 'property'], style: {color: c.blue}},
      {types: ['class-name'], style: {color: c.orange}},
      {types: ['function'], style: {color: c.orange, fontWeight: 'bold'}},
      {types: ['symbol'], style: {color: c.magenta}},
      {types: ['variable', 'constant'], style: {color: c.fg}},
      {types: ['inserted'], style: {color: c.green}},
      {types: ['deleted'], style: {color: c.red}},
      {types: ['important'], style: {color: c.red, fontWeight: 'bold'}},
    ],
  };
}

export const flexokiLight = buildTheme(light);
export const flexokiDark = buildTheme(dark);
