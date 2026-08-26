
const LEGACY_START_DATE = "2026-07-20";
const HOURS_PER_DAY = 7.25;
const DEFAULT_TOTAL_HOURS = 500;

const state = {
  get(k, fallback){ try{ const v=localStorage.getItem(k); return v===null?fallback:JSON.parse(v)}catch{return fallback} },
  set(k,v){ localStorage.setItem(k,JSON.stringify(v)) }
};

const LEGACY_PLACEMENT_PROFILE={studentName:"Kalina Hughes",agency:"Mind Australia",service:"Adult Step Up Step Down",startDate:LEGACY_START_DATE,endDate:"",totalHours:DEFAULT_TOTAL_HOURS,weekOverride:""};
const EMPTY_PLACEMENT_PROFILE={studentName:"",agency:"",service:"",startDate:"",endDate:"",totalHours:DEFAULT_TOTAL_HOURS,weekOverride:""};
function hasExistingPlacementData(){
  return (state.get("entries",[]).length>0) ||
    (state.get("timesheets",[]).length>0) ||
    Number(state.get("hours",0))>0 ||
    (state.get("supervisionItems",[]).length>0) ||
    (state.get("weeklyReviews",[]).length>0);
}
function placementProfile(){
  const saved=state.get("placementProfile",null);
  if(saved===null)return hasExistingPlacementData()?{...LEGACY_PLACEMENT_PROFILE}:{...EMPTY_PLACEMENT_PROFILE};
  const existing=hasExistingPlacementData();
  const totalHours=Number(saved.totalHours);
  return {
    studentName:String(saved.studentName||""),
    agency:String(saved.agency||""),
    service:String(saved.service||""),
    startDate:String(saved.startDate||(existing?LEGACY_START_DATE:"")),
    endDate:String(saved.endDate||""),
    totalHours:Number.isFinite(totalHours)&&totalHours>0?totalHours:DEFAULT_TOTAL_HOURS,
    weekOverride:saved.weekOverride===0||saved.weekOverride?String(saved.weekOverride):""
  };
}
function placementTotalHours(){ return placementProfile().totalHours||DEFAULT_TOTAL_HOURS; }
function parseLocalDate(value){
  if(!value)return null;
  const parts=String(value).split("-").map(Number);
  if(parts.length!==3||parts.some(Number.isNaN))return null;
  return new Date(parts[0],parts[1]-1,parts[2],0,0,0,0);
}
function placementProfileLabel(){
  const profile=placementProfile();
  return [profile.studentName,profile.agency,profile.service].filter(Boolean).join(" · ");
}
function firstName(){
  const name=placementProfile().studentName.trim();
  return name?name.split(/\s+/)[0]:"there";
}

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
  purpose:"Complete a manageable research or practice project that contributes to your learning and provides a useful outcome for your placement agency.",
  why:"The project develops research minded practice and shows how social workers can improve services, policy, resources or organisational knowledge.",
  tasks:["Discuss agency needs with your supervisor","Agree on a realistic project question and output","Plan research or information gathering","Complete the project within placement time","Explain how it benefits the agency and your learning"],
  collect:["Possible agency need or gap","Project question","Relevant literature or policy","Supervisor feedback","Decisions and changes made","Evidence of agency benefit"],
  toolkit:["Research and Evidence","Social Policy","Documentation","Community Development"],
  examples:["Small literature review","Feedback survey or evaluation","Policy or procedure review","Resource or practice guide","Small report, blog or article","Project proposal","Data analysis or dissemination"]},

 {id:"reflections",title:"Three Project Reflections",when:"Three times across placement · 800 to 1000 words each",icon:"⭐",color:"olive",
  purpose:"Submit three structured reflections about your project, research process and its connection with professional social work practice.",
  why:"The reflections show that you are learning from the project as it develops, rather than only reporting the final product.",
  tasks:["Project Reflection 1 · planning and identifying the need","Project Reflection 2 · development, consultation and changes","Project Reflection 3 · implementation, impact and learning"],
  collect:["What has progressed","What challenged you","Research or theory used","Agency relevance","Ethical issues","What changed after feedback","Next steps"],
  toolkit:["Reflective Practice","Research and Evidence","Ethical Decision Making","Use of Self"]},

 {id:"timesheets",title:"Timesheets",when:"Submit every two weeks",icon:"⏱️",color:"stone",
  purpose:"Record your daily hours, activities, absences, library time and unpaid lunch breaks.",
  why:"Timesheets verify your 500 placement hours and demonstrate accountability for how placement time is used.",
  tasks:["Record start and finish times","Record at least a 30 minute unpaid lunch when working five or more hours","Describe daily activities and tasks","Record library time and absences","Have the timesheet reviewed and signed","Submit to the FELO every two weeks"],
  collect:["Daily hours","Daily activities","Library or research time","Absences or altered hours","Supervisor signature and submission date"],
  toolkit:["Documentation","AASW Practice Standards","Information Recording"]},

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

const toolkitCategories = [
  ["🏥", "Practice Areas", "Major fields and systems of Australian social work practice.", [
    ["Mental Health", "Recovery, rights, relationships and social context."],
    ["Domestic & Family Violence", "Safety, coercive control, trauma and access to support."],
    ["Children, Young People & Families", "Development, safety, participation and family context."],
    ["Housing & Homelessness", "Housing, safety and structural barriers."],
    ["Alcohol & Other Drugs", "Harm reduction, stigma, choice and recovery."],
    ["Disability", "Access, rights, communication and inclusion."],
    ["Older People", "Ageing, autonomy, care, loss and connection."],
    ["Justice", "Rights, stigma, reintegration and systems involvement."],
    ["Rural & Remote Practice", "Distance, access, privacy and relationships."],
    ["Community Practice", "Participation, capacity building and collective action."],
    ["Social Policy & Systems", "How policy, funding and service systems shape people’s lives."]
  ]],
  ["🧠", "Theories & Frameworks", "Lenses for understanding people, relationships, systems and change.", [
    ["Recovery Oriented Practice", "Hope, choice, meaning and a life beyond symptoms."],
    ["CHIME", "Connectedness, Hope, Identity, Meaning and Empowerment."],
    ["Strengths Based Practice", "Start with capacity, resources and possibility."],
    ["Systems & Ecological Theory", "Understand the person within interacting environments."],
    ["Narrative Practice", "Separate the person from the problem and make space for preferred stories."],
    ["Feminist Social Work", "Examine gender, power and structural inequality."],
    ["Anti Oppressive Practice", "Notice and challenge power, privilege and oppression."],
    ["Critical Social Work", "Connect personal experiences with structural power and social conditions."],
    ["Empowerment Theory", "Support participation, access to resources and greater control over decisions."],
    ["Trauma Informed Practice", "Prioritise safety, trust, choice and collaboration."],
    ["Person Centred Practice", "Keep the person’s goals, preferences and lived experience central."],
    ["Attachment Theory", "Consider how safety and connection shape relationships."],
    ["Psychosocial Development", "Consider development across life stages and social contexts."],
    ["Social Learning Theory", "Explore how behaviour can be learned through observation, reinforcement and relationships."],
    ["Cognitive Behavioural Theory", "Consider connections between thoughts, emotions and behaviour."],
    ["Social Determinants of Health", "Understand how social and economic conditions shape health and wellbeing."],
    ["Rights Based Practice", "Use human rights, participation and accountability to guide practice."],
    ["Ethics of Care", "Recognise relationships, interdependence and responsibility in ethical practice."]
  ]],
  ["🛠️", "Practice Skills", "Practical methods for direct work, collaboration, recording and evidence use.", [
    ["Engagement & Rapport", "Build trust through warmth, clarity and respectful pacing."],
    ["Active Listening", "Use reflection, summarising, silence and clarification."],
    ["Motivational Interviewing", "Explore ambivalence and strengthen the person’s own reasons for change."],
    ["Solution Focused Practice", "Identify exceptions, preferred futures and achievable next steps."],
    ["Task Centred Practice", "Work collaboratively on specific priorities within an agreed timeframe."],
    ["Assessment", "Explore needs, strengths, goals, risks and context."],
    ["Risk & Safety Planning", "Work collaboratively around risk and protective factors."],
    ["Suicide Risk Assessment", "Explore suicidal distress, immediate safety, supports and next steps within scope."],
    ["Safety Planning", "Develop practical, collaborative steps for periods of increased distress or risk."],
    ["Advocacy", "Address barriers, rights and access to services."],
    ["Case Management", "Coordinate planning, services, referrals and review."],
    ["Group Facilitation", "Support participation, purpose and group safety."],
    ["Group Work Theory", "Understand group stages, roles, dynamics, cohesion and mutual aid."],
    ["Difficult Conversations", "Stay clear, respectful and grounded."],
    ["Trauma Informed Communication", "Support safety, choice and control."],
    ["De escalation", "Reduce intensity while maintaining dignity and safety."],
    ["Crisis Intervention", "Support immediate safety, stabilisation and short term planning."],
    ["Harm Reduction", "Reduce harm through practical, non judgemental and person led strategies."],
    ["Psychosocial Rehabilitation", "Support skills, participation, connection and valued life roles."],
    ["Strengths Based Language", "Describe people with respect and possibility."],
    ["Working with Interpreters", "Speak to the person, not the interpreter."],
    ["Email & Phone Communication", "Be clear, professional and purposeful."],
    ["Documentation", "Record clearly, objectively and ethically."],
    ["Case Notes", "Relevant, factual and timely records."],
    ["Assessment Writing", "Bring together needs, strengths, risk and context."],
    ["Reports", "Structured, evidence informed and audience aware writing."],
    ["Evidence Informed Practice", "Combine research, professional knowledge and lived experience."],
    ["Finding Quality Sources", "Use peer reviewed and authoritative material."],
    ["Critical Appraisal", "Consider strengths, limitations and relevance."],
    ["Small Project Skills", "Plan, gather information, analyse and report."],
    ["APA 7 Referencing", "Credit sources accurately and consistently."]
  ]],
  ["🌏", "Culture, Identity & Inclusion", "Culturally safe, inclusive, anti racist and responsive practice.", [
    ["Aboriginal & Torres Strait Islander Practice", "Centre self determination, Country, kinship and community."],
    ["Cultural Humility", "Stay curious, reflective and accountable."],
    ["Culturally Responsive Practice", "Adapt practice to culture, identity, language and context without stereotyping."],
    ["Cultural Safety", "Consider whether practice is experienced as safe by the person."],
    ["Decolonising Practice", "Question colonial assumptions and systems."],
    ["CALD Practice", "Respond to language, migration, culture and settlement experiences."],
    ["Refugee & Asylum Seeker Practice", "Consider trauma, displacement, legal status and settlement."],
    ["LGBTQIA+ Affirmative Practice", "Support identity, dignity and self determination."],
    ["Disability Inclusive Practice", "Remove barriers and support participation."],
    ["Neurodiversity Affirming Practice", "Respect neurological difference and communication needs."],
    ["Intersectionality", "Understand how identities and structures overlap."],
    ["Anti Racist Practice", "Identify and challenge racism in systems and practice."]
  ]],
  ["⚖️", "Ethics, Law & Professional Practice", "Values, standards, rights, policy and professional responsibilities.", [
    ["AASW Code of Ethics", "Respect, social justice and professional integrity."],
    ["AASW Practice Standards", "Professional expectations across social work practice."],
    ["Professional Boundaries", "Maintain safe and purposeful relationships."],
    ["Confidentiality", "Protect privacy while understanding limits."],
    ["Informed Consent", "Support genuine understanding and choice."],
    ["Supported Decision Making", "Provide support to understand, consider and communicate decisions."],
    ["Ethical Decision Making", "Work through competing values and responsibilities."],
    ["Reflective Practice", "Examine assumptions, power, emotions and the impact of practice decisions."],
    ["Supervision", "Use reflection, feedback and accountability to grow."],
    ["Professional Sustainability", "Recognise stress and the need for support."],
    ["Mental Health Act 2016 (Qld)", "Rights, treatment, decision making and safeguards."],
    ["Human Rights Act 2019 (Qld)", "Human rights in public decision making."],
    ["Privacy & Confidentiality", "Privacy law, information handling and disclosure."],
    ["Guardianship & Decision Making", "Capacity and supported decision making."],
    ["Policy Analysis", "Examine policy goals, assumptions, impacts and gaps."],
    ["Service Systems", "Understand funding, eligibility and service responses."],
    ["Organisation Policies", "Local procedures and guidance relevant to placement."]
  ]]
];


