
const START_DATE = new Date("2026-07-20T00:00:00");
const HOURS_PER_DAY = 7.25;
const TOTAL_HOURS = 500;

const state = {
  get(k, fallback){ try{ const v=localStorage.getItem(k); return v===null?fallback:JSON.parse(v)}catch{return fallback} },
  set(k,v){ localStorage.setItem(k,JSON.stringify(v)) }
};

const assessments = [
 {id:"learning",title:"Learning Plan",when:"By Week 3",icon:"▣",color:"green",
  plain:"Set clear learning goals, explain how you will achieve them, how progress will be assessed, and when each goal will be reviewed.",
  asks:["Learning goals linked to placement outcomes","Practical learning activities","Evidence and evaluation methods","Timeframes","AASW Practice Standards links"]},
 {id:"project1",title:"Project Reflection 1",when:"Early placement",icon:"✎",color:"brown",
  plain:"Pause and reflect on how your small project is developing, what you are learning, and how it connects to agency needs.",
  asks:["Project purpose","Early learning","Research links","Agency relevance","Questions for supervision"]},
 {id:"mid",title:"Mid Placement Self Assessment",when:"At 250 hours",icon:"◉",color:"olive",
  plain:"Use examples from placement to show your progress against each learning goal and identify areas that still need development.",
  asks:["Evidence for each learning goal","Supervisor feedback","Strengths","Areas for growth","Revised goals if needed"]},
 {id:"project2",title:"Project Reflection 2",when:"Middle placement",icon:"✎",color:"brown",
  plain:"Reflect on how your project and your practice thinking have progressed since the first reflection.",
  asks:["Progress","Challenges","Theory and evidence","Changes made","Next steps"]},
 {id:"project3",title:"Project Reflection 3",when:"Later placement",icon:"✎",color:"brown",
  plain:"Reflect on outcomes, professional learning and the project’s value to the agency.",
  asks:["Outcomes","Agency benefit","Learning gained","Limitations","Future recommendations"]},
 {id:"final",title:"Final Presentation and Project Report",when:"Final liaison meeting",icon:"▤",color:"green",
  plain:"Present your project and critically reflect on the skills, knowledge, values, use of self and professional development gained during placement.",
  asks:["Skills consolidated","Knowledge acquired","Value dilemmas","Different perspectives","Use of self","Future development"]}
];

const goals = [
 {id:1,title:"Understand NGO mental health practice and person centred recovery",
  prompt:"What did you notice about how NGO practice differs from statutory practice today?",
  examples:["How staff share decision making","How consumers choose goals","How funding, partnerships or service scope shape practice"]},
 {id:2,title:"Apply recovery oriented and strengths based approaches",
  prompt:"Where did you notice hope, choice, strengths, meaning or empowerment today?",
  examples:["A consumer chose their own goal","Staff recognised capacity before risk","A conversation supported hope or identity"]},
 {id:3,title:"Develop confidence in adult mental health communication and intervention",
  prompt:"What communication skill did you observe or practise today?",
  examples:["Open questions","Reflective listening","Using silence","Explaining service options clearly"]},
 {id:4,title:"Strengthen professional identity through supervision and critical reflection",
  prompt:"What did today teach you about the social worker you are becoming?",
  examples:["A value you noticed in yourself","Feedback you received","Something you would approach differently next time"]}
];

