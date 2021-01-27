---
layout: post
title:  "Older Projects (WIP)"
date:   2020-12-30 10:08:15 - 0700
categories: projects
---

See the [Portfolio](https://github.com/tlincke125/portfolio)

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
This was my origional website. It's unorganized right now and I hope to write a new blog post for each of these projects.


***
<h1>Featured Personal Projects:</h1>
<table style="width:60%">
    <tr>
        <th>Project</th>
        <th>Description</th>
        <th>Technologies</th>
    </tr>
    <tr>
        <td>
            <a style="color: red;" href="https://github.com/curmc/sentinet_cpp">Sentinet</a> 
        </td>
        <td>
            <p>A Robust Robotics framework in C++17</p>
        </td>
        <td>
            <p>Modern C++17 UNIX Sockets ZMQ sentinet_message_pkg (bellow)</p>
        </td>
    </tr>
    <tr>
        <td>
            <a style="color: red;" href="https://github.com/tlincke125/cTensor">cTensor</a> 
        </td>
        <td>
            <p>A Almost No Dependency Neural Network and Linear Algebra in C++</p>
        </td>
        <td>
            <p>OpenCV (The one dependency used only for reading images), Gradient Descent, Singular Value Decomposition</p>
        </td>
    </tr>
    <tr>
        <td>
            <a style="color: red;" href="https://github.com/curmc/sentinet_message_pkg">Sentinet Message Package</a> 
        </td>
        <td>
            <p>A crazy fast serialization library</p>
        </td>
        <td>
            <p>POISX C99</p>
        </td>
    </tr>
    <tr>
        <td>
            <a style="color: red;" href="https://github.com/tlincke125/rubiksCube">rubiksCube</a> 
        </td>
        <td>
            <p>An any dimensional rubiks cube solver</p>
        </td>
        <td>
            <p>Java</p>
        </td>
    </tr>
    <tr>
        <td>
            <a style="color: red;" href="https://github.com/tlincke125/nonlinear_ODE_solver">Nonlinear ODE Solver</a> 
        </td>
        <td>
            <p>An Adaptive RK4 ODE solver for hamiltonian and non-hamiltonian systems</p>
        </td>
        <td>
            <p>Python, Chaos Theory</p>
        </td>
    </tr>
</table> 

<div style="padding-top: 50px; padding-bottom: 50px;">
    <h1>Kermit Test Bot With Drifting Wheels Attached</h1>
    <img class="img-rounded" src="/assets/images/car.gif" height="500" width="400"/>
    <p>I was the lead embedded software architect for my school's robotics club. We wrote a ROS knock off for fun called sentinet, a faster but more configurable asynchronous message passing library that works over bluetooth, serial, wifi and inproc. This robot is being driven by a wii remote (We wrote the communication protocol, but used wiiuse library to transmit bytes over bluetooth). The input message is being processed (low level automation) by a jetson TX2 in C++, then filtered to a microcontroller (teensy 3.6) using a serial communication and message marshalling library I wrote in C / C++ and sent to the wheels. The purpose of this project was not practical engineering design, it was mostly a learning process to write as much as we could from scratch.</p>
</div>
<h3>The following graphical simulations were built using a nonlinear ode solver I wrote using RK4 and an adaptive time stepping algorithm</h3>
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
    <img class="img-rounded" src="/assets/images/LorentzAdaptive.jpeg" height="50%" width="40%"/>
    <img class="img-rounded" src="/assets/images/roslerinitcondition.jpeg" height="50%" width="40%"/>
    <img class="img-rounded" src="/assets/images/rossleraccurate.jpeg" height="50%" width="40%"/>
    <p>These are three interesting chaotic systems (two systems, but the Rosler System is represented with two different initial conditions). These were made using my ode solver using an adaptive time stepping algorithm.</p>
</div>
<div style="padding-top: 50px; padding-bottom: 50px;">
    <h1>A Singular Value Application for Recognizing Faces</h1>
    <img class="img-rounded" src="/assets/images/eigenfaces.png" height="40%" width="40%"/>
    <img class="img-rounded" src="/assets/images/svd.png" height="40%" width="40%"/>
    <p>Using SVD, we successfully were able to deconstruct faces into an orthogonal basis of vectors. By adjusting certain coefficients of the basis, we reconstructed faces similar to a fourier series for faces. As seen, SVD is a fairly accurate compression tool as well.</p>
</div>
<div style="padding-top: 50px; padding-bottom: 50px;">
    <h1>A 10x10 rubiks cube being solved in 77 milliseconds</h1>
    <img class="img-rounded" src="/assets/images/rubiks.png"/>
    <p>This program logically solves any sized rubiks cube given enough time (I've successfully tested it on the highest of 1000x1000 cube). This was a project I decided to do one winter break out of boredom. I was inspired greatly by the <a href="https://www.youtube.com/watch?v=f9smvQ5fc7Q">The Coding Bullet</a>
</div>
<div style="padding-top: 50px; padding-bottom: 50px;">
    <h1>Solving the nonlinear KDV equation using inverse scattering</h1>
    <img class="img-rounded" src="/assets/images/kdv.gif"/>
    <p>The gif above is a time propigation of the KDV equation using a unique approach to solving nonlinear equations: inverse scattering, then solving the resulting problem using complex analysis by reframing it as a Reimann Hilbert Problem. <p>
</div>
<div style="padding-top: 50px; padding-bottom: 50px;">
    <h1>Neural Network and Linear Algebra Library From Scratch</h1>
    <img class="img-rounded" src="/assets/images/ctensor.gif"/>
    <p>I built a neural network library using native math operations in C++. So the linear algebra, back propigation and required matrix datastructures were all written from scratch. Although our maximum image accuracy was only 90.1 % using the mnist image datasets, building a neural network from the ground up required hours of playing with a pencil in coffee shops because at the time, I did not have the required math pre requisites. Overall, I ended up with a very strong understanding of the basic methods of back propigation, although using a third party library will be my next route when I start a project like this.</p>
</div>
