---
layout: post
title:  "Nonlinear ODE Integrator"
date:   2020-05-10 10:08:15 - 0700
categories: projects
---

See the [source code](https://github.com/tlincke125/nonlinear_ode_solver)

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  tex2jax: {
    inlineMath: [['$','$'], ['\\(','\\)']],
    processEscapes: true
  }
});
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>


# Introduction
In this project, I designed an adaptive ODE solver using various numerical methods including RK4 and some elementary euler methods. The system takes in arbitrarily large nonlinear differential equation vector functions and produces a time propigating trajectory. See some example systems in ode/systems.py. I simulated some chaotic interactions between three body systems (two body systems do not exhibit chaotic behavior).

It is also possible to make the solver adaptive, increasing the efficiency based on the relative error of each time step.

The following graphical simulations were built using a nonlinear ode solver I wrote using RK4 and an adaptive time stepping algorithm

<div style="padding-top: 50px; padding-bottom: 50px;">
    <h1>Two body problem with an injected third body</h1>
    <img class="img-rounded" src="/assets/images/coolimage.png"/>
    <p>By solving the hamiltonian for a two body system, then inserting a third star into the system, I simulated a three star system. As you can see, the two stars orbit each other, then the third star inserts itself into the system and the third and first star eject off in an open hyperbolic trajectory. This is plotted via the center of mass.</p>
</div>

<div style="padding-top: 50px; padding-bottom: 50px;">
    <h1>Some biffurcation diagrams for common chaotic systems</h1>
    <img class="img-rounded" src="/assets/images/henonbifurc.jpeg" height="40%" width="40%"/>
    <img class="img-rounded" src="/assets/images/logbifurc.jpeg" height="40%" width="40%"/>
    <p>The two images above are really interesting steady state solutions to the logistic and henon map with the transients removed. In order to build these images, I had to simulate the maps a few thousand times with millions of time steps. It was a fairly computationally intensive process, but a very cool result in the end</p>
</div>
<div style="padding-top: 50px; padding-bottom: 50px; display: inline-block;">
    <h1>Some Interesting Chaotic Systems</h1>
    <img class="img-rounded" src="/assets/images/LorentzAdaptive.jpeg" height="80%" width="100%"/>
    <img class="img-rounded" src="/assets/images/roslerinitcondition.jpeg" height="80%" width="100%"/>
    <img class="img-rounded" src="/assets/images/rossleraccurate.jpeg" height="80%" width="100%"/>
    <p>These are three interesting chaotic systems (two systems, but the Rosler System is represented with two different initial conditions). These were made using my ode solver using an adaptive time stepping algorithm.</p>
</div>

