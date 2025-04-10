# Protecting ourselves against trivial knowledge

## Foundational knowledge vs trivia

Every developer has some bits of trivia about a framework or tool if they've worked on it long enough. "Did you know," they'll start, "that from version X to version Y, our frontend framework had this bug that we had to work around? But it wasn't there from version X-n to X-1."

That sort of knowledge is **trivia**. We spend time learning about the rough edges of a tool, then these rough edges are sanded away. The time and energy we spent learning that specific quirk, then working around that specific quirk, has been spent. We wouldn't have had to learn this if the tool just worked. Such is the price of a regression bug.

We are naturally at the mercy of whoever is writing these tools, who are at the mercy of some perceived deadline or race to production. The people who set the deadline are setting it based on their perception of the market.

The way tools are made incentivizes speed above reliability. One of the ways we are able to keep up with these issues is by making our tools open source. There are more eyeballs on the tool, faster reporting, faster adoption. The cognitive load of finding bugs and workarounds is spread out. A common argument which is difficult to quantify is that older tools were just as busted, we just didn't know.

Either way, the issue is moot: at work, you're going to be using whatever the company uses. There's a **build or buy** decision matrix, opinions are given, decisions are made. Every team has its own appetite for building versus buying or adopting free open source software. Every team has to set its threshold for reliability and speed. After all, some frameworks and programming languages have a better batting average than others for both traits.

That being said, the time spent learning and working around trivia, whether these are regression bugs, integration quirks, missing features, and so on, is time that we can't get back. This puts me, personally, squarely in the camp that will heavily skew towards reliability. I don't want something that I build to be made on top of quicksand. In a world where we don't have the infinite time to build everything from scratch, how do we choose a programming tool with this in mind? How do we quantify tool adoption based on reliability, based on protecting ourselves from trivia?

