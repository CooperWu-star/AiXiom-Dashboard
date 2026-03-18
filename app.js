const pathways = [
  {
    title: "Foundations of AiXiom",
    focus: "Core concepts, ethics, and systems thinking",
    duration: "3 weeks",
    outcomes: ["AI literacy baseline", "Responsible use policy", "Shared vocabulary"],
  },
  {
    title: "Applied Prompt Craft",
    focus: "Prompt design, evaluation, and tutoring flows",
    duration: "2 weeks",
    outcomes: ["Prompt templates", "Evaluation rubric", "Lesson personalization"],
  },
  {
    title: "Intelligent Systems Studio",
    focus: "Agents, retrieval systems, and orchestration",
    duration: "4 weeks",
    outcomes: ["Agent blueprint", "Retrieval pipeline", "Ops runbook"],
  },
  {
    title: "Education Impact Lab",
    focus: "Instructional design and learning analytics",
    duration: "3 weeks",
    outcomes: ["Curriculum map", "Progress dashboards", "Impact story"],
  },
];

const lessons = [
  {
    id: "axiom-101",
    title: "AiXiom Pillars & Learning Outcomes",
    level: "Foundations",
    duration: "45 min",
    summary:
      "Explore the four pillars of AiXiom education and align learning outcomes to learner personas.",
    objectives: [
      "Identify AiXiom learning pillars",
      "Map outcomes to persona readiness levels",
      "Define success metrics for each cohort",
    ],
    lab: "Draft a cohort charter outlining objectives, rituals, and growth metrics.",
    resources: ["Pillar overview deck", "Persona worksheet", "Outcome scorecard"],
  },
  {
    id: "prompting-201",
    title: "Prompt Architecture for Tutors",
    level: "Applied",
    duration: "60 min",
    summary:
      "Design prompt stacks that blend context, learner goals, and guardrails for safe tutoring.",
    objectives: [
      "Layer system, developer, and learner prompts",
      "Create adaptive scaffolding levels",
      "Score responses for clarity and empathy",
    ],
    lab: "Write a multi-stage prompt that adapts to beginner/intermediate learners.",
    resources: ["Prompt library", "Evaluation rubric", "Safety checklist"],
  },
  {
    id: "retrieval-301",
    title: "Retrieval & Knowledge Graphs",
    level: "Systems",
    duration: "50 min",
    summary:
      "Connect lesson materials to retrieval pipelines that serve context-aware tutoring responses.",
    objectives: [
      "Model content nodes and metadata",
      "Build a retrieval quality checklist",
      "Define fallback behaviors for sparse data",
    ],
    lab: "Sketch a knowledge graph for a core AiXiom module.",
    resources: ["Retrieval blueprint", "Metadata schema", "Evaluation checklist"],
  },
  {
    id: "analytics-220",
    title: "Learning Analytics & Dashboards",
    level: "Impact",
    duration: "40 min",
    summary:
      "Instrument learning activities to understand mastery, engagement, and pacing.",
    objectives: [
      "Choose meaningful learning metrics",
      "Design dashboards for coaches",
      "Automate feedback loops",
    ],
    lab: "Draft a dashboard layout for weekly learner check-ins.",
    resources: ["Metrics guide", "Dashboard wireframe", "Feedback playbook"],
  },
  {
    id: "ethics-110",
    title: "Ethical AI in Education",
    level: "Foundations",
    duration: "35 min",
    summary:
      "Build ethical guardrails and equity considerations into every AiXiom lesson.",
    objectives: [
      "Spot bias risks in tutoring flows",
      "Apply privacy-by-design principles",
      "Document transparency commitments",
    ],
    lab: "Run a risk review on a proposed learner data collection plan.",
    resources: ["Ethics checklist", "Policy template", "Case studies"],
  },
  {
    id: "deployment-330",
    title: "Deployment & Iteration Loops",
    level: "Systems",
    duration: "55 min",
    summary:
      "Ship AiXiom learning tools with continuous improvement loops and stakeholder feedback.",
    objectives: [
      "Plan incremental rollout phases",
      "Define success signals for iteration",
      "Create stakeholder feedback rituals",
    ],
    lab: "Outline a 6-week pilot plan with checkpoints and milestones.",
    resources: ["Pilot checklist", "Rollout calendar", "Stakeholder survey"],
  },
];

const quiz = {
  question: "Which element best ensures AiXiom tutoring stays aligned with learner goals?",
  options: [
    "Removing all guardrails so responses are flexible",
    "Anchoring prompts with learner objectives and reflective checks",
    "Only evaluating responses after the cohort ends",
    "Relying on generic templates without personalization",
  ],
  answerIndex: 1,
  explanation:
    "AiXiom tutors stay aligned when prompts continuously reference learner objectives and include reflection prompts.",
};

const recommendations = [
  "Review retrieval quality checklist",
  "Schedule cohort retrospective",
  "Prototype adaptive quiz questions",
];

const storageKey = "aixiom-completed-lessons";
const weeklyGoalHours = 6;
const weeklyStudyHours = 4.5;

