
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

const toolkitCategories = [["🏥", "Practice Areas", "Evidence informed introductions to major areas of Australian social work practice.", [
  ["Domestic and Family Violence", "Prevalence, coercive control, social work responses and verified Australian sources."],
  ["Mental Health", "Recovery, rights, social determinants and multidisciplinary practice."],
  ["Alcohol and Other Drugs", "Harm reduction, stigma, risk and person centred support."],
  ["Homelessness and Housing", "Housing insecurity, structural barriers, safety and advocacy."],
  ["Child and Family Practice", "Safety, development, participation and family systems."],
  ["Sexual Violence", "Trauma and violence informed, survivor centred responses."]
]], ["🧠", "Theories & Frameworks", "Different lenses for understanding people, relationships, systems and change.", [["Recovery Oriented Practice", "Hope, choice, meaning and a life beyond symptoms."], ["CHIME", "Connectedness, Hope, Identity, Meaning and Empowerment."], ["Strengths Based Practice", "Start with capacity, resources and possibility."], ["Systems & Ecological Theory", "Understand the person within interacting environments."], ["Narrative Practice", "Separate the person from the problem."], ["Feminist Social Work", "Examine gender, power and structural inequality."], ["Anti Oppressive Practice", "Notice and challenge power, privilege and oppression."], ["Intersectionality", "Explore overlapping identities and structures."], ["Trauma Informed Practice", "Prioritise safety, trust, choice and collaboration."], ["Attachment Theory", "Consider how safety and connection shape relationships."]]], ["🛠️", "Practice Skills", "Practical methods you may observe, practise or discuss in supervision.", [["Engagement & Rapport", "Build trust through warmth, clarity and respectful pacing."], ["Active Listening", "Use reflection, summarising, silence and clarification."], ["Assessment", "Explore needs, strengths, goals, risks and context."], ["Risk & Safety Planning", "Work collaboratively around risk and protective factors."], ["Advocacy", "Address barriers, rights and access to services."], ["Case Management", "Coordinate planning, services, referrals and review."], ["Group Facilitation", "Support participation, purpose and group safety."], ["Documentation", "Record clearly, objectively and ethically."]]], ["🪞", "Use of Self", "Understand how your values, emotions, communication and identity shape practice.", [["Self Awareness", "Notice your emotions, assumptions and responses."], ["Boundaries", "Balance warmth, care and professional responsibility."], ["Values", "Reflect on what matters to you and how it affects decisions."], ["Bias & Assumptions", "Notice what you may be taking for granted."], ["Professional Identity", "Explore the social worker you are becoming."], ["Emotional Regulation", "Stay grounded in complex interactions."], ["Reflective Practice", "Consider what happened, why it mattered and what comes next."]]], ["🌏", "Cultural Capability & Inclusion", "Support culturally safe, inclusive, anti racist and responsive practice.", [["Aboriginal & Torres Strait Islander Practice", "Centre self determination, Country, kinship and community."], ["Cultural Humility", "Stay curious, reflective and accountable."], ["Cultural Safety", "Consider whether practice is experienced as safe by the person."], ["Decolonising Practice", "Question colonial assumptions and systems."], ["CALD Practice", "Respond to language, migration, culture and settlement experiences."], ["Working with Interpreters", "Use qualified interpreters respectfully and effectively."], ["Refugee & Asylum Seeker Practice", "Consider trauma, displacement, legal status and settlement."], ["LGBTQIA+ Affirmative Practice", "Support identity, dignity and self determination."], ["Disability Inclusive Practice", "Remove barriers and support participation."], ["Neurodiversity Affirming Practice", "Respect neurological difference and communication needs."], ["Intersectionality", "Understand how identities and structures overlap."], ["Anti Racist Practice", "Identify and challenge racism in systems and practice."]]], ["⚖️", "Ethics & Professional Practice", "Connect daily practice with social work values, ethics and standards.", [["AASW Code of Ethics", "Respect, social justice and professional integrity."], ["Professional Boundaries", "Maintain safe and purposeful relationships."], ["Confidentiality", "Protect privacy while understanding limits."], ["Informed Consent", "Support genuine understanding and choice."], ["Ethical Decision Making", "Work through competing values and responsibilities."], ["Supervision", "Use reflection, feedback and accountability to grow."], ["Professional Sustainability", "Recognise stress and the need for support."]]], ["📖", "Legislation & Policy", "Organise laws, policies and guidance relevant to placement.", [["Mental Health Act 2016 (Qld)", "Rights, treatment, decision making and safeguards."], ["Human Rights Act 2019 (Qld)", "Human rights in public decision making."], ["Privacy & Confidentiality", "Information handling, consent and disclosure."], ["Guardianship & Decision Making", "Capacity and supported decision making."], ["AASW Practice Standards", "Professional expectations across social work practice."], ["Organisation Policies", "Mind Australia procedures and local guidance."]]], ["👥", "Working with Different Populations", "Prompts for inclusive and responsive practice.", [["Adults experiencing mental ill health", "Recovery, dignity, autonomy and social context."], ["Children & Young People", "Development, safety, participation and family context."], ["Older People", "Ageing, autonomy, care, loss and connection."], ["People with Disability", "Access, rights, communication and inclusion."], ["People experiencing homelessness", "Housing, safety and structural barriers."], ["People who use alcohol and other drugs", "Harm reduction, stigma and choice."], ["Rural & Remote Communities", "Distance, access, privacy and relationships."], ["Justice Involved People", "Rights, stigma and reintegration."]]], ["💬", "Communication", "Communication that supports dignity, clarity, safety and participation.", [["Difficult Conversations", "Stay clear, respectful and grounded."], ["Trauma Informed Communication", "Support safety, choice and control."], ["De escalation", "Reduce intensity while maintaining dignity and safety."], ["Strengths Based Language", "Describe people with respect and possibility."], ["Working with Interpreters", "Speak to the person, not the interpreter."], ["Email & Phone Communication", "Be clear, professional and purposeful."], ["Documentation Language", "Use objective, respectful and relevant wording."]]], ["📝", "Documentation", "Support clear, ethical and useful information recording.", [["Case Notes", "Relevant, factual and timely records."], ["Assessment Writing", "Bring together needs, strengths, risk and context."], ["Reflective Notes", "Capture learning without identifying details."], ["Professional Emails", "Clear purpose, tone and concise information."], ["Reports", "Structured, evidence informed and audience aware writing."]]], ["🔬", "Research & Evidence", "Use evidence to strengthen practice and reflection.", [["Evidence Informed Practice", "Combine research, expertise and lived experience."], ["Finding Quality Sources", "Use peer reviewed and authoritative material."], ["Critical Appraisal", "Consider strengths, limits and relevance."], ["Reflective Inquiry", "Turn practice questions into learning."], ["Small Project Skills", "Plan, gather information, analyse and report."], ["APA 7 Referencing", "Credit sources accurately."]]], ["🤝", "Community Development", "Think beyond individual work toward participation and collective change.", [["Participation", "Support people to influence decisions."], ["Capacity Building", "Strengthen skills, resources and confidence."], ["Social Capital", "Build connection, trust and mutual support."], ["Community Led Practice", "Start with local knowledge and priorities."], ["Collective Advocacy", "Work together to challenge barriers."]]], ["🏛️", "Social Policy", "Understand how policy shapes services and people’s lives.", [["Policy Analysis", "Examine goals, assumptions, impacts and gaps."], ["Structural Inequality", "Connect experiences to wider systems."], ["Service Systems", "Understand funding, eligibility and responses."], ["Advocacy", "Use evidence and lived experience to influence change."], ["Implementation", "Explore how policy becomes everyday practice."]]]];


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
  const upcoming=upcomingAssessments(info,h,current.id,2);
  const remaining=Math.max(0,TOTAL_HOURS-h);
  const progress=Math.min(100,Math.round((h/TOTAL_HOURS)*100));
  const status=taskStatuses[assessmentOverallStatus(current)];
  const dayLabel=new Intl.DateTimeFormat('en-AU',{weekday:'long',day:'numeric',month:'long'}).format(new Date());
  const placementLabel=info.started?`Placement week ${info.week}`:`Placement begins in ${info.daysUntil} days`;
  return `
    <section class="home-greeting">
      <div>
        <div class="eyebrow">${dayLabel}</div>
        <h1>${g.title}</h1>
        <p class="home-companion-line">${g.subtitle}</p>
        <p>${placementLabel} · ${h.toFixed(1)} of ${TOTAL_HOURS} hours</p>
      </div>
      <div class="home-compass-mark">${homeIcon('compass')}</div>
    </section>

    <section class="home-card home-due-card">
      <div class="home-card-heading">
        ${homeIcon('compass')}
        <div><span class="home-kicker">What’s next</span><h2>${current.title}</h2></div>
      </div>
      <p class="home-card-copy">${current.when}</p>
      <div class="home-next-actions">
        <span class="home-next-label">Next actions</span>
        <div><span class="home-task-dot"></span>${stage.focus[0]}</div>
        <div><span class="home-task-dot"></span>${stage.focus[1] || 'Save one useful learning moment.'}</div>
      </div>
      <div class="home-due-footer">
        <span class="status-inline ${status.className}">${status.icon} ${status.label}</span>
        <button class="home-arrow-button" id="openCurrentAssessment" data-id="${current.id}" aria-label="Open ${current.title}">${homeIcon('arrow')}</button>
      </div>
    </section>

    <section class="home-card home-progress-card">
      <div class="home-card-heading compact">
        ${homeIcon('progress')}
        <div><span class="home-kicker">Placement progress</span><h2>${progress ? `${progress}% complete` : "🌱 Your placement journey begins soon"}</h2></div>
      </div>
      <div class="home-progress-track"><span style="width:${progress}%"></span></div>
      <div class="home-progress-meta"><span>${h.toFixed(1)} hours completed</span><span>${remaining.toFixed(1)} remaining</span></div>
    </section>

    ${upcoming.length?`<section class="home-card home-upcoming-card">
      <div class="home-card-heading compact">
        ${homeIcon('calendar')}
        <div><span class="home-kicker">📅 What’s coming</span><h2>Next milestones</h2></div>
      </div>
      <div class="home-upcoming-list">
        ${upcoming.map(item=>`<button class="home-upcoming-row assessment" data-id="${item.id}"><span><strong>${item.title}</strong><small>${item.when}</small></span>${homeIcon('arrow')}</button>`).join('')}
      </div>
    </section>`:''}

    <section class="home-reminder">
      ${homeIcon('heart')}
      <div><strong>🌿 Take care</strong><p>${selfcare[new Date().getDay()]}</p></div>
    </section>`;
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
  const orderedAssessments=assessmentPriority(info,h)
    .map(id=>assessments.find(item=>item.id===id))
    .filter(Boolean);
  const activeAssessments=orderedAssessments.filter(a=>assessmentOverallStatus(a)!=="complete");
  const completedAssessments=orderedAssessments.filter(a=>assessmentOverallStatus(a)==="complete");

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
      <section class="placement-native-heading">
        <div class="eyebrow">🌱 Placement</div>
        <h1>My Placement</h1>
        <p>Everything you need to keep moving, without the noise.</p>
      </section>

      <section class="placement-native-overview" aria-label="Placement overview">
        <div class="placement-native-primary">
          <span>Organisation</span>
          <strong>Mind Australia</strong>
          <small>Step Up Step Down</small>
        </div>
        <div class="placement-native-facts">
          <div><span>Current stage</span><strong>${stage.title}</strong></div>
          <div><span>${info.started?"Placement week":"Placement start"}</span><strong>${placementTiming}</strong></div>
          <div class="placement-native-hours"><span>Hours completed</span><strong>${hoursStarted?h.toFixed(2):"Not started"}</strong>${hoursStarted?`<small>of 500 hours</small>`:`<small>🌱 Your placement journey begins soon.</small>`}</div>
        </div>
        ${hoursStarted?`<div class="placement-native-hours-track" aria-label="${Math.round((h/TOTAL_HOURS)*100)} percent of placement hours completed"><span style="width:${Math.min(100,(h/TOTAL_HOURS)*100)}%"></span></div>`:""}
      </section>

      <section class="placement-native-section">
        <div class="placement-native-section-heading">
          <div><span aria-hidden="true">🗂️</span><h2>Assessments</h2></div>
          ${!activeAssessments.length?`<p>✨ Progress will appear once you begin.</p>`:""}
        </div>
        <div class="native-assessment-list">${standardAssessments.map(assessmentRow).join("")}</div>
        ${projectAssessments.length?`<div class="placement-native-project"><h3>Placement project</h3><div class="native-assessment-list">${projectAssessments.map(assessmentRow).join("")}</div></div>`:""}
        ${completedAssessments.length?`<details class="placement-native-completed"><summary>Completed <span>${completedAssessments.length}</span></summary><div class="native-assessment-list">${completedAssessments.map(assessmentRow).join("")}</div></details>`:""}
      </section>

      <section class="placement-native-records">
        <h2>Placement records</h2>
        <button class="native-record-row" id="openSupervision"><span class="native-record-icon">🤝</span><span><strong>Supervision</strong><small>Questions, feedback and actions</small></span><b>›</b></button>
        <button class="native-record-row" id="openTimesheets"><span class="native-record-icon">⏱️</span><span><strong>Timesheets and hours</strong><small>Daily activities and hour records</small></span><b>›</b></button>
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
  const entries=savedEntries().filter(e=>(e.evidence||[]).includes(a.title));
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

  const taskRow=item=>{
    const meta=taskStatuses[item.status];
    return `<div class="task-row ${item.status==="complete"?"task-row-complete":""}">
      <div class="task-copy">
        <input class="task-complete-check" type="checkbox" data-assessment="${a.id}" data-index="${item.index}" ${item.status==="complete"?"checked":""} aria-label="Mark ${item.task} complete">
        <span>${item.task}</span>
      </div>
      <select class="task-status-select ${meta.className}" data-assessment="${a.id}" data-index="${item.index}" aria-label="Status for ${item.task}">
        ${Object.entries(taskStatuses).map(([value,m])=>`<option value="${value}" ${value===item.status?"selected":""}>${m.label}</option>`).join("")}
      </select>
    </div>`;
  };

  document.getElementById("main").innerHTML=`
    <div class="assessment-detail-calm assessment-detail-readable">
      <button class="assessment-back-link" id="backAssess" aria-label="Back to My Placement">‹ <span>My Placement</span></button>

      <section class="assessment-hero-readable">
        <div class="assessment-hero-icon">${a.icon}</div>
        <div class="assessment-hero-copy">
          <span class="status-inline ${overallMeta.className}">${overallMeta.label}</span>
          <h2>${a.title}</h2>
        </div>
        <strong class="assessment-hero-percent">${progress}%</strong>
        <div class="progress-track"><div style="width:${progress}%"></div></div>
      </section>

      <section class="assessment-primary-section" aria-labelledby="next-steps">
        <div class="assessment-primary-heading"><h3 id="next-steps">Checklist</h3>${incomplete.length?`<span>${incomplete.length} remaining</span>`:""}</div>
        <div class="assessment-priority-steps">
          ${incomplete.length?incomplete.slice(0,3).map(taskRow).join(""):`<div class="assessment-complete-message">🌿 Checklist complete. Check the official submission or sign off step.</div>`}
        </div>
        ${taskItems.length>3?`<details class="assessment-all-steps"><summary>View full checklist <span>${taskItems.length}</span></summary><div>${taskItems.map(taskRow).join("")}</div></details>`:""}
      </section>

      <section class="assessment-primary-section assessment-evidence-quiet" aria-labelledby="assessment-evidence">
        <div class="assessment-primary-heading"><h3 id="assessment-evidence">Evidence linked</h3><span>${entries.length}</span></div>
        ${entries.length
          ? `<div class="assessment-linked-evidence">${entries.map(e=>`<div class="evidence-list-row"><span>📝</span><div><strong>Reflection · ${e.date}</strong><small>${e.answer.slice(0,110)}${e.answer.length>110?"...":""}</small></div></div>`).join("")}</div>`
          : `<p class="muted personality-empty">💭 Evidence will appear here as you save relevant reflections.</p>`}
      </section>

      <details class="assessment-secondary-details assessment-planning-date" id="assessmentPlanning" ${openPlanning?"open":""}>
        <summary><span>My planning date</span><small>${planning.date?formatPlanningDate(planning.date):"Not set"}</small></summary>
        <div class="assessment-planning-controls">
          <p class="muted"><strong>Official timing:</strong> ${a.when}</p>
          <label class="label" for="planningDate">My target date</label>
          <input id="planningDate" type="date" class="input" value="${escapeAttribute(planning.date)}">
          <label class="label" for="planningReason">Optional reason</label>
          <input id="planningReason" type="text" class="input" maxlength="120" value="${escapeAttribute(planning.reason)}" placeholder="Leave, travel or another commitment">
          <p class="assessment-planning-notice">This is your personal planning date and does not change the official JCU requirement.</p>
          <div class="assessment-planning-actions"><button class="btn" id="savePlanningDate">Save</button><button class="btn secondary" id="clearPlanningDate" ${planning.date||planning.reason?"":"disabled"}>Clear</button></div>
        </div>
      </details>

      <details class="assessment-secondary-details">
        <summary><span>Assessment information</span><small>Overview and JCU guidance</small></summary>
        <div class="assessment-secondary-content">
          <h3>Overview</h3><p>${a.purpose||a.plain}</p>
          <h3>JCU requirement</h3><p>${official.requirement}</p>
          <h3>Official record</h3><p>${official.record}</p>
          <p class="assessment-scope-note">${official.notice}</p>
        </div>
      </details>

      ${reqs.length?`<details class="assessment-secondary-details"><summary><span>Evidence categories</span><small>${reqs.length}</small></summary><div class="assessment-secondary-content assessment-evidence-map">${reqs.map(r=>{
        const count=entries.filter(e=>(e.evidenceTypes||[]).includes(r)).length;
        return `<div class="evidence-category-row"><span>${count?"✓":"○"}</span><span>${r}</span><strong>${count}</strong></div>`;
      }).join("")}</div></details>`:""}

      ${toolkitLinks.length?`<section class="assessment-primary-section assessment-toolkit-suggestions" aria-labelledby="toolkit-suggestions"><div class="assessment-primary-heading"><h3 id="toolkit-suggestions">Toolkit suggestions</h3></div><div class="linked-resource-list">${toolkitLinks.map(item=>`<button class="linked-resource" data-toolkit-name="${item}"><span>📚</span><div><strong>${item}</strong></div><span>›</span></button>`).join("")}</div></section>`:""}

      <details class="assessment-secondary-details official-sources-card">
        <summary><span>Official sources</span><small>${official.sources.length}</small></summary>
        <div class="assessment-secondary-content">
          <div class="official-source-list">${official.sources.map(source=>`<div class="official-source-row"><span>✓</span><span>${source}</span></div>`).join("")}</div>
          <p class="assessment-scope-note">Use the current version supplied by JCU or published by the AASW. Practice Compass does not replace official JCU documents, LearnJCU instructions or FELO advice.</p>
        </div>
      </details>
    </div>`;

  document.getElementById("backAssess").onclick=()=>{route="assessments";render()};
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
  if(verifiedKnowledgePage(topic,category)) return;

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
  const growth=evidencedItems.slice(0,4);
  const usedTags=new Set(intelligence.entries.flatMap(entry=>entry.evidenceTypes||[]));
  const opportunityRules=[
    {label:"Ethical decision making",tags:["Ethics or values"]},
    {label:"Cultural capability",tags:["Cultural capability"]},
    {label:"Interprofessional collaboration",tags:["Teamwork"]},
    {label:"Use of self",tags:["Use of self"]},
    {label:"Theory informed practice",tags:["Theory in action"]}
  ];
  const opportunities=opportunityRules.filter(item=>!item.tags.some(tag=>usedTags.has(tag))).slice(0,3);
  const groupLabels={values:"Values demonstrated",theories:"Practice theories",models:"Practice models",skills:"Skills",useOfSelf:"Use of self"};
  const groupSummary=Object.entries(intelligence.groups).map(([key,map])=>{
    const supported=[...map.values()].filter(item=>item.evidence.length).length;
    return `<div class="journey-framework-row"><span>${groupLabels[key]}</span><strong>${supported}</strong></div>`;
  }).join("");

  return `<div class="journey-page">
    <section class="welcome-block journey-welcome">
      <div class="eyebrow">My Journey</div>
      <h1>💚 Professional Growth</h1>
      <p class="welcome-text">See how your professional identity is developing through the evidence you already capture.</p>
    </section>

    <section class="journey-section-block" aria-labelledby="growthSummaryHeading">
      <h2 id="growthSummaryHeading">Growth summary</h2>
      ${growth.length?`<div class="journey-growth-panel"><div class="framework-growth-chips">${growth.map(item=>`<span>🌿 ${safeText(item.name)}</span>`).join("")}</div></div>`:`<div class="journey-empty-message">✨ Your professional identity will grow here as you add reflections.</div>`}
    </section>

    ${opportunities.length?`<section class="journey-section-block" aria-labelledby="opportunitiesHeading"><h2 id="opportunitiesHeading">Opportunities to strengthen</h2><div class="journey-support-panel"><div class="framework-opportunity-list">${opportunities.map(item=>`<span>${safeText(item.label)}</span>`).join("")}</div><p>Gentle prompts for future learning, not missing requirements.</p></div></section>`:""}

    <section class="journey-section-block" aria-labelledby="frameworkHeading">
      <h2 id="frameworkHeading">My practice framework</h2>
      <div class="journey-framework-panel">
        <div class="journey-framework-summary">${groupSummary}</div>
        <button class="journey-text-action" id="frameworkMenu">View my developing framework <span>›</span></button>
      </div>
    </section>

    <section class="journey-section-block" aria-labelledby="professionalDevelopmentHeading">
      <h2 id="professionalDevelopmentHeading">Professional development</h2>
      <button class="journey-utility-row" id="professionalDevelopmentMenu"><span><strong>Personal additions</strong><small>Add development areas not yet captured through reflection evidence</small></span><span>›</span></button>
    </section>

    <section class="journey-app-section" aria-labelledby="journeyAppHeading">
      <div class="journey-app-heading"><h2 id="journeyAppHeading">App</h2><p>Utilities kept separate from your professional journey.</p></div>
      <button class="journey-utility-row" id="exportHtml"><span><strong>Export data</strong><small>Create a readable placement record</small></span><span>›</span></button>
      <details class="journey-utility-details"><summary><span><strong>Settings</strong><small>App and data preferences</small></span><span>›</span></summary><div class="journey-utility-note">Practice Compass currently keeps your data privately on this device. Additional settings can be added here in a future sprint.</div></details>
      <details class="journey-utility-details"><summary><span><strong>About Practice Compass</strong><small>Purpose and boundaries</small></span><span>›</span></summary><div class="journey-utility-note">Practice Compass helps you capture learning once and reuse it across reflection, evidence and professional growth. It supports placement organisation and does not replace official JCU requirements or professional advice.</div></details>
      <button class="journey-utility-row" id="backupJson"><span><strong>Backup &amp; Restore</strong><small>Download a private backup now. Restore is planned for a future sprint.</small></span><span>›</span></button>
    </section>
  </div>`;
}

