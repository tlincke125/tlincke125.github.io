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

Please not that this is not meant to be a rigorous page. 

## Three Star System
I investigated the three star pattern and attempt to recreate the results of a niche paper on chaos from [Hut and Bachall](http://articles.adsabs.harvard.edu//full/1983ApJ...268..319H/0000326.000.html). I was unable to perfectly model the figure produced, however, I found some more interesting results and I became curious about the angle of deviation of stars from the third star’s initial condition. The first figure shows my attempt to match the results found in Hut and Bachall. Everything plotted is in normalized units. So the x and y axis are spatial coordinates of a moving reference frame relative to the total center of mass of the three star system.

<div style="padding-top: 50px; padding-bottom: 50px;">
    <img class="img-rounded" src="/assets/images/coolimage.png"/>
    <p>By solving the hamiltonian for a two body system, then inserting a third star into the system, I simulated a three star system. As you can see, the two stars orbit each other, then the third star inserts itself into the system and the third and first star eject off in an open hyperbolic trajectory. This is plotted via an invariant center of mass.</p>
</div>

Note that the plot was constructed with the center of mass remaining at the origin (0, 0). For a non invariant inertial reference frame, the image would look identical, with the chaotic mess just stretching to the right because the net momentum is to the right.


## Ejection angles and bifuraction plots
I became interested in the nature of the deviation from the center of the ejected two and one star long term trajectories. Because the plot is relative to the center of mass at (0, 0), all ejections occur at an angle from the center of mass (the angle of the blue / red line and the red / green line in the first figure). Using massive parallel computing over night, I ran the simulation 1000 times (from 20.00 to 30.00 with a step of 0.01) and recorded the angle of deviation of all three stars, and produced the bifurcation diagram below. (Apologies to my scientifically literate audience for not including axis labels, this is a plot of ejection phase angle with respect to the center of mass (in degrees) vs initial condition (injection distance)):


<div style="padding-top: 50px; padding-bottom: 50px;">
    <img class="img-rounded" src="/assets/images/biffurcation_large.png"/>
</div>


## Periodic Nature of the orbiting stars' ejection angle
Every second repetition of the stable period switches between the two sets ((1, 2), (3)) and ((1, 3), (2)). Although I did not run the simulation longer, it appears star (1) is never isolated. At around 20.9, there occurs a bifurcation, with small strips in the middle of stability. Note that if the star starts at the initial condition in a stable region, there were no chaotic oscillations at the point of impact. Of course, there are a few flaws in this plot, notably the fact that in some chaotic regions, there are not star pairs, meaning I did not let the simulation run long enough. Therefore, I attempted to zoom in on the portion between [22, 25] with a smaller step (0.001) and a longer integration path to make sure both stars accurately left from the interaction. I zoom in on one of the chaotic regions in the figure below. Some portions of the biffurcation diagram in the final figure show that two binary stars stick together for a long set of parameters, for example from 23.27 to 23.2727, the second and third star pair (oscillating between an angle above and below the equator).



<div style="padding-top: 50px; padding-bottom: 50px;">
    <h1>Two body problem with an injected third body</h1>
    <img class="img-rounded" src="/assets/images/biffurcation_small.png"/>
</div>


# Further performance increase to the numerical integrator
It is also possible to make the solver adaptive, increasing the efficiency based on the relative error of each time step.

The following graphical simulations were built using a nonlinear ode solver I wrote using RK4 and an adaptive time stepping algorithm



<div style="padding-top: 50px; padding-bottom: 50px;">
    <h1>Some biffurcation diagrams for common chaotic systems</h1>
    <img class="img-rounded" src="/assets/images/henonbifurc.jpeg" height="40%" width="100%"/>
    <img class="img-rounded" src="/assets/images/logbifurc.jpeg" height="40%" width="100%"/>
    <p>The two images above are really interesting steady state solutions to the logistic and henon map with the transients removed. In order to build these images, I had to simulate the maps a few thousand times with millions of time steps. It was a fairly computationally intensive process, but a very cool result in the end</p>
</div>
<div style="padding-top: 50px; padding-bottom: 50px; display: inline-block;">
    <h1>Some Interesting Chaotic Systems</h1>
    <img class="img-rounded" src="/assets/images/LorentzAdaptive.jpeg" height="80%" width="100%"/>
    <img class="img-rounded" src="/assets/images/roslerinitcondition.jpeg" height="80%" width="100%"/>
    <img class="img-rounded" src="/assets/images/rossleraccurate.jpeg" height="80%" width="100%"/>
    <p>These are three interesting chaotic systems (two systems, but the Rosler System is represented with two different initial conditions). These were made using my ode solver using an adaptive time stepping algorithm.</p>
</div>