const lessonList = document.querySelector("#lesson-list");
const lessonTitle = document.querySelector("#lesson-title");
const lessonLevel = document.querySelector("#lesson-level");
const lessonDuration = document.querySelector("#lesson-duration");
const lessonSummary = document.querySelector("#lesson-summary");
const lessonObjectives = document.querySelector("#lesson-objectives");
const lessonLab = document.querySelector("#lesson-lab");
const lessonResources = document.querySelector("#lesson-resources");
const completeLessonButton = document.querySelector("#complete-lesson");
const progressFill = document.querySelector("#progress-fill");
const progressCount = document.querySelector("#progress-count");
const weeklyFill = document.querySelector("#weekly-fill");
const weeklyGoal = document.querySelector("#weekly-goal");
const completedCount = document.querySelector("#completed-count");
const weeklyHours = document.querySelector("#weekly-hours");
const recommendationsList = document.querySelector("#recommendations");
const pathwaysGrid = document.querySelector("#pathways-grid");
const quizQuestion = document.querySelector("#quiz-question");
const quizOptions = document.querySelector("#quiz-options");
const quizFeedback = document.querySelector("#quiz-feedback");

const state = {
  activeLessonId: lessons[0].id,
  completedLessons: new Set(),
};

const loadCompletedLessons = () => {
  const stored = window.localStorage.getItem(storageKey);
  if (!stored) {
    return;
  }
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      state.completedLessons = new Set(parsed);
    }
  } catch (error) {
    console.error("Failed to parse completed lessons:", error);
    window.localStorage.removeItem(storageKey);
  }
};

const persistCompletedLessons = () => {
  window.localStorage.setItem(storageKey, JSON.stringify([...state.completedLessons]));
};

const renderPathways = () => {
  pathwaysGrid.innerHTML = "";
  pathways.forEach((pathway) => {
    const card = document.createElement("article");
    card.className = "pathway-card";
    card.innerHTML = `
      <p class="eyebrow">${pathway.duration}</p>
      <h3>${pathway.title}</h3>
      <p>${pathway.focus}</p>
      <div>
        ${pathway.outcomes.map((item) => `<span class="pill">${item}</span>`).join(" ")}
      </div>
    `;
    pathwaysGrid.appendChild(card);
  });
};

const renderRecommendations = () => {
  recommendationsList.innerHTML = "";
  recommendations.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    recommendationsList.appendChild(li);
  });
};

const setActiveLesson = (lessonId) => {
  state.activeLessonId = lessonId;
  const lesson = lessons.find((item) => item.id === lessonId);
  if (!lesson) {
    return;
  }
  lessonTitle.textContent = lesson.title;
  lessonLevel.textContent = lesson.level;
  lessonDuration.textContent = lesson.duration;
  lessonSummary.textContent = lesson.summary;
  lessonObjectives.innerHTML = lesson.objectives.map((item) => `<li>${item}</li>`).join("");
  lessonLab.textContent = `Lab: ${lesson.lab}`;
  lessonResources.innerHTML = `
    <strong>Resources</strong>
    <ul>
      ${lesson.resources.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
  const completed = state.completedLessons.has(lesson.id);
  completeLessonButton.textContent = completed ? "Lesson completed" : "Mark lesson complete";
  completeLessonButton.disabled = completed;
  document.querySelectorAll(".lesson-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.lessonId === lessonId);
  });
};

const renderLessonList = () => {
  lessonList.innerHTML = "";
  lessons.forEach((lesson) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lesson-item";
    button.dataset.lessonId = lesson.id;
    button.innerHTML = `
      <strong>${lesson.title}</strong>
      <div class="lesson-meta">
        <span>${lesson.level}</span>
        <span>•</span>
        <span>${lesson.duration}</span>
      </div>
    `;
    button.addEventListener("click", () => setActiveLesson(lesson.id));
    lessonList.appendChild(button);
  });
};

const updateProgress = () => {
  const completedCountValue = state.completedLessons.size;
  const totalCount = lessons.length;
  const completionRatio = totalCount === 0 ? 0 : completedCountValue / totalCount;
  progressFill.style.width = `${Math.round(completionRatio * 100)}%`;
  progressCount.textContent = `${completedCountValue} / ${totalCount} lessons`;
  completedCount.textContent = completedCountValue.toString();
  const weeklyRatio = Math.min(weeklyStudyHours / weeklyGoalHours, 1);
  weeklyFill.style.width = `${Math.round(weeklyRatio * 100)}%`;
  weeklyGoal.textContent = `${weeklyStudyHours} / ${weeklyGoalHours} hours`;
  weeklyHours.textContent = `${weeklyStudyHours}h`;
};

const renderQuiz = () => {
  quizQuestion.textContent = quiz.question;
  quizOptions.innerHTML = "";
  quiz.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => {
      const isCorrect = index === quiz.answerIndex;
      quizFeedback.textContent = isCorrect
        ? `Correct! ${quiz.explanation}`
        : `Not quite. ${quiz.explanation}`;
      quizFeedback.style.color = isCorrect ? "var(--success)" : "var(--warning)";
    });
    quizOptions.appendChild(button);
  });
};

const handleLessonCompletion = () => {
  if (state.completedLessons.has(state.activeLessonId)) {
    return;
  }
  state.completedLessons.add(state.activeLessonId);
  persistCompletedLessons();
  updateProgress();
  setActiveLesson(state.activeLessonId);
};

loadCompletedLessons();
renderPathways();
renderLessonList();
setActiveLesson(state.activeLessonId);
renderQuiz();
renderRecommendations();
updateProgress();

completeLessonButton.addEventListener("click", handleLessonCompletion);
