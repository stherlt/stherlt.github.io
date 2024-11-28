Links: [[330 INDEX]]
*Methods To Compute Power*

1. By the definition of power:
$$P=VIcos(\theta_V-\theta_I)$$
$$Q=VIsin(\theta_V-\theta_I)$$
$$S=VI, \; PF=P/S=cos(\theta_V-\theta_I)$$

2. Using Complex Power:
$$\bar{S}=\bar{V}\bar{I}^*=p+jQ, \; S=|\bar{S}|\;(apparent\; power)$$
3. Based on impedance:
$$\bar{V}=(R+jX)\bar{I}$$
$$\bar{S}=\bar{V}\bar{I}=(R+jX)\bar{I}\bar{I}^*=(R+jX)I^2$$
$$=RI^2+jXI^2 \rightarrow \; p=RI^2, \; Q=XI^2$$
Remarks:
	P is related to R (energy use)
	Q is related to X (energy storage)
Using:
$$Q=XI^2$$
	- this leads to an easier but not quite correct notation of Q: Q is the power "consumed" by X
	- If reactance X is negative (i.e a capacitor), Q is "generated" (due to the phase angle difference)

**Example**
Lets consider a parallel capacitor and inductor cct, here the phase angles of power for current to inductor will be offset by 180 degrees. 
$$Q_C=\frac{-1}{wC}I^2$$
$$Q_L=wLI^2$$
If two much reactive power is consumed, e.g by motors, we can compensate via the usage of a capacitor.



4. Based on power triangle
$$\bar{S}=P+jQ$$
$$S=|\bar{S}|=\sqrt{P^2+Q^2}$$
$$Q=\pm \sqrt{S^2-P^2}=\pm \sqrt{S^2-S^2\frac{P^2}{S^2}}=\pm S \sqrt{1-PF^2}$$

See: [[Power Triangle]]

About the leading and lagging PF:
$$S^2=P^2+Q^2 \rightarrow Q=\pm\sqrt{S^2-P^2}=\pm S \sqrt{1-PF^2}$$
If we must know PF and S, we can find Q. <mark style="background: #BBFABBA6;">BUT we do not know the sign.</mark>

Lagging PF means Q>0, we are consuming Q. and current lags voltage. Here:
$$Q_I<Q_V, \text{ Here, }\bar{V}\angle Q,\;\bar{I}=I\angle\theta_I$$
Leading PF means Q<0, we are generating Q, and Current Leads Voltage
$$\theta_I>\theta_V, $$

**Comparison:**
*Load* means P>0
*Generator* means P<0


*Jamming* - Within a conductor if Q increases, it can cause jamming in the path for P (power), Q can be reduced by the following:

$$\text{if L causes Q, and C}$$
$$\text{if C causes Q, and L}$$

For *Assignment 1* Question 2.26: complex power approach: focus on P=RI^2, and Q=XI^2, for each device, circuit analysis approach: start with KVL of entire circuit