const theories = [
 {name:"Recovery Oriented Practice",category:"Mental health and recovery",author:"William Anthony; Patricia Deegan",memory:"A meaningful life, not simply symptom reduction.",
  looks:["Hope","Choice","Consumer led goals","Identity beyond diagnosis","Dignity of risk"],
  ask:"Who led the goals and decisions today?"},
 {name:"CHIME",category:"Mental health and recovery",author:"Leamy, Bird, Le Boutillier, Williams and Slade",memory:"Connectedness, Hope, Identity, Meaning and Empowerment.",
  looks:["Belonging","Hope","Positive identity","Purpose","Choice and control"],
  ask:"Which part of CHIME was most visible today?"},
 {name:"Strengths Based Practice",category:"Core social work approaches",author:"Dennis Saleebey",memory:"Start with what is strong, not what is wrong.",
  looks:["Capabilities","Resources","Resilience","Past successes","Community supports"],
  ask:"Which strengths were recognised before problems were discussed?"},
 {name:"Person Centred Practice",category:"Core social work approaches",author:"Carl Rogers",memory:"See and respond to the whole person.",
  looks:["Empathy","Respect","Genuineness","Individual goals","Collaboration"],
  ask:"How was the person’s own perspective prioritised?"},
 {name:"Trauma Informed Practice",category:"Trauma and safety",author:"Judith Herman; SAMHSA",memory:"Safety, trust, choice, collaboration and empowerment.",
  looks:["Emotional and physical safety","Transparency","Choice","Avoiding re-traumatisation"],
  ask:"What helped the person feel safer or more in control?"},
 {name:"Systems and Ecological Theory",category:"Systems and environment",author:"Ludwig von Bertalanffy; Urie Bronfenbrenner",memory:"The person exists within interacting systems.",
  looks:["Housing","Family","Income","Health","Culture","Policy","Services"],
  ask:"Which systems supported or constrained recovery?"},
 {name:"Motivational Interviewing",category:"Communication and change",author:"William Miller and Stephen Rollnick",memory:"Help people voice their own reasons for change.",
  looks:["Open questions","Affirmations","Reflections","Summaries","Exploring ambivalence"],
  ask:"How did the worker avoid telling the person what to do?"},
 {name:"Narrative Practice",category:"Meaning and identity",author:"Michael White and David Epston",memory:"The person is not the problem; the problem is the problem.",
  looks:["Externalising problems","Alternative stories","Identity","Meaning"],
  ask:"Was the person separated from the problem or diagnosis?"},
 {name:"Solution Focused Practice",category:"Brief and goal focused practice",author:"Steve de Shazer and Insoo Kim Berg",memory:"Look for exceptions, possibilities and next steps.",
  looks:["Preferred future","Small goals","Exceptions","Scaling questions"],
  ask:"What small achievable next step was identified?"},
 {name:"Critical Social Work",category:"Critical and structural practice",author:"Bob Mullaly; Lena Dominelli",memory:"Look beyond the individual to power, inequality and structure.",
  looks:["Power","Oppression","Policy","Inequality","Advocacy"],
  ask:"What structural issue shaped the person’s options?"},
 {name:"Anti Oppressive Practice",category:"Critical and structural practice",author:"Lena Dominelli; Dalrymple and Burke",memory:"Notice and challenge power, privilege and oppression in practice.",
  looks:["Power differences","Institutional barriers","Privilege","Voice","Participation"],
  ask:"Who held power in this situation, and whose voice may have been limited?"},
 {name:"Feminist Social Work",category:"Critical and structural practice",author:"Lena Dominelli; bell hooks; Carol Gilligan",memory:"The personal is political.",
  looks:["Gendered power","Care work","Violence","Economic inequality","Voice and agency"],
  ask:"How might gender and power have shaped this person’s experience or service response?"},
 {name:"Intersectionality",category:"Critical and structural practice",author:"Kimberlé Crenshaw",memory:"People experience overlapping systems of advantage and disadvantage.",
  looks:["Gender","Race","Class","Disability","Sexuality","Age","Migration status"],
  ask:"Which intersecting identities or structures shaped this situation?"},
 {name:"Empowerment Theory",category:"Core social work approaches",author:"Barbara Solomon; Julian Rappaport",memory:"Support people to gain control over decisions affecting their lives.",
  looks:["Voice","Participation","Rights","Choice","Confidence","Collective action"],
  ask:"How was the person supported to have more control or influence?"},
 {name:"Cultural Humility",category:"Culture and identity",author:"Melanie Tervalon and Jann Murray-García",memory:"Stay curious, self reflective and accountable rather than assuming cultural expertise.",
  looks:["Listening","Self reflection","Power awareness","Respect","Ongoing learning"],
  ask:"What did you need to remain curious about rather than assume?"},
 {name:"Culturally Responsive Practice",category:"Culture and identity",author:"AASW; Indigenous and culturally responsive practice literature",memory:"Practice must respond to culture, identity, context and community.",
  looks:["Cultural safety","Language","Family and community","Identity","Flexible practice"],
  ask:"How did culture and identity shape what respectful practice looked like?"},
 {name:"Decolonising Practice",category:"Culture and identity",author:"Linda Tuhiwai Smith; Indigenous social work scholars",memory:"Question colonial assumptions and centre Indigenous knowledges, authority and self determination.",
  looks:["Self determination","Country","Kinship","Community authority","Colonial systems"],
  ask:"What assumptions or systems may reflect colonial ways of knowing or doing?"},
 {name:"Attachment Theory",category:"Human development and relationships",author:"John Bowlby; Mary Ainsworth",memory:"Early relationships influence expectations of safety, trust and connection.",
  looks:["Trust","Closeness","Separation","Emotional regulation","Relational patterns"],
  ask:"How might experiences of safety and attachment be shaping this interaction?"},
 {name:"Psychosocial Development",category:"Human development and relationships",author:"Erik Erikson",memory:"Development continues across the lifespan through psychosocial challenges.",
  looks:["Identity","Connection","Purpose","Autonomy","Generativity"],
  ask:"What developmental task or life transition may be relevant here?"},
 {name:"Social Learning Theory",category:"Human development and relationships",author:"Albert Bandura",memory:"People learn through observing, modelling and reinforcement.",
  looks:["Modelling","Confidence","Learning from peers","Behavioural reinforcement"],
  ask:"What behaviour or skill was being learned through observation or practice?"},
 {name:"Cognitive Behavioural Theory",category:"Practice models and intervention",author:"Aaron Beck; Albert Ellis",memory:"Thoughts, feelings and behaviours influence one another.",
  looks:["Thought patterns","Behavioural responses","Coping skills","Reframing"],
  ask:"How did thinking patterns or behaviours affect the situation?"},
 {name:"Dialectical Behaviour Therapy Principles",category:"Practice models and intervention",author:"Marsha Linehan",memory:"Balance acceptance with change.",
  looks:["Emotion regulation","Distress tolerance","Mindfulness","Interpersonal effectiveness"],
  ask:"Where did you notice validation alongside encouragement for change?"},
 {name:"Task Centred Practice",category:"Practice models and intervention",author:"William Reid and Laura Epstein",memory:"Break a problem into specific, achievable tasks.",
  looks:["Clear problem definition","Short term goals","Agreed tasks","Review"],
  ask:"What practical task could move the person one step forward?"},
 {name:"Crisis Intervention",category:"Practice models and intervention",author:"Gerald Caplan",memory:"Stabilise, support and restore coping during acute stress.",
  looks:["Immediate safety","Practical support","Grounding","Short term planning"],
  ask:"What helped reduce immediate distress or restore a sense of control?"},
 {name:"Harm Reduction",category:"Practice models and intervention",author:"Public health and social justice traditions",memory:"Reduce harm without requiring abstinence or perfection.",
  looks:["Pragmatism","Choice","Safer options","Respect","Non judgement"],
  ask:"How was risk reduced while respecting the person’s autonomy?"},
 {name:"Psychosocial Rehabilitation",category:"Mental health and recovery",author:"William Anthony and rehabilitation literature",memory:"Support skills, roles and environments needed for meaningful community life.",
  looks:["Daily living skills","Community participation","Work or study","Relationships","Housing"],
  ask:"What practical support helped the person participate in everyday life?"},
 {name:"Social Determinants of Health",category:"Systems and environment",author:"World Health Organization and public health literature",memory:"Health is shaped by social and economic conditions.",
  looks:["Housing","Income","Education","Employment","Discrimination","Access"],
  ask:"Which social condition had the greatest influence on wellbeing today?"},
 {name:"Rights Based Practice",category:"Critical and structural practice",author:"Human rights and social work literature",memory:"People are rights holders, not passive recipients of services.",
  looks:["Consent","Participation","Privacy","Dignity","Access","Accountability"],
  ask:"Which right was being protected, limited or negotiated?"},
 {name:"Ethics of Care",category:"Ethics and professional practice",author:"Carol Gilligan; Nel Noddings",memory:"Relationships, context and responsibility matter in ethical decisions.",
  looks:["Relational responsibility","Care","Interdependence","Context"],
  ask:"How did relationships and responsibilities shape the ethical decision?"},
 {name:"Use of Self",category:"Ethics and professional practice",author:"Social work reflective practice literature",memory:"Your presence, values, emotions and communication are part of practice.",
  looks:["Self awareness","Boundaries","Emotional response","Professional identity"],
  ask:"What did your own reaction tell you about the situation or your practice?"},
 {name:"Reflective Practice",category:"Ethics and professional practice",author:"Donald Schön",memory:"Learn by thinking in and on action.",
  looks:["Noticing","Questioning assumptions","Feedback","Trying differently next time"],
  ask:"What would you keep, change or explore next time?"},
 {name:"Community Development",category:"Macro and community practice",author:"Jim Ife; community development literature",memory:"Work with communities to build participation, capacity and collective power.",
  looks:["Participation","Capacity building","Local knowledge","Collective action"],
  ask:"How could this issue be addressed beyond individual casework?"},
 {name:"Advocacy and Policy Practice",category:"Macro and community practice",author:"Social policy and advocacy literature",memory:"Challenge barriers at service, organisational and policy levels.",
  looks:["Rights","Access","Policy change","Representation","System accountability"],
  ask:"What needs to change in the service system, not only in the individual?"},
 {name:"Group Work Theory",category:"Macro and community practice",author:"Toseland and Rivas; group work literature",memory:"Groups develop through relationships, roles and shared purpose.",
  looks:["Cohesion","Roles","Norms","Conflict","Mutual aid"],
  ask:"What helped or hindered participation in the group?"},
 {name:"Case Management",category:"Practice methods",author:"Social work case management literature",memory:"Coordinate assessment, planning, services and review around the person’s goals.",
  looks:["Assessment","Planning","Coordination","Referral","Review","Advocacy"],
  ask:"How were services coordinated around the person rather than around organisations?"}
];

