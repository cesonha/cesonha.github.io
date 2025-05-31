---
title: "My First 6 Months as an Android Developer: Lessons Learned"
date: "2018-12-30"
excerpt: "The first technical post I've ever written."
tags: ["software development", "professional"]
---

This is my first article and I wanted to write about some things that I learned/am still learning in the first 6 months that I am officially working as an Android developer (this article is not Android focused, it is more general) at the company that I was an intern for a little bit more than a year.

Just a little about me: My name is Cesar, I'm from São Paulo, Brazil, I'm 26 years old and recently got my bachelor's degree in computer science and finally started working as a software developer!!!

I work at Colab, it is a startup that works improving the relation between Brazilian (for now) governments and its citizens and I am really glad that I am able to help improve our cities and work in something that has a direct positive social impact.

Even though the company exists since 2013, we are still really small, our tech team is formed by only three devs, including me (as solo Android dev). The other two developers work as iOS dev/CTO and full stack web dev/PO. It is not your ideal software development environment but at the same time it gave me lots of freedom and opportunities to learn.

I learned a lot of technical stuff on these 6 months but in this post I'm focusing on more general things about the software developer routine. This post is definitely not a guide, it is just a compilation of my thoughts about things I learned in practice. Not trying to list MUST DO things but I'd be happy if it helps anyone even though I'm just 6 months into this (:

I used broccoli emojis after each lesson title ("Easier said than done" broccoli scale from 🥦 to 🥦🥦🥦) to specify how easy it was to adopt these lesson into my work routine and as an excuse to put broccoli in the article.

**1 — Ask basic questions, they will stop being basic really fast 🥦**

That's something really small and easy to do for most people, but sometimes I was embarrassed for having to ask basic questions about how things work and would lose a lot of time googling (sometimes unsuccessfully) when I could ask for help and clarify things in a sec.

I'm not saying to never google and investigate things on your own. Searching properly is an invaluable skill for anyone, but sometimes we are better off asking for help from people who already have experience with the system/implementation details.

**2 — Be thankful for those code reviews 🥦🥦**

We are only a three dev team and each one works in an almost separate product, but we manage to work with pull requests and review each other's code. I cannot stress how much I think code reviews are important (for reinforcing coding conventions, prevent lack of attention mistakes from going live, etc) but it is easy to take some review comments personally and as a criticism to your coding abilities.

I say embrace those comments and really think through them. If the person who reviewed your PR took the time to comment something, you should try to understand his or her logic and hopefully you'll see that it actually makes sense and you could improve your implementation. This could hit the ego but it is a great exercise to both handling with criticism and understanding your peers' way of thinking. And hey, why not improve your code and ship better a product?

**3 — It's ok to abstract how things work 🥦🧀**

This "Easier said than done" broccoli comes with cheese because you should eat it with caution. I mean, it is so easy to let go of understanding how things really work and copy old classes patterns/architectural decisions that this habit could actually harm your learning and professional development (assuming you want to keep learning new things).

For example, I used Retrofit with Gson for a long time without actually understanding it because it was easy to just copy an interface and adapt it for a new route. It didn't do any harm at the beginning but after needing to parse some different Jsons I had to study how both Retrofit and Gson worked together (at least partially) or else I would have to write really stupid code to workaround the fact that I was limited to the code snippets I was only replicating.

And for an example where I really decided "I think it's ok to stop here" there was this one time when I was having problems with photo rotation handling in Samsung devices (damn you, Samsung) and I started debugging it so deeply that I actually downloaded JPEG RFCs to understand which bits represented what in JPEGs metadata because some EXIF data WAS NOT MAKING SENSE… I stumbled on this piece of code in the source code of the Fresco library

![Debugging JPEG metadata in Samsung devices](/images/blog/image1.webp)
```
(magic == APP1_EXIF_MAGIC && zero == 0), for reals?
```

I mean, I really didn't need to understand EVERYTHING to just adapt my code to use their functions and fix the rotation issue :)

**4 — Good practices are good 🥦🥦**

Ok, this one seems to be just a filler for me to get to 6 lessons but actually in a small company environment with more features to be implemented than developers to implement the struggle to keep good practices (and especially adopt new ones) is REAL. I mean, we have a really low automated test coverage and this always results in a great amount of time lost retesting stuff manually and that anxiety feeling when deploying big features.

When having to quickly deliver features, I found out the hard way how it is surprisingly difficult to keep with good coding and general development practices: coding conventions, from indentation to class/variable naming, decent commit messages, etc. Unfortunately, writing tests is not our priority at the moment so the test coverage just keeps going down. Sometimes all of this builds up as stressing but an important thing I learned talking to other people and following other devs on Twitter is that will always be better practices to adopt and ways of improving your development process so I think it is a matter of trying to work the best with what we have knowing that there is always trade-offs when neglecting some practices.

Real life development is not ideal but it shouldn't be a big mess, keep an eye on opportunities to adopt good practices and don't be afraid to suggest possible improvements.

**5 — Don't code-shame past contributors 🥦🥦🥦**

It follows from the previous lesson that, knowing the development environment is not always ideal, and you don't know how things were in the past, you should try not to complain about "ugly code", confusing implementations, unnecessary copy-pasting, etc.

This one is REALLY easier said than done because is so damn easy to blame non-present developers for the extra time you're taking on a task or some specific bug/crash. I just don't think is healthy for the work environment, it creates a sort of anxiety about code criticism that can affect even how you react to code reviews (lesson 2).

We all know when code is messy and smelly but the goal is to deal with it the best way possible (maybe refactor it?) and communicate the difficulties/technical debt in a non-violent way.

**6 — Communication is hard (and FUCKING valuable) 🥦🥦🥦**

I really didn't thought communication would be this big of a challenge but it turned out to be one of the main difficulties I had (and still have) in the workplace.

The first step was to recognize that I had problems communicating my implementation ideas to fellow developers as well as communicating how things work in a non developer friendly manner. Actually, I also started to realize that almost everyone has some communication issue because IT IS HARD to express yourself clearly to others. I think I'm improving, but it is something that demands constant attention and practice.

I found out that when talking to other developers, if I'm not being able to express my ideas clearly, it helps me to write it down first (it can be bothersome but eventually you get better at this).

When talking to non developer people, I noticed that sometimes I had to "rewind" the conversation because I entered into some unnecessary technical detail, but this started to happen less frequently with time. It's like having to exercise this way of abstracting the unimportant stuff and also adapting which details you can explain to each different person that could help them understand you.

**Wrapping up**

The idea of starting to write articles like this one actually came as another way of trying to improve my communication skills because, in the whole package of the "communication is hard" lesson, I also realized that being able to clearly understand other people's ideas and thoughts makes me learn a lot more from them, and everyone (techy or not) has amazing and rich insights that could help you become a better person and professional :)
