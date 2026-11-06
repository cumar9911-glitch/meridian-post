title: Meridian Post
description: Clear, verified reporting.
url: ""
baseurl: ""
markdown: kramdown
permalink: /:year/:month/:title/
plugins:
  - jekyll-feed
  - jekyll-seo-tag
---
layout: default
title: Latest
---
{% assign lead = site.posts.first %}
{% if lead %}
<section class="lead">
  <p class="meta">{{ lead.category }} &middot; {{ lead.date | date: "%B %-d, %Y" }}</p>
  <h1><a href="{{ lead.url | relative_url }}">{{ lead.title }}</a></h1>
  <p class="dek">{{ lead.excerpt | strip_html | strip }}</p>
</section>
<section class="grid">
  {% for post in site.posts offset:1 %}
  <article class="card">
    <p class="meta">{{ post.category }} &middot; {{ post.date | date: "%b %-d" }}</p>
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p>{{ post.excerpt | strip_html | truncate: 140 }}</p>
  </article>
  {% endfor %}
</section>
{% else %}
<p>No articles yet. Add a Markdown file to the _posts folder.</p>
{% endif %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ '/assets/style.css' | relative_url }}">
  {% seo %}
  {% feed_meta %}
</head>
<body>
  <header class="site-header">
    <a class="brand" href="{{ '/' | relative_url }}">{{ site.title }}</a>
    <nav>
      <a href="{{ '/' | relative_url }}">Latest</a>
      <a href="{{ '/about/' | relative_url }}">About</a>
      <a href="{{ '/feed.xml' | relative_url }}">RSS</a>
    </nav>
  </header>
  <main>{{ content }}</main>
  <footer class="site-footer">
    <p>&copy; {{ 'now' | date: "%Y" }} {{ site.title }}. {{ site.description }}</p>
  </footer>
</body>
</html>
---
layout: default
---
<article class="article">
  <p class="meta">{{ page.category }} &middot; {{ page.date | date: "%B %-d, %Y" }}</p>
  <h1>{{ page.title }}</h1>
  <p class="dek">{{ page.excerpt | strip_html | strip }}</p>
  <p class="byline">By {{ page.author | default: "Staff" }}</p>
  <div class="body">{{ content }}</div>
</article>
---
---
:root{--bg:#fff;--ink:#14181f;--muted:#5b6472;--accent:#0b5fff;--tint:#eef2f7;--line:#d9dee6}
@media (prefers-color-scheme:dark){:root{--bg:#10141a;--ink:#eef1f5;--muted:#9aa5b5;--accent:#6ea0ff;--tint:#1a212b;--line:#2a3340}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:1.125rem/1.7 "Source Serif 4",Georgia,serif}
a{color:inherit}
a:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
h1,h2,.brand,.meta,nav,.byline{font-family:"Bricolage Grotesque",system-ui,sans-serif}
.site-header{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem 1.5rem;max-width:68rem;margin:0 auto;padding:1.25rem;border-bottom:3px solid var(--accent)}
.brand{font-size:1.6rem;font-weight:800;text-decoration:none;letter-spacing:-.02em}
nav a{margin-left:1.25rem;text-decoration:none;font-weight:500;color:var(--muted)}
nav a:hover{color:var(--accent)}
main{max-width:68rem;margin:0 auto;padding:2rem 1.25rem 3rem}
.meta{margin:0 0 .5rem;font-size:.95rem;color:var(--muted);font-weight:500}
.lead{max-width:48rem;padding-bottom:2rem}
.lead h1{font-size:clamp(2.2rem,6vw,3.8rem);line-height:1.05;letter-spacing:-.03em;font-weight:800;margin:0 0 1rem}
.lead h1 a{text-decoration:none}
.lead h1 a:hover{color:var(--accent)}
.dek{font-size:1.3rem;color:var(--muted);margin:0 0 1rem}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(17rem,1fr));gap:1.5rem}
.card{background:var(--tint);padding:1.25rem;border-left:4px solid var(--accent)}
.card h2{font-size:1.3rem;line-height:1.2;margin:0 0 .6rem;font-weight:700}
.card h2 a{text-decoration:none}
.card h2 a:hover{color:var(--accent)}
.card p:last-child{margin:0;font-size:1rem;color:var(--muted)}
.article{max-width:42rem;margin:0 auto}
.article h1{font-size:clamp(2rem,5vw,3rem);line-height:1.1;letter-spacing:-.025em;font-weight:800;margin:0 0 1rem}
.byline{font-weight:500;color:var(--muted);padding-bottom:1.25rem;border-bottom:1px solid var(--line)}
.body a{color:var(--accent)}
.body blockquote{margin:1.5rem 0;padding-left:1.25rem;border-left:4px solid var(--accent);font-style:italic}
.site-footer{max-width:68rem;margin:0 auto;padding:1.5rem 1.25rem;border-top:1px solid var(--line);color:var(--muted);font-size:.95rem}
---
layout: default
title: About
---
<div class="article"><h1>About</h1>
<div class="body" markdown="1">
Meridian Post publishes short, sourced news reports. Replace this text with your mission, your team, and how readers can send tips or corrections.
</div></div>
---
layout: post
title: "Downtown farmers market extends into winter for the first time"
category: Community
author: Staff Reporter
---
The downtown farmers market will stay open through the winter, moving indoors to the old train depot starting in December.

Organizers said demand from vendors and shoppers pushed the decision. About 30 vendors have signed up so far.

> This is sample text. Replace it with a real quote and source.

The market will run Saturdays from 9 a.m. to 1 p.m. Replace this paragraph with your own reporting.
