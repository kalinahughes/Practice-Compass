
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
    ["Narrative Practice", "Separate the person from the problem."],
    ["Feminist Social Work", "Examine gender, power and structural inequality."],
    ["Anti Oppressive Practice", "Notice and challenge power, privilege and oppression."],
    ["Trauma Informed Practice", "Prioritise safety, trust, choice and collaboration."],
    ["Person Centred Practice", "Keep the person’s goals, preferences and lived experience central."],
    ["Motivational Interviewing", "Explore ambivalence and strengthen the person’s own reasons for change."],
    ["Attachment Theory", "Consider how safety and connection shape relationships."]
  ]],
  ["🛠️", "Practice Skills", "Practical methods for direct work, collaboration, recording and evidence use.", [
    ["Engagement & Rapport", "Build trust through warmth, clarity and respectful pacing."],
    ["Active Listening", "Use reflection, summarising, silence and clarification."],
    ["Assessment", "Explore needs, strengths, goals, risks and context."],
    ["Risk & Safety Planning", "Work collaboratively around risk and protective factors."],
    ["Suicide Risk Assessment", "Explore suicidal distress, immediate safety, supports and next steps within scope."],
    ["Safety Planning", "Develop practical, collaborative steps for periods of increased distress or risk."],
    ["Advocacy", "Address barriers, rights and access to services."],
    ["Case Management", "Coordinate planning, services, referrals and review."],
    ["Group Facilitation", "Support participation, purpose and group safety."],
    ["Difficult Conversations", "Stay clear, respectful and grounded."],
    ["Trauma Informed Communication", "Support safety, choice and control."],
    ["De escalation", "Reduce intensity while maintaining dignity and safety."],
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
    ["Supervision", "Use reflection, feedback and accountability to grow."],
    ["Professional Sustainability", "Recognise stress and the need for support."],
    ["Mental Health Act 2016 (Qld)", "Rights, treatment, decision making and safeguards."],
    ["Human Rights Act 2019 (Qld)", "Human rights in public decision making."],
    ["Privacy & Confidentiality", "Information handling, consent and disclosure."],
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
      "Follow current Mind Australia policy, consent documentation, privacy requirements and supervisor guidance."
    ],
    related:["Informed Consent","Confidentiality","Supported Decision Making","Recovery Oriented Practice","Systems & Ecological Theory","Safety Planning"],
    refs:[
      ["Mind Australia, Family and Carer Inclusion Policy and practice guidance reviewed during placement",""],
      ["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],
      ["Australian Government, National framework for recovery oriented mental health services","https://www.health.gov.au/resources/publications/a-national-framework-for-recovery-oriented-mental-health-services-guide-for-practitioners-and-providers"],
      ["Carer Gateway, support for carers","https://www.carergateway.gov.au/"]
    ]
  },
  "Documentation": {
    what:"Social work documentation creates an accountable record of contact, assessment, decisions, actions and follow up. Good records support continuity, communication, safety and the person’s rights. They should be relevant, timely, respectful, accurate and clear about the source of information and the worker’s professional judgement.",
    practice:["Record the purpose of contact, relevant facts, the person’s views, strengths, risks, actions and next steps.","Separate direct observations, reported information and professional interpretation.","Use objective, person respecting language and avoid unnecessary detail.","Complete records promptly and follow correction, access and security procedures."],
    remember:["Write as though the person may read the record.","Do not copy forward outdated assumptions or use stigmatising labels.","Document consultation and the rationale for significant decisions."],
    related:["Case Notes","Confidentiality","Risk & Safety Planning","AASW Practice Standards"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  }
};


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
    <div class="screen-title">
      <button class="back" id="backToolkit" aria-label="Back to Practice Toolkit">‹</button>
      <h2>${category[0]} ${topic[0]}</h2>
    </div>

    <div class="source-review">Verified sources · Reviewed ${data.reviewed}</div>

    <div class="card green">
      <div class="label">Overview</div>
      <div class="big">${data.overview}</div>
    </div>

    <details class="card toolkit-info" open>
      <summary><strong>🌿 Why does it matter in social work?</strong></summary>
      <p>${data.why}</p>
    </details>

    <details class="card toolkit-info" open>
      <summary><strong>📊 Australian and Queensland data</strong></summary>
      <div class="stats-list">
        ${data.statistics.map(stat=>`
          <div class="stat-fact">
            <strong>${stat[0]}</strong>
            <p>${stat[1]}</p>
            <span>${stat[2]}</span>
          </div>`).join("")}
      </div>
      <p class="data-note">Statistics describe recorded survey or administrative data and do not capture every experience. Definitions and populations differ between sources.</p>
    </details>

    <details class="card toolkit-info">
      <summary><strong>💬 Practice considerations</strong></summary>
      ${data.practice.map(item=>`<div class="row"><span>•</span><span>${item}</span></div>`).join("")}
    </details>

    <details class="card toolkit-info">
      <summary><strong>🧠 Relevant practice lenses</strong></summary>
      ${data.lenses.map(item=>`<span class="pill">${item}</span>`).join("")}
    </details>

    <details class="card toolkit-info">
      <summary><strong>🪞 Reflective prompts</strong></summary>
      ${data.prompts.map(item=>`<div class="row"><span>○</span><span>${item}</span></div>`).join("")}
    </details>

    <div class="card">
      <div class="label">📚 Original sources</div>
      <p class="muted">Open the original publication before using a statistic in university work.</p>
      <div class="source-list">
        ${data.sources.map(source=>`
          <a class="source-link" href="${source.url}" target="_blank" rel="noopener noreferrer external">
            <span class="source-type">${source.type}</span>
            <strong>${source.title}</strong>
            <small>${source.organisation}</small><span class="open-source-label">Open original source ↗</span>
          </a>`).join("")}
      </div>
      <button class="btn secondary" id="returnToolkit">Return to Practice Toolkit</button>
    </div>`;

  const goBack=()=>{route="learn";render()};
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
  const ordered=assessmentPriority(info,hours)
    .map(id=>assessments.find(item=>item.id===id))
    .filter(Boolean);
  return ordered.find(item=>!assessmentIsComplete(item.id)) || ordered[ordered.length-1] || assessments[0];
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

function formatPlanningDate(value){
  if(!value) return "Not set";
  const [year,month,day]=value.split("-").map(Number);
  if(!year||!month||!day) return value;
  return new Date(year,month-1,day).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"});
}

function escapeAttribute(value){
  return String(value||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
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

function todayPage(){
  const info=placementInfo(), h=hours(), current=nextAssessment(info,h), stage=currentStage(info), g=greeting();
  const remaining=Math.max(0,TOTAL_HOURS-h);
  const progress=Math.min(100,Math.round((h/TOTAL_HOURS)*100));
  const status=taskStatuses[assessmentOverallStatus(current)];
  const dayLabel=new Intl.DateTimeFormat('en-AU',{weekday:'long',day:'numeric',month:'long'}).format(new Date());
  const placementLabel=info.started?`Placement week ${info.week}`:`Placement begins in ${info.daysUntil} days`;
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
      <h2>${current.title}</h2>
      <p>${current.when}</p>
      <div class="home-focus-action">
        <div><span>Start here</span><strong>${stage.focus[0]}</strong></div>
        <button class="home-primary-action" id="openCurrentAssessment" data-id="${current.id}" aria-label="Open ${current.title}">${homeIcon('arrow')}</button>
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
const reflectionConceptInfo={
  "Recovery Oriented Practice":["Supports hope, choice, identity and a meaningful life beyond symptoms.","Your reflection may involve collaboration, personal goals, autonomy or recognising strengths.","Recovery Oriented Practice"],
  "Trauma Informed Practice":["Recognises how trauma can shape safety, trust, relationships and responses.","Your reflection may involve choice, predictability, emotional safety or avoiding re traumatisation.","Trauma Informed Practice"],
  "Strengths Based Practice":["Starts with abilities, resources, relationships and possibilities rather than deficits alone.","Your reflection may describe noticing capacity, resilience or what is already working.","Strengths Based Practice"],
  "Person Centred Practice":["Keeps the person’s priorities, preferences and lived experience central to practice.","Your reflection may involve listening, shared planning or adapting support to the person.","Person Centred Practice"],
  "Systems Theory":["Considers how relationships, services and wider systems interact with a person’s experience.","Your reflection may involve family, services, policy or organisational influences.","Systems & Ecological Theory"],
  "Ecological Systems Theory":["Explores the person within interconnected social and environmental contexts.","Your reflection may link individual experiences with family, community or structural factors.","Systems & Ecological Theory"],
  "CHIME":["Highlights Connectedness, Hope, Identity, Meaning and Empowerment in personal recovery.","Your reflection may describe belonging, hope, identity, purpose or personal agency.","CHIME"],
  "Motivational Interviewing":["Uses partnership and curiosity to explore a person’s own reasons for change.","Your reflection may involve ambivalence, open questions or supporting autonomy.","Motivational Interviewing"],
  "Solution Focused Practice":["Builds on goals, exceptions and small achievable steps.","Your reflection may involve identifying preferred outcomes or what has helped before.","Solution Focused Practice"],
  "Narrative Practice":["Separates people from problems and explores the stories shaping identity and possibility.","Your reflection may involve language, identity or alternative stories of strength.","Narrative Practice"],
  "Anti Oppressive Practice":["Examines power, privilege and structural inequality within everyday practice.","Your reflection may involve barriers, discrimination, voice or unequal decision making.","Anti Oppressive Practice"],
  "Rights Based Practice":["Centres dignity, participation, equality and access to rights.","Your reflection may involve choice, fairness, advocacy or supported participation.","Human Rights"],
  "Crisis Intervention":["Prioritises immediate safety, stabilisation and practical support during acute distress.","Your reflection may involve risk, de escalation, safety planning or urgent coordination.","Risk & Safety Planning"],
  "Respect for Persons":["Recognises each person’s inherent dignity, worth and right to participate in decisions.","This may relate where you listened, respected choice or adjusted practice to the person.","AASW Code of Ethics"],
  "Social Justice":["Focuses on fairness, access, participation and challenging structural disadvantage.","This may relate where barriers, inequity, advocacy or resource access were present.","AASW Code of Ethics"],
  "AASW Code of Ethics":["Requires accountable, honest and ethically responsible professional practice.","This may relate where boundaries, transparency, supervision or professional judgement were important.","AASW Code of Ethics"]
};
function reflectionQuestionForToday(){const d=new Date();const seed=Number(`${d.getFullYear()}${d.getMonth()+1}${d.getDate()}`);return deeperReflectionQuestions[seed%deeperReflectionQuestions.length];}
function orderedReflectionTheories(entries){const counts={};entries.forEach(e=>(e.theories||[]).forEach(x=>counts[x]=(counts[x]||0)+1));return [...reflectionTheoryOptions].sort((a,b)=>(counts[b]||0)-(counts[a]||0));}
function reflectionInsights(entries){
  if(!entries.length)return "Your practice insights will grow naturally as you save reflections.";
  const groups={"Recovery Oriented Practice":["recovery","chime"],"multidisciplinary practice":["team","multidisciplinary","collaboration"],"advocacy":["advocacy","rights","equity"],"cultural safety":["cultural safety","culture"],"use of self":["use of self","emotion","communication"]};
  const counts={}; entries.forEach(e=>{const h=[e.answer,...(e.theories||[]),...(e.values||[]),...(e.ethics||[])].join(" ").toLowerCase();Object.entries(groups).forEach(([k,terms])=>{if(terms.some(t=>h.includes(t)))counts[k]=(counts[k]||0)+1;});});
  const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]); if(!sorted.length)return "Your reflections are beginning to show the social worker you are becoming.";
  const high=sorted[0][0], low=Object.keys(groups).find(k=>!counts[k]); return low?`You’ve recently been reflecting on ${high}. You may like to notice ${low} when it naturally arises.`:`You’ve been connecting your reflections with ${high}.`;
}
function reflectionLibrary(entries){
  if(!entries.length)return `<section class="reflection-empty-state">🌱 Your reflection library will grow as you save learning moments.</section>`;
  const libraryOpen=state.get("reflectionLibraryOpen",false);
  return `<details class="reflection-library reflection-library-collapsible" id="reflectionLibrary" ${libraryOpen?"open":""}><summary class="reflection-library-summary"><span><span class="reflection-library-summary-icon">📚</span><span><strong>Previous reflections</strong><small>${entries.length} saved learning moment${entries.length===1?"":"s"}</small></span></span><span class="reflection-library-summary-arrow">›</span></summary><div class="reflection-library-body"><div class="reflection-library-tools"><input id="reflectionSearch" class="input" placeholder="Search reflections"><button type="button" class="text-link reflection-collapse-all" id="collapseAllReflections">Collapse all</button></div><div id="reflectionLibraryList">${entries.map(e=>{const terms=[e.answer,...(e.theories||[]),...(e.values||[]),...(e.ethics||[]),...(e.practiceStandards||[]),...(e.evidenceTypes||[]),e.consumerGroup,e.placementType].filter(Boolean).join(" ");const preview=(e.moment||e.answer||"").replace(/\s+/g," ").trim();return `<details class="reflection-library-item" data-search="${safeText(terms.toLowerCase())}"><summary><span><strong>${safeText(e.date||"Reflection")}</strong><small>${safeText(preview.slice(0,90)||(e.theories||[]).slice(0,2).join(" · ")||"Learning moment")}${preview.length>90?"…":""}</small></span><span>›</span></summary><div class="reflection-library-entry-body"><p>${safeText((e.moment||e.answer||"").slice(0,500))}</p><div class="reflection-tag-list">${[...(e.theories||[]),...(e.values||[]),...(e.ethics||[]),...(e.practiceStandards||[])].slice(0,8).map(x=>`<span>${safeText(x)}</span>`).join("")}</div></div></details>`}).join("")}</div></div></details>`;
}
function journalPage(){
  const entries=savedEntries(), prompt=reflectionQuestionForToday();
  return `<section class="welcome-block reflection-welcome"><div class="eyebrow">Reflect</div><h1>💭 Reflect</h1><p class="welcome-text">Write freely first. Your Reflection Companion stays quiet until you want a little help.</p></section>
  ${lastSavedReflection?`<section class="reflection-saved-note">✨ Reflection saved. Your learning has been added to your evidence library.</section>`:""}
  <form class="reflection-simple" id="reflectionForm" onsubmit="return false">
    <section class="conversation-card reflection-journal-card"><label for="answer"><strong>What stayed with you today?</strong><span>One moment is enough.</span></label><textarea id="answer" class="textarea reflection-main-journal" placeholder="Write in your own words..."></textarea></section>

    <details class="conversation-card reflection-companion" id="reflectionCompanion" ${state.get("reflectionCompanionOpen",false)?"open":""}><summary><span><strong>🌱 Reflection Companion</strong><small>Need help connecting today’s experience with social work?</small></span><span>›</span></summary><div class="reflection-companion-body">
      <p class="companion-intro">Write first. Think second. Explore only what feels useful.</p>

      <details class="companion-help-card" data-companion-card="theory"><summary><span><strong>📚 Help me identify theory</strong><small>What theory or approach might fit?</small></span><span>›</span></summary><div class="companion-help-body">
        <p class="companion-question">What best describes today’s experience?</p>
        <div class="choice-chip-grid">${["Recovery group","One to one conversation","Documentation","Risk assessment","Safety planning","Group facilitation","Home visit","MDT","Assessment","Advocacy","Community engagement","Crisis","Other"].map(x=>`<button type="button" class="context-chip theory-context" data-context="${safeText(x)}">${safeText(x)}</button>`).join("")}</div>
        <div id="theorySuggestions" class="progressive-suggestions hidden"></div>
      </div></details>

      <details class="companion-help-card" data-companion-card="ethics"><summary><span><strong>🤝 Help me identify values and ethics</strong><small>What values or ethical ideas were present?</small></span><span>›</span></summary><div class="companion-help-body">
        <p class="companion-question">What stood out most?</p>
        <div class="choice-chip-grid">${["Choice","Respect","Safety","Trust","Confidentiality","Boundaries","Advocacy","Culture","Rights","Relationships"].map(x=>`<button type="button" class="context-chip ethics-context" data-context="${safeText(x)}">${safeText(x)}</button>`).join("")}</div>
        <div id="ethicsSuggestions" class="progressive-suggestions hidden"></div>
      </div></details>

      <details class="companion-help-card" data-companion-card="standards"><summary><span><strong>🌿 Help me identify Practice Standards</strong><small>What professional capability might this show?</small></span><span>›</span></summary><div class="companion-help-body">
        <p class="companion-question">What did you do today?</p>
        <div class="choice-chip-grid">${["Observed practice","Engaged with a consumer","Completed documentation","Participated in a group","Attended supervision","Observed assessment","Discussed risk","Worked with another professional","Completed training","Asked questions"].map(x=>`<button type="button" class="context-chip standard-context" data-context="${safeText(x)}">${safeText(x)}</button>`).join("")}</div>
        <div id="standardSuggestions" class="progressive-suggestions hidden"></div>
      </div></details>

      <details class="companion-help-card companion-deeper-card"><summary><span><strong>💭 Help me think more deeply</strong><small>One optional question</small></span><span>›</span></summary><div class="companion-help-body">
        <label for="deeperAnswer"><strong>${safeText(prompt)}</strong><span>A sentence or two is enough.</span></label><input type="hidden" id="deeperQuestion" value="${safeText(prompt)}"><textarea id="deeperAnswer" class="textarea" placeholder="Write only if it helps..."></textarea>
      </div></details>

      <section id="conceptExplanation" class="concept-explanation hidden"></section>
      <section class="companion-future"><label for="futurePractice"><strong>🌱 What will you take into tomorrow?</strong><span>Optional</span></label><textarea id="futurePractice" class="textarea" placeholder="Something I learned, will try differently or want to ask..."></textarea></section>
      <section class="companion-supervision"><label for="supervision"><strong>🤝 Question for supervision</strong><span>Optional</span></label><textarea id="supervision" class="textarea" placeholder="Something you want to discuss..."></textarea></section>
    </div></details>
    <button class="btn reflection-save-button" id="saveEntry">🌿 Save reflection</button>
  </form>
  <details class="reflection-growth-note reflection-insight-collapsible" id="reflectionInsight" ${state.get("reflectionInsightOpen",false)?"open":""}><summary><span><span>🌿</span><span><strong>Reflection insight</strong><small>A gentle pattern from your saved reflections</small></span></span><span class="reflection-library-summary-arrow">›</span></summary><div class="reflection-insight-body"><p>${safeText(reflectionInsights(entries))}</p></div></details>
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
    const progress=assessmentProgress(a);
    const planning=assessmentPlanning(a.id);
    const timing=planning.date
      ? `My target ${formatPlanningDate(planning.date)}`
      : (a.when||"Check current JCU timing");
    const showProgress=progress>0;
    return `<article class="native-assessment-row">
      <button class="native-assessment-open assessment" data-id="${a.id}" aria-label="Open ${a.title}">
        <span class="native-assessment-icon" aria-hidden="true">${a.icon}</span>
        <span class="native-assessment-copy">
          <span class="native-assessment-head">
            <strong>${a.title}</strong>
            <span class="status-inline ${meta.className}">${meta.label}</span>
          </span>
          <span class="native-assessment-timing">${timing}</span>
          ${showProgress?`<span class="native-assessment-progress"><span><i style="width:${progress}%"></i></span><small>${progress}%</small></span>`:""}
        </span>
        <span class="native-assessment-action">Open <b>›</b></span>
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
          <div><span>Placement</span><strong>Mind Australia</strong><small>Step Up Step Down</small></div>
          <div><span>${info.started?"Current week":"Starts"}</span><strong>${placementTiming}</strong></div>
        </div>
        <div class="placement-hours-line">
          <span><small>Hours</small><strong>${hoursStarted?`${h.toFixed(1)} / 500`:"Not started"}</strong></span>
          <span><small>Stage</small><strong>${stage.title}</strong></span>
        </div>
        ${hoursStarted?`<div class="placement-native-hours-track" aria-label="${Math.round((h/TOTAL_HOURS)*100)} percent of placement hours completed"><span style="width:${Math.min(100,(h/TOTAL_HOURS)*100)}%"></span></div>`:""}
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
  const reqs=assessmentRequirements[a.title]||[];
  const overall=assessmentOverallStatus(a);
  const overallMeta=taskStatuses[overall];
  const progress=assessmentProgress(a);
  const toolkitLinks=(a.toolkit||[]);
  const taskItems=(a.tasks||[]).map((task,index)=>({task,index,status:getTaskStatus(a.id,index)}));
  const incomplete=taskItems.filter(item=>item.status!=="complete");
  const completeCount=taskItems.length-incomplete.length;
  const official=officialAssessmentInfo(a);
  const planning=assessmentPlanning(a.id);
  const missingRequirements=reqs.filter(requirement=>!entries.some(entry=>(entry.evidenceTypes||[]).includes(requirement)));
  const nextTask=incomplete.length?incomplete[0].task:"Check the official submission or sign off step";

  const taskRow=item=>{
    const meta=taskStatuses[item.status];
    return `<div class="assessment-clear-task ${item.status==="complete"?"is-complete":""}">
      <input class="task-complete-check" type="checkbox" data-assessment="${a.id}" data-index="${item.index}" ${item.status==="complete"?"checked":""} aria-label="Mark ${item.task} complete">
      <span class="assessment-clear-task-copy">${item.task}</span>
      <select class="task-status-select ${meta.className}" data-assessment="${a.id}" data-index="${item.index}" aria-label="Status for ${item.task}">
        ${Object.entries(taskStatuses).map(([value,m])=>`<option value="${value}" ${value===item.status?"selected":""}>${m.label}</option>`).join("")}
      </select>
    </div>`;
  };

  document.getElementById("main").innerHTML=`
    <div class="assessment-clear-page">
      <button class="assessment-back-link" id="backAssess" aria-label="Back to My Placement">‹ <span>My Placement</span></button>

      <header class="assessment-clear-header">
        <div class="assessment-clear-icon">${a.icon}</div>
        <div class="assessment-clear-title">
          <span class="status-inline ${overallMeta.className}">${overallMeta.label}</span>
          <h1>${a.title}</h1>
          <p>${a.when}</p>
        </div>
        <strong class="assessment-clear-percent">${progress}%</strong>
        <div class="assessment-clear-progress" aria-label="${progress} percent complete"><span style="width:${progress}%"></span></div>
      </header>

      <section class="assessment-clear-section" aria-labelledby="assessment-what-heading">
        <div class="assessment-clear-section-heading"><span>01</span><h2 id="assessment-what-heading">What it is</h2></div>
        <p class="assessment-clear-lead">${a.purpose||a.plain}</p>
      </section>

      <section class="assessment-clear-section" aria-labelledby="assessment-do-heading">
        <div class="assessment-clear-section-heading"><span>02</span><h2 id="assessment-do-heading">What you have to do</h2></div>
        <div class="assessment-clear-requirement">
          <strong>JCU requirement</strong>
          <p>${official.requirement}</p>
        </div>
        <div class="assessment-clear-checklist">
          ${taskItems.length?taskItems.map(taskRow).join(""):`<p class="assessment-clear-empty">No checklist has been added for this assessment yet. Check the official JCU instructions.</p>`}
        </div>
      </section>

      <section class="assessment-clear-section" aria-labelledby="assessment-progress-heading">
        <div class="assessment-clear-section-heading"><span>03</span><h2 id="assessment-progress-heading">Your progress</h2></div>
        <div class="assessment-clear-summary-grid">
          <div><small>Checklist</small><strong>${completeCount} of ${taskItems.length} complete</strong></div>
          <div><small>Linked evidence</small><strong>${entries.length} reflection${entries.length===1?"":"s"}</strong></div>
          <div><small>Evidence areas</small><strong>${reqs.length-missingRequirements.length} of ${reqs.length||0} covered</strong></div>
          <div><small>Still to do</small><strong>${incomplete.length} item${incomplete.length===1?"":"s"}</strong></div>
        </div>
        <div class="assessment-clear-progress-columns">
          <div>
            <h3>Already supported</h3>
            ${completeCount?`<p>✓ ${completeCount} checklist item${completeCount===1?"":"s"} complete</p>`:`<p class="muted">No checklist items completed yet.</p>`}
            ${entries.length?`<p>✓ ${entries.length} linked reflection${entries.length===1?"":"s"}</p>`:`<p class="muted">No reflections linked yet.</p>`}
          </div>
          <div>
            <h3>Still needed</h3>
            ${incomplete.length?`<p>○ ${incomplete.length} checklist item${incomplete.length===1?"":"s"}</p>`:`<p>✓ Checklist complete</p>`}
            ${missingRequirements.length?missingRequirements.slice(0,3).map(item=>`<p>○ ${safeText(item)}</p>`).join(""):`<p>✓ Evidence areas represented</p>`}
          </div>
        </div>
        ${entries.length?`<details class="assessment-clear-linked"><summary>Linked reflections <span>${entries.length}</span></summary><div>${entries.map(e=>`<article><strong>${e.date}</strong><p>${e.answer.slice(0,150)}${e.answer.length>150?"...":""}</p></article>`).join("")}</div></details>`:""}
      </section>

      <section class="assessment-clear-section assessment-clear-plan" aria-labelledby="assessment-plan-heading">
        <div class="assessment-clear-section-heading"><span>04</span><h2 id="assessment-plan-heading">My plan</h2></div>
        <div class="assessment-clear-plan-row"><small>Next useful step</small><strong>${nextTask}</strong></div>
        <div class="assessment-clear-plan-row"><small>My target date</small><strong>${planning.date?formatPlanningDate(planning.date):"Not set"}</strong></div>
        <div class="assessment-clear-plan-row"><small>Official timing</small><strong>${a.when}</strong></div>
        <button class="assessment-clear-edit" id="openPlanningEdit">Edit planning date</button>
      </section>

      <details class="assessment-secondary-details assessment-planning-date" id="assessmentPlanning" ${openPlanning?"open":""}>
        <summary><span>Edit planning date</span><small>${planning.date?formatPlanningDate(planning.date):"Not set"}</small></summary>
        <div class="assessment-planning-controls">
          <label class="label" for="planningDate">My target date</label>
          <input id="planningDate" type="date" class="input" value="${escapeAttribute(planning.date)}">
          <label class="label" for="planningReason">Optional reason</label>
          <input id="planningReason" type="text" class="input" maxlength="120" value="${escapeAttribute(planning.reason)}" placeholder="Leave, travel or another commitment">
          <p class="assessment-planning-notice">This is your personal planning date and does not change the official JCU requirement.</p>
          <div class="assessment-planning-actions"><button class="btn" id="savePlanningDate">Save</button><button class="btn secondary" id="clearPlanningDate" ${planning.date||planning.reason?"":"disabled"}>Clear</button></div>
        </div>
      </details>

      <div class="assessment-clear-extra-heading"><h2>Extra details</h2><p>Open these only when you need more information.</p></div>

      <details class="assessment-secondary-details">
        <summary><span>Official record and guidance</span><small>JCU information</small></summary>
        <div class="assessment-secondary-content">
          <h3>Official record</h3><p>${official.record}</p>
          <p class="assessment-scope-note">${official.notice}</p>
        </div>
      </details>

      ${reqs.length?`<details class="assessment-secondary-details"><summary><span>Evidence categories</span><small>${reqs.length}</small></summary><div class="assessment-secondary-content assessment-evidence-map">${reqs.map(r=>{
        const count=entries.filter(e=>(e.evidenceTypes||[]).includes(r)).length;
        return `<div class="evidence-category-row"><span>${count?"✓":"○"}</span><span>${r}</span><strong>${count}</strong></div>`;
      }).join("")}</div></details>`:""}

      ${toolkitLinks.length?`<details class="assessment-secondary-details"><summary><span>Toolkit suggestions</span><small>${toolkitLinks.length}</small></summary><div class="assessment-secondary-content linked-resource-list">${toolkitLinks.map(item=>`<button class="linked-resource" data-toolkit-name="${item}"><span>📚</span><div><strong>${item}</strong></div><span>›</span></button>`).join("")}</div></details>`:""}

      <details class="assessment-secondary-details official-sources-card">
        <summary><span>Official sources</span><small>${official.sources.length}</small></summary>
        <div class="assessment-secondary-content">
          <div class="official-source-list">${official.sources.map(source=>`<div class="official-source-row"><span>✓</span><span>${source}</span></div>`).join("")}</div>
          <p class="assessment-scope-note">Use the current version supplied by JCU or published by the AASW. Practice Compass does not replace official JCU documents, LearnJCU instructions or FELO advice.</p>
        </div>
      </details>
    </div>`;

  document.getElementById("backAssess").onclick=()=>{route="assessments";render()};
  document.getElementById("openPlanningEdit").onclick=()=>{
    const details=document.getElementById("assessmentPlanning");
    details.open=true;
    details.scrollIntoView({behavior:"smooth",block:"start"});
  };
  document.getElementById("savePlanningDate").onclick=()=>{
    const date=document.getElementById("planningDate").value;
    const reason=document.getElementById("planningReason").value.trim();
    saveAssessmentPlanning(a.id,date,reason);
    assessmentDetail(id,true);
  };
  document.getElementById("clearPlanningDate").onclick=()=>{
    clearAssessmentPlanning(a.id);
    assessmentDetail(id,true);
  };

  document.querySelectorAll(".task-complete-check").forEach(check=>{
    check.onchange=()=>{
      setTaskStatus(check.dataset.assessment,Number(check.dataset.index),check.checked?"complete":"not_started");
      assessmentDetail(id);
    };
  });

  document.querySelectorAll(".task-status-select").forEach(select=>{
    select.onchange=()=>{
      setTaskStatus(select.dataset.assessment,Number(select.dataset.index),select.value);
      assessmentDetail(id);
    };
  });

  document.querySelectorAll(".linked-resource").forEach(button=>{
    button.onclick=()=>openToolkitTopicByName(button.dataset.toolkitName);
  });
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
      <div class="screen-title">
        <button class="back" id="backToolkit" aria-label="Back to Practice Toolkit">‹</button>
        <h2>${category[0]} ${topic[0]}</h2>
      </div>

      <div class="card green">
        <div class="label">🌿 What is this?</div>
        <p>${guide.what}</p>
      </div>

      <details class="card toolkit-info" open>
        <summary><strong>💼 What does this look like in practice?</strong></summary>
        <ul>${guide.practice.map(item=>`<li>${item}</li>`).join("")}</ul>
      </details>

      <details class="card toolkit-info" open>
        <summary><strong>✅ Remember</strong></summary>
        <ul>${guide.remember.map(item=>`<li>${item}</li>`).join("")}</ul>
      </details>

      <details class="card toolkit-info">
        <summary><strong>🔗 Related Toolkit cards</strong></summary>
        <div class="linked-resource-list">${guide.related.map(item=>`<button class="linked-resource" data-toolkit-name="${item}"><span>📚</span><div><strong>${item}</strong></div><span>›</span></button>`).join("")}</div>
      </details>

      <details class="card toolkit-info">
        <summary><strong>📚 References</strong></summary>
        <ul>${guide.refs.map(ref=>ref[1]?`<li><a href="${ref[1]}" target="_blank" rel="noopener noreferrer">${ref[0]}</a></li>`:`<li>${ref[0]}</li>`).join("")}</ul>
      </details>

      <div class="card">
        <p class="muted">Practice Compass is a quick practice guide for placement learning. Follow current legislation, organisational policy, supervision and official guidance.</p>
        <button class="btn secondary" id="returnToolkit">Return to Practice Toolkit</button>
      </div>`;

    const goBack=()=>{route="learn";render()};
    document.getElementById("backToolkit").onclick=goBack;
    document.getElementById("returnToolkit").onclick=goBack;
    document.querySelectorAll("[data-toolkit-name]").forEach(button=>{
      button.onclick=()=>openToolkitTopicByName(button.dataset.toolkitName);
    });
    return;
  }

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
      <button class="journey-utility-row" id="exportHtml"><span><strong>Export readable record</strong><small>Create a readable copy of reflections, hours and framework notes</small></span><span>›</span></button>
      <button class="journey-utility-row" id="backupJson"><span><strong>Back up everything</strong><small>Save a private copy of all Practice Compass browser data</small></span><span>›</span></button>
      <button class="journey-utility-row" id="restoreJson"><span><strong>Restore a backup</strong><small>Preview and import a Practice Compass backup file</small></span><span>›</span></button>
      <input class="hidden" type="file" id="restoreJsonFile" accept="application/json,.json">
      <div class="backup-status" id="backupStatus">${backupStatusText()}</div>
      <div class="backup-restore-panel hidden" id="backupRestorePanel" aria-live="polite"></div>
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
  entries.forEach(entry=>(entry.evidenceTypes||[]).forEach(type=>(rules[type]||[]).forEach(rule=>add(rule.group,rule.name,entry))));
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
  const reflectionOptions=savedEntries();
  const supervisionOptions=supervisionItems();
  const groups={
    values:["Human dignity","Social justice","Self determination","Respect","Hope","Compassion","Accountability","Cultural safety"],
    theories:["Recovery Oriented Practice","Strengths Based Practice","Systems and Ecological Theory","Trauma Informed Practice","Person Centred Practice","Anti Oppressive Practice","Feminist Social Work","Intersectionality","Narrative Practice","Motivational Interviewing"],
    cultural:["Cultural humility","Cultural safety","Aboriginal and Torres Strait Islander self determination","CALD inclusion","Anti racist practice","LGBTQIA+ affirmative practice","Disability inclusion","Neurodiversity affirming practice"],
    skills:["Engagement and rapport","Active listening","Assessment","Advocacy","Documentation","Case management","Group facilitation","Interprofessional collaboration","Reflective supervision"]
  };
  const allItems=Object.values(intelligence.groups).flatMap(map=>[...map.values()]);
  const evidencedItems=allItems.filter(item=>item.evidence.length);
  const opportunityRules=[
    {label:"Ethical decision making",tags:["Ethics or values"]},
    {label:"Cultural capability",tags:["Cultural capability"]},
    {label:"Interprofessional collaboration",tags:["Teamwork"]},
    {label:"Use of self",tags:["Use of self"]},
    {label:"Theory informed practice",tags:["Theory in action"]}
  ];
  const usedTags=new Set(intelligence.entries.flatMap(entry=>entry.evidenceTypes||[]));
  const opportunities=opportunityRules.filter(item=>!item.tags.some(tag=>usedTags.has(tag))).slice(0,3);
  const labels={values:"Values",theories:"Theories",models:"Practice approaches",skills:"Skills",useOfSelf:"Use of self"};
  const frameworkItem=item=>`<div class="framework-summary-item"><strong>${safeText(item.name)}</strong><small>${item.evidence.length?`${item.evidence.length} linked reflection${item.evidence.length===1?"":"s"}`:"Personal addition"}</small></div>`;
  const groupSection=(key,map)=>map.size?`<section class="framework-summary-group"><h4>${labels[key]}</h4>${[...map.values()].map(frameworkItem).join("")}</section>`:"";
  const chips=(group,items)=>items.map(v=>`<button class="select-chip framework-chip ${(data[group]||[]).includes(v)?"selected":""}" data-group="${group}" data-value="${safeText(v)}">${safeText(v)}</button>`).join("");

  const developmentRows=practiceFrameworkDevelopmentAreas.map((area,index)=>{
    const saved=development[area.id]||{};
    const linked=normaliseFrameworkEvidenceArea(evidenceLinks[area.id]);
    const linkedReflections=reflectionOptions.filter(entry=>linked.reflectionIds.includes(String(entry.id)));
    const linkedSupervision=supervisionOptions.filter(entry=>linked.supervisionIds.includes(String(entry.id)));
    const evidenceCount=linkedReflections.length+linkedSupervision.length+linked.manualExamples.length;
    const answer=saved.answer||"";
    const status=evidenceCount?"Evidence added":answer?"Developing":"Not started";
    const statusClass=status==="Evidence added"?"status-complete":status==="Developing"?"status-in-progress":"status-not-started";
    const reflectionChoices=reflectionOptions.length?reflectionOptions.map(entry=>`<label class="framework-evidence-choice"><input type="checkbox" class="framework-reflection-link" value="${safeText(String(entry.id))}" ${linked.reflectionIds.includes(String(entry.id))?"checked":""}><span><strong>${safeText(entry.date||"Reflection")}</strong><small>${safeText((entry.situation||entry.text||entry.description||"Saved reflection").slice(0,120))}</small></span></label>`).join(""):`<p class="muted framework-evidence-empty">No reflections saved yet.</p>`;
    const supervisionChoices=supervisionOptions.length?supervisionOptions.map(entry=>`<label class="framework-evidence-choice"><input type="checkbox" class="framework-supervision-link" value="${safeText(String(entry.id))}" ${linked.supervisionIds.includes(String(entry.id))?"checked":""}><span><strong>${safeText(entry.type||"Supervision note")} · ${safeText(entry.date||"")}</strong><small>${safeText((entry.text||"Saved supervision note").slice(0,120))}</small></span></label>`).join(""):`<p class="muted framework-evidence-empty">No supervision notes saved yet.</p>`;
    const linkedEvidenceHtml=evidenceCount?`<div class="framework-linked-evidence">
      ${linkedReflections.map(entry=>`<div class="framework-linked-row"><span>💭</span><div><strong>Reflection · ${safeText(entry.date||"")}</strong><small>${safeText((entry.situation||entry.text||entry.description||"Saved reflection").slice(0,130))}</small></div></div>`).join("")}
      ${linkedSupervision.map(entry=>`<div class="framework-linked-row"><span>🤝</span><div><strong>${safeText(entry.type||"Supervision")} · ${safeText(entry.date||"")}</strong><small>${safeText((entry.text||"Saved supervision note").slice(0,130))}</small></div></div>`).join("")}
      ${linked.manualExamples.map(item=>`<div class="framework-linked-row" data-example-id="${safeText(String(item.id))}"><span>🌿</span><div><strong>Practice example · ${safeText(item.date||"")}</strong><small>${safeText(item.text)}</small></div><button type="button" class="framework-remove-example">Remove</button></div>`).join("")}
    </div>`:`<p class="muted framework-evidence-empty">No evidence connected yet.</p>`;
    return `<details class="framework-foundation-item framework-foundation-simple" data-framework-area="${area.id}">
      <summary>
        <span class="framework-foundation-icon">${area.icon}</span>
        <span class="framework-foundation-copy"><strong>${index+1}. ${safeText(area.title)}</strong><small>${safeText(area.purpose)}</small><span class="framework-foundation-meta"><span class="status-inline ${statusClass}">${status}</span>${evidenceCount?`<span>${evidenceCount} evidence item${evidenceCount===1?"":"s"}</span>`:""}</span></span>
        <span class="framework-foundation-arrow">›</span>
      </summary>
      <div class="framework-foundation-body">
        <div class="framework-foundation-prompt">${safeText(area.prompt)}</div>
        <details class="framework-thinking-help"><summary>Need help thinking?</summary><div class="framework-foundation-questions">${area.questions.map(question=>`<span>${safeText(question)}</span>`).join("")}</div></details>
        <label><span>My current thinking</span><textarea class="textarea framework-development-answer" placeholder="Add a short thought or example. You can return to this throughout placement.">${safeText(answer)}</textarea></label>
        <section class="framework-area-evidence framework-area-evidence-simple">
          <div class="framework-area-evidence-heading"><div><strong>Evidence</strong><small>Linked items stay unchanged in their original location.</small></div><span>${evidenceCount}</span></div>
          ${linkedEvidenceHtml}
          <details class="framework-evidence-picker">
            <summary><span>Add or manage evidence</span><span>›</span></summary>
            <div class="framework-evidence-picker-body">
              <details class="framework-source-picker"><summary>Reflections</summary><div class="framework-evidence-choice-list">${reflectionChoices}</div></details>
              <details class="framework-source-picker"><summary>Supervision notes</summary><div class="framework-evidence-choice-list">${supervisionChoices}</div></details>
              <div class="framework-evidence-source"><strong>Add a short practice example</strong><textarea class="textarea framework-manual-example" placeholder="For example: I supported a consumer to identify their own priorities."></textarea><button type="button" class="btn secondary framework-add-example">Add example</button></div>
            </div>
          </details>
        </section>
      </div>
    </details>`;
  }).join("");

  const startedCount=practiceFrameworkDevelopmentAreas.filter(area=>{
    const saved=development[area.id]||{};
    const linked=normaliseFrameworkEvidenceArea(evidenceLinks[area.id]);
    return Boolean(saved.answer||linked.reflectionIds.length||linked.supervisionIds.length||linked.manualExamples.length);
  }).length;
  const totalEvidence=practiceFrameworkDevelopmentAreas.reduce((sum,area)=>{
    const linked=normaliseFrameworkEvidenceArea(evidenceLinks[area.id]);
    return sum+linked.reflectionIds.length+linked.supervisionIds.length+linked.manualExamples.length;
  },0);
  const summary=frameworkSummaryData();
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
    {id:"vision",title:"Vision",starter:"The social worker I aspire to become is…",prompt:"Describe the practitioner you are becoming and how you want people to experience you."},
    {id:"purpose",title:"Purpose",starter:"I practise social work because…",prompt:"What draws you to social work and what difference do you hope to make?"},
    {id:"values",title:"Values",starter:"The principles that guide me are…",prompt:"Name the values that shape how you engage, decide and advocate."},
    {id:"theories",title:"Theories",starter:"The theories that shape my understanding are…",prompt:"Include only theories and frameworks you can connect to your actual practice."},
    {id:"tools",title:"Practice tools",starter:"The approaches I use in practice are…",prompt:"Describe how your values and theories translate into practical social work activity."},
    {id:"reflection",title:"Reflection and accountability",starter:"I remain accountable by…",prompt:"Explain how reflection, supervision, feedback and ongoing learning guide your practice."}
  ];
  const summaryEditor=summaryFields.map(field=>`<section class="framework-summary-editor-field"><div class="framework-summary-editor-heading"><div><strong>${field.title}</strong><small>${field.starter}</small></div>${summarySuggestions[field.id]?`<button type="button" class="framework-use-notes" data-summary-notes="${field.id}">Use my saved notes</button>`:""}</div><p>${field.prompt}</p><textarea class="textarea framework-summary-text" id="frameworkSummary-${field.id}" placeholder="Write this in your own words. You can keep changing it as placement develops.">${safeText(summary[field.id]||"")}</textarea>${summarySuggestions[field.id]?`<details class="framework-summary-notes"><summary>See the notes this draws from</summary><div>${safeText(summarySuggestions[field.id]).replace(/\n/g,"<br>")}</div></details>`:""}</section>`).join("");

  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backMore">‹</button><h2>🧭 My Practice Framework</h2></div>
    <section class="framework-calm-overview">
      <p>Your framework grows from your real practice, reflections and supervision. You do not need to complete everything at once.</p>
      <div class="framework-calm-stats"><span><strong>${startedCount}</strong> of 12 areas started</span><span><strong>${totalEvidence}</strong> evidence items linked</span></div>
    </section>

    <div class="framework-calm-actions">
      <button type="button" class="framework-calm-action" id="continueFramework"><span>🌱</span><span><strong>Continue building my framework</strong><small>Work through one development area at a time</small></span><b>›</b></button>
      <button type="button" class="framework-calm-action" id="openFrameworkSummary"><span>🧭</span><span><strong>See my emerging framework</strong><small>View the values, theories and skills already appearing</small></span><b>›</b></button>
      <button type="button" class="framework-calm-action" id="openFrameworkGaps"><span>🌿</span><span><strong>Areas to strengthen</strong><small>Gentle prompts for future learning</small></span><b>›</b></button>
    </div>

    <section class="framework-foundation-section" id="frameworkDevelopmentSection">
      <div class="framework-foundation-heading"><div><span class="label">Developing my practice framework</span><h3>Choose one area that feels relevant today</h3></div></div>
      <div class="framework-foundation-list">${developmentRows}</div>
      <button class="btn framework-development-save" id="saveFrameworkDevelopment">Save framework progress</button>
    </section>

    <details class="framework-calm-details" id="frameworkSummarySection">
      <summary><span><strong>My emerging framework</strong><small>A summary drawn from your saved reflections and personal additions</small></span><span>›</span></summary>
      <div class="framework-calm-details-body">
        <section class="framework-six-part-summary">
          <div class="framework-six-part-intro"><strong>My six part framework</strong><p>This is an editable working summary, not a final assessment response. Use your saved notes as prompts, then shape the wording so it sounds like you.</p></div>
          ${summaryEditor}
          <button type="button" class="btn framework-summary-save" id="saveFrameworkSummary">Save emerging framework</button>
        </section>
        <details class="framework-existing-signals">
          <summary>Values, theories and skills already appearing</summary>
          <div>${evidencedItems.length?`${groupSection("values",intelligence.groups.values)}${groupSection("theories",intelligence.groups.theories)}${groupSection("models",intelligence.groups.models)}${groupSection("skills",intelligence.groups.skills)}${groupSection("useOfSelf",intelligence.groups.useOfSelf)}`:`<p class="muted">These will appear as you save reflections and link evidence.</p>`}</div>
        </details>
        <details class="framework-personal-additions-simple">
          <summary>Personal additions</summary>
          <div class="framework-manual-body">
            <div><div class="label">My values</div><div class="chip-grid">${chips("values",groups.values)}</div></div>
            <div><div class="label">Theories and approaches</div><div class="chip-grid">${chips("theories",groups.theories)}</div></div>
            <div><div class="label">Cultural capability and inclusion</div><div class="chip-grid">${chips("cultural",groups.cultural)}</div></div>
            <div><div class="label">My developing skills</div><div class="chip-grid">${chips("skills",groups.skills)}</div></div>
            <div><div class="label">My use of self</div><textarea id="frameworkSelf" class="textarea" placeholder="What strengths, assumptions, emotions, boundaries or feedback are shaping your practice?">${safeText(data.useOfSelf||"")}</textarea></div>
            <div><div class="label">The social worker I am becoming</div><textarea id="frameworkIdentity" class="textarea" placeholder="Describe the kind of practitioner you want to become.">${safeText(data.professionalIdentity||"")}</textarea></div>
            <button class="btn" id="saveFramework">Save personal additions</button>
          </div>
        </details>
      </div>
    </details>

    <details class="framework-calm-details" id="frameworkGapsSection">
      <summary><span><strong>Areas to strengthen</strong><small>These are prompts, not missing requirements</small></span><span>›</span></summary>
      <div class="framework-calm-details-body">${opportunities.length?`<div class="framework-opportunity-list">${opportunities.map(item=>`<span>${safeText(item.label)}</span>`).join("")}</div>`:`<p class="muted">No specific gaps are being suggested right now. Keep adding real practice evidence as it occurs.</p>`}</div>
    </details>`;

  document.getElementById("backMore").onclick=()=>{route="more";render()};
  document.getElementById("continueFramework").onclick=()=>document.getElementById("frameworkDevelopmentSection").scrollIntoView({behavior:"smooth",block:"start"});
  document.getElementById("openFrameworkSummary").onclick=()=>{const el=document.getElementById("frameworkSummarySection");el.open=true;el.scrollIntoView({behavior:"smooth",block:"start"})};
  document.getElementById("openFrameworkGaps").onclick=()=>{const el=document.getElementById("frameworkGapsSection");el.open=true;el.scrollIntoView({behavior:"smooth",block:"start"})};
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
    saveFrameworkSummaryData(next);
    alert("Your emerging framework has been saved 🧭");
    frameworkPage();
  });
  document.querySelectorAll(".framework-chip").forEach(btn=>btn.onclick=()=>btn.classList.toggle("selected"));
  const workingEvidence={};
  practiceFrameworkDevelopmentAreas.forEach(area=>workingEvidence[area.id]=normaliseFrameworkEvidenceArea(evidenceLinks[area.id]));
  document.querySelectorAll("[data-framework-area]").forEach(item=>{
    const id=item.dataset.frameworkArea;
    item.querySelectorAll(".framework-reflection-link").forEach(input=>input.addEventListener("change",()=>{workingEvidence[id].reflectionIds=[...item.querySelectorAll(".framework-reflection-link:checked")].map(input=>String(input.value))}));
    item.querySelectorAll(".framework-supervision-link").forEach(input=>input.addEventListener("change",()=>{workingEvidence[id].supervisionIds=[...item.querySelectorAll(".framework-supervision-link:checked")].map(input=>String(input.value))}));
    item.querySelector(".framework-add-example")?.addEventListener("click",()=>{
      const textarea=item.querySelector(".framework-manual-example");
      const text=textarea.value.trim();
      if(!text){alert("Add a short practice example first.");return;}
      workingEvidence[id].manualExamples.push({id:Date.now(),text,date:new Date().toLocaleDateString("en-AU")});
      saveFrameworkEvidenceLinksData({...evidenceLinks,...workingEvidence});
      frameworkPage();
    });
    item.querySelectorAll(".framework-remove-example").forEach(button=>button.addEventListener("click",()=>{
      const exampleId=String(button.closest("[data-example-id]")?.dataset.exampleId||"");
      workingEvidence[id].manualExamples=workingEvidence[id].manualExamples.filter(example=>String(example.id)!==exampleId);
      saveFrameworkEvidenceLinksData({...evidenceLinks,...workingEvidence});
      frameworkPage();
    }));
  });
  document.getElementById("saveFrameworkDevelopment").onclick=()=>{
    const current={};
    document.querySelectorAll("[data-framework-area]").forEach(item=>{
      const id=item.dataset.frameworkArea;
      const answer=item.querySelector(".framework-development-answer").value.trim();
      const selectedReflections=[...item.querySelectorAll(".framework-reflection-link:checked")].map(input=>String(input.value));
      const selectedSupervision=[...item.querySelectorAll(".framework-supervision-link:checked")].map(input=>String(input.value));
      workingEvidence[id].reflectionIds=selectedReflections;
      workingEvidence[id].supervisionIds=selectedSupervision;
      const evidenceCount=selectedReflections.length+selectedSupervision.length+workingEvidence[id].manualExamples.length;
      current[id]={answer,status:evidenceCount?"Evidence added":answer?"Developing":"Not started",updatedAt:new Date().toISOString()};
    });
    saveFrameworkDevelopmentData(current);
    saveFrameworkEvidenceLinksData(workingEvidence);
    alert("Your framework progress has been saved 🌿");
    frameworkPage();
  };
  document.getElementById("saveFramework")?.addEventListener("click",()=>{
    const current={values:[],theories:[],cultural:[],skills:[],useOfSelf:document.getElementById("frameworkSelf").value.trim(),professionalIdentity:document.getElementById("frameworkIdentity").value.trim()};
    document.querySelectorAll(".framework-chip.selected").forEach(btn=>current[btn.dataset.group].push(btn.dataset.value));
    saveFrameworkData(current);
    alert("My Practice Framework has been updated 🧭");
    frameworkPage();
  });
}


function timesheetPage(){
  const entries=timesheetEntries();
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backPlacement">‹</button><h2>⏱️ Timesheets</h2></div>
    <div class="card green"><div class="label">Why am I doing this?</div><p>JCU requires a detailed record of placement hours and activities. Timesheets are reviewed, signed and submitted every two weeks.</p></div>
    <div class="card"><label class="label">Date</label><input id="tsDate" type="date" class="input"><div class="grid2" style="margin-top:10px"><input id="tsStart" type="time" class="input" value="09:00"><input id="tsFinish" type="time" class="input" value="17:00"></div><label class="label" style="display:block;margin-top:12px">Unpaid lunch minutes</label><input id="tsLunch" type="number" class="input" value="45"><label class="label" style="display:block;margin-top:12px">Activities</label><textarea id="tsActivities" class="textarea" placeholder="Orientation, team meeting, shadowing, documentation, group, supervision, research..."></textarea><button class="btn" id="saveTimesheet">Save timesheet entry</button></div>
    <div class="card"><div class="label">Saved entries</div>${entries.length?entries.map(e=>`<div class="row"><div style="flex:1"><strong>${e.date}</strong><div class="small">${e.start} to ${e.finish} · ${Number(e.hours).toFixed(2)} hrs</div><div class="small">${e.activities||""}</div></div></div>`).join(""):`<p class="muted personality-empty">📅 Your first timesheet entry will appear here.</p>`}</div>`;
  document.getElementById("backPlacement").onclick=()=>{route="assessments";render()};
  document.getElementById("saveTimesheet").onclick=()=>{
    const date=document.getElementById("tsDate").value,start=document.getElementById("tsStart").value,finish=document.getElementById("tsFinish").value,lunch=Number(document.getElementById("tsLunch").value||0),activities=document.getElementById("tsActivities").value.trim();
    if(!date||!start||!finish){alert("Add the date, start and finish time first.");return}
    const [sh,sm]=start.split(":").map(Number),[fh,fm]=finish.split(":").map(Number); const total=Math.max(((fh*60+fm)-(sh*60+sm)-lunch)/60,0);
    const arr=timesheetEntries(); arr.unshift({id:Date.now(),date,start,finish,lunch,hours:total,activities}); state.set("timesheets",arr); state.set("hours",arr.reduce((sum,e)=>sum+Number(e.hours||0),0)); alert("✨ Timesheet entry saved"); timesheetPage();
  };
}

