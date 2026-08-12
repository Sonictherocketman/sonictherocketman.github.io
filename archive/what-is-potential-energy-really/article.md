slug: what-is-potential-energy-really
published: Mon, 27 Jul 2026 at 04:23 PM
updated: Wed, 12 Aug 2026 00:20:17 
title: What is Potential Energy, Really?
status: publish
author: Brian Schrader
hero: /images/blog/dummy-path.jpg
summary: Running, city blocks, and a meditation on what distance even means and the notion of gravity itself.
showfootercallout: true
tags: math, physics
thread: math-and-physics

As with seemingly every other man my age, I've taken up running to stay fit. Your metabolism slows as you age and what used to come for free with youth now takes time and deliberate effort to maintain. I don't care for the running, but it needs to be done.

The thing is: it does give me lots of idle time to think, just like a long walk. Both have become for me a form of meditation, a way to de-stress and to mull over complex ideas. I find that I think better when I'm moving, regardless of precisely how. Yet, near the end of every run my thoughts inevitably return to the same idea:

> When will this be over? I want to be done.

Of course I want to complete my run, to go the distance I set for myself, but I also want, very badly, to do it in the most efficient way possible.

## The Optimal Route

To end where you started, any route must go south for just as long as it goes north and the same goes for east and west. If you know it's three blocks west to get home and two blocks north then, because you're confined to the city grid, it doesn't matter what order you take those steps in. It's a quirk of city blocks that there are *multiple* shortest paths, but we'll come to that.<sup>1</sup>

<div class="image-center">
  <img src="/images/blog/city-block.jpg" alt="" style="padding: 0; max-width: 100%; border-radius: 5px;">
  <div style="display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap; padding: 1rem;">
    <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>E</mi><mn>1</mn></msub><mo>=</mo><mn>2</mn><mi>U</mi><mo>+</mo><mn>3</mn><mi>L</mi></mrow></math>
    <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>E</mi><mn>2</mn></msub><mo>=</mo><mn>2</mn><mi>U</mi><mo>+</mo><mn>3</mn><mi>L</mi></mrow></math>
    <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>E</mi><mn>3</mn></msub><mo>=</mo><mn>3</mn><mi>U</mi><mo>+</mo><mn>3</mn><mi>L</mi><mo>+</mo><mn>1</mn><mi>D</mi></mrow></math>
  </div>
  <center><small>Paths (1) and (2) take different routes but have the same total "effort" required to complete them and cover the same amount of total distance. It's only path (3) that differs. Why?</small></center>
</div>

If you find that you need to add distance to your run as you go then you'll have to deviate from these ideal paths. To do that you need to use energy, more so than you would need to accomplish the ideal route. Of course you need energy to move your body in general but so long as we assume that you always intend to *eventually* go back home, and that your speed is constant, the energy to go from here to there is fixed by your current position along the ideal path, and thus already accounted for. The energy required to traverse that path can't change because that would require the path to get longer, and that means it wouldn't be the ideal path anymore. Thus, what can change is the amount of energy you use to get home *beyond* that fixed amount.

<math style="text-align: center; display: block;"  xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>E</mi><mrow><mi>t</mi><mi>o</mi><mi>t</mi><mi>a</mi><mi>l</mi></mrow></msub><mo>=</mo><msub><mi>E</mi><mrow><mi>i</mi><mi>d</mi><mi>e</mi><mi>a</mi><mi>l</mi></mrow></msub><mo>+</mo><msub><mi>E</mi><mrow><mi>a</mi><mi>d</mi><mi>d</mi><mi>i</mi><mi>t</mi><mi>i</mi><mi>o</mi><mi>n</mi><mi>s</mi></mrow></msub></mrow></math>

We can arrive at a formal definition by renaming a few things. If we call the shortest, ideal route a *geodesic*, then this added energy is defined as whatever energy is required to deviate from a geodesic. We call this "potential energy" (V). If we rename the energy required to move along the geodesic the "kinetic energy" (T) then what we have is the familiar equation from elementary physics.<sup>2</sup>

<math style="text-align: center; display: block;"  xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>E</mi><mo>=</mo><mi>T</mi><mo>+</mo><mi>V</mi></mrow></math>

Crucially this potential energy is only expended to deviate from the ideal path, not to relax back toward it&mdash;that's just the process of following the new shortest path. In the (1)/(3) split in our diagram above, the energy is expended along the path of the green arrow. From there the path back is fully determined. One consequence of this is that, in our example, added blocks always come in pairs. Whatever additional city blocks you traverse away from your destination must eventually be retraced if you are to get home.

