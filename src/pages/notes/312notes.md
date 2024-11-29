---
layout: ../../layouts/MarkdownPostLayout.astro
title: '| embedded systems'
pubDate: 2023-11-13
description: 'embedded systems notes'
preview: "Lorem ipsum"
author: 'Astro Learner'
image:
    url: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'
    alt: 'The full Astro logo.'
tags: ["dev"]
---
Published on: 2024-11-28


# Introduction

---
**1.3 Number Systems**

- To Represent fractional values, the weight of the values to the right of the binary point can be used, where the bit position is negative
- ._ _ _ _ (1/2, 1/4, 1/8, 1/16), library needs to communicate that this decimal exists, it is not inherently represented in the CPU (This method is fixed point representation)
- Things are complicated by the fact that a fractional value cannot always be accurately represented
- Error < |1/2 LSB|
- This representation can also (w/ int included) use 2's complement to hold a -ve value

I.e a "6.2 fix point" Representation would be:

____._____

-fixed point libraries exist (normally cpus don’t support it)

---
**1.4 Floating Point Representation**
- To be more flexible in representation range, floating-point formats allow the binary point to be moved
- The IEEE-754 standard describes floating formats: 4byte - single precision "float", 8-byte "double"
- Some CPU have inherent hardware support for this
- The 8bit AVRs however do not support have inherent hardware support
- They do have software based support via the AVR LibC

Note: Though C allows declaration of doubles, for these AVRS, they will be silently demoted to float

---
**1.5 Other Representations**
BCD - Binary Coded Decimal

Hex digit is used to represent a decimal digit

ASCII - used to represent (in 7-bits), printable and non-printable characters

# Overview

**Peripherals**
> Establish what makes a MCU unique

In this course we utilize two different MCUS:

| **ATtiny13A**   | **Atmega328p**   |
| --------------- | ---------------- |
| AVR CPU         | AVR CPU          |
| 64 Bytes SRAM   | 2kB SRAM         |
| 1k Flash Memory | 32k Flash Memory |
| 64 Bytes EEPROM | 1k Bytes EEPROM  |

[[Third Year/ECE 312/312 Datasheets/ATMega Datasheet.pdf|ATMega Datasheet]], [[ATtiny13A.pdf]]

---

*EEPROM* - Used to store small amounts of data in computing and electronic devices, enables individual bytes to be deleted and reprogrammed

---

**Peripherals Comparison**

| **ATtiny13A**     | **Atmega328p**                                            |
| ----------------- | --------------------------------------------------------- |
| Watchdog timer    | All the same peripherals as the ATtiny                    |
| 8 bit counter     | SPI Unit                                                  |
| Interrupt unit    | USART Capability (Synchronous UART)                       |
| 10 Bit A/D        | TWI (Two-wire Interface)                                  |
| Analog Comparator | I2C [[I2C Documentation.pdf]]                             |
|                   | 16-bit Timer (More bits in timer allow higher resolution) |
|                   | More I/O pins                                             |

Some peripherals are meant for connecting to other peripherals, some keywords:
> SPI - Serial Peripheral Interface
> TWI - Two Wire Interface
> I2C - Inter-IC

Communication Peripherals Include the following:
> UART/USART
> USB

**Digital I/O**
- can be used to emulate other peripherals\
- because external peripherals can be added to many MCU's (via SPI), that possibility needs to be considered when designing a system
- MCUs typically have peripherals share the same pins

We will write firmware (non-volatile) for embedded systems to achieve a desired operation (this will typically reside in the flash memory)

**AVR CPU Description**
- 8-bit RISC ([[Harvard Architecture]]) w/ typical CPU register
	- program counter (PC)
	- status/control register
	- 32-bit registers are combined to form the pointer register, including the stack pointer
- Instruction Set (Assembly) is described toward the end of the data set
- AVR's all posses a instruction decode pipeline (allows for faster execution)
	- Usually 1 clock cycle <> execution of opcode

**Microcontrollers**
MCU or Microcontrollers form the core of embedded systems, main difference between MCU's is the set of peripherals which they are using. There are many MCU that use the same CPU, we denote these alike MCU's as "families of MCU".

*How do two CPU's differ?*
- Clock speed (how quickly instructions can be executed) - not all tasks need a fast CPU

The data-processing requirements of an MCU are dependent on the application, <mark style="background: #BBFABBA6;">some peripherals are essential to CPU operation such as the stack</mark> (depending on what someone is trying to do)

**Memory**
AVR's used in this course utilize [[Harvard Architecture]], this means separate program and data address spaces

**In ATtiny13A:**

*Flash Memory* - program memory
- Contains 1K on-chip flash memory
- organized as 512 x 16, since instructions are 16 bit
- non-volatile (contents remain when power is removed)
- the flash is only good for about 10,000 writes
- not fully ROM (can be reprogrammed)

| 0x1FF        |
| ------------ |
|              |
|              |
|              |
| Program 0x00 |




*RAM* - data memory

| STACK/GLOBAL VARS 9F |
| -------------------- |
| I/O Registers        |
| CPU Registers 00     |

