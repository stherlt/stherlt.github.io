---
layout: ../../layouts/MarkdownPostLayout.astro
title: '| transmission lines'
pubDate: 2023-11-13
description: 'Notes on transmission lines'
preview: "Lorem ipsum"
author: 'Sean'

tags: ["notes"]
---
# Classification of Power Lines
We can define power lines by the following *two* categories:
- Overhead lines
- Underground lines

Voltage Levels:
- Transmission line: 66kV-750kV or higher
- Distribution line: 10kV-45kV
- Utilization line (inside factory): <10kV

We want to learn:
1. how to represent lines as circuit elements
2. how much power can be sent through a power line
3. characteristics of power transmission

**Transmission Lines**
We can observe that large service transmission lines will use 6 conductors in order to run double $3\phi$ lines. 

**Distribution Lines**
Will often have four conductors, one extra for a neutral line

**Conductors**
OH lines usually consist of three conductors, usually aluminum cable steel reinforced (ACSR), steel core for strength, and aluminum for low resistance. We can bundle conductors to reduce corona loss, but bundle conductors can experience greater wind loading. 

**Insulators**
For overhead transmission lines, the conductors are suspended from a pole or a tower via insulators
# Modelling of Power Lines

### **For Short Lines (<80km)** 
![[Diagram 32.svg]]
Here we have a total series impedance of:$$Z=zl=(R+jwl)l$$Where $l$ is line length, and $z$ is the series impedance per unit length

### **For Medium Length (80-250km)**
![[Diagram 33.svg]]
Total Series Impedance:$$Z=zl=(R+jwl)l$$Total shunt admittance:$$Y=yl$$
$y=jwc$ and is the shunt admittance per unit length (Shunt means phase to ground)

We must split the shunt admittance into equal halves and place them at the two ends of the line. This model is called a nominal $\pi$ circuit.

### **For Long Line (>250km)**
![[Diagram 34.svg]]
$$z'=zF_1$$
$$Y'=YF_2$$
Correction Factors: $$F_1=\frac{sinh(rl)}{rl}$$
$$F_2=\frac{tanh(rl/2)}{rl/2}$$$$\text{Propogation Constant: }r=\sqrt{zy}$$
*One can observe these calculations in the textbook in sections 5.2 and 5.3*

This circuit is called the equivalent or exact $\pi$ circuit. There is no approximation made. 

---
## Example:
A $3\phi$ 765kV, 60Hz, 300km line, with:
$z=0.0165+j0.3306 \ohm/km$
$y=j4.674*10^{-6} S/km$ 

*Using these values, find the nominal and exact $\pi$ circuit parameters*

**Solution:**
Nominal $\pi$ parameters:
$Z=zl=(0.0165+j0.3306)300=99.3\angle 87.14 (\ohm)$
$Y/2=\frac{yl}{2}=\frac{j4.674*10^{-6}*300}{2}=7.011*10^{-4}\angle 90 (S)$

Exact $\pi$ Circuit Parameters:

$$rl=\sqrt{zy}l=\sqrt{(0.0165+j0.3306)j4.674*10^{-6}}*300 = 0.3731e^{j88.57}=0.3731\angle 88.57=0.00931+j0.373$$
$$e^{rl}=e^{0.00931+j0.373}=e^{0.00931}e^{j0.373}=-.94+j0.3678$$, $$e^{-rl}=0.9226-j0.361$$
Thus we can *solve for hyperbolic trig* functions:
$$sinh(rl)=\frac{e^{rl}-e^{-rl}}{2}=0.3645\angle88.63$$
$$F_1=\frac{sinh(rl)}{rl}=\frac{0.3645\angle88.63}{0.3731\angle88.57}=0.9769\angle0.06$$
$$F_2=1.012\angle-0.03$$
And so we can Find Z' and Y' using the solved correction parameters:
$$Y'/2=3.7*10^{-7}+j7.095*10^{-4}$$
$$Z'=97\angle 37.2$$

*Comparing the results:*
We can observe that Z' is about 2% smaller then Z and that Y' is about 1% larger than Y/2
We can see that the medium line model is approx. the same for the 300km line

The small shunt conductance ($3.7*10^{-7}$) is typically neglected. (In practice, it is caused by "Corona Effect" a form of loss at high voltage)

---

## **ABCD** Parameters

![[Pasted image 20241125112311.png]]
Here $S$ is the sending line, and $R$ is the receiving line

