(function(){
  var volume=document.getElementById('volume');
  var volumeValue=document.getElementById('volumeValue');
  var tier=document.getElementById('tier');
  var timeline=document.getElementById('timeline');
  function updateEstimate(){
    var score=Number(volume.value)/1000;
    document.querySelectorAll('input[name="complexity"]:checked,input[name="engagement"]:checked').forEach(function(input){score+=Number(input.value)});
    volumeValue.textContent=Number(volume.value).toLocaleString()+(Number(volume.value)>=5000?'+':'');
    if(score>=5){tier.textContent='Operational health review';timeline.textContent='Usually 4–6 weeks from kickoff.'}
    else if(score>=2.5){tier.textContent='Structured cleanup sprint';timeline.textContent='Usually 2–4 weeks from kickoff.'}
    else{tier.textContent='Focused diagnostic';timeline.textContent='Usually 1–2 weeks from kickoff.'}
  }
  if(volume){volume.addEventListener('input',updateEstimate);document.querySelectorAll('input[name="complexity"],input[name="engagement"]').forEach(function(input){input.addEventListener('change',updateEstimate)});updateEstimate()}

  var questions=[
    {text:'Can you see a current, reliable view of cash and profit?',options:[['Yes, every month','2'],['Sometimes, but it takes work','1'],['No, not yet','0']]},
    {text:'How quickly can you match your records to bank activity?',options:[['Within a few days','2'],['Within a few weeks','1'],['I’m not sure where to start','0']]},
    {text:'Do your team members follow the same financial process?',options:[['Yes, it is documented','2'],['Mostly, but it depends on the person','1'],['No consistent process','0']]},
    {text:'When you make a big decision, how much do you trust the numbers?',options:[['I can decide with confidence','2'],['I need to double-check first','1'],['I often rely on instinct','0']]}
  ];
  var current=0,answers=[];var question=document.getElementById('quizQuestion'),next=document.getElementById('nextButton'),back=document.getElementById('backButton'),result=document.getElementById('quizResult'),bar=document.getElementById('progressBar'),count=document.getElementById('stepCount');
  function render(){var item=questions[current];count.textContent='Question '+(current+1)+' of '+questions.length;bar.style.width=((current+1)/questions.length*100)+'%';question.innerHTML='<h3>'+item.text+'</h3><div class="quiz-options">'+item.options.map(function(option,i){return '<button type="button" data-score="'+option[1]+'" aria-pressed="'+(answers[current]===Number(option[1])?'true':'false')+'">'+option[0]+'</button>'}).join('')+'</div>';question.querySelectorAll('button').forEach(function(button){button.addEventListener('click',function(){answers[current]=Number(button.dataset.score);question.querySelectorAll('button').forEach(function(other){other.setAttribute('aria-pressed','false')});button.setAttribute('aria-pressed','true');next.disabled=false})});next.textContent=current===questions.length-1?'See my result':'Next';next.disabled=answers[current]===undefined;back.hidden=current===0}
  function showResult(){var score=answers.reduce(function(total,value){return total+value},0);var title,copy;if(score>=7){title='Strong foundation';copy='Your core habits are in place. A focused review can help you improve visibility and protect what is working.'}else if(score>=4){title='Room to improve';copy='You have useful pieces in place, but a clearer process would make decisions faster and less stressful.'}else{title='Start with clarity';copy='A short diagnostic can give you a reliable baseline, show where the gaps begin, and set a practical plan.'}question.hidden=true;document.querySelector('.quiz-actions').hidden=true;count.hidden=true;result.hidden=false;result.innerHTML='<p class="eyebrow">Your result · '+score+'/8</p><strong>'+title+'</strong><h3>Recommended next step</h3><p>'+copy+'</p><a class="button button-dark" href="https://cal.com/xix-lana" target="_blank" rel="noopener">Book a consultation →</a>'}
  if(question){render();next.addEventListener('click',function(){if(current===questions.length-1){showResult()}else{current++;render()}});back.addEventListener('click',function(){current--;render()})}
  document.querySelectorAll('.info-tip').forEach(function(button){button.addEventListener('click',function(){var panel=document.getElementById(button.getAttribute('aria-controls'));var open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));panel.hidden=open})});
})();