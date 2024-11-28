---
title: '| IR Pinger'
misc: 'created in '
---

Links: [[340 INDEX]]


## Reconstruction in Time Domain

$$f[k] \rightarrow^{kT=t} \bar{f}(t) \rightarrow^{interpolation}f_{r}(t)$$ 
Interpolation - done through ideal low pass filtering (ILPF) for reconstruction:
$F_{r}(w)=\bar{F}(w)H(w)$ (we multiply these two Fourier transforms together)
*Then* we must find the *inverse Fourier transform* such that: $f_{r}(t)=\bar{f}(t)*h(t)$, now what is $h(t)?$ 

$$h(t)=\int_{-\infty}^{\infty}H(w)e^{jwt}dw=\frac{T}{2\pi}\int_{-\frac{W_s}{2}}^{W_s/2}e^{jwt}dw$$
for $t=0, h(t)=1$, for $t \neq 0$:
$$h(t)=\frac{T}{2jt\pi}\left( e^{\frac{jtW_s}{2}}-e^{-\frac{jtW_s}{2}} \right)=\frac{sin\left( \frac{t\pi}{T} \right)}{\frac{t\pi}{T}}$$
$\therefore h(t)=sinc(\frac{t}{T})$

*now for* $f_r(t)$:
$$f_r(t)=\sum_{n=-\infty}^{\infty}f(nT)\delta(t-nT)*h(t)=\sum_{n=-\infty}^{\infty}f(nT)h(t-nT)$$
$$=...f(-T)h(t+T)+f(0)h(t)+f(T)h(t-T)+...$$
> ***Note*** $\sum_{n=-\infty}^{\infty}f(nT)\delta(t-nT)=\bar{f}(t)$

Then we can reconstruct by *ILPF:* in time domain, the reconstructed signal $f_r(t)$ is obtained by scaling and shifting $h(t)=sinc(\frac{t}{T})$ and superimposing them - *interpolation*
$W_s$ is fixed: $W_{max}\leq \frac{W_s}{2}$
## MATLAB Demonstration:

We will take the signal: $$f(t)=e^{-0.8|t|}$$
- Prof then ran this through MATLAB showed us what it would look like


## Anti Aliasing

![[Diagram 10.svg]]

$$
H_{aa}(w)=\begin{cases} 
      
      1 & |w|\leq \frac{W_s}{2} \\
      0 & otherwise 
   \end{cases}
$$


**Summary:**
![[Diagram 11.svg]]
Models: $h[k]$: unit impulse response, $y[k]=h[k]*f[k]$ and difference equation