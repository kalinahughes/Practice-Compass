
const START_DATE = new Date("2026-07-20T00:00:00");
const HOURS_PER_DAY = 7.25;
const TOTAL_HOURS = 500;

const state = {
  get(k, fallback){ try{ const v=localStorage.getItem(k); return v===null?fallback:JSON.parse(v)}catch{return fallback} },
  set(k,v){ localStorage.setItem(k,JSON.stringify(v)) }
};

const assessments = [
 {id:"modules",title:"Pre Placement Modules",when:"Before placement",icon:"✅",color:"stone",
  purpose:"Complete six preparation modules and their quizzes before placement begins.",
  why:"These modules confirm that you understand the essential expectations, responsibilities and safety requirements before entering placement.",
  tasks:["Complete all six online modules","Answer every quiz question correctly","Keep confirmation of completion"],
  collect:["Completion confirmation","Any questions to clarify before placement"],
  toolkit:["Ethics and Professional Practice","Supervision","Documentation"]},

 {id:"integration",title:"Integration Sessions",when:"21 Aug, 18 Sep and 16 Oct 2026",icon:"☕",color:"brown",
  purpose:"Attend three two hour sessions for peer discussion, set readings and integration of theory with placement experience.",
  why:"These sessions help you step back from daily tasks, compare experiences with peers and connect practice with social work knowledge.",
  tasks:["Attend and participate in all three sessions","Complete the set reading","Bring a deidentified practice issue or learning question","Ensure the group record is uploaded within three days"],
  collect:["One practice question","One theory link","One ethical or cultural issue","One learning point from peers"],
  toolkit:["Reflective Practice","Use of Self","Ethics and Professional Practice"]},

 {id:"learning",title:"Learning Plan",when:"Draft in Weeks 1 to 2 · Finalise by Week 3",icon:"🌱",color:"green",
  purpose:"Create an agreement with your Field Educator and FELO about what you want to learn, how you will learn it and how progress will be assessed.",
  why:"The Learning Plan gives your placement direction and becomes the reference point for your mid placement and final assessments.",
  tasks:["Complete overarching and individual learning goals","Add learning methods and activities","Add assessment strategies and evidence","Set realistic timelines","Complete SWOT analysis","Clarify roles and responsibilities","Link goals with AASW Practice Standards"],
  collect:["Examples of recovery oriented practice","Questions for supervision","Skills you want to develop","Differences between NGO and statutory practice","Cultural capability learning needs","Use of self observations"],
  toolkit:["Recovery Oriented Practice","Use of Self","Cultural Capability and Inclusion","Reflective Practice"]},

 {id:"project",title:"Small Project",when:"Agree scope early in placement",icon:"📄",color:"brown",
  purpose:"Complete a manageable research or practice project that contributes to your learning and provides a useful outcome for Mind Australia.",
  why:"The project develops research minded practice and shows how social workers can improve services, policy, resources or organisational knowledge.",
  tasks:["Discuss agency needs with your supervisor","Agree on a realistic project question and output","Plan research or information gathering","Complete the project within placement time","Explain how it benefits the agency and your learning"],
  collect:["Possible agency need or gap","Project question","Relevant literature or policy","Supervisor feedback","Decisions and changes made","Evidence of agency benefit"],
  toolkit:["Research and Evidence","Social Policy","Documentation","Community Development"],
  examples:["Small literature review","Feedback survey or evaluation","Policy or procedure review","Resource or practice guide","Small report, blog or article","Project proposal","Data analysis or dissemination"]},

 {id:"reflections",title:"Three Project Reflections",when:"Three times across placement · 800 to 1000 words each",icon:"⭐",color:"olive",
  purpose:"Submit three structured reflections about your project, research process and its connection with professional social work practice.",
  why:"The reflections show that you are learning from the project as it develops, rather than only reporting the final product.",
  tasks:["Agree submission timing with your FELO","Use the LearnJCU template","Submit three reflections regularly","Respond to FELO feedback and revise if requested"],
  collect:["What has progressed","What challenged you","Research or theory used","Agency relevance","Ethical issues","What changed after feedback","Next steps"],
  toolkit:["Reflective Practice","Research and Evidence","Ethical Decision Making","Use of Self"]},

 {id:"timesheets",title:"Timesheets",when:"Submit every two weeks",icon:"⏱️",color:"stone",
  purpose:"Record your daily hours, activities, absences, library time and unpaid lunch breaks.",
  why:"Timesheets verify your 500 placement hours and demonstrate accountability for how placement time is used.",
  tasks:["Record start and finish times","Record at least a 30 minute unpaid lunch when working five or more hours","Describe daily activities and tasks","Record library time and absences","Have the timesheet reviewed and signed","Submit to the FELO every two weeks"],
  collect:["Daily hours","Daily activities","Library or research time","Absences or altered hours","Supervisor signature and submission date"],
  toolkit:["Documentation","Professional Accountability","Information Recording"]},

 {id:"midfinal",title:"Mid and End Placement Assessments",when:"Mid: about 250 hours · Final: Weeks 12 to 14",icon:"📝",color:"green",
  purpose:"Complete your self assessments against each Learning Plan goal before the mid and final liaison meetings. Your supervisor completes a corresponding assessment.",
  why:"These assessments use specific examples to evaluate progress, identify learning needs and confirm whether placement performance is developing or satisfactory.",
  tasks:["Complete every learning goal section","Describe activities and learning achieved","Use specific deidentified evidence","Evaluate progress honestly","Share the self assessment before the liaison meeting","Discuss supervisor feedback and revise goals where needed"],
  collect:["Communication examples","Ethics and professionalism","Culturally responsive and inclusive practice","Theory and methods applied","Use of self","Documentation","Supervision and professional development","Feedback implemented"],
  toolkit:["AASW Practice Standards","Use of Self","Cultural Capability and Inclusion","Reflective Practice"]},

 {id:"final",title:"Final Presentation and Project Report",when:"Final liaison meeting · 15 minutes total",icon:"🎤",color:"brown",
  purpose:"Present a brief project report and critically reflect on your learning, progress and continuing professional development.",
  why:"The presentation brings together the strongest examples from your placement and shows how your social work knowledge, skills, values and professional identity have developed.",
  tasks:["Part A: explain how the project contributed to your learning and the agency","Part B: critically reflect on placement learning","Keep the whole presentation within 15 minutes","Use relevant academic references","Agree on the presentation format by mid placement"],
  collect:["Key skills consolidated","Significant knowledge gained","Value dilemmas","Different perspectives on social problems","Use of self","Areas for professional development","Project outcomes and agency benefit"],
  toolkit:["Use of Self","Ethics and Professional Practice","Research and Evidence","Presentation and Communication"]}
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
  if(hour < 12) return {title:"☀️ Good morning, Kalina", subtitle:"A new day. Stay curious and notice one useful thing."};
  if(hour < 17) return {title:"🌿 Good afternoon, Kalina", subtitle:"Welcome back. Let’s focus on what matters next."};
  return {title:"🌙 Welcome back, Kalina", subtitle:"One meaningful moment from today is enough."};
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


const placementWeeks = [
 {from:0,to:0,title:"Before placement",focus:["Complete preparation modules","Confirm practical arrangements","Write down questions for orientation"]},
 {from:1,to:1,title:"Orientation and understanding the service",focus:["Meet the team and understand roles","Learn Step Up Step Down routines and recovery language","Observe documentation and communication","Begin a list of possible Learning Plan goals"]},
 {from:2,to:3,title:"Build and finalise the Learning Plan",focus:["Draft goals, methods, evidence and timelines","Complete SWOT and roles sections","Discuss goals in supervision","Send the draft to the FELO before the first liaison meeting"]},
 {from:4,to:5,title:"Apply theory and shape the small project",focus:["Agree on the small project scope","Notice theory, ethics and cultural capability in practice","Begin collecting evidence for each learning goal","Keep timesheets current"]},
 {from:6,to:7,title:"Prepare for mid placement",focus:["Review evidence against every learning goal","Draft the Mid Placement Self Assessment","Ask for supervisor feedback","Identify gaps to address in the second half"]},
 {from:8,to:11,title:"Develop independence and project outcomes",focus:["Act on mid placement feedback","Progress the small project","Continue project reflections","Collect examples of skills, use of self and professional identity"]},
 {from:12,to:14,title:"Prepare final evidence and presentation",focus:["Complete the End Placement Self Assessment","Select strongest examples","Finalise the project report","Prepare the 15 minute presentation and future development goals"]}
];

function currentStage(info){
  if(!info.started) return placementWeeks[0];
  return placementWeeks.find(s=>info.week>=s.from && info.week<=s.to) || placementWeeks[placementWeeks.length-1];
}
function timesheetEntries(){ return state.get("timesheets",[]); }
function supervisionItems(){ return state.get("supervisionItems",[]); }
function assessmentCount(title){ return savedEntries().filter(e=>(e.evidence||[]).includes(title)).length; }


const evidenceMapRules = {
  "Communication":["Learning Plan","Mid and End Placement Assessments","Final Presentation","Supervision"],
  "Ethics or values":["Learning Plan","Mid and End Placement Assessments","Final Presentation","Supervision"],
  "Cultural capability":["Learning Plan","Mid and End Placement Assessments","Final Presentation"],
  "Theory in action":["Learning Plan","Project Reflections","Mid and End Placement Assessments","Final Presentation"],
  "Recovery":["Learning Plan","Mid and End Placement Assessments","Final Presentation"],
  "Use of self":["Learning Plan","Mid and End Placement Assessments","Final Presentation","Supervision"],
  "Feedback":["Learning Plan","Mid and End Placement Assessments","Supervision"],
  "Teamwork":["Learning Plan","Mid and End Placement Assessments","Final Presentation"],
  "Systems issue":["Project Reflections","Mid and End Placement Assessments","Final Presentation"],
  "Documentation":["Learning Plan","Mid and End Placement Assessments","Timesheets"],
  "Professional development":["Learning Plan","Mid and End Placement Assessments","Final Presentation","Supervision"],
  "Skill":["Learning Plan","Mid and End Placement Assessments","Final Presentation"],
  "Knowledge":["Learning Plan","Project Reflections","Mid and End Placement Assessments","Final Presentation"]
};
const assessmentRequirements = {
  "Learning Plan":["Skill","Knowledge","Communication","Cultural capability","Use of self","Professional development"],
  "Project Reflections":["Theory in action","Systems issue","Ethics or values","Knowledge","Professional development"],
  "Mid and End Placement Assessments":["Communication","Ethics or values","Cultural capability","Theory in action","Use of self","Documentation","Feedback","Teamwork"],
  "Final Presentation":["Skill","Knowledge","Ethics or values","Theory in action","Use of self","Cultural capability","Professional development"]
};
function frameworkData(){return state.get("framework",{values:[],theories:[],cultural:[],skills:[],useOfSelf:"",professionalIdentity:""});}
function saveFrameworkData(data){state.set("framework",data);}
function mappedAssessments(types){const found=new Set();(types||[]).forEach(t=>(evidenceMapRules[t]||[]).forEach(a=>found.add(a)));return [...found];}
function evidenceCoverage(){const entries=savedEntries(),counts={};Object.keys(assessmentRequirements).forEach(a=>{counts[a]=assessmentRequirements[a].map(r=>({requirement:r,count:entries.filter(e=>(e.evidenceTypes||[]).includes(r)).length}));});return counts;}


const taskStatuses = {
  not_started:{label:"Not started",icon:"○",className:"status-not-started"},
  in_progress:{label:"In progress",icon:"◐",className:"status-in-progress"},
  waiting:{label:"Waiting",icon:"◌",className:"status-waiting"},
  complete:{label:"Complete",icon:"✓",className:"status-complete"}
};

function taskStatusData(){
  const saved=state.get("taskStatuses",null);
  if(saved) return saved;
  const initial={};
  assessments.forEach(a=>{
    (a.tasks||[]).forEach((_,i)=>{
      initial[`${a.id}:${i}`]=a.id==="modules"?"complete":"not_started";
    });
  });
  state.set("taskStatuses",initial);
  return initial;
}

function getTaskStatus(assessmentId,index){
  return taskStatusData()[`${assessmentId}:${index}`] || "not_started";
}

function setTaskStatus(assessmentId,index,status){
  const data=taskStatusData();
  data[`${assessmentId}:${index}`]=status;
  state.set("taskStatuses",data);
}

function assessmentOverallStatus(a){
  const tasks=a.tasks||[];
  if(!tasks.length) return "not_started";
  const statuses=tasks.map((_,i)=>getTaskStatus(a.id,i));
  if(statuses.every(s=>s==="complete")) return "complete";
  if(statuses.some(s=>s==="waiting")) return "waiting";
  if(statuses.some(s=>s==="in_progress"||s==="complete")) return "in_progress";
  return "not_started";
}

function assessmentProgress(a){
  const tasks=a.tasks||[];
  if(!tasks.length) return 0;
  const weights={not_started:0,in_progress:.5,waiting:.5,complete:1};
  const total=tasks.reduce((sum,_,i)=>sum+(weights[getTaskStatus(a.id,i)]||0),0);
  return Math.round((total/tasks.length)*100);
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
  const info=placementInfo(), h=hours(), a=nextAssessment(info,h), stage=currentStage(info), g=greeting();
  return `
    <section class="brand-hero simple-brand">
      <div class="hero-botanical" aria-hidden="true">
        <svg viewBox="0 0 180 180">
          <g class="hero-compass">
            <circle cx="90" cy="90" r="48"></circle>
            <circle cx="90" cy="90" r="34"></circle>
            <line x1="90" y1="32" x2="90" y2="148"></line>
            <line x1="32" y1="90" x2="148" y2="90"></line>
            <path d="M90 46 L101 90 L90 134 L79 90 Z"></path>
            <circle cx="90" cy="90" r="4"></circle>
          </g>
        </svg>
      </div>
      <div class="brand-hero-copy">
        <div class="brand-tagline">Your placement companion</div>
      </div>
    </section>

    <section class="welcome-block">
      <div class="eyebrow">${info.started?`Week ${info.week} · Mind Australia`:"Before placement"}</div>
      <h1>${g.title}</h1>
      <p class="welcome-text">${g.subtitle}</p>
    </section>

    <section class="clean-section">
      <div class="section-title">Today</div>
      <div class="focus-line">${stage.focus[0]}</div>
      <div class="focus-line">${stage.focus[1] || "Save one useful learning moment."}</div>
      <button class="btn" id="startJournal">💬 Start today’s reflection</button>
    </section>

    <section class="clean-section">
      <div class="section-title">Coming up</div>
      <button class="plain-row" id="openCurrentAssessment" data-id="${a.id}">
        <div><strong>${a.title}</strong><span>${a.when}</span></div><span>›</span>
      </button>
    </section>

    <section class="snapshot-row">
      <div><span>Hours</span><strong>${h.toFixed(2)} / 500</strong></div>
      <div><span>Learning moments</span><strong>${savedEntries().length}</strong></div>
    </section>

    <section class="kindness-note"><div>💚</div><p>${selfcare[new Date().getDay()]}</p></section>
    <p class="home-mantra">Thoughtful, evidence informed and compassionate social work practice.</p>`;
}

function journalPage(){
  const info=placementInfo(), h=hours(), p=dailyPrompt(info,h);
  const evidenceTypes=["Skill","Knowledge","Communication","Ethics or values","Cultural capability","Theory in action","Recovery","Use of self","Feedback","Teamwork","Systems issue","Documentation","Professional development"];
  return `
    <section class="welcome-block">
      <div class="eyebrow">Reflect</div>
      <h1>💬 What did you learn today?</h1>
      <p class="welcome-text">Keep it simple. Practice Compass will organise the rest.</p>
    </section>

    <div class="conversation-card">
      <div class="chat-label">What happened?</div>
      <textarea id="answer" class="textarea" placeholder="One conversation, observation, challenge or learning moment..."></textarea>
    </div>

    <div class="conversation-card">
      <div class="chat-label">What did you learn?</div>
      <textarea id="learningText" class="textarea" placeholder="What became clearer, challenged you, or changed your thinking?"></textarea>
      <div class="why"><strong>Why am I being asked this?</strong><br>${p.why}</div>
    </div>

    <div class="conversation-card">
      <div class="chat-label">What did this demonstrate?</div>
      <p class="muted">Choose only what fits. These tags connect your reflection to relevant assessments.</p>
      <div class="chip-grid">${evidenceTypes.map(x=>`<button class="select-chip evidence-chip" data-value="${x}">${x}</button>`).join("")}</div>
    </div>

    <div class="conversation-card">
      <div class="chat-label">Anything for supervision?</div>
      <textarea id="supervision" class="textarea" placeholder="Optional"></textarea>
      <input type="hidden" id="mood" value="">
      <select id="theoryPick" class="select hidden"><option value=""></option></select>
      <select id="methodPick" class="select hidden"><option value=""></option></select>
      <button class="btn" id="saveEntry">🌿 Save this moment</button>
    </div>`;
}

function assessmentPage(){
  const info=placementInfo(), h=hours(), stage=currentStage(info);
  return `
    <section class="welcome-block">
      <div class="eyebrow">Placement</div>
      <h1>🌱 My Placement</h1>
      <p class="welcome-text">Your placement requirements, assessments and practical tasks in one place.</p>
    </section>

    <section class="clean-section">
      <div class="section-title">Placement overview</div>
      <div class="plain-info"><strong>Mind Australia</strong><span>Adult Step Up Step Down</span></div>
      <div class="plain-info"><strong>${info.started?`Week ${info.week}`:"Starts 20 July 2026"}</strong><span>${h.toFixed(2)} / 500 hours</span></div>
    </section>

    <section class="clean-section">
      <div class="section-title">This week</div>
      ${stage.focus.map(x=>`<div class="focus-line">${x}</div>`).join("")}
    </section>

    <section class="clean-section">
      <div class="section-title">Placement admin</div>
      <button class="plain-row" id="openTimesheets"><div><strong>⏱️ Timesheets</strong><span>Hours and daily activities</span></div><span>›</span></button>
      <button class="plain-row" id="openSupervision"><div><strong>☕ Supervision</strong><span>Questions, feedback and actions</span></div><span>›</span></button>
    </section>

    <section class="clean-section">
      <div class="section-title">Coming up for JCU</div>
      <p class="section-helper">Tap an assessment to see what it is, why it matters and what to collect.</p>
      ${assessments.map(a=>`<button class="plain-row assessment" data-id="${a.id}"><div><strong>${a.icon} ${a.title}</strong><span>${a.when}</span></div><span>›</span></button>`).join("")}
    </section>`;
}

function assessmentDetail(id){
  const a=assessments.find(x=>x.id===id);
  const entries=savedEntries().filter(e=>(e.evidence||[]).includes(a.title));
  const reqs=assessmentRequirements[a.title]||[];
  const overall=assessmentOverallStatus(a);
  const overallMeta=taskStatuses[overall];
  const progress=assessmentProgress(a);

  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backAssess">‹</button><h2>${a.icon} ${a.title}</h2></div>

    <div class="assessment-status-card">
      <div>
        <div class="label">Current status</div>
        <div class="status-large ${overallMeta.className}">${overallMeta.icon} ${overallMeta.label}</div>
      </div>
      <div class="progress-number">${progress}%</div>
    </div>

    <div class="progress-track"><div style="width:${progress}%"></div></div>

    <div class="card green">
      <div class="label">What is it?</div>
      <div class="big">${a.purpose||a.plain}</div>
    </div>

    <div class="card stone">
      <div class="label">Why am I doing it?</div>
      <p>${a.why||"This task helps JCU and your placement team see how your learning is developing in practice."}</p>
    </div>

    <div class="card">
      <div class="label">My checklist</div>
      <p class="muted">Change each item as it moves from not started, to in progress, waiting or complete.</p>
      ${(a.tasks||[]).map((task,i)=>{
        const status=getTaskStatus(a.id,i), meta=taskStatuses[status];
        return `<div class="task-row">
          <div class="task-copy"><span class="task-icon ${meta.className}">${meta.icon}</span><span>${task}</span></div>
          <select class="task-status-select ${meta.className}" data-assessment="${a.id}" data-index="${i}">
            ${Object.entries(taskStatuses).map(([value,m])=>`<option value="${value}" ${value===status?"selected":""}>${m.label}</option>`).join("")}
          </select>
        </div>`;
      }).join("")}
    </div>

    ${reqs.length?`<div class="card">
      <div class="label">What you are building towards</div>
      <p class="muted">These evidence types are especially useful for this task.</p>
      ${reqs.map(r=>{const c=entries.filter(e=>(e.evidenceTypes||[]).includes(r)).length;return `<div class="row"><span>${c?"✓":"○"}</span><span style="flex:1">${r}</span><strong>${c}</strong></div>`}).join("")}
    </div>`:""}

    <div class="card">
      <div class="label">What should I collect?</div>
      ${(a.collect||a.asks||[]).map(x=>`<div class="row"><span>⭐</span><span>${x}</span></div>`).join("")}
    </div>

    <div class="card">
      <div class="label">My linked learning moments</div>
      ${entries.length?entries.map(e=>`<div class="row"><div><strong>${e.date}</strong><div class="small">${e.answer.slice(0,150)}${e.answer.length>150?"...":""}</div></div></div>`).join(""):`<p class="muted">Nothing linked yet. Save a relevant reflection and Practice Compass will add it here.</p>`}
    </div>

    <div class="notice">Practice Compass supports your understanding and organisation. LearnJCU instructions and templates remain the official source.</div>`;

  document.getElementById("backAssess").onclick=()=>{route="assessments";render()};
  document.querySelectorAll(".task-status-select").forEach(select=>{
    select.onchange=()=>{
      setTaskStatus(select.dataset.assessment,Number(select.dataset.index),select.value);
      assessmentDetail(id);
    };
  });
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
  const category=toolkitCategories[categoryIndex];
  const topic=category[3][topicIndex];

  document.getElementById("main").innerHTML=`
    <div class="screen-title">
      <button class="back" id="backToolkit" aria-label="Back to Practice Toolkit">‹</button>
      <h2>${category[0]} ${topic[0]}</h2>
    </div>

    <div class="card green">
      <div class="label">What is it?</div>
      <div class="big">${topic[1]}</div>
    </div>

    <details class="card toolkit-info" open>
      <summary><strong>🌿 Why does it matter?</strong></summary>
      <p>This topic can help you understand practice more clearly, notice context, power and relationships, and make more intentional decisions.</p>
    </details>

    <details class="card toolkit-info">
      <summary><strong>👀 What might it look like in practice?</strong></summary>
      <p>Think about one conversation, decision, interaction, policy or service process where this idea may have been visible.</p>
    </details>

    <details class="card toolkit-info">
      <summary><strong>💭 Practice prompt</strong></summary>
      <p>Where did you notice ${topic[0].toLowerCase()} in practice today?</p>
      <div class="why"><strong>Why am I being asked this?</strong><br>Recognising a concept in practice makes it easier to remember and gives you material for reflection, supervision and assessment.</div>
    </details>

    <details class="card toolkit-info">
      <summary><strong>🎓 How could this support placement?</strong></summary>
      <p>This may help you identify learning goals, prepare supervision questions, strengthen reflective evidence and connect daily experiences with your JCU requirements.</p>
    </details>

    <div class="card">
      <div class="label">📚 Sources and further reading</div>
      <p class="muted">Only verified references and official links will be added here. Practice Compass will not present unverified information as fact.</p>
      <button class="btn secondary" id="returnToolkit">Return to Practice Toolkit</button>
    </div>`;

  const goBack=()=>{route="learn";render()};
  document.getElementById("backToolkit").onclick=goBack;
  document.getElementById("returnToolkit").onclick=goBack;
}

function morePage(){
  return `
    <section class="welcome-block">
      <div class="eyebrow">My Journey</div>
      <h1>💚 My Journey</h1>
      <p class="welcome-text">Your wellbeing, growth and developing professional identity.</p>
    </section>

    <section class="clean-section">
      <button class="plain-row" id="frameworkMenu"><div><strong>🧭 My Framework for Practice</strong><span>Values, approaches, skills and professional identity</span></div><span>›</span></button>
      <button class="plain-row" id="weeklyReview"><div><strong>☕ Weekly check in</strong><span>Pause and notice how the week felt</span></div><span>›</span></button>
      <button class="plain-row" id="wellbeing"><div><strong>💚 Looking after me</strong><span>Gentle reminders without pressure</span></div><span>›</span></button>
      <button class="plain-row" id="evidenceBank"><div><strong>🌱 My growth</strong><span>Learning moments across placement</span></div><span>›</span></button>
      <button class="plain-row" id="exportHtml"><div><strong>📄 Export my notes</strong><span>Readable placement record</span></div><span>›</span></button>
      <button class="plain-row" id="backupJson"><div><strong>💾 Back up my data</strong><span>Private JSON backup</span></div><span>›</span></button>
    </section>

    <div class="card about-card">
      <div class="label">🧭 Why Practice Compass?</div>
      <p>It helps you understand what you are working towards, save what you are learning and connect those moments to placement requirements.</p>
    </div>`;
}

function learningPlanPage(){
  const entries=savedEntries();
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backMore">‹</button><h2>🌱 What I’m growing</h2></div>
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
  document.getElementById("backMore").onclick=()=>{route="more";render()};
}

function evidenceBankPage(){
  const entries=savedEntries();
  const categories=["Skill","Knowledge","Ethics or values","Theory in action","Communication","Recovery","Use of self","Feedback","Teamwork","Systems issue","Professional development"];
  const counts=Object.fromEntries(categories.map(c=>[c,entries.filter(e=>(e.evidenceTypes||[]).includes(c)).length]));
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backMore">‹</button><h2>⭐ Moments that matter</h2></div>

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
  document.getElementById("backMore").onclick=()=>{route="more";render()};
}

function weeklyReviewPage(){
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backMore">‹</button><h2>☕ Weekly check in</h2></div>
    <div class="card">
      ${["What am I proud of this week?","What confused or challenged me?","Which theory makes more sense now?","What do I want to ask in supervision?","How did I look after myself?","What is one focus for next week?"].map((q,i)=>`<div class="prompt-box"><strong>${q}</strong><textarea class="textarea weekly" data-q="${q}"></textarea></div>`).join("")}
      <button class="btn" id="saveWeekly">Save weekly review</button>
      <button class="btn secondary" onclick="window.print()">Print or save as PDF</button>
    </div>`;
  document.getElementById("backMore").onclick=()=>{route="more";render()};
  document.getElementById("saveWeekly").onclick=()=>{
    const reviews=state.get("weeklyReviews",[]);
    reviews.unshift({date:new Date().toLocaleDateString("en-AU"),answers:[...document.querySelectorAll(".weekly")].map(x=>({q:x.dataset.q,a:x.value}))});
    state.set("weeklyReviews",reviews); alert("☕ Weekly check in saved.");
  };
}

function myJourneyPage(){
  const entries=savedEntries();
  const reviews=state.get("weeklyReviews",[]);
  const grouped={};
  entries.forEach(e=>{
    const d=e.date||"Undated";
    (grouped[d]||(grouped[d]=[])).push(e);
  });
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backMore">‹</button><h2>🌸 My journey</h2></div>
    <div class="card blush-card">
      <div class="label">Looking back</div>
      <div class="big">Small moments can show you how much your practice is changing.</div>
      <p class="muted">This page gathers your saved reflections and weekly check ins in one place.</p>
    </div>
    ${entries.length?Object.entries(grouped).map(([date,list])=>`
      <section class="journey-day">
        <div class="journey-date">${date}</div>
        ${list.map(e=>`<div class="journey-moment"><span>⭐</span><div><strong>${(e.evidenceTypes||[])[0]||"Learning moment"}</strong><p>${e.answer}</p></div></div>`).join("")}
      </section>`).join(""):`<div class="card"><p class="muted">Your saved moments will appear here as your placement begins.</p></div>`}
    ${reviews.length?`<div class="card"><div class="label">☕ Weekly check ins</div><p>${reviews.length} saved</p></div>`:""}`;
  document.getElementById("backMore").onclick=()=>{route="more";render()};
}

function wellbeingPage(){
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backMore">‹</button><h2>💚 Looking after me</h2></div>

    <div class="card about-card">
      <div class="label">🧭 Why Practice Compass?</div>
      <div class="big">A compass does not tell you every step. It helps you find your direction.</div>
      <p>Practice Compass is here to help you understand what you are working towards, why it matters, and what you are learning along the way.</p>
    </div>

    <div class="card stone"><div class="label">A gentle reminder</div><div class="big">${selfcare[new Date().getDay()]}</div></div>
    <div class="card"><div class="label">Quick check in</div>
      ${["I drank enough water","I moved or stretched","I took a real break","I connected with someone","I did something calming","I left placement work at placement"].map(x=>`<label class="option"><input type="checkbox"><span>${x}</span></label>`).join("")}
    </div>
    <div class="notice">This is a prompt, not another task. Missing a day does not mean you are behind.</div>`;
  document.getElementById("backMore").onclick=()=>{route="more";render()};
}

function saveEntry(){
  const what=document.getElementById("answer").value.trim();
  const learnt=document.getElementById("learningText").value.trim();
  if(!what){alert("Add one moment from today first.");return}
  const info=placementInfo(), p=dailyPrompt(info,hours());
  const evidenceTypes=[...document.querySelectorAll(".evidence-chip.selected")].map(x=>x.dataset.value);
  const autoMapped=mappedAssessments(evidenceTypes);
  const answer=learnt?`${what}

What I learnt: ${learnt}`:what;
  const entry={id:Date.now(),date:new Date().toLocaleDateString("en-AU"),goal:p.goal,mood:"",answer,evidenceTypes,theory:"",method:"",supervision:document.getElementById("supervision").value.trim(),evidence:autoMapped};
  const arr=savedEntries(); arr.unshift(entry); state.set("entries",arr);
  if(entry.supervision){
    const s=supervisionItems(); s.unshift({id:Date.now()+1,date:entry.date,type:"Reflection question",text:entry.supervision}); state.set("supervisionItems",s);
  }
  alert(autoMapped.length?`Saved 🌿 Linked to: ${autoMapped.join(", ")}.`:"Saved 🌿");
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
  const data={hours:hours(),entries:savedEntries(),weeklyReviews:state.get("weeklyReviews",[]),timesheets:timesheetEntries(),supervisionItems:supervisionItems(),taskStatuses:taskStatusData()};
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
  document.querySelectorAll(".mood-chip").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".mood-chip").forEach(x=>x.classList.remove("selected"));btn.classList.add("selected");document.getElementById("mood").value=btn.dataset.mood;});
  document.querySelectorAll(".select-chip").forEach(btn=>btn.onclick=()=>btn.classList.toggle("selected"));
  document.getElementById("openCurrentAssessment")?.addEventListener("click",e=>assessmentDetail(e.currentTarget.dataset.id));
  document.getElementById("openEvidenceMap")?.addEventListener("click",evidenceMapPage);
  document.getElementById("openFramework")?.addEventListener("click",frameworkPage);
  document.getElementById("openTimesheets")?.addEventListener("click",timesheetPage);
  document.getElementById("openSupervision")?.addEventListener("click",supervisionPage);
  document.querySelectorAll(".assessment").forEach(x=>x.onclick=()=>assessmentDetail(x.dataset.id));
  const toolkitList=document.getElementById("toolkitList");
  if(toolkitList){
    toolkitList.onclick=(event)=>{
      const folderButton=event.target.closest(".folder-header");
      if(folderButton){
        const target=document.getElementById(`folder-${folderButton.dataset.folder}`);
        if(target){
          target.classList.toggle("hidden");
          const arrow=folderButton.querySelector(".folder-arrow");
          if(arrow) arrow.textContent=target.classList.contains("hidden")?"⌄":"⌃";
        }
        return;
      }

      const topicButton=event.target.closest(".toolkit-topic");
      if(topicButton){
        toolkitDetail(Number(topicButton.dataset.category),Number(topicButton.dataset.topic));
      }
    };
  }

  document.getElementById("toolkitSearch")?.addEventListener("input",event=>{
    const query=event.target.value.toLowerCase().trim();
    document.querySelectorAll(".toolkit-folder").forEach(folder=>{
      const matches=folder.dataset.search.includes(query);
      folder.style.display=matches?"block":"none";
      if(query && matches){
        const content=folder.querySelector(".folder-content");
        const arrow=folder.querySelector(".folder-arrow");
        if(content) content.classList.remove("hidden");
        if(arrow) arrow.textContent="⌃";
      }
    });
  });
  
    document.getElementById("frameworkMenu")?.addEventListener("click",frameworkPage);
    document.getElementById("evidenceBank")?.addEventListener("click",evidenceBankPage);
  document.getElementById("weeklyReview")?.addEventListener("click",weeklyReviewPage);
  document.getElementById("myJourney")?.addEventListener("click",myJourneyPage);
  document.getElementById("wellbeing")?.addEventListener("click",wellbeingPage);
  document.getElementById("exportHtml")?.addEventListener("click",exportPrintable);
  document.getElementById("backupJson")?.addEventListener("click",backup);
}

document.querySelectorAll(".nav").forEach(n=>n.onclick=()=>{route=n.dataset.route;render()});
document.getElementById("menuBtn").onclick=()=>{route="more";render()};
render();