Now these are not the typical definitions of these terms that you find in elementary physics, because in that context, kinetic energy is the energy of motion. Here we've discussed it as simply the energy required to reach a given destination. However these are two sides of the same coin. Throwing a ball from A to B causes the ball to move. If we don't know where the ball will land (i.e. we don't know the value of B), then we can define the kinetic energy to be the energy of motion and use that to compute the value of B. If we know the values of A and B already, then the kinetic energy is just the energy required to reach B from A. These are the same argument given two different framings.

<div class="image-center">
  <img src="/images/blog/ball-trajectory.jpg" alt="" style="padding: 0; max-width: 100%; border-radius: 5px;">
  <center><small>Keep in mind it doesn't matter that a real ball won't <q>end</q> its journey mid-air, but it doesn't end it's journey when it hits the ground either. It's still riding on the moving Earth.</small></center>
</div>

{% include 'newsletter-callout.html' %}

One obvious complaint you may have about my city-block example is that it's wrong. The ideal path between my starting point and ending point is a straight line! That's Euclid's first postulate from geometry! It's the very definition of what a straight line [even is](https://mathworld.wolfram.com/EuclidsPostulates.html), right?

<div class="image-right" style="max-width: 320px;">
  <img src="/images/blog/dummy-path.jpg" alt="" style="padding: 0; max-width: 100%; border-radius: 5px;">
  <center><small>Isn't all this just a bit silly?</small></center>
</div>

And you'd be entirely correct, kind of.

The thing is, you can't run <q>as the crow flies</q>, at least I can't. Confined to the ground, such a straight line path isn't an option. This is an important restriction because it allows us to redefine what the word <q>distance</q> even means. We will come out of that discussion with something much more powerful than we might first expect. To do that I have one question we must answer:

What's the distance from Rome to Edinburgh?

A clever reader might want to know which units I want them to use, but the cleverest of you might instead ask me, <q>for whom</q>? For a car the journey is about 1,545 miles; for a plane it's 1,002. For the Roman Emperor Hadrian it is, rather famously, undefined.

<style>
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}
.tab button {
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  flex: 1;
}
.tab button:hover {
  background-color: #ddd;
}
.tab button.active {
  background-color: #ccc;
}
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
}
</style>
<script>
function showCard(evt, name) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";
}
</script>
<div class="tab" style="display: flex; justify-content: space-between;">
  <button id="defaultOpen" class="tablinks" onclick="showCard(event, 'dist-by-car')">Via Car</button>
  <button class="tablinks" onclick="showCard(event, 'dist-by-plane')">Via Plane</button>
  <button class="tablinks" onclick="showCard(event, 'dist-by-hadrian')">Via Hadrian</button>
</div>

<!-- Tab content -->
<div id="dist-by-car" class="tabcontent active text-center">
    <img src="/images/blog/rom-edi-map.jpg" style="max-width: 100%; padding: 0; border-radius: 5px; width: 500px; margin-right: auto;margin-left:auto;" name="car">
  <center><small>Image credit: Apple Maps</small></center>
</div>

<div id="dist-by-plane" class="tabcontent text-center">
  <img src="/images/blog/rom-edi-arc.gif" style="max-width: 100%; padding: 0; border-radius: 5px;width: 500px; margin-right: auto;margin-left:auto;" class="hide" name="plane">
  <center><small>Image credit: <a href="http://www.gcmap.com/mapui?P=ROM-EDI">Great Circle Mapper</a></small></center>
</div>

<div id="dist-by-hadrian" class="tabcontent text-center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Hadrians_Wall_map.svg" style="max-width: 100%; padding: 0; border-radius: 5px;width: 500px; margin-right: auto;margin-left:auto;" class="hide" name="hadrian">
  <center><small>Image credit: <a href="https://commons.wikimedia.org/wiki/File:Hadrians_Wall_map.svg">Wikimedia Commons</a></small></center>

</div>
<script>
document.getElementById("defaultOpen").click();
</script>

This is all to say that the concept of distance is not independent of the constraints of motion. If we define distance in this way, then we get something called <q>a metric</q> which is our ruler to measure space. Euclid gave us one kind of ruler: the Euclidean Metric defined by the familiar Pythagorean Theorem.

