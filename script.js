(function(){
  var cv=document.getElementById('c'),cx=cv.getContext('2d'),ps=[],run=false;
  var cols=['#ff4f8b','#2d6cff','#ffc533','#29c48a','#9b5cff'];
  function size(){cv.width=innerWidth;cv.height=innerHeight}
  size();addEventListener('resize',size);
  function burst(){
    for(var i=0;i<140;i++)ps.push({x:Math.random()*cv.width,y:-20-Math.random()*cv.height*.5,
      vx:Math.random()*4-2,vy:Math.random()*3+2,s:Math.random()*8+5,r:Math.random()*6,
      vr:Math.random()*.3-.15,c:cols[i%cols.length]});
    if(!run){run=true;tick()}
  }
  function tick(){
    cx.clearRect(0,0,cv.width,cv.height);
    ps=ps.filter(function(p){return p.y<cv.height+20});
    ps.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;
      cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;
      cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore()});
    if(ps.length)requestAnimationFrame(tick);else run=false;
  }
  function party(){
    document.getElementById('cake').classList.toggle('on');
    if(!matchMedia('(prefers-reduced-motion:reduce)').matches)burst();
  }
  Array.prototype.forEach.call(document.querySelectorAll('.go'),function(b){b.addEventListener('click',party)});
  var env=document.getElementById('env'),lt=document.getElementById('letter');
  env.addEventListener('click',function(){
    var o=lt.classList.toggle('open');
    env.setAttribute('aria-expanded',o);
    env.textContent=o?'💌 Close the letter':'💌 Tap to open your letter';
    if(o&&!matchMedia('(prefers-reduced-motion:reduce)').matches)burst();
  });
  
  // reasons: one per tap
  var rs=document.querySelectorAll('.r'),ri=0,rb=document.getElementById('rbtn');
  rb.addEventListener('click',function(){
    if(ri<rs.length){rs[ri].classList.add('show');ri++;
      if(ri<rs.length)rb.textContent='Another reason 💛 ('+ri+'/'+rs.length+')';
      else{rb.textContent='And so many more... 💛';if(!matchMedia('(prefers-reduced-motion:reduce)').matches)burst();}
    }
  });
  
    // song play / pause
  var au = document.getElementById('audio'),
      pb = document.getElementById('play'),
      sg = document.getElementById('song');
  pb.addEventListener('click', function () {
    if (au.paused) {
      au.play();
      pb.textContent = '⏸ Pause';
      sg.classList.add('playing');
    } else {
      au.pause();
      pb.textContent = '▶ Play our song';
      sg.classList.remove('playing');
    }
  });
  au.addEventListener('ended', function () {
    pb.textContent = '▶ Play our song';
    sg.classList.remove('playing');
});
})();

