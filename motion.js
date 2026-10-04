const walkthroughs={
solar:{title:'MAGNETIC DATA → FLARE FORECAST',stages:['Magnetic-field features','TCN + attention','Flare classification'],visual:'<svg class="signal-demo" viewBox="0 0 600 120" role="img" aria-label="Illustrative animated magnetic signal"><path d="M0 85 L30 82 55 88 80 72 100 81 125 69 145 88 158 40 170 100 189 73 210 70 234 82 260 65 280 76 302 46 319 79 337 72 354 16 369 107 383 51 400 81 426 66 450 78 474 40 490 79 523 69 547 74 570 59 600 65"/></svg>'},
heat:{title:'WEATHER DATA → LOCAL HEAT WARNINGS',stages:['Weather + satellite data','Thermal stress indices','Ward-level alerts'],visual:'<div class="risk-viz" aria-label="Illustrative animated thermal stress levels">'+[30,45,39,62,78,93,83,64,51].map((x,i)=>`<span style="--height:${x}%;--delay:${i*.08}s"></span>`).join('')+'</div>'},
fruit:{title:'IMAGE → AGRICULTURAL DECISION',stages:['CNN feature extraction','Species + ripeness','Harvest recommendation'],visual:'<div class="decision-viz" aria-label="Three ripeness classes"><span>Ripe</span><span>Unripe</span><span>Damaged</span></div>'},
caption:{title:'VISION → LANGUAGE',stages:['Image preprocessing','ViT encoder','GPT-2 caption decoder'],visual:'<div class="caption-demo" aria-label="Illustrative caption, a dog on the grass">'+['A','dog','on','the','grass.'].map((x,i)=>`<span style="--delay:${i*.3}s">${x}</span>`).join('')+'</div>'}
};
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
const data=walkthroughs[button.dataset.project];
if(!data)return;
const panel=document.createElement('section');panel.className='walkthrough';panel.setAttribute('aria-label','Animated project walkthrough');
panel.innerHTML=`<div class="walk-head"><span>${data.title}</span><div class="walk-controls"><button class="replay pause-animation" type="button">Pause</button><button class="replay replay-animation" type="button">Replay</button></div></div><div class="walk-body">${data.visual}<div class="stage-row">${data.stages.map((s,i)=>`<div class="stage"><small>0${i+1}</small><strong>${s}</strong></div>`).join('')}</div><p class="walk-caption">Illustrative pipeline walkthrough · not a live prediction or experimental result.</p></div>`;
const title=content.querySelector('h2');title.after(panel);
const pause=panel.querySelector('.pause-animation');pause.onclick=()=>{const paused=panel.classList.toggle('animation-paused');pause.textContent=paused?'Play':'Pause'};
panel.querySelector('.replay-animation').onclick=()=>{const body=panel.querySelector('.walk-body');body.replaceWith(body.cloneNode(true));panel.classList.remove('animation-paused');pause.textContent='Pause'};
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){panel.querySelector('.walk-controls').hidden=true}
}));
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal-in');observer.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.section-head,.about,.project,.caption-project,.timeline,.tool-grid>div,.cert-preview').forEach(x=>observer.observe(x))}