const methods = [
 {name:"Engagement and rapport",examples:["Warm introduction","Curiosity","Respectful pacing","Clear boundaries"]},
 {name:"Active listening",examples:["Reflection","Summarising","Clarifying","Using silence"]},
 {name:"Assessment",examples:["Needs","Strengths","Risk","Goals","Social context"]},
 {name:"Biopsychosocial assessment",examples:["Biological","Psychological","Social","Cultural and environmental factors"]},
 {name:"Mental state observation",examples:["Appearance","Behaviour","Mood","Thought","Perception","Insight"]},
 {name:"Risk assessment",examples:["Current risk","Protective factors","Context","Collaborative planning"]},
 {name:"Safety planning",examples:["Warning signs","Coping strategies","Support people","Escalation pathways"]},
 {name:"Advocacy",examples:["Service access","Rights","Interagency follow up","Challenging barriers"]},
 {name:"Case management",examples:["Assessment","Planning","Coordination","Referral","Review"]},
 {name:"Psychoeducation",examples:["Explaining symptoms","Services","Coping strategies","Medication support"]},
 {name:"Goal setting",examples:["Consumer led goals","Small steps","Reviewing progress"]},
 {name:"Motivational interviewing",examples:["Open questions","Affirmations","Reflections","Summaries"]},
 {name:"Strengths conversation",examples:["Capabilities","Resources","Past successes","Hope"]},
 {name:"Narrative questioning",examples:["Externalising","Alternative stories","Meaning","Identity"]},
 {name:"Solution focused questioning",examples:["Exceptions","Scaling questions","Preferred future","Next step"]},
 {name:"Crisis intervention",examples:["Stabilisation","Grounding","Immediate needs","Short term plan"]},
 {name:"Harm reduction",examples:["Safer options","Choice","Pragmatism","Non judgement"]},
 {name:"Group facilitation",examples:["Inclusion","Managing dynamics","Purposeful questions","Summarising"]},
 {name:"Family and network work",examples:["Support mapping","Communication","Roles","Boundaries"]},
 {name:"Interprofessional collaboration",examples:["Role clarity","Shared planning","Information exchange","Respectful challenge"]},
 {name:"Referral and service navigation",examples:["Warm referral","Eligibility","Follow up","Removing barriers"]},
 {name:"Documentation",examples:["Objective language","Relevant detail","Privacy","Timeliness"]},
 {name:"Reflective supervision",examples:["Critical reflection","Feedback","Use of self","Professional development"]},
 {name:"Community engagement",examples:["Participation","Local knowledge","Partnerships","Capacity building"]},
 {name:"Policy and systems advocacy",examples:["Identifying barriers","Escalating issues","Policy feedback","System reform"]}
];

