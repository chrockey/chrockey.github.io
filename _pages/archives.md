---
layout: page
permalink: /archives/
title: Archives
nav: true
nav_order: 4
---

<div class="post">

{% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}

{% for year in posts_by_year %}
  <h2 class="year">{{ year.name }}</h2>
  <ul class="post-list">
    {% for post in year.items %}
      <li>
        <h3>
          <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        <p>{{ post.description }}</p>
        <p class="post-meta">{{ post.date | date: '%B %-d, %Y' }}</p>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

</div>
