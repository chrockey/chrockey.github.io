---
layout: post
title: "Robotic Grasping Dataset Survey"
date: 2026-02-11
description: Interactive survey of datasets for task-oriented 3D grasping.
tags: [robotics, grasping, dataset]
categories: research
giscus_comments: false
related_posts: false
---

<div id="gv-root"></div>

<style>
#gv-root{--a:#4f46e5;--m:#6b7280;--b:#e5e7eb;--bg:#fff;--bg2:#f9fafb;--bg3:#fafbfc;--txt:#1a1a2e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6}
html[data-theme="dark"] #gv-root{--a:#818cf8;--m:#9ca3af;--b:#374151;--bg:#1f2937;--bg2:#111827;--bg3:#374151;--txt:#e5e7eb}
#gv-root .st{display:flex;gap:1.5rem;margin-bottom:1.2rem;flex-wrap:wrap}
#gv-root .sn{font-size:1.4rem;font-weight:700;color:var(--a)}
#gv-root .sl{font-size:.8rem;color:var(--m)}
#gv-root .ft{display:flex;flex-wrap:wrap;gap:.45rem;margin-bottom:1.2rem;align-items:center}
#gv-root .fl{font-size:.72rem;font-weight:600;color:var(--m);text-transform:uppercase;letter-spacing:.05em;margin-right:.3rem}
#gv-root .fb{padding:.25rem .6rem;border:1px solid var(--b);border-radius:5px;background:var(--bg);font-size:.78rem;cursor:pointer;transition:all .15s;color:var(--txt)}
#gv-root .fb:hover{border-color:var(--a);color:var(--a)}
#gv-root .fb.on{background:var(--a);color:#fff;border-color:var(--a)}
#gv-root .fb.ex{background:#dc2626;color:#fff;border-color:#dc2626}
#gv-root .dv{width:1px;height:22px;background:var(--b);margin:0 .4rem}
#gv-root .tg{display:inline-flex;align-items:center;padding:.12rem .45rem;border-radius:4px;font-size:.68rem;font-weight:600;white-space:nowrap;margin-right:.15rem;margin-bottom:.15rem}
#gv-root .t-la{background:#065f46;color:#a7f3d0}
#gv-root .t-gr{background:#1e40af;color:#bfdbfe}
#gv-root .t-dx{background:#5b21b6;color:#ddd6fe}
#gv-root .t-hm{background:#7c2d12;color:#fed7aa}
#gv-root .t-sv{background:#92400e;color:#fde68a}
#gv-root .t-f3{background:#166534;color:#bbf7d0}
#gv-root .t-mv{background:#854d0e;color:#fef08a}
#gv-root .t-rl{background:#9d174d;color:#fbcfe8}
#gv-root .t-sm{background:#075985;color:#bae6fd}
html:not([data-theme="dark"]) #gv-root .t-la{background:#ecfdf5;color:#059669}
html:not([data-theme="dark"]) #gv-root .t-gr{background:#eff6ff;color:#2563eb}
html:not([data-theme="dark"]) #gv-root .t-dx{background:#f5f3ff;color:#7c3aed}
html:not([data-theme="dark"]) #gv-root .t-hm{background:#fff7ed;color:#c2410c}
html:not([data-theme="dark"]) #gv-root .t-sv{background:#fffbeb;color:#d97706}
html:not([data-theme="dark"]) #gv-root .t-f3{background:#f0fdf4;color:#15803d}
html:not([data-theme="dark"]) #gv-root .t-mv{background:#fefce8;color:#a16207}
html:not([data-theme="dark"]) #gv-root .t-rl{background:#fdf2f8;color:#be185d}
html:not([data-theme="dark"]) #gv-root .t-sm{background:#f0f9ff;color:#0369a1}
#gv-root .tw{overflow-x:auto;border:1px solid var(--b);border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
#gv-root table{width:100%;border-collapse:collapse;font-size:.82rem}
#gv-root thead{background:var(--bg2);position:sticky;top:0;z-index:10}
#gv-root th{padding:.65rem .8rem;text-align:left;font-weight:600;font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;color:var(--m);border-bottom:2px solid var(--b);cursor:pointer;user-select:none;white-space:nowrap}
#gv-root th:hover{color:var(--a)}
#gv-root td{padding:.55rem .8rem;border-bottom:1px solid var(--b);vertical-align:top;color:var(--txt)}
#gv-root tr:last-child td{border-bottom:none}
#gv-root tr:hover td{background:var(--bg3)}
#gv-root .dn{font-weight:600;color:var(--a)}
#gv-root .dn a{color:inherit;text-decoration:none}
#gv-root .dn a:hover{text-decoration:underline}
#gv-root .vn{font-size:.73rem;color:var(--m)}
#gv-root .tc{display:flex;flex-wrap:wrap;gap:.15rem}
#gv-root .nr{text-align:center;padding:2.5rem;color:var(--m);font-size:.88rem}
</style>