*EEPROM* - data memory
- can be accessed through special registers
- on the ATtiny13A, there are only 64-bytes of EEPROM
- goes from 0 - 3F
- good for ~100,000 writes
- useful for data which can change but does so less frequently
- i.e programming in a code for a tv remote

Within the AVR, peripherals are configured and managed by the I/O registers, these 8-bit special function registers do specialized things to the hardware

**Clocking Options**

*CPU* - synchronous state machine, it requires a CLK edges to do anything

There are usually a number of possible CLK sources, each with different precision and costs

Options within the ATtiny13A, <mark style="background: #FFF3A3A6;">2313A</mark>
1. Internal RC oscillator - inaccurate but inexpensive, e.g) MHz, 9.6MHz
2. Low frequency internal RC oscillator - inaccurate, but consumes low power consumption e.g) 128KHz
3. External CLK I/P - useful when a system CLK already exists
4. <mark style="background: #FFF3A3A6;">An oscillator w/ an external timing element - similar to (3), but less expensive since usually only a crystal or resonator is needed (and some capacitors)</mark>

**Speed Grade:**
- 0-4 MHz @ 1.8-5.5V
- 0-10 MHz @ 2.7-5.5V
- 0-20 MHz @ 4.5-5.5V

*Whatever the clock source, division of the clock frequency is possible*

The clock frequency must be within in CPU's range, often related to operating voltage, if we clock it too fast it could fail

For the clock options: we run four options into a MUX
1. External | 00
2. 4.8 MHz | 01
3. 9.6 MHz | 10
4. 128 KHz | 11
These are selected using CKSEL 1:0


We can then divide the O/P of the MUX by, 1,2,4,8,16,32,64,128,256

Based on CLKPS 3:0, is register
*CLKPS* - clock prescaler

In the LOW FUSE (see: [[312.2.6 MCU Configuration]]), we can see that `BIT[4] = CKDIV8` this bit is responsible for defaulting CLK scaling to 8 

**MCU Configuration**

Some aspects of a flexible devices configuration are not or cannot be controlled by a program, such as the source of the clock

These unique aspects of operation are controlled via "FUSE" or "CONFIG" bytes of non-volatile memory and established only during device programming (the process of getting the program on to the device, not the user programming a device)

**FUSE Bytes*

For ATtiny 13A, we have two FUSE bytes:

*HIGH FUSE Byte:*

| 7   | 6   | 5   | 4            | 3      | 2            | 1            | 0           |
| --- | --- | --- | ------------ | ------ | ------------ | ------------ | ----------- |
| -   | -   | -   | `SELF PRGEN` | `DWEN` | `BOD LEVEL1` | `BOD LEVEL0` | `RST DISBL` |
- Default value is set to 1 for all of high fuse byte
- Bit 2 and 1, are the Brownout detection voltage selection, (Brownout is a sag in voltage)
- Bit 0 external reset disable
- Bit 3 turns debug wire on/off
- Bit 4 controls if self programming is enabled

The erased/blank state of a flash memory contains high bits, so "programmed" means 0, this is why we must be careful and read documentation


*LOW FUSE Byte:*

| 7                                          | 6                                         | 5                  | 4                     | 3                    | 2                    | 1                   | 0                   |
| ------------------------------------------ | ----------------------------------------- | ------------------ | --------------------- | -------------------- | -------------------- | ------------------- | ------------------- |
| `SPIEN`                                    | `EESAVE`                                  | `WDTON`            | `CKDIV8`              | `SUT1`               | `SUT0`               | `CKSEL1`            | `CKSEL0`            |
| `DEFAULT VALUE: 0`                         | `DEFAULT VALUE: 1`                        | `DEFAULT VALUE: 1` | `DEFAULT VALUE: 0`    | `DEFAULT VALUE: 1`   | `DEFAULT VALUE: 0`   | `DEFAULT VALUE: 1`  | `DEFAULT VALUE: 0`  |
| Enables series programming and downloading | Preserve EEPROM memory through chip erase | Watchdog timer     | Divide the clock by 8 | Select start up time | Select start up time | Select Clock Source | Select Clock Source |

*About SUT/CKSEL* - these bits allow for specific timing and sources to be selected, we can see their values via a truth table: 

| `SUT1` | `SUT0` | Startup Time       |
| ------ | ------ | ------------------ |
| 0      | 0      | `14 Clocks + 0ms`  |
| 0      | 1      | `14 Clocks + 4ms`  |
| 1      | 0      | `14 Clocks + 64ms` |
| 1      | 1      | `N/A ILLEGAL`      |


| `CKSEL0` | `CKSEL1` | CLK SOURCE                  |
| -------- | -------- | --------------------------- |
| 0        | 0        | `External input`            |
| 0        | 1        | `4.8 MHz - Internal RC SRC` |
| 1        | 0        | `9.6 MHz - Internal RC SRC` |
| 1        | 1        | `128 KHz - Internal RC SRC` |
See: [[312.2.5 Clocking Options]]