// Stage 1 Toolkit content: Mental Health and Professional Practice.
// This content is deliberately topic specific and uses recognised Australian guidance.
const stage1ToolkitContent = {
  "Mental Health": {
    what:"Mental health social work considers emotional wellbeing alongside relationships, housing, income, culture, physical health, trauma, identity and access to services. The role is not limited to symptoms or diagnosis. Social workers support recovery, rights, practical needs, family and community connections, and coordination across service systems.",
    practice:["Ask what matters to the person, not only what is wrong.","Explore strengths, goals, relationships, housing, finances, safety and community supports.","Work alongside peer workers, clinicians, families and other services while keeping the person’s voice central.","Notice how stigma, poverty, discrimination and service barriers affect wellbeing and recovery."],
    remember:["Use recovery oriented and rights based language.","Stay within your role and seek supervision when clinical or legal questions arise.","Mental distress does not remove a person’s right to participate in decisions."],
    related:["Recovery Oriented Practice","Trauma Informed Practice","Risk & Safety Planning","Supported Decision Making"],
    refs:[["Australian Government Department of Health and Aged Care, National framework for recovery oriented mental health services","https://www.health.gov.au/resources/publications/a-national-framework-for-recovery-oriented-mental-health-services-guide-for-practitioners-and-providers"],["Queensland Health, mental health, alcohol and other drugs clinical guidance","https://www.health.qld.gov.au/public-health/topics/mhaod/for-healthcare-providers/clinical-guidelines-policies-and-resources/guidelines-and-frameworks"]]
  },
  "Recovery Oriented Practice": {
    what:"Recovery oriented practice supports people to live meaningful and self directed lives, whether or not symptoms continue. Recovery is personal and is defined by the person rather than the service. Practice focuses on hope, choice, identity, relationships, strengths, participation and access to the social conditions that support wellbeing.",
    practice:["Ask the person what a meaningful life looks like for them.","Use the person’s goals to guide planning rather than imposing service goals.","Recognise strengths, lived expertise and existing coping strategies.","Support connection with family, culture, community, education, work and ordinary life roles."],
    remember:["Recovery is not the same as cure or discharge.","Avoid defining progress only through symptom reduction or compliance.","Balance safety responsibilities with autonomy, dignity of risk and least restrictive practice."],
    related:["CHIME","Strengths Based Practice","Person Centred Practice","Supported Decision Making"],
    refs:[["Australian Government Department of Health and Aged Care, National framework for recovery oriented mental health services","https://www.health.gov.au/resources/publications/a-national-framework-for-recovery-oriented-mental-health-services-guide-for-practitioners-and-providers"],["National Mental Health Commission, recovery oriented practice resources","https://www.mentalhealthcommission.gov.au/"]]
  },
  "CHIME": {
    what:"CHIME is a widely used way of understanding personal recovery in mental health. It highlights five interconnected processes: Connectedness, Hope and optimism, Identity, Meaning in life, and Empowerment. It is a reflective framework, not a checklist or clinical assessment tool.",
    practice:["Connectedness: notice supportive relationships, belonging and peer connection.","Hope: listen for possibilities, aspirations and reasons to keep going.","Identity: support a sense of self beyond illness, diagnosis or service use.","Meaning and empowerment: explore purpose, valued roles, choice, confidence and control."],
    remember:["Ask which elements matter to the person rather than assuming all five are equally important.","Use CHIME to notice recovery processes, not to score a person’s recovery.","Social conditions such as housing, income, discrimination and safety can enable or restrict every CHIME element."],
    related:["Recovery Oriented Practice","Strengths Based Practice","Person Centred Practice","Mental Health"],
    refs:[["Australian Government Department of Health and Aged Care, National framework for recovery oriented mental health services","https://www.health.gov.au/resources/publications/a-national-framework-for-recovery-oriented-mental-health-services-policy-and-theory"],["Leamy et al. conceptual framework for personal recovery, British Journal of Psychiatry","https://doi.org/10.1192/bjp.bp.110.083733"]]
  },
  "Trauma Informed Practice": {
    what:"Trauma informed practice recognises that trauma can shape safety, trust, relationships, coping and responses to services. It does not require a person to disclose trauma. The focus is on creating emotional, cultural and physical safety, avoiding re traumatisation, and increasing choice, collaboration and control.",
    practice:["Explain who you are, what will happen and why information is being requested.","Offer realistic choices about timing, pace, seating, support people and next steps.","Notice distress and respond with grounding, validation and a slower pace.","Ask what would help the person feel safer rather than assuming."],
    remember:["Do not pressure a person to tell their trauma story.","Trauma informed practice is an organisational responsibility, not only an individual communication style.","Consider structural and collective trauma, including colonisation, racism, violence and poverty."],
    related:["Recovery Oriented Practice","Cultural Safety","Professional Boundaries","Safety Planning"],
    refs:[["Blue Knot Foundation, trauma informed practice resources","https://blueknot.org.au/resources/blue-knot-resources/"],["Queensland Health, Better Crisis Care framework","https://www.health.qld.gov.au/__data/assets/pdf_file/0031/1439482/qh-better-crisis-care-framework.pdf"]]
  },
  "Strengths Based Practice": {
    what:"Strengths based practice begins with people’s abilities, knowledge, relationships, resources and hopes rather than treating problems as their whole identity. It does not ignore risk or hardship. It broadens assessment so that planning includes what is already working and what the person can build upon.",
    practice:["Ask how the person has managed difficult situations before.","Identify personal, family, cultural and community strengths.","Use language that describes capacity and context rather than labels.","Build goals from the person’s existing skills, interests and supports."],
    remember:["Do not use strengths language to minimise pain, risk or structural disadvantage.","Let the person define what they see as a strength.","Document strengths with the same specificity used to document concerns."],
    related:["Recovery Oriented Practice","CHIME","Person Centred Practice","Advocacy"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Australian Government Department of Health and Aged Care, recovery oriented mental health framework","https://www.health.gov.au/resources/publications/a-national-framework-for-recovery-oriented-mental-health-services-guide-for-practitioners-and-providers"]]
  },
  "Person Centred Practice": {
    what:"Person centred practice treats the person as an active partner with expertise in their own life. Support is shaped around their goals, preferences, communication needs, identity and circumstances rather than expecting them to fit a standard service response.",
    practice:["Ask what the person wants from the conversation or service.","Check understanding and invite the person to correct your interpretation.","Adapt communication, pace and planning to the person’s needs.","Record the person’s own goals and views clearly in documentation."],
    remember:["Person centred does not mean the worker has no professional responsibilities.","Be transparent when options are limited or safety duties affect choice.","Include family or carers only with consent or another clear lawful basis."],
    related:["Recovery Oriented Practice","Supported Decision Making","Informed Consent","Strengths Based Practice"],
    refs:[["Australian Commission on Safety and Quality in Health Care, person centred care","https://www.safetyandquality.gov.au/our-work/partnering-consumers/person-centred-care"],["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"]]
  },
  "Motivational Interviewing": {
    what:"Motivational Interviewing is a collaborative communication approach used to explore ambivalence and strengthen a person’s own motivation for change. It avoids arguing, persuading or directing. The worker listens for the person’s reasons, confidence and readiness, while respecting autonomy.",
    practice:["Use open questions, affirmations, reflections and summaries.","Ask about both the benefits and costs of the current situation.","Reflect change talk without exaggerating it.","Ask permission before offering information or suggestions."],
    remember:["Motivational Interviewing is not a technique for making someone comply.","Respect a person’s right not to change or to choose a different goal.","Use supervision and training before presenting yourself as competent in the full model."],
    related:["Active Listening","Strengths Based Practice","Person Centred Practice","Harm Reduction"],
    refs:[["Miller and Rollnick, Motivational Interviewing, 3rd edition","https://www.guilford.com/books/Motivational-Interviewing/Miller-Rollnick/9781609182274"],["Queensland Health, mental health alcohol and other drugs clinical resources","https://www.health.qld.gov.au/public-health/topics/mhaod/for-healthcare-providers/clinical-guidelines-policies-and-resources/guidelines-and-frameworks"]]
  },
  "Risk & Safety Planning": {
    what:"Risk and safety planning is a collaborative process for understanding current concerns, protective factors, context, likely changes and practical actions that may reduce harm. It should inform proportionate support and review. It is broader than completing a risk form and should include the person’s own knowledge of what increases or reduces risk.",
    practice:["Ask directly and respectfully about current concerns, recent changes and immediate safety.","Identify strengths, protective relationships, coping strategies and reasons for living.","Clarify who will do what, when review will occur and how urgent help can be accessed.","Document the information considered, the person’s views, consultation and rationale for decisions."],
    remember:["Risk cannot be predicted with certainty or reduced to a low, medium or high label.","Follow organisational policy, scope of practice and escalation procedures.","If there is immediate danger, seek urgent senior or emergency support rather than managing alone."],
    related:["Suicide Risk Assessment","Safety Planning","Documentation","Supervision"],
    refs:[["Queensland Health, Suicide Prevention Practice guideline","https://www.health.qld.gov.au/public-health/topics/mhaod/for-healthcare-providers/clinical-guidelines-policies-and-resources/guidelines-frameworks/suicide-prevention-practice-queensland-health-guideline"],["Queensland Health, Better Crisis Care framework","https://www.health.qld.gov.au/__data/assets/pdf_file/0031/1439482/qh-better-crisis-care-framework.pdf"]]
  },
  "Suicide Risk Assessment": {
    what:"Suicide risk assessment is a compassionate, direct and ongoing conversation about suicidal thoughts, intent, planning, access to means, past behaviour, recent stressors, supports and reasons for living. Its purpose is to guide immediate care and safety, not to predict suicide with certainty or assign a permanent risk category.",
    practice:["Ask clearly about thoughts of suicide, intent, plans, preparation and access to means.","Explore what has changed, what has stopped the person acting, and what support feels possible.","Consult promptly with the appropriate practitioner and follow service escalation procedures.","Record the person’s words, relevant context, actions taken and review plan."],
    remember:["Asking about suicide does not put the idea into someone’s mind.","Do not rely only on a checklist or a person’s denial of intent.","Students should not carry suicide risk decisions alone. Seek immediate supervision and follow policy."],
    related:["Risk & Safety Planning","Safety Planning","Crisis Intervention","Documentation"],
    refs:[["Queensland Health, Suicide Prevention Practice guideline","https://www.health.qld.gov.au/public-health/topics/mhaod/for-healthcare-providers/clinical-guidelines-policies-and-resources/guidelines-frameworks/suicide-prevention-practice-queensland-health-guideline"],["Australian Government Department of Health and Aged Care, suicide prevention resources","https://www.health.gov.au/topics/mental-health-and-suicide-prevention"]]
  },
  "Safety Planning": {
    what:"A safety plan is a practical, personalised plan developed with a person for times when distress or risk increases. It usually identifies warning signs, internal coping strategies, supportive people and places, professional contacts, urgent help options and ways to reduce access to lethal means where relevant.",
    practice:["Use the person’s own words and make the plan easy to access.","Identify steps that are realistic at different levels of distress.","Confirm contact details and discuss what may make it hard to use the plan.","Review and update the plan after changes, crises or learning about what helped."],
    remember:["A safety plan is not a no suicide contract and does not replace assessment or care.","Complete it collaboratively rather than handing over a generic form.","Follow local procedures about family involvement, escalation and emergency response."],
    related:["Suicide Risk Assessment","Risk & Safety Planning","Trauma Informed Practice","Supported Decision Making"],
    refs:[["Queensland Health, Suicide Prevention Practice guideline","https://www.health.qld.gov.au/public-health/topics/mhaod/for-healthcare-providers/clinical-guidelines-policies-and-resources/guidelines-frameworks/suicide-prevention-practice-queensland-health-guideline"],["Beyond Blue, safety planning resources","https://www.beyondblue.org.au/mental-health/suicide-prevention/safety-planning"]]
  },
  "AASW Code of Ethics": {
    what:"The AASW Code of Ethics 2020 sets out the values and ethical responsibilities that guide Australian social work. Its three core values are respect for persons, social justice and professional integrity. The Code supports ethical reasoning and accountability across different practice contexts rather than providing a rule for every situation.",
    practice:["Use the Code to identify the values and responsibilities involved in a decision.","Discuss tensions openly in supervision, including conflicts between autonomy, safety, privacy and organisational demands.","Explain decisions transparently and document the reasoning where appropriate.","Consider how power, culture, rights and structural inequality affect the situation."],
    remember:["Ethical practice requires judgement, consultation and reflection, not simply quoting a value.","Read the Code alongside the AASW Practice Standards and relevant law or policy.","Raise concerns when organisational practice may conflict with ethical responsibilities."],
    related:["AASW Practice Standards","Ethical Decision Making","Professional Boundaries","Confidentiality"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["AASW Ethics and Practice Guidelines","https://www.aasw.asn.au/about-aasw/ethics-standards/ethics-and-practice-guidelines/"]]
  },
  "AASW Practice Standards": {
    what:"The AASW Practice Standards 2023 describe the core expectations for safe, ethical and accountable social work practice in Australia. They cover professional conduct, working with Aboriginal and Torres Strait Islander peoples, human rights and social justice, culture and identity, critical thinking, professional judgement, professional identity and supervision, and ongoing professional development.",
    practice:["Link placement examples to the Standard they genuinely demonstrate.","Use supervision to identify evidence, gaps and next learning steps.","Show how knowledge, values and skills informed your actions, not only that an activity occurred.","Revisit the Standards across placement rather than waiting until assessment time."],
    remember:["The Standards are interconnected and one experience may relate to several.","Do not force every reflection to fit a Standard.","Use the official 2023 document for exact wording and assessment evidence."],
    related:["AASW Code of Ethics","Supervision","Reflective Practice","Professional Identity"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"]]
  },
  "Professional Boundaries": {
    what:"Professional boundaries keep the relationship safe, purposeful and centred on the person’s needs. They clarify the worker’s role, availability, use of personal information, contact, gifts, social media and limits of the service. Boundaries allow warmth and genuine human connection without turning the relationship into a friendship or meeting the worker’s needs.",
    practice:["Explain your role, student status, availability and limits clearly.","Use self disclosure only when it has a clear benefit for the person.","Follow policy about contact outside appointments, gifts, transport and social media.","Bring feelings of rescue, avoidance, over involvement or discomfort to supervision."],
    remember:["Boundaries are contextual, but they are never solely a private decision between worker and service user.","Avoid abrupt or punitive boundary setting. Explain limits respectfully.","Document and seek advice about boundary crossings, dual relationships or conflicts of interest."],
    related:["AASW Code of Ethics","Supervision","Use of Self","AASW Code of Ethics"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["AASW Ethics and Practice Guidelines","https://www.aasw.asn.au/about-aasw/ethics-standards/ethics-and-practice-guidelines/"]]
  },
  "Confidentiality": {
    what:"Confidentiality is the professional responsibility to protect information shared in the helping relationship. It supports trust and privacy, but it is not absolute. Information may sometimes be disclosed with consent, under law, to address serious safety concerns, or for authorised service purposes. The exact limits depend on legislation, policy and the practice setting.",
    practice:["Explain privacy and its limits before sensitive information is discussed.","Seek informed consent before sharing information whenever possible.","Share only information that is relevant and necessary with appropriate people.","Use secure systems and avoid identifiable discussions in public or informal settings."],
    remember:["Do not promise complete secrecy.","Consult a supervisor before disclosing without consent unless urgent action is required.","Record what was shared, with whom, the authority or rationale, and whether the person was informed."],
    related:["Informed Consent","Documentation","Professional Boundaries","AASW Code of Ethics"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["Office of the Australian Information Commissioner, Australian Privacy Principles","https://www.oaic.gov.au/privacy/australian-privacy-principles"]]
  },
  "Informed Consent": {
    what:"Informed consent means a person has understandable information, decision making ability for the specific decision, and a genuine opportunity to choose without coercion. Consent is a continuing process, not a one time signature. It should cover the purpose of contact, options, likely consequences, information sharing and the limits of confidentiality.",
    practice:["Use plain language and interpreters or communication supports where needed.","Check understanding by asking the person to explain information in their own words.","Allow time, questions and the option to reconsider.","Record what was explained, the person’s decision and any limits on consent."],
    remember:["Do not assume consent because a person attended or did not object.","Capacity is decision specific and may fluctuate.","When consent cannot be obtained, identify the lawful authority and use the least restrictive approach."],
    related:["Supported Decision Making","Confidentiality","Person Centred Practice","Supported Decision Making"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["Queensland Health, consent resources","https://www.health.qld.gov.au/consent"]]
  },
  "Supported Decision Making": {
    what:"Supported decision making helps a person make and communicate their own decisions by providing the support they need. Support may include accessible information, extra time, trusted supporters, interpreters, communication aids or help comparing options. It starts from the presumption that people can make decisions and seeks to preserve autonomy as far as possible.",
    practice:["Ask the person how they prefer to receive information and who they want involved.","Break decisions into smaller parts and explain options, benefits and risks clearly.","Distinguish an unwise decision from an inability to decide.","Document the supports offered and the person’s own preferences and decision."],
    remember:["Do not replace the person’s decision with what others think is best unless lawful substitute decision making is required.","Capacity is specific to the decision and time.","Check Queensland law and organisational policy when guardianship or involuntary treatment may be relevant."],
    related:["Informed Consent","Supported Decision Making","Person Centred Practice","Mental Health Act 2016 (Qld)"],
    refs:[["Queensland Government, capacity and decision making","https://www.qld.gov.au/law/legal-mediation-and-justice-of-the-peace/power-of-attorney-and-making-decisions-for-others/capacity-guidelines"],["Queensland Health, Mental Health Act 2016 resources","https://www.health.qld.gov.au/public-health/topics/mhaod/legislation-and-courts/mental-health-act-2016"]]
  },
  "Supervision": {
    what:"Professional supervision is a regular, purposeful space for reflection, learning, accountability and support. It helps social workers connect practice with ethics, theory, evidence and organisational responsibilities. For students, supervision is also where uncertainty, feedback, emotional responses and evidence for placement learning can be explored safely.",
    practice:["Bring a brief agenda with practice questions, ethical tensions and learning goals.","Use specific examples rather than reporting only what happened.","Ask for feedback and agree on actions to try before the next session.","Record key learning and follow up tasks without including unnecessary identifying information."],
    remember:["Supervision is not only case management or task allocation.","Raise risk, safety or ethical concerns promptly rather than waiting for the next scheduled session.","Be honest about uncertainty. Seeking guidance is part of accountable practice."],
    related:["Reflective Practice","AASW Practice Standards","Professional Identity","Professional Sustainability"],
    refs:[["AASW Supervision resources","https://www.aasw.asn.au/support-and-resources/supervision/"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Family and Carer Inclusive Practice": {
    what:"Family and carer inclusive practice recognises that a person may have relatives, friends, chosen family or other supporters who contribute knowledge, care, connection and continuity. Inclusion should be guided by the consumer’s preferences, informed consent, safety, culture and rights. It also recognises that carers may need information, support and referral in their own right.",
    practice:[
      "Ask the consumer who they consider important in their life rather than assuming biological family is their preferred support network.",
      "Discuss consent early, record what the person agrees can be shared, and review consent when circumstances or relationships change.",
      "Explain confidentiality clearly. Even where information cannot be disclosed, workers can usually listen to relevant information from a carer and provide general service information within policy.",
      "Invite agreed supporters into recovery planning, reviews, family meetings and exit planning where this reflects the consumer’s wishes and is safe.",
      "Consider whether the carer has separate needs for information, emotional support, practical assistance or referral.",
      "Explore culture, kinship, chosen family, family violence, conflict, young carer responsibilities and accessibility rather than applying one model of family involvement.",
      "Use this quick check: Who matters to the consumer? What consent exists? What can be shared? What can be received? Is there a safety or lawful disclosure issue? Does consent need review? Does the carer need support?"
    ],
    remember:[
      "Consumer autonomy remains central. Family inclusion should not become family control.",
      "Do not use confidentiality as a blanket reason to avoid all communication with carers. Check the exact limits, organisational policy and lawful basis.",
      "A carer’s view may add important context, but it should be identified as their perspective rather than treated automatically as fact.",
      "Where family involvement may create risk, coercion or distress, prioritise safety and discuss the situation in supervision.",
      "Follow your placement agency’s current policy, consent documentation, privacy requirements and supervisor guidance."
    ],
    related:["Informed Consent","Confidentiality","Supported Decision Making","Recovery Oriented Practice","Systems & Ecological Theory","Safety Planning"],
    refs:[
      ["Your placement agency’s family and carer inclusion policy or practice guidance reviewed during placement",""],
      ["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],
      ["Australian Government, National framework for recovery oriented mental health services","https://www.health.gov.au/resources/publications/a-national-framework-for-recovery-oriented-mental-health-services-guide-for-practitioners-and-providers"],
      ["Carer Gateway, support for carers","https://www.carergateway.gov.au/"]
    ]
  },
  "Domestic & Family Violence": {
    what:"Domestic and family violence is a pattern of behaviour used to control, frighten, isolate or harm a person within an intimate or family relationship. It can include physical, sexual, psychological, emotional, social, technological and economic abuse, as well as coercive control. Social work responses need to prioritise safety, dignity, choice and the victim survivor’s own knowledge of their circumstances.",
    practice:["Respond calmly, believe the person and avoid judgement or pressure.","Ask about immediate safety, children, housing, finances, technology and support networks without assuming that leaving is the safest or most realistic option.","Use specialist referral pathways and warm handovers where consent and safety allow.","Document the person’s words, relevant risks, actions and referrals clearly, while considering information security and perpetrator access."],
    remember:["Violence is the responsibility of the person using it.","Separation can increase risk, so do not treat leaving as a simple solution.","Consider how disability, culture, migration status, sexuality, rural location and poverty may shape safety and service access."],
    related:["Risk & Safety Planning","Trauma Informed Practice","Housing & Homelessness","Children, Young People & Families"],
    refs:[["Australian Institute of Health and Welfare, family, domestic and sexual violence responses and services","https://www.aihw.gov.au/family-domestic-and-sexual-violence/responses-and-outcomes/services-responding-to-fdsv"],["Queensland Government, coercive control information","https://www.qld.gov.au/community/getting-support-health-social-issue/support-victims-abuse/need-to-know/coercive-control"],["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"]]
  },
  "Children, Young People & Families": {
    what:"Children, young people and family social work considers safety, development, identity, relationships, participation and the wider conditions affecting family life. Practice may involve early support, statutory systems, health, education, disability, housing or family services. A child centred approach listens to children while also understanding family, cultural and community context.",
    practice:["Explain your role and the limits of confidentiality in language suited to the child or young person.","Seek the child’s views directly and use communication methods that match their age, development and needs.","Assess strengths, relationships, safety, caregiving, culture, housing, finances and service involvement together rather than in isolation.","Work transparently with parents and carers while keeping the child’s safety, rights and participation central."],
    remember:["Children are participants in decisions affecting them, not only sources of information.","Avoid equating poverty, disability or cultural difference with neglect.","Know your reporting obligations, organisational procedures and the boundaries of your role."],
    related:["Domestic & Family Violence","Assessment","Cultural Safety","Trauma Informed Practice"],
    refs:[["Australian Institute of Health and Welfare, Australia’s children","https://www.aihw.gov.au/reports/children-youth/australias-children"],["Australian Institute of Family Studies, child protection and family support resources","https://aifs.gov.au/resources/policy-and-practice-papers"],["Queensland Government, child protection information","https://www.qld.gov.au/community/caring-child/foster-kinship-care/information-for-carers/child-protection-system"]]
  },
  "Housing & Homelessness": {
    what:"Housing and homelessness practice recognises safe, stable and affordable housing as a foundation for wellbeing, participation and recovery. Homelessness includes rough sleeping, temporary accommodation, couch surfing and living in unsafe or severely insecure housing. Social workers address immediate needs while also recognising structural causes such as housing supply, poverty, discrimination and domestic violence.",
    practice:["Ask about where the person will sleep, whether the place is safe, and how stable the arrangement is.","Support access to housing, income, identification, health care and specialist services through practical advocacy and warm referrals.","Consider tenancy risks, family violence, disability access, pets, transport, children and cultural connection in planning.","Document systemic barriers and escalate recurring service gaps through supervision or organisational channels."],
    remember:["Homelessness is not an individual failure.","A referral is not complete until the person understands the next step and barriers have been considered.","Housing options that are technically available may still be unsafe, unaffordable or inaccessible."],
    related:["Domestic & Family Violence","Advocacy","Service Systems","Rural & Remote Practice"],
    refs:[["Australian Institute of Health and Welfare, homelessness services overview","https://www.aihw.gov.au/reports-data/health-welfare-services/homelessness-services/overview"],["Australian Institute of Health and Welfare, housing and family, domestic and sexual violence","https://www.aihw.gov.au/family-domestic-and-sexual-violence/responses-and-outcomes/housing"],["Queensland Government, housing help","https://www.qld.gov.au/housing/help"]]
  },
  "Alcohol & Other Drugs": {
    what:"Alcohol and other drug practice supports people experiencing substance related harm without reducing them to their substance use. Australian policy is grounded in harm minimisation, which combines demand reduction, supply reduction and harm reduction. Social work brings attention to trauma, mental health, relationships, housing, stigma, culture and the person’s own goals.",
    practice:["Ask what the person uses, what they value about it, what concerns them and what change, if any, they want.","Use non judgemental language and explore safer options even when abstinence is not the person’s goal.","Screen for withdrawal risk, overdose risk, mental distress, family violence, housing and child safety within your scope and service procedures.","Coordinate with health, peer, housing and community services while avoiding fragmented or punitive responses."],
    remember:["Harm reduction is compatible with recovery and self determination.","Do not assume substance use explains every difficulty or removes decision making capacity.","Withdrawal from some substances can require medical assessment, so seek appropriate clinical advice."],
    related:["Motivational Interviewing","Harm Reduction","Mental Health","Trauma Informed Practice"],
    refs:[["Australian Government Department of Health, Disability and Ageing, National Framework for Alcohol, Tobacco and Other Drug Treatment 2019–29","https://www.health.gov.au/resources/publications/national-framework-for-alcohol-tobacco-and-other-drug-treatment-2019-29"],["Australian Government Department of Health, Disability and Ageing, National Drug Strategy","https://www.health.gov.au/resources/collections/national-drug-strategy"],["Queensland Health, mental health alcohol and other drugs clinical resources","https://www.health.qld.gov.au/public-health/topics/mhaod/for-healthcare-providers/clinical-guidelines-policies-and-resources"]]
  },
  "Disability": {
    what:"Disability social work uses a rights based and social model lens, recognising that people are often disabled by inaccessible environments, systems and attitudes rather than impairment alone. Practice supports autonomy, communication, participation, relationships and access to ordinary community life, while responding to risks of violence, neglect and exclusion.",
    practice:["Ask the person how they communicate, make decisions and want information presented.","Identify environmental, service and attitudinal barriers rather than locating every difficulty within the person.","Use supported decision making so the person’s will, preferences and rights remain central.","Advocate across health, housing, education, justice and disability systems when responsibilities or eligibility rules create gaps."],
    remember:["Do not assume incapacity because a person communicates differently or needs support.","Speak to the person, not only family members, carers or support workers.","Choice and control require accessible information, genuine options and freedom from coercion."],
    related:["Supported Decision Making","Disability Inclusive Practice","Advocacy","Intersectionality"],
    refs:[["NDIS, Supported decision making policy","https://www.ndis.gov.au/policies-rules-and-legal/policy/supported-decision-making-policy"],["Australian Institute of Health and Welfare, people with disability","https://www.aihw.gov.au/reports-data/health-welfare-overview/australias-welfare/people-with-disability"],["Australian Human Rights Commission, disability rights","https://humanrights.gov.au/our-work/disability-rights"]]
  },
  "Older People": {
    what:"Social work with older people may involve health changes, grief, caring relationships, housing, financial stress, isolation, elder abuse, decision making and transitions in care. Good practice avoids ageist assumptions and supports autonomy, identity, relationships, cultural connection and participation throughout later life.",
    practice:["Ask what matters to the person and how they want family or supporters involved.","Consider health, cognition, mood, grief, housing, finances, transport, caring responsibilities and social connection together.","Support decision making and advance care discussions without assuming that age or diagnosis removes capacity.","Notice possible abuse, neglect or coercion and follow appropriate safeguarding, legal and organisational pathways."],
    remember:["Ageing is diverse and should not be treated as inevitable decline.","Balance safety concerns with dignity of risk and the person’s preferences.","Carers may need support, but their needs should not replace the older person’s voice."],
    related:["Supported Decision Making","Professional Boundaries","Family and Carer Inclusive Practice","Housing & Homelessness"],
    refs:[["Queensland Health, Healthy Ageing: A strategy for older Queenslanders","https://www.health.qld.gov.au/system-governance/strategic-direction/plans/healthy-ageing"],["Australian Institute of Health and Welfare, older Australians","https://www.aihw.gov.au/reports/older-people/older-australians"],["Australian Human Rights Commission, age discrimination","https://humanrights.gov.au/our-work/age-discrimination"]]
  },
  "Justice": {
    what:"Justice social work supports people affected by criminal, civil, family or youth justice systems, including victims, accused people, prisoners, families and people returning to community. Practice considers rights, safety, accountability, trauma, stigma and the social conditions that shape contact with justice systems.",
    practice:["Explain your role, confidentiality and any statutory limits clearly.","Use respectful language and separate a person’s identity from alleged or proven offending behaviour.","Assess housing, income, health, disability, substance use, family relationships, culture and community supports that affect safety and reintegration.","Advocate for accessible processes, legal support and coordinated transitions between custody, hospital and community services."],
    remember:["Do not provide legal advice outside your role. Link the person with qualified legal assistance.","Accountability and dignity can be held together.","Aboriginal and Torres Strait Islander peoples are disproportionately affected by justice systems, requiring culturally safe and anti racist practice."],
    related:["Advocacy","Anti Oppressive Practice","Documentation","Aboriginal & Torres Strait Islander Practice"],
    refs:[["Australian Institute of Health and Welfare, justice and safety","https://www.aihw.gov.au/reports-data/behaviours-risk-factors/justice-safety"],["Queensland Government, courts and justice services","https://www.qld.gov.au/law"],["Australian Law Reform Commission, Pathways to Justice","https://www.alrc.gov.au/publication/pathways-to-justice-inquiry-into-the-incarceration-rate-of-aboriginal-and-torres-strait-islander-peoples-alrc-report-133/"]]
  },
  "Rural & Remote Practice": {
    what:"Rural and remote social work is shaped by distance, workforce availability, transport, digital access, privacy and close community relationships. Practice also draws on strong local knowledge, community connection, cultural authority and informal support networks. Effective responses must be locally informed rather than simply transferring metropolitan models.",
    practice:["Ask how distance, transport, cost, weather, internet access and service schedules affect realistic options.","Plan confidentiality carefully when workers, families and community members may know one another.","Build respectful relationships with local organisations and community leaders while maintaining professional boundaries.","Use outreach, telepractice and warm handovers thoughtfully, checking whether they are accessible, private and culturally appropriate."],
    remember:["Limited service availability does not make an unsafe or unsuitable option acceptable.","Avoid deficit descriptions of rural and remote communities.","In First Nations communities, follow local cultural guidance and prioritise community controlled services wherever possible."],
    related:["Cultural Safety","Aboriginal & Torres Strait Islander Practice","Service Systems","Housing & Homelessness"],
    refs:[["Queensland Health, Rural and Remote Health and Wellbeing Strategy 2022–2027","https://www.health.qld.gov.au/system-governance/strategic-direction/plans/rural-and-remote-health-and-wellbeing-strategy"],["Queensland Health, Office of Rural and Remote Health","https://www.health.qld.gov.au/clinical-practice/health-workforce/rural-and-remote-health-workforce/office-of-rural-and-remote-health"],["Australian Institute of Health and Welfare, rural and remote health","https://www.aihw.gov.au/reports/rural-remote-australians/rural-and-remote-health"]]
  },
  "Community Practice": {
    what:"Community practice works with groups, organisations and communities to address shared concerns, strengthen participation and build collective capacity. It shifts attention from individual problems alone to relationships, resources, power and the systems shaping local conditions.",
    practice:["Begin with listening and mapping existing strengths, leaders, networks and priorities.","Support people affected by an issue to influence decisions rather than designing solutions for them.","Use accessible meetings, shared decision making and transparent communication about resources and limits.","Evaluate both outcomes and process, including who participated, whose voice was missing and whether power was genuinely shared."],
    remember:["Community engagement is not consultation after decisions have already been made.","Move at the pace of trust and avoid overpromising.","Sustainable work builds local ownership rather than dependence on one worker or service."],
    related:["Community Engagement","Advocacy","Anti Oppressive Practice","Social Policy & Systems"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Australian Institute of Family Studies, community engagement resources","https://aifs.gov.au/resources/practice-guides"],["Queensland Government, community engagement resources","https://www.forgov.qld.gov.au/service-delivery-and-community-support/community-engagement"]]
  },
  "Social Policy & Systems": {
    what:"Social policy and systems practice examines how laws, funding, eligibility rules, organisational procedures and public narratives shape people’s lives and access to support. Social workers use practice evidence, research and lived experience to identify patterns and advocate for fairer systems.",
    practice:["Notice when the same barrier affects several people and record the pattern rather than treating each case as unrelated.","Map who makes decisions, who funds services, what eligibility rules apply and where accountability sits.","Use de identified practice examples, research and lived experience evidence to support policy feedback or advocacy.","Consider intended and unintended impacts across culture, gender, disability, class, age and location."],
    remember:["Policy is present in everyday practice, including waiting lists, forms, thresholds and service exclusions.","Avoid presenting individual resilience as a substitute for structural change.","Policy advocacy should protect confidentiality and be guided by people affected by the issue."],
    related:["Policy Analysis","Service Systems","Advocacy","Evidence Informed Practice"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Australian Government, Australian Policy Handbook resources","https://www.anao.gov.au/work/insights"]]
  },
  "Systems and Ecological Theory": {
    what:"Systems and ecological theory helps social workers understand people within connected environments rather than in isolation. Attention is given to relationships between the person, family, community, organisations, culture, economy and policy, and to how change in one part of a system can affect others.",
    practice:["Map the important people, services, institutions and social conditions influencing the situation.","Look for both supports and barriers across home, community and service systems.","Explore how communication, roles, expectations and power operate between systems.","Plan interventions at more than one level, such as individual support alongside advocacy or service coordination."],
    remember:["Avoid treating every difficulty as an individual deficit.","Systems can protect people, but they can also reproduce exclusion and inequality.","Keep the person’s own meaning and priorities central while considering the wider context."],
    related:["Social Determinants of Health","Critical Social Work","Community Practice","Service Systems"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Bronfenbrenner, The ecology of human development","https://www.hup.harvard.edu/books/9780674224575"]]
  },
  "Narrative Practice": {
    what:"Narrative practice understands that people make meaning through stories about themselves, their relationships and their experiences. It separates the person from the problem, explores how dominant social stories shape identity, and supports people to identify preferred stories that reflect their values, skills and hopes.",
    practice:["Use language that separates the person from the problem rather than defining them by it.","Ask about times when the problem had less influence and what made that possible.","Explore the person’s values, commitments, relationships and knowledge.","Notice how social expectations, stigma and power shape the stories available to the person."],
    remember:["The worker does not replace one story with a more positive story.","Stay curious and avoid claiming expert knowledge about the person’s life.","Narrative questions should remain purposeful and culturally respectful."],
    related:["Strengths Based Practice","Empowerment Theory","Anti Oppressive Practice","Person Centred Practice"],
    refs:[["White and Epston, Narrative means to therapeutic ends","https://wwnorton.com/books/9780393700985"],["Dulwich Centre, narrative practice resources","https://dulwichcentre.com.au/what-is-narrative-therapy/"]]
  },
  "Feminist Social Work": {
    what:"Feminist social work examines how gender, power and social structures shape personal experiences and access to resources. It connects private experiences with wider patterns such as violence, unpaid care, poverty, discrimination and unequal decision making, while recognising that gender intersects with culture, race, class, disability, sexuality and other identities.",
    practice:["Ask how gendered expectations, caring roles and economic inequality affect the person’s choices.","Recognise expertise gained through lived experience and support participation in decisions.","Challenge language or systems that blame people for violence, poverty or oppression.","Link individual support with advocacy where structural conditions are contributing to harm."],
    remember:["Feminist practice is not one universal perspective and must remain intersectional.","Avoid assuming that all women or gender diverse people have the same experiences.","Power within the worker relationship also requires reflection and accountability."],
    related:["Anti Oppressive Practice","Critical Social Work","Intersectionality","Domestic & Family Violence"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["Dominelli, Feminist social work theory and practice","https://link.springer.com/book/10.1007/978-0-230-62820-5"]]
  },
  "Anti Oppressive Practice": {
    what:"Anti oppressive practice examines how power, privilege and structural inequality influence people’s experiences and their interactions with services. It asks social workers to identify oppression at interpersonal, organisational and societal levels and to work in ways that increase voice, access, participation and accountability.",
    practice:["Reflect on the authority attached to your role and how it may affect communication or consent.","Identify service rules, language or assumptions that disadvantage particular groups.","Support people to participate meaningfully in decisions that affect them.","Use advocacy and organisational feedback when barriers are systemic rather than individual."],
    remember:["Good intentions do not remove power differences.","Do not speak for people when you can create space for their own voice.","Anti oppressive practice requires ongoing self reflection, not a claim of being free from bias."],
    related:["Critical Social Work","Feminist Social Work","Rights Based Practice","Intersectionality"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Dominelli, Anti oppressive social work theory and practice","https://link.springer.com/book/10.1007/978-1-4039-1400-2"]]
  },
  "Critical Social Work": {
    what:"Critical social work connects personal difficulties with the political, economic and institutional conditions shaping them. It questions explanations that locate problems only within individuals and examines how power, policy, inequality and dominant ideas influence both people’s lives and social work responses.",
    practice:["Ask what structural conditions are limiting the person’s choices or wellbeing.","Notice recurring patterns across cases, such as housing shortages or exclusionary eligibility rules.","Question whose knowledge is treated as authoritative and whose voice is overlooked.","Combine direct support with advocacy, community action or policy feedback where appropriate."],
    remember:["Critical analysis should still lead to practical and respectful action.","Avoid reducing people to examples of structural disadvantage.","Reflect on how organisations and the profession can reproduce the inequalities they seek to address."],
    related:["Anti Oppressive Practice","Social Determinants of Health","Social Policy & Systems","Advocacy"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["AASW, Social policy and advocacy","https://www.aasw.asn.au/about-aasw/social-policy-and-advocacy/"]]
  },
  "Empowerment Theory": {
    what:"Empowerment theory focuses on increasing people’s influence over decisions, resources and conditions affecting their lives. Empowerment is relational and structural as well as personal. It can involve confidence and skills, meaningful participation, access to information and resources, collective action and changes to unequal systems.",
    practice:["Share information in a way that supports informed choice and participation.","Ask what control the person wants and what support would make that possible.","Recognise and build on existing knowledge, relationships and community resources.","Support collective or advocacy responses when individual action cannot address the barrier."],
    remember:["A worker cannot give empowerment to another person.","Choice is not meaningful when options are inaccessible or unsafe.","Do not confuse compliance with participation or empowerment."],
    related:["Strengths Based Practice","Rights Based Practice","Community Practice","Advocacy"],
    refs:[["Rappaport, Terms of empowerment and exemplars of prevention","https://doi.org/10.1007/BF00919275"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Attachment Theory": {
    what:"Attachment theory describes how early experiences of care and protection can influence expectations of safety, trust, closeness and support. In social work it can offer one lens for understanding relational patterns and emotional regulation across the lifespan, but it should be considered alongside trauma, culture, development and current social conditions.",
    practice:["Create predictability by explaining your role, boundaries and what will happen next.","Notice how separation, rejection, trust or dependence may affect engagement without making assumptions.","Support safe and consistent relationships where possible.","Consider current environments and relationships rather than attributing all behaviour to childhood."],
    remember:["Attachment patterns are not fixed diagnoses or personality labels.","Avoid blaming parents, carers or individuals without considering context and resources.","Western attachment concepts should not be imposed without cultural reflection."],
    related:["Trauma Informed Practice","Relationship Based Practice","Children, Young People & Families","Family and Carer Inclusive Practice"],
    refs:[["Bowlby, Attachment and loss","https://www.basicbooks.com/titles/john-bowlby/attachment/9780465005437/"],["Ainsworth et al., Patterns of attachment","https://www.routledge.com/Patterns-of-Attachment/Ainsworth-Blehar-Waters-Wall/p/book/9780898594614"]]
  },
  "Psychosocial Development": {
    what:"Psychosocial development theories consider how identity, relationships, autonomy, purpose and belonging can change across the lifespan. Erikson’s stage model is one influential framework, but contemporary social work also recognises that development is shaped by culture, disability, trauma, opportunity and social conditions rather than following one fixed pathway.",
    practice:["Consider the person’s current life stage, transitions, roles and social expectations.","Ask how identity, connection, autonomy or purpose are being affected.","Recognise that development may be non linear and shaped by interrupted opportunities.","Support age appropriate participation without making assumptions based only on age."],
    remember:["Stage theories are guides, not universal rules.","Do not treat difference from a typical pathway as failure.","Culture and social context influence how developmental tasks are understood."],
    related:["Attachment Theory","Social Learning Theory","Children, Young People & Families","Older People"],
    refs:[["Erikson, Childhood and society","https://wwnorton.com/books/9780393310689"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Social Learning Theory": {
    what:"Social learning theory explains that people can learn behaviours, expectations and coping strategies through observation, modelling, reinforcement and beliefs about their own capability. It can help social workers consider how relationships, peers, family, media and environments shape learning and behaviour.",
    practice:["Model calm, respectful and transparent communication.","Break new skills into achievable steps and provide opportunities for practice.","Identify who or what is reinforcing a behaviour and what alternatives are available.","Build self efficacy by recognising effort, progress and successful experiences."],
    remember:["Behaviour is not explained by modelling alone.","Consider trauma, culture, disability and structural conditions alongside learning processes.","Avoid using reinforcement in ways that are controlling or disrespectful."],
    related:["Cognitive Behavioural Theory","Strengths Based Practice","Group Work Theory","Psychosocial Development"],
    refs:[["Bandura, Social learning theory","https://archive.org/details/sociallearningth0000band"],["Bandura, Self efficacy: Toward a unifying theory of behavioral change","https://doi.org/10.1037/0033-295X.84.2.191"]]
  },
  "Cognitive Behavioural Theory": {
    what:"Cognitive behavioural theory explores relationships between thoughts, emotions, physical responses and behaviour. In social work it can support collaborative understanding of patterns and coping strategies, while remaining attentive to trauma, relationships and social conditions that cannot be changed through individual thinking alone.",
    practice:["Help the person notice links between situations, interpretations, feelings and actions.","Explore whether a thought is helpful, accurate or shaped by past experiences.","Identify practical coping strategies and small behavioural experiments chosen by the person.","Review what changed and what the person learned rather than presenting the worker’s interpretation as fact."],
    remember:["Do not imply that distress is simply caused by incorrect thinking.","Use cognitive behavioural strategies only within your competence and role.","Structural barriers such as poverty, violence and discrimination require structural responses."],
    related:["Social Learning Theory","Trauma Informed Practice","Strengths Based Practice","Motivational Interviewing"],
    refs:[["Beck, Cognitive therapy and the emotional disorders","https://www.penguinrandomhouse.com/books/12639/cognitive-therapy-and-the-emotional-disorders-by-aaron-t-beck-md/"],["National Institute for Health and Care Excellence, mental health guidance","https://www.nice.org.uk/guidance/conditions-and-diseases/mental-health-behavioural-and-neurodevelopmental-conditions"]]
  },
  "Social Determinants of Health": {
    what:"The social determinants of health are the conditions in which people are born, grow, live, work and age, together with the distribution of power, money and resources. Housing, income, education, employment, discrimination, transport, culture and access to services can strongly shape mental and physical health and produce avoidable inequities.",
    practice:["Include housing, income, safety, food, transport, discrimination and social connection in assessment.","Identify which conditions can be addressed through practical support, referral or advocacy.","Document patterns showing how service or policy barriers affect wellbeing.","Avoid framing structural disadvantage as poor motivation or individual failure."],
    remember:["Health inequities are not explained only by personal choices.","Social determinants interact and can accumulate over time.","Direct support and structural advocacy are both legitimate social work responses."],
    related:["Systems and Ecological Theory","Critical Social Work","Housing & Homelessness","Social Policy & Systems"],
    refs:[["World Health Organization, Social determinants of health","https://www.who.int/health-topics/social-determinants-of-health"],["Australian Institute of Health and Welfare, determinants of health","https://www.aihw.gov.au/reports/australias-health/social-determinants-of-health"]]
  },
  "Rights Based Practice": {
    what:"Rights based practice understands people as rights holders and services and governments as having responsibilities to respect, protect and fulfil those rights. It centres dignity, equality, participation, privacy, access, accountability and freedom from discrimination in everyday assessment and decision making.",
    practice:["Explain options, limits and decisions in accessible language.","Support genuine participation and supported decision making.","Identify which rights are engaged when services restrict choice or access.","Document the rationale, proportionality and least restrictive options for decisions affecting rights."],
    remember:["Rights can involve competing considerations and require transparent reasoning.","Legal compliance is a minimum, not the whole of ethical practice.","People should have accessible ways to question decisions and make complaints."],
    related:["Human Rights Act 2019 (Qld)","Supported Decision Making","Anti Oppressive Practice","Advocacy"],
    refs:[["Queensland Human Rights Commission, Human Rights Act 2019","https://www.qhrc.qld.gov.au/your-rights/human-rights-law"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Ethics of Care": {
    what:"Ethics of care emphasises relationships, interdependence, context and responsibility when considering ethical action. It challenges approaches that rely only on abstract rules by asking how decisions affect particular people, relationships and care responsibilities, while still recognising rights, justice and professional accountability.",
    practice:["Consider who depends on whom and how a decision may affect important relationships.","Listen for responsibilities, vulnerability and care work that may be overlooked.","Balance responsiveness and compassion with boundaries, consent and fairness.","Use supervision to examine whether care is becoming paternalistic, unequal or unsustainable."],
    remember:["Caring intentions do not justify overriding autonomy.","Care work is often gendered and unequally distributed.","Ethics of care should complement, not replace, rights and justice."],
    related:["AASW Code of Ethics","Professional Boundaries","Feminist Social Work","Family and Carer Inclusive Practice"],
    refs:[["Gilligan, In a different voice","https://www.hup.harvard.edu/books/9780674970960"],["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"]]
  },
  "Engagement & Rapport": {
    what:"Engagement is the process of creating enough safety, trust and clarity for purposeful work to begin. Rapport is not simply being friendly. It involves respect, transparency, reliable follow through, appropriate use of self and attention to power, culture, communication and previous experiences with services.",
    practice:["Explain your role, the purpose of contact and any limits to privacy in plain language.", "Use the person’s preferred name, communication style and pace.", "Listen for what matters to the person before moving quickly into service questions.", "Build trust through consistency, honesty and completing agreed follow up."],
    remember:["Trust may take time, especially where services have previously caused harm.", "Warmth and professional boundaries can exist together.", "Engagement is ongoing and may need repair after misunderstanding or conflict."],
    related:["Active Listening", "Trauma Informed Communication", "Professional Boundaries", "Cultural Humility"],
    refs:[["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"], ["AASW Code of Ethics 2020", "https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"]]
  },
  "Active Listening": {
    what:"Active listening is deliberate attention to the person’s words, emotions, meaning and communication cues. It uses reflection, clarification, summarising, silence and checking understanding so the person feels heard and the worker does not rely on assumptions.",
    practice:["Use open questions, reflections and brief summaries rather than a rapid series of closed questions.", "Check your understanding instead of interpreting too quickly.", "Allow silence when it supports thinking or emotion.", "Notice differences between words, tone and body language while avoiding over interpretation."],
    remember:["Listening is shaped by culture, language, disability and communication preference.", "Reflection should sound natural rather than formulaic.", "Good listening does not require agreement with every statement."],
    related:["Engagement & Rapport", "Difficult Conversations", "Working with Interpreters", "Motivational Interviewing"],
    refs:[["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"], ["Miller and Rollnick, Motivational interviewing", "https://www.guilford.com/books/Motivational-Interviewing/Miller-Rollnick/9781462552795"]]
  },
  "Solution Focused Practice": {
    what:"Solution focused practice is a brief, collaborative approach that explores the person’s preferred future, existing strengths, exceptions to problems and small achievable steps. It does not deny hardship or structural barriers. It helps identify what is already working and what change would be meaningful to the person.",
    practice:["Ask what the person hopes will be different and how they would notice change.", "Explore times the problem was less intense or managed differently.", "Use scaling questions to clarify confidence, urgency or progress.", "Agree on one realistic next step chosen by the person."],
    remember:["Do not use optimism to minimise trauma, risk or injustice.", "The person defines the preferred outcome.", "Small progress can be meaningful without implying the person caused the problem."],
    related:["Strengths Based Practice", "Goal Setting", "Task Centred Practice", "Empowerment Theory"],
    refs:[["De Shazer et al., More than miracles", "https://www.routledge.com/More-Than-Miracles-The-State-of-the-Art-of-Solution-Focused-Brief-Therapy/de-Shazer-Dolan/p/book/9780789033987"], ["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Task Centred Practice": {
    what:"Task centred practice is a structured, time limited approach that turns an agreed priority into manageable tasks. The worker and person define the concern together, agree on goals, decide practical actions and review what helped or got in the way.",
    practice:["Identify one priority that is specific enough to act on.", "Break the goal into small tasks with clear responsibilities and timeframes.", "Review barriers, resources and progress at each contact.", "Adapt or stop tasks that are not useful to the person."],
    remember:["Tasks should be negotiated, not imposed.", "Structural barriers may require advocacy rather than more tasks for the person.", "Completion is less important than learning what is workable."],
    related:["Goal Setting", "Solution Focused Practice", "Case Management", "Advocacy"],
    refs:[["Reid and Epstein, Task centered casework", "https://cup.columbia.edu/book/task-centered-casework/9780231040723"], ["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Assessment": {
    what:"Social work assessment is a collaborative process of understanding the person’s situation, strengths, needs, relationships, culture, environment, risks, rights and goals. It brings together the person’s account, observation, records, professional knowledge and relevant evidence to guide proportionate action.",
    practice:["Clarify the purpose of assessment and how information will be used.", "Explore strengths, supports and goals alongside concerns and risk.", "Consider housing, income, family, culture, health, trauma, discrimination and service access.", "Record uncertainty, differing accounts and the rationale for conclusions."],
    remember:["Assessment is ongoing rather than a one off form.", "The person’s perspective should remain visible in the assessment.", "Avoid turning diagnosis, risk or organisational categories into the whole story."],
    related:["Biopsychosocial Assessment", "Risk & Safety Planning", "Assessment Writing", "Systems and Ecological Theory"],
    refs:[["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"], ["AASW Code of Ethics 2020", "https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"]]
  },
  "Advocacy": {
    what:"Advocacy supports people to understand and exercise rights, access resources, challenge unfair decisions and influence systems. It may involve self advocacy support, direct representation, negotiation, complaint processes, interagency work, community action or policy change.",
    practice:["Ask what outcome the person wants and what role they want you to take.", "Explain options, review rights and gather relevant evidence.", "Communicate the issue clearly and follow up agreed actions.", "Identify whether the barrier is individual, organisational or systemic."],
    remember:["Advocacy should increase the person’s voice rather than replace it.", "Consent and confidentiality still apply during interagency advocacy.", "Document the requested outcome, actions and response."],
    related:["Rights Based Practice", "Anti Oppressive Practice", "Case Management", "Policy Analysis"],
    refs:[["AASW Code of Ethics 2020", "https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"], ["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Case Management": {
    what:"Case management coordinates assessment, planning, referrals, services, review and advocacy around the person’s goals. Social work case management should remain relational and person led rather than becoming administrative coordination between organisations.",
    practice:["Develop one shared plan that identifies goals, responsibilities and review points.", "Support informed choice about referrals and information sharing.", "Follow up whether services were accessible and useful, not only whether a referral was sent.", "Prepare transitions and warm handovers rather than ending support abruptly."],
    remember:["Coordination should reduce burden on the person, not create more appointments and repetition.", "Eligibility rules and service gaps are practice issues requiring advocacy.", "Keep the person informed about interagency communication."],
    related:["Assessment", "Advocacy", "Discharge & Transition Planning", "Documentation"],
    refs:[["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"], ["Australian Government, National Standards for Mental Health Services", "https://www.health.gov.au/resources/publications/national-standards-for-mental-health-services-2010"]]
  },
  "Group Facilitation": {
    what:"Group facilitation supports a group to work safely and purposefully through clear structure, participation, boundaries and responsiveness to group dynamics. The facilitator holds the process while recognising that members bring knowledge, strengths and mutual support.",
    practice:["Explain the group purpose, expectations, confidentiality and limits at the beginning.", "Use accessible activities and invite participation without forcing disclosure.", "Notice who is speaking, who is excluded and how power is operating.", "Respond to conflict, distress or risk while maintaining the dignity of members."],
    remember:["Facilitation is different from delivering information to a passive audience.", "Group safety requires planning, co facilitation and clear escalation pathways.", "Debrief and evaluate the session rather than relying only on attendance."],
    related:["Group Work Theory", "Trauma Informed Communication", "Cultural Safety", "Professional Boundaries"],
    refs:[["Toseland and Rivas, An introduction to group work practice", "https://www.pearson.com/en-us/subject-catalog/p/introduction-to-group-work-practice-an/P200000001499"], ["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Group Work Theory": {
    what:"Group work theory explains how purpose, roles, norms, belonging, power, conflict, cohesion and mutual aid shape group development. Understanding these processes helps facilitators respond to what is happening between members, not only complete planned activities.",
    practice:["Observe stages of forming, uncertainty, conflict, cohesion and ending without treating them as rigid steps.", "Support constructive norms and shared ownership of the group.", "Use mutual aid by helping members recognise and respond to each other’s knowledge.", "Plan endings and transitions so members are not left without closure."],
    remember:["Silence, conflict and uneven participation contain useful information about the group.", "Culture and power shape who feels able to speak.", "The facilitator is part of the group system and should reflect on their own impact."],
    related:["Group Facilitation", "Use of Self", "Systems and Ecological Theory", "Reflective Practice"],
    refs:[["Toseland and Rivas, An introduction to group work practice", "https://www.pearson.com/en-us/subject-catalog/p/introduction-to-group-work-practice-an/P200000001499"], ["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Difficult Conversations": {
    what:"Difficult conversations involve information, disagreement, boundaries, risk, accountability or decisions that may cause distress. Skilled practice combines honesty, emotional regulation, respect, clarity and willingness to hear the person’s response.",
    practice:["Prepare the key message, purpose and limits before the conversation.", "State concerns clearly using specific information rather than labels.", "Acknowledge emotion and invite the person’s perspective.", "Summarise decisions, options, rights and next steps."],
    remember:["Avoid delaying necessary information because it feels uncomfortable.", "Calm communication does not mean becoming vague or minimising impact.", "Use supervision when power, safety or ethical conflict is significant."],
    related:["Active Listening", "De escalation", "Professional Boundaries", "Ethical Decision Making"],
    refs:[["AASW Code of Ethics 2020", "https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"], ["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Trauma Informed Communication": {
    what:"Trauma informed communication recognises that past and current trauma can affect trust, memory, attention, emotion, safety and responses to authority. It aims to reduce avoidable distress through predictability, transparency, choice, collaboration and respectful pacing.",
    practice:["Explain what will happen, why questions are being asked and what choices are available.", "Ask permission before sensitive questions and check whether a pause is needed.", "Use calm, non blaming language and avoid demanding detailed disclosure that is not necessary.", "Support grounding, privacy and control over the environment where possible."],
    remember:["Trauma informed practice does not require knowing a person’s trauma history.", "Distress or avoidance may be protective responses rather than non compliance.", "Safety includes emotional, cultural and relational safety as well as physical safety."],
    related:["Trauma Informed Practice", "Engagement & Rapport", "De escalation", "Cultural Safety"],
    refs:[["Blue Knot Foundation, trauma informed practice resources", "https://blueknot.org.au/resources/blue-knot-resources/"], ["Australian Government, National framework for recovery oriented mental health services", "https://www.health.gov.au/resources/publications/a-national-framework-for-recovery-oriented-mental-health-services-guide-for-practitioners-and-providers"]]
  },
  "De escalation": {
    what:"De escalation uses communication, environment and relational strategies to reduce distress or agitation while maintaining safety, dignity and rights. It is not about winning an argument or securing compliance. It aims to understand immediate needs, lower stimulation and create workable choices.",
    practice:["Use a calm tone, adequate personal space and simple language.", "Reduce noise, audience and demands where safe to do so.", "Acknowledge the person’s concern and offer realistic choices.", "Seek assistance early and follow organisational safety procedures when risk is increasing."],
    remember:["Avoid crowding, threats, rapid questioning and unnecessary power struggles.", "De escalation should be trauma informed and least restrictive.", "Personal safety and team communication remain essential."],
    related:["Crisis Intervention", "Trauma Informed Communication", "Risk & Safety Planning", "Difficult Conversations"],
    refs:[["Queensland Health, Seclusion and restraint", "https://www.health.qld.gov.au/public-health/topics/mental-health-alcohol-and-other-drugs/for-healthcare-providers/treating-patients-under-the-mental-health-act/seclusion-and-restraint"], ["Queensland Health, Better Crisis Care", "https://www.health.qld.gov.au/public-health/topics/mhaod/what-we-do-at-queensland-health/strategic-plans-and-priorities/better-crisis-care"]]
  },
  "Crisis Intervention": {
    what:"Crisis intervention is short term support during acute distress or disruption when usual coping has been overwhelmed. It focuses on immediate safety, stabilisation, practical needs, connection with supports and a clear plan for the next period rather than resolving every underlying issue.",
    practice:["Identify immediate safety concerns, urgent health needs and protective supports.", "Reduce demands and help the person prioritise the next few hours or days.", "Use grounding, practical assistance and clear information about options.", "Arrange warm referral, follow up and escalation within role and organisational procedures."],
    remember:["Crisis does not automatically remove decision making rights.", "Avoid making long term decisions for the person during peak distress where this can safely wait.", "Document risk, consultation, actions and follow up clearly."],
    related:["De escalation", "Risk & Safety Planning", "Safety Planning", "Case Management"],
    refs:[["Queensland Health, Better Crisis Care", "https://www.health.qld.gov.au/public-health/topics/mhaod/what-we-do-at-queensland-health/strategic-plans-and-priorities/better-crisis-care"], ["Australian Government, National framework for recovery oriented mental health services", "https://www.health.gov.au/resources/publications/a-national-framework-for-recovery-oriented-mental-health-services-guide-for-practitioners-and-providers"]]
  },
  "Harm Reduction": {
    what:"Harm reduction is a pragmatic, rights based approach that aims to reduce negative health and social consequences without requiring abstinence or perfection as a condition of support. It respects autonomy and recognises that people make decisions within complex social, economic and health contexts.",
    practice:["Ask what harms concern the person and what change feels realistic now.", "Provide accurate information about safer options without judgement.", "Support access to health care, overdose prevention, sterile equipment, housing and other practical supports where relevant.", "Continue engagement when goals differ from worker or service preferences."],
    remember:["Harm reduction can sit alongside abstinence goals when chosen by the person.", "Moralising language increases stigma and can reduce help seeking.", "Withdrawal and medication questions may require specialist medical advice."],
    related:["Alcohol & Other Drugs", "Motivational Interviewing", "Rights Based Practice", "Trauma Informed Practice"],
    refs:[["Australian Government Department of Health, National Drug Strategy", "https://www.health.gov.au/resources/publications/national-drug-strategy-2017-2026"], ["Alcohol and Drug Foundation, harm reduction", "https://adf.org.au/reducing-risk/harm-reduction/"]]
  },
  "Psychosocial Rehabilitation": {
    what:"Psychosocial rehabilitation supports people experiencing mental health challenges to develop or regain skills, relationships, environments and valued roles needed for community life. It focuses on participation, hope and practical recovery rather than treating the person as a passive recipient of care.",
    practice:["Work toward goals involving housing, daily living, relationships, education, employment and community participation.", "Break skill development into manageable practice in real settings.", "Identify environmental barriers and reasonable supports rather than locating all difficulty within the person.", "Coordinate clinical and community supports around the person’s recovery goals."],
    remember:["Rehabilitation should not become pressure to appear normal or independent.", "Meaningful roles and belonging matter alongside symptom support.", "Progress should be defined with the person and reviewed over time."],
    related:["Recovery Oriented Practice", "Strengths Based Practice", "Social Determinants of Health", "Case Management"],
    refs:[["Australian Government, Commonwealth Psychosocial Support Program Guidance", "https://www.health.gov.au/resources/publications/commonwealth-psychosocial-support-program-guidance"], ["Australian Government, National framework for recovery oriented mental health services", "https://www.health.gov.au/resources/publications/a-national-framework-for-recovery-oriented-mental-health-services-guide-for-practitioners-and-providers"]]
  },
  "Strengths Based Language": {
    what:"Strengths based language describes people in ways that recognise dignity, capability, context and possibility. It avoids defining a person by diagnosis, behaviour, risk, service status or deficit while still recording concerns accurately.",
    practice:["Describe specific behaviour or circumstances instead of using broad labels.", "Include the person’s efforts, knowledge, protective actions and goals.", "Use person preferred terms and reflect their own account.", "Explain barriers and context rather than implying personal failure."],
    remember:["Strengths language must remain accurate and should not minimise harm or risk.", "Words influence how future workers understand and respond to the person.", "Avoid labels such as manipulative, attention seeking or non compliant without specific evidence and context."],
    related:["Documentation", "Strengths Based Practice", "Person Centred Practice", "Anti Oppressive Practice"],
    refs:[["AASW Code of Ethics 2020", "https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"], ["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Working with Interpreters": {
    what:"Working with interpreters supports equitable communication when a person prefers or requires a language other than English. A qualified interpreter improves accuracy, confidentiality and participation and should be considered part of safe professional practice rather than an optional extra.",
    practice:["Book an accredited interpreter in the correct language and dialect where possible.", "Brief the interpreter about purpose, sensitive content and terminology before the session.", "Speak directly to the person in short, clear segments and allow time for interpretation.", "Debrief practical issues after the session without excluding the person from substantive discussion."],
    remember:["Do not rely on children, alleged perpetrators or family members for sensitive or high stakes communication.", "Allow additional time and check understanding rather than asking only whether the person understands.", "Record interpreter details and any limitations affecting communication."],
    related:["Culturally Responsive Practice", "Informed Consent", "Cultural Safety", "Active Listening"],
    refs:[["TIS National, Working with TIS National interpreters", "https://www.tisnational.gov.au/en/Agencies/Help-using-TIS-National-services/Working-with-TIS-National-interpreters"], ["Australian Institute of Interpreters and Translators, AUSIT Code of Ethics", "https://ausit.org/AUSIT/About/Ethics___Conduct/Code_of_Ethics/AUSIT/About/Code_of_Ethics.aspx"]]
  },
  "Email & Phone Communication": {
    what:"Professional email and phone communication should be clear, purposeful, respectful and proportionate to privacy and risk. These contacts create records and may be forwarded, accessed or misunderstood, so workers should consider content, consent, urgency and organisational requirements.",
    practice:["State the purpose of contact and the action required early.", "Confirm identity before sharing personal information by phone.", "Use secure channels and include only information necessary for the purpose.", "Document significant phone advice, decisions and follow up in the appropriate record."],
    remember:["Email is not suitable for every urgent, sensitive or complex issue.", "Check recipients and attachments before sending.", "Avoid informal shorthand that could be unclear or disrespectful in a professional record."],
    related:["Confidentiality", "Documentation", "Professional Boundaries", "Privacy & Confidentiality"],
    refs:[["AASW Ethics and Practice Guidelines", "https://www.aasw.asn.au/about-aasw/ethics-standards/ethics-and-practice-guidelines/"], ["Office of the Australian Information Commissioner, Australian Privacy Principles", "https://www.oaic.gov.au/privacy/australian-privacy-principles"]]
  },
  "Case Notes": {
    what:"Case notes are timely records of professional contact, relevant information, assessment, decisions, actions and follow up. They support continuity and accountability and may be read by the person, colleagues, courts, oversight bodies or other authorised parties.",
    practice:["Record date, participants, purpose, relevant information, the person’s views, observations, actions and next steps.", "Distinguish what was observed, what was reported and what is professional interpretation.", "Use concise, respectful language and explain the rationale for significant decisions.", "Correct errors according to policy rather than silently deleting or rewriting records."],
    remember:["Include enough context to make the note meaningful without recording unnecessary personal detail.", "Avoid copying outdated information forward without checking it.", "Complete notes as soon as practicable after contact."],
    related:["Documentation", "Assessment Writing", "Confidentiality", "Strengths Based Language"],
    refs:[["AASW Code of Ethics 2020", "https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"], ["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Assessment Writing": {
    what:"Assessment writing brings information and analysis together to explain the person’s circumstances, strengths, needs, risks, goals and context. It should show how conclusions were reached rather than presenting professional opinion as unquestionable fact.",
    practice:["Use a clear structure linked to the purpose and decision being made.", "Keep the person’s views and goals visible throughout.", "Connect evidence, context and theory to analysis rather than listing facts.", "State limitations, uncertainty, conflicting information and what further information is needed."],
    remember:["Description tells what happened; analysis explains meaning, patterns and implications.", "Avoid overstating certainty or predicting behaviour without evidence.", "Recommendations should follow logically from the assessment and be proportionate."],
    related:["Assessment", "Reports", "Critical Appraisal", "Documentation"],
    refs:[["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"], ["AASW Code of Ethics 2020", "https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"]]
  },
  "Reports": {
    what:"A social work report communicates relevant information, analysis and recommendations to a particular audience for a defined purpose. Reports should be evidence informed, transparent, respectful and clear about the worker’s role, sources and limits of knowledge.",
    practice:["Clarify the question, audience, authority and required format before writing.", "Organise content around relevant headings and avoid unrelated history.", "Attribute information to its source and distinguish fact, report, observation and opinion.", "Proofread for accuracy, tone, privacy and whether recommendations are supported."],
    remember:["A longer report is not necessarily a stronger report.", "Use accessible language unless technical terms are required and explained.", "Consider how power and bias may shape what is included, believed or omitted."],
    related:["Assessment Writing", "Documentation", "Evidence Informed Practice", "Ethical Decision Making"],
    refs:[["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"], ["AASW Code of Ethics 2020", "https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"]]
  },
  "Evidence Informed Practice": {
    what:"Evidence informed practice brings together the best available research, professional judgement, practice context and the person’s lived experience, values and preferences. It is not the mechanical application of research findings or reliance on one hierarchy of evidence for every question.",
    practice:["Formulate a clear practice question before searching for evidence.", "Use relevant peer reviewed research and authoritative Australian guidance.", "Consider whether findings apply to the person, culture, setting and available resources.", "Discuss options and uncertainty rather than presenting evidence as a single correct answer."],
    remember:["Absence of research evidence is not proof that an approach is ineffective.", "Lived experience and cultural knowledge are forms of evidence that require genuine inclusion.", "Document how evidence informed a significant recommendation or project decision."],
    related:["Finding Quality Sources", "Critical Appraisal", "Small Project Skills", "AASW Practice Standards"],
    refs:[["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"], ["NHMRC, Guidelines for Guidelines", "https://www.nhmrc.gov.au/guidelinesforguidelines"]]
  },
  "Finding Quality Sources": {
    what:"Finding quality sources involves matching the source to the question and checking authority, method, recency, relevance and transparency. Peer reviewed research is important, but legislation, government datasets, professional standards and credible lived experience evidence may be more appropriate for some practice questions.",
    practice:["Search databases using key concepts, synonyms and Boolean terms.", "Prioritise original research, systematic reviews and authoritative Australian sources where relevant.", "Check publication date, study setting, sample and whether the source directly answers the question.", "Use citation chaining and reference lists to locate foundational or related evidence."],
    remember:["A polished website is not evidence of quality.", "News articles and advocacy material may provide context but should not replace original sources for factual claims.", "Keep a record of search terms and sources for substantial projects."],
    related:["Critical Appraisal", "Evidence Informed Practice", "APA 7 Referencing", "Small Project Skills"],
    refs:[["James Cook University Library, searching for information", "https://www.jcu.edu.au/library"], ["NHMRC, Guidelines for Guidelines", "https://www.nhmrc.gov.au/guidelinesforguidelines"]]
  },
  "Critical Appraisal": {
    what:"Critical appraisal is the structured examination of a source’s credibility, methods, findings, limitations and relevance. It asks not only what the source concludes, but how the knowledge was produced, whose perspectives are represented and whether it applies to the practice context.",
    practice:["Identify the research question, design, sample, data collection and analysis.", "Assess risk of bias, ethical issues and whether conclusions match the findings.", "Consider transferability to Australian, Queensland, regional or culturally diverse contexts.", "Compare findings with other evidence rather than relying on one study."],
    remember:["Peer review does not guarantee that a study is strong or relevant.", "Small qualitative studies can provide valuable depth even when they are not statistically generalisable.", "Appraisal should consider power, exclusion and whose knowledge is treated as authoritative."],
    related:["Evidence Informed Practice", "Finding Quality Sources", "Research & Evidence", "Small Project Skills"],
    refs:[["Joanna Briggs Institute, critical appraisal tools", "https://jbi.global/critical-appraisal-tools"], ["CASP, critical appraisal checklists", "https://casp-uk.net/casp-tools-checklists/"]]
  },
  "Small Project Skills": {
    what:"A small placement project uses a manageable process to understand a practice issue and produce a useful output. It should have a clear purpose, realistic scope, stakeholder involvement, ethical handling of information and a plan for how the output will be used or reviewed.",
    practice:["Define the problem, intended users, project question and boundaries.", "Consult relevant people early rather than designing the solution alone.", "Gather proportionate evidence through literature, existing data, feedback or observation.", "Create, test and revise the output, then document limitations and recommendations."],
    remember:["A useful small project is better than an ambitious unfinished one.", "Do not collect client data or conduct research without the required approval and supervision.", "Plan accessibility, cultural relevance and ownership of the final resource."],
    related:["Evidence Informed Practice", "Critical Appraisal", "Community Practice", "Ethical Decision Making"],
    refs:[["AASW Practice Standards 2023", "https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"], ["Australian Government, National Mental Health and Suicide Prevention Evaluation Framework", "https://www.health.gov.au/resources/publications/national-mental-health-and-suicide-prevention-evaluation-framework"]]
  },
  "APA 7 Referencing": {
    what:"APA 7 referencing identifies the sources used in academic and professional writing so readers can locate them and distinguish the writer’s ideas from the work of others. It requires consistent in text citations and a matching reference list.",
    practice:["Cite paraphrased ideas, data, definitions and direct quotations at the point they are used.", "Include author and year in text and full publication details in the reference list.", "Use page or paragraph numbers for direct quotations and keep quotations brief.", "Check that every in text citation has a reference entry and every reference is cited in the work."],
    remember:["A DOI should usually be presented as a URL.", "Reference software can assist but still requires checking.", "Follow the university’s APA 7 guidance where examples differ or unusual sources arise."],
    related:["Finding Quality Sources", "Evidence Informed Practice", "Reports", "Small Project Skills"],
    refs:[["APA Style, reference examples", "https://apastyle.apa.org/style-grammar-guidelines/references/examples"], ["James Cook University Library, APA referencing", "https://www.jcu.edu.au/library"]]
  },
  "Documentation": {
    what:"Social work documentation creates an accountable record of contact, assessment, decisions, actions and follow up. Good records support continuity, communication, safety and the person’s rights. They should be relevant, timely, respectful, accurate and clear about the source of information and the worker’s professional judgement.",
    practice:["Record the purpose of contact, relevant facts, the person’s views, strengths, risks, actions and next steps.","Separate direct observations, reported information and professional interpretation.","Use objective, person respecting language and avoid unnecessary detail.","Complete records promptly and follow correction, access and security procedures."],
    remember:["Write as though the person may read the record.","Do not copy forward outdated assumptions or use stigmatising labels.","Document consultation and the rationale for significant decisions."],
    related:["Case Notes","Confidentiality","Risk & Safety Planning","AASW Practice Standards"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  }
};


Object.assign(stage1ToolkitContent, {
  "Aboriginal & Torres Strait Islander Practice": {
    what:"Social work with Aboriginal and Torres Strait Islander peoples must recognise continuing cultures, connections to Country, kinship, community authority and the right to self determination. Culturally responsive practice requires more than learning cultural facts. It involves examining power, racism, colonisation, institutional practices and the worker’s own positioning while being guided by local people and community controlled organisations.",
    practice:["Ask how the person identifies and what family, community, cultural or Country connections matter to them.","Seek guidance from Aboriginal and Torres Strait Islander workers, Elders or community controlled services where appropriate and with consent.","Allow time for relationship building and explain the worker’s role, authority and limits clearly.","Recognise strengths, cultural knowledge and collective supports rather than focusing only on individual needs."],
    remember:["Aboriginal and Torres Strait Islander peoples are diverse and local knowledge matters.","Self determination means supporting Aboriginal and Torres Strait Islander peoples to lead decisions that affect their lives.","Cultural safety is judged by the person and community receiving the service, not by the worker’s intention."],
    related:["Cultural Safety","Cultural Humility","Decolonising Practice","Anti Racist Practice"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["AIATSIS, Core cultural learning","https://aiatsis.gov.au/about/what-we-do/core-cultural-learning"],["AIATSIS, Code of Ethics for Aboriginal and Torres Strait Islander Research","https://aiatsis.gov.au/research/ethical-research/code-ethics"]]
  },
  "Cultural Humility": {
    what:"Cultural humility is an ongoing practice of self reflection, learning and accountability. It recognises that workers cannot become experts in another person’s culture and must remain open to correction, examine their assumptions and share power in the helping relationship.",
    practice:["Ask the person how culture, identity, family, faith, language or community shape what matters to them.","Notice when professional language or service routines are being treated as more valid than the person’s knowledge.","Acknowledge uncertainty and ask respectful questions rather than making assumptions.","Use supervision to examine bias, discomfort, privilege and the impact of the worker’s own cultural position."],
    remember:["Humility is not a lack of knowledge. It combines learning with openness and accountability.","One person cannot speak for an entire cultural group.","Being respectful requires changing practice when feedback shows that an approach is not safe or useful."],
    related:["Culturally Responsive Practice","Cultural Safety","Intersectionality","Reflective Practice"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["AIATSIS, Core cultural learning","https://aiatsis.gov.au/about/what-we-do/core-cultural-learning"],["Yumi Sabe, Cultural responsiveness in social work practice","https://yumi-sabe.aiatsis.gov.au/project/1706"]]
  },
  "Culturally Responsive Practice": {
    what:"Culturally responsive practice adapts communication, assessment, planning and service delivery to the person’s culture, identity, language, relationships and context. It requires active partnership and organisational change rather than expecting people to fit standard service processes.",
    practice:["Ask about preferred communication, decision making, family involvement and cultural supports.","Adapt appointment format, pace, location and written information where possible.","Use qualified interpreters and accessible information when language or communication barriers exist.","Check whether service expectations conflict with cultural responsibilities, transport, finances or community obligations."],
    remember:["Responsiveness is individual and contextual, not a checklist about cultural groups.","Culture can be a source of identity, strength and support as well as a context for different expectations.","Organisations share responsibility for accessibility, representation and culturally responsive policies."],
    related:["Cultural Humility","Cultural Safety","CALD Practice","Working with Interpreters"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Australian Government Department of Health, culturally and linguistically diverse backgrounds","https://www.health.gov.au/our-work/ncsp-healthcare-provider-toolkit/working-with-patients/culturally-and-linguistically-diverse-backgrounds"],["AIATSIS Yumi Sabe, cultural responsiveness tools","https://yumi-sabe.aiatsis.gov.au/project/1706"]]
  },
  "Cultural Safety": {
    what:"Cultural safety describes practice and environments where people experience respect for their identity, knowledge, rights and difference and are not exposed to racism, discrimination or pressure to minimise who they are. Safety is determined by the person receiving the service, not by the worker’s confidence or good intentions.",
    practice:["Ask what would help the person feel respected and safe in the service.","Explain how information will be used and provide real choices wherever possible.","Respond directly to racist, discriminatory or culturally unsafe behaviour rather than leaving the person to manage it alone.","Review forms, environments and routines for assumptions that may exclude people."],
    remember:["Cultural safety requires attention to power and institutional practice.","A worker can intend to be respectful and still create an unsafe experience.","Feedback, complaints and community leadership are important sources of accountability."],
    related:["Aboriginal & Torres Strait Islander Practice","Anti Racist Practice","Cultural Humility","Trauma Informed Practice"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["AIATSIS, Core cultural learning","https://aiatsis.gov.au/about/what-we-do/core-cultural-learning"],["Australian Government Department of Health, culturally safe practice","https://www.health.gov.au/resources/videos/auslan-culturally-safe-practice-fact-sheet"]]
  },
  "Decolonising Practice": {
    what:"Decolonising practice questions how colonial histories, institutions and professional knowledge continue to shape services, assessment and decision making. It seeks to centre Indigenous sovereignty, knowledge, leadership and self determination rather than treating Western professional approaches as neutral or universal.",
    practice:["Examine whose knowledge is treated as authoritative in assessment and planning.","Seek local Aboriginal and Torres Strait Islander guidance rather than relying only on generic cultural training.","Support community controlled services and Indigenous leadership in decisions affecting Aboriginal and Torres Strait Islander peoples.","Challenge practices that individualise harms created by colonisation, racism and dispossession."],
    remember:["Decolonising practice is an ongoing institutional and professional responsibility.","It is not achieved by adding cultural symbols to unchanged systems.","Non Indigenous workers should avoid claiming authority over Indigenous knowledge and remain accountable to community leadership."],
    related:["Aboriginal & Torres Strait Islander Practice","Critical Social Work","Anti Oppressive Practice","Anti Racist Practice"],
    refs:[["AIATSIS, Core cultural learning","https://aiatsis.gov.au/about/what-we-do/core-cultural-learning"],["AIATSIS, research ethics framework","https://aiatsis.gov.au/research/ethical-research/research-ethics-framework"],["AASW Reconciliation Action Plan","https://www.aasw.asn.au/about-aasw/reconciliation-action-plan/"]]
  },
  "CALD Practice": {
    what:"Practice with culturally and linguistically diverse communities considers language, migration experiences, family and community relationships, faith, racism, settlement conditions and access to services. The term CALD is broad and should not replace the person’s own description of identity or experience.",
    practice:["Ask the person’s preferred language and whether they want a qualified interpreter.","Explore migration, settlement, family and community context only where relevant and with sensitivity.","Provide information in accessible formats and check understanding using teach back rather than yes or no questions.","Consider how visa status, finances, transport, digital access and discrimination may affect service options."],
    remember:["Do not assume English fluency means that complex service information is fully understood.","Avoid using family members or children as interpreters for sensitive or high stakes conversations.","Culture does not explain every behaviour or difficulty and should not obscure structural barriers."],
    related:["Working with Interpreters","Culturally Responsive Practice","Refugee & Asylum Seeker Practice","Intersectionality"],
    refs:[["Australian Government Department of Health, culturally and linguistically diverse backgrounds","https://www.health.gov.au/our-work/ncsp-healthcare-provider-toolkit/working-with-patients/culturally-and-linguistically-diverse-backgrounds"],["Australian Government Department of Health, interpreting services for mental health services","https://www.health.gov.au/our-work/interpreting-services-for-primary-health-network-commissioned-mental-health-services"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Refugee & Asylum Seeker Practice": {
    what:"Practice with refugees and people seeking asylum may involve experiences of displacement, persecution, loss, disrupted family relationships, uncertain legal status and settlement barriers. Workers should not assume trauma or require disclosure. Practice should support rights, safety, stability, participation and connection while recognising the effects of policy and visa conditions.",
    practice:["Clarify the person’s immediate priorities, which may include housing, income, health, legal advice, family contact or language support.","Use qualified interpreters and explain confidentiality and the worker’s role clearly.","Avoid asking for detailed trauma histories unless directly relevant and safe.","Refer legal or immigration questions to qualified specialist services rather than providing advice outside role."],
    remember:["Refugees and people seeking asylum are diverse and should not be defined only by displacement or trauma.","Uncertainty created by visa and service systems can directly affect wellbeing.","Settlement strengths may include language, community knowledge, family connection, faith and survival skills."],
    related:["CALD Practice","Trauma Informed Practice","Rights Based Practice","Housing & Homelessness"],
    refs:[["Australian Red Cross, migration support programs","https://www.redcross.org.au/migration/"],["Refugee Council of Australia, information and resources","https://www.refugeecouncil.org.au/"],["Australian Government Department of Home Affairs, settlement services","https://immi.homeaffairs.gov.au/settling-in-australia"]]
  },
  "LGBTQIA+ Affirmative Practice": {
    what:"Affirmative practice recognises diverse sexual orientations, gender identities, gender expressions and variations in sex characteristics as valid parts of human diversity. It supports dignity, safety, self determination and access to services while addressing discrimination, stigma and minority stress.",
    practice:["Use the person’s stated name, pronouns and language without requiring unnecessary explanation.","Ask only questions that are relevant to the person’s care or goals.","Do not disclose identity information to family, services or colleagues without consent unless a lawful exception applies.","Consider whether forms, facilities, groups and referral options are genuinely inclusive."],
    remember:["Identity should not be treated as a problem to be explained or changed.","Do not assume family relationships, anatomy, partners or support networks.","Intersectional experiences of racism, disability, age, poverty or location may compound exclusion."],
    related:["Intersectionality","Anti Oppressive Practice","Cultural Safety","Rights Based Practice"],
    refs:[["Australian Human Rights Commission, LGBTIQA+ rights","https://humanrights.gov.au/know-your-rights/rights-of-individuals/lgbtiq-rights"],["Australian Human Rights Commission, LGBTI equality","https://www.humanrights.gov.au/our-work/sex-discrimination/lesbian-gay-bisexual-trans-and-intersex-equality"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Disability Inclusive Practice": {
    what:"Disability inclusive practice identifies and removes environmental, communication, attitudinal and service barriers so that people with disability can participate and exercise choice. It is informed by the social model of disability, human rights and the principle that people are experts in their own lives.",
    practice:["Ask what access or communication adjustments the person wants rather than assuming.","Provide information in accessible formats and allow additional time where needed.","Speak directly to the person and involve supporters only with consent.","Separate disability related needs from risks created by inaccessible services, poverty, discrimination or violence."],
    remember:["Do not assume reduced capacity because a person communicates differently or needs support.","Reasonable adjustments are part of equitable service delivery.","Supported decision making should be prioritised before substitute decision making."],
    related:["Supported Decision Making","Neurodiversity Affirming Practice","Rights Based Practice","Intersectionality"],
    refs:[["Australian Human Rights Commission, disability rights","https://humanrights.gov.au/know-your-rights/rights-of-individuals/disability-rights"],["Australian Human Rights Commission, Disability Discrimination Act complaints","https://humanrights.gov.au/complaints/complaint-areas/disability-discrimination"],["NDIS Quality and Safeguards Commission, rights and responsibilities","https://www.ndiscommission.gov.au/participants/your-rights"]]
  },
  "Neurodiversity Affirming Practice": {
    what:"Neurodiversity affirming practice recognises neurological differences, including autism, attention differences and other forms of neurodivergence, as part of human diversity. It focuses on accessibility, communication, strengths and reducing barriers rather than requiring people to appear neurotypical.",
    practice:["Ask about preferred communication, sensory needs, pacing and environmental adjustments.","Use clear and direct language and provide written information when useful.","Avoid interpreting reduced eye contact, movement, silence or different emotional expression as disengagement.","Support the person to identify strengths, interests and strategies that work for them."],
    remember:["Every neurodivergent person is different and diagnostic labels do not determine individual needs.","Distress may increase when environments are unpredictable, sensory intense or communication is unclear.","The aim is participation and wellbeing, not masking or forced conformity."],
    related:["Disability Inclusive Practice","Cultural Humility","Communication","Supported Decision Making"],
    refs:[["NDIS Quality and Safeguards Commission, participant rights","https://www.ndiscommission.gov.au/participants/your-rights"],["Australian Human Rights Commission, disability rights","https://humanrights.gov.au/know-your-rights/rights-of-individuals/disability-rights"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Intersectionality": {
    what:"Intersectionality examines how identities and social structures interact to shape distinct experiences of power, privilege, discrimination and access. A person’s experience cannot always be understood by considering gender, race, disability, class, sexuality, age or location separately.",
    practice:["Explore how several aspects of identity and structural inequality affect the person’s options and service experiences.","Avoid treating one identity as the single explanation for a situation.","Consider whether eligibility rules, risk tools or standard pathways disadvantage people at particular intersections.","Use the person’s account to understand which identities and structures are most relevant to them."],
    remember:["Intersectionality is about systems of power as well as multiple identities.","People at the same intersection can still have different experiences and priorities.","An intersectional approach should change assessment and action, not only the language used."],
    related:["Anti Oppressive Practice","Feminist Social Work","Anti Racist Practice","Rights Based Practice"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Australian Human Rights Commission, National Anti Racism Framework scoping report","https://humanrights.gov.au/__data/assets/file/0016/57013/Narf_scoping_report_2022_-_final_word_layout_1.pdf"],["Australian Human Rights Commission, LGBTIQA+ rights assessment","https://humanrights.gov.au/know-your-rights/understanding-human-rights/Australian-Human-Rights-Assessment-2026/sexual-orientation%2C-gender-identity-and-intersex-sogii"]]
  },
  "Anti Racist Practice": {
    what:"Anti racist practice actively identifies, challenges and changes racism in interpersonal interactions, organisational processes and wider systems. It goes beyond being personally non racist by requiring action, accountability and attention to how power and resources are distributed.",
    practice:["Name and respond to racist comments, decisions or service barriers rather than remaining neutral.","Review assessment tools, referral pathways and eligibility rules for racialised assumptions or unequal outcomes.","Believe and document people’s experiences of racism without minimising or individualising them.","Support leadership, employment and decision making by people from communities affected by racism."],
    remember:["Racism can be systemic even when no individual intends harm.","Anti racist practice requires ongoing learning and willingness to be corrected.","Cultural celebration alone does not address discrimination, exclusion or unequal power."],
    related:["Cultural Safety","Decolonising Practice","Critical Social Work","Intersectionality"],
    refs:[["Australian Human Rights Commission, National Anti Racism Framework","https://humanrights.gov.au/resource-hub/by-resource-type/publications/race/anti-racism-framework-perspectives-multicultural"],["Australian Human Rights Commission, race discrimination rights","https://humanrights.gov.au/know-your-rights/rights-of-individuals/race-discrimination"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  }
});
Object.assign(stage1ToolkitContent, {
  "Ethical Decision Making": {
    what:"Ethical decision making is a structured process for responding when values, duties, rights, risks or organisational expectations conflict. It involves identifying the ethical issue, considering the person’s views and rights, checking professional standards and law, examining power and possible consequences, consulting appropriately, and documenting a defensible decision.",
    practice:["Describe the ethical tension clearly rather than jumping straight to a solution.","Identify who is affected, whose voice is missing and what rights, values or duties are engaged.","Check the AASW Code of Ethics, relevant law, policy and available evidence.","Use supervision or consultation, consider realistic alternatives, and explain the final rationale transparently."],
    remember:["Ethical practice is more than following policy.","A legally permitted action may still require ethical reflection.","Document the reasoning, consultation, alternatives considered and how the person was involved."],
    related:["AASW Code of Ethics","Human Rights Act 2019 (Qld)","Supervision","Professional Boundaries"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["AASW Ethics and Practice Guidelines","https://www.aasw.asn.au/about-aasw/ethics-standards/ethics-and-practice-guidelines/"]]
  },
  "Reflective Practice": {
    what:"Reflective practice involves examining what happened, how the worker understood it, what emotions and assumptions were present, how power and context shaped the interaction, and what should change next. Critical reflection goes beyond describing events by connecting practice with theory, ethics, culture and structural conditions.",
    practice:["Separate description from analysis: what happened, what it meant and why it matters.","Notice emotional reactions, assumptions, uncertainty and the influence of your role or authority.","Consider how culture, policy, inequality and organisational systems shaped the situation.","Use supervision to test interpretations and identify a specific change for future practice."],
    remember:["Reflection is not self criticism or a polished account of success.","Protect privacy and remove identifying details from personal learning records.","The value of reflection is shown through changed understanding or practice."],
    related:["Supervision","Use of Self","Ethical Decision Making","AASW Practice Standards"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["AASW Supervision resources","https://www.aasw.asn.au/support-and-resources/supervision/"]]
  },
  "Professional Sustainability": {
    what:"Professional sustainability is the capacity to practise ethically and effectively over time through realistic workload boundaries, supervision, reflective support, ongoing learning and attention to the effects of emotionally demanding work. It is not solely an individual self care responsibility; organisations also influence safety, workload and support.",
    practice:["Notice changes in concentration, empathy, sleep, irritability, avoidance or over involvement.","Use supervision early when work is affecting judgement, boundaries or wellbeing.","Maintain routines for debriefing, leave, learning and connection outside work.","Raise unsafe workload, role confusion or repeated exposure concerns through appropriate organisational channels."],
    remember:["Seeking support is part of accountable practice.","Personal coping strategies cannot fix unsafe systems or chronic understaffing.","Urgent risk, impairment or ethical concerns require prompt action rather than waiting for routine supervision."],
    related:["Supervision","Professional Boundaries","Reflective Practice","Organisation Policies"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["AASW Supervision resources","https://www.aasw.asn.au/support-and-resources/supervision/"]]
  },
  "Mental Health Act 2016 (Qld)": {
    what:"The Mental Health Act 2016 (Qld) provides the legal framework for involuntary assessment and treatment of people with mental illness in Queensland. It promotes voluntary treatment where possible and requires consideration of less restrictive ways of providing treatment and care. Strict legal criteria and safeguards apply before involuntary treatment can be authorised.",
    practice:["Clarify whether the person is receiving voluntary or involuntary treatment and what legal authority applies.","Explain rights, review options and processes in accessible language within your role.","Keep the person’s views, preferences, advance health directive and nominated support people visible in planning.","Seek qualified clinical, legal or supervisory advice rather than making assumptions about powers under the Act."],
    remember:["Mental illness alone does not justify involuntary treatment.","Capacity and treatment criteria are decision specific legal questions.","Use the current Act, Queensland Health guidance and local authorised procedures for any live decision."],
    related:["Supported Decision Making","Human Rights Act 2019 (Qld)","Guardianship & Decision Making","Rights Based Practice"],
    refs:[["Mental Health Act 2016 (Qld), current version","https://www.legislation.qld.gov.au/view/html/inforce/current/act-2016-005"],["Queensland Health, treating patients under the Mental Health Act 2016","https://www.health.qld.gov.au/public-health/topics/mhaod/for-healthcare-providers/treating-patients-under-the-mental-health-act"],["Queensland Health, consent to treatment and less restrictive way","https://www.health.qld.gov.au/public-health/topics/mental-health-alcohol-and-other-drugs/for-healthcare-providers/treating-patients-under-the-mental-health-act/consent-to-treatment-treatment-authorities"]]
  },
  "Human Rights Act 2019 (Qld)": {
    what:"The Human Rights Act 2019 (Qld) protects specified civil, political, cultural and economic rights. Queensland public entities must act and make decisions compatibly with human rights and give proper consideration to relevant rights. Some non government services may also have obligations when performing public functions.",
    practice:["Identify which rights may be affected by a proposed decision or restriction.","Record how the person’s circumstances and views were considered.","Consider whether the action is lawful, necessary, proportionate and whether a less restrictive option is available.","Use organisational human rights procedures and seek advice where obligations are unclear."],
    remember:["Human rights consideration should occur before a decision, not be added afterwards.","Rights can sometimes be limited, but limitations require lawful and proportionate justification.","Human rights practice complements social work ethics and advocacy."],
    related:["Rights Based Practice","Ethical Decision Making","Mental Health Act 2016 (Qld)","Advocacy"],
    refs:[["Human Rights Act 2019 (Qld), current version","https://www.legislation.qld.gov.au/view/html/inforce/current/act-2019-005"],["Queensland Human Rights Commission, Human Rights Act","https://www.qhrc.qld.gov.au/your-rights/human-rights-law"]]
  },
  "Privacy & Confidentiality": {
    what:"Privacy law regulates how personal information is collected, stored, used, disclosed, accessed and corrected. Confidentiality is the professional duty to protect information within the helping relationship. The applicable legal rules depend on the organisation, jurisdiction and type of information, so workers must also follow current organisational policy.",
    practice:["Collect only information needed for a clear professional purpose.","Explain how information may be used, stored and shared, including relevant limits.","Use secure systems, verify recipients and share the minimum necessary information.","Respond to access, correction, data breach or disclosure questions through authorised privacy processes."],
    remember:["Consent is important but is not the only possible legal basis for information handling.","Do not assume every service is governed by exactly the same privacy legislation.","When unsure, pause and consult a supervisor or privacy officer before disclosing, unless urgent lawful action is required."],
    related:["Confidentiality","Informed Consent","Documentation","Family and Carer Inclusive Practice"],
    refs:[["OAIC, Australian Privacy Principles","https://www.oaic.gov.au/privacy/australian-privacy-principles"],["OAIC, Guide to Health Privacy","https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/health-service-providers/guide-to-health-privacy"],["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"]]
  },
  "Guardianship & Decision Making": {
    what:"Queensland guardianship law applies when an adult has impaired capacity for a particular matter and a decision must be made. The system includes informal decision makers, enduring documents, statutory health attorneys and appointments by QCAT. Queensland law emphasises an adult’s dignity, participation, rights, will and preferences.",
    practice:["Begin with the presumption of capacity and identify the specific decision involved.","Provide accessible information, time and communication support before concluding that substitute decision making may be required.","Check whether an advance health directive, enduring power of attorney, statutory health attorney or QCAT appointment exists.","Seek legal, clinical or supervisory guidance before relying on substitute decision making authority."],
    remember:["Diagnosis or disability does not automatically establish impaired capacity.","Capacity is specific to the matter and time.","Support the adult’s participation, will and preferences even when another person has lawful authority."],
    related:["Supported Decision Making","Informed Consent","Mental Health Act 2016 (Qld)","Disability Inclusive Practice"],
    refs:[["Guardianship and Administration Act 2000 (Qld), current version","https://www.legislation.qld.gov.au/view/html/inforce/current/act-2000-008"],["Powers of Attorney Act 1998 (Qld), current version","https://www.legislation.qld.gov.au/view/whole/html/current/act-1998-022"],["Queensland Government, capacity guidelines","https://www.qld.gov.au/law/legal-mediation-and-justice-of-the-peace/power-of-attorney-and-making-decisions-for-others/capacity-guidelines"]]
  },
  "Policy Analysis": {
    what:"Policy analysis examines what a policy is trying to achieve, how the issue is framed, whose knowledge and interests shaped it, how it is implemented, and what intended or unintended effects it creates. Social work analysis also considers power, equity, human rights and lived experience.",
    practice:["Identify the stated problem, goals, target population and policy instruments.","Compare the written policy with how it operates in everyday service access and decision making.","Examine evidence, funding, eligibility, accountability and whose voices are absent.","Consider differential effects across culture, gender, disability, class, location and other intersecting factors."],
    remember:["Policy is visible in forms, thresholds, waiting lists and service exclusions, not only legislation.","Implementation gaps can undermine a well stated policy goal.","Use credible evidence and de identified lived experience when recommending change."],
    related:["Social Policy & Systems","Service Systems","Human Rights Act 2019 (Qld)","Advocacy"],
    refs:[["AASW, Social policy and advocacy","https://www.aasw.asn.au/about-aasw/social-policy-and-advocacy/"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Service Systems": {
    what:"Service systems are the connected organisations, funding arrangements, laws, referral pathways, eligibility rules and professional roles that shape how people access support. Systems can provide continuity and choice, but can also create duplication, exclusion and gaps between services.",
    practice:["Map the services involved, their roles, thresholds and information sharing arrangements.","Identify where the person is being asked to repeat their story or coordinate the system alone.","Use warm referrals, clear handovers and agreed responsibility for follow up.","Document service barriers and raise recurring patterns through supervision, project work or advocacy."],
    remember:["A referral is not a successful connection until access is confirmed.","Eligibility does not guarantee practical accessibility.","Keep the person’s goals and consent central when coordinating multiple services."],
    related:["Case Management","Community Practice","Social Policy & Systems","Policy Analysis"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Australian Commission on Safety and Quality in Health Care, transitions of care","https://www.safetyandquality.gov.au/standards/nsqhs-standards/comprehensive-care-standard/minimising-patient-harm/action-604"]]
  },
  "Organisation Policies": {
    what:"Organisation policies translate law, professional standards, funding requirements and local risk controls into expected workplace processes. They help workers act consistently, but they do not replace professional judgement, ethical reasoning, supervision or current legislation.",
    practice:["Locate the current approved policy and check its review date and scope.","Distinguish mandatory requirements from guidance and local custom.","Ask how the policy applies to the person’s circumstances, rights and cultural context.","Use supervision when policy appears unclear, outdated, conflicting or likely to create harm."],
    remember:["Do not rely on memory, informal summaries or an old downloaded copy for high stakes decisions.","Follow escalation pathways rather than quietly working around unsafe or conflicting requirements.","Practice Compass should support learning, not store confidential workplace procedures or client information."],
    related:["Ethical Decision Making","Professional Boundaries","Privacy & Confidentiality","Service Systems"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  }
});



const verifiedKnowledgeTopics = {
  "Domestic and Family Violence":{
    reviewed:"11 July 2026",
    overview:"Domestic and family violence involves patterns of behaviour used to control, frighten, intimidate or harm another person within a family or intimate relationship. It can include physical, sexual, emotional, psychological, social, technological and economic abuse, as well as coercive control.",
    why:"Social workers may encounter victim survivors and people using violence in mental health, child and family, housing, health, disability, justice and community settings. Safe responses require attention to risk, dignity, choice, structural barriers and the person’s own assessment of safety.",
    statistics:[
      ["1 in 4 women","23% of Australian women have experienced physical and/or sexual violence from an intimate partner since the age of 15.","AIHW, using ABS Personal Safety Survey 2021–22"],
      ["1 in 14 men","7.3% of Australian men have experienced physical and/or sexual violence from an intimate partner since the age of 15.","AIHW, using ABS Personal Safety Survey 2021–22"],
      ["Emotional abuse","23% of women and 14% of men have experienced emotional abuse by a current or previous partner.","AIHW / ABS"],
      ["Economic abuse","16% of women and 7.8% of men have experienced economic abuse by a current or previous partner.","AIHW / ABS"],
      ["Queensland DVOs","In 2023–24, 27,857 domestic violence protection orders were initiated in Queensland and a further 14,745 were varied.","Queensland Chief Health Officer"]
    ],
    practice:[
      "Respond calmly and without judgement. A first response can influence whether a person seeks further help.",
      "Ask about immediate safety without pressuring the person to leave or disclose more than they choose.",
      "Use qualified interpreters where required and avoid relying on children, relatives or alleged perpetrators.",
      "Document the person’s words, observed facts, risks, actions and referrals clearly and respectfully.",
      "Consider children, disability, culture, sexuality, migration status, housing and financial access without assuming that one response fits everyone.",
      "Follow organisational policy, relevant legislation and specialist risk assessment or referral pathways."
    ],
    lenses:[
      "Feminist social work",
      "Intersectionality",
      "Trauma and violence informed practice",
      "Ecological systems theory",
      "Anti oppressive practice",
      "Human rights based practice"
    ],
    prompts:[
      "How were choice and control supported in the response?",
      "What structural barriers affected safety or service access?",
      "Whose definition of safety guided the interaction?",
      "How might culture, disability, gender, sexuality, location or finances shape the person’s options?",
      "What assumptions or emotional responses did I notice in myself?"
    ],
    sources:[
      {
        type:"Government data",
        title:"Personal Safety, Australia, 2021–22",
        organisation:"Australian Bureau of Statistics",
        url:"https://www.abs.gov.au/statistics/people/crime-and-justice/personal-safety-australia/latest-release"
      },
      {
        type:"Government data",
        title:"Intimate partner violence",
        organisation:"Australian Institute of Health and Welfare",
        url:"https://www.aihw.gov.au/family-domestic-and-sexual-violence/types-of-violence/intimate-partner-violence"
      },
      {
        type:"Queensland data",
        title:"Family, domestic and sexual violence",
        organisation:"Queensland Chief Health Officer",
        url:"https://www.choreport.health.qld.gov.au/our-lifestyle/family-and-domestic-and-sexual-violence"
      },
      {
        type:"Queensland guidance",
        title:"Coercive control",
        organisation:"Queensland Government",
        url:"https://www.qld.gov.au/community/getting-support-health-social-issue/support-victims-abuse/need-to-know/coercive-control"
      },
      {
        type:"Research organisation",
        title:"Statistics, prevalence and community attitudes",
        organisation:"ANROWS",
        url:"https://www.anrows.org.au/research-areas/statistics-prevalence-and-community-attitudes/"
      }
    ]
  }
};

function verifiedKnowledgePage(topic,category){
  const data=verifiedKnowledgeTopics[topic[0]];
  if(!data) return false;

  document.getElementById("main").innerHTML=`
    <article class="toolkit-topic-page toolkit-topic-verified">
      <header class="toolkit-topic-hero">
        <button class="back toolkit-topic-back" id="backToolkit" aria-label="Back to Practice Toolkit">‹</button>
        <div>
          <div class="eyebrow">${category[1]}</div>
          <h1>${topic[0]}</h1>
          <p>${data.overview}</p>
        </div>
      </header>

      <div class="source-review">Verified sources · Reviewed ${data.reviewed}</div>

      <section class="toolkit-topic-section toolkit-definition-section">
        <div class="toolkit-section-kicker">What it is</div>
        <h2>Understanding the practice context</h2>
        <p>${data.why}</p>
      </section>

      <section class="toolkit-topic-section toolkit-data-section">
        <div class="toolkit-section-kicker">Australian and Queensland context</div>
        <h2>What the available data shows</h2>
        <div class="stats-list">
          ${data.statistics.map(stat=>`
            <div class="stat-fact">
              <strong>${stat[0]}</strong>
              <p>${stat[1]}</p>
              <span>${stat[2]}</span>
            </div>`).join("")}
        </div>
        <p class="data-note">Statistics describe recorded survey or administrative data and do not capture every experience. Definitions and populations differ between sources.</p>
      </section>

      <section class="toolkit-topic-section toolkit-practice-section">
        <div class="toolkit-section-kicker">In practice</div>
        <h2>Practice considerations</h2>
        <div class="toolkit-practice-list">${data.practice.map(item=>`<div class="toolkit-practice-item"><span aria-hidden="true">•</span><p>${item}</p></div>`).join("")}</div>
      </section>

      <section class="toolkit-topic-section toolkit-takeaway-section">
        <div class="toolkit-section-kicker">Key things to remember</div>
        <div class="toolkit-pill-list">${data.lenses.map(item=>`<span class="pill">${item}</span>`).join("")}</div>
      </section>

      <details class="toolkit-secondary-details">
        <summary>Reflective prompts</summary>
        <div class="toolkit-details-body">${data.prompts.map(item=>`<div class="toolkit-practice-item"><span aria-hidden="true">•</span><p>${item}</p></div>`).join("")}</div>
      </details>

      <details class="toolkit-secondary-details">
        <summary>References and original sources</summary>
        <div class="toolkit-details-body">
          <p class="muted">Open the original publication before using a statistic in university work.</p>
          <div class="source-list">
            ${data.sources.map(source=>`
              <a class="source-link" href="${source.url}" target="_blank" rel="noopener noreferrer external">
                <span class="source-type">${source.type}</span>
                <strong>${source.title}</strong>
                <small>${source.organisation}</small><span class="open-source-label">Open original source ↗</span>
              </a>`).join("")}
          </div>
        </div>
      </details>

      <button class="btn secondary toolkit-return" id="returnToolkit">Return to Practice Toolkit</button>
    </article>`;

  const goBack=()=>{const returnToReflection=state.get("reflectionReturnPending",false);state.set("reflectionReturnPending",false);route=returnToReflection?"journal":"learn";render()};
  document.getElementById("backToolkit").onclick=goBack;
  document.getElementById("returnToolkit").onclick=goBack;
  return true;
}

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
  const hour = new Date().getHours(), name=firstName();
  if(hour < 12) return {title:`☀️ Good morning, ${name}`, subtitle:"A new day. Stay curious and notice one useful thing."};
  if(hour < 17) return {title:`🌿 Good afternoon, ${name}`, subtitle:"Welcome back. Let’s focus on what matters next."};
  return {title:`🌙 Welcome back, ${name}`, subtitle:"One meaningful moment from today is enough."};
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
  const profile=placementProfile();
  const start=parseLocalDate(profile.startDate);
  if(!start)return {started:false,notConfigured:true,daysUntil:0,week:0,day:0,workdays:0};
  const today=new Date(); today.setHours(0,0,0,0);
  const diff=Math.floor((today-start)/(1000*60*60*24));
  if(diff<0)return {started:false,daysUntil:Math.ceil((start-today)/(1000*60*60*24)),week:0,day:0,workdays:0};
  let workdays=0;
  for(let d=new Date(start);d<=today;d.setDate(d.getDate()+1)){
    const day=d.getDay();
    if(day>=1&&day<=5)workdays++;
  }
  const automaticWeek=Math.floor(diff/7)+1;
  const override=Number(profile.weekOverride);
  const week=Number.isInteger(override)&&override>0?override:automaticWeek;
  return {started:true,workdays,week,automaticWeek,day:((workdays-1)%5)+1};
}

function assessmentIsComplete(id){
  const assessment=assessments.find(item=>item.id===id);
  return assessment ? assessmentOverallStatus(assessment)==="complete" : false;
}

function assessmentPriority(info,hours){
  let ordered;
  if(!info.started){
    ordered=["modules","learning","timesheets","project","integration","reflections","midfinal","final"];
  }else if(info.week<=3){
    ordered=["learning","timesheets","project","integration","reflections","midfinal","final","modules"];
  }else if(hours<250){
    ordered=["project","timesheets","integration","reflections","midfinal","final","learning","modules"];
  }else if(hours<430){
    ordered=["midfinal","reflections","project","timesheets","integration","final","learning","modules"];
  }else{
    ordered=["final","midfinal","reflections","project","timesheets","integration","learning","modules"];
  }
  const baseOrder=new Map(ordered.map((id,index)=>[id,index]));
  return [...ordered].sort((a,b)=>{
    const aDate=assessmentPlanning(a).date;
    const bDate=assessmentPlanning(b).date;
    if(aDate&&bDate) return aDate.localeCompare(bDate)||baseOrder.get(a)-baseOrder.get(b);
    if(aDate) return -1;
    if(bDate) return 1;
    return baseOrder.get(a)-baseOrder.get(b);
  });
}

function nextAssessment(info,hours){
  const integrationIsCurrent=Boolean(integrationReminder());
  const ordered=assessmentPriority(info,hours)
    .map(id=>assessments.find(item=>item.id===id))
    .filter(Boolean);
  const current=ordered.find(item=>!assessmentIsComplete(item.id)&&(item.id!=="integration"||integrationIsCurrent));
  return current || ordered.find(item=>!assessmentIsComplete(item.id)) || ordered[ordered.length-1] || assessments[0];
}

function upcomingAssessments(info,hours,currentId,limit=2){
  return assessmentPriority(info,hours)
    .filter(id=>id!==currentId && !assessmentIsComplete(id))
    .map(id=>assessments.find(item=>item.id===id))
    .filter(Boolean)
    .slice(0,limit);
}

function dailyPrompt(info,hours){
  if(!info.started) return {
    title:"Prepare without pressure",
    q:"What are you most hoping to learn from your placement?",
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


const INTEGRATION_SESSIONS_DEFAULT = [
  {id:"session1",label:"Integration Session 1",date:"2026-08-21",status:"booked",note:""},
  {id:"session2",label:"Integration Session 2",date:"2026-09-18",status:"booked",note:""},
  {id:"session3",label:"Integration Session 3",date:"2026-10-16",status:"booked",note:""}
];
const TIMESHEET_FIRST_DUE="2026-07-31";

function integrationSessions(){
  const saved=state.get("integrationSessions",null);
  if(!Array.isArray(saved)||!saved.length){
    state.set("integrationSessions",INTEGRATION_SESSIONS_DEFAULT);
    return INTEGRATION_SESSIONS_DEFAULT.map(item=>({...item}));
  }
  return INTEGRATION_SESSIONS_DEFAULT.map(defaultItem=>{
    const current=saved.find(item=>item.id===defaultItem.id)||{};
    return {...defaultItem,...current};
  });
}
function saveIntegrationSessions(items){state.set("integrationSessions",items);}
function integrationStatusLabel(status){return status==="completed"?"Completed":status==="booked"?"Booked":"Not booked";}
function daysBetweenDates(fromValue,toValue){return Math.round((parseLocalDate(toValue)-parseLocalDate(fromValue))/86400000);}
function integrationReminder(today=localDateValue()){
  const candidates=integrationSessions().filter(item=>item.status!=="completed"&&item.date).map(item=>({...item,days:daysBetweenDates(today,item.date)})).sort((a,b)=>a.days-b.days);
  const overdue=candidates.filter(item=>item.days<0).sort((a,b)=>b.days-a.days)[0];
  if(overdue&&overdue.days>=-7)return {type:"integration",tone:"attention",title:`${overdue.label} has passed`,text:`${formatPlanningDate(overdue.date)} · mark it completed when ready.`,action:"Open session",assessmentId:"integration"};
  const soon=candidates.find(item=>item.days>=0&&item.days<=7);
  if(soon)return {type:"integration",tone:"calm",title:`${soon.label} ${soon.days===0?"is today":`is in ${soon.days} day${soon.days===1?"":"s"}`}`,text:formatPlanningDate(soon.date),action:"Open session",assessmentId:"integration"};
  return null;
}
function timesheetSubmissions(){return state.get("timesheetSubmissions",{});}
function saveTimesheetSubmissions(value){state.set("timesheetSubmissions",value);}
function timesheetDueDatesAround(todayValue=localDateValue()){
  const first=parseLocalDate(TIMESHEET_FIRST_DUE),today=parseLocalDate(todayValue),dates=[];
  let cursor=new Date(first);
  while(cursor<=today){dates.push(localDateValue(cursor));cursor.setDate(cursor.getDate()+14);}
  for(let i=0;i<3;i++){dates.push(localDateValue(cursor));cursor.setDate(cursor.getDate()+14);}
  return dates;
}
function timesheetCycleForDue(dueDate){
  const end=parseLocalDate(dueDate),start=new Date(end);start.setDate(end.getDate()-13);
  return {start:localDateValue(start),end:dueDate};
}
function timesheetSubmissionStatus(todayValue=localDateValue()){
  const submissions=timesheetSubmissions(),dates=timesheetDueDatesAround(todayValue),today=parseLocalDate(todayValue);
  const overdue=[...dates].filter(date=>parseLocalDate(date)<=today&&!submissions[date]).sort().pop();
  if(overdue){const cycle=timesheetCycleForDue(overdue);return {dueDate:overdue,cycle,submitted:false,overdue:true,days:daysBetweenDates(todayValue,overdue)};}
  const next=dates.find(date=>parseLocalDate(date)>today)||dates[dates.length-1];
  const cycle=timesheetCycleForDue(next);
  return {dueDate:next,cycle,submitted:Boolean(submissions[next]),overdue:false,days:daysBetweenDates(todayValue,next)};
}
function markTimesheetSubmitted(dueDate){
  const all=timesheetSubmissions();all[dueDate]={submittedAt:new Date().toISOString()};saveTimesheetSubmissions(all);
}
function timesheetReminder(today=localDateValue()){
  const status=timesheetSubmissionStatus(today);
  if(status.overdue)return {type:"timesheet",tone:"attention",title:"Timesheet submission is overdue",text:`Fortnight ending ${formatPlanningDate(status.dueDate)}`,action:"Open timesheets"};
  if(status.days<=3)return {type:"timesheet",tone:"calm",title:`Timesheet due ${status.days===0?"today":`in ${status.days} day${status.days===1?"":"s"}`}`,text:`Fortnight ending ${formatPlanningDate(status.dueDate)}`,action:"Open timesheets"};
  return null;
}
function homePlacementReminders(){return [timesheetReminder(),integrationReminder()].filter(Boolean).slice(0,2);}
function homeReminderPanel(){
  const reminder=homePlacementReminders()[0]||null;
  const notice=!reminder?(smartNotices?.()[0]||null):null;
  if(!reminder&&!notice)return "";
  if(reminder){
    return `<section class="home-attention-panel" aria-label="Needs attention">
      <span class="home-attention-label">Needs Attention</span>
      <button class="home-attention-row ${reminder.tone==="attention"?"is-attention":""}" data-reminder-type="${reminder.type}" ${reminder.assessmentId?`data-assessment-id="${reminder.assessmentId}"`:""}>
        <span class="home-attention-symbol">${reminder.type==="timesheet"?"⏱️":"☕"}</span>
        <span><strong>${reminder.title}</strong><small>${reminder.text}</small></span>
        <b>›</b>
      </button>
    </section>`;
  }
  return `<section class="home-attention-panel" aria-label="Needs attention">
    <span class="home-attention-label">Needs Attention</span>
    <button class="home-attention-row" data-smart-action="${safeText(notice.action)}">
      <span class="home-attention-symbol">${notice.icon}</span>
      <span><strong>${safeText(notice.title)}</strong><small>${safeText(notice.detail)}</small></span>
      <b>›</b>
    </button>
  </section>`;
}

let quickHoursEditingDate=null;
function localDateValue(date=new Date()){
  const year=date.getFullYear();
  const month=String(date.getMonth()+1).padStart(2,"0");
  const day=String(date.getDate()).padStart(2,"0");
  return `${year}-${month}-${day}`;
}
function parseLocalDate(value){
  const [year,month,day]=String(value||"").split("-").map(Number);
  return new Date(year,Math.max(0,(month||1)-1),day||1);
}
function formatQuickHoursDate(value,includeWeekday=false){
  return new Intl.DateTimeFormat("en-AU",includeWeekday?{weekday:"long",day:"numeric",month:"short"}:{day:"numeric",month:"short"}).format(parseLocalDate(value));
}
function quickHoursEntryForDate(date){
  return timesheetEntries().find(entry=>entry.date===date);
}
function recentQuickHoursRows(){
  const rows=[];
  const today=parseLocalDate(localDateValue());
  for(let i=0;i<5;i++){
    const date=new Date(today);
    date.setDate(today.getDate()-i);
    const value=localDateValue(date);
    rows.push({date:value,entry:quickHoursEntryForDate(value)});
  }
  return rows;
}
function quickHoursReminder(){
  const today=localDateValue();
  if(quickHoursEntryForDate(today)) return "";
  const dated=timesheetEntries().filter(entry=>entry.date && Number(entry.hours||0)>0).sort((a,b)=>b.date.localeCompare(a.date));
  if(!dated.length) return "💚 You haven’t logged your placement hours yet.";
  const latest=dated[0];
  const elapsed=Math.max(0,Math.round((parseLocalDate(today)-parseLocalDate(latest.date))/86400000));
  if(elapsed>=2) return `💚 You haven’t logged your placement hours for ${elapsed} days.`;
  return `💚 Last hours entry: ${new Intl.DateTimeFormat("en-AU",{weekday:"long"}).format(parseLocalDate(latest.date))}.`;
}
function quickHoursCard(){
  const today=localDateValue();
  const todayEntry=quickHoursEntryForDate(today);
  const selectedDate=quickHoursEditingDate||today;
  const selectedEntry=quickHoursEntryForDate(selectedDate);
  const summary=todayEntry?`${Number(todayEntry.hours||0).toFixed(1)} hours logged today`:`Add or update placement hours`;
  return `<details class="home-card home-hours-card home-hours-collapsed" ${quickHoursEditingDate!==null?'open':''}>
    <summary>
      <span class="home-hours-summary-icon">⏱️</span>
      <span><span class="home-kicker">Quick hours</span><strong>${summary}</strong></span>
      <span class="home-hours-chevron" aria-hidden="true">⌄</span>
    </summary>
    <div class="home-hours-panel">
      ${quickHoursReminder()?`<p class="home-hours-reminder">${quickHoursReminder()}</p>`:""}
      <div class="home-hours-form">
        <label><span>Date</span><input id="quickHoursDate" type="date" class="input" value="${selectedDate}" max="${today}"></label>
        <label><span>Hours worked</span><input id="quickHoursValue" type="number" class="input" min="0" max="24" step="0.25" inputmode="decimal" value="${selectedEntry?Number(selectedEntry.hours||0):""}" placeholder="8.5"></label>
        <label class="home-hours-checkbox"><input id="quickPlacementDay" type="checkbox" ${selectedEntry?.placementDay===false?"":"checked"}><span>Placement day</span></label>
        <button type="button" class="btn home-hours-save" id="saveQuickHours">Save hours</button>
      </div>
      <div class="home-hours-recent"><span class="home-hours-recent-title">Recent entries</span>${recentQuickHoursRows().map(({date,entry})=>`<div class="home-hours-row"><span>${formatQuickHoursDate(date)} · ${entry?`${Number(entry.hours||0).toFixed(1)} hrs`:`Missing`}</span>${entry?`<button type="button" class="home-hours-edit-link" data-hours-date="${date}" aria-label="Edit hours for ${formatQuickHoursDate(date)}">Edit</button>`:""}</div>`).join("")}</div>
    </div>
  </details>`;
}
function saveQuickHours(){
  const date=document.getElementById("quickHoursDate")?.value;
  const hoursValue=Number(document.getElementById("quickHoursValue")?.value);
  const placementDay=Boolean(document.getElementById("quickPlacementDay")?.checked);
  if(!date || !Number.isFinite(hoursValue) || hoursValue<0 || hoursValue>24){
    alert("Please enter a valid date and hours worked.");
    return;
  }
  const entries=timesheetEntries();
  const index=entries.findIndex(entry=>entry.date===date);
  if(index>=0){
    entries[index]={...entries[index],hours:hoursValue,placementDay};
  }else{
    entries.unshift({id:Date.now(),date,start:"",finish:"",lunch:0,hours:hoursValue,activities:placementDay?"Placement hours logged from Home":"Not a placement day",placementDay});
  }
  state.set("timesheets",entries);
  state.set("hours",entries.reduce((sum,entry)=>sum+Number(entry.hours||0),0));
  quickHoursEditingDate=null;
  render();
}
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

const practiceFrameworkDevelopmentAreas = [
  {id:"identity",icon:"🧭",title:"My social work identity",purpose:"The kind of social worker I hope to become and the purpose guiding my practice.",prompt:"What is my vision for social work practice?",questions:["Why did I choose social work?","How do I want people to experience me as a social worker?","What does ethical and effective practice look like to me?"]},
  {id:"framework",icon:"🌿",title:"Understanding my practice framework",purpose:"How I understand people, situations and practice decisions.",prompt:"My framework is based on my understanding that…",questions:["How do I understand human behaviour and change?","What beliefs do I hold about people and families?","What influences my practice decisions?"]},
  {id:"dignity",icon:"🤍",title:"Respect and human dignity",purpose:"The values that guide how I engage with people.",prompt:"What does respecting people mean in my practice?",questions:["How do I help people feel heard and valued?","How do I recognise people as experts in their own lives?","How do I avoid judgement?"]},
  {id:"selfDetermination",icon:"🗝️",title:"Self determination",purpose:"How I support autonomy, informed choice and participation.",prompt:"How will I support people to have control over decisions affecting their lives?",questions:["How do I balance professional responsibilities with a person's right to choose?","How will I avoid doing things to people rather than with people?","How do I support informed choices?"]},
  {id:"strengths",icon:"🌱",title:"Strengths based practice",purpose:"How I notice strengths, resilience and possibilities rather than focusing only on problems.",prompt:"How do I recognise strengths?",questions:["What strengths do I notice in individuals, families and communities?","How do I keep assessment from becoming deficit focused?","How do I recognise cultural, family and community strengths?"]},
  {id:"culture",icon:"🌏",title:"Cultural humility and responsiveness",purpose:"Ongoing reflection about culture, identity, power and difference.",prompt:"How will I practise in culturally safe ways?",questions:["What assumptions or biases might I hold?","How do I learn from people's lived experiences?","How do I recognise historical and systemic experiences?"]},
  {id:"justice",icon:"⚖️",title:"Social justice and advocacy",purpose:"Connecting individual experiences with broader systems, rights and structural barriers.",prompt:"How will I address systemic barriers?",questions:["What social issues influence the people I work with?","How can I advocate beyond individual support?","How do policies and systems affect people's lives?"]},
  {id:"theories",icon:"🧠",title:"Theories informing my practice",purpose:"The knowledge and theories that shape how I understand people and situations.",prompt:"Which theories influence how I think and practise?",questions:["What theories help me understand behaviour?","What theories challenge my assumptions?","How do theories influence assessment and intervention?"]},
  {id:"tools",icon:"🛠️",title:"Practice tools and approaches",purpose:"How theory and values translate into practical social work activity.",prompt:"How will I apply my framework in practice?",questions:["What approaches will I use when engaging with people?","How will I assess needs and strengths?","How will I evaluate whether my approach is helpful?"]},
  {id:"relationships",icon:"🤝",title:"Relationship based practice",purpose:"The professional relationship as a central part of social work.",prompt:"How will I build meaningful relationships?",questions:["How will I develop trust?","How will I respond when trust has been affected by previous services?","How will I manage professional boundaries?"]},
  {id:"reflection",icon:"🪞",title:"Reflective practice and supervision",purpose:"Ongoing learning, accountability and critical reflection.",prompt:"How will I continue developing as a practitioner?",questions:["What assumptions influenced my thinking?","Whose voice was centred?","What might I have missed, and what did I learn?"]},
  {id:"development",icon:"📈",title:"Ongoing professional development",purpose:"The strengths, goals and commitments that will guide my continued growth.",prompt:"What kind of social worker am I becoming?",questions:["What strengths do I bring?","What skills or knowledge do I want to develop?","What commitments will guide my future practice?"]}
];

function frameworkDevelopmentData(){return state.get("frameworkDevelopment",{});}
function saveFrameworkDevelopmentData(data){state.set("frameworkDevelopment",data);}
function frameworkEvidenceLinksData(){return state.get("frameworkEvidenceLinks",{});}
function saveFrameworkEvidenceLinksData(data){state.set("frameworkEvidenceLinks",data);}
function frameworkSummaryData(){return state.get("frameworkSummary",{vision:"",purpose:"",values:"",theories:"",tools:"",reflection:""});}
function saveFrameworkSummaryData(data){state.set("frameworkSummary",data);}
function frameworkSummaryHistoryData(){return state.get("frameworkSummaryHistory",[]);}
function saveFrameworkSummaryHistoryData(data){state.set("frameworkSummaryHistory",data);}
function frameworkSummaryChanged(a,b){
  return ["vision","purpose","values","theories","tools","reflection"].some(key=>String(a?.[key]||"").trim()!==String(b?.[key]||"").trim());
}
function saveFrameworkSummaryVersion(summary){
  const history=frameworkSummaryHistoryData();
  const clean={};
  ["vision","purpose","values","theories","tools","reflection"].forEach(key=>clean[key]=String(summary?.[key]||"").trim());
  if(!Object.values(clean).some(Boolean))return;
  const latest=history[history.length-1];
  if(latest&& !frameworkSummaryChanged(latest.summary,clean))return;
  history.push({savedAt:new Date().toISOString(),summary:clean});
  saveFrameworkSummaryHistoryData(history.slice(-24));
}


function smartReflectionLinksData(){return state.get("smartReflectionLinks",{});}
function saveSmartReflectionLinksData(data){state.set("smartReflectionLinks",data);}
function normaliseSmartReflectionLink(value){
  const row=value&&typeof value==="object"?value:{};
  const section=name=>({
    assessments:Array.isArray(row[name]?.assessments)?row[name].assessments.map(String):[],
    standards:Array.isArray(row[name]?.standards)?row[name].standards.map(String):[],
    framework:Array.isArray(row[name]?.framework)?row[name].framework.map(String):[]
  });
  return {approved:section("approved"),dismissed:section("dismissed")};
}
function smartApprovedFor(entryId,type){
  return normaliseSmartReflectionLink(smartReflectionLinksData()[String(entryId)]).approved[type]||[];
}
function smartLinkDecision(entryId,type,value,decision){
  const all=smartReflectionLinksData(),key=String(entryId),row=normaliseSmartReflectionLink(all[key]);
  ["approved","dismissed"].forEach(bucket=>row[bucket][type]=row[bucket][type].filter(item=>item!==String(value)));
  if(decision==="approved"||decision==="dismissed")row[decision][type].push(String(value));
  all[key]=row;saveSmartReflectionLinksData(all);
}
const smartAssessmentOptions={
  project:{label:"Small Project",icon:"📄"},
  reflections:{label:"Three Project Reflections",icon:"⭐"},
  midfinal:{label:"Mid and End Placement Assessments",icon:"📝"},
  final:{label:"Final Presentation and Project Report",icon:"🎤"}
};
const smartStandardRules=[
  {value:"Practice Standard 1: Values and ethics",terms:["ethic","value","dignity","choice","rights","confidential","consent","boundary","power"]},
  {value:"Practice Standard 2: Professional conduct",terms:["professional","accountab","boundary","role","supervision","feedback","conduct"]},
  {value:"Practice Standard 3: Culturally responsive and inclusive practice",terms:["culture","cultural","aboriginal","torres strait","identity","intersection","inclusive","diversity"]},
  {value:"Practice Standard 4: Knowledge for practice",terms:["theory","research","evidence","policy","legislation","framework","literature"]},
  {value:"Practice Standard 5: Applying knowledge to practice",terms:["assessment","planning","intervention","recovery","strength","trauma","risk","safety"]},
  {value:"Practice Standard 6: Communication and interpersonal skills",terms:["communication","rapport","listen","silence","group","conversation","relationship","engagement"]},
  {value:"Practice Standard 7: Information recording and sharing",terms:["documentation","case note","record","information sharing","privacy","report"]},
  {value:"Practice Standard 8: Professional development and supervision",terms:["supervision","feedback","learning","reflect","development","training","question"]},
  {value:"Practice Standard 9: Professional leadership",terms:["leadership","advocacy","initiative","team","multidisciplinary","system change","project"]}
];
const smartFrameworkRules={
  identity:["identity","social worker","professional identity","becoming"],framework:["framework","worldview","understand people","practice decision"],
  dignity:["dignity","respect","heard","valued","non judgement"],selfDetermination:["choice","autonomy","self determination","consent","decision"],
  strengths:["strength","resilience","capacity","resource","hope"],culture:["culture","cultural","identity","bias","assumption","intersection"],
  justice:["justice","advocacy","rights","barrier","poverty","housing","policy","system"],theories:["theory","framework","recovery","trauma","systems","ecological"],
  tools:["assessment","goal","planning","group","safety plan","intervention","communication"],relationships:["rapport","trust","relationship","listen","boundary"],
  reflection:["reflect","supervision","feedback","assumption","missed","different next time"],development:["learning","develop","confidence","skill","training","future practice"]
};
function reflectionSearchText(entry){return [entry.moment,entry.answer,entry.whyMatter,entry.futurePractice,entry.supervision,...(entry.theories||[]),...(entry.values||[]),...(entry.ethics||[]),...(entry.practiceStandards||[]),...(entry.evidenceTypes||[])].filter(Boolean).join(" ").toLowerCase();}
function termMatches(text,terms){return terms.filter(term=>text.includes(term)).length;}
function smartReflectionSuggestions(entry){
  const text=reflectionSearchText(entry),existingEvidence=(entry.evidence||[]),existingStandards=(entry.practiceStandards||[]);
  const assessments=[];
  const addAssessment=(value,reason)=>{if(!assessments.some(item=>item.value===value))assessments.push({value,label:smartAssessmentOptions[value].label,reason});};
  if(termMatches(text,["project","research","resource","service gap","policy","literature","evaluation","consultation","family","carer","warm handover","discharge"])>0)addAssessment("project","This reflection may help explain your project idea, rationale, consultation, evidence or development.");
  if(termMatches(text,["project","research","feedback","challenge","changed","theory","ethical","learning","next step"])>0)addAssessment("reflections","This may show how the project or your thinking developed over time.");
  if(text.length>80||termMatches(text,["communication","ethic","culture","theory","supervision","documentation","team","feedback","use of self","assessment"])>0)addAssessment("midfinal","This may provide a specific example of your learning, practice or development for placement assessment.");
  if(termMatches(text,["growth","learning","identity","value","theory","skill","knowledge","project","development","future practice"])>0)addAssessment("final","This may support your final account of professional growth, project learning or continuing development.");
  Object.entries(smartAssessmentOptions).forEach(([id,opt])=>{if(existingEvidence.includes(opt.label)&&!assessments.some(item=>item.value===id))assessments.push({value:id,label:opt.label,reason:"You previously linked this reflection to this assessment."});});
  const standards=smartStandardRules.filter(rule=>termMatches(text,rule.terms)>0||existingStandards.includes(rule.value)).map(rule=>({value:rule.value,label:rule.value,reason:"Suggested from the themes and practice language in this reflection."})).slice(0,4);
  const framework=practiceFrameworkDevelopmentAreas.filter(area=>termMatches(text,smartFrameworkRules[area.id]||[])>0).map(area=>({value:area.id,label:area.title,reason:"This reflection appears to contain an example relevant to this part of your developing framework."})).slice(0,4);
  return {assessments:assessments.slice(0,4),standards,framework};
}
function smartAssessmentEntryMatch(entry,assessmentId){return smartApprovedFor(entry.id,"assessments").includes(String(assessmentId));}
function normaliseFrameworkEvidenceArea(value){
  const area=value&&typeof value==="object"?value:{};
  return {
    reflectionIds:Array.isArray(area.reflectionIds)?area.reflectionIds.map(String):[],
    supervisionIds:Array.isArray(area.supervisionIds)?area.supervisionIds.map(String):[],
    manualExamples:Array.isArray(area.manualExamples)?area.manualExamples.filter(item=>item&&item.text).map(item=>({id:item.id||Date.now(),text:String(item.text),date:item.date||new Date().toLocaleDateString("en-AU")})):[]
  };
}

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

function assessmentPlanning(assessmentId){
  const data=taskStatusData();
  const plans=data.__assessmentPlanningDates;
  if(!plans||typeof plans!=="object") return {date:"",reason:""};
  const plan=plans[assessmentId];
  return plan&&typeof plan==="object"?{date:plan.date||"",reason:plan.reason||""}:{date:"",reason:""};
}

function saveAssessmentPlanning(assessmentId,date,reason){
  const data=taskStatusData();
  const plans=data.__assessmentPlanningDates&&typeof data.__assessmentPlanningDates==="object"?data.__assessmentPlanningDates:{};
  plans[assessmentId]={date:date||"",reason:reason||""};
  data.__assessmentPlanningDates=plans;
  state.set("taskStatuses",data);
}

function clearAssessmentPlanning(assessmentId){
  const data=taskStatusData();
  if(data.__assessmentPlanningDates&&typeof data.__assessmentPlanningDates==="object"){
    delete data.__assessmentPlanningDates[assessmentId];
    state.set("taskStatuses",data);
  }
}

function assessmentNextStepsData(){return state.get("assessmentNextSteps",{});}
function assessmentNextStep(assessmentId){
  const all=assessmentNextStepsData();
  const item=all&&typeof all==="object"?all[assessmentId]:null;
  return item&&typeof item==="object"?{text:item.text||"",dueDate:item.dueDate||""}:{text:"",dueDate:""};
}
function saveAssessmentNextStep(assessmentId,text,dueDate){
  const all=assessmentNextStepsData();
  const clean=String(text||"").trim();
  if(clean)all[assessmentId]={text:clean,dueDate:dueDate||"",updatedAt:new Date().toISOString()};
  else delete all[assessmentId];
  state.set("assessmentNextSteps",all);
}
function clearAssessmentNextStep(assessmentId){
  const all=assessmentNextStepsData();
  delete all[assessmentId];
  state.set("assessmentNextSteps",all);
}

function formatPlanningDate(value){
  if(!value) return "Not set";
  const [year,month,day]=value.split("-").map(Number);
  if(!year||!month||!day) return value;
  return new Date(year,month-1,day).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"});
}

function escapeAttribute(value){
  return String(value||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}


function assessmentComponentDefinitions(id){
  if(id==="reflections")return [
    {id:"reflection1",label:"Project Reflection 1"},
    {id:"reflection2",label:"Project Reflection 2"},
    {id:"reflection3",label:"Project Reflection 3"}
  ];
  if(id==="midfinal")return [
    {id:"mid",label:"Mid Placement Self Assessment"},
    {id:"final",label:"Final Placement Self Assessment"}
  ];
  return [];
}
function assessmentComponentState(id){
  const all=state.get("assessmentComponents",{});
  const saved=all&&typeof all==="object"&&all[id]&&typeof all[id]==="object"?all[id]:{};
  const defs=assessmentComponentDefinitions(id);
  if(!defs.length)return {};
  const next={...saved};
  let changed=false;
  if(id==="reflections"){
    const growth=state.get("whereImGrowing",{});
    defs.forEach((item,index)=>{
      if(!next[item.id]){
        const legacy=getTaskStatus("reflections",index);
        const growthComplete=Boolean(growth[`project-reflection-${index+1}`]);
        next[item.id]=(legacy==="complete"||growthComplete)?"complete":legacy==="in_progress"||legacy==="waiting"?"in_progress":"not_started";
        changed=true;
      }
    });
  }
  if(id==="midfinal"){
    const growth=state.get("whereImGrowing",{});
    const legacyStatuses=(assessments.find(a=>a.id==="midfinal")?.tasks||[]).map((_,index)=>getTaskStatus("midfinal",index));
    const legacyComplete=legacyStatuses.length>0&&legacyStatuses.every(status=>status==="complete");
    if(!next.mid){next.mid=(legacyComplete||growth["mid-self-assessment"])?"complete":legacyStatuses.some(status=>status==="in_progress"||status==="waiting"||status==="complete")?"in_progress":"not_started";changed=true;}
    if(!next.final){next.final="not_started";changed=true;}
  }
  if(changed){all[id]=next;state.set("assessmentComponents",all);}
  return next;
}
function setAssessmentComponentStatus(id,componentId,status){
  const all=state.get("assessmentComponents",{});
  const current=assessmentComponentState(id);
  all[id]={...current,[componentId]:status};
  state.set("assessmentComponents",all);
  if(id==="reflections"){
    const index=assessmentComponentDefinitions(id).findIndex(item=>item.id===componentId);
    if(index>=0)setTaskStatus("reflections",index,status==="complete"?"complete":status==="in_progress"?"in_progress":"not_started");
  }
}
function assessmentComponentProgress(id){
  if(id==="integration"){
    const sessions=integrationSessions(),done=sessions.filter(item=>item.status==="completed").length;
    return {done,total:sessions.length,next:sessions.find(item=>item.status!=="completed")?.label||"",allComplete:Boolean(sessions.length)&&done===sessions.length};
  }
  const defs=assessmentComponentDefinitions(id),statuses=assessmentComponentState(id);
  const done=defs.filter(item=>statuses[item.id]==="complete").length;
  const next=defs.find(item=>statuses[item.id]!=="complete");
  return {done,total:defs.length,next:next?.label||"",allComplete:Boolean(defs.length)&&done===defs.length};
}
function assessmentComponentSummary(a){
  if(!["integration","reflections","midfinal"].includes(a.id))return "";
  const progress=assessmentComponentProgress(a.id);
  return `${progress.done} of ${progress.total} complete`;
}
function componentAssessmentManager(a){
  const defs=assessmentComponentDefinitions(a.id),statuses=assessmentComponentState(a.id);
  if(!defs.length)return "";
  return `<section class="assessment-simple-components">
    <div class="assessment-simple-components-head">
      <h2>${a.id==="reflections"?"Project Reflections":"Self Assessments"}</h2>
      <span>${assessmentComponentSummary(a)}</span>
    </div>
    <div class="assessment-component-list">${defs.map(item=>{
      const status=statuses[item.id]||"not_started";
      return `<article class="assessment-component-row ${status==="complete"?"is-complete":""}">
        <span><strong>${safeText(item.label)}</strong></span>
        <select class="assessment-component-status" data-assessment="${a.id}" data-component="${item.id}">
          <option value="not_started" ${status==="not_started"?"selected":""}>Not Started</option>
          <option value="in_progress" ${status==="in_progress"?"selected":""}>In Progress</option>
          <option value="complete" ${status==="complete"?"selected":""}>Completed</option>
        </select>
      </article>`;
    }).join("")}</div>
  </section>`;
}

function assessmentOverallStatus(a){
  if(["integration","reflections","midfinal"].includes(a.id)){
    const progress=assessmentComponentProgress(a.id);
    if(progress.allComplete)return "complete";
    if(progress.done>0)return "in_progress";
    if(a.id==="integration"&&integrationSessions().some(item=>item.status==="booked"))return "in_progress";
    if(a.id!=="integration"&&Object.values(assessmentComponentState(a.id)).some(status=>status==="in_progress"))return "in_progress";
    return "not_started";
  }
  const tasks=a.tasks||[];
  if(!tasks.length) return "not_started";
  const statuses=tasks.map((_,i)=>getTaskStatus(a.id,i));
  if(statuses.every(s=>s==="complete")) return "complete";
  if(statuses.some(s=>s==="waiting")) return "waiting";
  if(statuses.some(s=>s==="in_progress"||s==="complete")) return "in_progress";
  return "not_started";
}

function assessmentProgress(a){
  if(["integration","reflections","midfinal"].includes(a.id)){
    const progress=assessmentComponentProgress(a.id);
    return progress.total?Math.round((progress.done/progress.total)*100):0;
  }
  const tasks=a.tasks||[];
  if(!tasks.length) return 0;
  const weights={not_started:0,in_progress:.5,waiting:.5,complete:1};
  const total=tasks.reduce((sum,_,i)=>sum+(weights[getTaskStatus(a.id,i)]||0),0);
  return Math.round((total/tasks.length)*100);
}


function findToolkitTopicByName(name){
  const normalise=value=>String(value||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
  const wanted=normalise(name);
  const aliases={
    "recovery":"recovery oriented practice",
    "reflective practice":"reflective practice",
    "use of self":"use of self",
    "cultural capability and inclusion":"cultural capability inclusion",
    "research and evidence":"research evidence",
    "social policy":"social policy",
    "documentation":"documentation",
    "community development":"community development",
    "ethics and professional practice":"ethics professional practice",
    "aasw practice standards":"aasw practice standards",
    "presentation and communication":"communication"
  };
  const target=aliases[wanted] || wanted;

  for(let categoryIndex=0; categoryIndex<toolkitCategories.length; categoryIndex++){
    const category=toolkitCategories[categoryIndex];
    for(let topicIndex=0; topicIndex<category[3].length; topicIndex++){
      const topic=category[3][topicIndex];
      const topicName=normalise(topic[0]);
      const categoryName=normalise(category[1]);
      if(topicName===target || topicName.includes(target) || target.includes(topicName) || categoryName===target){
        return {categoryIndex,topicIndex};
      }
    }
  }
  return null;
}

function openToolkitTopicByName(name){
  const match=findToolkitTopicByName(name);
  if(match){
    toolkitDetail(match.categoryIndex,match.topicIndex);
    return true;
  }
  route="learn";
  render();
  const search=document.getElementById("toolkitSearch");
  if(search){
    search.value=name;
    search.dispatchEvent(new Event("input",{bubbles:true}));
  }
  return false;
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

function homeIcon(name){
  const icons={
    compass:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"></path></svg>',
    target:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="4"></circle><circle cx="12" cy="12" r="1"></circle></svg>',
    calendar:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4M8 3v4M3 10h18"></path></svg>',
    progress:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"></path></svg>',
    heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"></path></svg>',
    arrow:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>'
  };
  return `<span class="home-icon home-icon-${name}">${icons[name]||icons.compass}</span>`;
}


function smartAchievements(){
  const items=[];
  const add=(id,icon,title,detail,rank=0)=>items.push({id,icon,title,detail,rank});

  const h=hours();
  [500,400,300,250,200,100].forEach(mark=>{
    if(h>=mark)add(`hours-${mark}`,"⏱️",`${mark} Placement Hours`,`A placement milestone worth recognising.`,1000+mark);
  });

  const integration=integrationSessions();
  integration.forEach((session,index)=>{
    if(session.status==="completed")add(`integration-${session.id}`,"☕",`${session.label} Completed`,`One of your three integration sessions is done.`,900+index);
  });

  const reflectionDefs=assessmentComponentDefinitions("reflections");
  const reflectionState=assessmentComponentState("reflections");
  reflectionDefs.forEach((item,index)=>{
    if(reflectionState[item.id]==="complete")add(`project-${item.id}`,"⭐",`${item.label} Completed`,`${index+1} of 3 project reflections completed.`,940+index);
  });

  const selfDefs=assessmentComponentDefinitions("midfinal");
  const selfState=assessmentComponentState("midfinal");
  selfDefs.forEach((item,index)=>{
    if(selfState[item.id]==="complete")add(`self-${item.id}`,"📝",`${item.label} Completed`,index===0?"Mid placement self assessment is done.":"Final placement self assessment is done.",960+index);
  });

  const growth=whereImGrowingState();
  const notable=[
    ["own-consumer","🌿","Own Consumer Work","You have taken on your own consumer work."],
    ["assessment-intake","🧭","Assessment Experience","You have contributed to assessment or intake work."],
    ["group","💬","Group Facilitation","You have facilitated or co facilitated a group."],
    ["mdt","🤝","Multidisciplinary Practice","You have contributed in reviews, MDTs or case discussions."],
    ["documentation","📝","Practice Documentation","You have completed placement documentation and case notes."],
    ["project-developed","📄","Project Resources Developed","Your placement project moved from an idea into something practical."],
    ["project-senior-review","📨","Project Sent for Senior Review","Your project reached senior management review."]
  ];
  notable.forEach(([id,icon,title,detail],index)=>{
    if(growth[id])add(`growth-${id}`,icon,title,detail,700+index);
  });

  const supCount=supervisionRecords().length;
  if(supCount)add("supervision-records","☕",`${supCount} Supervision Record${supCount===1?"":"s"} Saved`,`Your supervision history is building across placement.`,820+supCount);

  return items.sort((a,b)=>b.rank-a.rank);
}

function smartNotices(){
  const notices=[];
  const followUps=reflectionSupervisionFollowUps().filter(item=>!item.followedUp);
  if(followUps.length){
    notices.push({id:"supervision",icon:"☕",title:`${followUps.length} ${followUps.length===1?"reflection is":"reflections are"} waiting for supervision`,detail:"They are already collected in your Supervision folder.",action:"Supervision"});
  }

  const recent=savedEntries().slice(0,5);
  const missingTheory=recent.filter(entry=>![...(entry.practiceConnections||[]),...(entry.theories||[])].length);
  if(recent.length>=3&&missingTheory.length>=2){
    notices.push({id:"theory",icon:"🧠",title:`${missingTheory.length} recent reflections have no Theory / Practice connection`,detail:"Only review them if a connection would strengthen the evidence.",action:"Reflect"});
  }

  const allEntries=savedEntries();
  const culturalCount=allEntries.filter(entry=>(entry.focusAreas||entry.learningOutcomes||[]).includes("culture")||(entry.evidenceTypes||[]).includes("Cultural capability")).length;
  if(allEntries.length>=5&&culturalCount===0){
    notices.push({id:"culture",icon:"🌏",title:"Cultural responsiveness has less evidence so far",detail:"Keep an eye out for a genuine example rather than creating extra work.",action:"Where I’m Growing"});
  }

  return notices.slice(0,2);
}

function homeSmartPanel(){
  const achievement=smartAchievements()[0]||null;
  if(!achievement)return "";
  return `<section class="home-celebrate-compact">
    <span class="home-highlight-icon">✨</span>
    <span class="home-highlight-copy">
      <small>Celebrate</small>
      <strong>${safeText(achievement.title)}</strong>
    </span>
    <button type="button" class="home-highlight-link" id="viewAchievements">View ›</button>
  </section>`;
}
function todayPage(){
  const info=placementInfo(), h=hours(), totalHours=placementTotalHours(), current=nextAssessment(info,h), stage=currentStage(info), g=greeting();
  const remaining=Math.max(0,totalHours-h);
  const progress=Math.min(100,Math.round((h/totalHours)*100));
  const status=taskStatuses[assessmentOverallStatus(current)];
  const currentComponents=["integration","reflections","midfinal"].includes(current.id)?assessmentComponentProgress(current.id):null;
  const customNext=assessmentNextStep(current.id);
  const currentDisplayTitle=customNext.text||currentComponents?.next||current.title;
  const currentDisplayWhen=customNext.text
    ? `${current.title}${customNext.dueDate?` · Due ${formatPlanningDate(customNext.dueDate)}`:""}`
    : (currentComponents?.next?`${current.title} · ${assessmentComponentSummary(current)}`:current.when);
  const dayLabel=new Intl.DateTimeFormat('en-AU',{weekday:'long',day:'numeric',month:'long'}).format(new Date());
  const placementLabel=info.started?`Placement week ${info.week}`:(info.notConfigured?`Add your placement start date in My Journey`:`Placement begins in ${info.daysUntil} days`);
  return `
    <section class="home-welcome">
      <div class="home-welcome-copy">
        <span class="home-date">${dayLabel}</span>
        <h1>${g.title}</h1>
        <p>${g.subtitle}</p>
        <span class="home-placement-label">${placementLabel}</span>
      </div>
      <div class="home-compass-mark">${homeIcon('compass')}</div>
    </section>

    <section class="home-focus-card">
      <div class="home-focus-topline">
        <span class="home-focus-label">What’s next</span>
        <span class="status-inline ${status.className}">${status.icon} ${status.label}</span>
      </div>
      <h2>${currentDisplayTitle}</h2>
      <p>${currentDisplayWhen}</p>
      <div class="home-focus-action">
        <div><span>Start here</span><strong>${stage.focus[0]}</strong></div>
        <button class="home-primary-action" id="openCurrentAssessment" data-id="${current.id}" aria-label="Open ${current.title}">${homeIcon('arrow')}</button>
      </div>
    </section>

    <section class="home-quick-access home-quick-access-minimal" aria-label="Quick access">
      <div class="home-quick-access-grid">
        <button type="button" class="home-quick-access-card" id="homeCreateSupervision">
          <span class="home-quick-access-icon">☕</span>
          <span><strong>Supervision Record</strong></span>
          <b>›</b>
        </button>
        <button type="button" class="home-quick-access-card" id="homePracticeFramework">
          <span class="home-quick-access-icon">🧭</span>
          <span><strong>Practice Framework</strong></span>
          <b>›</b>
        </button>
      </div>
    </section>

    <section class="home-snapshot-card">
      <div class="home-snapshot-heading">
        <div><span class="home-kicker">Placement snapshot</span><h2>Your progress at a glance</h2></div>
        <strong>${progress}%</strong>
      </div>
      <div class="home-progress-track"><span style="width:${progress}%"></span></div>
      <div class="home-snapshot-stats">
        <div><strong>${h.toFixed(1)}</strong><span>hours completed</span></div>
        <div><strong>${remaining.toFixed(1)}</strong><span>hours remaining</span></div>
        <div><strong>${info.started?info.week:'—'}</strong><span>placement week</span></div>
      </div>
    </section>

    ${quickHoursCard()}

    ${homeSmartPanel()}

    <section class="home-care-card">
      <div class="home-care-icon">${homeIcon('heart')}</div>
      <div><span class="home-kicker">Take care</span><p>${selfcare[new Date().getDay()]}</p></div>
    </section>`;
}
let lastSavedReflection=null;
const reflectionTheoryOptions=["Recovery Oriented Practice","Trauma Informed Practice","Strengths Based Practice","Person Centred Practice","Systems Theory","Ecological Systems Theory","CHIME","Motivational Interviewing","Solution Focused Practice","Narrative Practice","Anti Oppressive Practice","Rights Based Practice","Crisis Intervention"];
const reflectionCodeValues=["Respect for Persons","Social Justice","AASW Code of Ethics"];
const reflectionEthicsOptions=["Self Determination","Human Rights","Dignity","Informed Consent","Confidentiality","Privacy","Professional Boundaries","Duty of Care","Supported Decision Making","Cultural Safety","Advocacy","Equity","Accountability","Supported Decision Making"];
const reflectionStandards=[
  ["1","Values and ethics"],["2","Professional conduct"],["3","Culturally responsive and inclusive practice"],["4","Knowledge for practice"],["5","Applying knowledge to practice"],["6","Communication and interpersonal skills"],["7","Information recording and sharing"],["8","Professional development and supervision"],["9","Professional leadership"]
];
const reflectionTheoryContextMap={
  "Recovery group":["Recovery Oriented Practice","CHIME","Strengths Based Practice","Person Centred Practice"],
  "One to one conversation":["Person Centred Practice","Strengths Based Practice","Motivational Interviewing","Trauma Informed Practice"],
  "Documentation":["Systems Theory","Rights Based Practice","Anti Oppressive Practice"],
  "Risk assessment":["Crisis Intervention","Trauma Informed Practice","Rights Based Practice","Systems Theory"],
  "Safety planning":["Crisis Intervention","Trauma Informed Practice","Strengths Based Practice","Person Centred Practice"],
  "Group facilitation":["Recovery Oriented Practice","CHIME","Strengths Based Practice","Person Centred Practice"],
  "Home visit":["Ecological Systems Theory","Systems Theory","Trauma Informed Practice","Strengths Based Practice"],
  "MDT":["Systems Theory","Ecological Systems Theory","Rights Based Practice","Anti Oppressive Practice"],
  "Assessment":["Person Centred Practice","Strengths Based Practice","Systems Theory","Ecological Systems Theory"],
  "Advocacy":["Rights Based Practice","Anti Oppressive Practice","Systems Theory","Strengths Based Practice"],
  "Community engagement":["Ecological Systems Theory","Systems Theory","Anti Oppressive Practice","Rights Based Practice"],
  "Crisis":["Crisis Intervention","Trauma Informed Practice","Person Centred Practice","Strengths Based Practice"],
  "Other":["Person Centred Practice","Strengths Based Practice","Systems Theory"]
};
const reflectionEthicsContextMap={
  "Choice":["Respect for Persons","Self Determination","Supported Decision Making","Informed Consent","Supported Decision Making"],
  "Respect":["Respect for Persons","Dignity","Human Rights","Equity"],
  "Safety":["AASW Code of Ethics","Duty of Care","Supported Decision Making","Accountability"],
  "Trust":["AASW Code of Ethics","Confidentiality","Privacy","Accountability"],
  "Confidentiality":["AASW Code of Ethics","Confidentiality","Privacy","Informed Consent"],
  "Boundaries":["AASW Code of Ethics","Professional Boundaries","Accountability","Duty of Care"],
  "Advocacy":["Social Justice","Advocacy","Equity","Human Rights"],
  "Culture":["Respect for Persons","Cultural Safety","Equity","Self Determination"],
  "Rights":["Social Justice","Human Rights","Self Determination","Advocacy"],
  "Relationships":["Respect for Persons","Dignity","Professional Boundaries","Trust"]
};
const reflectionStandardContextMap={
  "Observed practice":["Practice Standard 4: Knowledge for practice","Practice Standard 5: Applying knowledge to practice","Practice Standard 8: Professional development and supervision"],
  "Engaged with a consumer":["Practice Standard 1: Values and ethics","Practice Standard 5: Applying knowledge to practice","Practice Standard 6: Communication and interpersonal skills"],
  "Completed documentation":["Practice Standard 2: Professional conduct","Practice Standard 7: Information recording and sharing"],
  "Participated in a group":["Practice Standard 5: Applying knowledge to practice","Practice Standard 6: Communication and interpersonal skills"],
  "Attended supervision":["Practice Standard 2: Professional conduct","Practice Standard 8: Professional development and supervision"],
  "Observed assessment":["Practice Standard 4: Knowledge for practice","Practice Standard 5: Applying knowledge to practice"],
  "Discussed risk":["Practice Standard 1: Values and ethics","Practice Standard 4: Knowledge for practice","Practice Standard 5: Applying knowledge to practice"],
  "Worked with another professional":["Practice Standard 2: Professional conduct","Practice Standard 6: Communication and interpersonal skills","Practice Standard 9: Professional leadership"],
  "Completed training":["Practice Standard 4: Knowledge for practice","Practice Standard 8: Professional development and supervision"],
  "Asked questions":["Practice Standard 2: Professional conduct","Practice Standard 8: Professional development and supervision"]
};
const deeperReflectionQuestions=["What surprised you?","What assumptions did you bring?","How did power influence this situation?","What strengths did the consumer demonstrate?","What ethical tension existed?","How did organisational systems influence practice?","What role did culture play?","What question will you take to supervision?","What might another professional have noticed?","What would you do differently next time?"];
const reflectionCompassLenses=[
  {id:"theory",title:"Theory and frameworks",prompt:"What helps explain what was happening?",quick:["Recovery Oriented Practice","Strengths Based Practice","Trauma Informed Practice","Systems and Ecological Theory","Person Centred Practice","Anti Oppressive Practice"],all:["Recovery Oriented Practice","CHIME","Strengths Based Practice","Trauma Informed Practice","Person Centred Practice","Systems and Ecological Theory","Narrative Practice","Feminist Social Work","Anti Oppressive Practice","Critical Social Work","Empowerment Theory","Rights Based Practice","Social Determinants of Health","Attachment Theory","Psychosocial Development","Social Learning Theory","Cognitive Behavioural Theory","Ethics of Care"]},
  {id:"method",title:"Methods and approaches",prompt:"What practice approach did you use or observe?",quick:["Motivational Interviewing","Solution Focused Practice","Crisis Intervention","Harm Reduction","Task Centred Practice","Psychosocial Rehabilitation"],all:["Motivational Interviewing","Solution Focused Practice","Crisis Intervention","Harm Reduction","Task Centred Practice","Psychosocial Rehabilitation","Group Work","Case Management","Family Inclusive Practice","Recovery Planning","Goal Oriented Practice","Advocacy"]},
  {id:"skills",title:"Practice skills",prompt:"What did you actually do, observe or need?",quick:["Active listening","Engagement and rapport","Assessment","De escalation","Safety planning","Documentation"],all:["Active listening","Engagement and rapport","Open questions","Summarising","Assessment","Risk assessment","Safety planning","De escalation","Goal setting","Group facilitation","Advocacy","Case management","Interprofessional collaboration","Documentation","Report writing","Referral and warm handover","Difficult conversations","Professional communication"]},
  {id:"values",title:"Values",prompt:"What mattered in the way the person was treated?",quick:["Respect","Human dignity","Self determination","Social justice","Integrity","Hope"],all:["Respect","Human dignity","Self determination","Social justice","Integrity","Hope","Compassion","Equity","Participation","Accountability","Professionalism","Cultural safety"]},
  {id:"ethics",title:"Ethics",prompt:"Was there a tension involving rights, responsibility or professional conduct?",quick:["Informed consent","Confidentiality","Professional boundaries","Duty of care","Dignity of risk","Supported decision making"],all:["Informed consent","Confidentiality","Privacy","Professional boundaries","Duty of care","Dignity of risk","Supported decision making","Least restrictive practice","Mandatory reporting","Information sharing","Conflicts of interest","Ethical decision making","Human rights"]},
  {id:"assessment",title:"Assessment and judgement",prompt:"What information shaped understanding or decisions?",quick:["Holistic assessment","Risk assessment","Strengths and needs","Professional judgement","Formulation","Collaborative planning"],all:["Holistic assessment","Psychosocial assessment","Risk assessment","Strengths and needs","Professional judgement","Formulation","Collaborative planning","Goal assessment","Mental state observations","Family and carer perspectives","Cultural considerations","Reviewing change over time"]},
  {id:"useOfSelf",title:"Use of self",prompt:"How did your presence, communication or reactions shape the interaction?",quick:["Rapport","Self awareness","Emotional regulation","Use of humour","Boundaries","Sitting with silence"],all:["Rapport","Self awareness","Emotional regulation","Use of humour","Boundaries","Sitting with silence","Tone and body language","Curiosity","Authenticity","Managing assumptions","Power and authority","Professional identity"]},
  {id:"culture",title:"Culture, identity and inclusion",prompt:"What identities, culture, power or access needs were relevant?",quick:["Cultural humility","Cultural safety","Intersectionality","Aboriginal and Torres Strait Islander practice","Disability inclusion","LGBTQIA+ affirmative practice"],all:["Cultural humility","Cultural safety","Intersectionality","Aboriginal and Torres Strait Islander practice","Culturally responsive practice","Decolonising practice","CALD practice","Working with interpreters","Refugee and asylum seeker practice","Disability inclusion","Neurodiversity affirming practice","LGBTQIA+ affirmative practice","Anti racist practice"]},
  {id:"systems",title:"Systems and context",prompt:"What wider relationships, services or structures influenced the situation?",quick:["Family and relationships","Service systems","Organisational policy","Housing and poverty","Power and inequality","Interagency coordination"],all:["Family and relationships","Service systems","Organisational policy","Housing and poverty","Power and inequality","Interagency coordination","Mental health system","Child protection","Domestic and family violence","Justice system","NDIS interface","Rural and remote access","Social determinants of health","Legislation and policy"]},
  {id:"supervision",title:"Supervision and learning",prompt:"Does anything need checking, feedback or further learning?",quick:["Discuss in supervision","Seek feedback","Observe again","Read a Toolkit topic","Clarify policy","Practise a skill"],all:["Discuss in supervision","Seek feedback","Observe again","Read a Toolkit topic","Clarify policy","Practise a skill","Ask another discipline","Review documentation","Find research evidence","No follow up needed"]},
  {id:"research",title:"Research and evidence",prompt:"Was evidence, policy or evaluation part of the interaction?",quick:["Evidence informed practice","Policy or legislation","Critical appraisal","Outcome evaluation","Practice standards","Research question"],all:["Evidence informed practice","Policy or legislation","Critical appraisal","Outcome evaluation","Practice standards","Research question","Service evaluation","Data collection","Lived experience evidence","Organisational procedure"]}
];

const REFLECTION_DRAFT_KEY="reflectionCompassDraft";
const reflectionInvolvementOptions=["Observed","Involved","Led"];
const reflectionOutcomeOptions=[
  {id:"learned",label:"Learned something new"},
  {id:"confidence",label:"Built confidence"},
  {id:"skill",label:"Practised a skill"},
  {id:"changed",label:"Changed my thinking",prompt:"What changed?"},
  {id:"feedback",label:"Got feedback",prompt:"What feedback is worth remembering?"},
  {id:"practice",label:"Need more practice",prompt:"What do you still want to practise?"}
];
const reflectionFocusOptions=[
  {id:"values",label:"Values and judgement",lo:"LO1 · Values and ethics"},
  {id:"culture",label:"Culture and inclusion",lo:"LO2 · Culturally responsive practice"},
  {id:"knowledge",label:"Knowledge",lo:"LO3 · Knowledge"},
  {id:"communication",label:"Communication and working with people",lo:"LO4 · Skills and use of self"},
  {id:"assessment",label:"Assessment and documentation",lo:"LO5 · Methods and processes"},
  {id:"development",label:"My development as a social worker",lo:"LO6 · Awareness of self and supervision"},
  {id:"unsure",label:"Not sure",lo:"Sort later"}
];
const reflectionPracticeQuick=["Recovery Oriented Practice","Strengths Based Practice","Trauma Informed Practice","Person Centred Practice","Systems and Ecological Theory","Anti Oppressive Practice","Rights Based Practice","Cultural Humility and Safety"];
const reflectionPracticeLibrary=[...new Set([
  ...reflectionCompassLenses.find(item=>item.id==="theory").all,
  ...reflectionCompassLenses.find(item=>item.id==="method").all,
  "Relationship Based Practice","Intersectionality","Cultural Humility","Cultural Safety","Culturally Responsive Practice","Decolonising Practice","Aboriginal and Torres Strait Islander Self Determination","Trauma and Violence Informed Care","Supported Decision Making","Biopsychosocial Framework","Psychosocial Framework","Recovery Model","Family Inclusive Practice","Social Justice Framework","Structural Social Work","Ecological Perspective","Solution Focused Brief Therapy","Cognitive Behavioural Approaches","Attachment Informed Practice","Harm Minimisation","Strengths Perspective","Empowerment Practice"
])].sort((a,b)=>a.localeCompare(b));
const reflectionTheoryCueMap={
  "Choice and autonomy":["Recovery Oriented Practice","Person Centred Practice","Rights Based Practice","Supported Decision Making","Empowerment Theory"],
  "Strengths and capabilities":["Strengths Based Practice","Recovery Oriented Practice","Empowerment Theory","Solution Focused Practice"],
  "Safety and trust":["Trauma Informed Practice","Trauma and Violence Informed Care","Relationship Based Practice","Person Centred Practice"],
  "Power or inequality":["Anti Oppressive Practice","Critical Social Work","Feminist Social Work","Intersectionality","Structural Social Work"],
  "Family and systems":["Systems and Ecological Theory","Ecological Perspective","Family Inclusive Practice","Social Determinants of Health"],
  "Culture and identity":["Cultural Humility","Cultural Safety","Culturally Responsive Practice","Intersectionality","Decolonising Practice"],
  "Relationship and rapport":["Relationship Based Practice","Person Centred Practice","Strengths Based Practice","Ethics of Care"],
  "Goals and motivation":["Motivational Interviewing","Solution Focused Practice","Goal Oriented Practice","Recovery Oriented Practice"],
  "Thoughts and behaviours":["Cognitive Behavioural Approaches","Social Learning Theory","Motivational Interviewing"],
  "Trauma history":["Trauma Informed Practice","Trauma and Violence Informed Care","Attachment Informed Practice"],
  "Rights and access":["Rights Based Practice","Anti Oppressive Practice","Social Justice Framework","Advocacy","Social Determinants of Health"]
};
function selectedReflectionButtons(selector){return [...document.querySelectorAll(`${selector}.selected`)].map(button=>button.dataset.value);}
function reflectionDraft(){return state.get(REFLECTION_DRAFT_KEY,{answer:"",involvement:[],outcomes:[],focus:[],practiceConnections:[],projectRelated:false,supervisionFollowUp:false,reflectionNote:"",practiceNote:"",criticalPrompt:"",criticalAnswer:"",updatedAt:""});}
function captureReflectionDraft(){
  const draft={
    answer:document.getElementById("answer")?.value||"",
    involvement:selectedReflectionButtons(".reflection-involvement-chip"),
    outcomes:selectedReflectionButtons(".reflection-outcome-chip"),
    focus:selectedReflectionButtons(".reflection-focus-chip"),
    practiceConnections:selectedReflectionButtons(".reflection-practice-chip"),
    projectRelated:document.getElementById("reflectionProjectYes")?.classList.contains("selected")||false,
    supervisionFollowUp:document.getElementById("reflectionSupervisionFollowUp")?.classList.contains("selected")||false,
    reflectionNote:document.getElementById("reflectionNote")?.value||"",
    practiceNote:document.getElementById("reflectionPracticeNote")?.value||"",
    criticalPrompt:document.getElementById("criticalReflectionPrompt")?.textContent||"",
    criticalAnswer:document.getElementById("criticalReflectionAnswer")?.value||"",
    updatedAt:new Date().toISOString()
  };
  state.set(REFLECTION_DRAFT_KEY,draft);return draft;
}
function clearReflectionDraft(){state.set(REFLECTION_DRAFT_KEY,{answer:"",involvement:[],outcomes:[],focus:[],practiceConnections:[],projectRelated:false,supervisionFollowUp:false,reflectionNote:"",practiceNote:"",criticalPrompt:"",criticalAnswer:"",updatedAt:""});state.set("editingReflectionId",null);}
function reflectionPromptForSelection(){
  const selected=selectedReflectionButtons(".reflection-outcome-chip");
  return reflectionOutcomeOptions.find(option=>selected.includes(option.id)&&option.prompt)?.prompt||"";
}
function updateReflectionPrompt(){
  const wrap=document.getElementById("reflectionPromptWrap"),label=document.getElementById("reflectionPromptLabel");
  if(!wrap||!label)return;
  const prompt=reflectionPromptForSelection();
  label.textContent=prompt;
  wrap.classList.toggle("hidden",!prompt);
}
function updatePracticeConnectionNote(){
  const wrap=document.getElementById("reflectionPracticeNoteWrap");
  if(!wrap)return;
  wrap.classList.toggle("hidden",selectedReflectionButtons(".reflection-practice-chip").length===0);
}
function filterPracticeLibrary(){
  const q=(document.getElementById("practiceLibrarySearch")?.value||"").trim().toLowerCase();
  document.querySelectorAll(".reflection-practice-library-chip").forEach(button=>button.classList.toggle("hidden",q&&!button.dataset.value.toLowerCase().includes(q)));
}
function renderTheorySuggestions(){
  const selected=selectedReflectionButtons(".reflection-theory-cue-chip"),box=document.getElementById("theorySuggestions");
  if(!box)return;
  const suggestions=[...new Set(selected.flatMap(cue=>reflectionTheoryCueMap[cue]||[]))].slice(0,8);
  box.innerHTML=suggestions.length?`<small>Possible connections to consider</small><div class="reflection-button-grid">${suggestions.map(item=>`<button type="button" class="reflection-choice-chip reflection-theory-suggestion" data-value="${safeText(item)}">${safeText(item)}</button>`).join("")}</div>`:`<small>Tap what stood out and Practice Compass will suggest possible connections.</small>`;
  box.querySelectorAll(".reflection-theory-suggestion").forEach(button=>button.addEventListener("click",()=>{
    const value=button.dataset.value;
    document.querySelectorAll(`.reflection-practice-chip[data-value="${CSS.escape(value)}"]`).forEach(item=>item.classList.add("selected"));
    updatePracticeConnectionNote();captureReflectionDraft();
  }));
}
function setCriticalReflectionPrompt(prompt=""){
  const wrap=document.getElementById("criticalReflectionWrap"),label=document.getElementById("criticalReflectionPrompt");
  if(!wrap||!label)return;
  const chosen=prompt||deeperReflectionQuestions[Math.floor(Math.random()*deeperReflectionQuestions.length)];
  label.textContent=chosen;wrap.classList.remove("hidden");captureReflectionDraft();
}
function restoreReflectionDraft(){
  const draft=reflectionDraft();
  const answer=document.getElementById("answer"),note=document.getElementById("reflectionNote"),practiceNote=document.getElementById("reflectionPracticeNote"),criticalAnswer=document.getElementById("criticalReflectionAnswer");
  if(answer)answer.value=draft.answer||"";
  if(note)note.value=draft.reflectionNote||"";
  if(practiceNote)practiceNote.value=draft.practiceNote||"";
  if(criticalAnswer)criticalAnswer.value=draft.criticalAnswer||"";
  const restoredInvolvement=[...new Set((draft.involvement||[]).map(value=>["Participated","Completed","Learned"].includes(value)?"Involved":value))];
  restoredInvolvement.forEach(value=>document.querySelector(`.reflection-involvement-chip[data-value="${CSS.escape(value)}"]`)?.classList.add("selected"));
  (draft.outcomes||[]).forEach(value=>document.querySelector(`.reflection-outcome-chip[data-value="${CSS.escape(value)}"]`)?.classList.add("selected"));
  (draft.focus||[]).forEach(value=>document.querySelector(`.reflection-focus-chip[data-value="${CSS.escape(value)}"]`)?.classList.add("selected"));
  (draft.practiceConnections||[]).forEach(value=>document.querySelectorAll(`.reflection-practice-chip[data-value="${CSS.escape(value)}"]`).forEach(item=>item.classList.add("selected")));
  if(draft.projectRelated)document.getElementById("reflectionProjectYes")?.classList.add("selected");else document.getElementById("reflectionProjectNo")?.classList.add("selected");
  if(draft.supervisionFollowUp)document.getElementById("reflectionSupervisionFollowUp")?.classList.add("selected");
  updateReflectionPrompt();updatePracticeConnectionNote();
  if(draft.criticalPrompt)setCriticalReflectionPrompt(draft.criticalPrompt);
}
function reflectionInsights(entries){
  if(!entries.length)return "Your practice insights will grow naturally as you save reflections.";
  const counts={};entries.forEach(entry=>(entry.learningOutcomes||entry.focusAreas||[]).forEach(item=>counts[item]=(counts[item]||0)+1));
  const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  if(!sorted.length)return "Your reflections are beginning to show the social worker you are becoming.";
  const label=reflectionFocusOptions.find(option=>option.id===sorted[0][0])?.label||sorted[0][0];
  return `You have been building evidence around ${label.toLowerCase()}.`;
}
function reflectionLibrary(entries){
  if(!entries.length)return `<section class="reflection-empty-state">🌱 Your reflection library will grow as you save learning moments.</section>`;
  const libraryOpen=state.get("reflectionLibraryOpen",false);
  return `<details class="reflection-library reflection-library-collapsible" id="reflectionLibrary" ${libraryOpen?"open":""}><summary class="reflection-library-summary"><span><span class="reflection-library-summary-icon">📚</span><span><strong>Previous Reflections</strong><small>${entries.length} saved learning moment${entries.length===1?"":"s"}</small></span></span><span class="reflection-library-summary-arrow">›</span></summary><div class="reflection-library-body"><div class="reflection-library-tools"><input id="reflectionSearch" class="input" placeholder="Search reflections"><button type="button" class="text-link reflection-collapse-all" id="collapseAllReflections">Collapse All</button></div><div id="reflectionLibraryList">${entries.map(e=>{const tags=[...(e.involvement||[]),...(e.outcomeTags||[]),...(e.learningOutcomeLabels||[]),...(e.theories||[]),...(e.values||[]),...(e.ethics||[]),...(e.practiceStandards||[]),...(e.evidenceTypes||[])];const terms=[e.answer,e.moment,e.reflectionNote,...tags].filter(Boolean).join(" ");const preview=(e.moment||e.answer||"").replace(/\s+/g," ").trim();return `<details class="reflection-library-item" data-search="${safeText(terms.toLowerCase())}"><summary><span><strong>${safeText(e.date||"Reflection")}</strong><small>${safeText(preview.slice(0,90)||"Learning moment")}${preview.length>90?"…":""}</small></span><span>›</span></summary><div class="reflection-library-entry-body"><p>${safeText((e.moment||e.answer||"").slice(0,500))}</p>${e.reflectionNote?`<p class="reflection-library-note"><strong>Worth remembering:</strong> ${safeText(e.reflectionNote)}</p>`:""}${e.practiceNote?`<p class="reflection-library-note"><strong>Practice connection:</strong> ${safeText(e.practiceNote)}</p>`:""}${e.criticalAnswer?`<p class="reflection-library-note"><strong>${safeText(e.criticalPrompt||"Critical reflection")}</strong><br>${safeText(e.criticalAnswer)}</p>`:""}${e.supervisionFollowUp?`<p class="reflection-supervision-tag">☕ Bring to Supervision</p>`:""}<div class="reflection-tag-list">${tags.slice(0,8).map(x=>`<span>${safeText(x)}</span>`).join("")}</div><button type="button" class="btn secondary reflection-edit-button" data-edit-reflection="${e.id}">Edit Reflection</button></div></details>`}).join("")}</div></div></details>`;
}
function reflectionChipGroup(options,className,extra=""){
  return `<div class="reflection-button-grid ${extra}">${options.map(option=>{const value=typeof option==="string"?option:option.id;const label=typeof option==="string"?option:option.label;return `<button type="button" class="reflection-choice-chip ${className}" data-value="${safeText(value)}">${safeText(label)}</button>`}).join("")}</div>`;
}
function journalPage(){
  const entries=savedEntries();
  const editingId=state.get("editingReflectionId",null);
  return `<section class="welcome-block reflection-welcome"><div class="eyebrow">Reflect</div><h1>💭 Reflect</h1><p class="welcome-text">Capture it once. Practice Compass will organise it for assessment later.</p></section>
  ${editingId?`<section class="reflection-editing-note">Editing Saved Reflection</section>`:(lastSavedReflection?`<section class="reflection-saved-note">✨ Reflection saved and added to your placement evidence.</section>`:"")}
  <form class="reflection-simple reflection-quick-flow" id="reflectionForm" onsubmit="return false">
    <section class="conversation-card reflection-journal-card reflection-primary-card">
      <div class="reflection-step-number">1</div>
      <label for="answer"><strong>What Happened?</strong><span>One or two lines is enough. Keep client information de identified.</span></label>
      <textarea id="answer" class="textarea reflection-main-journal" placeholder="e.g. Sat in on an MDT and noticed how the team approached a complex decision."></textarea>
      <small class="reflection-draft-status" id="reflectionDraftStatus">Draft saves automatically on this device</small>
    </section>

    <section class="conversation-card reflection-choice-card">
      <div class="reflection-section-heading"><span class="reflection-step-number">2</span><div><h2>My Involvement</h2><p>Tap anything that fits.</p></div></div>
      ${reflectionChipGroup(reflectionInvolvementOptions,"reflection-involvement-chip")}
    </section>

    <section class="conversation-card reflection-choice-card">
      <div class="reflection-section-heading"><span class="reflection-step-number">3</span><div><h2>What Did This Show Me?</h2><p>Quick taps only. Add detail only when it will help later.</p></div></div>
      ${reflectionChipGroup(reflectionOutcomeOptions,"reflection-outcome-chip")}
      <div class="reflection-adaptive-note hidden" id="reflectionPromptWrap"><label for="reflectionNote"><strong id="reflectionPromptLabel"></strong><span>Optional · one sentence is enough</span></label><textarea id="reflectionNote" class="textarea reflection-mini-note" placeholder="Add the detail you will want to remember at assessment time..."></textarea></div>
    </section>

    <section class="conversation-card reflection-choice-card reflection-secondary-card">
      <div class="reflection-section-heading"><span class="reflection-step-number">4</span><div><h2>What Was It Mostly About?</h2><p>Choose one or more. These link to your Learning Plan behind the scenes.</p></div></div>
      <div class="reflection-button-grid reflection-focus-grid">${reflectionFocusOptions.map(option=>`<button type="button" class="reflection-choice-chip reflection-focus-chip" data-value="${safeText(option.id)}"><span>${safeText(option.label)}</span><small>${safeText(option.lo)}</small></button>`).join("")}</div>
    </section>

    <section class="conversation-card reflection-choice-card reflection-practice-connection-card">
      <div class="reflection-section-heading"><span class="reflection-step-number">5</span><div><h2>Theory / Practice Connection</h2><p>Optional</p></div></div>
      <div class="reflection-button-grid reflection-practice-quick-grid">
        ${[
          ["Recovery Oriented Practice","Recovery"],
          ["Strengths Based Practice","Strengths"],
          ["Trauma Informed Practice","Trauma Informed"],
          ["Person Centred Practice","Person Centred"]
        ].map(([value,label])=>`<button type="button" class="reflection-choice-chip reflection-practice-chip reflection-practice-quick-chip" data-value="${safeText(value)}">${safeText(label)}</button>`).join("")}
      </div>
      <div class="reflection-theory-actions"><button type="button" class="text-link" id="openPracticeLibrary">More Theories</button><button type="button" class="text-link" id="helpIdentifyTheory">Help Me Identify It</button></div>
      <div class="reflection-practice-note hidden" id="reflectionPracticeNoteWrap"><label for="reflectionPracticeNote"><strong>How did you see this in practice?</strong><span>Optional · one sentence is enough</span></label><textarea id="reflectionPracticeNote" class="textarea reflection-mini-note" placeholder="e.g. The consumer was given choice about family involvement rather than staff deciding for them."></textarea></div>
      <div class="reflection-theory-panel hidden" id="practiceLibraryPanel"><div class="reflection-theory-panel-head"><strong>More Theories and Frameworks</strong><button type="button" class="text-link" id="closePracticeLibrary">Close</button></div><input id="practiceLibrarySearch" class="input" placeholder="Search theory or framework"><div class="reflection-button-grid reflection-practice-library">${reflectionPracticeLibrary.map(item=>`<button type="button" class="reflection-choice-chip reflection-practice-chip reflection-practice-library-chip" data-value="${safeText(item)}">${safeText(item)}</button>`).join("")}</div></div>
      <div class="reflection-theory-panel hidden" id="theoryHelperPanel"><div class="reflection-theory-panel-head"><strong>What stood out most?</strong><button type="button" class="text-link" id="closeTheoryHelper">Close</button></div><p class="reflection-theory-helper-copy">Tap one or more. These are clues, not a test.</p>${reflectionChipGroup(Object.keys(reflectionTheoryCueMap),"reflection-theory-cue-chip")}<div class="reflection-theory-suggestions" id="theorySuggestions"><small>Tap what stood out and Practice Compass will suggest possible connections.</small></div></div>
    </section>

    <section class="conversation-card reflection-choice-card reflection-critical-card">
      <div class="reflection-section-heading"><span class="reflection-step-number">6</span><div><h2>Think a Little Deeper</h2><p>Optional critical reflection</p></div></div>
      <div class="reflection-critical-toggle"><button type="button" class="btn secondary reflection-critical-button" id="thinkDeeper">Choose a Prompt <span aria-hidden="true">›</span></button></div>
      <div class="reflection-adaptive-note hidden" id="criticalReflectionWrap"><div class="reflection-critical-head"><label for="criticalReflectionAnswer"><strong id="criticalReflectionPrompt"></strong><span>Optional · one or two lines is enough</span></label><button type="button" class="text-link" id="anotherCriticalPrompt">Another Prompt</button></div><textarea id="criticalReflectionAnswer" class="textarea reflection-mini-note" placeholder="Add what you want to remember..."></textarea></div>
    </section>

    <section class="conversation-card reflection-routing-card">
      <div class="reflection-routing-row">
        <strong>Part of My Project?</strong>
        <div class="reflection-binary"><button type="button" class="reflection-choice-chip reflection-project-chip" id="reflectionProjectYes" data-value="yes">Yes</button><button type="button" class="reflection-choice-chip reflection-project-chip" id="reflectionProjectNo" data-value="no">No</button></div>
      </div>
      <div class="reflection-routing-row">
        <strong>Bring to Supervision?</strong>
        <button type="button" class="reflection-choice-chip reflection-supervision-chip" id="reflectionSupervisionFollowUp">Add</button>
      </div>
    </section>
    <button class="btn reflection-save-button" id="saveEntry">${editingId?"Update Reflection":"Save Reflection"}</button>
  </form>
  <details class="reflection-growth-note reflection-insight-collapsible" id="reflectionInsight" ${state.get("reflectionInsightOpen",false)?"open":""}><summary><span><span>🌿</span><span><strong>Reflection insight</strong><small>A pattern from your saved reflections</small></span></span><span class="reflection-library-summary-arrow">›</span></summary><div class="reflection-insight-body"><p>${safeText(reflectionInsights(entries))}</p></div></details>
  ${reflectionLibrary(entries)}`;
}
function assessmentPage(){
  const info=placementInfo(), h=hours(), stage=currentStage(info);
  const orderedAssessments=assessmentPriority(info,h)
    .map(id=>assessments.find(item=>item.id===id))
    .filter(Boolean);
  // Timesheets remain available through Home quick entry and Placement records.
  // They are not repeated in the assessment list.
  const visibleAssessments=orderedAssessments.filter(a=>a.id!=="timesheets");
  const activeAssessments=visibleAssessments.filter(a=>assessmentOverallStatus(a)!=="complete");
  const completedAssessments=visibleAssessments.filter(a=>assessmentOverallStatus(a)==="complete");

  const assessmentRow=a=>{
    const status=assessmentOverallStatus(a);
    const meta=taskStatuses[status];
    const componentSummary=assessmentComponentSummary(a);
    return `<article class="native-assessment-row assessment-row-compact">
      <button class="native-assessment-open assessment" data-id="${a.id}" aria-label="Open ${a.title}">
        <span class="native-assessment-icon" aria-hidden="true">${a.icon}</span>
        <span class="native-assessment-copy">
          <strong>${a.title}</strong>
          <span class="assessment-row-meta"><span class="status-inline ${meta.className}">${meta.label}</span>${componentSummary?`<small>${componentSummary}</small>`:""}</span>
        </span>
        <span class="native-assessment-action"><b>›</b></span>
      </button>
    </article>`;
  };

  const projectAssessments=activeAssessments.filter(a=>a.id==="project"||a.id==="reflections");
  const standardAssessments=activeAssessments.filter(a=>a.id!=="project"&&a.id!=="reflections");
  const placementTiming=info.started?`Week ${info.week}`:"Starts 20 July";
  const hoursStarted=h>0;

  return `
    <div class="placement-native-calm">
      <section class="placement-native-heading placement-native-heading-compact">
        <div class="eyebrow">🌱 Placement</div>
        <h1>My Placement</h1>
        <p>Assessment progress, evidence and placement records.</p>
      </section>

      <section class="placement-native-overview placement-native-overview-compact" aria-label="Placement overview">
        <div class="placement-overview-line">
          <div><span>Placement</span><strong>${safeText(placementProfile().agency||"My placement")}</strong><small>${safeText(placementProfile().service||"Add placement details in My Journey")}</small></div>
          <div><span>${info.started?"Current week":"Starts"}</span><strong>${placementTiming}</strong></div>
        </div>
        <div class="placement-hours-line">
          <span><small>Hours</small><strong>${hoursStarted?`${h.toFixed(1)} / ${placementTotalHours()}`:"Not started"}</strong></span>
          <span><small>Stage</small><strong>${stage.title}</strong></span>
        </div>
        ${hoursStarted?`<div class="placement-native-hours-track" aria-label="${Math.round((h/placementTotalHours())*100)} percent of placement hours completed"><span style="width:${Math.min(100,(h/placementTotalHours())*100)}%"></span></div>`:""}
      </section>

      <section class="placement-growing-entry">
        <button type="button" class="placement-growing-button" id="openWhereGrowing">
          <span class="placement-growing-icon">🌿</span>
          <span class="placement-growing-copy"><strong>Where I’m Growing</strong><small>${(()=>{const c=whereImGrowingCounts();return c.remaining?`${c.remaining} things I’m still working towards`:`Everything currently tracked is complete ✨`;})()}</small></span>
          <span class="placement-growing-arrow">›</span>
        </button>
      </section>

      <section class="placement-native-section">
        <div class="placement-native-section-heading">
          <div><span aria-hidden="true">🗂️</span><h2>Assessment work</h2></div>
          ${!activeAssessments.length?`<p>✨ Progress will appear once you begin.</p>`:""}
        </div>
        <div class="native-assessment-list">${standardAssessments.map(assessmentRow).join("")}</div>
        ${projectAssessments.length?`<div class="placement-native-project"><h3>Placement project</h3><div class="native-assessment-list">${projectAssessments.map(assessmentRow).join("")}</div></div>`:""}
        ${completedAssessments.length?`<details class="placement-native-completed"><summary>Completed <span>${completedAssessments.length}</span></summary><div class="native-assessment-list">${completedAssessments.map(assessmentRow).join("")}</div></details>`:""}
      </section>

      <section class="placement-native-records placement-native-records-compact">
        <h2>Records</h2>
        <div class="placement-record-list">
          <button class="native-record-row" id="openSupervision"><span class="native-record-icon">🤝</span><span><strong>Supervision</strong><small>Questions, feedback and actions</small></span><b>›</b></button>
          <button class="native-record-row" id="openTimesheets"><span class="native-record-icon">⏱️</span><span><strong>Timesheets and hours</strong><small>${hoursStarted?`${h.toFixed(1)} hours logged · open full record`:"Open full record"}</small></span><b>›</b></button>
        </div>
      </section>
    </div>`;
}


const whereImGrowingGroups = [
  {id:"practice",title:"Practice",icon:"🌿",items:[
    {id:"own-consumer",text:"Take on my own consumer work with appropriate support"},
    {id:"assessment-intake",text:"Contribute to assessments and intake work"},
    {id:"group",text:"Facilitate or co facilitate a group"},
    {id:"mdt",text:"Contribute in reviews, MDTs or case discussions"},
    {id:"documentation",text:"Complete case notes and placement documentation"},
    {id:"theory-practice",text:"Link a social work theory or framework clearly to a real practice example"},
    {id:"professional-voice",text:"Keep building confidence using my professional voice in meetings, assessments and case discussions"},
    {id:"sit-with-uncertainty",text:"Practise sitting with uncertainty rather than moving straight into fixing or problem solving"},
    {id:"assessment-ownership",text:"Take greater ownership of an assessment or consumer contact from planning through to documentation and follow up"}
  ]},
  {id:"supervision",title:"Supervision and learning",icon:"☕",items:[
    {id:"jcu-supervision-record",text:"Use the JCU supervision record for formal supervision"},
    {id:"practice-dilemma",text:"Bring a meaningful practice question or dilemma into supervision"},
    {id:"feedback-judgement",text:"Ask for specific feedback on my use of self and professional judgement"},
    {id:"supervision-shift",text:"Capture an example of supervision changing or challenging my thinking"},
    {id:"statutory-recovery",text:"Be able to explain how my practice is shifting from statutory Child Safety toward recovery oriented social work"}
  ]},
  {id:"project",title:"Project",icon:"📄",items:[
    {id:"project-developed",text:"Develop the FEW resources and triage material"},
    {id:"project-consulted",text:"Consult with the FEW worker and staff"},
    {id:"project-positive-feedback",text:"Receive and record positive staff or FEW feedback"},
    {id:"project-mdt-use",text:"Have the resource used in practice or an MDT"},
    {id:"project-senior-review",text:"Send the project resources for senior management review"},
    {id:"project-review-outcome",text:"Record the outcome of senior management review or approval"},
    {id:"project-final-changes",text:"Make any final changes requested after review"},
    {id:"project-use",text:"Keep evidence of how the FEW resources are being used in practice"},
    {id:"project-feedback",text:"Record any further FEW or staff feedback"},
    {id:"project-reflection-1",text:"Complete Project Reflection 1"},
    {id:"project-reflection-2",text:"Complete Project Reflection 2"},
    {id:"project-reflection-3",text:"Complete Project Reflection 3"}
  ]},
  {id:"mid",title:"Mid placement",icon:"🌱",items:[
    {id:"mid-six-examples",text:"Have at least one strong example for each of the six Learning Outcomes"},
    {id:"mid-cultural",text:"Strengthen my culturally responsive practice evidence"},
    {id:"mid-theory",text:"Strengthen my theory into practice evidence"},
    {id:"mid-supervision",text:"Strengthen my supervision and use of self evidence"},
    {id:"mid-self-assessment",text:"Complete my Mid Placement Self Assessment"},
    {id:"mid-priorities",text:"Identify and discuss my priorities for the second half of placement at the mid placement meeting"}
  ]}
];
function whereImGrowingState(){
  const saved=state.get("whereImGrowing",{});
  const next=saved&&typeof saved==="object"?saved:{};
  if(!next.__learningPlanMidV2){
    ["own-consumer","assessment-intake","group","mdt","documentation","project-developed","project-consulted","project-positive-feedback","project-mdt-use","project-senior-review"].forEach(id=>{next[id]=true;});
    next.__learningPlanMidV2=true;
    state.set("whereImGrowing",next);
  }
  return next;
}
function whereImGrowingCounts(){
  const saved=whereImGrowingState();
  const total=whereImGrowingGroups.reduce((sum,g)=>sum+g.items.length,0);
  const complete=whereImGrowingGroups.reduce((sum,g)=>sum+g.items.filter(item=>saved[item.id]).length,0);
  return {total,complete,remaining:Math.max(0,total-complete)};
}
function toggleWhereImGrowing(id,complete){
  const saved=whereImGrowingState();
  saved[id]=Boolean(complete);
  state.set("whereImGrowing",saved);
}

function whereImGrowingPage(){
  const saved=whereImGrowingState();
  const completed=[];
  const groupHtml=whereImGrowingGroups.map(group=>{
    const active=group.items.filter(item=>!saved[item.id]);
    group.items.filter(item=>saved[item.id]).forEach(item=>completed.push({...item,group:group.title,icon:group.icon}));
    return `<section class="growth-folder-group">
      <div class="growth-folder-group-heading"><span>${group.icon}</span><h2>${group.title}</h2><small>${active.length} left</small></div>
      ${active.length?`<div class="growth-folder-list">${active.map(item=>`<label class="growth-folder-item"><input type="checkbox" data-growing-id="${item.id}"><span>${safeText(item.text)}</span></label>`).join("")}</div>`:`<p class="growth-folder-empty">All done here ✨</p>`}
    </section>`;
  }).join("");
  const counts=whereImGrowingCounts();
  document.getElementById("main").innerHTML=`
    <div class="growth-folder-page">
      <button class="assessment-back-link" id="backGrowing" aria-label="Back to My Placement">‹ <span>My Placement</span></button>
      <section class="growth-folder-heading">
        <div class="eyebrow">🌿 Placement growth</div>
        <h1>Where I’m Growing</h1>
        <p>A simple place to keep track of the opportunities and assessment pieces I still want to work through.</p>
        <div class="growth-folder-progress"><span>${counts.complete} complete</span><strong>${counts.remaining} to go</strong></div>
      </section>
      ${groupHtml}
      <details class="growth-folder-completed">
        <summary>Completed <span>${completed.length}</span></summary>
        ${completed.length?`<div class="growth-folder-list growth-folder-completed-list">${completed.map(item=>`<label class="growth-folder-item completed"><input type="checkbox" checked data-growing-id="${item.id}"><span><small>${safeText(item.group)}</small>${safeText(item.text)}</span></label>`).join("")}</div>`:`<p class="growth-folder-empty">Nothing completed yet.</p>`}
      </details>
    </div>`;
  document.getElementById("backGrowing").onclick=()=>{route="assessments";render()};
  document.querySelectorAll("[data-growing-id]").forEach(input=>input.addEventListener("change",()=>{toggleWhereImGrowing(input.dataset.growingId,input.checked);whereImGrowingPage();}));
  window.scrollTo({top:0});
}

function integrationSessionManager(){
  const sessions=integrationSessions();
  return `<section class="assessment-simple-components">
    <div class="assessment-simple-components-head"><h2>Integration Sessions</h2><span>${assessmentComponentSummary({id:"integration"})}</span></div>
    <div class="assessment-component-list">${sessions.map(item=>`<article class="assessment-component-row ${item.status==="completed"?"is-complete":""}">
      <span><strong>${safeText(item.label)}</strong><small>${item.date?formatPlanningDate(item.date):"No date set"}</small></span>
      <select class="integration-status-select assessment-component-status" data-session-id="${item.id}">
        <option value="not_booked" ${item.status==="not_booked"?"selected":""}>Not Started</option>
        <option value="booked" ${item.status==="booked"?"selected":""}>In Progress</option>
        <option value="completed" ${item.status==="completed"?"selected":""}>Completed</option>
      </select>
    </article>`).join("")}</div>
    <button class="btn secondary assessment-simple-save" id="saveIntegrationSessions">Save Changes</button>
  </section>`;
}

function officialAssessmentInfo(a){
  const sharedNotice="Practice Compass is a planning and evidence tool. It does not replace official JCU documents, LearnJCU instructions or advice from your Field Education Liaison Officer (FELO).";
  const records={
    modules:{requirement:"Follow the current JCU Assessment Overview and LearnJCU instructions for completion and confirmation requirements.",record:"Complete and record this requirement through the official JCU or LearnJCU process identified in the current subject instructions.",sources:["JCU Assessment Overview","JCU Field Education Manual"]},
    integration:{requirement:"Follow the current JCU Assessment Overview and LearnJCU instructions for attendance, participation and any required record.",record:"Use the official JCU or LearnJCU record identified in the current subject instructions.",sources:["JCU Assessment Overview","JCU Field Education Manual"]},
    learning:{requirement:"Complete the official JCU Learning Plan form in consultation with your placement supervisor and FELO. Practice Compass may help organise ideas, questions, evidence and progress only.",record:"Use the current official JCU Learning Plan form. Do not submit Practice Compass content as a replacement for that form.",sources:["JCU Assessment Overview","JCU Field Education Manual","Relevant JCU Learning Plan form","AASW Practice Standards 2023","AASW Code of Ethics 2020"]},
    project:{requirement:"Follow the current JCU Assessment Overview and FELO advice when agreeing on the project scope, process and required output.",record:"Use any relevant JCU project form, template or LearnJCU instruction supplied for this assessment.",sources:["JCU Assessment Overview","JCU Field Education Manual","Relevant JCU form"]},
    reflections:{requirement:"Complete the three Project Reflections using the current JCU instructions and relevant official form or template.",record:"Use the relevant JCU Project Reflection form or template and submit through the official process identified in LearnJCU.",sources:["JCU Assessment Overview","JCU Field Education Manual","Relevant JCU form","AASW Practice Standards 2023","AASW Code of Ethics 2020"]},
    timesheets:{requirement:"Record and submit placement hours using the current official JCU timesheet workbook and instructions.",record:"The official JCU timesheet workbook is the formal record. Practice Compass hours are for planning and tracking only.",sources:["JCU Assessment Overview","JCU Field Education Manual","Relevant JCU timesheet form"]},
    midfinal:{requirement:"Complete the relevant official JCU placement assessment form and follow the current Assessment Overview, Field Education Manual and FELO advice.",record:"Use the current official JCU mid placement or end of placement assessment form. Practice Compass supports evidence preparation only.",sources:["JCU Assessment Overview","JCU Field Education Manual","Relevant JCU placement assessment form","AASW Practice Standards 2023","AASW Code of Ethics 2020"]},
    final:{requirement:"Follow the current JCU Assessment Overview and LearnJCU instructions for the final placement and project presentation.",record:"Use the official JCU instructions, form or template supplied for the final presentation and project report.",sources:["JCU Assessment Overview","JCU Field Education Manual","Relevant JCU form","AASW Practice Standards 2023","AASW Code of Ethics 2020"]}
  };
  return {...(records[a.id]||{requirement:"Check the current JCU Assessment Overview, Field Education Manual and relevant official form before completing this assessment.",record:"Complete the assessment using the official JCU document or system identified in the current subject instructions.",sources:["JCU Assessment Overview","JCU Field Education Manual","Relevant JCU form"]}),notice:sharedNotice};
}

function assessmentDetail(id,openPlanning=false){
  const a=assessments.find(x=>x.id===id);
  const entries=savedEntries().filter(e=>(e.evidence||[]).includes(a.title)||smartAssessmentEntryMatch(e,a.id));
  const overall=assessmentOverallStatus(a);
  const overallMeta=taskStatuses[overall];
  const progress=assessmentProgress(a);
  const planning=assessmentPlanning(a.id);
  const official=officialAssessmentInfo(a);
  const toolkitLinks=(a.toolkit||[]);
  const componentProgress=["integration","reflections","midfinal"].includes(a.id)?assessmentComponentProgress(a.id):null;
  const taskItems=(a.tasks||[]).map((task,index)=>({task,index,status:getTaskStatus(a.id,index)}));
  const incomplete=taskItems.filter(item=>item.status!=="complete");
  const automaticNextTask=componentProgress ? (componentProgress.next||"Everything is completed") : (incomplete[0]?.task||"Everything is completed");
  const customNext=assessmentNextStep(a.id);
  const nextTask=customNext.text||automaticNextTask;

  const simpleTaskRows=taskItems.map(item=>`<article class="assessment-component-row ${item.status==="complete"?"is-complete":""}">
    <span><strong>${safeText(item.task)}</strong></span>
    <select class="task-status-select assessment-component-status" data-assessment="${a.id}" data-index="${item.index}">
      <option value="not_started" ${item.status==="not_started"?"selected":""}>Not Started</option>
      <option value="in_progress" ${item.status==="in_progress"?"selected":""}>In Progress</option>
      <option value="complete" ${item.status==="complete"?"selected":""}>Completed</option>
    </select>
  </article>`).join("");

  document.getElementById("main").innerHTML=`
    <div class="assessment-simple-page">
      <button class="assessment-back-link" id="backAssess">‹ <span>My Placement</span></button>
      <header class="assessment-simple-header">
        <div>
          <span class="status-inline ${overallMeta.className}">${overallMeta.label}</span>
          <h1>${a.title}</h1>
          <p>${a.when}</p>
        </div>
        <div class="assessment-simple-progress-number">
          <strong>${componentProgress?`${componentProgress.done}/${componentProgress.total}`:`${progress}%`}</strong>
          <small>complete</small>
        </div>
      </header>
      <div class="assessment-clear-progress assessment-simple-progress"><span style="width:${progress}%"></span></div>
      <section class="assessment-simple-next ${customNext.text?"is-custom":""}">
        <div class="assessment-next-display">
          <div><small>Next Step</small><strong>${safeText(nextTask)}</strong>${customNext.dueDate?`<span>Due ${formatPlanningDate(customNext.dueDate)}</span>`:""}</div>
          <button type="button" class="text-link assessment-next-edit" id="editAssessmentNextStep">${customNext.text?"Edit":"Add"}</button>
        </div>
        ${customNext.text?`<button type="button" class="assessment-next-done" id="completeAssessmentNextStep">Done</button>`:""}
      </section>
      <div class="assessment-next-editor hidden" id="assessmentNextStepEditor">
        <label><span>What Do I Need to Do Next?</span><input id="assessmentNextStepText" class="input" maxlength="140" value="${escapeAttribute(customNext.text)}" placeholder="${escapeAttribute(automaticNextTask)}"></label>
        <label><span>Optional Due Date</span><input id="assessmentNextStepDue" type="date" class="input" value="${escapeAttribute(customNext.dueDate)}"></label>
        <div class="assessment-next-editor-actions"><button type="button" class="btn" id="saveAssessmentNextStep">Save Next Step</button><button type="button" class="btn secondary" id="cancelAssessmentNextStep">Cancel</button></div>
      </div>

      ${["reflections","midfinal"].includes(a.id)?componentAssessmentManager(a):""}
      ${a.id==="integration"?integrationSessionManager():""}
      ${!["integration","reflections","midfinal"].includes(a.id)?`<section class="assessment-simple-components"><div class="assessment-simple-components-head"><h2>Progress</h2></div><div class="assessment-component-list">${simpleTaskRows}</div></section>`:""}

      <details class="assessment-simple-details" ${openPlanning?"open":""}>
        <summary>Plan and Target Date</summary>
        <div class="assessment-simple-details-body">
          <label class="label" for="planningDate">Target Date</label>
          <input id="planningDate" type="date" class="input" value="${escapeAttribute(planning.date)}">
          <label class="label" for="planningReason">Note</label>
          <input id="planningReason" type="text" class="input" maxlength="120" value="${escapeAttribute(planning.reason)}" placeholder="Optional">
          <div class="assessment-planning-actions">
            <button class="btn" id="savePlanningDate">Save</button>
            <button class="btn secondary" id="clearPlanningDate" ${planning.date||planning.reason?"":"disabled"}>Clear</button>
          </div>
        </div>
      </details>

      ${entries.length?`<details class="assessment-simple-details"><summary>Linked Reflections <span>${entries.length}</span></summary><div class="assessment-simple-details-body">${entries.map(e=>`<article class="assessment-linked-simple"><strong>${safeText(e.date)}</strong><p>${safeText((e.answer||"").slice(0,150))}${(e.answer||"").length>150?"…":""}</p></article>`).join("")}</div></details>`:""}

      <details class="assessment-simple-details">
        <summary>More Information</summary>
        <div class="assessment-simple-details-body">
          <p>${safeText(a.purpose||"")}</p>
          <p>${safeText(official.requirement)}</p>
          ${toolkitLinks.length?`<div class="linked-resource-list">${toolkitLinks.map(item=>`<button class="linked-resource" data-toolkit-name="${safeText(item)}"><span>📚</span><div><strong>${safeText(item)}</strong></div><span>›</span></button>`).join("")}</div>`:""}
        </div>
      </details>
    </div>`;

  document.getElementById("backAssess").onclick=()=>{route="assessments";render()};

  document.getElementById("saveIntegrationSessions")?.addEventListener("click",()=>{
    const current=integrationSessions();
    const updated=current.map(item=>({...item,status:document.querySelector(`.integration-status-select[data-session-id="${item.id}"]`)?.value||item.status}));
    saveIntegrationSessions(updated); assessmentDetail("integration");
  });

  document.querySelectorAll(".assessment-component-status").forEach(select=>{
    if(select.classList.contains("integration-status-select"))return;
    if(select.dataset.component){
      select.onchange=()=>{setAssessmentComponentStatus(select.dataset.assessment,select.dataset.component,select.value);assessmentDetail(id);};
    }else if(select.dataset.index!==undefined){
      select.onchange=()=>{setTaskStatus(select.dataset.assessment,Number(select.dataset.index),select.value);assessmentDetail(id);};
    }
  });

  document.getElementById("editAssessmentNextStep")?.addEventListener("click",()=>{
    document.getElementById("assessmentNextStepEditor")?.classList.remove("hidden");
    document.getElementById("assessmentNextStepText")?.focus();
  });
  document.getElementById("cancelAssessmentNextStep")?.addEventListener("click",()=>{
    document.getElementById("assessmentNextStepEditor")?.classList.add("hidden");
  });
  document.getElementById("saveAssessmentNextStep")?.addEventListener("click",()=>{
    const text=document.getElementById("assessmentNextStepText")?.value.trim()||"";
    const due=document.getElementById("assessmentNextStepDue")?.value||"";
    if(!text){alert("Add the next step first.");return;}
    saveAssessmentNextStep(a.id,text,due);
    assessmentDetail(id);
  });
  document.getElementById("completeAssessmentNextStep")?.addEventListener("click",()=>{
    clearAssessmentNextStep(a.id);
    assessmentDetail(id);
  });

  document.getElementById("savePlanningDate")?.addEventListener("click",()=>{
    saveAssessmentPlanning(a.id,document.getElementById("planningDate").value,document.getElementById("planningReason").value.trim());
    assessmentDetail(id,true);
  });
  document.getElementById("clearPlanningDate")?.addEventListener("click",()=>{clearAssessmentPlanning(a.id);assessmentDetail(id,true);});
  document.querySelectorAll(".linked-resource").forEach(button=>button.onclick=()=>openToolkitTopicByName(button.dataset.toolkitName));
}

function learnPage(){
  return `
    <section class="toolkit-welcome">
      <div class="eyebrow">Social work in your pocket</div>
      <h1>📚 Practice Toolkit</h1>
      <p class="welcome-text">You do not need to know everything. Open one area when you need it.</p>
      <input id="toolkitSearch" class="input" placeholder="Search domestic violence, theory, skills, culture or policy">
    </section>
    <div id="toolkitList" class="toolkit-list">
      ${toolkitCategories.map((category,index)=>`
        <section class="toolkit-folder" data-search="${(category[1]+' '+category[2]+' '+category[3].map(x=>x.join(' ')).join(' ')).toLowerCase()}">
          <button class="folder-header" data-folder="${index}">
            <div class="folder-icon">${category[0]}</div>
            <div class="folder-text"><div class="folder-title-row"><div class="folder-title">${category[1]}</div><span class="folder-count">${category[3].length} topics</span></div><div class="folder-subtitle">${category[2]}</div></div>
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
  if(verifiedKnowledgePage(topic,category)) return;
  const guide=stage1ToolkitContent[topic[0]];

  if(guide){
    document.getElementById("main").innerHTML=`
      <article class="toolkit-topic-page">
        <header class="toolkit-topic-hero">
          <button class="back toolkit-topic-back" id="backToolkit" aria-label="Back to Practice Toolkit">‹</button>
          <div>
            <div class="eyebrow">${category[1]}</div>
            <h1>${topic[0]}</h1>
            <p>${guide.what}</p>
          </div>
        </header>

        <section class="toolkit-topic-section toolkit-practice-section">
          <div class="toolkit-section-kicker">In practice</div>
          <h2>What it can look like</h2>
          <ul class="toolkit-clean-list">${guide.practice.map(item=>`<li>${item}</li>`).join("")}</ul>
        </section>

        <section class="toolkit-topic-section toolkit-takeaway-section">
          <div class="toolkit-section-kicker">Key things to remember</div>
          <ul class="toolkit-clean-list">${guide.remember.map(item=>`<li>${item}</li>`).join("")}</ul>
        </section>

        ${guide.related&&guide.related.length?`<details class="toolkit-secondary-details">
          <summary>Related Toolkit topics</summary>
          <div class="toolkit-details-body"><div class="linked-resource-list">${guide.related.map(item=>`<button class="linked-resource" data-toolkit-name="${item}"><div><strong>${item}</strong></div><span>›</span></button>`).join("")}</div></div>
        </details>`:""}

        ${guide.refs&&guide.refs.length?`<details class="toolkit-secondary-details">
          <summary>References</summary>
          <div class="toolkit-details-body"><ul class="toolkit-reference-list">${guide.refs.map(ref=>ref[1]?`<li><a href="${ref[1]}" target="_blank" rel="noopener noreferrer">${ref[0]}</a></li>`:`<li>${ref[0]}</li>`).join("")}</ul></div>
        </details>`:""}

        <p class="toolkit-scope-note">Practice Compass is a quick practice guide for placement learning. Follow current legislation, organisational policy, supervision and official guidance.</p>
        <button class="btn secondary toolkit-return" id="returnToolkit">Return to Practice Toolkit</button>
      </article>`;

    const goBack=()=>{const returnToReflection=state.get("reflectionReturnPending",false);state.set("reflectionReturnPending",false);route=returnToReflection?"journal":"learn";render()};
    document.getElementById("backToolkit").onclick=goBack;
    document.getElementById("returnToolkit").onclick=goBack;
    document.querySelectorAll("[data-toolkit-name]").forEach(button=>{
      button.onclick=()=>openToolkitTopicByName(button.dataset.toolkitName);
    });
    return;
  }

  document.getElementById("main").innerHTML=`
    <article class="toolkit-topic-page toolkit-topic-placeholder">
      <header class="toolkit-topic-hero">
        <button class="back toolkit-topic-back" id="backToolkit" aria-label="Back to Practice Toolkit">‹</button>
        <div>
          <div class="eyebrow">${category[1]}</div>
          <h1>${topic[0]}</h1>
          <p>${topic[1]}</p>
        </div>
      </header>

      <section class="toolkit-topic-section toolkit-development-note">
        <div class="toolkit-section-kicker">Topic guide in development</div>
        <h2>Detailed guidance has not been added yet</h2>
        <p>This card is kept in the Toolkit so the topic remains easy to find. Practice examples, key points and verified references will only appear once meaningful content has been added.</p>
      </section>

      <button class="btn secondary toolkit-return" id="returnToolkit">Return to Practice Toolkit</button>
    </article>`;

  const goBack=()=>{const returnToReflection=state.get("reflectionReturnPending",false);state.set("reflectionReturnPending",false);route=returnToReflection?"journal":"learn";render()};
  document.getElementById("backToolkit").onclick=goBack;
  document.getElementById("returnToolkit").onclick=goBack;
}

function morePage(){
  const intelligence=practiceFrameworkIntelligence();
  const allItems=Object.values(intelligence.groups).flatMap(map=>[...map.values()]);
  const evidencedItems=allItems.filter(item=>item.evidence.length);
  const growth=evidencedItems.slice(0,5);
  const groupLabels={values:"Values",theories:"Theories",models:"Practice approaches",skills:"Skills",useOfSelf:"Use of self"};
  const groupSummary=Object.entries(intelligence.groups).map(([key,map])=>{
    const supported=[...map.values()].filter(item=>item.evidence.length).length;
    return `<div class="journey-framework-row"><span>${groupLabels[key]}</span><strong>${supported}</strong></div>`;
  }).join("");
  const latestEntries=[...intelligence.entries].slice(0,3);

  return `<div class="journey-page journey-purpose-reset">
    <section class="journey-approved-hero">
      <div><div class="eyebrow">Me</div><h1>My Journey</h1><p>How my social work practice is taking shape.</p></div>
      <span class="journey-approved-botanical">🌿</span>
    </section>

    <section class="journey-section-block" aria-labelledby="growthSummaryHeading">
      <div class="journey-section-heading-simple">
        <div><span class="eyebrow">Professional growth</span><h2 id="growthSummaryHeading">How I am developing</h2></div>
      </div>
      <div class="journey-growth-panel journey-growth-single">
        ${growth.length?`<p class="journey-growth-intro">Themes appearing across your saved reflections:</p><div class="framework-growth-chips">${growth.map(item=>`<span>🌿 ${safeText(item.name)}</span>`).join("")}</div>`:`<div class="journey-empty-message">✨ Your growth summary will build naturally from the reflections you save.</div>`}
        ${latestEntries.length?`<div class="journey-recent-growth"><strong>Recently noticed</strong>${latestEntries.map(entry=>`<span>${safeText((entry.evidenceTypes||[])[0]||"Reflective practice")}</span>`).join("")}</div>`:""}
      </div>
    </section>

    <section class="journey-section-block" aria-labelledby="frameworkHeading">
      <div class="journey-section-heading-simple">
        <div><span class="eyebrow">Professional identity</span><h2 id="frameworkHeading">My practice framework</h2></div>
      </div>
      <div class="journey-framework-panel">
        <p class="journey-framework-intro">Your values, theories, approaches, skills and use of self are gathered here once. Assessment planning stays in Assessments.</p>
        <div class="journey-framework-summary">${groupSummary}</div>
        <button class="journey-text-action journey-approved-row" id="frameworkMenu"><span class="journey-approved-icon">🧭</span><span><strong>Open My Practice Framework</strong><small>Review or continue developing your framework</small></span><b>›</b></button>
      </div>
    </section>

    <section class="journey-app-section" aria-labelledby="journeyAppHeading">
      <div class="journey-app-heading"><h2 id="journeyAppHeading">App tools</h2><p>Practical controls kept separate from your professional journey.</p></div>
      <details class="journey-utility-details placement-profile-details">
        <summary><span><strong>My placement details</strong><small>${safeText(placementProfileLabel()||"Add your name and placement")}</small></span><span>›</span></summary>
        <div class="journey-utility-note placement-profile-editor">
          <label><span>Name</span><input class="input" id="profileStudentName" value="${safeText(placementProfile().studentName)}" placeholder="Your name"></label>
          <label><span>Agency</span><input class="input" id="profileAgency" value="${safeText(placementProfile().agency)}" placeholder="Placement agency"></label>
          <label><span>Service or team</span><input class="input" id="profileService" value="${safeText(placementProfile().service)}" placeholder="Service, program or team"></label>
          <div class="placement-profile-date-row">
            <label><span>Placement start date</span><input class="input" type="date" id="profileStartDate" value="${safeText(placementProfile().startDate)}"></label>
            <label><span>Expected end date <small>optional</small></span><input class="input" type="date" id="profileEndDate" value="${safeText(placementProfile().endDate)}"></label>
          </div>
          <label><span>Total placement hours</span><input class="input" type="number" min="1" step="1" id="profileTotalHours" value="${safeText(placementProfile().totalHours)}"></label>
          <label><span>Placement week override <small>optional</small></span><input class="input" type="number" min="1" step="1" id="profileWeekOverride" value="${safeText(placementProfile().weekOverride)}" placeholder="Leave blank to calculate automatically"><small class="placement-profile-hint">Practice Compass calculates the week from your start date. Only use this if your university counts placement weeks differently.</small></label>
          <button type="button" class="btn secondary placement-profile-save" id="savePlacementProfile">Save placement details</button>
        </div>
      </details>
      <button class="journey-utility-row" id="exportHtml"><span><strong>Export readable record</strong><small>Create a readable copy of reflections, hours and framework notes</small></span><span>›</span></button>
      <button class="journey-utility-row" id="backupJson"><span><strong>Back up everything</strong><small>Save a private copy of all Practice Compass browser data</small></span><span>›</span></button>
      <button class="journey-utility-row" id="restoreJson"><span><strong>Restore a backup</strong><small>Preview and import a Practice Compass backup file</small></span><span>›</span></button>
      <input class="hidden" type="file" id="restoreJsonFile" accept="application/json,.json">
      <div class="backup-status" id="backupStatus">${backupStatusText()}</div>
      <div class="backup-restore-panel hidden" id="backupRestorePanel" aria-live="polite"></div>
      <button class="journey-utility-row journey-reset-row" id="resetThisDevice"><span><strong>Start fresh on this device</strong><small>Clear Practice Compass data saved only in this browser</small></span><span>›</span></button>
      <details class="journey-utility-details"><summary><span><strong>About Practice Compass</strong><small>Purpose and boundaries</small></span><span>›</span></summary><div class="journey-utility-note">Practice Compass supports placement learning, reflection and professional growth. University assessment requirements and progress remain in My Placement and Assessments.</div></details>
    </section>
  </div>`;
}

function evidenceMapPage(){
  const entries=savedEntries();
  const supervision=supervisionItems();
  const frameworkLinks=frameworkEvidenceLinksData();
  const frameworkAreasWithEvidence=practiceFrameworkDevelopmentAreas.filter(area=>{
    const linked=normaliseFrameworkEvidenceArea(frameworkLinks[area.id]);
    return linked.reflectionIds.length||linked.supervisionIds.length||linked.manualExamples.length;
  }).length;
  const assessmentMap=[
    {title:"Project Reflections",id:"reflections",icon:"⭐",timing:"Three across placement"},
    {title:"Mid and End Placement Assessments",id:"midfinal",icon:"📝",timing:"Mid and final review"},
    {title:"Final Presentation",id:"final",icon:"🎤",timing:"Final liaison meeting"}
  ];
  const cards=assessmentMap.map(item=>{
    const requirements=assessmentRequirements[item.title]||[];
    const coverage=requirements.map(requirement=>({requirement,entries:entries.filter(entry=>(entry.evidenceTypes||[]).includes(requirement))}));
    const covered=coverage.filter(row=>row.entries.length).length;
    const matching=entries.filter(entry=>(entry.evidence||[]).includes(item.title)||requirements.some(requirement=>(entry.evidenceTypes||[]).includes(requirement))||smartAssessmentEntryMatch(entry,item.id));
    const missing=coverage.filter(row=>!row.entries.length).map(row=>row.requirement);
    const progress=requirements.length?Math.round((covered/requirements.length)*100):0;
    const next=missing.length?`Capture or link an example showing ${missing[0].toLowerCase()}.`:`Choose the strongest examples and explain what they demonstrate.`;
    return `<article class="assessment-evidence-card">
      <button type="button" class="assessment-evidence-summary" data-evidence-assessment="${item.id}">
        <span class="assessment-evidence-icon">${item.icon}</span><span class="assessment-evidence-copy"><strong>${item.title}</strong><small>${item.timing}</small></span><span class="assessment-evidence-progress"><strong>${covered}/${requirements.length}</strong><small>areas</small></span>
      </button>
      <div class="assessment-evidence-track"><span style="width:${progress}%"></span></div>
      <div class="assessment-evidence-next"><span>Next useful step</span><strong>${safeText(next)}</strong></div>
      <details class="assessment-evidence-details"><summary>View evidence map <span>${matching.length} reflection${matching.length===1?"":"s"}</span></summary><div class="assessment-evidence-details-body">
        <div class="assessment-evidence-category-list">${coverage.map(row=>`<div class="assessment-evidence-category ${row.entries.length?"covered":"missing"}"><span>${row.entries.length?"✓":"○"}</span><span>${safeText(row.requirement)}</span><strong>${row.entries.length}</strong></div>`).join("")}</div>
        ${matching.length?`<div class="assessment-evidence-reflections"><strong>Possible reflection evidence</strong>${matching.slice(0,8).map(entry=>`<div><span>${safeText(entry.date||"Reflection")}</span><p>${safeText((entry.moment||entry.answer||"Saved reflection").replace(/\s+/g," ").slice(0,125))}${(entry.moment||entry.answer||"").length>125?"…":""}</p></div>`).join("")}</div>`:`<p class="assessment-evidence-empty">No matching reflections yet. This does not mean you have not developed in this area. It means the evidence has not been captured in Practice Compass.</p>`}
        <button type="button" class="assessment-evidence-open" data-evidence-assessment="${item.id}">Open assessment workspace <span>›</span></button>
      </div></details>
    </article>`;
  }).join("");

  const suggestionCards=entries.map(entry=>{
    const suggestions=smartReflectionSuggestions(entry),saved=normaliseSmartReflectionLink(smartReflectionLinksData()[String(entry.id)]);
    const renderGroup=(type,title,icon)=>{
      const items=suggestions[type].filter(item=>!saved.dismissed[type].includes(String(item.value))||saved.approved[type].includes(String(item.value)));
      if(!items.length)return "";
      return `<div class="smart-link-group"><strong>${icon} ${title}</strong>${items.map(item=>{
        const approved=saved.approved[type].includes(String(item.value));
        return `<div class="smart-link-suggestion ${approved?"approved":""}"><div><span>${safeText(item.label)}</span><small>${safeText(item.reason)}</small></div><div class="smart-link-actions">${approved?`<span class="smart-linked-label">Linked</span><button type="button" data-smart-decision="remove" data-entry-id="${entry.id}" data-smart-type="${type}" data-smart-value="${safeText(item.value)}">Remove</button>`:`<button type="button" class="smart-approve" data-smart-decision="approved" data-entry-id="${entry.id}" data-smart-type="${type}" data-smart-value="${safeText(item.value)}">Link</button><button type="button" data-smart-decision="dismissed" data-entry-id="${entry.id}" data-smart-type="${type}" data-smart-value="${safeText(item.value)}">Not relevant</button>`}</div></div>`;
      }).join("")}</div>`;
    };
    const visibleCount=[...suggestions.assessments,...suggestions.standards,...suggestions.framework].filter(item=>!saved.dismissed.assessments.includes(String(item.value))&&!saved.dismissed.standards.includes(String(item.value))&&!saved.dismissed.framework.includes(String(item.value))).length;
    const approvedCount=saved.approved.assessments.length+saved.approved.standards.length+saved.approved.framework.length;
    return `<details class="smart-reflection-card"><summary><span><strong>${safeText(entry.date||"Reflection")}</strong><small>${safeText((entry.moment||entry.answer||"Saved reflection").replace(/\s+/g," ").slice(0,95))}${(entry.moment||entry.answer||"").length>95?"…":""}</small></span><span>${approvedCount?`${approvedCount} linked`:`${visibleCount} suggestions`}</span></summary><div class="smart-reflection-body">${renderGroup("assessments","Assessments","📚")}${renderGroup("standards","AASW Practice Standards","🌿")}${renderGroup("framework","Practice framework","🧭")}<p class="smart-link-note">Suggestions are based on words and themes in your reflection. You remain in control of what is relevant.</p></div></details>`;
  }).join("");

  document.getElementById("main").innerHTML=`<div class="assessment-evidence-page">
    <button class="assessment-back-link" id="backMore">‹ Back to Me</button>
    <section class="assessment-evidence-hero"><span>📚</span><div><div class="eyebrow">University evidence</div><h1>Assessment evidence</h1><p>See what your saved learning already supports and where another clear example may help.</p></div></section>
    <section class="assessment-evidence-snapshot" aria-label="Evidence snapshot"><div><strong>${entries.length}</strong><span>reflections</span></div><div><strong>${supervision.length}</strong><span>supervision notes</span></div><div><strong>${frameworkAreasWithEvidence}</strong><span>framework areas</span></div></section>
    <p class="assessment-evidence-note">Your Learning Plan is complete, so new suggestions focus on the assessments still ahead. Counts are planning prompts only.</p>
    <details class="smart-link-review" ${state.get("smartLinkReviewOpen",false)?"open":""} id="smartLinkReview"><summary><span><strong>✨ Review suggested links</strong><small>Connect existing reflections without copying or rewriting them</small></span><span>›</span></summary><div class="smart-link-review-body">${suggestionCards||`<p class="assessment-evidence-empty">Save a reflection to begin receiving suggestions.</p>`}</div></details>
    <section class="assessment-evidence-list">${cards}</section>
  </div>`;
  document.getElementById("backMore").onclick=()=>{route="more";render()};
  document.getElementById("smartLinkReview")?.addEventListener("toggle",event=>state.set("smartLinkReviewOpen",event.currentTarget.open));
  document.querySelectorAll("[data-smart-decision]").forEach(button=>button.addEventListener("click",()=>{smartLinkDecision(button.dataset.entryId,button.dataset.smartType,button.dataset.smartValue,button.dataset.smartDecision);evidenceMapPage();}));
  document.querySelectorAll("[data-evidence-assessment]").forEach(button=>button.addEventListener("click",event=>{if(event.target.closest("details"))return;assessmentDetail(button.dataset.evidenceAssessment);}));
}

function practiceFrameworkIntelligence(){
  const entries=savedEntries();
  const manual=frameworkData();
  const reflectionOrder=new Map([...entries].reverse().map((entry,index)=>[entry.id,index+1]));
  const rules={
    "Ethics or values":[
      {group:"values",name:"Human dignity"},
      {group:"values",name:"Respect"},
      {group:"skills",name:"Ethical decision making"}
    ],
    "Recovery":[
      {group:"values",name:"Hope"},
      {group:"theories",name:"Recovery Oriented Practice"},
      {group:"models",name:"Strengths Based Practice"}
    ],
    "Cultural capability":[
      {group:"values",name:"Cultural safety"},
      {group:"models",name:"Cultural humility"}
    ],
    "Theory in action":[{group:"theories",name:"Theory informed practice"}],
    "Systems issue":[{group:"theories",name:"Systems and Ecological Theory"}],
    "Communication":[
      {group:"skills",name:"Active listening"},
      {group:"skills",name:"Engagement and rapport"}
    ],
    "Documentation":[{group:"skills",name:"Documentation"}],
    "Teamwork":[{group:"skills",name:"Interprofessional collaboration"}],
    "Feedback":[{group:"skills",name:"Reflective supervision"}],
    "Skill":[{group:"skills",name:"Practice skills"}],
    "Use of self":[
      {group:"useOfSelf",name:"Self awareness"},
      {group:"useOfSelf",name:"Professional boundaries"}
    ],
    "Professional development":[{group:"useOfSelf",name:"Reflective practice"}],
    "Knowledge":[{group:"models",name:"Evidence informed practice"}]
  };
  const groups={values:new Map(),theories:new Map(),models:new Map(),skills:new Map(),useOfSelf:new Map()};
  const add=(group,name,entry=null,isManual=false)=>{
    if(!groups[group].has(name)) groups[group].set(name,{name,evidence:[],assessments:new Set(),manual:false});
    const item=groups[group].get(name);
    if(isManual) item.manual=true;
    if(entry){
      item.evidence.push({id:entry.id,label:`Reflection ${reflectionOrder.get(entry.id) || 1}`,date:entry.date});
      (entry.evidence||[]).forEach(a=>item.assessments.add(a));
    }
  };
  entries.forEach(entry=>{
    (entry.evidenceTypes||[]).forEach(type=>(rules[type]||[]).forEach(rule=>add(rule.group,rule.name,entry)));
    (entry.theories||[]).forEach(name=>add("theories",name,entry));
    (entry.methods||[]).forEach(name=>add("models",name,entry));
    (entry.skills||[]).forEach(name=>add("skills",name,entry));
    (entry.assessmentJudgement||[]).forEach(name=>add("skills",name,entry));
    (entry.values||[]).forEach(name=>add("values",name,entry));
    (entry.ethics||[]).forEach(name=>add("values",name,entry));
    (entry.cultural||[]).forEach(name=>add("models",name,entry));
    (entry.systems||[]).forEach(name=>add("theories",name,entry));
    (entry.useOfSelfTags||[]).forEach(name=>add("useOfSelf",name,entry));
  });
  (manual.values||[]).forEach(name=>add("values",name,null,true));
  (manual.theories||[]).forEach(name=>add("theories",name,null,true));
  (manual.cultural||[]).forEach(name=>add("models",name,null,true));
  (manual.skills||[]).forEach(name=>add("skills",name,null,true));
  if(manual.useOfSelf) add("useOfSelf","Personal use of self reflection",null,true);
  return {groups,manual,entries};
}

function frameworkPage(){
  const intelligence=practiceFrameworkIntelligence();
  const data=intelligence.manual;
  const development=frameworkDevelopmentData();
  const evidenceLinks=frameworkEvidenceLinksData();
  const entries=savedEntries();

  const opportunityRules=[
    {label:"Ethical decision making",tags:["Ethics or values"]},
    {label:"Cultural capability",tags:["Cultural capability"]},
    {label:"Interprofessional collaboration",tags:["Teamwork"]},
    {label:"Use of self",tags:["Use of self"]},
    {label:"Theory informed practice",tags:["Theory in action"]}
  ];
  const usedTags=new Set(entries.flatMap(entry=>entry.evidenceTypes||[]));
  const opportunities=opportunityRules.filter(item=>!item.tags.some(tag=>usedTags.has(tag))).slice(0,3);

  const summary=frameworkSummaryData();
  const summaryHistory=frameworkSummaryHistoryData();
  const developmentAnswer=id=>String((development[id]||{}).answer||"").trim();
  const joinSuggestions=items=>items.filter(Boolean).join("\n\n");
  const summarySuggestions={
    vision:joinSuggestions([developmentAnswer("identity"),developmentAnswer("development"),data.professionalIdentity]),
    purpose:joinSuggestions([developmentAnswer("identity"),developmentAnswer("framework")]),
    values:joinSuggestions([developmentAnswer("dignity"),developmentAnswer("selfDetermination"),developmentAnswer("strengths"),developmentAnswer("culture"),developmentAnswer("justice"),(data.values||[]).length?`Values already selected: ${(data.values||[]).join(", ")}`:""]),
    theories:joinSuggestions([developmentAnswer("theories"),(data.theories||[]).length?`Theories and approaches already selected: ${(data.theories||[]).join(", ")}`:""]),
    tools:joinSuggestions([developmentAnswer("tools"),developmentAnswer("relationships"),(data.skills||[]).length?`Developing skills already selected: ${(data.skills||[]).join(", ")}`:""]),
    reflection:joinSuggestions([developmentAnswer("reflection"),developmentAnswer("development"),data.useOfSelf])
  };

  const summaryFields=[
    {id:"vision",title:"Vision",hint:"The social worker I am becoming"},
    {id:"purpose",title:"Purpose",hint:"What I want my practice to do"},
    {id:"values",title:"Values",hint:"What guides my decisions and relationships"},
    {id:"theories",title:"Theories",hint:"The ideas and approaches shaping my practice"},
    {id:"tools",title:"Practice tools",hint:"How I work with people in practice"},
    {id:"reflection",title:"Reflection and accountability",hint:"How I keep learning and checking my practice"}
  ];

  const hasSavedSummary=summaryFields.some(field=>String(summary[field.id]||"").trim());
  const summaryEditor=summaryFields.map(field=>`<section class="framework-summary-editor-field framework-summary-editor-compact framework-tone-${field.id}">
      <div class="framework-summary-editor-heading"><div><strong>${field.title}</strong><small>${field.hint}</small></div>${summarySuggestions[field.id]?`<button type="button" class="framework-use-notes" data-summary-notes="${field.id}">Use saved notes</button>`:""}</div>
      <textarea class="textarea framework-summary-text framework-summary-text-compact" id="frameworkSummary-${field.id}" placeholder="Keep this short. You can change it as placement develops.">${safeText(summary[field.id]||"")}</textarea>
    </section>`).join("");
  const summaryReadView=summaryFields.map(field=>{
    const value=String(summary[field.id]||"").trim();
    return `<section class="framework-summary-read-field framework-tone-${field.id}">
      <div><strong>${field.title}</strong><small>${field.hint}</small></div>
      <p>${value?safeText(value):`<span class="muted">Nothing added yet.</span>`}</p>
    </section>`;
  }).join("");

  const frameworkHistoryHtml=summaryHistory.length?`<details class="framework-history">
    <summary><span><strong>See changes over time</strong><small>${summaryHistory.length} saved version${summaryHistory.length===1?"":"s"}</small></span><span>›</span></summary>
    <div class="framework-history-list">${summaryHistory.slice().reverse().map((version,index)=>{
      const d=new Date(version.savedAt);
      const dateLabel=Number.isNaN(d.getTime())?"Saved version":d.toLocaleString("en-AU",{dateStyle:"medium",timeStyle:"short"});
      return `<article class="framework-history-version"><div class="framework-history-heading"><strong>${index===0?"Latest saved version":"Earlier version"}</strong><small>${safeText(dateLabel)}</small></div>${summaryFields.map(field=>{const value=String(version.summary?.[field.id]||"").trim();return value?`<div class="framework-history-field"><b>${field.title}</b><p>${safeText(value)}</p></div>`:"";}).join("")}</article>`;
    }).join("")}</div>
  </details>`:"";

  const evidenceAreas=[
    {title:"Purpose and professional identity",icon:"🧭",tags:["Professional development","Use of self"]},
    {title:"Values and ethics",icon:"⚖️",tags:["Ethics or values","Recovery"]},
    {title:"Theories and knowledge",icon:"🧠",tags:["Theory in action","Knowledge","Systems issue"]},
    {title:"Practice skills",icon:"🛠️",tags:["Skill","Communication","Documentation","Teamwork","Feedback"]},
    {title:"Use of self and reflection",icon:"🪞",tags:["Use of self","Feedback","Professional development"]},
    {title:"Culture, systems and context",icon:"🌏",tags:["Cultural capability","Systems issue"]}
  ];
  const evidenceAreaHtml=evidenceAreas.map(area=>{
    const matched=entries.filter(entry=>(entry.evidenceTypes||[]).some(tag=>area.tags.includes(tag)));
    return `<div class="framework-auto-area"><span class="framework-auto-icon">${area.icon}</span><div><strong>${area.title}</strong><small>${matched.length ? `${matched.length} reflection${matched.length===1?"":"s"} contributing` : "Builds as you reflect"}</small></div></div>`;
  }).join("");

  const oldNotes=practiceFrameworkDevelopmentAreas.map(area=>{
    const answer=developmentAnswer(area.id);
    const linked=normaliseFrameworkEvidenceArea(evidenceLinks[area.id]);
    const count=linked.reflectionIds.length+linked.supervisionIds.length+linked.manualExamples.length;
    if(!answer&&!count)return "";
    return `<div class="framework-old-note"><strong>${safeText(area.title)}</strong>${answer?`<p>${safeText(answer)}</p>`:""}${count?`<small>${count} previously linked evidence item${count===1?"":"s"}</small>`:""}</div>`;
  }).filter(Boolean).join("");

  document.getElementById("main").innerHTML=`
    <div class="framework-page-shell">
    <div class="screen-title framework-page-title"><button class="back" id="backMore">‹</button><h2>🧭 My Practice Framework</h2></div>
    <p class="framework-three-intro">A short working summary of the social worker you are becoming. This should grow from placement, not become another task.</p>

    <div class="framework-three-options">
      <details class="framework-calm-details framework-primary-option" id="frameworkSummarySection" open>
        <summary><span><strong>My Practice Framework</strong><small>Keep the six parts short and update them only when your thinking changes</small></span><span>›</span></summary>
        <div class="framework-calm-details-body">
          <section class="framework-six-part-summary framework-summary-refined framework-summary-simplified">
            ${hasSavedSummary?`
              <div class="framework-summary-read-view" id="frameworkSummaryReadView">
                ${summaryReadView}
                <div class="framework-summary-footer-actions"><button type="button" class="btn secondary framework-summary-edit" id="editFrameworkSummary">Edit framework</button></div>
                ${frameworkHistoryHtml}
              </div>
              <div class="framework-summary-edit-view" id="frameworkSummaryEditView" hidden>
                ${summaryEditor}
                <div class="framework-summary-edit-actions">
                  <button type="button" class="btn" id="saveFrameworkSummary">Save my framework</button>
                  <button type="button" class="btn secondary" id="cancelFrameworkSummary">Cancel</button>
                </div>
              </div>`:`
              <div class="framework-summary-edit-view" id="frameworkSummaryEditView">
                ${summaryEditor}
                <button type="button" class="btn framework-summary-save" id="saveFrameworkSummary">Save my framework</button>
              </div>`}
          </section>
        </div>
      </details>

      <details class="framework-calm-details framework-primary-option" id="frameworkDevelopmentSection">
        <summary><span><strong>Develop My Framework</strong><small>No extra form to complete. Your reflections build this over time.</small></span><span>›</span></summary>
        <div class="framework-calm-details-body">
          <div class="framework-auto-note"><strong>Practice Compass is already collecting this.</strong><p>Keep using Reflect normally. Relevant reflections will show where your practice is developing, so you do not need to write the same learning again here.</p></div>
          <div class="framework-auto-grid">${evidenceAreaHtml}</div>
          ${oldNotes?`<details class="framework-previous-notes"><summary>See my earlier framework notes</summary><div>${oldNotes}</div></details>`:""}
        </div>
      </details>

      <details class="framework-calm-details framework-primary-option" id="frameworkGapsSection">
        <summary><span><strong>Areas to Strengthen</strong><small>Only highlights areas that have less evidence so far</small></span><span>›</span></summary>
        <div class="framework-calm-details-body">${opportunities.length?`<div class="framework-opportunity-list">${opportunities.map(item=>`<span>${safeText(item.label)}</span>`).join("")}</div>`:`<p class="muted">Nothing specific is being flagged right now. Keep capturing real placement experiences as they happen.</p>`}</div>
      </details>
    </div>
    </div>`;

  document.getElementById("backMore").onclick=()=>{route="more";render()};
  document.getElementById("editFrameworkSummary")?.addEventListener("click",()=>{
    const readView=document.getElementById("frameworkSummaryReadView");
    const editView=document.getElementById("frameworkSummaryEditView");
    if(readView)readView.hidden=true;
    if(editView)editView.hidden=false;
  });
  document.getElementById("cancelFrameworkSummary")?.addEventListener("click",()=>{
    const readView=document.getElementById("frameworkSummaryReadView");
    const editView=document.getElementById("frameworkSummaryEditView");
    if(editView)editView.hidden=true;
    if(readView)readView.hidden=false;
  });
  document.querySelectorAll(".framework-use-notes").forEach(button=>button.addEventListener("click",()=>{
    const id=button.dataset.summaryNotes;
    const textarea=document.getElementById(`frameworkSummary-${id}`);
    const notes=summarySuggestions[id]||"";
    if(!textarea||!notes)return;
    if(textarea.value.trim()&&!confirm("Replace the current wording with your saved notes?"))return;
    textarea.value=notes;
    textarea.focus();
  }));
  document.getElementById("saveFrameworkSummary")?.addEventListener("click",()=>{
    const next={};
    summaryFields.forEach(field=>next[field.id]=document.getElementById(`frameworkSummary-${field.id}`).value.trim());
    if(frameworkSummaryChanged(summary,next))saveFrameworkSummaryVersion(next);
    saveFrameworkSummaryData(next);
    alert("Your practice framework has been saved 🧭");
    frameworkPage();
  });
}




function timeSelectOptions(selected){
  const options=[];
  for(let minutes=6*60;minutes<=20*60;minutes+=15){
    const h=Math.floor(minutes/60),m=minutes%60;
    const value=`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
    const label=new Date(2000,0,1,h,m).toLocaleTimeString("en-AU",{hour:"numeric",minute:"2-digit"});
    options.push(`<option value="${value}" ${value===selected?"selected":""}>${label}</option>`);
  }
  return options.join("");
}
function isWeekendDate(value){
  const date=parseLocalDate(value);
  return date && (date.getDay()===0||date.getDay()===6);
}
function timesheetDueForEntryDate(value){
  const anchor=parseLocalDate(TIMESHEET_FIRST_DUE),date=parseLocalDate(value);
  if(!date||!anchor)return TIMESHEET_FIRST_DUE;
  const diff=Math.floor((date-anchor)/86400000);
  const periods=Math.ceil(diff/14);
  const due=new Date(anchor);due.setDate(anchor.getDate()+periods*14);
  return localDateValue(due);
}
function groupedTimesheetEntries(entries){
  const groups={};
  entries.forEach(entry=>{
    const due=timesheetDueForEntryDate(entry.date);
    if(!groups[due])groups[due]=[];
    groups[due].push(entry);
  });
  return Object.entries(groups).sort((a,b)=>b[0].localeCompare(a[0])).map(([due,items])=>({due,cycle:timesheetCycleForDue(due),items:items.sort((a,b)=>b.date.localeCompare(a.date)),hours:items.reduce((sum,item)=>sum+Number(item.hours||0),0)}));
}

function timesheetSubmissionCard(){
  const status=timesheetSubmissionStatus();
  const submissions=timesheetSubmissions();
  const submitted=submissions[status.dueDate];
  const heading=status.overdue?"Submission overdue":status.days<=3?"Submission due soon":"Next submission";
  return `<section class="timesheet-submission-card ${status.overdue?"is-overdue":""}">
    <div><span class="home-kicker">${heading}</span><h2>Fortnight ending ${formatPlanningDate(status.dueDate)}</h2><p>${formatPlanningDate(status.cycle.start)} to ${formatPlanningDate(status.cycle.end)}</p></div>
    ${submitted?`<span class="timesheet-submitted-badge">✓ Submitted ${formatPlanningDate(submitted.submittedAt.slice(0,10))}</span>`:`<button class="btn" id="markTimesheetSubmitted" data-due-date="${status.dueDate}">Mark as submitted</button>`}
  </section>`;
}

function timesheetEntryGroups(entries){
  const submissions=timesheetSubmissions();
  const groups=groupedTimesheetEntries(entries);
  if(!groups.length)return `<p class="muted personality-empty">📅 Your first timesheet entry will appear here.</p>`;
  return groups.map((group,index)=>{
    const submitted=submissions[group.due];
    return `<details class="timesheet-entry-group" ${index===0?"open":""}>
      <summary><span><strong>${formatPlanningDate(group.cycle.start)} to ${formatPlanningDate(group.cycle.end)}</strong><small>${group.items.length} entr${group.items.length===1?"y":"ies"} · ${group.hours.toFixed(2)} hours</small></span><span class="timesheet-group-status">${submitted?"✓ Submitted":"Current record"}</span></summary>
      <div class="timesheet-entry-list">${group.items.map(e=>`<article class="timesheet-entry-row"><div class="timesheet-entry-copy"><strong>${formatPlanningDate(e.date)}</strong><small>${e.start} to ${e.finish} · ${Number(e.hours).toFixed(2)} hrs · ${e.lunch} min lunch</small>${e.activities?`<p>${safeText(e.activities)}</p>`:""}</div><div class="timesheet-entry-actions"><button type="button" class="timesheet-edit-btn" data-timesheet-edit="${e.id}">Edit</button><button type="button" class="timesheet-delete-btn" data-timesheet-delete="${e.id}">Delete</button></div></article>`).join("")}</div>
    </details>`;
  }).join("");
}

function timesheetPage(editId=null){
  const entries=timesheetEntries();
  const editing=editId!==null?entries.find(entry=>String(entry.id)===String(editId)):null;
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backPlacement">‹</button><h2>⏱️ Timesheets</h2></div>
    ${timesheetSubmissionCard()}
    <div class="card green"><div class="label">Timesheet record</div><p>Keep your daily hours current here. The official JCU workbook remains the formal record submitted every two weeks.</p></div>
    <div class="card timesheet-entry-form ${editing?"is-editing":""}">
      <div class="timesheet-form-heading"><div><div class="label">${editing?"Edit saved entry":"Add hours"}</div>${editing?`<p>Update the details below and save your changes.</p>`:""}</div>${editing?`<button type="button" class="timesheet-cancel-edit" id="cancelTimesheetEdit">Cancel</button>`:""}</div>
      <label class="label" for="tsDate">Placement date</label><input id="tsDate" type="date" class="input" value="${editing?safeText(editing.date):""}">
      <div class="grid2 timesheet-time-grid" style="margin-top:10px">
        <label><span>Start</span><select id="tsStart" class="select">${timeSelectOptions(editing?.start||"08:00")}</select></label>
        <label><span>Finish</span><select id="tsFinish" class="select">${timeSelectOptions(editing?.finish||"16:30")}</select></label>
      </div>
      <label class="label" for="tsLunch" style="display:block;margin-top:12px">Unpaid lunch</label>
      <select id="tsLunch" class="select"><option value="30" ${Number(editing?.lunch)===30||!editing?"selected":""}>30 minutes</option><option value="45" ${Number(editing?.lunch)===45?"selected":""}>45 minutes</option></select>
      <p class="timesheet-weekday-note">Monday to Friday only. Weekend dates are blocked unless your placement arrangements change.</p>
      <label class="label" for="tsActivities" style="display:block;margin-top:12px">Activities</label><textarea id="tsActivities" class="textarea" placeholder="Orientation, team meeting, shadowing, documentation, group, supervision, research...">${editing?safeText(editing.activities||""):""}</textarea>
      <button class="btn" id="saveTimesheet">${editing?"Save changes":"Save timesheet entry"}</button>
    </div>
    <section class="card timesheet-saved-card"><div class="label">Saved entries</div>${timesheetEntryGroups(entries)}</section>`;
  document.getElementById("backPlacement").onclick=()=>{route="assessments";render()};
  document.getElementById("cancelTimesheetEdit")?.addEventListener("click",()=>timesheetPage());
  document.getElementById("markTimesheetSubmitted")?.addEventListener("click",event=>{
    markTimesheetSubmitted(event.currentTarget.dataset.dueDate);
    timesheetPage(editing?.id||null);
  });
  document.querySelectorAll("[data-timesheet-edit]").forEach(button=>button.addEventListener("click",()=>{
    timesheetPage(button.dataset.timesheetEdit);
    window.scrollTo({top:0,behavior:"smooth"});
  }));
  document.querySelectorAll("[data-timesheet-delete]").forEach(button=>button.addEventListener("click",()=>{
    const id=button.dataset.timesheetDelete;
    const entry=timesheetEntries().find(item=>String(item.id)===String(id));
    if(!entry)return;
    if(!window.confirm(`Delete the timesheet entry for ${formatPlanningDate(entry.date)}?`))return;
    const updated=timesheetEntries().filter(item=>String(item.id)!==String(id));
    state.set("timesheets",updated);
    state.set("hours",updated.reduce((sum,e)=>sum+Number(e.hours||0),0));
    timesheetPage();
  }));
  document.getElementById("saveTimesheet").onclick=()=>{
    const date=document.getElementById("tsDate").value,start=document.getElementById("tsStart").value,finish=document.getElementById("tsFinish").value,lunch=Number(document.getElementById("tsLunch").value||0),activities=document.getElementById("tsActivities").value.trim();
    if(!date||!start||!finish){alert("Add the date, start and finish time first.");return}
    if(isWeekendDate(date)){alert("Placement is set to Monday to Friday. Choose a weekday date.");return}
    const [sh,sm]=start.split(":").map(Number),[fh,fm]=finish.split(":").map(Number); const total=Math.max(((fh*60+fm)-(sh*60+sm)-lunch)/60,0);
    if(total<=0){alert("Finish time needs to be later than the start time after lunch.");return}
    const arr=timesheetEntries();
    if(editing){
      const index=arr.findIndex(item=>String(item.id)===String(editing.id));
      if(index>=0)arr[index]={...arr[index],date,start,finish,lunch,hours:total,activities};
    }else{
      arr.unshift({id:Date.now(),date,start,finish,lunch,hours:total,activities});
    }
    state.set("timesheets",arr);
    state.set("hours",arr.reduce((sum,e)=>sum+Number(e.hours||0),0));
    alert(editing?"✨ Timesheet entry updated":"✨ Timesheet entry saved");
    timesheetPage();
  };
}


function supervisionRecords(){return state.get("supervisionRecords",[]);}
function reflectionSupervisionFollowUps(){
  const discussed=state.get("supervisionReflectionDiscussed",{});
  return savedEntries().filter(entry=>entry.supervisionFollowUp).map(entry=>({...entry,followedUp:Boolean(discussed[String(entry.id)])}));
}
function setReflectionFollowedUp(id,value){
  const discussed=state.get("supervisionReflectionDiscussed",{});
  discussed[String(id)]=Boolean(value);state.set("supervisionReflectionDiscussed",discussed);
}
function supervisionPage(){
  const items=supervisionItems();
  const records=supervisionRecords();
  const reflectionFollowUps=reflectionSupervisionFollowUps();
  const activeFollowUps=reflectionFollowUps.filter(item=>!item.followedUp);
  const categories=[
    ["Practice situation","A situation or interaction I want help making sense of"],
    ["Theory or framework","A theory I am unsure about or want to apply more confidently"],
    ["Ethics, values or boundaries","Choice, consent, confidentiality, risk, power or professional boundaries"],
    ["Skill feedback","A skill I used, observed or want feedback on"],
    ["Assessment or judgement","How I gathered information, assessed risk or formed a professional view"],
    ["Placement opportunity","An activity, higher duty or learning opportunity I want to request"],
    ["Use of self or wellbeing","My reactions, confidence, communication style or emotional impact"]
  ];
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backPlacement">‹</button><h2>☕ Supervision</h2></div>
    <div class="card green supervision-intro"><div class="label">Supervision</div><p>Keep questions, follow ups and your previous supervision notes together.</p></div>

    <section class="card supervision-followup-card">
      <div class="label">Follow Ups From Reflections</div>
      ${activeFollowUps.length?`<div class="supervision-reflection-followups">${activeFollowUps.map(entry=>`<article class="supervision-reflection-followup"><div><small>${safeText(entry.date||"Reflection")}</small><p>${safeText((entry.moment||entry.answer||"").slice(0,220))}</p></div><button type="button" class="text-link supervision-followed-up" data-followed-up="${entry.id}">Followed up</button></article>`).join("")}</div>`:`<p class="muted personality-empty">Nothing tagged for supervision right now.</p>`}
    </section>

    <section class="card supervision-capture-card">
      <div class="label">What Do I Want to Bring?</div>
      <div class="supervision-category-grid">${categories.map(([name,cue])=>`<button type="button" class="supervision-category" data-supervision-category="${name}" data-supervision-cue="${cue}"><strong>${name}</strong><small>${cue}</small></button>`).join("")}</div>
      <label class="label" for="supType">Category</label><select id="supType" class="select">${categories.map(([name])=>`<option>${name}</option>`).join("")}</select>
      <label class="label" for="supText">Short Note</label><textarea id="supText" class="textarea" placeholder="What happened, what are you unsure about, or what feedback would help?"></textarea>
      <button class="btn" id="saveSupervision">Save for Supervision</button>
    </section>

    <section class="card supervision-record-card">
      <div class="label">Save Supervision Notes</div>
      <label class="label" for="supervisionRecordDate">Date</label><input id="supervisionRecordDate" type="date" class="input" value="${localDateValue()}">
      <label class="label" for="supervisionRecordNotes">Notes</label><textarea id="supervisionRecordNotes" class="textarea" placeholder="Key discussion, feedback, learning or actions from supervision..."></textarea>
      <button class="btn" id="saveSupervisionRecord">Save Supervision Record</button>
    </section>

    ${items.length?`<details class="card supervision-saved"><summary><strong>Saved Questions and Actions</strong><span>${items.length}</span></summary><div class="supervision-saved-list">${items.map(i=>`<article class="supervision-saved-row"><strong>${safeText(i.type)}</strong><small>${safeText(i.date)}</small><p>${safeText(i.text)}</p></article>`).join("")}</div></details>`:""}

    <details class="card supervision-previous" ${records.length?"":"open"}><summary><strong>Previous Supervision</strong><span>${records.length}</span></summary>
      ${records.length?`<div class="supervision-previous-list">${records.map(record=>`<article class="supervision-previous-row"><strong>${safeText(formatPlanningDate(record.date))}</strong><p>${safeText(record.notes)}</p></article>`).join("")}</div>`:`<p class="muted personality-empty">Your saved supervision notes will stay here so you can look back across placement.</p>`}
    </details>

    <details class="card supervision-ideas"><summary><strong>Ideas for Supervision</strong><span>Open only when needed</span></summary><div class="supervision-idea-list">
      <p>Which theory best explains a recent interaction, and what alternatives should I consider?</p>
      <p>How would a social worker approach this differently from a general support role?</p>
      <p>Can I receive feedback on my assessment, documentation, group facilitation or professional judgement?</p>
      <p>What opportunities can I take on to practise higher duties, policy, leadership or multidisciplinary work?</p>
      <p>Was there an ethical tension involving autonomy, risk, family involvement, confidentiality or boundaries?</p>
    </div></details>`;
  document.getElementById("backPlacement").onclick=()=>{route="assessments";render()};
  document.querySelectorAll(".supervision-category").forEach(button=>button.onclick=()=>{
    document.getElementById("supType").value=button.dataset.supervisionCategory;
    const text=document.getElementById("supText");
    if(!text.value)text.placeholder=button.dataset.supervisionCue;
    document.querySelectorAll(".supervision-category").forEach(item=>item.classList.remove("selected"));
    button.classList.add("selected");
  });
  document.querySelectorAll(".supervision-followed-up").forEach(button=>button.onclick=()=>{setReflectionFollowedUp(button.dataset.followedUp,true);supervisionPage();});
  document.getElementById("saveSupervision").onclick=()=>{const text=document.getElementById("supText").value.trim();if(!text){alert("Add a supervision note first.");return}const arr=supervisionItems();arr.unshift({id:Date.now(),date:new Date().toLocaleDateString("en-AU"),type:document.getElementById("supType").value,text});state.set("supervisionItems",arr);supervisionPage();};
  document.getElementById("saveSupervisionRecord").onclick=()=>{
    const date=document.getElementById("supervisionRecordDate").value;
    const notes=document.getElementById("supervisionRecordNotes").value.trim();
    if(!date||!notes){alert("Add a date and your supervision notes first.");return;}
    const arr=supervisionRecords();arr.unshift({id:Date.now(),date,notes});state.set("supervisionRecords",arr);supervisionPage();
  };
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
    </div>`).join(""):`<div class="card personality-empty-card"><p class="muted personality-empty">✨ Your first reflection will begin your evidence bank.</p></div>`}`;
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
    state.set("weeklyReviews",reviews); alert("✨ Weekly check in saved");
  };
}

function myJourneyPage(){
  const entries=savedEntries();
  const reviews=state.get("weeklyReviews",[]);
  const achievements=smartAchievements();
  const grouped={};
  entries.forEach(e=>{
    const d=e.date||"Undated";
    (grouped[d]||(grouped[d]=[])).push(e);
  });
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backMore">‹</button><h2>🌸 My journey</h2></div>
    <div class="card blush-card">
      <div class="label">Looking Back</div>
      <div class="big">Small moments can show you how much your practice is changing.</div>
      <p class="muted">This page gathers your reflections, achievements and check ins across placement.</p>
    </div>
    ${achievements.length?`<details class="card journey-achievements" open><summary><strong>✨ Achievements</strong><span>${achievements.length}</span></summary><div class="journey-achievement-list">${achievements.map(item=>`<article class="journey-achievement-row"><span>${item.icon}</span><div><strong>${safeText(item.title)}</strong><small>${safeText(item.detail)}</small></div></article>`).join("")}</div></details>`:""}
    ${entries.length?Object.entries(grouped).map(([date,list])=>`
      <section class="journey-day">
        <div class="journey-date">${date}</div>
        ${list.map(e=>`<div class="journey-moment"><span>⭐</span><div><strong>${(e.evidenceTypes||[])[0]||"Learning moment"}</strong><p>${e.answer}</p></div></div>`).join("")}
      </section>`).join(""):`<div class="card personality-empty-card"><p class="muted personality-empty">🌱 Your placement journey begins here. Saved moments will appear naturally as you reflect.</p></div>`}
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
  const moment=document.getElementById("answer")?.value.trim()||"";
  if(!moment){alert("Add a quick note about what happened first.");return}
  const involvement=selectedReflectionButtons(".reflection-involvement-chip");
  const outcomeIds=selectedReflectionButtons(".reflection-outcome-chip");
  const focusAreas=selectedReflectionButtons(".reflection-focus-chip");
  const practiceConnections=[...new Set(selectedReflectionButtons(".reflection-practice-chip").filter(value=>value!=="Not sure"))];
  const projectRelated=document.getElementById("reflectionProjectYes")?.classList.contains("selected")||false;
  const supervisionFollowUp=document.getElementById("reflectionSupervisionFollowUp")?.classList.contains("selected")||false;
  const reflectionNote=document.getElementById("reflectionNote")?.value.trim()||"";
  const practiceNote=document.getElementById("reflectionPracticeNote")?.value.trim()||"";
  const criticalPrompt=document.getElementById("criticalReflectionWrap")?.classList.contains("hidden")?"":document.getElementById("criticalReflectionPrompt")?.textContent.trim()||"";
  const criticalAnswer=document.getElementById("criticalReflectionAnswer")?.value.trim()||"";
  const outcomeTags=reflectionOutcomeOptions.filter(option=>outcomeIds.includes(option.id)).map(option=>option.label);
  const learningOutcomeLabels=reflectionFocusOptions.filter(option=>focusAreas.includes(option.id)&&option.id!=="unsure").map(option=>option.lo);

  // Keep the existing evidence structure populated so older assessment and framework views continue to work.
  const theories=[...practiceConnections],methods=[],skills=[],values=[],ethics=[],assessmentJudgement=[],useOfSelfTags=[],cultural=[],systems=[],supervisionLearning=[],researchEvidence=[];
  const evidenceTypes=[];
  const addEvidence=value=>{if(value&&!evidenceTypes.includes(value))evidenceTypes.push(value)};
  if(practiceConnections.length){addEvidence("Theory in action");addEvidence("Knowledge");}
  if(criticalAnswer){addEvidence("Critical reflection");addEvidence("Use of self");}
  focusAreas.forEach(area=>{
    if(area==="values"){values.push("Values and professional judgement");addEvidence("Ethics or values");}
    if(area==="culture"){cultural.push("Culturally responsive practice");addEvidence("Cultural capability");}
    if(area==="knowledge"){researchEvidence.push("Knowledge and understanding");addEvidence("Knowledge");addEvidence("Theory in action");}
    if(area==="communication"){skills.push("Communication and working with people");useOfSelfTags.push("Use of self in practice");addEvidence("Communication");addEvidence("Skill");addEvidence("Use of self");}
    if(area==="assessment"){assessmentJudgement.push("Assessment and documentation");skills.push("Information recording and sharing");addEvidence("Documentation");addEvidence("Skill");}
    if(area==="development"){supervisionLearning.push("Professional development and reflection");useOfSelfTags.push("Developing social work practice");addEvidence("Professional development");addEvidence("Use of self");}
  });
  outcomeIds.forEach(id=>{
    if(id==="learned")addEvidence("Knowledge");
    if(id==="confidence")addEvidence("Professional development");
    if(id==="skill")addEvidence("Skill");
    if(id==="changed")addEvidence("Use of self");
    if(id==="feedback")addEvidence("Feedback");
    if(id==="practice")addEvidence("Professional development");
  });
  if(involvement.includes("Involved")||involvement.includes("Led")||involvement.includes("Participated"))addEvidence("Communication");
  const practiceStandards=[];
  if(focusAreas.includes("values"))practiceStandards.push("Practice Standard 1: Values and ethics");
  if(focusAreas.includes("culture"))practiceStandards.push("Practice Standards 2 and 4: Culturally responsive and inclusive practice");
  if(focusAreas.includes("knowledge"))practiceStandards.push("Practice Standard 5: Professional knowledge");
  if(focusAreas.includes("communication"))practiceStandards.push("Practice Standards 3 and 7: Advocacy and professional identity");
  if(focusAreas.includes("assessment"))practiceStandards.push("Practice Standard 6: Holistic assessment and professional decision making");
  if(focusAreas.includes("development"))practiceStandards.push("Practice Standards 8 and 9: Supervision and professional development");

  const autoMapped=mappedAssessments(evidenceTypes);
  if(projectRelated){
    if(!autoMapped.includes("Small Project"))autoMapped.push("Small Project");
    if(!autoMapped.includes("Project Reflections"))autoMapped.push("Project Reflections");
    if(!autoMapped.includes("Final Presentation"))autoMapped.push("Final Presentation");
  }
  const info=placementInfo(),p=dailyPrompt(info,hours());
  const entry={
    id:Date.now(),date:new Date().toLocaleDateString("en-AU"),goal:p.goal,mood:"",answer:moment,moment,
    involvement,outcomeIds,outcomeTags,focusAreas,learningOutcomes:focusAreas.filter(id=>id!=="unsure"),learningOutcomeLabels,projectRelated,supervisionFollowUp,reflectionNote,practiceConnections,practiceNote,criticalPrompt,criticalAnswer,
    theories,methods,skills,values,ethics,assessmentJudgement,useOfSelfTags,cultural,systems,supervisionLearning,researchEvidence,lensStatus:{},practiceStandards,
    useOfSelf:useOfSelfTags.join(", "),deeperQuestion:criticalPrompt||reflectionPromptForSelection(),deeperAnswer:criticalAnswer||reflectionNote,futurePractice:"",professionalIdentity:"",evidenceTypes,theory:practiceConnections.join(", "),method:"",supervision:"",evidence:autoMapped
  };
  const arr=savedEntries();
  const editingId=state.get("editingReflectionId",null);
  if(editingId){
    const index=arr.findIndex(item=>String(item.id)===String(editingId));
    if(index>=0){entry.id=arr[index].id;entry.date=arr[index].date||entry.date;arr[index]={...arr[index],...entry};}
    else arr.unshift(entry);
  }else arr.unshift(entry);
  state.set("entries",arr);
  const framework=frameworkData();
  framework.values=[...new Set([...(framework.values||[]),...values])];
  framework.theories=[...new Set([...(framework.theories||[]),...practiceConnections,...researchEvidence])];
  framework.skills=[...new Set([...(framework.skills||[]),...skills,...assessmentJudgement])];
  framework.cultural=[...new Set([...(framework.cultural||[]),...cultural])];
  if(useOfSelfTags.length)framework.useOfSelf=[framework.useOfSelf,useOfSelfTags.join(", ")].filter(Boolean).join("\n");
  saveFrameworkData(framework);
  clearReflectionDraft();lastSavedReflection=entry;render();window.scrollTo({top:0,behavior:"smooth"});
}
function editReflection(id){
  const entry=savedEntries().find(item=>String(item.id)===String(id));
  if(!entry)return;
  state.set("editingReflectionId",entry.id);
  state.set(REFLECTION_DRAFT_KEY,{
    answer:entry.moment||entry.answer||"",
    involvement:entry.involvement||[],
    outcomes:entry.outcomeIds||[],
    focus:entry.focusAreas||entry.learningOutcomes||[],
    practiceConnections:entry.practiceConnections||entry.theories||[],
    projectRelated:Boolean(entry.projectRelated),
    supervisionFollowUp:Boolean(entry.supervisionFollowUp),
    reflectionNote:entry.reflectionNote||"",
    practiceNote:entry.practiceNote||"",
    criticalPrompt:entry.criticalPrompt||"",
    criticalAnswer:entry.criticalAnswer||"",
    updatedAt:new Date().toISOString()
  });
  route="journal";render();window.scrollTo({top:0,behavior:"smooth"});
}
function safeText(value){return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function triggerFileDownload(blob,filename){
  const url=URL.createObjectURL(blob); const link=document.createElement("a"); link.href=url; link.download=filename; link.style.display="none"; document.body.appendChild(link); link.click(); setTimeout(()=>{URL.revokeObjectURL(url);link.remove();},1500);
}
async function shareOrDownload(blob,filename,title){
  try{
    if(navigator.share && window.File){const file=new File([blob],filename,{type:blob.type}); if(!navigator.canShare || navigator.canShare({files:[file]})){await navigator.share({title,files:[file]});return;}}
  }catch(error){if(error && error.name==="AbortError") return;}
  triggerFileDownload(blob,filename);
}
function exportPrintable(){
  try{
    const entries=savedEntries(),reviews=state.get("weeklyReviews",[]),timesheets=timesheetEntries(),frameworkSummary=frameworkSummaryData(),frameworkHistory=frameworkSummaryHistoryData();
    const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Practice Compass Export</title><style>body{font-family:Arial,sans-serif;max-width:850px;margin:40px auto;padding:0 20px;color:#2f332f}h1,h2{color:#536158}.entry{border:1px solid #ddd6cc;border-radius:12px;padding:18px;margin:16px 0}.meta{color:#777;font-size:13px}.pill{display:inline-block;background:#e8eee9;padding:5px 8px;border-radius:99px;margin:3px}pre{white-space:pre-wrap;font-family:inherit}</style></head><body><h1>Practice Compass Placement Notes</h1><p>${safeText(placementProfileLabel()||"Placement details not added")}</p><h2>Learning moments</h2>${entries.map(e=>`<div class="entry"><div class="meta">${safeText(e.date)} · Goal ${safeText(e.goal)}</div><pre>${safeText(e.answer)}</pre>${(e.evidenceTypes||[]).map(x=>`<span class="pill">${safeText(x)}</span>`).join("")}${e.supervision?`<p><strong>Supervision:</strong> ${safeText(e.supervision)}</p>`:""}</div>`).join("")||"<p>No entries yet.</p>"}<h2>Timesheets</h2>${timesheets.map(e=>`<div class="entry"><strong>${safeText(e.date)}</strong><p>${safeText(e.start)} to ${safeText(e.finish)} · ${Number(e.hours||0).toFixed(2)} hours</p><p>${safeText(e.activities)}</p></div>`).join("")||"<p>No timesheet entries yet.</p>"}<h2>Weekly check ins</h2>${reviews.map(r=>`<div class="entry"><div class="meta">${safeText(r.date)}</div>${(r.answers||[]).map(x=>`<p><strong>${safeText(x.q)}</strong><br>${safeText(x.a)}</p>`).join("")}</div>`).join("")||"<p>No weekly reviews yet.</p>"}<h2>My Practice Framework</h2><div class="entry"><p><strong>Vision:</strong><br>${safeText(frameworkSummary.vision)||"Not added"}</p><p><strong>Purpose:</strong><br>${safeText(frameworkSummary.purpose)||"Not added"}</p><p><strong>Values:</strong><br>${safeText(frameworkSummary.values)||"Not added"}</p><p><strong>Theories:</strong><br>${safeText(frameworkSummary.theories)||"Not added"}</p><p><strong>Practice tools:</strong><br>${safeText(frameworkSummary.tools)||"Not added"}</p><p><strong>Reflection and accountability:</strong><br>${safeText(frameworkSummary.reflection)||"Not added"}</p></div>${frameworkHistory.length?`<h2>Practice Framework History</h2>${frameworkHistory.slice().reverse().map(version=>{const d=new Date(version.savedAt);const dateLabel=Number.isNaN(d.getTime())?"Saved version":d.toLocaleString("en-AU",{dateStyle:"medium",timeStyle:"short"});return `<div class="entry"><div class="meta">${safeText(dateLabel)}</div><p><strong>Vision:</strong><br>${safeText(version.summary?.vision)||"Not added"}</p><p><strong>Purpose:</strong><br>${safeText(version.summary?.purpose)||"Not added"}</p><p><strong>Values:</strong><br>${safeText(version.summary?.values)||"Not added"}</p><p><strong>Theories:</strong><br>${safeText(version.summary?.theories)||"Not added"}</p><p><strong>Practice tools:</strong><br>${safeText(version.summary?.tools)||"Not added"}</p><p><strong>Reflection and accountability:</strong><br>${safeText(version.summary?.reflection)||"Not added"}</p></div>`;}).join("")}`:""}</body></html>`;
    shareOrDownload(new Blob([html],{type:"text/html"}),"Practice_Compass_Placement_Notes.html","Practice Compass placement notes");
  }catch(error){console.error(error);alert("The export could not be created. Please try the JSON backup instead.");}
}
function savePlacementProfile(){
  const studentName=document.getElementById("profileStudentName")?.value.trim()||"";
  const agency=document.getElementById("profileAgency")?.value.trim()||"";
  const service=document.getElementById("profileService")?.value.trim()||"";
  const startDate=document.getElementById("profileStartDate")?.value||"";
  const endDate=document.getElementById("profileEndDate")?.value||"";
  const totalHours=Math.max(1,Number(document.getElementById("profileTotalHours")?.value)||DEFAULT_TOTAL_HOURS);
  const weekRaw=document.getElementById("profileWeekOverride")?.value.trim()||"";
  const weekOverride=weekRaw?String(Math.max(1,Math.floor(Number(weekRaw)||1))):"";
  state.set("placementProfile",{studentName,agency,service,startDate,endDate,totalHours,weekOverride});
  render();
}
function resetPracticeCompassThisDevice(){
  const first=window.confirm("Start fresh on this device? This will permanently remove reflections, timesheets, hours, supervision notes, assessment progress and other Practice Compass data stored in this browser only. It will not clear data on another phone, tablet or computer.");
  if(!first)return;
  const typed=window.prompt('Type CLEAR to confirm. If you need this device’s data, cancel and create a backup first.');
  if(typed!=="CLEAR")return;
  try{
    localStorage.clear();
    localStorage.setItem("placementProfile",JSON.stringify({...EMPTY_PLACEMENT_PROFILE}));
    alert("Practice Compass data has been cleared from this device only. The app will now reload so a new user can add their placement details.");
    window.location.reload();
  }catch(error){
    console.error(error);
    alert("Practice Compass could not be cleared. No further changes were made.");
  }
}

const PRACTICE_COMPASS_BACKUP_VERSION=2;
function backupStatusText(){
  const value=state.get("lastBackupAt","");
  if(!value)return "No full backup recorded on this device yet.";
  const date=new Date(value);
  return Number.isNaN(date.getTime())?"A backup has been created on this device.":`Last full backup: ${date.toLocaleString("en-AU",{dateStyle:"medium",timeStyle:"short"})}`;
}
function localStorageSnapshot(){
  const data={};
  for(let index=0;index<localStorage.length;index++){
    const key=localStorage.key(index);
    if(key!==null)data[key]=localStorage.getItem(key);
  }
  return data;
}
function backupSummaryFromStorage(storage={}){
  const read=(key,fallback)=>{
    try{return storage[key]===undefined?fallback:JSON.parse(storage[key]);}catch{return fallback;}
  };
  const entries=read("entries",[]),timesheets=read("timesheets",[]),weekly=read("weeklyReviews",[]),supervision=read("supervisionItems",[]);
  const hoursValue=read("hours",0);
  return {
    reflections:Array.isArray(entries)?entries.length:0,
    timesheets:Array.isArray(timesheets)?timesheets.length:0,
    weeklyReviews:Array.isArray(weekly)?weekly.length:0,
    supervisionItems:Array.isArray(supervision)?supervision.length:0,
    hours:Number(hoursValue)||0,
    keys:Object.keys(storage).length
  };
}
function createFullBackup(){
  const exportedAt=new Date().toISOString();
  state.set("lastBackupAt",exportedAt);
  const storage=localStorageSnapshot();
  return {
    app:"Practice Compass",
    backupVersion:PRACTICE_COMPASS_BACKUP_VERSION,
    exportedAt,
    summary:backupSummaryFromStorage(storage),
    storage
  };
}
function backup(){
  try{
    const data=createFullBackup();
    const stamp=data.exportedAt.slice(0,10);
    shareOrDownload(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),`Practice_Compass_Backup_${stamp}.json`,"Practice Compass full backup");
    const status=document.getElementById("backupStatus");if(status)status.textContent=backupStatusText();
  }catch(error){console.error(error);alert("The backup could not be created. Please try again.");}
}
function normaliseBackupFile(parsed){
  if(parsed && parsed.app==="Practice Compass" && parsed.storage && typeof parsed.storage==="object")return parsed;
  if(parsed && typeof parsed==="object" && (Array.isArray(parsed.entries)||Array.isArray(parsed.timesheets))){
    const storage={};
    Object.entries(parsed).forEach(([key,value])=>{if(key!=="exportedAt")storage[key]=JSON.stringify(value);});
    return {app:"Practice Compass",backupVersion:1,exportedAt:parsed.exportedAt||"",summary:backupSummaryFromStorage(storage),storage};
  }
  throw new Error("This does not appear to be a Practice Compass backup file.");
}
function formatBackupDate(value){
  const date=new Date(value);
  return Number.isNaN(date.getTime())?"Date not available":date.toLocaleString("en-AU",{dateStyle:"medium",timeStyle:"short"});
}
function showBackupPreview(backup,fileName){
  const panel=document.getElementById("backupRestorePanel");if(!panel)return;
  const summary=backup.summary||backupSummaryFromStorage(backup.storage);
  panel.classList.remove("hidden");
  panel.innerHTML=`<div class="backup-preview-heading"><div><span class="eyebrow">Backup preview</span><h3>${safeText(fileName||"Practice Compass backup")}</h3></div><button type="button" class="backup-preview-close" id="cancelRestore" aria-label="Close backup preview">×</button></div>
    <p class="backup-preview-date">Created ${safeText(formatBackupDate(backup.exportedAt))}</p>
    <div class="backup-preview-grid">
      <span><strong>${Number(summary.reflections||0)}</strong><small>Reflections</small></span>
      <span><strong>${Number(summary.timesheets||0)}</strong><small>Timesheet entries</small></span>
      <span><strong>${Number(summary.hours||0).toFixed(1)}</strong><small>Saved hours</small></span>
      <span><strong>${Number(summary.supervisionItems||0)}</strong><small>Supervision items</small></span>
    </div>
    <div class="backup-warning"><strong>This will replace the data stored in this browser.</strong><p>Your current phone or laptop data will not be merged. Create a backup of this device first if there is anything you need to keep.</p></div>
    <div class="backup-preview-actions"><button type="button" class="btn secondary" id="cancelRestoreButton">Cancel</button><button type="button" class="btn backup-restore-confirm" id="confirmRestore">Restore this backup</button></div>`;
  const close=()=>{panel.classList.add("hidden");panel.innerHTML="";};
  document.getElementById("cancelRestore")?.addEventListener("click",close);
  document.getElementById("cancelRestoreButton")?.addEventListener("click",close);
  document.getElementById("confirmRestore")?.addEventListener("click",()=>restoreBackup(backup));
}
function restoreBackup(backup){
  const confirmed=window.confirm("Restore this backup and replace the Practice Compass data currently stored in this browser?");
  if(!confirmed)return;
  try{
    const preservedBackupDate=backup.exportedAt||new Date().toISOString();
    localStorage.clear();
    Object.entries(backup.storage||{}).forEach(([key,value])=>{
      if(typeof value==="string")localStorage.setItem(key,value);
      else localStorage.setItem(key,JSON.stringify(value));
    });
    state.set("lastRestoredAt",new Date().toISOString());
    state.set("restoredFromBackupAt",preservedBackupDate);
    alert("Your Practice Compass backup has been restored. The app will now reload.");
    window.location.reload();
  }catch(error){
    console.error(error);
    alert("The backup could not be restored. No further changes have been made.");
  }
}
function readBackupFile(file){
  if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{showBackupPreview(normaliseBackupFile(JSON.parse(String(reader.result||""))),file.name);}
    catch(error){console.error(error);alert(error.message||"That backup file could not be read.");}
  };
  reader.onerror=()=>alert("That backup file could not be read.");
  reader.readAsText(file);
}

function updateReflectionPreview(){}

function suggestionReason(value){
  const info=reflectionConceptInfo[value];
  if(info)return info[1];
  if(value.startsWith("Practice Standard"))return "This may relate because the activity you selected can demonstrate this area of professional practice. You decide whether it genuinely fits your reflection.";
  return "This may relate to the experience you selected. Choose it only if it helps explain what happened or why it mattered.";
}
function renderProgressiveSuggestions(targetId,items,type){
  const target=document.getElementById(targetId);if(!target)return;
  const cls=type==="theory"?"theory-chip concept-chip":type==="standard"?"standard-chip":"";
  target.classList.remove("hidden");
  target.innerHTML=`<p class="suggestion-intro">These may relate. Select only what genuinely fits.</p><div class="suggestion-stack">${items.map(value=>{
    const isValue=reflectionCodeValues.includes(value), isEthics=reflectionEthicsOptions.includes(value);
    const chipClass=type==="ethics"?(isValue?"value-chip concept-chip":"ethics-chip concept-chip"):cls;
    return `<article class="suggestion-item"><button type="button" class="select-chip ${chipClass}" data-value="${safeText(value)}"><span>${safeText(value)}</span></button><p>${safeText(suggestionReason(value))}</p>${type!=="standard"?`<button type="button" class="text-link suggestion-learn" data-topic="${safeText(value)}">📚 Learn More</button>`:""}</article>`;
  }).join("")}</div>`;
  target.querySelectorAll(".select-chip").forEach(btn=>btn.onclick=()=>{btn.classList.toggle("selected");if(btn.classList.contains("concept-chip"))showReflectionConcept(btn.dataset.value);});
  target.querySelectorAll(".suggestion-learn").forEach(btn=>btn.onclick=()=>{const info=reflectionConceptInfo[btn.dataset.topic];openToolkitTopicByName(info?info[2]:btn.dataset.topic);});
}
function selectReflectionContext(button,selector,map,targetId,type){
  document.querySelectorAll(selector).forEach(x=>x.classList.remove("selected"));button.classList.add("selected");renderProgressiveSuggestions(targetId,map[button.dataset.context]||[],type);
}

function showReflectionConcept(value){
  const box=document.getElementById("conceptExplanation");if(!box)return;
  const info=reflectionConceptInfo[value]||[`${value} is a practice concept you can explore in relation to this experience.`,`Consider what you noticed in your reflection and whether this concept helps explain the interaction, decision or context.`,value];
  box.classList.remove("hidden");box.innerHTML=`<button type="button" class="concept-close" aria-label="Close">×</button><strong>${safeText(value)}</strong><p>${safeText(info[0])}</p><small>Why this might relate to today’s reflection</small><p>${safeText(info[1])}</p><button type="button" class="btn secondary concept-learn-more">📚 Learn More</button>`;
  box.querySelector(".concept-close").onclick=()=>box.classList.add("hidden");box.querySelector(".concept-learn-more").onclick=()=>openToolkitTopicByName(info[2]);
}

function bind(){
  document.getElementById("startJournal")?.addEventListener("click",()=>{route="journal";render()});
  document.getElementById("openEvidence")?.addEventListener("click",evidenceBankPage);
  document.getElementById("whyFocus")?.addEventListener("click",()=>{
    const box=document.getElementById("whyFocusText");
    box.classList.toggle("hidden");
  });
  document.getElementById("completeDay")?.addEventListener("click",()=>{state.set("hours",Math.min(placementTotalHours(),hours()+HOURS_PER_DAY));render()});
  document.getElementById("adjustHours")?.addEventListener("click",()=>{const v=prompt("Enter total completed placement hours:",hours()); if(v!==null&&!isNaN(Number(v))){state.set("hours",Number(v));render()}});
  document.getElementById("saveEntry")?.addEventListener("click",saveEntry);
  document.querySelectorAll(".reflection-involvement-chip,.reflection-outcome-chip,.reflection-focus-chip,.reflection-practice-chip").forEach(button=>button.addEventListener("click",()=>{
    if(button.classList.contains("reflection-focus-chip")&&button.dataset.value==="unsure"){
      document.querySelectorAll(".reflection-focus-chip").forEach(item=>item.classList.remove("selected"));button.classList.add("selected");
    }else{
      button.classList.toggle("selected");
      if(button.classList.contains("reflection-focus-chip")&&button.classList.contains("selected"))document.querySelector('.reflection-focus-chip[data-value="unsure"]')?.classList.remove("selected");
    }
    if(button.classList.contains("reflection-practice-chip")){
      const value=button.dataset.value;
      if(value==="Not sure"&&button.classList.contains("selected")){
        document.querySelectorAll('.reflection-practice-chip:not([data-value="Not sure"])').forEach(item=>item.classList.remove("selected"));
      }else if(value!=="Not sure"&&button.classList.contains("selected")){
        document.querySelectorAll('.reflection-practice-chip[data-value="Not sure"]').forEach(item=>item.classList.remove("selected"));
        document.querySelectorAll(`.reflection-practice-chip[data-value="${CSS.escape(value)}"]`).forEach(item=>item.classList.add("selected"));
      }else if(value!=="Not sure")document.querySelectorAll(`.reflection-practice-chip[data-value="${CSS.escape(value)}"]`).forEach(item=>item.classList.remove("selected"));
      updatePracticeConnectionNote();
    }
    updateReflectionPrompt();captureReflectionDraft();
  }));
  document.getElementById("openPracticeLibrary")?.addEventListener("click",()=>document.getElementById("practiceLibraryPanel")?.classList.remove("hidden"));
  document.getElementById("closePracticeLibrary")?.addEventListener("click",()=>document.getElementById("practiceLibraryPanel")?.classList.add("hidden"));
  document.getElementById("practiceLibrarySearch")?.addEventListener("input",filterPracticeLibrary);
  document.getElementById("helpIdentifyTheory")?.addEventListener("click",()=>document.getElementById("theoryHelperPanel")?.classList.remove("hidden"));
  document.getElementById("closeTheoryHelper")?.addEventListener("click",()=>document.getElementById("theoryHelperPanel")?.classList.add("hidden"));
  document.querySelectorAll(".reflection-theory-cue-chip").forEach(button=>button.addEventListener("click",()=>{button.classList.toggle("selected");renderTheorySuggestions();}));
  document.getElementById("thinkDeeper")?.addEventListener("click",()=>setCriticalReflectionPrompt());
  document.getElementById("anotherCriticalPrompt")?.addEventListener("click",()=>setCriticalReflectionPrompt());
  document.querySelectorAll(".reflection-project-chip").forEach(button=>button.addEventListener("click",()=>{
    document.querySelectorAll(".reflection-project-chip").forEach(item=>item.classList.toggle("selected",item===button));captureReflectionDraft();
  }));
  document.getElementById("reflectionSupervisionFollowUp")?.addEventListener("click",event=>{event.currentTarget.classList.toggle("selected");captureReflectionDraft();});
  document.querySelectorAll("[data-edit-reflection]").forEach(button=>button.addEventListener("click",()=>editReflection(button.dataset.editReflection)));
  ["answer","reflectionNote","reflectionPracticeNote","criticalReflectionAnswer"].forEach(id=>document.getElementById(id)?.addEventListener("input",captureReflectionDraft));
  restoreReflectionDraft();
  document.getElementById("reflectionSearch")?.addEventListener("input",event=>{const q=event.target.value.toLowerCase();document.querySelectorAll(".reflection-library-item").forEach(item=>item.classList.toggle("hidden",!item.dataset.search.includes(q)));});
  document.getElementById("reflectionInsight")?.addEventListener("toggle",event=>state.set("reflectionInsightOpen",event.currentTarget.open));
  document.getElementById("reflectionLibrary")?.addEventListener("toggle",event=>state.set("reflectionLibraryOpen",event.currentTarget.open));
  document.getElementById("collapseAllReflections")?.addEventListener("click",()=>document.querySelectorAll(".reflection-library-item[open]").forEach(item=>item.open=false));
  document.getElementById("saveQuickHours")?.addEventListener("click",saveQuickHours);
  document.getElementById("quickHoursDate")?.addEventListener("change",event=>{quickHoursEditingDate=event.target.value;render()});
  document.getElementById("quickPlacementDay")?.addEventListener("change",event=>{const input=document.getElementById("quickHoursValue");if(input && !event.target.checked && input.value==="") input.value="0";});
  document.querySelectorAll(".home-hours-edit-link").forEach(button=>button.addEventListener("click",()=>{quickHoursEditingDate=button.dataset.hoursDate;render()}));
  document.getElementById("openCurrentAssessment")?.addEventListener("click",e=>assessmentDetail(e.currentTarget.dataset.id));
  document.getElementById("openEvidenceMap")?.addEventListener("click",()=>evidenceMapPage());
  document.getElementById("openFramework")?.addEventListener("click",()=>frameworkPage());
  document.getElementById("openTimesheets")?.addEventListener("click",()=>timesheetPage());
  document.getElementById("openWhereGrowing")?.addEventListener("click",()=>whereImGrowingPage());
  document.getElementById("openSupervision")?.addEventListener("click",()=>supervisionPage());
  document.getElementById("homeCreateSupervision")?.addEventListener("click",()=>supervisionPage());
  document.getElementById("homePracticeFramework")?.addEventListener("click",()=>frameworkPage());
  document.getElementById("viewAchievements")?.addEventListener("click",()=>myJourneyPage());
  document.querySelectorAll("[data-smart-action]").forEach(button=>button.addEventListener("click",()=>{
    const action=button.dataset.smartAction;
    if(action==="Supervision")supervisionPage();
    else if(action==="Reflect"){route="journal";render();}
    else if(action==="Where I’m Growing")whereImGrowingPage();
  }));
  document.querySelectorAll(".home-reminder-row").forEach(button=>button.addEventListener("click",()=>{
    if(button.dataset.reminderType==="timesheet")timesheetPage();
    else assessmentDetail(button.dataset.assessmentId||"integration");
  }));
  document.getElementById("markTimesheetSubmitted")?.addEventListener("click",event=>{
    markTimesheetSubmitted(event.currentTarget.dataset.dueDate);
    timesheetPage();
  });
  document.querySelectorAll(".assessment").forEach(x=>x.onclick=()=>assessmentDetail(x.dataset.id));
  document.querySelectorAll(".assessment-component-check").forEach(input=>input.addEventListener("change",()=>{setAssessmentComponentStatus(input.dataset.assessment,input.dataset.component,input.checked?"complete":"not_started");assessmentDetail(input.dataset.assessment);}));
  document.querySelectorAll(".assessment-plan-edit").forEach(x=>x.onclick=()=>assessmentDetail(x.dataset.id,true));
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
  
    document.getElementById("frameworkMenu")?.addEventListener("click",()=>frameworkPage());
    document.getElementById("professionalDevelopmentMenu")?.addEventListener("click",()=>frameworkPage());
    document.getElementById("evidenceBank")?.addEventListener("click",()=>evidenceBankPage());
  document.getElementById("weeklyReview")?.addEventListener("click",()=>weeklyReviewPage());
  document.getElementById("myJourney")?.addEventListener("click",myJourneyPage);
  document.getElementById("wellbeing")?.addEventListener("click",()=>wellbeingPage());
  document.getElementById("exportHtml")?.addEventListener("click",()=>exportPrintable());
  document.getElementById("savePlacementProfile")?.addEventListener("click",savePlacementProfile);
  document.getElementById("backupJson")?.addEventListener("click",()=>backup());
  document.getElementById("restoreJson")?.addEventListener("click",()=>document.getElementById("restoreJsonFile")?.click());
  document.getElementById("resetThisDevice")?.addEventListener("click",resetPracticeCompassThisDevice);
  document.getElementById("restoreJsonFile")?.addEventListener("change",event=>{const file=event.target.files?.[0];readBackupFile(file);event.target.value="";});
}

document.querySelectorAll(".nav").forEach(n=>n.onclick=()=>{route=n.dataset.route;render()});
document.getElementById("menuBtn").onclick=()=>{route="more";render()};
render();