<script>
document.addEventListener("DOMContentLoaded",function(){
const R=document.getElementById("gv-root");if(!R)return;
const D=[
{n:"PRISM",s:"GraspMolmo",y:2025,v:"arXiv",u:"https://arxiv.org/abs/2505.13441",i:"RGB-D",tags:["single","lang","gripper","sim"],ld:"Open-vocab NL (GPT-4o)",sc:"379K samples, 2,356 obj"},
{n:"Grasp-Anything-6D",s:"",y:2024,v:"ECCV",u:"https://arxiv.org/abs/2407.13842",i:"Point cloud",tags:["full","lang","gripper","sim"],ld:"Free-form language",sc:"1M scenes, 200M+ grasps"},
{n:"TaskGrasp",s:"",y:2020,v:"CoRL",u:"https://sites.google.com/view/taskgrasp",i:"Point cloud",tags:["single","lang","gripper","real"],ld:"56 task verbs",sc:"191 obj, 250K labels"},
{n:"LA-TaskGrasp",s:"GraspGPT",y:2023,v:"RA-L",u:"https://github.com/mkt1412/GraspGPT_public",i:"Point cloud",tags:["single","lang","gripper","real"],ld:"LLM descriptions (8.2K)",sc:"191 obj + language"},
{n:"LaViA-TaskGrasp",s:"FoundationGrasp",y:2025,v:"T-ASE",u:"https://arxiv.org/abs/2404.10399",i:"RGB + Point cloud",tags:["single","lang","gripper","real"],ld:"2M+ instruction templates",sc:"191 obj + 2M instr."},
{n:"6DTG",s:"",y:2025,v:"arXiv",u:"https://arxiv.org/abs/2502.16976",i:"Point cloud",tags:["full","lang","gripper","sim"],ld:"6 task class labels",sc:"4,391 scenes, 2M+ grasps"},
{n:"MV-TOD",s:"",y:2025,v:"Under review",u:"",i:"RGB-D",tags:["multi","lang","gripper","sim"],ld:"Open-vocab (GPT-4V, 671K)",sc:"15K scenes, 3,300+ obj"},
{n:"SemGrasp / CapGrasp",s:"",y:2024,v:"ECCV",u:"https://arxiv.org/abs/2404.03590",i:"3D mesh",tags:["full","lang","dex","sim"],ld:"260K captions (3 levels)",sc:"50K grasps"},
{n:"DexGYSNet",s:"Grasp as You Say",y:2024,v:"NeurIPS",u:"https://arxiv.org/abs/2405.19291",i:"3D mesh",tags:["full","lang","dex","sim"],ld:"50K grasp-language pairs",sc:"1,800 obj, 50K pairs"},
{n:"DexTOG-80K",s:"",y:2025,v:"arXiv",u:"https://arxiv.org/abs/2504.04573",i:"3D mesh",tags:["full","lang","dex","sim"],ld:"5 task desc. per obj",sc:"80K grasps, 80 obj"},
{n:"Grasp-Anything++",s:"",y:2024,v:"CVPR",u:"https://airvlab.github.io/grasp-anything/",i:"RGB",tags:["single","lang","gripper","sim"],ld:"10M+ part-level NL",sc:"1M images, 3M+ obj"},
{n:"OCID-VLG",s:"",y:2023,v:"CoRL",u:"https://github.com/gtziafas/OCID-VLG",i:"RGB-D",tags:["single","lang","gripper","real"],ld:"Referring expressions",sc:"90K tuples, 31 cats"},
{n:"GraspNet-1Billion",s:"",y:2020,v:"CVPR",u:"https://graspnet.net",i:"RGB-D",tags:["single","gripper","real"],ld:"",sc:"97K imgs, 88 obj, 1B+ grasps"},
{n:"ACRONYM",s:"",y:2021,v:"ICRA",u:"https://sites.google.com/view/graspdataset",i:"3D mesh",tags:["full","gripper","sim"],ld:"",sc:"8,872 obj, 17.7M grasps"},
{n:"Dex-Net 2.0",s:"",y:2017,v:"RSS",u:"https://berkeleyautomation.github.io/dex-net/",i:"Depth",tags:["single","gripper","sim"],ld:"",sc:"1,500+ obj, 6.7M pairs"},
{n:"MetaGraspNet",s:"",y:2022,v:"CASE",u:"https://arxiv.org/abs/2112.14663",i:"RGB-D",tags:["single","gripper","sim"],ld:"",sc:"217K scenes, 82 obj"},
{n:"DexGraspNet",s:"",y:2023,v:"ICRA",u:"https://pku-epic.github.io/DexGraspNet/",i:"3D mesh",tags:["full","dex","sim"],ld:"",sc:"5,355 obj, 1.32M grasps"},
{n:"DexGraspNet 2.0",s:"",y:2024,v:"CoRL",u:"https://arxiv.org/abs/2410.23004",i:"3D scene",tags:["full","dex","sim"],ld:"",sc:"8,270 scenes, 427M grasps"},
{n:"ContactDB",s:"",y:2019,v:"CVPR",u:"https://contactdb.cc.gatech.edu/",i:"3D mesh + thermal",tags:["full","human","real"],ld:"2 intents: use, handoff",sc:"50 obj, 3,750 grasps"},
{n:"HOI4D",s:"",y:2022,v:"CVPR",u:"https://hoi4d.github.io/",i:"RGB-D (ego)",tags:["single","human","real"],ld:"54 interaction tasks",sc:"2.4M frames, 800 obj"},
{n:"OakInk",s:"",y:2022,v:"CVPR",u:"https://github.com/oakink/OakInk",i:"RGB + 3D mesh",tags:["multi","human","real"],ld:"4 intents",sc:"1,800 obj, 50K poses"},
{n:"OakInk2",s:"",y:2024,v:"CVPR",u:"https://oakink.net/v2/",i:"RGB + 3D mesh",tags:["multi","lang","human","real"],ld:"Task desc.+affordance",sc:"Bimanual complex tasks"},
{n:"DexYCB",s:"",y:2021,v:"CVPR",u:"https://dex-ycb.github.io/",i:"RGB",tags:["multi","human","real"],ld:"",sc:"582K frames, 20 YCB obj"},
{n:"ARCTIC",s:"",y:2023,v:"CVPR",u:"https://arctic.is.tue.mpg.de/",i:"RGB (8+1 ego)",tags:["multi","human","real"],ld:"",sc:"2.1M frames, 11 obj"},
{n:"GigaHands",s:"",y:2025,v:"CVPR",u:"https://ivl.cs.brown.edu/research/gigahands.html",i:"RGB (multi-view)",tags:["multi","lang","human","real"],ld:"84K text annotations",sc:"34h, 56 subj, 14K clips"},
{n:"H2O",s:"",y:2021,v:"ICCV",u:"https://taeinkwon.com/projects/h2o/",i:"RGB-D (multi-view ego)",tags:["multi","lang","human","real"],ld:"Interaction labels",sc:"571K+ frames"},
{n:"TACO",s:"",y:2024,v:"CVPR",u:"https://taco2024.github.io/",i:"RGB (multi-view + ego)",tags:["multi","lang","human","real"],ld:"Action labels",sc:"2.5K seq, 5.2M frames"},
];
const TAGS={single:"Single-view",multi:"Multi-view",full:"Full 3D",lang:"Language",human:"Human Hand",gripper:"Gripper",dex:"Dexterous",real:"Real",sim:"Synthetic"};
const TCLS={single:"sv",multi:"mv",full:"f3",lang:"la",human:"hm",gripper:"gr",dex:"dx",real:"rl",sim:"sm"};
let FI=new Set(),FX=new Set(),sK="y",sD=-1;
function t(c,x){return'<span class="tg t-'+c+'">'+x+"</span>"}
function mf(e){for(let tag of FI){if(!e.tags.includes(tag))return false;}for(let tag of FX){if(e.tags.includes(tag))return false;}return true;}
function rr(e){
const inputTags=e.tags.filter(tag=>["single","multi","full","lang"].includes(tag)).map(tag=>t(TCLS[tag],TAGS[tag])).join(" ");
const eeTags=e.tags.filter(tag=>["gripper","dex","human"].includes(tag)).map(tag=>t(TCLS[tag],TAGS[tag])).join(" ");
const dataTags=e.tags.filter(tag=>["real","sim"].includes(tag)).map(tag=>t(TCLS[tag],TAGS[tag])).join(" ");
const nh=e.u?'<span class="dn"><a href="'+e.u+'" target="_blank">'+e.n+"</a></span>":'<span class="dn">'+e.n+"</span>";
const sh=e.s?'<br><span class="vn">'+e.s+"</span>":"";
const ldText=e.ld?'<div style="font-size:.71rem;color:var(--m);margin-top:2px">'+e.ld+"</div>":"";
return"<tr><td>"+nh+sh+"</td><td>"+e.y+'</td><td><span class="vn">'+e.v+'</span></td><td><div class="tc">'+inputTags+'</div><div style="font-size:.73rem;color:var(--m);margin-top:3px">'+e.i+"</div>"+ldText+'</td><td><div class="tc">'+eeTags+'</div></td><td style="font-size:.78rem">'+e.sc+'</td><td><div class="tc">'+dataTags+"</div></td></tr>"}
function render(){
const fd=D.filter(mf);
fd.sort((a,b)=>{let va=a[sK],vb=b[sK];if(typeof va==="string"){va=va.toLowerCase();vb=vb.toLowerCase()}return va<vb?-1*sD:va>vb?1*sD:0});
const tb=R.querySelector("#gv-tb"),nr=R.querySelector("#gv-nr");
if(!fd.length){tb.innerHTML="";nr.style.display="block"}
else{nr.style.display="none";tb.innerHTML=fd.map(rr).join("")}
const lc=fd.filter(e=>e.tags.includes("lang")).length,rc=fd.filter(e=>e.tags.includes("real")).length,dc=fd.filter(e=>e.tags.includes("dex")).length;
R.querySelector("#gv-st").innerHTML='<div style="display:flex;align-items:baseline;gap:.35rem"><span class="sn">'+fd.length+'</span><span class="sl">datasets</span></div><div style="display:flex;align-items:baseline;gap:.35rem"><span class="sn">'+lc+'</span><span class="sl">with language</span></div><div style="display:flex;align-items:baseline;gap:.35rem"><span class="sn">'+rc+'</span><span class="sl">real-world</span></div><div style="display:flex;align-items:baseline;gap:.35rem"><span class="sn">'+dc+'</span><span class="sl">dexterous</span></div>'}
R.innerHTML=`
<div class="st" id="gv-st"></div>
<div class="ft" id="gv-ft">
<span class="fl">Filter by tags:</span>
<button class="fb" data-t="lang">Language</button>
<div class="dv"></div>
<button class="fb" data-t="gripper">Gripper</button>
<button class="fb" data-t="dex">Dexterous</button>
<button class="fb" data-t="human">Human Hand</button>
<div class="dv"></div>
<button class="fb" data-t="single">Single-view</button>
<button class="fb" data-t="multi">Multi-view</button>
<button class="fb" data-t="full">Full 3D</button>
<div class="dv"></div>
<button class="fb" data-t="real">Real</button>
<button class="fb" data-t="sim">Synthetic</button>
</div>
<div class="tw"><table><thead><tr>
<th data-s="n">Dataset</th><th data-s="y">Year ▼</th><th>Venue</th><th>Input</th><th>End-effector</th><th>Scale</th><th>Data</th>
</tr></thead><tbody id="gv-tb"></tbody></table>
<div class="nr" id="gv-nr" style="display:none">No datasets match the current filters.</div></div>`;
R.querySelectorAll("#gv-ft .fb").forEach(b=>{b.addEventListener("click",()=>{const tag=b.dataset.t;if(FI.has(tag)){FI.delete(tag);b.classList.remove("on");FX.add(tag);b.classList.add("ex")}else if(FX.has(tag)){FX.delete(tag);b.classList.remove("ex")}else{FI.add(tag);b.classList.add("on")}render()})});
R.querySelectorAll("th[data-s]").forEach(th=>{th.addEventListener("click",()=>{const k=th.dataset.s;if(sK===k)sD*=-1;else{sK=k;sD=k==="y"?-1:1}R.querySelectorAll("th").forEach(h=>h.textContent=h.textContent.replace(/ [▲▼]/,""));th.textContent+=sD===1?" ▲":" ▼";render()})});
render()});
</script>
