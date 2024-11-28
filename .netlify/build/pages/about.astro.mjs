import { c as createComponent, r as renderTemplate, d as renderComponent, e as renderHead, a as addAttribute, b as createAstro } from '../chunks/astro/server_DkA2uQqp.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                                 */
import { $ as $$Footer, a as $$Navigation } from '../chunks/Footer_B_U4K2oF.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-kh7btl4r> <head><meta charset="utf-8"><link rel="icon" type="image/png" href="/favicon.png"><meta name="viewport" content="width=device-width"><meta name="generator"', '><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Rubik+Mono+One&display=swap" rel="stylesheet"><title>| ABOUT</title><!--Tab title--><script defer src="/src/app/appscroll.js"><\/script>', "", '</head> <body class="animatein" data-astro-cid-kh7btl4r> <h1 class="fancy" data-astro-cid-kh7btl4r>| ABOUT</h1> <p class="skinny" data-astro-cid-kh7btl4r> blah blah blah</p> <hr class="divider" data-astro-cid-kh7btl4r> <section class="s3 hidden" data-astro-cid-kh7btl4r> <h1 class="fsmall" data-astro-cid-kh7btl4r> EXTRACURRICULARS </h1> <p class="skinny" data-astro-cid-kh7btl4r> I have worked on mutiple projects in my free time which are relevant to my\n</p> </section> <section class="s3 hidden" data-astro-cid-kh7btl4r> <h1 class="fsmall" data-astro-cid-kh7btl4r> HOBBIES</h1> <p class="skinny" data-astro-cid-kh7btl4r> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu ullamcorper diam. Maecenas sit amet tempor ex. Aliquam quis augue sed magna cursus malesuada. Praesent placerat consectetur commodo. Ut sed mauris euismod mauris ornare consequat.</p> </section> <section class="s3 hidden" data-astro-cid-kh7btl4r> <h1 class="fsmall" data-astro-cid-kh7btl4r>| NOTES</h1> <p class="skinny" data-astro-cid-kh7btl4r> Access my online notes!</p> <a class="LINKBOX" href="/notes/" data-astro-cid-kh7btl4r>Check It Out</a> </section> <hr class="divider" data-astro-cid-kh7btl4r> ', " </body></html>"])), addAttribute(Astro2.generator, "content"), renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-kh7btl4r": true }), renderHead(), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-kh7btl4r": true }));
}, "C:/Users/sther/strltWEBFULL/src/pages/about.astro", void 0);

const $$file = "C:/Users/sther/strltWEBFULL/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
