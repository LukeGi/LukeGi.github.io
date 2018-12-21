---
author: LuHeGi
title: Using Jekyll
excerpt_separator: <!--more-->
---

## You did what?

Today I used Jekyll for the first time. I used it to publish this website on Github Pages. The experience of learning how to use it was very smooth, and I found it very easy. <!--more-->As is normal for me, however, I struggled setting it up straight away, which led to me getting confused and it taking a couple of hours before I could start actually doing anything interesting.

## What did I use to learn how to use Jekyll?

Well, it turns out that the people who make it are really good at making tutorials; they have a [step-by-step guide](https://jekyllrb.com/docs/step-by-step/01-setup/) for how to use it.

## What is a Jekyll

Jekyll is a static site generator, which means it makes it easier to turn your thoughts into webpages. It works by putting blog posts into templates. It also offers a system called _Liquid_, which allows you to inject information like the page title or post date into your code by using the following syntax... {% raw %} `{{ page.title }}` or `{{ post.date | date_to_string }}` {% endraw %}. This system works really well for blogs (which is what it was design for, so that makes sense.)
