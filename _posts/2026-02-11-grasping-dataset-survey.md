---
layout: post
title: "Robotic Grasping Dataset Survey"
date: 2026-02-11
description: Interactive survey of datasets for task-oriented and language-conditioned 3D grasp prediction.
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
#gv-root .lg{display:flex;flex-wrap:wrap;gap:.55rem;margin-bottom:1.2rem;padding:.6rem .8rem;background:var(--bg2);border-radius:8px;font-size:.75rem;align-items:center}
#gv-root .lt{font-weight:600;color:var(--m);font-size:.68rem;text-transform:uppercase;letter-spacing:.05em}
#gv-root .ft{display:flex;flex-wrap:wrap;gap:.45rem;margin-bottom:1.2rem;align-items:center}
#gv-root .fl{font-size:.72rem;font-weight:600;color:var(--m);text-transform:uppercase;letter-spacing:.05em;margin-right:.1rem}
#gv-root .fg{display:flex;align-items:center;gap:.2rem}
#gv-root .fb{padding:.25rem .6rem;border:1px solid var(--b);border-radius:5px;background:var(--bg);font-size:.78rem;cursor:pointer;transition:all .15s;color:var(--txt)}
#gv-root .fb:hover{border-color:var(--a);color:var(--a)}
#gv-root .fb.on{background:var(--a);color:#fff;border-color:var(--a)}
#gv-root .dv{width:1px;height:22px;background:var(--b);margin:0 .4rem}
#gv-root .tg{display:inline-flex;align-items:center;padding:.12rem .45rem;border-radius:4px;font-size:.68rem;font-weight:600;white-space:nowrap}
#gv-root .t-la{background:#065f46;color:#a7f3d0}
#gv-root .t-nl{background:#991b1b;color:#fecaca}
#gv-root .t-gr{background:#1e40af;color:#bfdbfe}
#gv-root .t-dx{background:#5b21b6;color:#ddd6fe}
#gv-root .t-sv{background:#92400e;color:#fde68a}
#gv-root .t-f3{background:#166534;color:#bbf7d0}
#gv-root .t-mv{background:#854d0e;color:#fef08a}
#gv-root .t-rl{background:#9d174d;color:#fbcfe8}
#gv-root .t-sm{background:#075985;color:#bae6fd}
#gv-root .t-2d{background:#6b21a8;color:#e9d5ff}
#gv-root .t-6d{background:#065f46;color:#a7f3d0}
html:not([data-theme="dark"]) #gv-root .t-la{background:#ecfdf5;color:#059669}
html:not([data-theme="dark"]) #gv-root .t-nl{background:#fef2f2;color:#dc2626}
html:not([data-theme="dark"]) #gv-root .t-gr{background:#eff6ff;color:#2563eb}
html:not([data-theme="dark"]) #gv-root .t-dx{background:#f5f3ff;color:#7c3aed}
html:not([data-theme="dark"]) #gv-root .t-sv{background:#fffbeb;color:#d97706}
html:not([data-theme="dark"]) #gv-root .t-f3{background:#f0fdf4;color:#15803d}
html:not([data-theme="dark"]) #gv-root .t-mv{background:#fefce8;color:#a16207}
html:not([data-theme="dark"]) #gv-root .t-rl{background:#fdf2f8;color:#be185d}
html:not([data-theme="dark"]) #gv-root .t-sm{background:#f0f9ff;color:#0369a1}
html:not([data-theme="dark"]) #gv-root .t-2d{background:#faf5ff;color:#7e22ce}
html:not([data-theme="dark"]) #gv-root .t-6d{background:#ecfdf5;color:#047857}
#gv-root .tw{overflow-x:auto;border:1px solid var(--b);border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
#gv-root table{width:100%;border-collapse:collapse;font-size:.82rem}
#gv-root thead{background:var(--bg2);position:sticky;top:0;z-index:10}
#gv-root th{padding:.65rem .8rem;text-align:left;font-weight:600;font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;color:var(--m);border-bottom:2px solid var(--b);cursor:pointer;user-select:none;white-space:nowrap}
#gv-root th:hover{color:var(--a)}
#gv-root td{padding:.55rem .8rem;border-bottom:1px solid var(--b);vertical-align:middle;color:var(--txt)}
#gv-root tr:last-child td{border-bottom:none}
#gv-root tr:hover td{background:var(--bg3)}
#gv-root .dn{font-weight:600;color:var(--a)}
#gv-root .dn a{color:inherit;text-decoration:none}
#gv-root .dn a:hover{text-decoration:underline}
#gv-root .vn{font-size:.73rem;color:var(--m)}
#gv-root .tc{display:flex;flex-wrap:wrap;gap:.2rem}
#gv-root .nr{text-align:center;padding:2.5rem;color:var(--m);font-size:.88rem}
</style>