const toolkitCategories = [["🧠", "Theories & Frameworks", "Different lenses for understanding people, relationships, systems and change.", [["Recovery Oriented Practice", "Hope, choice, meaning and a life beyond symptoms."], ["CHIME", "Connectedness, Hope, Identity, Meaning and Empowerment."], ["Strengths Based Practice", "Start with capacity, resources and possibility."], ["Systems & Ecological Theory", "Understand the person within interacting environments."], ["Narrative Practice", "Separate the person from the problem."], ["Feminist Social Work", "Examine gender, power and structural inequality."], ["Anti Oppressive Practice", "Notice and challenge power, privilege and oppression."], ["Intersectionality", "Explore overlapping identities and structures."], ["Trauma Informed Practice", "Prioritise safety, trust, choice and collaboration."], ["Attachment Theory", "Consider how safety and connection shape relationships."]]], ["🛠️", "Practice Skills", "Practical methods you may observe, practise or discuss in supervision.", [["Engagement & Rapport", "Build trust through warmth, clarity and respectful pacing."], ["Active Listening", "Use reflection, summarising, silence and clarification."], ["Assessment", "Explore needs, strengths, goals, risks and context."], ["Risk & Safety Planning", "Work collaboratively around risk and protective factors."], ["Advocacy", "Address barriers, rights and access to services."], ["Case Management", "Coordinate planning, services, referrals and review."], ["Group Facilitation", "Support participation, purpose and group safety."], ["Documentation", "Record clearly, objectively and ethically."]]], ["🪞", "Use of Self", "Understand how your values, emotions, communication and identity shape practice.", [["Self Awareness", "Notice your emotions, assumptions and responses."], ["Boundaries", "Balance warmth, care and professional responsibility."], ["Values", "Reflect on what matters to you and how it affects decisions."], ["Bias & Assumptions", "Notice what you may be taking for granted."], ["Professional Identity", "Explore the social worker you are becoming."], ["Emotional Regulation", "Stay grounded in complex interactions."], ["Reflective Practice", "Consider what happened, why it mattered and what comes next."]]], ["🌏", "Cultural Capability & Inclusion", "Support culturally safe, inclusive, anti racist and responsive practice.", [["Aboriginal & Torres Strait Islander Practice", "Centre self determination, Country, kinship and community."], ["Cultural Humility", "Stay curious, reflective and accountable."], ["Cultural Safety", "Consider whether practice is experienced as safe by the person."], ["Decolonising Practice", "Question colonial assumptions and systems."], ["CALD Practice", "Respond to language, migration, culture and settlement experiences."], ["Working with Interpreters", "Use qualified interpreters respectfully and effectively."], ["Refugee & Asylum Seeker Practice", "Consider trauma, displacement, legal status and settlement."], ["LGBTQIA+ Affirmative Practice", "Support identity, dignity and self determination."], ["Disability Inclusive Practice", "Remove barriers and support participation."], ["Neurodiversity Affirming Practice", "Respect neurological difference and communication needs."], ["Intersectionality", "Understand how identities and structures overlap."], ["Anti Racist Practice", "Identify and challenge racism in systems and practice."]]], ["⚖️", "Ethics & Professional Practice", "Connect daily practice with social work values, ethics and standards.", [["AASW Code of Ethics", "Respect, social justice and professional integrity."], ["Professional Boundaries", "Maintain safe and purposeful relationships."], ["Confidentiality", "Protect privacy while understanding limits."], ["Informed Consent", "Support genuine understanding and choice."], ["Ethical Decision Making", "Work through competing values and responsibilities."], ["Supervision", "Use reflection, feedback and accountability to grow."], ["Professional Sustainability", "Recognise stress and the need for support."]]], ["📖", "Legislation & Policy", "Organise laws, policies and guidance relevant to placement.", [["Mental Health Act 2016 (Qld)", "Rights, treatment, decision making and safeguards."], ["Human Rights Act 2019 (Qld)", "Human rights in public decision making."], ["Privacy & Confidentiality", "Information handling, consent and disclosure."], ["Guardianship & Decision Making", "Capacity and supported decision making."], ["AASW Practice Standards", "Professional expectations across social work practice."], ["Organisation Policies", "Mind Australia procedures and local guidance."]]], ["👥", "Working with Different Populations", "Prompts for inclusive and responsive practice.", [["Adults experiencing mental ill health", "Recovery, dignity, autonomy and social context."], ["Children & Young People", "Development, safety, participation and family context."], ["Older People", "Ageing, autonomy, care, loss and connection."], ["People with Disability", "Access, rights, communication and inclusion."], ["People experiencing homelessness", "Housing, safety and structural barriers."], ["People who use alcohol and other drugs", "Harm reduction, stigma and choice."], ["Rural & Remote Communities", "Distance, access, privacy and relationships."], ["Justice Involved People", "Rights, stigma and reintegration."]]], ["💬", "Communication", "Communication that supports dignity, clarity, safety and participation.", [["Difficult Conversations", "Stay clear, respectful and grounded."], ["Trauma Informed Communication", "Support safety, choice and control."], ["De escalation", "Reduce intensity while maintaining dignity and safety."], ["Strengths Based Language", "Describe people with respect and possibility."], ["Working with Interpreters", "Speak to the person, not the interpreter."], ["Email & Phone Communication", "Be clear, professional and purposeful."], ["Documentation Language", "Use objective, respectful and relevant wording."]]], ["📝", "Documentation", "Support clear, ethical and useful information recording.", [["Case Notes", "Relevant, factual and timely records."], ["Assessment Writing", "Bring together needs, strengths, risk and context."], ["Reflective Notes", "Capture learning without identifying details."], ["Professional Emails", "Clear purpose, tone and concise information."], ["Reports", "Structured, evidence informed and audience aware writing."]]], ["🔬", "Research & Evidence", "Use evidence to strengthen practice and reflection.", [["Evidence Informed Practice", "Combine research, expertise and lived experience."], ["Finding Quality Sources", "Use peer reviewed and authoritative material."], ["Critical Appraisal", "Consider strengths, limits and relevance."], ["Reflective Inquiry", "Turn practice questions into learning."], ["Small Project Skills", "Plan, gather information, analyse and report."], ["APA 7 Referencing", "Credit sources accurately."]]], ["🤝", "Community Development", "Think beyond individual work toward participation and collective change.", [["Participation", "Support people to influence decisions."], ["Capacity Building", "Strengthen skills, resources and confidence."], ["Social Capital", "Build connection, trust and mutual support."], ["Community Led Practice", "Start with local knowledge and priorities."], ["Collective Advocacy", "Work together to challenge barriers."]]], ["🏛️", "Social Policy", "Understand how policy shapes services and people’s lives.", [["Policy Analysis", "Examine goals, assumptions, impacts and gaps."], ["Structural Inequality", "Connect experiences to wider systems."], ["Service Systems", "Understand funding, eligibility and responses."], ["Advocacy", "Use evidence and lived experience to influence change."], ["Implementation", "Explore how policy becomes everyday practice."]]]];

const selfcare = [
 "Drink a full glass of water before leaving placement.",
 "Take five slow breaths before you drive home.",
 "Get up, stretch your shoulders and walk for five minutes.",
 "Listen to one favourite song without multitasking.",
 "Message someone who helps you feel grounded.",
 "Do one restorative thing tonight that is not productive.",
 "Notice one thing you handled well today."
];

let route="today";

function greeting(){
  const hour = new Date().getHours();
  if(hour < 12) return {title:"☀️ Good morning, Kalina", subtitle:"A new day. You only need to notice one useful thing."};
  if(hour < 17) return {title:"🌿 Good afternoon, Kalina", subtitle:"Take a breath. Let’s focus on what matters next."};
  return {title:"🌙 Welcome back, Kalina", subtitle:"You do not need to remember everything. One moment is enough."};
}

function dayMessage(){
  const d = new Date().getDay();
  const messages = {
    1:"A fresh week. Stay curious and let the learning come.",
    2:"You are not expected to know everything. Keep noticing.",
    3:"Midweek check in: what is becoming clearer?",
    4:"Good supervision starts with one honest question.",
    5:"You made it to Friday. Keep one moment worth remembering.",
    6:"There is no placement work required today unless it helps you.",
    0:"Rest is part of professional sustainability."
  };
  return messages[d];
}


