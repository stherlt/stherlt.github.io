import { c as createComponent, r as renderTemplate, d as renderComponent, e as renderHead, a as addAttribute, b as createAstro } from '../chunks/astro/server_DkA2uQqp.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                                 */
import { $ as $$Footer, a as $$Navigation } from '../chunks/Footer_B_U4K2oF.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Gallery = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Gallery;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-sahthylw> <head><link rel="icon" type="image/png" href="/favicon.png"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="generator"', '><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Rubik+Mono+One&display=swap" rel="stylesheet"><title>| GALLERY</title><!--Tab title--><script defer src="/src/app/appscroll.js"><\/script>', "", '</head> <body class="animatein" data-astro-cid-sahthylw> <h1 class="fancy" data-astro-cid-sahthylw>| GALLERY</h1> <p class="skinny" data-astro-cid-sahthylw> THIS PAGE IS UNDER CONSTRUCTION...</p> <hr class="divider" data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <br data-astro-cid-sahthylw> <hr class="divider" data-astro-cid-sahthylw> ', " </body></html>"])), addAttribute(Astro2.generator, "content"), renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-sahthylw": true }), renderHead(), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-sahthylw": true }));
}, "C:/Users/sther/strltWEBFULL/src/pages/gallery.astro", void 0);

const $$file = "C:/Users/sther/strltWEBFULL/src/pages/gallery.astro";
const $$url = "/gallery";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Gallery,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
