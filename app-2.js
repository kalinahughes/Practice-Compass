
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

const toolkitCategories = [["🏥", "Practice Areas", "Evidence informed introductions to major areas of Australian social work practice.", [
  ["Domestic and Family Violence", "Prevalence, coercive control, social work responses and verified Australian sources."],
  ["Mental Health", "Recovery, rights, social determinants and multidisciplinary practice."],
  ["Alcohol and Other Drugs", "Harm minimisation, stigma, risk and person centred support."], ["Disability Practice", "Rights, access, choice, participation and removal of barriers."],
  ["Homelessness and Housing", "Housing insecurity, structural barriers, safety and advocacy."],
  ["Child and Family Practice", "Safety, development, participation and family systems."],
  ["Sexual Violence", "Trauma and violence informed, survivor centred responses."]
]], ["🧠", "Theories & Frameworks", "Different lenses for understanding people, relationships, systems and change.", [["Recovery Oriented Practice", "Hope, choice, meaning and a life beyond symptoms."], ["CHIME", "Connectedness, Hope, Identity, Meaning and Empowerment."], ["Strengths Based Practice", "Start with capacity, resources and possibility."], ["Systems & Ecological Theory", "Understand the person within interacting environments."], ["Narrative Practice", "Separate the person from the problem."], ["Feminist Social Work", "Examine gender, power and structural inequality."], ["Anti Oppressive Practice", "Notice and challenge power, privilege and oppression."], ["Intersectionality", "Explore overlapping identities and structures."], ["Trauma Informed Practice", "Prioritise safety, trust, choice and collaboration."], ["Person Centred Practice", "Keep the person’s goals, preferences and lived experience central."], ["Motivational Interviewing", "Explore ambivalence and strengthen the person’s own reasons for change."], ["Attachment Theory", "Consider how safety and connection shape relationships."], ["Child Centred Practice", "Keep the child’s safety, voice and lived experience central."], ["Family Centred Practice", "Work collaboratively with families while keeping children’s safety visible."], ["Housing First", "Prioritise permanent housing without requiring treatment readiness."], ["Harm Minimisation", "Reduce health, social and legal harms without requiring abstinence."], ["Stages of Change", "Understand that readiness for change can shift over time."], ["Social Model of Disability", "Locate disability in barriers rather than individual deficit."]]], ["🛠️", "Practice Skills", "Practical methods you may observe, practise or discuss in supervision.", [["Engagement & Rapport", "Build trust through warmth, clarity and respectful pacing."], ["Active Listening", "Use reflection, summarising, silence and clarification."], ["Assessment", "Explore needs, strengths, goals, risks and context."], ["Risk & Safety Planning", "Work collaboratively around risk and protective factors."], ["Suicide Risk Assessment", "Explore suicidal distress, immediate safety, supports and next steps within scope."], ["Safety Planning", "Develop practical, collaborative steps for periods of increased distress or risk."], ["Advocacy", "Address barriers, rights and access to services."], ["Case Management", "Coordinate planning, services, referrals and review."], ["Group Facilitation", "Support participation, purpose and group safety."], ["Documentation", "Record clearly, objectively and ethically."], ["Permanency Planning", "Support stable, enduring relationships and living arrangements for children."], ["Child Development in Practice", "Use developmental knowledge without losing sight of context and diversity."], ["Brief Interventions", "Use short, focused conversations to support reflection and change."], ["Withdrawal Considerations", "Recognise when withdrawal may require urgent clinical assessment."], ["Relapse Prevention", "Plan for triggers, supports and recovery after setbacks."], ["Tenancy Support", "Support people to understand and sustain housing."], ["Service Coordination", "Connect services around the person without creating extra burden."]]], ["🪞", "Use of Self", "Understand how your values, emotions, communication and identity shape practice.", [["Self Awareness", "Notice your emotions, assumptions and responses."], ["Boundaries", "Balance warmth, care and professional responsibility."], ["Values", "Reflect on what matters to you and how it affects decisions."], ["Bias & Assumptions", "Notice what you may be taking for granted."], ["Professional Identity", "Explore the social worker you are becoming."], ["Emotional Regulation", "Stay grounded in complex interactions."], ["Reflective Practice", "Consider what happened, why it mattered and what comes next."]]], ["🌏", "Cultural Capability & Inclusion", "Support culturally safe, inclusive, anti racist and responsive practice.", [["Aboriginal & Torres Strait Islander Practice", "Centre self determination, Country, kinship and community."], ["Cultural Humility", "Stay curious, reflective and accountable."], ["Cultural Safety", "Consider whether practice is experienced as safe by the person."], ["Decolonising Practice", "Question colonial assumptions and systems."], ["CALD Practice", "Respond to language, migration, culture and settlement experiences."], ["Working with Interpreters", "Use qualified interpreters respectfully and effectively."], ["Refugee & Asylum Seeker Practice", "Consider trauma, displacement, legal status and settlement."], ["LGBTQIA+ Affirmative Practice", "Support identity, dignity and self determination."], ["Disability Inclusive Practice", "Remove barriers and support participation."], ["Neurodiversity Affirming Practice", "Respect neurological difference and communication needs."], ["Intersectionality", "Understand how identities and structures overlap."], ["Anti Racist Practice", "Identify and challenge racism in systems and practice."]]], ["⚖️", "Ethics & Professional Practice", "Connect daily practice with social work values, ethics and standards.", [["AASW Code of Ethics", "Respect, social justice and professional integrity."], ["Professional Boundaries", "Maintain safe and purposeful relationships."], ["Confidentiality", "Protect privacy while understanding limits."], ["Informed Consent", "Support genuine understanding and choice."], ["Supported Decision Making", "Provide the support a person needs to understand, consider and communicate decisions."], ["Ethical Decision Making", "Work through competing values and responsibilities."], ["Supervision", "Use reflection, feedback and accountability to grow."], ["Professional Sustainability", "Recognise stress and the need for support."]]], ["📖", "Legislation & Policy", "Organise laws, policies and guidance relevant to placement.", [["Mental Health Act 2016 (Qld)", "Rights, treatment, decision making and safeguards."], ["Human Rights Act 2019 (Qld)", "Human rights in public decision making."], ["Privacy & Confidentiality", "Information handling, consent and disclosure."], ["Guardianship & Decision Making", "Capacity and supported decision making."], ["AASW Practice Standards", "Professional expectations across social work practice."], ["Organisation Policies", "Mind Australia procedures and local guidance."], ["Mandatory Reporting (Queensland)", "Understand who must report and how to respond to child protection concerns."], ["NDIS Overview", "Understand the purpose, limits and participant role within the NDIS."], ["Capacity and Decision Making", "Assess decision specific capacity and maximise support before substitute decision making."]]], ["👥", "Working with Different Populations", "Prompts for inclusive and responsive practice.", [["Adults experiencing mental ill health", "Recovery, dignity, autonomy and social context."], ["Children & Young People", "Development, safety, participation and family context."], ["Older People", "Ageing, autonomy, care, loss and connection."], ["Person Centred Ageing", "Keep the older person’s rights, identity and preferences central."], ["Dementia Aware Practice", "Communicate accessibly and respond to the person rather than the diagnosis."], ["Elder Abuse", "Recognise and respond to abuse, neglect and exploitation of older people."], ["Healthy Ageing", "Support participation, connection, independence and wellbeing across later life."], ["People with Disability", "Access, rights, communication and inclusion."], ["People experiencing homelessness", "Housing, safety and structural barriers."], ["People who use alcohol and other drugs", "Harm reduction, stigma and choice."], ["Rural & Remote Communities", "Distance, access, privacy and relationships."], ["Justice Involved People", "Rights, stigma and reintegration."], ["Trauma Informed Justice Practice", "Support safety, dignity and participation across justice settings."], ["Diversion", "Use appropriate alternatives to formal criminal justice responses."], ["Rehabilitation and Reintegration", "Support change, connection and return to community."], ["Justice Advocacy", "Address barriers to fair treatment, services and legal participation."], ["Human Rights in Justice", "Apply human rights principles to justice decisions and systems."]]], ["💬", "Communication", "Communication that supports dignity, clarity, safety and participation.", [["Difficult Conversations", "Stay clear, respectful and grounded."], ["Trauma Informed Communication", "Support safety, choice and control."], ["De escalation", "Reduce intensity while maintaining dignity and safety."], ["Strengths Based Language", "Describe people with respect and possibility."], ["Working with Interpreters", "Speak to the person, not the interpreter."], ["Email & Phone Communication", "Be clear, professional and purposeful."], ["Documentation Language", "Use objective, respectful and relevant wording."]]], ["📝", "Documentation", "Support clear, ethical and useful information recording.", [["Case Notes", "Relevant, factual and timely records."], ["Assessment Writing", "Bring together needs, strengths, risk and context."], ["Reflective Notes", "Capture learning without identifying details."], ["Professional Emails", "Clear purpose, tone and concise information."], ["Reports", "Structured, evidence informed and audience aware writing."]]], ["🔬", "Research & Evidence", "Use evidence to strengthen practice and reflection.", [["Evidence Informed Practice", "Combine research, expertise and lived experience."], ["Finding Quality Sources", "Use peer reviewed and authoritative material."], ["Critical Appraisal", "Consider strengths, limits and relevance."], ["Reflective Inquiry", "Turn practice questions into learning."], ["Small Project Skills", "Plan, gather information, analyse and report."], ["APA 7 Referencing", "Credit sources accurately."], ["Evaluation", "Assess whether activities are useful, ethical and achieving their purpose."], ["Professional Development", "Plan ongoing learning based on practice needs and feedback."], ["Lifelong Learning", "Treat professional learning as a continuing responsibility."]]], ["🤝", "Community Development", "Think beyond individual work toward participation and collective change.", [["Participation", "Support people to influence decisions."], ["Capacity Building", "Strengthen skills, resources and confidence."], ["Social Capital", "Build connection, trust and mutual support."], ["Community Led Practice", "Start with local knowledge and priorities."], ["Collective Advocacy", "Work together to challenge barriers."], ["Asset Based Community Development", "Start with community strengths, relationships and local knowledge."], ["Empowerment", "Increase influence, choice and collective control."], ["Social Inclusion", "Reduce exclusion and strengthen belonging and participation."]]], ["🏛️", "Social Policy", "Understand how policy shapes services and people’s lives.", [["Policy Analysis", "Examine goals, assumptions, impacts and gaps."], ["Structural Inequality", "Connect experiences to wider systems."], ["Service Systems", "Understand funding, eligibility and responses."], ["Advocacy", "Use evidence and lived experience to influence change."], ["Implementation", "Explore how policy becomes everyday practice."]]]];


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
  "Documentation": {
    what:"Social work documentation creates an accountable record of contact, assessment, decisions, actions and follow up. Good records support continuity, communication, safety and the person’s rights. They should be relevant, timely, respectful, accurate and clear about the source of information and the worker’s professional judgement.",
    practice:["Record the purpose of contact, relevant facts, the person’s views, strengths, risks, actions and next steps.","Separate direct observations, reported information and professional interpretation.","Use objective, person respecting language and avoid unnecessary detail.","Complete records promptly and follow correction, access and security procedures."],
    remember:["Write as though the person may read the record.","Do not copy forward outdated assumptions or use stigmatising labels.","Document consultation and the rationale for significant decisions."],
    related:["Case Notes","Confidentiality","Risk & Safety Planning","AASW Practice Standards"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Aboriginal & Torres Strait Islander Practice": {
    what:"Culturally responsive practice with Aboriginal and Torres Strait Islander peoples begins with respect for self determination, Country, culture, kinship and community authority. It requires social workers to understand how colonisation, racism and past government practices continue to shape trust, access and wellbeing, while recognising the diversity and strengths of First Nations peoples and communities.",
    practice:["Ask the person how they identify, who they want involved and what cultural considerations matter to them.","Work with local Aboriginal and Torres Strait Islander organisations, cultural advisors and community controlled services where appropriate.","Allow time for relationship building and avoid rushing straight into assessment questions.","Consider family, kinship, Country, community obligations and collective wellbeing alongside individual needs."],
    remember:["There is no single Aboriginal or Torres Strait Islander culture or way of working.","Cultural safety is determined by the person receiving the service, not by the worker’s intentions.","Use supervision to examine your own positioning, assumptions and the power carried by professional and organisational roles."],
    related:["Cultural Safety","Cultural Humility","Decolonising Practice","Anti Racist Practice"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Australian Indigenous HealthInfoNet","https://healthinfonet.ecu.edu.au/"]]
  },
  "Cultural Humility": {
    what:"Cultural humility is an ongoing practice of curiosity, self reflection and accountability. Rather than claiming expertise in another person’s culture, the worker recognises the limits of their knowledge and learns from the person, family and community. It also involves examining how professional power, privilege and organisational systems influence the relationship.",
    practice:["Ask respectful questions instead of making assumptions about beliefs, family roles or communication.","Acknowledge when you do not know something and seek guidance appropriately.","Reflect on how your own culture, values and professional position shape what you notice.","Adapt practice based on feedback from the person and relevant cultural supports."],
    remember:["Humility is not a reason to avoid learning about cultural histories and current inequities.","Do not expect the person to educate you about an entire community.","Being well intentioned does not guarantee that practice is experienced as safe or respectful."],
    related:["Cultural Safety","Self Awareness","Anti Racist Practice","Reflective Practice"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Australian Human Rights Commission, cultural diversity resources","https://humanrights.gov.au/our-work/race-discrimination"]]
  },
  "Cultural Safety": {
    what:"Cultural safety means that practice is experienced as respectful and free from racism, discrimination and threats to identity. It goes beyond cultural awareness. The person receiving the service determines whether the interaction is culturally safe, and organisations must address the power imbalances and structures that can create harm.",
    practice:["Ask what would help the person feel culturally safe and respected.","Use the person’s preferred name, identity terms and communication style.","Support access to cultural workers, community controlled services, interpreters or trusted supports.","Challenge racist language, stereotypes and discriminatory processes rather than leaving the burden with the person."],
    remember:["Cultural safety is not achieved through a checklist or one training session.","Avoid treating culture as a risk factor or explaining distress only through culture.","Record cultural needs and preferences only when relevant and with respectful language."],
    related:["Aboriginal & Torres Strait Islander Practice","Cultural Humility","Anti Racist Practice","Working with Interpreters"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Australian Commission on Safety and Quality in Health Care, cultural safety","https://www.safetyandquality.gov.au/standards/nsqhs-standards/user-guide-aboriginal-and-torres-strait-islander-health"]]
  },
  "Decolonising Practice": {
    what:"Decolonising practice involves recognising and challenging the ongoing effects of colonisation in social work knowledge, services and decision making. It centres First Nations knowledge, leadership and self determination rather than treating Western professional frameworks as the only valid way of understanding wellbeing, family or community.",
    practice:["Question whose knowledge is treated as authoritative in assessment and planning.","Support Aboriginal and Torres Strait Islander leadership and community controlled responses.","Consider how policies or procedures may reproduce surveillance, exclusion or paternalism.","Use local cultural guidance and supervision when practice involves unfamiliar community contexts."],
    remember:["Decolonising practice is not achieved by adding cultural symbols to unchanged systems.","Avoid speaking for communities or claiming authority you do not hold.","Accountability includes listening to critique and changing practice, not only reflecting on intentions."],
    related:["Aboriginal & Torres Strait Islander Practice","Cultural Safety","Anti Oppressive Practice","Self Determination"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Coalition of Peaks, National Agreement on Closing the Gap","https://www.closingthegap.gov.au/national-agreement"]]
  },
  "CALD Practice": {
    what:"Practice with culturally and linguistically diverse communities requires attention to language, migration experience, family and community relationships, religion, racism, settlement conditions and access barriers. The person’s own understanding of their identity and needs should guide practice rather than broad cultural assumptions.",
    practice:["Ask about preferred language, communication needs and whether a qualified interpreter is required.","Explore migration and settlement experiences only when relevant and at the person’s pace.","Consider practical barriers such as visa status, transport, income, digital access and unfamiliar service systems.","Use translated and accessible information where available."],
    remember:["CALD is a broad service term, not a complete description of a person’s identity.","Do not assume family members share the same views, language proficiency or safety.","Avoid using relatives or children as interpreters for sensitive or complex matters."],
    related:["Working with Interpreters","Cultural Humility","Intersectionality","Refugee & Asylum Seeker Practice"],
    refs:[["Australian Government Department of Home Affairs, multicultural affairs","https://www.homeaffairs.gov.au/about-us/our-portfolios/multicultural-affairs"],["FECCA, resources and policy","https://fecca.org.au/"]]
  },
  "Working with Interpreters": {
    what:"A qualified interpreter supports accurate and confidential communication when a person is not comfortable using English or uses Auslan or another communication system. Interpreter use is part of equitable access and informed consent. It is different from asking a bilingual family member to translate.",
    practice:["Confirm the person’s preferred language, dialect, gender preference and any safety concerns.","Brief the interpreter on purpose, confidentiality and specialist terminology before the session.","Speak directly to the person in short, clear sentences and pause for interpretation.","Debrief with the interpreter about communication issues without discussing matters beyond their role."],
    remember:["Do not use children, alleged perpetrators or family members for sensitive discussions.","Allow extra time and check understanding throughout the conversation.","Document that an interpreter was used, including language and service details where required."],
    related:["CALD Practice","Informed Consent","Confidentiality","Inclusive Communication"],
    refs:[["Queensland Health, interpreter services","https://www.health.qld.gov.au/multicultural/interpreters"],["TIS National","https://www.tisnational.gov.au/"]]
  },
  "Refugee & Asylum Seeker Practice": {
    what:"Refugee and asylum seeker practice considers the effects of forced displacement, persecution, trauma, loss, uncertain legal status and settlement pressures. It also recognises resilience, family and community strengths, cultural identity and the person’s goals beyond their refugee experience.",
    practice:["Explain the service, confidentiality and any limits clearly, as Australian systems may be unfamiliar.","Use qualified interpreters and check whether the interpreter is acceptable to the person.","Coordinate with specialist settlement, legal, health and torture and trauma services where relevant.","Avoid repeatedly asking for traumatic details that are not necessary for the purpose of contact."],
    remember:["Do not assume all refugees have the same experiences or needs.","Visa and eligibility issues can be complex and require specialist legal advice.","Trauma informed practice should not reduce the person’s identity to trauma."],
    related:["CALD Practice","Trauma Informed Practice","Working with Interpreters","Human Rights"],
    refs:[["Refugee Council of Australia","https://www.refugeecouncil.org.au/"],["Queensland Program of Assistance to Survivors of Torture and Trauma","https://qpass.org.au/"]]
  },
  "LGBTQIA+ Affirmative Practice": {
    what:"Affirmative practice supports the dignity, identity, relationships and self determination of lesbian, gay, bisexual, transgender, queer, intersex, asexual and other sexuality and gender diverse people. It recognises that distress may be linked to stigma, discrimination, rejection or unsafe systems rather than identity itself.",
    practice:["Use the person’s stated name, pronouns and identity language.","Ask inclusive questions about relationships, family and supports without assuming gender or sexuality.","Consider privacy and the risks of disclosing identity to family, services or records.","Challenge discriminatory language and support access to affirming services."],
    remember:["Do not treat identity as a problem to assess or change.","Avoid asking unnecessary questions about bodies, sex or transition.","Intersectionality matters. Experiences differ across culture, disability, age, location and other identities."],
    related:["Human Rights","Intersectionality","Anti Oppressive Practice","Inclusive Communication"],
    refs:[["Australian Human Rights Commission, LGBTIQ+ rights","https://humanrights.gov.au/our-work/lgbti"],["Queensland Human Rights Commission","https://www.qhrc.qld.gov.au/"]]
  },
  "Disability Inclusive Practice": {
    what:"Disability inclusive practice removes physical, communication, attitudinal and organisational barriers so people with disability can participate on an equal basis. It is guided by rights, accessibility, choice and control rather than assumptions that disability automatically means dependence or incapacity.",
    practice:["Ask the person what access or communication adjustments would help.","Provide information in accessible formats and allow additional time where needed.","Speak directly to the person, including when supporters are present.","Identify service barriers and advocate for reasonable adjustments."],
    remember:["Do not assume incapacity from diagnosis, communication style or support needs.","Support people to make decisions rather than defaulting to substitute decision makers.","Accessibility should be planned from the beginning, not added only after a problem occurs."],
    related:["Supported Decision Making","Social Model of Disability","Inclusive Communication","Human Rights"],
    refs:[["Australian Human Rights Commission, disability rights","https://humanrights.gov.au/our-work/disability-rights"],["NDIS Quality and Safeguards Commission","https://www.ndiscommission.gov.au/"]]
  },
  "Neurodiversity Affirming Practice": {
    what:"Neurodiversity affirming practice respects differences in thinking, communication, sensory processing and behaviour as part of human diversity. It focuses on reducing barriers and supporting autonomy rather than expecting people to appear or communicate in a neurotypical way.",
    practice:["Ask about preferred communication, sensory needs, routines and processing time.","Use clear and concrete language without infantilising the person.","Offer written information, breaks or quieter spaces where helpful.","Interpret behaviour within context rather than assuming resistance or lack of engagement."],
    remember:["Do not require eye contact or a particular communication style as evidence of engagement.","Avoid functioning labels that hide individual strengths and support needs.","Respect self identification and the person’s own language for their neurotype."],
    related:["Disability Inclusive Practice","Inclusive Communication","Person Centred Practice","Supported Decision Making"],
    refs:[["Australian Human Rights Commission, disability rights","https://humanrights.gov.au/our-work/disability-rights"],["Reframing Autism, neurodiversity affirming resources","https://reframingautism.org.au/"]]
  },
  "Intersectionality": {
    what:"Intersectionality is a way of understanding how identities and social structures overlap to shape a person’s experiences of power, privilege, discrimination and access. Gender, culture, race, disability, class, sexuality, age and location do not operate separately, and the same service response may affect people differently.",
    practice:["Explore how several parts of the person’s identity and circumstances shape the issue.","Notice which service rules create additional barriers for particular groups.","Avoid treating one identity as the full explanation for a person’s experience.","Use advocacy and referral pathways that respond to the person’s combined needs."],
    remember:["Intersectionality is about structures and power, not simply listing identities.","Let the person describe which identities and experiences are most relevant.","Consider both disadvantage and sources of strength, connection and belonging."],
    related:["Anti Oppressive Practice","Feminist Social Work","Cultural Humility","Domestic and Family Violence"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["Australian Human Rights Commission","https://humanrights.gov.au/"]]
  },
  "Anti Racist Practice": {
    what:"Anti racist practice actively identifies and challenges racism in interpersonal interactions, organisational processes and wider systems. It goes beyond being personally non racist. Social workers examine how race and whiteness shape power, access, assessment and decision making, and take action to reduce inequity.",
    practice:["Challenge racist comments, stereotypes or unequal treatment when they occur.","Review whether eligibility, documentation or communication processes create racial barriers.","Use supervision to examine how bias may influence assessment and professional judgement.","Support culturally specific and community controlled services rather than assuming mainstream services are always appropriate."],
    remember:["Silence can maintain harm even when the worker disagrees internally.","Do not place responsibility for addressing racism on the person experiencing it.","Anti racist practice requires ongoing learning, accountability and organisational change."],
    related:["Cultural Safety","Cultural Humility","Anti Oppressive Practice","Aboriginal & Torres Strait Islander Practice"],
    refs:[["Australian Human Rights Commission, race discrimination","https://humanrights.gov.au/our-work/race-discrimination"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Feminist Social Work": {
    what:"Feminist social work examines how gender, power and structural inequality shape personal experiences and service responses. It recognises that issues such as violence, poverty, caring responsibilities and exclusion are not only individual problems. Practice centres lived experience, challenges victim blaming and supports safety, choice and collective change.",
    practice:["Explore how gendered expectations and unequal power influence the situation.","Use language that locates responsibility for violence with the person using it.","Support the person’s own definition of safety and avoid prescribing a single pathway.","Connect individual advocacy with broader service or policy barriers."],
    remember:["Feminist practice must be intersectional and inclusive of diverse genders and experiences.","Do not assume all women experience power or disadvantage in the same way.","Safety, autonomy and structural context should be considered together."],
    related:["Domestic and Family Violence","Intersectionality","Anti Oppressive Practice","Advocacy"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["ANROWS","https://www.anrows.org.au/"]]
  },
  "Anti Oppressive Practice": {
    what:"Anti oppressive practice examines how power, privilege and structural inequality influence people’s lives and their contact with services. It aims to reduce harm caused by discrimination, exclusion and professional authority while supporting rights, participation and access to resources.",
    practice:["Make professional power and service limits transparent.","Include the person in decisions and recognise their knowledge of their own life.","Identify whether policies or eligibility rules create unfair barriers.","Use advocacy when individual difficulties are produced or intensified by systems."],
    remember:["Good intentions do not remove the power attached to professional roles.","Avoid speaking for people when they can be supported to speak for themselves.","Reflection should lead to practical changes, not only awareness."],
    related:["Intersectionality","Human Rights","Cultural Safety","Advocacy"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },

  "Child and Family Practice": {
    what:"Child and family practice supports children’s safety, wellbeing and development while recognising that children live within families, communities and wider systems. Social workers balance the child’s voice and best interests with respectful work alongside parents, carers and kin. Practice considers strengths, risk, trauma, culture, poverty, disability and service barriers rather than reducing concerns to parenting behaviour alone.",
    practice:["Speak with children in ways suited to their age, communication and development.","Explore safety, relationships, routines, strengths and practical pressures affecting the family.","Include parents and carers in planning while keeping the child’s experience visible.","Coordinate with schools, health, family support and statutory services when appropriate."],
    remember:["The child’s safety and lived experience must not disappear inside adult accounts.","Poverty, housing stress and limited services can affect family functioning without being neglect in themselves.","Use supervision when family needs, rights and statutory responsibilities are in tension."],
    related:["Child Centred Practice","Family Centred Practice","Permanency Planning","Mandatory Reporting (Queensland)"],
    refs:[["AASW, Child Protection and Wellbeing","https://www.aasw.asn.au/about-aasw/social-policy-and-advocacy/child-protection-and-wellbeing/"],["Queensland Government, Child Protection Guide","https://www.families.qld.gov.au/our-work/child-safety/about-child-protection/child-protection-guide"]]
  },
  "Child Centred Practice": {
    what:"Child centred practice keeps the child’s safety, rights, relationships, views and day to day experience at the centre of assessment and planning. It does not mean children make every decision. It means their perspective is actively sought, taken seriously and considered alongside age, development, culture, safety and legal responsibilities.",
    practice:["Explain your role and what will happen in language the child can understand.","Use conversation, play, drawing, observation or other communication methods suited to the child.","Record the child’s own words where relevant and distinguish these from adult interpretation.","Check how plans may affect the child’s relationships, routines, identity and sense of belonging."],
    remember:["Do not assume adults can fully represent the child’s experience.","Participation should be meaningful and safe, not tokenistic.","A child may communicate through behaviour, silence or changes in functioning as well as words."],
    related:["Child and Family Practice","Child Development in Practice","Permanency Planning","Trauma Informed Practice"],
    refs:[["Australian Human Rights Commission, Children’s Rights","https://humanrights.gov.au/our-work/childrens-rights"],["Queensland Government, Child Protection Guide","https://www.families.qld.gov.au/our-work/child-safety/about-child-protection/child-protection-guide"]]
  },
  "Family Centred Practice": {
    what:"Family centred practice treats families as partners with knowledge, strengths and important relationships. It aims to build shared understanding and practical solutions rather than positioning professionals as the only experts. In child and family work, collaboration must still occur within clear safety, rights and statutory boundaries.",
    practice:["Ask families what is working, what they are worried about and what support would be useful.","Include kin, culture and informal supports where this is safe and wanted.","Make expectations and professional concerns clear rather than using vague language.","Build plans around the family’s routines, resources and capacity to sustain change."],
    remember:["Collaboration does not mean avoiding difficult conversations about safety.","Do not confuse professional compliance with genuine change.","Consider whether service requirements are realistic for families facing poverty, distance or disability."],
    related:["Child Centred Practice","Strengths Based Practice","Systems & Ecological Theory","Service Coordination"],
    refs:[["AASW, Child Protection and Wellbeing","https://www.aasw.asn.au/about-aasw/social-policy-and-advocacy/child-protection-and-wellbeing/"],["Queensland Government, Family and Child Connect","https://www.families.qld.gov.au/our-work/child-safety/support-for-children-families/family-child-connect"]]
  },
  "Permanency Planning": {
    what:"Permanency planning aims to ensure children have stable, enduring care, relationships, identity and belonging. Permanency is broader than a legal order or placement address. It includes relational, cultural, physical and legal security, with family preservation or reunification considered where safe and appropriate.",
    practice:["Explore the child’s important relationships, culture, community and sense of home.","Support contact and connection plans that are safe, meaningful and realistic.","Review whether delays or repeated placement changes are affecting the child’s wellbeing.","Include children and families in planning and explain decisions clearly."],
    remember:["Stability without belonging is not complete permanency.","Sibling, kinship, cultural and community connections require active attention.","Avoid making promises about legal or placement outcomes that are outside your role."],
    related:["Child Centred Practice","Child and Family Practice","Attachment Theory","Cultural Safety"],
    refs:[["Queensland Government, Permanency and care planning","https://www.families.qld.gov.au/our-work/child-safety/about-child-protection"],["AASW, Child Protection and Wellbeing","https://www.aasw.asn.au/about-aasw/social-policy-and-advocacy/child-protection-and-wellbeing/"]]
  },
  "Child Development in Practice": {
    what:"Child development knowledge helps social workers understand changes in communication, attachment, learning, emotional regulation and independence across childhood and adolescence. Development is not a rigid checklist. It is shaped by relationships, trauma, disability, neurodiversity, culture, health and opportunity.",
    practice:["Adapt questions and explanations to the child’s communication and developmental level.","Consider whether behaviour reflects stress, unmet needs, trauma, sensory differences or developmental capacity.","Gather information across home, school, health and relationships rather than relying on one setting.","Notice both strengths and changes from the child’s usual functioning."],
    remember:["Developmental expectations should guide curiosity, not label children as failing.","Avoid interpreting trauma responses as deliberate noncompliance.","Seek specialist advice where developmental or health concerns are outside your scope."],
    related:["Child Centred Practice","Attachment Theory","Trauma Informed Practice","Neurodiversity Affirming Practice"],
    refs:[["Australian Institute of Family Studies, Child development","https://aifs.gov.au/resources/practice-guides"],["Queensland Health, Child and youth health","https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/clinical-staff/child-health"]]
  },
  "Mandatory Reporting (Queensland)": {
    what:"Mandatory reporting refers to legal duties placed on specified professionals to report certain reasonable suspicions that a child is in need of protection. In Queensland, the exact duty depends on the reporter’s role and the Child Protection Act 1999. Anyone can report concerns, even when they are not a mandatory reporter.",
    practice:["Follow your organisation’s reporting procedure and consult a supervisor promptly.","Record the information that formed the concern, including observations, disclosures and context.","Use the Queensland Child Protection Guide where appropriate to support decision making.","Explain limits of confidentiality before sensitive conversations where possible."],
    remember:["Do not investigate or repeatedly question a child after a disclosure.","A reasonable suspicion does not require proof.","Check current legislation and policy because obligations differ by role and setting."],
    related:["Child and Family Practice","Confidentiality","Documentation","Risk & Safety Planning"],
    refs:[["Queensland Government, Mandatory Reporting","https://www.families.qld.gov.au/our-work/child-safety/about-child-protection/mandatory-reporting"],["Queensland Government, Reporting and Referring Concerns","https://www.families.qld.gov.au/our-work/child-safety/about-child-protection/reporting-referring-concerns"]]
  },
  "Homelessness and Housing": {
    what:"Housing and homelessness practice recognises safe, stable and affordable housing as a foundation for health, safety and participation. Homelessness includes rough sleeping, temporary accommodation, couch surfing and insecure or unsafe housing. Social work responses combine practical assistance with advocacy about structural barriers such as poverty, discrimination and limited housing supply.",
    practice:["Clarify immediate safety, accommodation options, tenancy risks and practical needs.","Support applications, evidence gathering, referrals and follow up rather than only providing contact details.","Coordinate with housing, income support, health, DFV and community services.","Advocate when service rules or documentation requirements create avoidable barriers."],
    remember:["Housing crisis is not an individual failure.","Temporary accommodation may still be unsafe, inaccessible or unsustainable.","Warm referrals and follow up are often more useful than long service lists."],
    related:["Housing First","Tenancy Support","Service Coordination","Advocacy"],
    refs:[["AIHW, Homelessness and Homelessness Services","https://www.aihw.gov.au/reports-data/health-welfare-services/homelessness-services/overview"],["Queensland Government, Housing Help","https://www.qld.gov.au/housing/help"]]
  },
  "Housing First": {
    what:"Housing First is an approach that offers people rapid access to permanent housing without requiring them to first demonstrate treatment readiness, abstinence or compliance. Housing is treated as a foundation for recovery and participation, with flexible supports offered according to the person’s goals and needs.",
    practice:["Prioritise stable housing while continuing to offer voluntary health and social supports.","Separate tenancy expectations from participation in treatment programs.","Support choice about housing and services where options exist.","Coordinate practical, relational and clinical supports around housing stability."],
    remember:["Housing First is more than placing someone in accommodation. Ongoing support and housing supply matter.","Do not make abstinence a condition for deserving housing.","Choice can be limited by local housing availability, and this structural constraint should be named."],
    related:["Homelessness and Housing","Harm Minimisation","Person Centred Practice","Service Coordination"],
    refs:[["AIHW, Specialist Homelessness Services","https://www.aihw.gov.au/reports-data/health-welfare-services/homelessness-services/overview"],["Australian Housing and Urban Research Institute","https://www.ahuri.edu.au/"]]
  },
  "Tenancy Support": {
    what:"Tenancy support helps people establish and sustain housing by addressing practical, relational and systemic issues that may place a tenancy at risk. It can include understanding rights and responsibilities, communicating with housing providers, budgeting, property care, neighbour concerns and links to health or community supports.",
    practice:["Clarify the tenancy issue and the person’s priorities before contacting others.","Support the person to understand notices, deadlines and available review pathways.","Document agreements and follow up actions clearly.","Refer to specialist tenancy advice when legal interpretation is required."],
    remember:["Do not present legal advice outside your scope.","Gain consent before speaking with landlords or housing providers unless another lawful basis applies.","Consider disability, literacy, culture, DFV and financial hardship when planning support."],
    related:["Homelessness and Housing","Advocacy","Service Coordination","Confidentiality"],
    refs:[["Queensland Government, Renting","https://www.qld.gov.au/housing/renting"],["Residential Tenancies Authority Queensland","https://www.rta.qld.gov.au/"]]
  },
  "Service Coordination": {
    what:"Service coordination brings people, services and supports together around shared goals. Good coordination reduces repetition, conflicting plans and gaps between referrals. It should make systems easier for the person to navigate rather than creating more meetings, assessments or professionals to manage.",
    practice:["Clarify roles, consent, priorities and who will follow up each action.","Use warm handovers and confirm whether referrals were received.","Share only relevant information through lawful and agreed pathways.","Keep the person involved in decisions rather than planning around them."],
    remember:["Coordination is not the same as taking control away from the person.","Avoid duplicating assessments when existing information can be used appropriately.","Name service gaps and escalate systemic barriers through supervision or advocacy."],
    related:["Case Management","Advocacy","Confidentiality","Homelessness and Housing"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Australian Commission on Safety and Quality in Health Care, Comprehensive Care","https://www.safetyandquality.gov.au/standards/nsqhs-standards/comprehensive-care-standard"]]
  },
  "Alcohol and Other Drugs": {
    what:"Alcohol and other drug practice supports people whose substance use may affect health, relationships, safety or daily life. Social workers use non judgemental, person centred and harm minimisation approaches. Goals may include safer use, reduced use, abstinence, treatment, withdrawal support or addressing housing, trauma and social conditions connected with substance use.",
    practice:["Ask respectfully about substances, patterns, context, benefits, harms and the person’s goals.","Provide accurate harm reduction information within scope.","Screen for immediate risks such as overdose, severe withdrawal, unsafe mixing or suicidality.","Offer referral options and support access without making help conditional on abstinence."],
    remember:["Use can serve a coping, social or survival function even when it also causes harm.","Avoid stigmatising labels and moral language.","Withdrawal from alcohol and some drugs can be medically dangerous and requires clinical assessment."],
    related:["Harm Minimisation","Brief Interventions","Withdrawal Considerations","Stages of Change"],
    refs:[["Queensland Health, Adis","https://adis.health.qld.gov.au/"],["AIHW, Alcohol, Tobacco and Other Drugs in Australia","https://www.aihw.gov.au/reports/alcohol/alcohol-tobacco-other-drugs-australia"]]
  },
  "Harm Minimisation": {
    what:"Harm minimisation aims to reduce the health, social and legal harms associated with alcohol and other drug use. It includes demand reduction, supply reduction and harm reduction. In direct practice, it means working with the person’s current goals and offering realistic ways to increase safety, even when they are not ready or do not want to stop using.",
    practice:["Discuss safer use, overdose prevention, avoiding risky combinations and accessing sterile equipment where relevant.","Support practical needs such as housing, food, healthcare and connection.","Ask what changes feel achievable and meaningful to the person.","Keep the door open for future support rather than withdrawing help after a setback."],
    remember:["Harm minimisation is not approval of harmful use. It is a pragmatic public health approach.","Abstinence may be one goal, but it is not the only valid starting point.","Use current clinical guidance for substance specific advice."],
    related:["Alcohol and Other Drugs","Motivational Interviewing","Housing First","Relapse Prevention"],
    refs:[["Queensland Health, Alcohol and Other Drugs Plan","https://www.health.qld.gov.au/public-health/topics/mental-health-alcohol-and-other-drugs/what-we-do-at-queensland-health/strategic-plans-and-priorities"],["Adis Queensland","https://adis.health.qld.gov.au/"]]
  },
  "Brief Interventions": {
    what:"A brief intervention is a short, purposeful conversation that helps a person consider their substance use, health or behaviour and identify a possible next step. It may occur in one contact or across a small number of sessions. The approach is collaborative and often draws on motivational interviewing rather than advice giving or confrontation.",
    practice:["Ask permission to discuss the issue and explore what the person already knows.","Offer clear, relevant feedback without exaggeration or judgement.","Elicit the person’s own reasons for change and confidence in taking a step.","Agree on one realistic action, resource or follow up."],
    remember:["Keep the conversation proportionate to your role and the person’s readiness.","Avoid arguing for change, which can increase resistance.","Immediate safety or withdrawal concerns require escalation beyond a brief intervention."],
    related:["Motivational Interviewing","Stages of Change","Alcohol and Other Drugs","Harm Minimisation"],
    refs:[["Queensland Health, Adis Treatment Options","https://adis.health.qld.gov.au/information/treatment-options"],["Australian Government Department of Health, Alcohol and Other Drugs","https://www.health.gov.au/topics/alcohol"]]
  },
  "Stages of Change": {
    what:"The Stages of Change model describes change as a process that may move through not considering change, considering change, preparing, taking action and maintaining change. People may move forward, pause or return to earlier stages. The model can help workers match support to readiness, but it should not be used as a fixed label.",
    practice:["Explore what the person likes and dislikes about the current situation.","Match the conversation to readiness rather than pushing action too early.","Support small steps and recognise previous attempts as useful learning.","Review readiness over time because it may change with circumstances."],
    remember:["Change is rarely linear.","Do not use a stage to deny support or judge motivation.","Structural barriers may prevent action even when motivation is strong."],
    related:["Motivational Interviewing","Brief Interventions","Relapse Prevention","Strengths Based Practice"],
    refs:[["Queensland Health, Adis Treatment Options","https://adis.health.qld.gov.au/information/treatment-options"],["Australian Government Department of Health, Alcohol","https://www.health.gov.au/topics/alcohol"]]
  },
  "Withdrawal Considerations": {
    what:"Withdrawal occurs when a person reduces or stops a substance after their body has adapted to regular use. Symptoms vary by substance, amount, pattern of use, health and previous withdrawal history. Alcohol, benzodiazepine and some other withdrawals can involve serious medical risk, so social workers should recognise warning signs and seek clinical assessment rather than manage withdrawal independently.",
    practice:["Ask what substances are used, how often, the last use and any previous withdrawal complications.","Escalate confusion, seizures, hallucinations, severe agitation, significant physical symptoms or rapidly worsening distress.","Support referral to Queensland Health, hospital, general practice or specialist AOD services as appropriate.","Document observations, advice sought and actions taken."],
    remember:["Never advise abrupt cessation where medically risky withdrawal may occur.","Withdrawal planning is a clinical task and requires appropriate expertise.","Emergency symptoms require urgent medical response."],
    related:["Alcohol and Other Drugs","Risk & Safety Planning","Service Coordination","Harm Minimisation"],
    refs:[["Queensland Health, Alcohol and Drug Withdrawal Clinical Practice Guidelines","https://adis.health.qld.gov.au/sites/default/files/resource/file/qh_detox_guide.pdf"],["Queensland Health, Hospital Alcohol and Drug Service","https://metronorth.health.qld.gov.au/rbwh/healthcare-services/hospital-alcohol-drug"]]
  },
  "Relapse Prevention": {
    what:"Relapse prevention supports people to recognise situations, emotions and patterns that may increase the likelihood of returning to unwanted substance use. A return to use is treated as information and an opportunity to strengthen support, not as failure. Planning may include coping strategies, safer use, social support and rapid re engagement with services.",
    practice:["Explore triggers, early warning signs, high risk situations and what has helped before.","Develop specific actions and contacts for difficult periods.","Plan for overdose risk, particularly when tolerance may have reduced.","Review setbacks with curiosity and update the plan collaboratively."],
    remember:["Shame and service exclusion can increase risk after a return to use.","Recovery goals belong to the person.","Include practical factors such as housing, relationships, pain, trauma and isolation."],
    related:["Harm Minimisation","Stages of Change","Safety Planning","Strengths Based Practice"],
    refs:[["Queensland Health, Adis","https://adis.health.qld.gov.au/"],["Australian Government Department of Health, Alcohol and Other Drugs","https://www.health.gov.au/topics/alcohol"]]
  },
  "Disability Practice": {
    what:"Disability social work supports rights, participation, access, relationships and self determined goals. Practice looks beyond diagnosis to the interaction between the person and physical, communication, attitudinal and service barriers. Social workers may assist with advocacy, psychosocial assessment, family work, safeguarding, housing, health and NDIS navigation.",
    practice:["Ask what support, communication or access adjustments the person prefers.","Focus on the person’s goals, relationships and environment rather than only impairment.","Support informed choice and decision making before considering substitute arrangements.","Identify barriers across services and advocate for reasonable adjustments."],
    remember:["Disability does not equal incapacity.","Speak directly to the person, including when supporters are present.","The NDIS does not replace mainstream health, housing, education or justice responsibilities."],
    related:["Social Model of Disability","NDIS Overview","Supported Decision Making","Disability Inclusive Practice"],
    refs:[["Australian Human Rights Commission, Disability Rights","https://humanrights.gov.au/our-work/disability-rights"],["NDIS Quality and Safeguards Commission","https://www.ndiscommission.gov.au/"]]
  },
  "Social Model of Disability": {
    what:"The social model of disability distinguishes impairment from the disabling barriers created by environments, attitudes and systems. It shifts attention from fixing the person to changing inaccessible buildings, communication, policies and social expectations. The model supports rights based and inclusive practice while still recognising that people may want health or therapeutic support.",
    practice:["Ask what barriers make participation harder in this setting.","Advocate for accessible information, flexible processes and reasonable adjustments.","Avoid defining goals only around reducing impairment.","Include lived expertise when designing services or plans."],
    remember:["Do not minimise pain, fatigue or individual support needs.","Accessibility is a shared organisational responsibility.","Use language preferred by the person rather than imposing identity first or person first wording."],
    related:["Disability Practice","Disability Inclusive Practice","Human Rights","Anti Oppressive Practice"],
    refs:[["Australian Human Rights Commission, Disability Rights","https://humanrights.gov.au/our-work/disability-rights"],["Australian Government, Disability Gateway","https://www.disabilitygateway.gov.au/"]]
  },
  "NDIS Overview": {
    what:"The National Disability Insurance Scheme funds eligible disability related supports intended to help participants pursue goals, increase independence and participate in community life. The NDIA determines access and plans, while participants may choose providers and how some funding is managed. The NDIS is not designed to replace ordinary health, housing, education or other mainstream services.",
    practice:["Clarify the person’s goals and functional support needs rather than focusing only on diagnosis.","Help organise evidence and prepare for planning or review conversations within your role.","Explain service boundaries and identify mainstream responsibilities.","Support the person to raise concerns or access advocacy when decisions are unclear."],
    remember:["Do not promise access, funding or particular supports.","Use current NDIA guidance because rules and processes can change.","Choice may be restricted by thin markets, location and provider availability."],
    related:["Disability Practice","Supported Decision Making","Service Coordination","Advocacy"],
    refs:[["NDIS, What are NDIS Supports","https://www.ndis.gov.au/participants/using-your-funding/understanding-your-ndis-funding/what-are-ndis-supports"],["NDIS Legislation","https://www.ndis.gov.au/governance/legislation"]]
  },
  "Capacity and Decision Making": {
    what:"Decision making capacity is the ability to understand, retain, use or weigh relevant information and communicate a decision. Capacity is specific to the particular decision and time. It should not be assumed absent because of disability, mental illness, age, communication differences or a decision others consider unwise.",
    practice:["Explain information in accessible language and check understanding.","Offer communication aids, trusted supporters, extra time or a quieter setting.","Identify the exact decision rather than making a global judgement about capacity.","Document support provided and seek legal or clinical advice when required."],
    remember:["Begin with a presumption of capacity unless law or evidence indicates otherwise.","An unwise decision is not automatically an incapable decision.","Use the least restrictive option and maximise supported decision making."],
    related:["Supported Decision Making","Guardianship & Decision Making","Informed Consent","Dignity of Risk"],
    refs:[["Queensland Government, Capacity Guidelines","https://www.publications.qld.gov.au/dataset/capacity-guidelines"],["NDIS Supported Decision Making Policy","https://www.ndis.gov.au/policies-rules-and-legal/policy/supported-decision-making-policy"]]
  },
  "People with Disability": {
    what:"People with disability are diverse in identity, communication, culture, goals and support needs. Good practice is rights based and responsive to the individual rather than driven by diagnosis or assumptions. Social workers consider accessibility, relationships, choice, safeguarding, poverty and the barriers created by services and communities.",
    practice:["Ask the person how they prefer to communicate and what adjustments are useful.","Include the person directly in meetings and decisions.","Explore both formal supports and valued relationships.","Notice whether risk responses are unnecessarily restrictive."],
    remember:["Do not speak only to family members or support workers.","Support needs can vary across settings and over time.","Respect dignity of risk while responding proportionately to actual harm."],
    related:["Disability Practice","Social Model of Disability","Supported Decision Making","Disability Inclusive Practice"],
    refs:[["Australian Human Rights Commission, Disability Rights","https://humanrights.gov.au/our-work/disability-rights"],["Disability Gateway","https://www.disabilitygateway.gov.au/"]]
  },
  "People experiencing homelessness": {
    what:"People experiencing homelessness may be sleeping rough, staying temporarily with others, living in crisis accommodation or remaining in unsafe and insecure housing. Practice should recognise the effects of poverty, trauma, discrimination and service exclusion while avoiding assumptions that homelessness reflects poor motivation or personal failure.",
    practice:["Prioritise immediate safety, shelter, health, identification and income needs.","Ask what has made previous housing or services difficult to sustain.","Use warm referrals and follow up where possible.","Advocate for access when documentation, communication or behavioural expectations create barriers."],
    remember:["Repeated storytelling can be exhausting and retraumatising.","Housing options may be unsafe or inappropriate even when technically available.","Maintain dignity and choice during crisis driven work."],
    related:["Homelessness and Housing","Housing First","Tenancy Support","Trauma Informed Practice"],
    refs:[["AIHW, Homelessness Services","https://www.aihw.gov.au/reports-data/health-welfare-services/homelessness-services/overview"],["Queensland Government, Housing Help","https://www.qld.gov.au/housing/help"]]
  },
  "People who use alcohol and other drugs": {
    what:"People who use alcohol and other drugs may seek help for many reasons, including health, relationships, housing, legal concerns or a wish to change use. Practice should be non judgemental and recognise both harms and the functions substance use may serve. The person’s goals and safety remain central.",
    practice:["Use neutral language and ask permission before discussing use.","Explore context, patterns, benefits, harms and readiness for change.","Provide options ranging from harm reduction to treatment and recovery support.","Consider co occurring mental health, trauma, pain, housing and family issues."],
    remember:["Avoid labels such as addict or drug seeker unless quoting the person’s own preferred language.","Do not withdraw support after relapse or continued use.","Seek clinical advice for overdose or withdrawal concerns."],
    related:["Alcohol and Other Drugs","Harm Minimisation","Motivational Interviewing","Withdrawal Considerations"],
    refs:[["Queensland Health, Adis","https://adis.health.qld.gov.au/"],["AIHW, Alcohol, Tobacco and Other Drugs","https://www.aihw.gov.au/reports/alcohol/alcohol-tobacco-other-drugs-australia"]]
  },
  "Older People": {
    what:"Social work with older people supports rights, autonomy, relationships, safety, health, housing, care and participation across later life. Older people are diverse, and ageing should not be treated as automatic decline or dependency. Practice considers the person’s own goals alongside family, community, cultural and service contexts.",
    practice:["Ask what matters to the person and how they want to live.","Support access to aged care, health, housing, income, transport and social connection.","Notice ageism and avoid making assumptions about capacity or dependence.","Include chosen family, carers and supporters with the person’s consent."],
    remember:["Presume capacity unless there is evidence otherwise.","Use supported decision making before considering substitute decisions.","Balance safety concerns with autonomy, dignity and least restrictive practice."],
    related:["Person Centred Ageing","Dementia Aware Practice","Elder Abuse","Supported Decision Making"],
    refs:[["Australian Government Department of Health, Disability and Ageing, About aged care","https://www.health.gov.au/topics/aged-care/about-aged-care"],["AIHW, Older Australians","https://www.aihw.gov.au/reports/older-people/older-australians"]]
  },
  "Person Centred Ageing": {
    what:"Person centred ageing keeps the older person’s identity, history, preferences, relationships and rights at the centre of support. It recognises that services should fit the person rather than expecting the person to fit routines, risk systems or assumptions about ageing.",
    practice:["Ask about daily routines, cultural needs, relationships and valued roles.","Offer genuine choices and explain limits clearly.","Use the person’s preferred communication style and pace.","Document what matters to the person, not only care tasks or risks."],
    remember:["Do not confuse family preference with the older person’s preference.","Choice still matters when a person needs substantial support.","Risk management should be proportionate and as unrestrictive as possible."],
    related:["Older People","Supported Decision Making","Healthy Ageing","Dementia Aware Practice"],
    refs:[["Australian Government, Aged Care Act Statement of Principles","https://www.health.gov.au/resources/publications/guide-to-aged-care-law/chapter-1-introduction/statement-of-principles"],["Australian Government, Rights based Aged Care Act","https://www.health.gov.au/our-work/aged-care-act/about"]]
  },
  "Dementia Aware Practice": {
    what:"Dementia aware practice recognises that dementia can affect memory, communication, orientation and decision making in different ways. The person remains more than the diagnosis. Good practice adapts communication, supports remaining abilities and explores unmet needs rather than automatically treating distress as difficult behaviour.",
    practice:["Use short, clear sentences and allow extra processing time.","Check pain, fear, environment, routine and communication needs when distress increases.","Use familiar information, visual prompts and trusted supporters where helpful.","Include the person directly even when others provide additional information."],
    remember:["Capacity is decision specific and can fluctuate.","Avoid infantilising language or speaking over the person.","Restrictive practices should only be considered as a last resort and within law and policy."],
    related:["Person Centred Ageing","Capacity and Decision Making","Supported Decision Making","Professional Boundaries"],
    refs:[["Australian Government, Working with dementia in aged care","https://www.health.gov.au/topics/aged-care/providing-aged-care-services/training-and-guidance/working-with-dementia"],["AIHW, Dementia in Australia","https://www.aihw.gov.au/reports/dementia/dementia-in-aus/contents/about"]]
  },
  "Elder Abuse": {
    what:"Elder abuse is a single or repeated act, or a failure to act, within a relationship of trust that causes harm or distress to an older person. It may be psychological, financial, physical, sexual or social, and can include neglect. Responses must centre the older person’s safety, wishes and legal rights.",
    practice:["Speak privately with the older person where safe and possible.","Ask clear, respectful questions about control, money, care, fear and unwanted contact.","Document the person’s words, observed facts, risks and actions.","Follow organisational procedures and seek specialist, legal or safeguarding advice."],
    remember:["Do not assume family involvement is automatically safe.","Avoid removing choice in the name of protection.","Consider immediate danger, capacity, coercion, dependence and access to communication."],
    related:["Older People","Risk & Safety Planning","Capacity and Decision Making","Advocacy"],
    refs:[["AIHW, Older people and family, domestic and sexual violence","https://www.aihw.gov.au/family-domestic-and-sexual-violence/population-groups/older-people"],["Queensland Government, Elder abuse support","https://www.qld.gov.au/seniors/safety-protection/discrimination-abuse/elder-abuse"]]
  },
  "Healthy Ageing": {
    what:"Healthy ageing is about supporting wellbeing, participation, connection, purpose and functional ability as people grow older. It is not limited to preventing illness. Social conditions such as housing, income, transport, culture, relationships and access to care strongly influence how people experience later life.",
    practice:["Explore social connection, meaningful activity and community participation.","Support access to health care, mobility aids, transport and suitable housing.","Recognise grief and change while also noticing resilience and contribution.","Challenge ageist service barriers and assumptions."],
    remember:["Older age is not a diagnosis.","Wellbeing is defined by the person and may include cultural, spiritual and family roles.","Prevention and early support can be as important as crisis responses."],
    related:["Older People","Person Centred Ageing","Social Inclusion","Community Led Practice"],
    refs:[["AIHW, Older Australians","https://www.aihw.gov.au/reports/older-people/older-australians"],["Australian Government, About aged care","https://www.health.gov.au/topics/aged-care/about-aged-care"]]
  },
  "Justice Involved People": {
    what:"Justice involved people may be engaging with police, courts, corrections, youth justice or community supervision. Social work practice considers rights, trauma, disability, culture, housing, substance use, family relationships and the structural conditions that shape offending and reintegration.",
    practice:["Explain your role, confidentiality and information sharing limits clearly.","Use respectful language and avoid defining the person by an offence.","Identify practical barriers involving housing, identification, income, treatment and community connection.","Coordinate with legal and justice services while maintaining professional independence."],
    remember:["Do not assume risk from justice involvement alone.","Consider over representation of First Nations peoples and people with disability.","Seek supervision where legal duties, safety and advocacy appear to conflict."],
    related:["Trauma Informed Justice Practice","Rehabilitation and Reintegration","Human Rights in Justice","Anti Oppressive Practice"],
    refs:[["Queensland Government, Department of Justice","https://www.justice.qld.gov.au/"],["Australian Human Rights Commission, Human rights and criminal justice","https://humanrights.gov.au/our-work/rights-and-freedoms"]]
  },
  "Trauma Informed Justice Practice": {
    what:"Trauma informed justice practice recognises that many people in justice systems have experienced trauma, violence, loss, racism, disability or service exclusion. It aims to improve safety, predictability, choice and participation without excusing harm or avoiding accountability.",
    practice:["Explain processes, roles and likely next steps in plain language.","Offer realistic choices and support people to prepare for interviews or hearings.","Notice signs of distress and adapt pace, environment and communication.","Separate accountability for behaviour from shame about identity."],
    remember:["Do not require trauma disclosure to provide trauma informed support.","Justice environments can reproduce fear and powerlessness.","Safety includes cultural and emotional safety as well as physical safety."],
    related:["Trauma Informed Practice","Justice Involved People","Human Rights in Justice","Cultural Safety"],
    refs:[["Australian Institute of Criminology, trauma informed practice resources","https://www.aic.gov.au/"],["Queensland Human Rights Commission","https://www.qhrc.qld.gov.au/"]]
  },
  "Diversion": {
    what:"Diversion uses suitable alternatives to formal court or custody responses. It may connect a person with assessment, treatment, restorative processes, community supports or culturally appropriate programs. The purpose is to address underlying needs and reduce unnecessary justice involvement where lawful and appropriate.",
    practice:["Identify eligibility early and clarify the person’s understanding and consent.","Provide information about health, disability, housing, cultural and community supports.","Advocate for responses matched to the person’s needs and level of risk.","Document referrals, participation requirements and barriers clearly."],
    remember:["Diversion is not appropriate in every matter and depends on legislation and local programs.","Participation should be informed and not presented as consequence free.","Do not promise legal outcomes; refer legal questions to qualified practitioners."],
    related:["Justice Involved People","Rehabilitation and Reintegration","Advocacy","Service Coordination"],
    refs:[["Queensland Courts, court programs and services","https://www.courts.qld.gov.au/services/court-programs"],["Queensland Government, Youth Justice","https://www.qld.gov.au/law/sentencing-prisons-and-probation/youth-justice"]]
  },
  "Rehabilitation and Reintegration": {
    what:"Rehabilitation and reintegration support people to build safer lives and reconnect with community after justice involvement. Practice may address housing, health, identity, relationships, education, employment, substance use and practical barriers created by stigma or criminal records.",
    practice:["Begin planning for housing, income, medication and identification before release where possible.","Build goals around the person’s strengths and reasons for change.","Use warm referrals and follow up across service transitions.","Support connection with culture, family and community where safe and wanted."],
    remember:["Reintegration is shaped by structural access, not motivation alone.","Setbacks do not erase progress.","Balance accountability with dignity, hope and realistic opportunity."],
    related:["Justice Involved People","Housing First","Harm Minimisation","Strengths Based Practice"],
    refs:[["Queensland Corrective Services, rehabilitation and reintegration","https://www.qld.gov.au/law/sentencing-prisons-and-probation/prisons-and-detention-centres/rehabilitation"],["Australian Institute of Criminology","https://www.aic.gov.au/"]]
  },
  "Justice Advocacy": {
    what:"Justice advocacy supports fair treatment, access to information, reasonable adjustments and participation within legal and justice systems. Social workers may identify barriers, help people communicate their needs, coordinate supports and challenge practices that undermine rights.",
    practice:["Clarify what outcome the person wants and what is within your role.","Request interpreters, communication supports or disability adjustments.","Record barriers and attempts to resolve them.","Refer legal advice questions to a lawyer or legal service."],
    remember:["Advocacy is not the same as providing legal advice.","Be transparent about organisational limits and information sharing.","Use supervision when advocacy may create role conflict."],
    related:["Advocacy","Human Rights in Justice","Justice Involved People","Disability Inclusive Practice"],
    refs:[["Queensland Human Rights Commission","https://www.qhrc.qld.gov.au/"],["Legal Aid Queensland","https://www.legalaid.qld.gov.au/"]]
  },
  "Human Rights in Justice": {
    what:"A human rights approach asks whether justice decisions respect dignity, equality, liberty, cultural rights, privacy and humane treatment. In Queensland, public entities must act compatibly with the Human Rights Act 2019 and properly consider relevant rights when making decisions.",
    practice:["Identify which rights may be affected by a decision or condition.","Ask whether limits are lawful, necessary and proportionate.","Support the person to understand processes and raise concerns.","Document how rights were considered alongside safety and legal duties."],
    remember:["Human rights can be limited, but not ignored.","Rights based practice includes accountability as well as advocacy.","Seek legal or specialist advice when interpreting legislation."],
    related:["Human Rights Act 2019 (Qld)","Justice Advocacy","Supported Decision Making","Anti Oppressive Practice"],
    refs:[["Queensland Human Rights Commission, Human Rights Act","https://www.qhrc.qld.gov.au/your-rights/human-rights-law"],["Queensland legislation, Human Rights Act 2019","https://www.legislation.qld.gov.au/view/html/inforce/current/act-2019-005"]]
  },
  "Participation": {
    what:"Participation means people have genuine opportunities to influence decisions, services and community life. It goes beyond attendance or consultation. Meaningful participation includes accessible information, enough time, shared power and visible influence over outcomes.",
    practice:["Ask who is missing from the conversation and why.","Offer different ways to contribute, including individual, group, written and supported options.","Explain how feedback will be used and report back on decisions.","Remove barriers involving timing, transport, language, disability and cost."],
    remember:["Participation without influence can become tokenistic.","Do not expect one person to represent an entire community.","Pay attention to who sets the agenda and controls resources."],
    related:["Community Led Practice","Empowerment","Social Inclusion","Collective Advocacy"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Australian Human Rights Commission, participation and inclusion","https://humanrights.gov.au/"]]
  },
  "Capacity Building": {
    what:"Community capacity building strengthens the knowledge, relationships, leadership, resources and confidence that communities use to act on their own priorities. The worker supports rather than takes over, with the aim of increasing sustainable local capability and influence.",
    practice:["Start with existing skills, networks and informal leaders.","Support shared learning, governance and access to resources.","Plan for community ownership rather than dependence on one worker or service.","Recognise cultural authority and local decision making."],
    remember:["Do not define communities only by needs or deficits.","Capacity building takes time and requires trust.","Be transparent about funding, power and organisational agendas."],
    related:["Asset Based Community Development","Community Led Practice","Participation","Social Capital"],
    refs:[["Australian Institute of Family Studies, community development resources","https://aifs.gov.au/resources/practice-guides"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Social Capital": {
    what:"Social capital describes the relationships, trust, networks and shared norms that help people access support and act together. It can strengthen belonging and collective capacity, but networks can also exclude people or reinforce unequal power.",
    practice:["Map formal and informal relationships within a community.","Create opportunities for connection and mutual support.","Notice who has access to influential networks and who is excluded.","Support bridging relationships between groups and services."],
    remember:["More connection is not always safer or more inclusive.","Respect privacy and do not force participation.","Consider both strengths and power within community networks."],
    related:["Participation","Social Inclusion","Capacity Building","Community Led Practice"],
    refs:[["AIHW, social support and wellbeing","https://www.aihw.gov.au/reports/australias-welfare/social-support"],["Australian Institute of Family Studies","https://aifs.gov.au/"]]
  },
  "Community Led Practice": {
    what:"Community led practice places local knowledge, priorities and decision making at the centre. Workers contribute skills, resources and connections while remaining accountable to the community rather than imposing an external solution.",
    practice:["Begin by listening to how the community defines the issue.","Work with existing leaders, groups and cultural governance structures.","Share decisions about goals, methods, resources and evaluation.","Plan how ownership can remain with the community after the project ends."],
    remember:["A community is not one voice or a single interest group.","Avoid rushing consultation to meet organisational timelines.","Be clear about what decisions can genuinely be shared."],
    related:["Participation","Asset Based Community Development","Capacity Building","Cultural Safety"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["Australian Institute of Family Studies, community resources","https://aifs.gov.au/"]]
  },
  "Collective Advocacy": {
    what:"Collective advocacy brings people together to challenge shared barriers, influence policy or improve services. It centres lived experience and collective voice rather than relying only on individual casework responses.",
    practice:["Support people to identify a shared issue and preferred outcome.","Gather evidence while protecting privacy and consent.","Use meetings, submissions, campaigns or partnerships strategically.","Report progress back to participants and review who holds decision making power."],
    remember:["Let affected people shape the message and strategy.","Do not expose individuals to unwanted risk or identification.","Consider whether the organisation’s interests differ from the community’s interests."],
    related:["Advocacy","Participation","Policy Analysis","Empowerment"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["Australian Human Rights Commission","https://humanrights.gov.au/"]]
  },
  "Asset Based Community Development": {
    what:"Asset Based Community Development begins with the strengths already present in a community, including people, relationships, associations, local knowledge, culture, places and resources. It does not deny disadvantage. It avoids making deficits the only story and supports locally driven action.",
    practice:["Map skills, groups, networks, spaces and existing community activity.","Ask what people care about enough to act on together.","Connect assets that are currently isolated from one another.","Use external services to support local action rather than replace it."],
    remember:["Do not romanticise community strength or ignore structural inequality.","Assets are defined with the community, not for it.","Recognise unpaid labour and avoid over relying on the same community members."],
    related:["Capacity Building","Community Led Practice","Participation","Social Capital"],
    refs:[["Australian Institute of Family Studies, community development practice resources","https://aifs.gov.au/resources/practice-guides"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Empowerment": {
    what:"Empowerment in social work involves increasing a person’s or community’s influence, access, confidence and control over decisions that affect them. It is not something a worker gives to another person. Practice focuses on removing barriers and supporting people to use their own knowledge and power.",
    practice:["Share information in accessible ways so people can make informed choices.","Support people to identify strengths, rights and available pathways.","Create opportunities for leadership and decision making.","Challenge organisational or structural barriers where possible."],
    remember:["Avoid speaking for people when they can speak for themselves.","Choice may be constrained by poverty, risk, law or service availability.","Empowerment language should not shift responsibility for structural problems onto individuals."],
    related:["Participation","Advocacy","Supported Decision Making","Anti Oppressive Practice"],
    refs:[["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"],["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"]]
  },
  "Social Inclusion": {
    what:"Social inclusion means people can participate, belong and access opportunities, relationships and services without discrimination or avoidable barriers. It involves more than being physically present. Inclusion requires meaningful recognition, accessibility and influence.",
    practice:["Ask what helps or prevents the person from participating.","Address barriers involving cost, transport, communication, stigma and accessibility.","Support ordinary community roles rather than only service based activity.","Challenge exclusionary practices and language."],
    remember:["Inclusion should be defined by the person, not assumed by the service.","Being invited does not guarantee a person feels safe or belongs.","Consider intersectional barriers rather than treating identity factors separately."],
    related:["Participation","Disability Inclusive Practice","Anti Oppressive Practice","Healthy Ageing"],
    refs:[["Australian Human Rights Commission","https://humanrights.gov.au/"],["AIHW, social support","https://www.aihw.gov.au/reports/australias-welfare/social-support"]]
  },
  "Evidence Informed Practice": {
    what:"Evidence informed practice brings together the best available research, professional judgement, the person’s lived experience and the local practice context. Research informs decisions, but it does not replace ethical reasoning, cultural responsiveness or individual choice.",
    practice:["Turn uncertainty into a clear practice question.","Use peer reviewed research and authoritative Australian guidance.","Discuss whether findings fit the person, community and service context.","Record how evidence, preferences and professional judgement informed the decision."],
    remember:["Strong evidence in one setting may not transfer directly to another.","Absence of research is not proof that lived experience is unimportant.","Check publication date, quality, population and conflicts of interest."],
    related:["Finding Quality Sources","Critical Appraisal","Reflective Inquiry","Evaluation"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Australian Government, NHMRC evidence resources","https://www.nhmrc.gov.au/guidelinesforguidelines"]]
  },
  "Finding Quality Sources": {
    what:"Finding quality sources means locating information that is credible, current and relevant to the practice question. Useful sources may include peer reviewed research, legislation, government guidance, professional standards and recognised Australian peak bodies.",
    practice:["Search using the population, issue, setting and location.","Prioritise original research and official guidance over summaries.","Check the author, organisation, date, method and references.","Use university databases for journal literature and official websites for law and policy."],
    remember:["A professional looking website is not automatically reliable.","Check whether a source is Australian or applicable to Queensland.","Use the current version of legislation, standards and policy."],
    related:["Critical Appraisal","Evidence Informed Practice","APA 7 Referencing","Professional Development"],
    refs:[["JCU Library, Social Work resources","https://libguides.jcu.edu.au/socialwork"],["Australian Government Style Manual, referencing sources","https://www.stylemanual.gov.au/grammar-punctuation-and-conventions/referencing-and-attribution"]]
  },
  "Critical Appraisal": {
    what:"Critical appraisal is the structured examination of a source’s quality, limitations and relevance. It asks not only what the source concludes, but how the knowledge was produced, whose perspectives are represented and whether it fits the practice context.",
    practice:["Identify the research question, design, sample and data collection method.","Consider bias, ethics, limitations and strength of findings.","Ask whether participants resemble the population you are working with.","Compare findings with other evidence and lived experience."],
    remember:["Peer reviewed does not mean flawless.","Small qualitative studies can offer valuable depth without statistical generalisability.","Notice whose knowledge is absent, including First Nations and lived experience perspectives."],
    related:["Evidence Informed Practice","Finding Quality Sources","Reflective Inquiry","Evaluation"],
    refs:[["NHMRC, Guidelines for Guidelines","https://www.nhmrc.gov.au/guidelinesforguidelines"],["JCU Library, critical appraisal resources","https://libguides.jcu.edu.au/criticalappraisal"]]
  },
  "Reflective Inquiry": {
    what:"Reflective inquiry turns everyday practice uncertainty into purposeful learning. It involves noticing an experience, questioning assumptions, connecting theory and evidence, considering power and ethics, and deciding what to explore or do differently.",
    practice:["Write down one practice moment that stayed with you.","Ask what influenced your response and what other interpretations are possible.","Take focused questions to supervision or the literature.","Record what changed in your understanding or future practice."],
    remember:["Reflection is more than describing events.","Protect identifying information in student notes.","Use discomfort as a prompt for inquiry, not proof of failure."],
    related:["Reflective Practice","Supervision","Evidence Informed Practice","Professional Identity"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["AASW Code of Ethics 2020","https://www.aasw.asn.au/about-aasw/ethics-standards/code-of-ethics/"]]
  },
  "Small Project Skills": {
    what:"A small placement project is a focused piece of work that responds to an identified service or practice need. It may involve a resource, brief review, consultation, evaluation snapshot or service improvement activity. The scope should be achievable, ethical and agreed with the organisation.",
    practice:["Clarify the problem, audience, purpose and expected product.","Review existing resources before creating something new.","Consult relevant staff and people with lived experience where appropriate.","Plan tasks, evidence sources, feedback and a realistic timeline."],
    remember:["Keep the scope small enough to complete well.","Follow organisational approval, privacy and branding requirements.","Evaluate usefulness rather than assuming the final product is effective."],
    related:["Evaluation","Evidence Informed Practice","Community Led Practice","APA 7 Referencing"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["Australian Evaluation Society","https://aes.asn.au/"]]
  },
  "APA 7 Referencing": {
    what:"APA 7 is a referencing style used to acknowledge sources and allow readers to locate them. Accurate referencing supports academic integrity and helps distinguish evidence, paraphrase and personal reflection.",
    practice:["Cite the author and year when paraphrasing an idea.","Include a complete reference list entry for each cited source.","Use a DOI as a URL where one is available.","Check organisation names, dates, titles and links carefully."],
    remember:["Paraphrasing still requires a citation.","Reference the version you actually used.","Use JCU guidance and the APA manual for unusual source types."],
    related:["Finding Quality Sources","Evidence Informed Practice","Critical Appraisal","Reports"],
    refs:[["APA Style, reference examples","https://apastyle.apa.org/style-grammar-guidelines/references/examples"],["JCU Library, APA referencing","https://libguides.jcu.edu.au/apa"]]
  },
  "Evaluation": {
    what:"Evaluation examines whether an activity, resource, program or service is useful, ethical and achieving its intended purpose. It can explore implementation, experience, outcomes and improvement opportunities using quantitative, qualitative or mixed information.",
    practice:["Define what success would look like and for whom.","Choose a small number of questions matched to the project purpose.","Collect feedback in accessible and ethical ways.","Compare findings with the intended goals and identify practical improvements."],
    remember:["Do not collect information without a clear use.","Follow privacy, consent and organisational approval requirements.","Include unintended effects and differing perspectives, not only positive feedback."],
    related:["Small Project Skills","Evidence Informed Practice","Critical Appraisal","Participation"],
    refs:[["Australian Evaluation Society","https://aes.asn.au/"],["Australian Government, evaluation guidance","https://evaluation.treasury.gov.au/"]]
  },
  "Professional Development": {
    what:"Professional development is planned learning that maintains and strengthens knowledge, skills, ethics and professional judgement. It includes formal training, supervision, reading, feedback, practice observation and reflection on identified learning needs.",
    practice:["Use supervision and feedback to identify specific development goals.","Choose learning activities linked to current or future practice responsibilities.","Record what you learned and how it changed practice.","Review progress and identify the next step."],
    remember:["Attendance alone does not demonstrate learning.","Prioritise development relevant to your scope and responsibilities.","Professional growth includes cultural responsiveness, ethics and use of self."],
    related:["Lifelong Learning","Supervision","Reflective Inquiry","Professional Identity"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["AASW Continuing Professional Development","https://www.aasw.asn.au/education-employment/continuing-professional-development/"]]
  },
  "Lifelong Learning": {
    what:"Lifelong learning recognises that social work knowledge and practice continue to develop after qualification. Social workers remain responsible for updating knowledge, responding to new evidence and law, learning from lived experience, and reflecting on changing communities and professional roles.",
    practice:["Maintain a realistic learning plan across the year.","Seek perspectives that challenge familiar practice habits.","Review current policy, legislation and evidence before relying on old knowledge.","Use mistakes, uncertainty and feedback as learning opportunities."],
    remember:["Competence is ongoing rather than permanently achieved.","Know when to seek consultation or refer beyond your scope.","Learning should improve practice, not only meet a compliance requirement."],
    related:["Professional Development","Supervision","Evidence Informed Practice","Professional Sustainability"],
    refs:[["AASW Practice Standards 2023","https://www.aasw.asn.au/about-aasw/ethics-standards/practice-standards/"],["AASW Continuing Professional Development","https://www.aasw.asn.au/education-employment/continuing-professional-development/"]]
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
  return `<section class="reflection-library"><div class="reflection-section-heading"><span>📚</span><div><small>Your evidence library</small><h2>Previous reflections</h2></div></div><input id="reflectionSearch" class="input" placeholder="Search theory, standards, ethics, skills or tags"><div id="reflectionLibraryList">${entries.map(e=>{const terms=[e.answer,...(e.theories||[]),...(e.values||[]),...(e.ethics||[]),...(e.practiceStandards||[]),...(e.evidenceTypes||[]),e.consumerGroup,e.placementType].filter(Boolean).join(" ");return `<details class="reflection-library-item" data-search="${safeText(terms.toLowerCase())}"><summary><span><strong>${safeText(e.date||"Reflection")}</strong><small>${safeText((e.theories||[]).slice(0,2).join(" · ")||"Learning moment")}</small></span><span>›</span></summary><p>${safeText((e.moment||e.answer||"").slice(0,300))}</p><div class="reflection-tag-list">${[...(e.theories||[]),...(e.values||[]),...(e.ethics||[]),...(e.practiceStandards||[])].slice(0,8).map(x=>`<span>${safeText(x)}</span>`).join("")}</div></details>`}).join("")}</div></section>`;
}
function journalPage(){
  const entries=savedEntries(), prompt=reflectionQuestionForToday();
  return `<section class="welcome-block reflection-welcome"><div class="eyebrow">Reflect</div><h1>💭 Reflect</h1><p class="welcome-text">Write freely first. Your Reflection Companion stays quiet until you want a little help.</p></section>
  ${lastSavedReflection?`<section class="reflection-saved-note">✨ Reflection saved. Your learning has been added to your evidence library.</section>`:""}
  <form class="reflection-simple" id="reflectionForm" onsubmit="return false">
    <section class="conversation-card reflection-journal-card"><label for="answer"><strong>What stayed with you today?</strong><span>One moment is enough.</span></label><textarea id="answer" class="textarea reflection-main-journal" placeholder="Write in your own words..."></textarea></section>

    <details class="conversation-card reflection-companion"><summary><span><strong>🌱 Reflection Companion</strong><small>Need help connecting today’s experience with social work?</small></span><span>›</span></summary><div class="reflection-companion-body">
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
  <section class="reflection-growth-note"><div class="reflection-section-heading"><span>🌿</span><div><small>Your practice is growing</small><h2>Reflection insight</h2></div></div><p>${safeText(reflectionInsights(entries))}</p></section>
  ${reflectionLibrary(entries)}`;
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
        <ul>${guide.refs.map(ref=>`<li><a href="${ref[1]}" target="_blank" rel="noopener noreferrer">${ref[0]}</a></li>`).join("")}</ul>
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
function backup(){
  try{
    const data={exportedAt:new Date().toISOString(),hours:hours(),entries:savedEntries(),weeklyReviews:state.get("weeklyReviews",[]),timesheets:timesheetEntries(),supervisionItems:supervisionItems(),taskStatuses:taskStatusData(),framework:frameworkData()};
    shareOrDownload(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),"Practice_Compass_Backup.json","Practice Compass backup");
  }catch(error){console.error(error);alert("The backup could not be created. Please try again.");}
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
