Yesss  Now that you’ve specified **front-end only + LocalStorage**, we can make this much more interesting than a normal CBT website.

##  My #1 recommendation: **EduMind AI — Personalized Learning & Study Coach**

A modern web application that acts like a **personal AI tutor**. It analyzes a student's quiz performance, study habits, weak topics, and progress, then dynamically recommends **what to study next and what questions to practice**.

The entire prototype can run in the browser using **HTML, CSS, JavaScript and LocalStorage**. LocalStorage is suitable for persisting relatively small pieces of user data across browser sessions. ([MDN Web Docs][1])

###  What makes it "AI-powered"?

Instead of just saying:

> "You scored 45%."

EduMind AI says:

> **AI Insight:** You are struggling with Algebra. You answered 7/10 Algebra questions incorrectly in your last 3 tests.
> **Recommendation:** Review Quadratic Equations before attempting another Algebra test.
> **Next step:** Take the 10-question Algebra Recovery Quiz.

The "AI" can initially be a **client-side recommendation engine** that analyzes the student's stored performance data.

---

##  Main features

### 1.  AI Student Dashboard

After logging in:

**Good morning, Muadh**

> Your learning score: **78%**
>  Current streak: **6 days**
>  Topics mastered: **14/20**
>  Topics needing attention: **3**

Then show:

* Study progress
* Recent quiz scores
* Current streak
* Weak subjects
* Recommended lessons
* Daily goal

---

### 2.  AI Study Coach

This would be the **star feature**.

The student selects:

> Mathematics → Algebra

The system analyzes previous results stored in LocalStorage.

Then it generates something like:

**AI Study Recommendation**

>  **Priority: High**
>
> Your recent performance in Algebra is 52%.
>
> You should:
>
> 1. Review Quadratic Equations
> 2. Practice 10 beginner questions
> 3. Attempt an intermediate quiz
> 4. Retake the assessment

That's much more impressive to a supervisor than simply having a chatbot.

---

### 3.  Adaptive CBT

This is where the project becomes really cool.

Suppose the student gets:

**Easy question → Correct **

The next question can become harder.

If they get several difficult questions wrong:

**Difficulty automatically decreases.**

Example:

```text
Question 1 → Easy → Correct
Question 2 → Medium → Correct
Question 3 → Hard → Wrong
Question 4 → Medium → Correct
```

The system continuously calculates the student's estimated mastery.

---

### 4.  Weak Topic Detection

Store results like:

```text
Algebra       45%
Trigonometry  82%
Statistics    71%
Geometry      56%
Calculus      38%
```

Your algorithm can identify:

**Weakest topic → Calculus**

Then automatically recommend Calculus materials and questions.

---

### 5.  AI Performance Analytics

Give the student beautiful charts:

* Score over time
* Subject performance
* Topic mastery
* Correct vs incorrect answers
* Study time
* Improvement percentage

You could have a dashboard saying:

> **You've improved by 24% this month **

---

### 6.  Gamification

Add:

* XP
* Levels
* Daily streaks
* Badges
* Achievements
* Leaderboard
* Study challenges

Example:

> **7-Day Scholar**
> Complete activities for 7 consecutive days.

---

### 7. AI-Generated Study Plan

The student enters:

> **"I have JAMB Mathematics exam in 30 days."**

Your application creates a plan based on their stored weaknesses:

**30-Day AI Study Plan**

| Day | Focus        |
| --- | ------------ |
| 1   | Algebra      |
| 2   | Algebra      |
| 3   | Geometry     |
| 4   | Trigonometry |
| 5   | Algebra Test |
| ... | ...          |

And it can dynamically change the plan based on their performance.

---

## How LocalStorage fits in

You don't need a database for the prototype.

You could store:

```text
student
quizResults
questions
studyProgress
weakTopics
studyStreak
badges
studyPlan
settings
```

For example:

```javascript
localStorage.setItem(
  "quizResults",
  JSON.stringify(results)
);
```

Then retrieve it:

```javascript
const results =
  JSON.parse(localStorage.getItem("quizResults")) || [];
```

`localStorage` persists data even after the browser is closed and reopened, which makes it useful for your prototype. ([MDN Web Docs][1])

One limitation: browser `localStorage` is intended for relatively small amounts of data; MDN notes a typical Web Storage limit of about 5 MiB for `localStorage` per origin, so you wouldn't want to use it as a replacement for a real production database. ([MDN Web Docs][2])

---

#  Your tech stack

You can make the whole thing with:

**Frontend**

* HTML5
* CSS3
* JavaScript
* Bootstrap or Tailwind CSS

**Charts**

* Chart.js

**Icons**

* Font Awesome / Lucide

**Storage**

* LocalStorage

**AI layer**

* JavaScript recommendation/adaptive-learning engine

**Optional advanced AI**

* TensorFlow.js or ONNX Runtime Web for actual machine-learning inference inside the browser.

So you don't necessarily need a backend.

---

#  The killer feature

I'd call it:

### **AI Learning DNA**

The system builds a profile of the student's learning performance:

```text
             STUDENT LEARNING DNA

     Mathematics      ███████░░░ 72%
     Physics          █████░░░░░ 51%
     Chemistry        ████████░░ 84%

     Strongest → Chemistry
     Weakest   → Physics

     Learning style → Practice-focused
     Difficulty     → Intermediate
     Consistency    → 82%
     Current streak → 6 days
```

Then your AI engine uses this information to personalize the student's experience.

That gives you a **real capstone concept**, rather than just another online examination system.

---

##  Possible official project title

**"Design and Development of an AI-Powered Personalized Learning and Adaptive Assessment Web Application for Students"**

Or a more catchy product name:

> **EduMind AI: An Intelligent Personalized Learning and Adaptive Assessment Platform**

### And the best part 

Because you're doing **front-end only**, we can design the entire thing so that a supervisor can open the website, create a student profile, take tests, deliberately get questions wrong, and **watch the AI recommendations change automatically**.

That's the kind of demo that can make your capstone feel **top-notch** even without a backend. 

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API?utm_source=chatgpt.com "Using the Web Storage API - Web APIs | MDN"
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria?utm_source=chatgpt.com "Storage quotas and eviction criteria - Web APIs | MDN"
