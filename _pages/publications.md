---
layout: page
permalink: /publications/
title: Publications
description:
years: [2025, 2024, 2023, 2022, 2021]
nav: true
---
<!-- _pages/publications.md -->
<div class="publications">
* indicates equal contribution.

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
