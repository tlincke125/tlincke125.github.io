---
layout: post
title:  "SVD Facial Detection"
date:   2019-01-10 10:08:15 - 0700
categories: projects
---

See the [paper](https://github.com/tlincke125/portfolio/blob/master/SVD_Image_Compression/paper.pdf)

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  tex2jax: {
    inlineMath: [['$','$'], ['\\(','\\)']],
    processEscapes: true
  }
});
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

<div style="padding-top: 50px; padding-bottom: 50px;">
    <h1>A Singular Value Application for Recognizing Faces</h1>
    <img class="img-rounded" src="/assets/images/eigenfaces.png" height="40%" width="40%"/>
    <img class="img-rounded" src="/assets/images/svd.png" height="40%" width="40%"/>
    <p>Using SVD, we successfully were able to deconstruct faces into an orthogonal basis of vectors. By adjusting certain coefficients of the basis, we reconstructed faces similar to a fourier series for faces. As seen, SVD is a fairly accurate compression tool as well.</p>
</div>
