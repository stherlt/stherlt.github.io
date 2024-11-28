import { c as createComponent, r as renderTemplate, d as renderComponent, a as addAttribute, e as renderHead, b as createAstro } from '../chunks/astro/server_DkA2uQqp.mjs';
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
const $$Notes = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Notes;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-42n6zz5n> <head><meta charset="utf-8"><link rel="icon" type="image/png" href="/favicon.png"><meta name="viewport" content="width=device-width"><meta name="generator"', '><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Rubik+Mono+One&display=swap" rel="stylesheet"><title>| NOTES</title><!--Tab title--><script defer src="/src/app/appscroll.js"><\/script>', "", '</head> <body class="animatein" data-astro-cid-42n6zz5n> <h1 class="fancy" data-astro-cid-42n6zz5n>| NOTES</h1> <p class="skinny" data-astro-cid-42n6zz5n> check out some of my projects</p> <hr class="divider" data-astro-cid-42n6zz5n> <section class="project s4" data-astro-cid-42n6zz5n> <div data-astro-cid-42n6zz5n> <h2 class="fancy" data-astro-cid-42n6zz5n>| IR MESSENGER</h2> <p class="skinny" data-astro-cid-42n6zz5n> During HackED 2024 Hackathon prototyped a hardware/software hybrid project with a team of engineering students, aimed at supporting patients who routinely take medication.\n</p> <a', ' class="LINKBOX" data-astro-cid-42n6zz5n>', '</a> </div> <img src="/public/demo_img_2.jpg" alt="Description" class="img" data-astro-cid-42n6zz5n> </section> <hr class="divider" data-astro-cid-42n6zz5n> ', " </body></html>"])), addAttribute(Astro2.generator, "content"), renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-42n6zz5n": true }), renderHead(), addAttribute(`/notespage/${note.slug}`, "href"), note.frontmatter.title, renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-42n6zz5n": true }));
}, "C:/Users/sther/strltWEBFULL/src/pages/notes.astro", void 0);

const $$file = "C:/Users/sther/strltWEBFULL/src/pages/notes.astro";
const $$url = "/notes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Notes,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
