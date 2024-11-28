import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, d as renderComponent, e as renderHead, a as addAttribute, b as createAstro } from '../chunks/astro/server_DkA2uQqp.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                                 */
import { $ as $$Footer, a as $$Navigation } from '../chunks/Footer_B_U4K2oF.mjs';
import 'clsx';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const html = "<p>Links: [[340 INDEX]]</p>\n<h2 id=\"reconstruction-in-time-domain\">Reconstruction in Time Domain</h2>\n<p>$$f[k] \\rightarrow^{kT=t} \\bar{f}(t) \\rightarrow^{interpolation}f_{r}(t)$$\r\nInterpolation - done through ideal low pass filtering (ILPF) for reconstruction:\r\n$F_{r}(w)=\\bar{F}(w)H(w)$ (we multiply these two Fourier transforms together)\r\n<em>Then</em> we must find the <em>inverse Fourier transform</em> such that: $f_{r}(t)=\\bar{f}(t)*h(t)$, now what is $h(t)?$</p>\n<p>$$h(t)=\\int_{-\\infty}^{\\infty}H(w)e^{jwt}dw=\\frac{T}{2\\pi}\\int_{-\\frac{W_s}{2}}^{W_s/2}e^{jwt}dw$$\r\nfor $t=0, h(t)=1$, for $t \\neq 0$:\r\n$$h(t)=\\frac{T}{2jt\\pi}\\left( e^{\\frac{jtW_s}{2}}-e^{-\\frac{jtW_s}{2}} \\right)=\\frac{sin\\left( \\frac{t\\pi}{T} \\right)}{\\frac{t\\pi}{T}}$$\r\n$\\therefore h(t)=sinc(\\frac{t}{T})$</p>\n<p><em>now for</em> $f_r(t)$:\r\n$$f_r(t)=\\sum_{n=-\\infty}^{\\infty}f(nT)\\delta(t-nT)*h(t)=\\sum_{n=-\\infty}^{\\infty}f(nT)h(t-nT)$$\r\n$$=…f(-T)h(t+T)+f(0)h(t)+f(T)h(t-T)+…$$</p>\n<blockquote>\n<p><em><strong>Note</strong></em> $\\sum_{n=-\\infty}^{\\infty}f(nT)\\delta(t-nT)=\\bar{f}(t)$</p>\n</blockquote>\n<p>Then we can reconstruct by <em>ILPF:</em> in time domain, the reconstructed signal $f_r(t)$ is obtained by scaling and shifting $h(t)=sinc(\\frac{t}{T})$ and superimposing them - <em>interpolation</em>\r\n$W_s$ is fixed: $W_{max}\\leq \\frac{W_s}{2}$</p>\n<h2 id=\"matlab-demonstration\">MATLAB Demonstration:</h2>\n<p>We will take the signal: $$f(t)=e^{-0.8|t|}$$</p>\n<ul>\n<li>Prof then ran this through MATLAB showed us what it would look like</li>\n</ul>\n<h2 id=\"anti-aliasing\">Anti Aliasing</h2>\n<p>![[Diagram 10.svg]]</p>\n<p>$$\r\nH_{aa}(w)=\\begin{cases}</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"plaintext\"><code><span class=\"line\"><span>  1 &#x26; |w|\\leq \\frac{W_s}{2} \\\\</span></span>\n<span class=\"line\"><span>  0 &#x26; otherwise </span></span>\n<span class=\"line\"><span></span></span></code></pre>\n<p>\\end{cases}\r\n$$</p>\n<p><strong>Summary:</strong>\r\n![[Diagram 11.svg]]\r\nModels: $h[k]$: unit impulse response, $y[k]=h[k]*f[k]$ and difference equation</p>";

				const frontmatter = {"title":"| IR Pinger","misc":"created in "};
				const file = "C:/Users/sther/strltWEBFULL/src/projects/project1.md";
				const url = undefined;
				function rawContent() {
					return "\r\nLinks: [[340 INDEX]]\r\n\r\n\r\n## Reconstruction in Time Domain\r\n\r\n$$f[k] \\rightarrow^{kT=t} \\bar{f}(t) \\rightarrow^{interpolation}f_{r}(t)$$ \r\nInterpolation - done through ideal low pass filtering (ILPF) for reconstruction:\r\n$F_{r}(w)=\\bar{F}(w)H(w)$ (we multiply these two Fourier transforms together)\r\n*Then* we must find the *inverse Fourier transform* such that: $f_{r}(t)=\\bar{f}(t)*h(t)$, now what is $h(t)?$ \r\n\r\n$$h(t)=\\int_{-\\infty}^{\\infty}H(w)e^{jwt}dw=\\frac{T}{2\\pi}\\int_{-\\frac{W_s}{2}}^{W_s/2}e^{jwt}dw$$\r\nfor $t=0, h(t)=1$, for $t \\neq 0$:\r\n$$h(t)=\\frac{T}{2jt\\pi}\\left( e^{\\frac{jtW_s}{2}}-e^{-\\frac{jtW_s}{2}} \\right)=\\frac{sin\\left( \\frac{t\\pi}{T} \\right)}{\\frac{t\\pi}{T}}$$\r\n$\\therefore h(t)=sinc(\\frac{t}{T})$\r\n\r\n*now for* $f_r(t)$:\r\n$$f_r(t)=\\sum_{n=-\\infty}^{\\infty}f(nT)\\delta(t-nT)*h(t)=\\sum_{n=-\\infty}^{\\infty}f(nT)h(t-nT)$$\r\n$$=...f(-T)h(t+T)+f(0)h(t)+f(T)h(t-T)+...$$\r\n> ***Note*** $\\sum_{n=-\\infty}^{\\infty}f(nT)\\delta(t-nT)=\\bar{f}(t)$\r\n\r\nThen we can reconstruct by *ILPF:* in time domain, the reconstructed signal $f_r(t)$ is obtained by scaling and shifting $h(t)=sinc(\\frac{t}{T})$ and superimposing them - *interpolation*\r\n$W_s$ is fixed: $W_{max}\\leq \\frac{W_s}{2}$\r\n## MATLAB Demonstration:\r\n\r\nWe will take the signal: $$f(t)=e^{-0.8|t|}$$\r\n- Prof then ran this through MATLAB showed us what it would look like\r\n\r\n\r\n## Anti Aliasing\r\n\r\n![[Diagram 10.svg]]\r\n\r\n$$\r\nH_{aa}(w)=\\begin{cases} \r\n      \r\n      1 & |w|\\leq \\frac{W_s}{2} \\\\\r\n      0 & otherwise \r\n   \\end{cases}\r\n$$\r\n\r\n\r\n**Summary:**\r\n![[Diagram 11.svg]]\r\nModels: $h[k]$: unit impulse response, $y[k]=h[k]*f[k]$ and difference equation";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"reconstruction-in-time-domain","text":"Reconstruction in Time Domain"},{"depth":2,"slug":"matlab-demonstration","text":"MATLAB Demonstration:"},{"depth":2,"slug":"anti-aliasing","text":"Anti Aliasing"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

const greatPost = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Project1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Project1;
  const { frontmatter, Content } = greatPost;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-rcpg5hth> <head><meta charset="utf-8"><link rel="icon" type="image/png" href="/favicon.png"><meta name="viewport" content="width=device-width"><meta name="generator"', '><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+" crossorigin="anonymous"><!-- The loading of KaTeX is deferred to speed up page rendering --><script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js" integrity="sha384-7zkQWkzuo3B5mTepMUcHkMB5jZaolc2xDwL6VFqjFALcbeS9Ggm/Yr2r3Dy4lfFg" crossorigin="anonymous"><\/script><!-- To automatically render math in text elements, include the auto-render extension: --><script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" integrity="sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk" crossorigin="anonymous" onload="renderMathInElement(document.body);"><\/script><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Rubik+Mono+One&display=swap" rel="stylesheet"><title>| PROJECTS</title><!--Tab title--><script defer src="/src/app/appscroll.js"><\/script>', "", '</head> <body class="animatein" data-astro-cid-rcpg5hth> <h1 class="fancy" data-astro-cid-rcpg5hth>', '</h1> <p class="skinny" data-astro-cid-rcpg5hth>', '</p> <hr class="divider" data-astro-cid-rcpg5hth> <section data-astro-cid-rcpg5hth> ', ' </section> <hr class="divider" data-astro-cid-rcpg5hth> ', " </body></html>"])), addAttribute(Astro2.generator, "content"), renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-rcpg5hth": true }), renderHead(), frontmatter.title, frontmatter.misc, renderComponent($$result, "Content", Content, { "data-astro-cid-rcpg5hth": true }), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-rcpg5hth": true }));
}, "C:/Users/sther/strltWEBFULL/src/pages/project1.astro", void 0);

const $$file = "C:/Users/sther/strltWEBFULL/src/pages/project1.astro";
const $$url = "/project1";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Project1,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