<script>
document.addEventListener("DOMContentLoaded",function(){
const R=document.getElementById("gv-root");if(!R)return;
const D=[
{n:"PRISM",s:"GraspMolmo",y:2025,v:"arXiv",u:"https://arxiv.org/abs/2505.13441",i:"Single-view RGB-D",w:"single",g:"gripper",l:"yes",ld:"Open-vocab NL (GPT-4o)",sc:"379K samples, 2,356 obj",d:"sim"},
{n:"Grasp-Anything-6D",s:"",y:2024,v:"ECCV",u:"https://arxiv.org/abs/2407.13842",i:"Scene point cloud",w:"full",g:"gripper",l:"yes",ld:"Free-form language",sc:"1M scenes, 200M+ grasps",d:"sim"},
{n:"TaskGrasp",s:"",y:2020,v:"CoRL",u:"https://sites.google.com/view/taskgrasp",i:"Partial PC (RGBD→PC)",w:"single",g:"gripper",l:"yes",ld:"56 task verbs",sc:"191 obj, 250K labels",d:"real"},
{n:"LA-TaskGrasp",s:"GraspGPT",y:2023,v:"RA-L",u:"https://github.com/mkt1412/GraspGPT_public",i:"Partial point cloud",w:"single",g:"gripper",l:"yes",ld:"LLM descriptions (8.2K)",sc:"191 obj + language",d:"real"},
{n:"LaViA-TaskGrasp",s:"FoundationGrasp",y:2025,v:"T-ASE",u:"https://arxiv.org/abs/2404.10399",i:"RGB + partial PC",w:"single",g:"gripper",l:"yes",ld:"2M+ instruction templates",sc:"191 obj + 2M instr.",d:"real"},
{n:"6DTG",s:"",y:2025,v:"arXiv",u:"https://arxiv.org/abs/2502.16976",i:"Scene point cloud",w:"full",g:"gripper",l:"yes",ld:"6 task class labels",sc:"4,391 scenes, 2M+ grasps",d:"sim"},
{n:"MV-TOD",s:"",y:2025,v:"Under review",u:"",i:"Multi-view RGB-D",w:"multi",g:"gripper",l:"yes",ld:"Open-vocab (GPT-4V, 671K)",sc:"15K scenes, 3,300+ obj",d:"sim"},
{n:"SemGrasp / CapGrasp",s:"",y:2024,v:"ECCV",u:"https://arxiv.org/abs/2404.03590",i:"3D mesh (full)",w:"full",g:"dexterous",l:"yes",ld:"260K captions (3 levels)",sc:"50K grasps",d:"sim"},
{n:"DexGYSNet",s:"Grasp as You Say",y:2024,v:"NeurIPS",u:"https://arxiv.org/abs/2405.19291",i:"3D mesh (full)",w:"full",g:"dexterous",l:"yes",ld:"50K grasp-language pairs",sc:"1,800 obj, 50K pairs",d:"sim"},
{n:"DexTOG-80K",s:"",y:2025,v:"arXiv",u:"https://arxiv.org/abs/2504.04573",i:"3D mesh (full)",w:"full",g:"dexterous",l:"yes",ld:"5 task desc. per obj",sc:"80K grasps, 80 obj",d:"sim"},
{n:"Grasp-Anything++",s:"",y:2024,v:"CVPR",u:"https://airvlab.github.io/grasp-anything/",i:"RGB image",w:"single",g:"gripper",l:"yes",ld:"10M+ part-level NL",sc:"1M images, 3M+ obj",d:"sim"},
{n:"OCID-VLG",s:"",y:2023,v:"CoRL",u:"https://github.com/gtziafas/OCID-VLG",i:"RGB-D image",w:"single",g:"gripper",l:"yes",ld:"Referring expressions",sc:"90K tuples, 31 cats",d:"real"},
{n:"GraspNet-1Billion",s:"",y:2020,v:"CVPR",u:"https://graspnet.net",i:"RGB-D (dual cameras)",w:"single",g:"gripper",l:"no",ld:"",sc:"97K imgs, 88 obj, 1B+ grasps",d:"real"},
{n:"ACRONYM",s:"",y:2021,v:"ICRA",u:"https://sites.google.com/view/graspdataset",i:"3D mesh (ShapeNet)",w:"full",g:"gripper",l:"no",ld:"",sc:"8,872 obj, 17.7M grasps",d:"sim"},
{n:"Dex-Net 2.0",s:"",y:2017,v:"RSS",u:"https://berkeleyautomation.github.io/dex-net/",i:"Synthetic depth",w:"single",g:"gripper",l:"no",ld:"",sc:"1,500+ obj, 6.7M pairs",d:"sim"},
{n:"MetaGraspNet",s:"",y:2022,v:"ICRA",u:"",i:"RGB-D image",w:"single",g:"gripper",l:"no",ld:"",sc:"217K scenes, 82 obj",d:"sim"},
{n:"DexGraspNet",s:"",y:2023,v:"ICRA",u:"https://pku-epic.github.io/DexGraspNet/",i:"3D mesh (full)",w:"full",g:"dexterous",l:"no",ld:"",sc:"5,355 obj, 1.32M grasps",d:"sim"},
{n:"DexGraspNet 2.0",s:"",y:2024,v:"CoRL",u:"https://pku-epic.github.io/DexGraspNet/",i:"3D scene (cluttered)",w:"full",g:"dexterous",l:"no",ld:"",sc:"8,270 scenes, 427M grasps",d:"sim"},
{n:"3D AffordanceNet",s:"",y:2021,v:"CVPR",u:"",i:"Full point cloud",w:"full",g:"gripper",l:"no",ld:"Affordance categories",sc:"22,949 shapes, 23 cats",d:"sim"},
{n:"ContactDB",s:"",y:2019,v:"CVPR",u:"https://contactdb.cc.gatech.edu/",i:"3D mesh + thermal",w:"full",g:"dexterous",l:"no",ld:"2 intents: use, handoff",sc:"50 obj, 3,750 grasps",d:"real"},
{n:"GAPartNet",s:"",y:2023,v:"CVPR",u:"",i:"Point cloud",w:"full",g:"gripper",l:"no",ld:"9 actionable part classes",sc:"1,166 obj, 8,489 parts",d:"sim"},
{n:"HOI4D",s:"",y:2022,v:"CVPR",u:"https://hoi4d.github.io/",i:"Egocentric RGB-D",w:"single",g:"dexterous",l:"no",ld:"54 interaction tasks",sc:"2.4M frames, 800 obj",d:"real"},
{n:"OakInk",s:"",y:2022,v:"CVPR",u:"https://github.com/oakink/OakInk",i:"Multi-view RGB + mesh",w:"multi",g:"dexterous",l:"no",ld:"4 intents",sc:"1,800 obj, 50K poses",d:"real"},
{n:"OakInk2",s:"",y:2024,v:"CVPR",u:"",i:"Multi-view RGB + mesh",w:"multi",g:"dexterous",l:"yes",ld:"Task desc.+affordance",sc:"Bimanual complex tasks",d:"real"},
{n:"DexYCB",s:"",y:2021,v:"CVPR",u:"https://dex-ycb.github.io/",i:"Multi-view RGB",w:"multi",g:"dexterous",l:"no",ld:"",sc:"582K frames, 20 YCB obj",d:"real"},
{n:"ARCTIC",s:"",y:2023,v:"CVPR",u:"https://arctic.is.tue.mpg.de/",i:"Multi-view RGB (8+1 ego)",w:"multi",g:"dexterous",l:"no",ld:"",sc:"2.1M frames, 11 obj",d:"real"},
];
let F={lang:"all",ee:"all",view:"all",data:"all"},sK="y",sD=-1;
function t(c,x){return'<span class="tg t-'+c+'">'+x+"</span>"}
function mf(e){return(F.lang==="all"||e.l===F.lang)&&(F.ee==="all"||e.g===F.ee)&&(F.view==="all"||e.w===F.view)&&(F.data==="all"||e.d===F.data)}
function rr(e){
const lt=e.l==="yes"?t("la","✓ Lang"):t("nl","✗");
const gt=e.g==="gripper"?t("gr","Gripper"):t("dx","Dexterous");
const vt=e.w==="single"?t("sv","Single-view"):e.w==="multi"?t("mv","Multi-view"):t("f3","Full 3D");
const dt=e.d==="real"?t("rl","Real"):t("sm","Synthetic");
const nh=e.u?'<span class="dn"><a href="'+e.u+'" target="_blank">'+e.n+"</a></span>":'<span class="dn">'+e.n+"</span>";
const sh=e.s?'<br><span class="vn">'+e.s+"</span>":"";
const ldText=e.ld?'<div style="font-size:.71rem;color:var(--m);margin-top:2px">'+e.ld+"</div>":"";
return"<tr><td>"+nh+sh+"</td><td>"+e.y+'</td><td><span class="vn">'+e.v+"</span></td><td style='font-size:.78rem'>"+e.i+"</td><td>"+vt+"</td><td>"+gt+'</td><td><div class="tc">'+lt+"</div>"+ldText+"</td><td style='font-size:.78rem'>"+e.sc+"</td><td>"+dt+"</td></tr>"}
function render(){
const fd=D.filter(mf);
fd.sort((a,b)=>{let va=a[sK],vb=b[sK];if(typeof va==="string"){va=va.toLowerCase();vb=vb.toLowerCase()}return va<vb?-1*sD:va>vb?1*sD:0});
const tb=R.querySelector("#gv-tb"),nr=R.querySelector("#gv-nr");
if(!fd.length){tb.innerHTML="";nr.style.display="block"}
else{nr.style.display="none";tb.innerHTML=fd.map(rr).join("")}
const lc=fd.filter(e=>e.l==="yes").length,rc=fd.filter(e=>e.d==="real").length,dc=fd.filter(e=>e.g==="dexterous").length;
R.querySelector("#gv-st").innerHTML='<div style="display:flex;align-items:baseline;gap:.35rem"><span class="sn">'+fd.length+'</span><span class="sl">datasets</span></div><div style="display:flex;align-items:baseline;gap:.35rem"><span class="sn">'+lc+'</span><span class="sl">with language</span></div><div style="display:flex;align-items:baseline;gap:.35rem"><span class="sn">'+rc+'</span><span class="sl">real-world</span></div><div style="display:flex;align-items:baseline;gap:.35rem"><span class="sn">'+dc+'</span><span class="sl">dexterous</span></div>'}
R.innerHTML=`
<div class="st" id="gv-st"></div>
<div class="lg"><span class="lt">Legend:</span>${t("la","✓ Language")} ${t("nl","✗ No Language")} ${t("gr","Gripper")} ${t("dx","Dexterous")} ${t("sv","Single-view")} ${t("f3","Full 3D")} ${t("mv","Multi-view")} ${t("rl","Real")} ${t("sm","Synthetic")}</div>
<div class="ft">
<span class="fl">Language:</span><div class="fg" data-f="lang"><button class="fb on" data-v="all">All</button><button class="fb" data-v="yes">✓ Yes</button><button class="fb" data-v="no">✗ No</button></div>
<div class="dv"></div>
<span class="fl">End-effector:</span><div class="fg" data-f="ee"><button class="fb on" data-v="all">All</button><button class="fb" data-v="gripper">Gripper</button><button class="fb" data-v="dexterous">Dexterous</button></div>
<div class="dv"></div>
<span class="fl">View:</span><div class="fg" data-f="view"><button class="fb on" data-v="all">All</button><button class="fb" data-v="single">Single-view</button><button class="fb" data-v="full">Full 3D</button><button class="fb" data-v="multi">Multi-view</button></div>
<div class="dv"></div>
<span class="fl">Data:</span><div class="fg" data-f="data"><button class="fb on" data-v="all">All</button><button class="fb" data-v="real">Real</button><button class="fb" data-v="sim">Synthetic</button></div>
</div>
<div class="tw"><table><thead><tr>
<th data-s="n">Dataset</th><th data-s="y">Year ▼</th><th>Venue</th><th>Input</th><th>View</th><th>End-effector</th><th>Language</th><th>Scale</th><th>Data</th>
</tr></thead><tbody id="gv-tb"></tbody></table>
<div class="nr" id="gv-nr" style="display:none">No datasets match the current filters.</div></div>`;
R.querySelectorAll(".fg").forEach(g=>{const ft=g.dataset.f;g.querySelectorAll(".fb").forEach(b=>{b.addEventListener("click",()=>{g.querySelectorAll(".fb").forEach(x=>x.classList.remove("on"));b.classList.add("on");F[ft]=b.dataset.v;render()})})});
R.querySelectorAll("th[data-s]").forEach(th=>{th.addEventListener("click",()=>{const k=th.dataset.s;if(sK===k)sD*=-1;else{sK=k;sD=k==="y"?-1:1}R.querySelectorAll("th").forEach(h=>h.textContent=h.textContent.replace(/ [▲▼]/,""));th.textContent+=sD===1?" ▲":" ▼";render()})});
render()});
</script>