**Data Types & Operators**

*(See documentation in AVR LibC Manual)*

```
#include <stdint.h>

uint8_t // unsigned 8-bit int

uint16_t // unsigned 16-bit int

uint32_t // unsigned 32-bit int

int8_t // signed 8-bit int

int16_t // signed 16-bit int

int32 _t // signed 32-bit int
```
> Use these with respect to memory size.

However there is one *exception*:
	We need to know: `char` this is used by libraries of string routines, within AVR LibC

**Bitwise Operators**
	When accessing registers in the AVR 8-bit CPU program, it is done a byte at a time when using C.  
- Allows specific bits within a byte to be operated on, I.e :


| 7'  | 6'  | 5   | 4   | 3   | 2   | 1   | 0   |
| --- | --- | --- | --- | --- | --- | --- | --- |

---
# *Operators to know:*
- **Ones Complement** represent in C by `~`
	- i.e `~0xA5 = ~(1010 0101) = 0x5A`

- **Bitwise OR** represented in C by `|` (not to be confused with `||`, the logical OR)
	- i.e `0xA5 | 0x0F = (1010 0101) | (0000 1111) = 1010 1111 = 0xAF`
	- Useful for *setting* bits

- **Bitwise AND** represented in C by `&`
	- i.e `0xA5 & 0x0F = (1010 0101) & (0000 1111) = 0000 0101 = 0x05`
	- Useful for *clearing* bits

- **Bitwise XOR** represented by `^`
	- i.e `0xA5 ^ 0x0F = (1010 0101) ^ (0000 1111) = (1010 1010) = 0xAA`
	- Useful for *toggling* bits