<math style="text-align: center; display: block;"  xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>c</mi><mo>=</mo><msqrt><mrow><msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>
<center><small>The Euclidean Metric</small></center>

However we can also define a metric [that works](https://en.wikipedia.org/wiki/Taxicab_geometry) for our city blocks. This one looks quite different from the usual measure we use and it results in a radically different notion of length. In principle though, lots of functions can be used as metrics and each has its own consequences. The point is that there's no limit to how you define the idea of length.

<math style="text-align: center; display: block;"  xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>c</mi><mo>=</mo><mi>|</mi><mi>a</mi><mo>&#x2212;</mo><mi>b</mi><mi>|</mi></mrow></math>
<center><small>The Taxi Cab Metric</small></center>

Why are we talking about this though? What does any of this have to do with potential energy? That is where we arrive at one of the most important discoveries in all of physics.

## Bending the Grid

Once you understand that the notion of distance depends on the properties of motion and how you draw your grid, you find yourself where Einstein was after 1905, after his first major breakthrough but before he reformulated gravity.

Anyone who's taken high school or introductory college physics knows that Newton taught us that gravity is a force that pulls objects to the ground. That idea was later generalized to the idea that objects live in something called a gravitational field and that field imparts the object with gravitational potential energy.

Einstein realized however that this idea was overbuilt. Instead, he found a different way to understand how gravity works. To see how let's take a step back. Imagine a grid, but a bent one, where the lines are warped. By definition, those lines mark out <q>equal distance</q> so even when they're warped we still say that they are the same distance apart. To see how this is possible, imagine that instead the paper itself is warped and the lines are straight along that warping. You can kind of see this if you squint at the image below.

<div class="image-center">
  <img src="/images/blog/wavy-grid.jpg" alt="" style="padding: 0; max-width: 100%; border-radius: 5px;">
  <center><small>Warped lines or warped paper? Is there a difference?</small></center>
</div>

The ball in the image above has moved along the straightest possible path, it's just that the lines *defining straightness* are bent, so the ball seems to curve. This, in a nutshell, is gravity. Massive objects like the Earth and Sun bend the very grid of space and time. They, in a sense, redefine what it means to move in a straight line.

Under this formulation, there was no need for gravitational potential energy at all. The Earth doesn't pull you down. You *want* to fall toward it because spacetime is curved. It's actually the opposite: the Earth is preventing you from falling!

This wonderful lecture goes through an excellent derivation of this idea that [I encourage you to watch][curved-newton]. It opened my eyes to a lot of this. Consider Newton's First Law:

> A body remains at rest, or in motion at a constant speed in a straight line, unless it is acted upon by a force.

The key insight for those of you still rightfully confused by all this is that usually we define what an object does (move in a line) and then say happens to it (it's acted on by a force). This is only possible because we arrive at the problem with a pre-formulated idea of what a straight line is. Instead we can flip it and then define what a straight line is by what an object does when there's no force on it! In the first instance we define straightness and derive forces. In the second, we eliminate the forces and define whatever happens next as a straight line. So, if the object seems to bend towards the Earth, then that's a straight line. It has to be!

We've moved from imposing a definition to observing one. In a sense we take a step back and watch what nature does, rather than telling it what it *should* do. In doing so we package two concepts into one and gain predictive power.

But enough about gravity. We were talking about running, right?

## Closer to Home

If you follow the city grid on a run, then you're using some variant of the Taxi-Cab Metric to measure distance, and you're constrained by the physics of that metric. I've wondered why the path back home doesn't seem to matter, but it's because of the metric. In Taxi-Cab geometry there are multiple shortest paths. In Euclidean geometry there is only one. No path directly home will affect your total distance. And so, if you need that extra half-mile, you can only get it by running away from where you started, so long as the blocks are essentially the same size. So long as you are retracing blocks, you follow a straight line, a geodesic, back home. Use up some potential energy though, add a single block, and notice you'll actually have added two once you get back. Technically the second block was a geodesic though, but it all still counts.

---
<div class="footnote">
    <sup>1</sup> Assuming of course that the E/W and N/S blocks are of equal length. If they aren't then we actually fastrack to the discussion of curved coordinates in later sections.
</div>
<div class="footnote">
    <sup>2</sup> No I have no idea why T and V were the chosen names for these. Susskind in his class didn't either, but neither of us have looked it up.
</div>

[curved-newton]: https://www.youtube.com/watch?v=IBlCu1zgD4Y