**Note:**
1. This is the $1\phi$ equivalent
2. $\bar{V}_s$ and $\bar{V}_R$ are line to neutral voltages

Now, ABCD parameters are model parameters, which are functions of $R,L,C,l$

1. ABCD Parameters of a short line:
![[Pasted image 20241125112816.png]]
Now, the parameters must satisfy $AD-BC=1$ for a linear and passive network

2. ABCD Parameters of medium-length line
![[Pasted image 20241125113413.png]]
$$\bar{V}_R+(\bar{I}_R+\bar{I}_{sh1})Z=\bar{V}_R(1+\frac{YZ}{2})+Z\bar{I}_R$$
$$\bar{I}_S=\bar{I}_R+\bar{I}_{sh1}+\bar{I}_{sh2}=\bar{I}_{R}+\frac{Y}{2}\bar{V}_R+\frac{Y}{2}\bar{V}_S$$


---
**The exact** $\pi$ circuit model of a lossless line has the following form:
![[Diagram 48.svg]]
$$Z'=zlF_1=jwLlF_1$$
$$\frac{Y'}{2}=\frac{yl}{2}F_2=\frac{jwCl}{2}F_2$$
$$F_1=\frac{sinh(rl)}{rl},\;F_2=\frac{tanh(rl/2)}{rl/2}$$
Here the propagation constant:
$$r=\sqrt{zy}=\sqrt{(jwL)(jwC)}=jw\sqrt{LC}$$
$$\text{where }B=W\sqrt{LC}$$
$$F_1=\frac{sinh(jBl)}{jBl}=\frac{e^{jBl}-e^{-jBl}}{2jBl}=\frac{jsin(Bl)}{jBl}$$
$$\text{Similarly, } F_2=\frac{tanh(rl/2)}{rl/2}=\frac{tan(Bl/2)}{Bl/2}$$
$$\Rightarrow Z'=jwLlF_1=jZ_csin(Bl)$$
$$\frac{Y'}{2}=\frac{jwcL}{2}F_2=\frac{jwCl}{2}\frac{tan(Bl/2)}{Bl/2}$$

## **Surge Impedance**
The characteristic impedance:$$Z_C=\sqrt{\frac{z}{y}}=\sqrt{\frac{jwL}{jwC}}=\sqrt{\frac{L}{C}}$$
This is typically called the *surge impedance* for a lossless line. We will study surges later in 332 when we talk about motors starting up and such, we also can observe surges when lightning strikes line etc.

For a lossless line, $Z_c$ is typically purely real (resistive), and the propagation constant $r=jB$ is pure imaginary.

# ABCD Parameters
$$\begin{align}\begin{bmatrix} \bar{V}(x)\\ \bar{I}(x)\end{bmatrix}= 
\begin{bmatrix} A(x) & B(x) \\ C(x) & D(x) \end{bmatrix} \times 
\begin{bmatrix}  \bar{V}_r \\ \bar{I}_r \end{bmatrix}\end{align}$$
$$Now: A(x)=D(x)=cosh(rx)=cosh(jBx)=\frac{e^{jBx}+e^{-jBx}}{2}=cos(Bx)$$
$$And: sinh(rx)=sinh(jBx)=jsin(Bx)$$
$$B(x)=Z_Csinh(rx)=jZ_csinh(Bx)$$
$$C(x)=Z_C^{-1}sinh(rx)=j\frac{1}{Z_c}sinh(Bx)$$
*Here, A and D are real, and C and B are imaginary*

## Wavelength of a Line
A wavelength is the distance required to change the phase of the voltage by $360deg$.

**From the ABCD Model:** $\bar{V}(x)=A(x)\bar{V}_R+B(x)\bar{I}_R=cos(Bx)\bar{V}_R+j\frac{L}{C}sin(Bx)\bar{I}_R$ 

So $\bar{V}(x)$ changes phase by $2\pi$ when $x=\frac{2\pi}{B}$, ($B=W\sqrt{WL}$)$$\text{Wavelength: }\lambda=\frac{2\pi}{B}=\frac{2\pi}{W\sqrt{LC}}=\frac{1}{f\sqrt{LC}}$$
Typically $f=60Hz$, $\frac{1}{\sqrt{LC}}\approx 3*10^8m/s$, so: $$\lambda=\frac{3*10^8}{60}=5000km$$ So typical line length is only a small fraction of the wavelength. For typical transmission lines:
![[Diagram 49.svg]]