# Protecting ourselves against trivial knowledge

## Foundational versus trivial knowledge

Every developer has some bits of trivia about a framework or tool if they've worked on it long enough. "Did you know," they'll start, "that from `version X` to `version Y`, our frontend framework had this bug that we had to work around? But it wasn't there from version `X - n` to `X - 1`."

That sort of knowledge is **trivia**. We spend time learning about the rough edges of a tool, then these rough edges are sanded away (hopefully, eventually). The time and energy learning that specific quirk, then working around that specific quirk, has been spent. We wouldn't have had to learn this if the tool did not have this one weird trick.

Framework-specific knowledge can sometimes also qualify as trivia. By what metric does framework-specific knowledge pass through the crucible of user adoption to enter the hallowed halls of general programming know-how? Is knowing React, the dominant frontend framework of Big Tech, less trivial than knowing Angular 1?

<!-- insert photo -->

We are naturally at the mercy of whoever is writing these tools, who are at the mercy of some perceived deadline or race to production. The people who set the deadline are setting it based on their perception of the market. User adoption made React what it is today. So it goes.

The way tools are made incentivizes speed above reliability. One of the ways we are able to keep up with these issues is by making our tools open source. There are more eyeballs on the tool, faster reporting, faster adoption. The cognitive load of finding bugs and workarounds is spread out. A common argument which is difficult to quantify is that older proprietary tools were just as busted, we just didn't know. (Does this mean that paid dev tools are worse off than open source tools, because they don't have the additional free QA and stress testing from their users? Again, that's a case-to-case basis; there are no easy answers.)

Either way, the issue is moot: at work, you're going to be using whatever the company uses. There's a **build or buy** matrix, opinions are given, decisions are made. Every team has its own appetite for building versus buying or adopting free open source software. Every team has to set its threshold for reliability and speed. After all, some frameworks and programming languages have a better batting average than others for both traits.

That being said, the time spent learning and working around trivia, whether these are regression bugs, integration quirks, missing features, and so on, **is time that we can't get back**. This puts me, personally, squarely in the camp that heavily skews towards reliable, stable tools. Tools that don't make me learn incantations I'll have to discard later on. I don't want something I'm building to be made on top of quicksand. A tool's development speed, the speed at which it delivers features, is secondary to its ability to keep working after the update.

In a world where we don't have the infinite time to build everything from scratch, how do we choose a programming tool with this in mind? How do we quantify tool adoption based on protecting ourselves from trivia?

## Using reliability as a metric 

Is it safe to say that tool reliability captures the idea of protecting yourself against trivial knowledge? What about the amount of magic a framework uses to hide abstractions - wouldn't that put us at the mercy of framework-specific knowledge? Isn't that also trivia by another name? At this point, why not return to standard libraries that ship with each major programming language's update?