function placementInfo(){
  const today = new Date();
  const diff = Math.floor((today - START_DATE)/(1000*60*60*24));
  if(diff < 0) return {started:false,daysUntil:Math.ceil((START_DATE-today)/(1000*60*60*24)),week:0,day:0,workdays:0};
  let workdays=0;
  for(let d=new Date(START_DATE); d<=today; d.setDate(d.getDate()+1)){
    const day=d.getDay();
    if(day>=1 && day<=5) workdays++;
  }
  return {started:true,workdays,week:Math.ceil(workdays/5),day:((workdays-1)%5)+1};
}

function nextAssessment(info,hours){
  if(!info.started || info.week<=3) return assessments[0];
  if(hours<140) return assessments[1];
  if(hours<250) return assessments[2];
  if(hours<350) return assessments[3];
  if(hours<430) return assessments[4];
  return assessments[5];
}

function dailyPrompt(info,hours){
  if(!info.started) return {
    title:"Prepare without pressure",
    q:"What are you most hoping to learn from Mind Australia?",
    why:"This can help shape your Learning Plan before placement begins.",
    goal:1
  };
  if(info.week<=1) return {
    title:"Orientation and noticing",
    q:"What did you notice today about the way staff spoke with consumers?",
    why:"This helps you understand the service culture, recovery language and person centred practice.",
    goal:1
  };
  if(info.week<=3) return {
    title:"Build your Learning Plan",
    q:goals[(info.day-1)%goals.length].prompt,
    why:"Your answer can become evidence for your Learning Plan and first liaison meeting.",
    goal:((info.day-1)%goals.length)+1
  };
  if(hours<250) return {
    title:"Connect practice to theory",
    q:["What conversation stayed with you today, and why?","What social work skill did you see used well today?","What system affected a consumer’s recovery today?","What would you like to discuss in supervision?","What challenged your assumptions today?"][(info.day-1)%5],
    why:"This helps you build evidence for supervision, project reflections and mid placement review.",
    goal:((info.day-1)%goals.length)+1
  };
  return {
    title:"Build evidence for final assessment",
    q:["What skill can you now use more confidently?","What value dilemma have you noticed recently?","How has your use of self changed?","What knowledge has significantly changed your practice?","What still needs professional development?"][(info.day-1)%5],
    why:"This supports your final self assessment, project reflections and presentation.",
    goal:((info.day-1)%goals.length)+1
  };
}

function savedEntries(){ return state.get("entries",[]); }
function hours(){ return state.get("hours",0); }

function render(){
  document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.route===route));
  const pages={today:todayPage,journal:journalPage,assessments:assessmentPage,learn:learnPage,more:morePage};
  document.getElementById("main").innerHTML=pages[route]();
  bind();
  window.scrollTo({top:0});
}

function todayPage(){
  const info=placementInfo(), h=hours(), a=nextAssessment(info,h), p=dailyPrompt(info,h);
  const count=savedEntries().length;
  const g=greeting();

  return `
    <section class="welcome-block">
      <div class="eyebrow">${info.started?`Week ${info.week} · Day ${info.day}`:"Before placement"}</div>
      <h1>${g.title}</h1>
      <p class="welcome-text">${g.subtitle}</p>
      <p class="soft-note">${dayMessage()}</p>
    </section>

    <section class="focus-panel">
      <div class="focus-icon">🎯</div>
      <div>
        <div class="section-title">Today’s focus</div>
        <div class="focus-text">${p.q}</div>
        <button class="text-link" id="whyFocus">Why am I being asked this?</button>
        <div id="whyFocusText" class="explain-box hidden">${p.why}</div>
      </div>
    </section>

    <section class="milestone-panel">
      <div class="milestone-top">
        <div>
          <div class="section-title">🌱 What you’re working towards</div>
          <div class="milestone-title">${a.title}</div>
          <div class="muted">${a.when}</div>
        </div>
        <div class="round-icon">${a.icon}</div>
      </div>
      <p>${a.plain}</p>
      <button class="btn" id="startJournal">💬 Save one moment from today</button>
    </section>

    <section class="glance-grid">
      <div class="glance-card">
        <div class="glance-icon">⏳</div>
        <div class="glance-label">Placement hours</div>
        <div class="glance-number">${h.toFixed(2)}</div>
        <div class="small">of 500 hours</div>
        <button class="mini-btn" id="completeDay">Add 7.25 hrs</button>
      </div>

      <div class="glance-card">
        <div class="glance-icon">⭐</div>
        <div class="glance-label">Moments saved</div>
        <div class="glance-number">${count}</div>
        <div class="small">learning examples</div>
        <button class="mini-btn" id="openEvidence">View growth</button>
      </div>
    </section>

    <section class="buddy-note">
      <div class="buddy-icon">💚</div>
      <div>
        <div class="section-title">Looking after you</div>
        <div class="buddy-text">${selfcare[new Date().getDay()]}</div>
      </div>
    </section>

    <section class="quiet-footer">
      <span>🌿</span>
      <p>Deidentified learning only. Keep client and consumer details out of the app.</p>
    </section>`;
}