function evidenceMapPage(){
  const entries=savedEntries();
  const categories=["Skill","Knowledge","Communication","Ethics or values","Cultural capability","Theory in action","Recovery","Use of self","Feedback","Teamwork","Systems issue","Documentation","Professional development"];
  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backMore">‹</button><h2>🌱 My growth</h2></div>
    <div class="card green"><div class="label">What is this?</div><p>Your saved reflections are grouped by what they demonstrate. You do not need equal numbers in every category.</p></div>
    <div class="card">${categories.map(c=>{const n=entries.filter(e=>(e.evidenceTypes||[]).includes(c)).length;return `<div class="row"><span style="flex:1">${c}</span><strong>${n}</strong></div>`}).join("")}</div>`;
  document.getElementById("backMore").onclick=()=>{route="more";render()};
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
  const groups={
    values:["Human dignity","Social justice","Self determination","Respect","Hope","Compassion","Accountability","Cultural safety"],
    theories:["Recovery Oriented Practice","Strengths Based Practice","Systems and Ecological Theory","Trauma Informed Practice","Person Centred Practice","Anti Oppressive Practice","Feminist Social Work","Intersectionality","Narrative Practice","Motivational Interviewing"],
    cultural:["Cultural humility","Cultural safety","Aboriginal and Torres Strait Islander self determination","CALD inclusion","Anti racist practice","LGBTQIA+ affirmative practice","Disability inclusion","Neurodiversity affirming practice"],
    skills:["Engagement and rapport","Active listening","Assessment","Advocacy","Documentation","Case management","Group facilitation","Interprofessional collaboration","Reflective supervision"]
  };
  const allItems=Object.values(intelligence.groups).flatMap(map=>[...map.values()]);
  const evidencedItems=allItems.filter(item=>item.evidence.length);
  const growth=evidencedItems.slice(0,4);
  const opportunityRules=[
    {label:"Ethical decision making",tags:["Ethics or values"]},
    {label:"Cultural capability",tags:["Cultural capability"]},
    {label:"Interprofessional collaboration",tags:["Teamwork"]},
    {label:"Use of self",tags:["Use of self"]},
    {label:"Theory informed practice",tags:["Theory in action"]}
  ];
  const usedTags=new Set(intelligence.entries.flatMap(entry=>entry.evidenceTypes||[]));
  const opportunities=opportunityRules.filter(item=>!item.tags.some(tag=>usedTags.has(tag))).slice(0,3);
  const labels={values:"Values demonstrated",theories:"Practice theories",models:"Practice models",skills:"Skills",useOfSelf:"Use of self"};
  const frameworkItem=item=>`<details class="framework-evidence-item">
    <summary><span>${safeText(item.name)}</span><span>${item.evidence.length?`${item.evidence.length} reflection${item.evidence.length===1?"":"s"}`:"Personal addition"}</span></summary>
    <div class="framework-evidence-body">
      ${item.evidence.length?`<strong>Evidence from</strong><div class="framework-source-list">${item.evidence.map(source=>`<span>${safeText(source.label)}${source.date?` · ${safeText(source.date)}`:""}</span>`).join("")}</div>`:`<p class="muted">This was added by you. Supporting reflection evidence will appear here when available.</p>`}
      ${item.assessments.size?`<strong>Supports</strong><div class="framework-support-list">${[...item.assessments].map(a=>`<span>✓ ${safeText(a)}</span>`).join("")}</div>`:""}
    </div>
  </details>`;
  const groupSection=(key,map)=>map.size?`<section class="framework-growth-group"><div class="label">${labels[key]}</div><div class="framework-evidence-list">${[...map.values()].map(frameworkItem).join("")}</div></section>`:"";
  const chips=(group,items)=>items.map(v=>`<button class="select-chip framework-chip ${(data[group]||[]).includes(v)?"selected":""}" data-group="${group}" data-value="${v}">${v}</button>`).join("");

  document.getElementById("main").innerHTML=`
    <div class="screen-title"><button class="back" id="backMore">‹</button><h2>🧭 My Practice Framework</h2></div>
    <section class="card green framework-intelligence-hero"><div class="label">How am I developing as a social worker?</div><p>Your framework grows from the reflections and evidence you already save. Capture once, then use it across your placement journey.</p></section>

    ${growth.length?`<section class="card framework-growth-summary"><div class="label">You’re demonstrating</div><div class="framework-growth-chips">${growth.map(item=>`<span>🌿 ${safeText(item.name)}</span>`).join("")}</div></section>`:`<section class="card framework-empty"><div class="label">Your framework will grow here</div><p>Save reflections and choose what they demonstrate. Practice Compass will organise the supporting evidence for you.</p></section>`}

    ${opportunities.length?`<section class="card sage framework-opportunities"><div class="label">Opportunities to strengthen</div><div class="framework-opportunity-list">${opportunities.map(item=>`<span>${safeText(item.label)}</span>`).join("")}</div><p class="muted">These are gentle prompts for future learning, not missing requirements.</p></section>`:""}

    <section class="card framework-development"><div class="label">My developing framework</div>
      ${groupSection("values",intelligence.groups.values)}
      ${groupSection("theories",intelligence.groups.theories)}
      ${groupSection("models",intelligence.groups.models)}
      ${groupSection("skills",intelligence.groups.skills)}
      ${groupSection("useOfSelf",intelligence.groups.useOfSelf)}
    </section>

    <details class="card framework-manual-additions">
      <summary><span><strong>Personal additions</strong><small>Add anything important that has not yet appeared through reflection evidence.</small></span><span>›</span></summary>
      <div class="framework-manual-body">
        <div><div class="label">My values</div><div class="chip-grid">${chips("values",groups.values)}</div></div>
        <div><div class="label">Theories and approaches</div><div class="chip-grid">${chips("theories",groups.theories)}</div></div>
        <div><div class="label">Cultural capability and inclusion</div><div class="chip-grid">${chips("cultural",groups.cultural)}</div></div>
        <div><div class="label">My developing skills</div><div class="chip-grid">${chips("skills",groups.skills)}</div></div>
        <div><div class="label">My use of self</div><textarea id="frameworkSelf" class="textarea" placeholder="What strengths, assumptions, emotions, boundaries or feedback are shaping your practice?">${safeText(data.useOfSelf||"")}</textarea></div>
        <div><div class="label">The social worker I am becoming</div><textarea id="frameworkIdentity" class="textarea" placeholder="Describe the kind of practitioner you want to become.">${safeText(data.professionalIdentity||"")}</textarea></div>
        <button class="btn" id="saveFramework">Save personal additions</button>
      </div>
    </details>`;
  document.getElementById("backMore").onclick=()=>{route="more";render()};
  document.querySelectorAll(".framework-chip").forEach(btn=>btn.onclick=()=>btn.classList.toggle("selected"));
  document.getElementById("saveFramework").onclick=()=>{
    const current={values:[],theories:[],cultural:[],skills:[],useOfSelf:document.getElementById("frameworkSelf").value.trim(),professionalIdentity:document.getElementById("frameworkIdentity").value.trim()};
    document.querySelectorAll(".framework-chip.selected").forEach(btn=>current[btn.dataset.group].push(btn.dataset.value));
    saveFrameworkData(current); alert("My Practice Framework has been updated 🧭"); frameworkPage();
  };
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
function backup(){
  try{
    const data={exportedAt:new Date().toISOString(),hours:hours(),entries:savedEntries(),weeklyReviews:state.get("weeklyReviews",[]),timesheets:timesheetEntries(),supervisionItems:supervisionItems(),taskStatuses:taskStatusData(),framework:frameworkData()};
    shareOrDownload(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),"Practice_Compass_Backup.json","Practice Compass backup");
  }catch(error){console.error(error);alert("The backup could not be created. Please try again.");}
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
}

document.querySelectorAll(".nav").forEach(n=>n.onclick=()=>{route=n.dataset.route;render()});
document.getElementById("menuBtn").onclick=()=>{route="more";render()};
render();
