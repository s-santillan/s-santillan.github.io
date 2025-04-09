# Progress doesn't have to be a { horse || arms } race

### _Selling hammers rather than eliminating problems — Progress built on races — Where are we going?_

<div class="content-2-col" markdown>

<div class="header-2-col" markdown>

## Introduction: the typosquatting problem

</div>

<div class="body-2-col" markdown>

The other day I asked a security researcher, a coworker of mine, about typosquatting attacks. A typosquatting attack in this case goes as follows: given a package, such as `pandas`, an attacker might upload a similarly named dependency, such as `pandsa` with mostly the same code. These dependencies are uploaded to a package registry. Developers then download these packages.

If a developer mistypes the installation command, typing in `pandsa` rather than `pandas`, the attacker can later on inject malicious code after the package has been installed. They inject this malicious code in a package update. Developers frequently automate this step, and use so many open source dependencies, that it isn't immediately apparent to them that they've introduced this ticking bomb into their codebase.

There are variants to this type of attack. Sometimes the malicious code is already in the package, sometimes the package used to be a legitimate source of code but was taken over by a new, less upstanding maintainer, et cetera.

My question was, _Why isn't there a human, or a system, to vet packages before they are added to the registry?_ At the very least some human oversight can produce standards such as, "Similarly named packages must not contain a certain percent of overlap or copied code with other packages."

The package registries could define what a "popular" dependency is and increase vigilance on typosquatting attacks for that dependency. They could keep track of who maintains what. Then they could introduce automations to flag these dependencies. The humans could work with cases that can't be handled by automated systems. While not perfect, we'd have the beginnings of a system in place. Many of the examples I've listed here are naive, without enough nuance, but as long as they exist, they can be further refined over time.

My coworker gave two reasons as to why humans don't vet packages:

- The package repository is run by volunteers.
- It'll slow down software production and delivery.

It seems ridiculous that a package repository is run by unpaid or underpaid volunteers while being used all over the world by for-profit billion-dollar companies. But it is. 

Now, because of these reasons, we address these typosquatting attacks at the leaf, rather than at the root, the classic whack-a-mole situation. We live with the increase in attack surface. We have an entire industry around selling security products that detect malicious dependencies. Our security software can state that we successfully caught so many malicious dependency attacks.

Another analogy: imagine that you live next to a body of still water. Rather than clean up the water, you deal with the inevitable mosquito invasion by buying bug spray with a counter that goes up for every mosquito it kills. You've killed 12,467 mosquitoes, hooray! The statistic is meaningless because the body of water exists. You will always be killing mosquitoes as long as the body of still water is there. 

</div>
</div>

<div class="content-2-col" markdown>
<div class="header-2-col" markdown>

## Keeping problems alive to profit out of them

</div>
<div class="body-2-col" markdown>

What would be cheaper - paying a living wage to the volunteers who maintain package registries, so that they can enact better systems, or giving VC funding to fifty or so software companies to develop fifty different solutions?

You could argue that even with a QA system at the source, typosquatting attacks would still exist. They would! But we can't quantify how much less they would be, because we haven't tried to.

The thing with problems is that unless they exist there is nothing to profit off of. Eliminate a class of problems, prevent them from existing at all, and now you can't sell a solution.

In short: the industry is not incentivized to sell you the elimination of a class of problems. They are incentivized to sell you a better hammer with which to play whack-a-mole.

</div>
</div>

<div class="content-2-col" markdown>
<div class="header-2-col" markdown>

## A horse and arms race

</div>
<div class="body-2-col" markdown>

The second reason that my coworker gave me, _speed_, was an interesting answer. Who said that humans vetting packages was going to be "too slow"? By what metric? Have we even tried? Wouldn't there be ways to speed it up, given enough iterations? It was a casual, off-the-cuff answer that speaks to how we think about software development and delivery.

The virtue of speed permeates every aspect of the modern tech industry.

There's the first-mover advantage, the "move fast and break things" motto, even the smarmy adage that it's better to ask for forgiveness rather than permission. There's a bit of a wink on that last one.

</div>
</div>

<div class="content-2-col" markdown>
<div class="header-2-col" markdown>

## What is progress?

</div>
<div class="body-2-col" markdown>

The question that interests me ultimately is, _Are we getting anywhere with all this?_ What are we doing with our shiny hammers that kill the bugs we're not incentivized to eliminate completely? Are we spending time and money on the right things? Is the way we're making things sustainable?

</div>
</div>