function journalPage(){
  const info=placementInfo(), h=hours(), p=dailyPrompt(info,h);
  const evidenceTypes = [
    ["Skill","A skill you observed, practised or improved","Communication, group facilitation, documentation or assessment"],
    ["Knowledge","Something you understand better now","Recovery, adult mental health, NGO practice or service systems"],
    ["Ethics or values","A dilemma, boundary or value in action","Autonomy and safety, confidentiality, dignity or power"],
    ["Theory in action","A theory or framework you noticed","CHIME, strengths, systems, trauma informed or person centred practice"],
    ["Communication","A useful interaction or conversation","Rapport, open questions, listening, silence or explaining options"],
    ["Recovery","Hope, choice, meaning or empowerment","Consumer led goals, strengths, identity or connection"],
    ["Use of self","Something you noticed about yourself","Emotions, assumptions, confidence, communication style or boundaries"],
    ["Feedback","Guidance from a supervisor or colleague","What you were told, what you changed, and what you will practise"],
    ["Teamwork","Working with another discipline or service","How roles differed, information was shared or decisions were made"],
    ["Systems issue","A structural factor affecting the person","Housing, income, transport, policy, family, culture or service access"],
    ["Professional development","Something you still need to learn","A skill, theory, policy, process or area for supervision"]
  ];

  return `
    <h1>💬 Let’s reflect</h1>
    <p class="muted">One useful moment is enough. You can leave the rest.</p>

    <div class="card green">
      <div class="label">This helps with</div>
      <div class="big">${nextAssessment(info,h).title} · Learning Goal ${p.goal}</div>
      <div class="why"><strong>Why am I doing this?</strong><br>JCU later asks you to show specific examples of skills, knowledge, values, theory, use of self and professional development. This page helps you collect those examples while they are still fresh.</div>
    </div>

    <div class="card">
      <div class="label">🤍 How are you feeling after today?</div>
      <select id="mood" class="select">
        <option value="">Choose one</option>
        <option>Calm</option><option>Tired</option><option>Overwhelmed</option>
        <option>Proud</option><option>Confused</option><option>Emotional</option>
      </select>
    </div>

    <div class="card">
      <div class="label">🌱 What stayed with you today?</div>
      <p class="muted">Choose only what feels relevant. You can leave the rest.</p>
      ${evidenceTypes.map(([name,desc,example])=>`
        <label class="option">
          <input type="checkbox" class="evidenceType" value="${name}">
          <span><strong>${name}</strong><br><span class="small">${desc}</span></span>
        </label>
        <details class="example">
          <summary><strong>Need a gentle example?</strong></summary>
          <p>${example}</p>
        </details>`).join("")}
    </div>

    <div class="card brownline">
      <div class="label">⭐ One moment worth keeping</div>
      <div class="big">${p.q}</div>
      <div class="why"><strong>Why am I being asked this?</strong><br>${p.why}</div>
      <textarea id="answer" class="textarea" placeholder="Start with: Today I noticed..."></textarea>
      <details class="example">
        <summary><strong>Need a sample structure?</strong></summary>
        <p><strong>What happened:</strong> I observed a planning conversation.</p>
        <p><strong>What I noticed:</strong> The consumer chose the goal and staff explored strengths before risks.</p>
        <p><strong>Why it matters:</strong> This showed recovery oriented and person centred practice.</p>
        <p><strong>What I learnt:</strong> Choice can be supported while still discussing safety.</p>
      </details>
    </div>

    <div class="card">
      <div class="label">📚 Let’s make sense of it</div>
      <select id="theoryPick" class="select">
        <option value="">I am not sure yet</option>
        ${theories.map(t=>`<option>${t.name}</option>`).join("")}
      </select>
      <select id="methodPick" class="select" style="margin-top:10px">
        <option value="">Choose a skill or method</option>
        ${methods.map(m=>`<option>${m.name}</option>`).join("")}
      </select>
      <div class="why"><strong>I am stuck</strong><br>Ask yourself: Who had power? What mattered to the person? What systems shaped the situation? How did the worker communicate? What value was visible?</div>
    </div>

    <div class="card">
      <div class="label">🗂️ Where might this help later?</div>
      ${["Learning Plan","Project Reflection","Mid Placement","Final Presentation","Professional Development","Supervision"].map(x=>`<label class="option"><input type="checkbox" class="evidence" value="${x}"><span>${x}</span></label>`).join("")}
      <textarea id="supervision" class="textarea" placeholder="Anything to ask or discuss in supervision?"></textarea>
      <button class="btn" id="saveEntry">🌿 Save this moment</button>
      <button class="btn secondary" onclick="window.print()">Print or save this page as PDF</button>
    </div>`;
}

function assessmentPage(){
  return `<h1>🎓 Your placement journey</h1><p class="muted">Clear guidance, one step at a time.</p>
    <div class="list">
      ${assessments.map(a=>`<button class="item assessment" data-id="${a.id}">
        <div class="item-icon ${a.color}">${a.icon}</div>
        <div class="item-main"><div class="item-title">${a.title}</div><div class="item-meta">${a.when}</div></div>
        <div class="chev">›</div>
      </button>`).join("")}
    </div>`;
}