- **Bitwise Shift Left** represented by `<<`
	- SYNTAX: (value) << (# of times shifted)
	- i.e `0xA5 << 2 = (1010 01010) << 0b10 = (1001 0100) = 0x94`
	- Useful for bit *alignment*

- **Bitwise Shift Right** represented by `>>`
	- SYNTAX: (value) >> (# of times shifted)
	- i.e `0xA5 >> 1 = (1010 01010) >> 0b1 = (0101 0010) = 0x52` (For unsigned system, if signed MSB would be 1)
		- *For unsigned data types, a 0 is shifted in. In signed systems we shift in a value which **RETAINS** the sign*
	- Useful for bit *alignment*

***Bitwise Operators*** Have a order of operation - see C documentation

Every bit name in the AVR datasheet is equal to the bit position, 


Example: **PORT B**

| 7   | 6   | 5        | 4        | 3        | 2        | 1        | 0        |
| --- | --- | -------- | -------- | -------- | -------- | -------- | -------- |
| -   | -   | `PORTB5` | `PORTB4` | `PORTB3` | `PORTB2` | `PORTB1` | `PORTB0` |
Each port is = to its value, i.e `PORTB4` is equal to 4.
So for example we can write code to set `PORTB3` to 1 without affecting other bits

*Further Examples:*

	PORTB = PORTB | 0x08;
	PORTB = PORTB | 0b00001000;
	PORTB = PORTB | (1<<3); // Shifts it to be 4
	PORTB = PORTB | (1<<PORTB3);
	PORTB |= (1<<PORTB3);

Five ways to *clear* `PORTB5`:

	PORTB = PORTB & 0b11011111;
	PORTB = PORTB & 0xDF;
	PORTB = PORTB & ~(1<<PORTB5);
	PORTB = PORTB & ~(1<<5);
	PORTB &= ~(1<<PORTB5);

# **Digital I/O**

Digital Input/Output:
- This is the simplest form of peripherals
- Most modern MCUs allow most pins to be used for Digital I/O
- There are typically 3 registers associated DIO
	- A *Direction* register that configures pins for input or output
	- A *Data* register where output data is written
	- A *Input* register where data input is read (sometimes combined with the data register)

*Atmel AVR Registers:*
DDRx: Used to configure pints for data direction
PORTx: data register: where output data is written
PINx: input register where input data is read

X is a bank of up to 8pins/bits organized by letter: A, B, C ... and each bit is connected to a pin


| `DDxn` | `PORTxn` | `PUD in MCUCR` | PULL-UP | I/O            |
| ------ | -------- | -------------- | ------- | -------------- |
| `0`    | `0`      | `n/a`          | no      | Normal Input   |
| `0`    | `1`      | `0`            | yes     | Wired-or input |
| `0`    | `1`      | `1`            | no      | Normal input   |
| `1`    | `0`      | `n/a`          | no      | Output "0"     |
| `1`    | `1`      | `n/a`          | no      | Output "1"     |
> *PUD* - Pull up disable



*Pull Up Resistor* - Associated with when a pin is only input (disable when output is available), the pull up network is possible enabled only when the pun is an input, is used when an input device does not drive a logic "1", use  ~$10k\ohm$ for pull up resistor, ==_we will need this for lab 2_==


**Example**: Write ATtiny13A code that reads a button on `PB0` and reflects (copies), the value onto `PB4`.

	`PB0: // Input with pull-up activated`
	PB4: // Output (with starting value of 1)



## DDRB

| `7` | `6` | `5` | `4` | `3` | `2` | `1` | `0` |
| --- | --- | --- | --- | --- | --- | --- | --- |
| -   | -   | -   | `1` | -   | -   | -   | `0` |
## PORT B


| `7` | `6` | `5` | `4` | `3` | `2` | `1` | `0` |
| --- | --- | --- | --- | --- | --- | --- | --- |
| -   | -   | -   | `1` | -   | -   | -   | `1` |

Code:

	void main() {
		MCUCR &=~(1<<PUD); // Enables the general capabilities of pull-ups
		PORTB |=(1<<4)|(1<<0); // Default PB
		DDRB = DDRB &~(1<<4);}

		while(1) {
			if (PINB &(1<<0)){
				PORTB |=(1<<4);
			} else {
				PORTB &=~(1<<4);
			}
		}
	}


**Electrical Characteristics**

![Pasted image 20240926093622.png](Pasted image 20240926093622.png)
*ATtiny13A Max Electrical Ratings, via 18.1 of datasheet*

## Overview of Electrical Characteristics Section in Datasheet

$V_{IL}$ represents the voltage representing logical LOW, if it exceeds the max value of $V_{CC}$ is may not be interpreted by the MCU as being a LOW value.

## General Interfacing

Consider:

```mermaid
flowchart LR
Electrical_System_1 --> System_2
```

*Successful interfacing requires 3 things:*
1. Voltages need to match
2. Current capabilities need to match
3. Timing

## Logic Levels (ECE 210 Review)
- Logic levels _must_ match
- For the MCU as an output, the actual logic levels output depend on the *supply voltage* 
![Diagram.svg]
# Notation: 
$V_{OH_{MIN}}$ is the minimum voltage that a device can output when communicating a `1`

$V_{OH_{MAX}}$ or $V_{CC}$ is the Maximum for `1`

$V_{OL_{MIN}}$ or $GND$ is the minimum for `0`

$V_{OL_{MAX}}$ is the maximum voltage output when communicating a `0`

![Diagram 31](Diagram%2031.svg)

# Current Capabilities
> To ensure proper operation based on current provided

- MCU's have limits on the total amount of current through supply pins (E.G 200mA)
- They also have limits on the amount of current a pin can source and sink

*Do not exceed these or, you will damage the device*, operating at the maximum allowed is not a good idea, the device will be stressed, we should utilize a current limiting resistor to prevent the circuit from become stressed, we will select $R$ the resistance value assuming DC operation and a 10% safety margin on max current:

*Example:*
![Diagram 3.svg]Diagram%203.svg
$V_{fwd}=1.7V$ and $I_{maxDC}=200mA$, select R value:
Restrictive device is the MCU which has a maximum current for $PB0$ of 40mA, 
$$I_{max}=40mA, \; 40-0.1(40)=36mA,\text{(accounting for safety margin)}$$
$$V_{cc}=5V=V_{OHmax}, \; \frac{5-1.7}{36}=R=91.6\ohm$$
We would most likely then utilize a 100$\ohm$ resistor

# Types of Digital Outputs
Normal digital outputs are push-pull outputs

![images 1.png](images 1.png)
*CMOS Inverter* - this is the overall schematic for the pins on the MCU, the top half is pushing logic `1` while the bottom pulls logic `0`, top half is SOURCING current, and bottom is SINKING current


We also will see open-drain outputs on same devices, this looks like the lower half of the CMOS inverter, it cannot source anything, rather it can *ONLY* sink. We can use it in tandem with a pull up resistor to drive a LED.
![Diagram 4.svg](Diagram%204.svg)

This is *Useful* for "wired-or" output. However, do not connect multiple push-pull outputs together, this results in *CONTENTION* 

**Device Reset**
- Starts the CPU synchronous state machine from predefined conditions for reliable operation
- Stable power is important for reliable start-up, and the voltage will steadily rise then fluxuate around a stable value

*There are multiple reset sources:*
>1.  Power-on, first applied
> 2. Brown-out, power glitch (see [[312.2.6 MCU Configuration]] for more on brown outs)
> 3. Watch dog timer, (one of the peripherals, resets device if not called every so often to reset if program crashes)
> 4. External reset pin

A program is capable of determining what caused the latest reset

Consider: `MCUSR 0x34`: 

| `7` | `6` | `5` | `4` | `3`            | `2`            | `1`            | `0`      |
| --- | --- | --- | --- | -------------- | -------------- | -------------- | -------- |
| -   | -   | -   | -   | `WDRF`         | `BORF`         | `EXTRT`        | `PORF`   |
|     |     |     |     | watchdog reset | brownout reset | external reset | power-on |

---

# Interrupts


Interrupts are the *basis* of event driving programming, they greatly expand the capabilities of an MCU, these build of the ideas of MCU resets([[312.2.10 Device Reset]]). All AVR interrupts are 'auto-vectored' execution address is hard-wired in the MCU (as opposed to the peripheral itself).

**Interrupt Processing** 
For an interrupt to be "seen" by the CPU, a global interrupt enable needs to be set: the STATUS register $I$ bit, there is always another interrupt specific enable bit

*Example:*



Here, `TOIE0: timer/counter overflow interrupt enable for timer 0` and `TOUF0: timer 0 overflow event flag`

If an interrupt is enabled (unmasked), then processing occurs:

1. Execution of the current (assembly) instructions completes
2. STATUS register $I$ bit is cleared, disabling further (nested) interrupts by default
3. The program counter is pushed onto the stack, only the PC is pushed
4. The program counter is loaded with an address corresponding to the interrupt source. In the AVR's, this address is presumed to be hold a jump instruction to the interrupt service routine (ISR)
5. In most cases, this automatically clears the interrupt source: `TOVf0 goes from 1 to 0`
6. The ISR executes and ends with an RETI (return from interrupt) assembly instruction
7. This pulls the program counter from the stack
8. The STATUS is set to `1`, re-enabling interrupts

**Vectors and Priorities**
- Sets of vectors correspond to peripherals on the MCU, the *lower* the vector number/address, the *higher the priority*
- *However*, priorities only apply if 2 interrupts occur in the same system clock cycle, see 9.1 in data sheet for priorities list


## **Interrupts with AVR LibC**
More: https://www.nongnu.org/avr-libc/user-manual/group__avr__interrupts.html
- Header avr/interrupt.h defines macros and functions that help with writing ISRs.

`sei() // Globallhy enables interrupts`
`cli // Globally disable interrupts`

> *In class example:*

	ISR (vectorname, attributes){
		// code 
	}

Here, we will define a unnamed ISR that holds code which corresponds to vector name, an instruction is placed in the vector table in the position corresponding to `vectorname` to jump to this code. 

The list of `vectornames` is provided in AVR LibC documentation, most are the same as what is described in the datasheet with `_vect` appended. Such as `TIMER0_OVF_vect`, the attribute parameter controls how the C compiler generates support code. 

	ISR_BLOCK // default code, this generates code which saves CPU registers, restoration of the same, nested interrupts disabled by default
	
	ISR_NAKED // Generates no added code, for quick running code where we know exactly which registers will be used, i.e quick running code using in line assembly, nested interrupts are disabled by default
	
	ISR_NOBLOCK // same as ISR_BLOCK, but nested interrupts are enabled
	
	ISR_ALIAS0F(anothervectorname) // with this selection the code corresponding to "anothervectorname" will be executed for the vectorname listed, allows code sharing, no code is provided by you for this call to ISR()



## **Interrupts Quirks and Dangers**
Contrary to most rules of C programming, the primary way to pass information is through global variables to and from ISR. The C compiler needs to be informed that the variable may change outside normal code flow `volatile uint8_t x;`. The AVR is an 8bit CPU and so care must be taken when reading or writing multi-byte data types used by both the ISR and and main program such as `volatile uint16_t y=0;`, then running `y++;` this corresponds to multiple instructions


> **Example**

	volatile uint16_t z=0; //global
	uint16_t x = 128;

In mainstream code:
	`z=x+128;`
Then we have x:`0000 0000 1000 0000` and 128: `0000 0000 1000 0000`, these added together triggers an interrupt, in ISR z=1, then processing comples resulting z is `0000 0001 | 0000 0001 // these two bytes DO NOT BELONG TOGETHER`, how do we solve this problem?

$\rightarrow$Disable interrupts when accessing (r/w) shared multi-byte data. To do this we can run:

	cli(); // disable interrupts
	z=x+128;
	sei(); //re-enable interrupts
#### This is referred to as *atomic access*


**Interrupts and Flowcharts**
Main and ISRs are in different contexts and so have different flowcharts
![Diagram 7.svg](Diagram%207.svg)

---

# Counters

Links: [[312 INDEX]]

## Clock Source and Frequency
--- 
Most MCU's allow the counter to be clocked by:
- A. at a rate correlating to the system clock
- B. an external signal via a particular pin

For the ATtiny2313A, the CLK source for the counters is described in a dedicated datasheet section: 13 - Timer Prescalers

This outlines that the internal I/O clock (which is the same frequency as $f_{cpu}$) can be divided by 1,8,64,256 or 1024

> Example: For Timer0, ATTiny2313A

| `CS02` | `CS01` | `CS00` |          |
| ------ | ------ | ------ | -------- |
| `0`    | `0`    | `0`    | no CLK   |
| `0`    | `0`    | `1`    | /1       |
| `0`    | `1`    | `0`    | /8       |
| `0`    | `1`    | `1`    | /64      |
| `1`    | `0`    | `0`    | /256     |
| `1`    | `0`    | `1`    | /1024    |
| `1`    | `1`    | `0`    | external |
| `1`    | `1`    | `1`    | external |

The selection here will depend on the application, sometimes qualified by the number of bits in the counter, the faster the clock, the finer the time resolution of the counter: *More accurate* & *Better Measurements*

## Atomic 16-Bit Register Access: Interrupts
---
The 16-bit timer/counter0 has the problem of potential race condition associated with `uint16-t` data types. The problem is also present because of and internal "TEMP" register used by the CPU to keep 16-bit counter values together

![Diagram 8.svg](Diagram%208.svg)

Here the TEMP register is used by other 16-bit register accesses! The solution is to disable interrupts when accessing 16-bit registers.


## Input Capture
--- 
Useful for taking a snapshot of timer when a event occurs:

1. rising edge of an input signal on a particular pin such as `ICP1`
2. Falling edge of the same. In this case of the ATTiny2313A
3. Rising edge of an internal analog comparator output
4. Falling edge of the same

These times can be used by your program to measure periods, pulse widths, etc

![Diagram 9.svg](Diagram%209.svg)
> Programming configured for rising edge capture, this event will put the TCNT1 value in the 16-bit ICR1, and set flag ICF1

The value in ICR1, must be read and the flag must be cleared (by writing a "1" to it), before next edge comes along. You can check to see if the counter overflows by checking the timers overflow flag, sometimes physical limitations make this process simpler.

**TCCRB**

| `7`     | `6`    | `5` | `4` | `3` | `2`    | `1`    | `0`    |
| ------- | ------ | --- | --- | --- | ------ | ------ | ------ |
| `ICNC1` | `ICES` |     |     |     | `CS12` | `CS11` | `CS10` |
`ICNC1` - Input capture noise canceler, when `0` set to off and while `1`four equal samples required before a signal is considered valid.

`ICES` - Input capture edge select. `0` rising edge and `1` falling edge

`CS` pins are for clock prescaling



**TIMSK** 

| `7`     | `3`     |
| ------- | ------- |
| `TOIE1` | `ICIE1` |
`7` timer overflow interrupt enable
`3` input capture interrupt enable 


**TIFR (flag register)**

| `7`    | `3`    |
| ------ | ------ |
| `TOV1` | `ICF1` |
`7` Timer overflow flag
`3` input capture flag, cleared by writing 1 or execution of the ISR

---

# PWM

#### Pulse Width Modulation
(Referred to as *PWM*)

- Recall that a PWM waveform is a square wave with a configurable *duty cycle*, i.e a wave which is 1, for $0.1T$ this would have 10% duty cycle
- These waveforms are useful for things like:
	- Communicating information
	- Effectively turning a device partially on (for control?)
	- If filtered, generating an analog signal
- The usual use of PWM is to configure a fixed frequency, and then varying the duty cycle
- In the AVR 8-bit devices, once configured for a period (frequency) and duty cycle, the timer peripheral *automatically generates the waveform without any CPU involvement*
- Changing the Duty Cycle involves changing the 1 register

**There are 3 modes offered on the AVR Timers:**

*Fast PWM* - simplest and capable of the highest frequencies

*Phase Correct PWM* - an improvement to fast PWM that keeps pulses centered in the period

*Phase and Frequency correct PWM*
#### Fast PWM
Fast PWM has single slope operation: the timer/counter counts up only, it counts to a maximum value of *TOP*, and then resets to 0.

The *TOP* value can be configured to use a hard-wired value or the contents of a register.

**Example:** 8-bit timer 0 has 2 choices:

`0xFF - FIXED` possible periods are limited by prescaler selections
`0CR0A - CHANGEABLE` configurable period, but using `0CR0A` prevents some alternate timer uses`

---
###### Basis of Operation of *Fast PWM* is:

1. The timer will count up from *0* to *TOP*, then is reset to *0*. This event also **sets** or **clears** the pin, this establishes our **PERIOD**. 
2. On its way counting up, the timer at some point will equal the value we put in the output compare register associated with the pin. When this occurs, the pin is either **cleared** or **set**.  $\Rightarrow$This sets the **DUTY CYCLE**.

Assuming we count to:`0C0A = TOP = 0x7F`, and if `0CR0B` is initially `0x3F`
![Diagram 12.svg](Diagram%2012.svg
*Here we have roughly a 50% Duty Cycle*
	
If `0CR0B` is `0x00`: high time in normal mode is 1 clock cycle

###### Phase-Correct PWM

This mode keep pulses aligned in the center of the period, important to some applications. *Dual slope* operation is used to achieve this.
![Diagram 13.svg](Diagram%2013.svg)
###### Phase and Frequency Correct PWM

A *period/frequency anomaly* is created when the *TOP* value is changed, this mode repairs this by updating the buffered output compare register when the timer count is $0$. 

![Diagram 14.svg](Diagram%2014.svg)

---
# Example:
Configure the ATtiny2313A's `timer1` to generate phase-correct 20% duty cycle 1kHz waveform, if the system clock is 2MHz. Generate this on `0C1B` pin.

$1kHz \leftrightarrow T  =1ms$, and $2MHz \leftrightarrow T  =500ns$, thus $20\% = 200\mu s$  
![Diagram 15.svg](Diagram%2015.svg)
from the datasheet we can find: $$f_{{0C1B}_{{PC}_{PWM}}}=\frac{f_{CLKI/O}}{2NTOP}$$
Where $N$ is a time prescaler 1, 8, 64 etc

with the $1kHz$ we find $NTOP=1000$, this is within the 16-bit range of timer1 and we do not need to use the prescaler: /1 is good.

Therefore, TOP = 1000m from p102 and p113 of datasheet there are several options of how TOP is specified: 

| TOP  | 0x00FF | 0x01FF | 0x3FF | **ICR1** | **0CR1A** |
| ---- | ------ | ------ | ----- | -------- | --------- |
| Mode | 1      | 2      | 3     | **10**   | **11**    |
Modes in **BLUE** are the "better" options


---

# Timers (I guess?)

# **Timers**
These times can be used by your program to  measure periods, pulse widths and more:
![Pasted image 20241024142153.png](Pasted image 20241024142153.png)
*On rising edge* presuming it is configured for rising-edge capture, the event will put `TCNT1` value into the 16-bit `ICR1` register and set the `ICF1` flag.

The value in `ICR1` must be read and the flag must be cleared (via writing a 1) before the next edges occurs. 

## Waveform Generators
- Number of ways to get the MCU to generate a (digital) waveform

### 1. Output Capture
- One such way is to utilize output capture or OC
 ![Pasted image 20241024142514.png](Pasted image 20241024142514.png)
 When the value in the timer equals the value in the O/P compare register, a flag is set. The flag can generate an *interrupt.*  


**Sorry some notes missing here**

## Pulse Accumulator

![Diagram 17.svg](Diagram%2017.svg)
- When the timer is configured to be clocked by an external source (pin), we can use the timer/counter to count the number of incoming pulses.
- Continent for things like tachometer (A _tachometer_ is an instrument measuring the rotation speed of a shaft or disk, as in a motor or other machine. A _tachometer_ is an instrument measuring the rotation speed of a shaft or disk, as in a motor or other machine.)
- Taking time into account, we can use the count to determine things like RPM. 

### Possible with the **AVR** Timers:
**ATtiny2313A**: `timer0` clocked via T0 pin, and `timer1` clocked by T1 pin.
	*(If selected)*
Configuration can be made to clock on rising *or* falling edge, some delay is introduced by synchronization - *see chapter 12*. The external clock source is enabled via the timers prescaler bits.

**Example:**

| `CS12` | `CS11` | `CS10` | Details         |
| ------ | ------ | ------ | --------------- |
| `1`    | `1`    | `0`    | T1 falling edge |
| `1`    | `1`    | `1`    | T1 Rising Edge  |
### Serial Communication
There are three typical serial communication protocols that are seen when working at this level:
**UART**(synchronous), **SPI**(asynchronous),**I2C**(asynchronous), we also have other examples such as USB and Ethernet

When we want to add hardware to a system, we need to consider *communication*.
![Diagram 21.svg](Diagram%2021.svg)
In synchronous communication we will send over a clock signal, whereas in asynchronous we will have a relatively similar clock in all the devices. Data is sent over a line and over a time, this is **not** as fast as parallel interface. 

We have two types of transmission:
**Asynchronous** - where data clocks are locally generated, but not shared
**Synchronous** - where the master/primary of the system provides data transfer clock

#### **Asynchronous Serial**
There are a number of standards that fall into this category, vary in voltages, signally method, viable distance, etc. One of the most common is RS-232 which *was* implemented on computer serial ports (back in the olden age) 

A peripheral ready for communication can be denoted as a "Universal Asynchronous Serial Receiver/Transmitter"(UART), can sometimes be called USART - for synchronous capabilities

![Diagram 25.svg](Diagram%2025.svg)
Asynchronous data format (`8E2`):
- `8 DATA BITS`
- `EVEN PARITY BIT`
- `2 STOP BITS`

In order to properly understand this we need to account for *time*, recall that no clock is transmitted but rather is generated on each end. These clocks need to be within 2% of the nominal value for communication to be within tolerance. 

### **Baudrate**
- The number of "symbols" sent or received per second in binary (two symbols available). So therefore in a binary system our *baud rate is equivalent to our bitrate.* 
- Sent or received bi counts includes start, stop, parity, data, etc

	**Example:**
	`8N1` this holds `8 DATA`, `1 START`, `1 STOP` and is altogether `10 BITS`

- There are a set of baud rates typically seen including: *300, 1200, 2400, 9600, 19200, 38400, 76800, 115200*

## Typical TX/RX Process
- The AVR USART has various interrupt possibilities and error detection mechanisms
- AVR LibC Stdio demo has a sample using the UART such that, like the LCD, information can be sent using the `vprintf()` family of routines (Rx via scanf() family)
![Diagram 26.svg](Diagram%2026.svg)

# Synchronous Serial: Serial Peripheral Interface (SPI)
This functionality may be offered by the synchronous portion of a USART or by an SPI-specific peripheral. The SPI *master* is the device that coordinates and controls transfers and provides the clock. The SPI *Slave* device contains a shift register that will accept or provide data when the device is selected and clocked. 

![Diagram 29.svg](Diagram%2029.svg)
**Note:** MOSI - Master Out Slave In, MISO - Master In Slave Out

Once configured, a write the SPDR (SPI data register) will automatically transfer a byte (usually) of data. Data is shifted out by the master usually MSBIT first, this bit is shifted in to the LSBIT of the slave. Meanwhile, the slave shifts out of its MSBIT placed into the masters LSBIT. After a burst of 8-bits a byte would have been exchanged (idk why Loren said this, seems redundant?). Configuring the SPI to work involves establishing an appropriate clock frequency and that the master slave match with respect to the following:

`CPOL` - this is the clock polarity: whether the clock is HIGH or LOW
`CPHA` - which edge (rising/falling) the data is *latched* on

## Daisy Chaining Multiple Devices
Utilizing SPI it is possible to daisy chain multiple devices:
![Diagram 30.svg](Diagram%2030.svg)

## Important Takeaway
Many IC-implemented peripherals use this protocol (utilize SPI protocol), i.e in a application where we had a perfect MCU but missing something, we could add on top the missing feature via a peripheral.

### Example: 
Adding *more* digital I/O to a system:
`74HC165` - parallel to serial converter
`74HC595` - serial to parallel converter

![Diagram 31.svg](Diagram%2031.svg)


# Synchronous Serial
$I^2C,\; IIC, \; TWI$

Inter-IC communication is more involved than SPI:
1. The data line is bidirectional
2. The protocol imposes a data format
3. Also note there all alternatives b/c I2C is trademarked & owned by one company

With complexity comes some benefits, including that with 2 lines several devices can be connected

**Connection Overview:**
![Diagram 40.svg](Diagram%40.svg

TWI (Two-wire Interface) and parts of the USI (Universal Serial Interface) are quite similar, but can require added firmware for full $I^2C$ compliance.

**For our devices:**
- ATTiny2313A: USI
- ATmega328p: TWI

# Serial Communication and Interrupts
- There are a number of flags that can be configured to generate interrupts
- These are communication protocol specific, but usually include provision for signaling the following:
	- When data has been (or can be) sent
	- When data has been received
- Because serial communication, particularly asynchronous, can be relatively slow, interrupts can speed up execution
- using two many interrupts can create issues w/in a embedded system, if a large quantity needed use RTOS


# Data Conversion
In the context here, we are referring to conversion between "real-world" analog values and digital representations. 

**Conversion Types:**
- *Analog to Digital* ADC, A/D
- *Digital to Analog* DAC, D/A
These converters are normally available on low end MCU's, we can think about lab 3, where we did A/D conversion on the inputs from the joystick:

*Snippet From Lab 3*
```
// ADC Conversion Setup
  //  Disable the digital input buffer for the analog pins by setting the DIDR0 register (ADC0D ? ADC5D) to high
  // Write ADC5D and ADC4D to 1
  DIDR0 |= (1 << ADC5D);  
  DIDR0 |= (1 << ADC4D);
  
  // Select AV_cc as the reference voltage (our external voltage reference which is connnected to the 5V rail)
  ADMUX |= (1 << REFS0);  
  ADMUX &= ~(1 << REFS1);  
  
  // Enable ADC (Via setting ADEN bit high in ADCSRA register)
  ADCSRA |= (1<<ADEN);
  
  // Configuring frequency: (utilizing ADPS0-ADPS2)
  // Formula ADC CLK = System CLK / PRESCALER - to be w/in range of 50kHz - 200kHz we will take prescaler of 16 for 75khz
  ADCSRA |= (1<<ADPS2);
```
Precise conversion may be required by some applications

**Block Diagram:**
![Diagram 41.svg](Diagram%2041.svg)
This applies to ADC or DAC: We can find the resolution of the converter via:$$SS=LSB=\frac{V_{ref}}{2^n}=\frac{V_{max}}{2^n-1}$$
*Where SS is step size, and LSB is least significant bit, $V_{max}$ is the max voltage that can be applied or output by a converter* 

For **ADC**: $\text{Digital Out}=\frac{V_{in}}{SS}$, this can have a rounding (quantization) error, with accuracy of$\pm \frac{1}{2}LSB$We can find: $V_{out}=\text{Digital In}*SS$  

### Example:
*Given a 16-bit D/A converter with $V_{ref}=5V$ what is the output if the digital value is `0x8000`?*

$$SS=\frac{V_{ref}}{2^n}=\frac{5V}{2^{16}}=\frac{5V}{65536}=76.7mV$$$$V_{out}=\text{Digital In}*SS=\text{0x8000}*76.7\mu V=2.5V$$
### Example:
*3.2V is presented to a 16-bit A/D converter with an input range of 0 to 3.3V (Vmax)*
$$SS=\frac{V_{max}}{2^n-1}=\frac{3.3V}{65536-1}=50.35\mu V$$
$$\text{Digital Out}=\frac{V_{in}}{SS}=\frac{3.2V}{50.35\mu V}=63549.09$$
This value is thus rounded to $63549$ which is equivalent to `0xf83e``

