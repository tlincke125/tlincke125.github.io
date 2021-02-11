---
title:  "SVD Facial Detection"
last_modified_at: 2019-01-10
categories:
    - Blog
tags:
    - programming
    - math
categories: projects
gallery:
    - url: /assets/images/eigenfaces.png
      image_path: /assets/images/eigenfaces.png
      alt: eigenfaces
      title: "Eigenfaces - decomposing a set of images as vectors into an orthogonal basis"
    - url: /assets/images/svd.png
      image_path: /assets/images/svd.png
      alt: svd
      title: "Compressing an image using SVD transform"
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


{% include gallery%}

Using a singular value transform on an image, we were able to compress images to 30% their size with no visual loss. Lossless capabilities were possible as well, but generally hovered around 70% of information kept from the original image.

We also aligned a set of faces together and decomposed them into an orthogonal basis to project input images to detect faces in images.


