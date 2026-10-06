document.querySelector('.menu-btn').addEventListener('click',()=>document.querySelector('.nav').classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav').classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
function submitForm(e){e.preventDefault();document.getElementById('formMsg').textContent='ধন্যবাদ! আপনার বার্তা গ্রহণ করা হয়েছে।';e.target.reset();return false;}

const defaultNews=[
  {title:'রেড ক্রিসেন্ট ইউনিটের নতুন সেবা কার্যক্রম',date:'০৫ অক্টোবর ২০২৬',category:'সেবা কার্যক্রম',desc:'শিক্ষার্থী স্বেচ্ছাসেবকদের অংশগ্রহণে মানবিক সহায়তা ও সচেতনতামূলক কার্যক্রম পরিচালিত হয়েছে।'},
  {title:'প্রথমিক চিকিৎসা ও স্বেচ্ছাসেবক প্রশিক্ষণ',date:'২৮ সেপ্টেম্বর ২০২৬',category:'প্রশিক্ষণ',desc:'ইউনিট সদস্যদের জন্য প্রাথমিক চিকিৎসা, নিরাপত্তা ও জরুরি সাড়া দেওয়ার প্রশিক্ষণ অনুষ্ঠিত হয়েছে।'},
  {title:'সচেতনতা কর্মসূচিতে শিক্ষার্থীদের অংশগ্রহণ',date:'১৫ সেপ্টেম্বর ২০২৬',category:'সচেতনতা',desc:'স্বাস্থ্য, পরিচ্ছন্নতা ও দুর্যোগ প্রস্তুতি বিষয়ে শিক্ষার্থীদের নিয়ে সচেতনতামূলক কার্যক্রম অনুষ্ঠিত হয়েছে।'}
];
const defaultReports=[
  {month:'সেপ্টেম্বর ২০২৬',summary:'এই মাসে প্রশিক্ষণ, সচেতনতা ও মানবিক সেবামূলক একাধিক কার্যক্রম পরিচালিত হয়েছে।',stats:'৩টি কার্যক্রম • ২টি প্রশিক্ষণ • ২৪ জন স্বেচ্ছাসেবক'},
  {month:'আগস্ট ২০২৬',summary:'স্বেচ্ছাসেবক উন্নয়ন, দলীয় প্রস্তুতি ও কমিউনিটি সেবাকে গুরুত্ব দিয়ে মাসিক কার্যক্রম সম্পন্ন হয়েছে।',stats:'৪টি কার্যক্রম • ১টি ক্যাম্পেইন • ৩০ জন অংশগ্রহণকারী'}
];

function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function getData(key, fallback){
  try { const x=JSON.parse(localStorage.getItem(key)||'null'); return Array.isArray(x)&&x.length?x:fallback; }
  catch(e){ return fallback; }
}
function renderNews(){
  const box=document.getElementById('newsList'); if(!box)return;
  const items=getData('ajfNews',defaultNews);
  box.innerHTML=items.map((n,i)=>`<article class="news-card reveal-item" style="--delay:${i*90}ms">${n.image?`<img src="${esc(n.image)}" alt="${esc(n.title)}">`:`<div class="news-photo">NEWS ${String(i+1).padStart(2,'0')}</div>`}<div class="news-body"><span class="tag">${esc(n.category||'নিউজ')}</span><small>${esc(n.date||'')}</small><h3>${esc(n.title)}</h3><p>${esc(n.desc||'')}</p><a href="#contact">বিস্তারিত →</a></div></article>`).join('');
}
function renderReports(){
  const box=document.getElementById('reportsList'); if(!box)return;
  const items=getData('ajfReports',defaultReports);
  box.innerHTML=items.map((r,i)=>`<article class="report-card reveal-item" style="--delay:${i*100}ms"><div class="report-month">${esc(r.month||'মাসিক রিপোর্ট')}</div><div class="report-line"></div><p>${esc(r.summary||'')}</p><strong>${esc(r.stats||'')}</strong></article>`).join('');
}
function setupReveal(){
  const els=document.querySelectorAll('.reveal-section,.reveal-item');
  if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('visible'));return;}
  const ob=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');ob.unobserve(entry.target)}}),{threshold:.12});
  els.forEach(e=>ob.observe(e));
}
renderNews();renderReports();setupReveal();

(function(){
  const key='ajfWelcomeSeen';
  if(!localStorage.getItem(key)){
    setTimeout(()=>document.getElementById('welcomeOverlay')?.classList.add('show'),350);
  }
})();
function closeWelcome(){
  localStorage.setItem('ajfWelcomeSeen','1');
  document.getElementById('welcomeOverlay')?.classList.remove('show');
}