function assessmentDetail(id){
  const a=assessments.find(x=>x.id===id);
  const entries=savedEntries().filter(e=>(e.evidence||[]).includes(a.title) || (id==="learning" && (e.evidence||[]).includes("Learning Plan")));
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backAssess">‹</button><h2>${a.title}</h2></div>
    <div class="card green"><div class="label">What this means</div><div class="big">${a.plain}</div></div>
    <div class="card"><div class="label">What to collect</div>${a.asks.map(x=>`<div class="row">✓ <span>${x}</span></div>`).join("")}</div>
    <div class="card"><div class="label">Evidence already saved</div>
      ${entries.length?entries.map(e=>`<div class="row"><div><strong>${e.date}</strong><div class="small">${e.answer.slice(0,110)}</div></div></div>`).join(""):`<p class="muted">No evidence tagged here yet.</p>`}
    </div>
    <div class="card"><div class="label">How Practice Compass helps</div><p>It gives you targeted prompts, keeps your own examples together and shows what still needs attention. It does not write the assessment for you.</p></div>`;
  document.getElementById("backAssess").onclick=()=>{route="assessments";render()};
}

function learnPage(){
  return `
    <section class="toolkit-welcome">
      <div class="eyebrow">Social work in your pocket</div>
      <h1>📚 Practice Toolkit</h1>
      <p class="welcome-text">You do not need to know everything. Open one area when you need it.</p>
      <input id="toolkitSearch" class="input" placeholder="Search theory, skill, culture, ethics or policy">
    </section>
    <div id="toolkitList" class="toolkit-list">
      ${toolkitCategories.map((category,index)=>`
        <section class="toolkit-folder" data-search="${(category[1]+' '+category[2]+' '+category[3].map(x=>x.join(' ')).join(' ')).toLowerCase()}">
          <button class="folder-header" data-folder="${index}">
            <div class="folder-icon">${category[0]}</div>
            <div class="folder-text"><div class="folder-title">${category[1]}</div><div class="folder-subtitle">${category[2]}</div></div>
            <div class="folder-arrow">⌄</div>
          </button>
          <div class="folder-content hidden" id="folder-${index}">
            ${category[3].map((item,itemIndex)=>`<button class="toolkit-topic" data-category="${index}" data-topic="${itemIndex}"><div><strong>${item[0]}</strong><span>${item[1]}</span></div><span>›</span></button>`).join('')}
          </div>
        </section>`).join('')}
    </div>`;
}
function toolkitDetail(categoryIndex,topicIndex){
 const c=toolkitCategories[categoryIndex], t=c[3][topicIndex];
 document.getElementById('main').innerHTML=`
  <div class="screen-title"><button class="back" id="backToolkit">‹</button><h2>${c[0]} ${t[0]}</h2></div>
  <div class="card green"><div class="label">What is it?</div><div class="big">${t[1]}</div></div>
  <div class="card"><div class="label">🌿 Why does it matter?</div><p>This topic can help you understand practice more clearly, notice context and make more intentional decisions.</p></div>
  <div class="card"><div class="label">👀 What might it look like?</div><p>Think about one conversation, decision, interaction, policy or service process where this idea may have been visible.</p></div>
  <div class="card brownline"><div class="label">💭 Practice prompt</div><div class="big">Where did you notice ${t[0].toLowerCase()} in practice today?</div><div class="why"><strong>Why am I being asked this?</strong><br>Recognising a concept in practice makes it easier to remember and gives you material for reflection, supervision and assessment.</div></div>
  <div class="card"><div class="label">📚 Read more</div><p class="muted">Verified authors, references and links can be added topic by topic as the Toolkit develops.</p></div>`;
 document.getElementById('backToolkit').onclick=()=>{route='learn';render()};
}

function morePage(){
  return `<h1>More for you</h1>
    <div class="menu-grid">
      <button class="menu" id="learningPlan"><span>◎</span><strong>🌱 What I’m growing</strong></button>
      <button class="menu" id="evidenceBank"><span>▤</span><strong>⭐ Moments that matter</strong></button>
      <button class="menu" id="weeklyReview"><span>◫</span><strong>☕ Weekly check in</strong></button>
      <button class="menu" id="wellbeing"><span>♧</span><strong>💚 Looking after me</strong></button>
      <button class="menu" id="exportHtml"><span>⇩</span><strong>📄 Export my notes</strong></button>
      <button class="menu" id="backupJson"><span>⇩</span><strong>💾 Back up my data</strong></button>
    </div>
    <div class="card"><div class="label">Your placement</div><p><strong>Mind Australia</strong><br>Adult Step Up Step Down<br>20 July 2026<br>Monday to Friday · 9:00 am to 5:00 pm<br>45 minute lunch · 7.25 placement hours</p></div>`;
}

function learningPlanPage(){
  const entries=savedEntries();
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backMore for you">‹</button><h2>🌱 What I’m growing</h2></div>
    ${goals.map(g=>{
      const n=entries.filter(e=>e.goal===g.id).length;
      return `<div class="card">
        <div class="label">Goal ${g.id}</div><div class="big">${g.title}</div>
        <div class="progress"><div style="width:${Math.min(n*20,100)}%"></div></div>
        <p class="small">${n} evidence example${n===1?"":"s"} saved</p>
        <div class="why"><strong>Suggested prompt</strong><br>${g.prompt}</div>
        <details class="example"><summary><strong>Need ideas?</strong></summary><ul>${g.examples.map(x=>`<li>${x}</li>`).join("")}</ul></details>
      </div>`;
    }).join("")}`;
  document.getElementById("backMore for you").onclick=()=>{route="more";render()};
}

function evidenceBankPage(){
  const entries=savedEntries();
  const categories=["Skill","Knowledge","Ethics or values","Theory in action","Communication","Recovery","Use of self","Feedback","Teamwork","Systems issue","Professional development"];
  const counts=Object.fromEntries(categories.map(c=>[c,entries.filter(e=>(e.evidenceTypes||[]).includes(c)).length]));
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backMore for you">‹</button><h2>⭐ Moments that matter</h2></div>

    <div class="card green">
      <div class="label">Your practice is taking shape</div>
      <div class="big">Small moments that will help you remember how your practice has grown.</div>
      <p class="muted">You do not need equal numbers in every category. These counts simply show what you have noticed so far.</p>
    </div>

    <div class="card">
      <div class="label">Evidence snapshot</div>
      ${categories.map(c=>`<div class="row"><span style="flex:1">${c}</span><strong>${counts[c]}</strong></div>`).join("")}
    </div>

    ${entries.length?entries.map(e=>`<div class="card">
      <div class="label">${e.date} · Goal ${e.goal}</div>
      <div class="big">${e.answer.slice(0,180)}${e.answer.length>180?"...":""}</div>
      ${(e.evidenceTypes||[]).map(x=>`<span class="pill">${x}</span>`).join("")}
      ${(e.evidence||[]).map(x=>`<span class="pill">${x}</span>`).join("")}
      ${e.theory?`<span class="pill">${e.theory}</span>`:""}
      ${e.method?`<span class="pill">${e.method}</span>`:""}
    </div>`).join(""):`<div class="card"><p class="muted">No entries yet. Your first saved example will appear here.</p></div>`}`;
  document.getElementById("backMore for you").onclick=()=>{route="more";render()};
}

function weeklyReviewPage(){
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backMore for you">‹</button><h2>☕ Weekly check in</h2></div>
    <div class="card">
      ${["What am I proud of this week?","What confused or challenged me?","Which theory makes more sense now?","What do I want to ask in supervision?","How did I look after myself?","What is one focus for next week?"].map((q,i)=>`<div class="prompt-box"><strong>${q}</strong><textarea class="textarea weekly" data-q="${q}"></textarea></div>`).join("")}
      <button class="btn" id="saveWeekly">Save weekly review</button>
      <button class="btn secondary" onclick="window.print()">Print or save as PDF</button>
    </div>`;
  document.getElementById("backMore for you").onclick=()=>{route="more";render()};
  document.getElementById("saveWeekly").onclick=()=>{
    const reviews=state.get("weeklyReviews",[]);
    reviews.unshift({date:new Date().toLocaleDateString("en-AU"),answers:[...document.querySelectorAll(".weekly")].map(x=>({q:x.dataset.q,a:x.value}))});
    state.set("weeklyReviews",reviews); alert("☕ Weekly check in saved.");
  };
}

