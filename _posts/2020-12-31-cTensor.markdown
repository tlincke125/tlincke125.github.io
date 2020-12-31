---
layout: post
title:  "CTensor - Revisiting Machine Learning"
date:   2020-12-31 10:08:15 - 0700
categories: nonlinear ctensor
---

See the [Source Code](https://github.com/tlincke125/cTensor)

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  tex2jax: {
    inlineMath: [['$','$'], ['\\(','\\)']],
    processEscapes: true
  }
});
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

## Introduction
I came at this project not from a computer science perspective, but from a mathematical one. I refered to my analysis textbook more than I refered to resources on machine learning because I know current machine learning is a bit undeterministic; that is, models are fine tuned by the user and not the math. 

I tried to solve this problem like a math problem - with a statement, progressive work, optimization, and implimentation. Where the statement is the problem I'm trying to solve, the progressive work is a step by step series of efforts I took to solve the problem, optimization is where I fine tune the mathematical methods I use and implimentation is where I move all the theoretical math into C++ and test it out. I hope this is an easy format to follow as the blog post is organized this way.

### Table of Contents:
1. [Statement](#statement-of-the-problem)
2. [Progressive Work](#solution)
3. [Optimization](#)
4. [Implimentation](#)

## Statement of the Problem
---

<br>

I wish to classify an image that theoretically contains an "object" (numbers at first) as an output "object". Ie, given an image of a number 4, I would like to classify it as a 4.

Mathematically, consider a set of input data $I$ and a set of output data $O$ and a surjection $F_u$ that maps every element in $I$ to $O$:

$$F_u: I \rightarrow O$$

In this project, we label every element in $I$ to an element in $O$ and this is the definition of $F_u$. We can then define $F_{ext}$ as the extension of $F_u$ (Analytic continuation isn't the right word, but the definition that I compare it to) so that elements $i'$ not in $I$ but in the extended domain in question (ie the domain of all images with numbers in them rather than just the provided domain). Hence we define $I_{ext}$ as the extended domain of $I$ over all object classifications. $O_{ext}$ should in most cases be the same as $O$:

$$F_{ext}: I_{ext} \rightarrow O$$

Our goal is to find some (usually) nonlinear forward function $F_f$ where we can minimize the error of $F_f$ and $F_{ext}$. Where for the majority of this project I use a standard $L_2$ metric by measuring the 2-norm of $F_f - F_{ext}$ ($\|\|F_f - F_{ext}\|\|_2$).


### Properties of $F$
1. **$I$ is a collection of reals**

   If an input image is a $n\times m$ array of pixels, then $I \subset \mathbf{R}^{nm}$ (where nm is the product of n and m - in vector form). 

2. **$O$ is a discrete / finite set of outputs.**

   For our purposes - I will usually map a number to an "object", so the object "number 1" maps to 1, or the object "face" maps to a 2, etc. 

3. **$F_u$ and $F_{ext}$ are piecewise constant functions.**

   From Terance Tao's Analysis I:

   **Definition 11.2.3** *(Piecewise constant functions I)*. Let $I$ be a bounded
   interval, let $f : I \rightarrow R$ be a function, and let $P$ be a partition of $I$. We
   say that $f$ is piecewise constant with respect to $P$ if for every $J \in P$, $f$
   is constant on $J$.

   Clearly, we have a continuous domain $I_{ext}$ and a finite set of "piecewise" outputs $O$ that the function $f_{ext}$ can obtain. This makes it tricky because our function is now not differentiable. In fact, I will focus on modeling this function as closely as possible using a continous function.

4. **If we call $F_f$ a function of it's parameters (ie $F_f(a, b) = ax + b$), then:**

   $$\nabla \|F_f - F_{ext}\|^2 = 2\|F_f - F_{ext}\|\nabla F_f$$

   Of course, we could call the error function a function of its parameters and inputs, and it is, we don't want to see the inputs change over time, only the parameters. This is where problems will start to sneak in on monte carlo sampling and which inputs to sample where, because the way we define it now, we have hundreds of unknown functions where the inputs are invariant, but the idea is to map all of these functions to one general function that has minimized the error on the parameters. 

## Solution
---

<br>

#### $\mathbf{R}^1 \rightarrow \mathbf{R}^1$ Continuous Gradient Descent
Start with $I$ being a subset of $\mathbf{R}$, ie a one number input output function. And start with $O$ being infinite (so all functions $F$ are continous) (doesn't match our first premise - but this is just a start). I started out assuming I new the form of $F_{ext}$ (for example, I new $F_{ext}(x) = ax + b$, I just didn't know what a and b where). In this case, all I had to do was a simple gradient descent algorithm (I won't describe gradient descent in depth - the [Wikipedia](https://en.wikipedia.org/wiki/Gradient_descent) does a great job), on a and b. Obviously, I could have used least squares or polynomial fitting methods - but gradient descent provides scalibility to more complicated unknown function structures.

The generic form of gradient descent in software form (python is where I did all my testing - moved everything to C++ later) is as follows:
```python
# Compute the output of forward propigation
out = forward_func(inputs[i], *forward_args) 

# Compute the error
error = (out - outputs[i])**2 

# Gradient Descent - Apply the chain rule
grad = gamma * (out - outputs[i]) * forward_func_grad(inputs[i], *forward_args) 

# Subtract from each parameter
for i in range(num_forward): 
  forward_args[i] -= grad[i]
```

Notice that gamma must be small enough so that $E(A) - E(\gamma\Delta A) \geq 0$ where $E(A)$ is the error function with respect to the parameters A (`forward_args`).

The exact same process can be repeated if we don't know the form of the function. The choice of the forward function structure takes some thought and experimentation, but I tried first with a polynomial of order 5. 

In the video bellow, 

$$F_{ext}(x) = e^{0.918x} + 0.527$$

(this function is completely unknown to the code) and gradient descent is performed on the forward function 

$$F_f(x) = a + bx + cx^2 + dx^3 + ex^4 + fx^5$$

<video width="480" height="320" controls="controls" style="display: block; width: auto; margin: 0 auto;">
  <source src="/resources/exp_poly_grad_descent.mp4" type="video/mp4">
</video>

<br>

The blue lines indicate the subset $I$ that is sampled on the outputs. This goes to show that elements outside of the domain tend towards unreasonable outputs.

A quick question came up after this: **does the gradient descent of an arbitrary polynomial model the taylor series of the nonlinear function?**. Without going too deep into it, I think this series **sometimes** converges to the taylor series centered around $x_0$ where $x_0$ is based on the stochastic properties of which inputs we use to backpropigate with. This is a problem I would like to formalize, but for now, I wanted to move on with the machine learning. I may update this section in the future.

# Come back later for more