function supervisionPage(){
  const items=supervisionItems();
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backPlacement">‹</button><h2>☕ Supervision</h2></div>
    <div class="card green"><div class="label">Why am I doing this?</div><p>Supervision connects theory, ethics, feedback, use of self and professional development with your placement experiences.</p></div>
    <div class="card"><select id="supType" class="select"><option>Question</option><option>Feedback</option><option>Action item</option><option>Ethical issue</option><option>Use of self</option><option>Learning goal</option></select><textarea id="supText" class="textarea" placeholder="What would you like to discuss or remember?"></textarea><button class="btn" id="saveSupervision">Save for supervision</button></div>
    <div class="card"><div class="label">My supervision list</div>${items.length?items.map(i=>`<div class="row"><div><strong>${i.type}</strong><div class="small">${i.date}</div><div>${i.text}</div></div></div>`).join(""):`<p class="muted personality-empty">🤝 Save a question, feedback point or action when you are ready.</p>`}</div>`;
  document.getElementById("backPlacement").onclick=()=>{route="assessments";render()};
  document.getElementById("saveSupervision").onclick=()=>{const text=document.getElementById("supText").value.trim();if(!text){alert("Add a supervision note first.");return}const arr=supervisionItems();arr.unshift({id:Date.now(),date:new Date().toLocaleDateString("en-AU"),type:document.getElementById("supType").value,text});state.set("supervisionItems",arr);alert("🤝 Saved for supervision");supervisionPage();};
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
  const moment=document.getElementById("answer")?.value.trim()||""; if(!moment){alert("Add one moment from today first.");return}
  const theories=[...document.querySelectorAll(".theory-chip.selected")].map(x=>x.dataset.value);
  const values=[...document.querySelectorAll(".value-chip.selected")].map(x=>x.dataset.value);
  const ethics=[...document.querySelectorAll(".ethics-chip.selected")].map(x=>x.dataset.value);
  const practiceStandards=[...document.querySelectorAll(".standard-chip.selected")].map(x=>x.dataset.value);
  const deeperQuestion=document.getElementById("deeperQuestion")?.value||"", deeperAnswer=document.getElementById("deeperAnswer")?.value.trim()||"", futurePractice=document.getElementById("futurePractice")?.value.trim()||"", supervision=document.getElementById("supervision")?.value.trim()||"";
  const evidenceTypes=[]; if(theories.length)evidenceTypes.push("Theory in action","Knowledge"); if(values.length||ethics.length)evidenceTypes.push("Ethics or values"); if(practiceStandards.length)evidenceTypes.push("Professional development"); if(values.includes("Respect for Persons")||ethics.includes("Cultural Safety"))evidenceTypes.push("Cultural capability"); if(futurePractice)evidenceTypes.push("Critical Reflection");
  const autoMapped=mappedAssessments([...new Set(evidenceTypes)]), info=placementInfo(),p=dailyPrompt(info,hours());
  const sections=[moment,theories.length&&`Social work lens: ${theories.join(", ")}`,(values.length||ethics.length)&&`Values and ethics: ${[...values,...ethics].join(", ")}`,practiceStandards.length&&`Practice Standards: ${practiceStandards.join("; ")}`,deeperAnswer&&`${deeperQuestion} ${deeperAnswer}`,futurePractice&&`Future practice: ${futurePractice}`].filter(Boolean);
  const entry={id:Date.now(),date:new Date().toLocaleDateString("en-AU"),goal:p.goal,mood:"",answer:sections.join("\n\n"),moment,whyMatter:deeperAnswer,theories,values,ethics,practiceStandards,useOfSelf:"",deeperQuestion,deeperAnswer,futurePractice,professionalIdentity:"",evidenceTypes:[...new Set(evidenceTypes)],theory:theories[0]||"",method:"",supervision,evidence:autoMapped};
  const arr=savedEntries();arr.unshift(entry);state.set("entries",arr);if(supervision){const items=supervisionItems();items.unshift({id:Date.now()+1,date:entry.date,type:"Reflection question",text:supervision});state.set("supervisionItems",items);}lastSavedReflection=entry;render();window.scrollTo({top:0,behavior:"smooth"});
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
    const entries=savedEntries(),reviews=state.get("weeklyReviews",[]),timesheets=timesheetEntries(),framework=frameworkData();
    const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Practice Compass Export</title><style>body{font-family:Arial,sans-serif;max-width:850px;margin:40px auto;padding:0 20px;color:#2f332f}h1,h2{color:#536158}.entry{border:1px solid #ddd6cc;border-radius:12px;padding:18px;margin:16px 0}.meta{color:#777;font-size:13px}.pill{display:inline-block;background:#e8eee9;padding:5px 8px;border-radius:99px;margin:3px}pre{white-space:pre-wrap;font-family:inherit}</style></head><body><h1>Practice Compass Placement Notes</h1><p>Kalina Hughes · Mind Australia · Adult Step Up Step Down</p><h2>Learning moments</h2>${entries.map(e=>`<div class="entry"><div class="meta">${safeText(e.date)} · Goal ${safeText(e.goal)}</div><pre>${safeText(e.answer)}</pre>${(e.evidenceTypes||[]).map(x=>`<span class="pill">${safeText(x)}</span>`).join("")}${e.supervision?`<p><strong>Supervision:</strong> ${safeText(e.supervision)}</p>`:""}</div>`).join("")||"<p>No entries yet.</p>"}<h2>Timesheets</h2>${timesheets.map(e=>`<div class="entry"><strong>${safeText(e.date)}</strong><p>${safeText(e.start)} to ${safeText(e.finish)} · ${Number(e.hours||0).toFixed(2)} hours</p><p>${safeText(e.activities)}</p></div>`).join("")||"<p>No timesheet entries yet.</p>"}<h2>Weekly check ins</h2>${reviews.map(r=>`<div class="entry"><div class="meta">${safeText(r.date)}</div>${(r.answers||[]).map(x=>`<p><strong>${safeText(x.q)}</strong><br>${safeText(x.a)}</p>`).join("")}</div>`).join("")||"<p>No weekly reviews yet.</p>"}<h2>My Framework for Practice</h2><div class="entry"><p><strong>Values:</strong> ${(framework.values||[]).map(safeText).join(", ")||"Not added"}</p><p><strong>Theories and approaches:</strong> ${(framework.theories||[]).map(safeText).join(", ")||"Not added"}</p><p><strong>Cultural capability:</strong> ${(framework.cultural||[]).map(safeText).join(", ")||"Not added"}</p><p><strong>Skills:</strong> ${(framework.skills||[]).map(safeText).join(", ")||"Not added"}</p><p><strong>Use of self:</strong> ${safeText(framework.useOfSelf)||"Not added"}</p><p><strong>Professional identity:</strong> ${safeText(framework.professionalIdentity)||"Not added"}</p></div></body></html>`;
    shareOrDownload(new Blob([html],{type:"text/html"}),"Practice_Compass_Placement_Notes.html","Practice Compass placement notes");
  }catch(error){console.error(error);alert("The export could not be created. Please try the JSON backup instead.");}
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
  document.getElementById("completeDay")?.addEventListener("click",()=>{state.set("hours",Math.min(TOTAL_HOURS,hours()+HOURS_PER_DAY));render()});
  document.getElementById("adjustHours")?.addEventListener("click",()=>{const v=prompt("Enter total completed placement hours:",hours()); if(v!==null&&!isNaN(Number(v))){state.set("hours",Number(v));render()}});
  document.getElementById("saveEntry")?.addEventListener("click",saveEntry);
  document.querySelectorAll(".theory-context").forEach(btn=>btn.onclick=()=>selectReflectionContext(btn,".theory-context",reflectionTheoryContextMap,"theorySuggestions","theory"));
  document.querySelectorAll(".ethics-context").forEach(btn=>btn.onclick=()=>selectReflectionContext(btn,".ethics-context",reflectionEthicsContextMap,"ethicsSuggestions","ethics"));
  document.querySelectorAll(".standard-context").forEach(btn=>btn.onclick=()=>selectReflectionContext(btn,".standard-context",reflectionStandardContextMap,"standardSuggestions","standard"));
  document.getElementById("reflectionSearch")?.addEventListener("input",event=>{const q=event.target.value.toLowerCase();document.querySelectorAll(".reflection-library-item").forEach(item=>item.classList.toggle("hidden",!item.dataset.search.includes(q)));});
  document.getElementById("reflectionCompanion")?.addEventListener("toggle",event=>state.set("reflectionCompanionOpen",event.currentTarget.open));
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
  document.getElementById("openSupervision")?.addEventListener("click",()=>supervisionPage());
  document.querySelectorAll(".assessment").forEach(x=>x.onclick=()=>assessmentDetail(x.dataset.id));
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
  document.getElementById("backupJson")?.addEventListener("click",()=>backup());
  document.getElementById("restoreJson")?.addEventListener("click",()=>document.getElementById("restoreJsonFile")?.click());
  document.getElementById("restoreJsonFile")?.addEventListener("change",event=>{const file=event.target.files?.[0];readBackupFile(file);event.target.value="";});
}

document.querySelectorAll(".nav").forEach(n=>n.onclick=()=>{route=n.dataset.route;render()});
document.getElementById("menuBtn").onclick=()=>{route="more";render()};
render();