function wellbeingPage(){
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backMore for you">‹</button><h2>💚 Looking after me</h2></div>
    <div class="card stone"><div class="label">A gentle reminder</div><div class="big">${selfcare[new Date().getDay()]}</div></div>
    <div class="card"><div class="label">Quick check in</div>
      ${["I drank enough water","I moved or stretched","I took a real break","I connected with someone","I did something calming","I left placement work at placement"].map(x=>`<label class="option"><input type="checkbox"><span>${x}</span></label>`).join("")}
    </div>
    <div class="notice">This is a prompt, not another task. Missing a day does not mean you are behind.</div>`;
  document.getElementById("backMore for you").onclick=()=>{route="more";render()};
}

function saveEntry(){
  const ans=document.getElementById("answer").value.trim();
  if(!ans){alert("Write one short example first.");return}
  const info=placementInfo(), p=dailyPrompt(info,hours());
  const evidenceTypes=[...document.querySelectorAll(".evidenceType:checked")].map(x=>x.value);
  if(evidenceTypes.length===0 && !confirm("You have not selected an evidence type. Save it anyway?")) return;
  const entry={
    id:Date.now(),
    date:new Date().toLocaleDateString("en-AU"),
    goal:p.goal,
    mood:document.getElementById("mood").value,
    answer:ans,
    evidenceTypes,
    theory:document.getElementById("theoryPick").value,
    method:document.getElementById("methodPick").value,
    supervision:document.getElementById("supervision").value.trim(),
    evidence:[...document.querySelectorAll(".evidence:checked")].map(x=>x.value)
  };
  const arr=savedEntries(); arr.unshift(entry); state.set("entries",arr);
  alert("Saved 🌿 One more useful moment is ready for you later.");
  route="today"; render();
}

function exportPrintable(){
  const entries=savedEntries();
  const reviews=state.get("weeklyReviews",[]);
  const html=`<!doctype html><html><head><meta charset="utf-8"><title>Practice Compass Journal</title>
  <style>body{font-family:Arial,sans-serif;max-width:850px;margin:40px auto;color:#222}h1,h2{color:#2f4f3b}.entry{border:1px solid #ccc;border-radius:12px;padding:18px;margin:16px 0}.meta{color:#666;font-size:13px}.pill{display:inline-block;background:#e4ece2;padding:5px 8px;border-radius:99px;margin:3px}</style></head><body>
  <h1>Practice Compass Placement Journal</h1><p>Kalina Hughes · Mind Australia · Adult Step Up Step Down</p>
  <h2>Daily evidence</h2>
  ${entries.map(e=>`<div class="entry"><div class="meta">${e.date} · Learning Goal ${e.goal}</div><p>${e.answer.replace(/</g,"&lt;")}</p>
  ${(e.evidenceTypes||[]).length?`<p><strong>Evidence type:</strong> ${(e.evidenceTypes||[]).join(", ")}</p>`:""}${e.theory?`<p><strong>Theory:</strong> ${e.theory}</p>`:""}${e.method?`<p><strong>Method:</strong> ${e.method}</p>`:""}
  ${e.supervision?`<p><strong>Supervision:</strong> ${e.supervision.replace(/</g,"&lt;")}</p>`:""}
  ${(e.evidence||[]).map(x=>`<span class="pill">${x}</span>`).join("")}</div>`).join("")||"<p>No entries yet.</p>"}
  <h2>☕ Weekly check ins</h2>
  ${reviews.map(r=>`<div class="entry"><div class="meta">${r.date}</div>${r.answers.map(x=>`<p><strong>${x.q}</strong><br>${(x.a||"").replace(/</g,"&lt;")}</p>`).join("")}</div>`).join("")||"<p>No weekly reviews yet.</p>"}
  </body></html>`;
  const blob=new Blob([html],{type:"text/html"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="Practice_Compass_Journal.html";a.click();
}

function backup(){
  const data={hours:hours(),entries:savedEntries(),weeklyReviews:state.get("weeklyReviews",[])};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="Practice_Compass_Backup.json";a.click();
}

function bind(){
  document.getElementById("startJournal")?.addEventListener("click",()=>{route="journal";render()});
  document.getElementById("openEvidence")?.addEventListener("click",evidenceBankPage);
  document.getElementById("whyFocus")?.addEventListener("click",()=>{
    const box=document.getElementById("whyFocusText");
    box.classList.toggle("hidden");
  });
  document.getElementById("completeDay")?.addEventListener("click",()=>{state.set("hours",Math.min(TOTAL_HOURS,hours()+HOURS_PER_DAY));render()});
  document.getElementById("adjustHours")?.addEventListener("click",()=>{const v=prompt("Enter total completed placement hours:",hours()); if(v!==null&&!isNaN(Number(v))){state.set("hours",Number(v));render()}});
  document.getElementById("saveEntry")?.addEventListener("click",saveEntry);
  document.querySelectorAll(".assessment").forEach(x=>x.onclick=()=>assessmentDetail(x.dataset.id));
  document.querySelectorAll('.folder-header').forEach(btn=>btn.onclick=()=>{const target=document.getElementById(`folder-${btn.dataset.folder}`);target.classList.toggle('hidden');btn.querySelector('.folder-arrow').textContent=target.classList.contains('hidden')?'⌄':'⌃';});
  document.querySelectorAll('.toolkit-topic').forEach(btn=>btn.onclick=()=>toolkitDetail(Number(btn.dataset.category),Number(btn.dataset.topic)));
  document.getElementById('toolkitSearch')?.addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();document.querySelectorAll('.toolkit-folder').forEach(folder=>{folder.style.display=folder.dataset.search.includes(q)?'block':'none';if(q&&folder.dataset.search.includes(q)){folder.querySelector('.folder-content').classList.remove('hidden');folder.querySelector('.folder-arrow').textContent='⌃';}});});
  
  document.getElementById("learningPlan")?.addEventListener("click",learningPlanPage);
  document.getElementById("evidenceBank")?.addEventListener("click",evidenceBankPage);
  document.getElementById("weeklyReview")?.addEventListener("click",weeklyReviewPage);
  document.getElementById("wellbeing")?.addEventListener("click",wellbeingPage);
  document.getElementById("exportHtml")?.addEventListener("click",exportPrintable);
  document.getElementById("backupJson")?.addEventListener("click",backup);
}

document.querySelectorAll(".nav").forEach(n=>n.onclick=()=>{route=n.dataset.route;render()});
document.getElementById("menuBtn").onclick=()=>{route="more";render()};
render();
