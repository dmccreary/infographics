---
title: The AI Flywheel
description: An infographic MicroSim of the AI Flywheel causal loop.
quality_score: 75
image: /sims/ai-flywheel/ai-flywheel.png
og:image: /sims/ai-flywheel/ai-flywheel.png
twitter:image: /sims/ai-flywheel/ai-flywheel.png
social:
   cards: false
---
# AI Flywheel

<iframe src="./main.html" height="470px" scrolling="no"></iframe>

[Run the AI Flywheel MicroSim](./main.html){ .md-button .md-button--primary }
[Edit the AI Flywheel MicroSim](https://editor.p5js.org/dmccreary/sketches/HC-HjkNpm)

## Components Flow

The AI Flywheel is a reinforcing causal loop with four stages:

1. **Data** (top) → "Used to Create" → **Model** (right)
2. **Model** (right) → "Used to Create" → **Prediction** (bottom)
3. **Prediction** (bottom) → "Generates" → **Feedback** (left)
4. **Feedback** (left) → "Provides More" → **Data** (top)

Each revolution of the flywheel strengthens the system. More data produces better models, which produce better predictions, which generate more useful feedback, which provides more data — and the cycle accelerates.

---

## Lesson Plan: The AI Flywheel in Action

**Course:** Introduction to Artificial Intelligence (college level)
**Duration:** 75 minutes (one class session)
**Prerequisites:** Basic understanding of what machine learning is; no programming required

### Learning Objectives

By the end of this lesson, students will be able to:

1. **Identify** the four components of the AI Flywheel (Data, Model, Prediction, Feedback) and explain the role of each.
2. **Trace** how a single user interaction travels through all four stages of the flywheel.
3. **Analyze** a concrete system (a customer-support chatbot) and map its operations onto the flywheel.
4. **Evaluate** how feedback quality affects the speed at which the flywheel improves a real AI product.

### Materials

- The AI Flywheel MicroSim (embedded above)
- The chatbot case study below
- Whiteboard or shared drawing tool for group diagramming

---

### Part 1: Explore the Flywheel (15 minutes)

Have students interact with the MicroSim above. Ask them to hover over each node and read the description. Then pose these discussion questions:

- Why is this called a "flywheel" rather than a "pipeline"?
- What happens to the system if the Feedback stage is removed entirely?
- Can the flywheel spin in the wrong direction — that is, can bad data make the system progressively worse?

Guide the class toward the insight that the flywheel is a **reinforcing loop**: each stage amplifies the next. This means the loop can accelerate improvement *or* accelerate degradation, depending on data quality.

---

### Part 2: Case Study — A Customer-Support Chatbot with a Feedback Button (40 minutes)

#### The Scenario

Imagine a university IT help desk that receives 500 student questions per week about topics like Wi-Fi passwords, VPN setup, and software licenses. They deploy a chatbot on their website to handle common questions automatically.

#### Stage 1 — Data: Building the Initial Training Set

Before the chatbot can answer anything, it needs training data. The IT team collects:

- **1,200 past help-desk tickets** with the student's question and the technician's response
- **The university's IT knowledge base** — 85 articles covering Wi-Fi, VPN, email, printing, and software
- **A list of 40 frequently asked questions** written by senior technicians

They clean this data by removing personal information (student IDs, passwords) and standardizing the format so every example is a question-answer pair:

| Question | Answer |
|----------|--------|
| "How do I connect to campus Wi-Fi?" | "Go to Settings → Wi-Fi, select 'University-Secure', and log in with your student credentials." |
| "My VPN keeps disconnecting." | "Update the VPN client to version 4.2 or later. If the issue persists, check that your OS firewall allows the VPN application." |
| "Where do I get Microsoft Office?" | "Visit software.university.edu and sign in. Office 365 is free for all enrolled students." |

This initial dataset is the fuel for the first revolution of the flywheel.

#### Stage 2 — Model: Training the Chatbot

The team fine-tunes a language model on this question-answer dataset. The model learns patterns like:

- Questions containing "Wi-Fi" or "wireless" should retrieve answers about network connectivity
- Questions containing "install" or "download" should retrieve answers about software licensing
- Questions containing "can't log in" should first ask whether the issue is with the university portal or a specific application

After training, the model can take a new student question and generate a relevant answer by drawing on the patterns it learned from the 1,200 tickets and 85 knowledge-base articles.

#### Stage 3 — Prediction: Answering Student Questions

A student visits the help desk website and types:

> "I just got a new laptop. How do I set up the VPN?"

The chatbot processes this question and generates a response:

> "Welcome! To set up the VPN on your new laptop:
>
> 1. Go to vpn.university.edu and download the client for your operating system.
> 2. Install and open the client.
> 3. Enter the server address: vpn.university.edu
> 4. Log in with your student credentials.
>
> If you run into issues, try updating your OS to the latest version first."

This prediction is the chatbot's best attempt based on its current model. It may be perfect, partially correct, or wrong — the system does not yet know.

#### Stage 4 — Feedback: The Thumbs-Up / Thumbs-Down Button

Here is the critical piece that closes the loop. After every chatbot response, the student sees two buttons:

- 👍 **Helpful** — "This answered my question"
- 👎 **Not Helpful** — "I still need help"

**What gets logged when the student clicks a button:**

```
{
  "timestamp": "2026-03-18T14:32:07Z",
  "session_id": "s-9a3f2b",
  "question": "I just got a new laptop. How do I set up the VPN?",
  "response": "Welcome! To set up the VPN on your new laptop: ...",
  "feedback": "helpful",
  "category": "vpn",
  "escalated_to_human": false
}
```

If the student clicks 👎 **Not Helpful**, the system logs the negative feedback *and* routes the conversation to a human technician. The technician's corrected answer is also logged:

```
{
  "timestamp": "2026-03-18T14:35:22Z",
  "session_id": "s-9a3f2b",
  "question": "I just got a new laptop. How do I set up the VPN?",
  "chatbot_response": "Welcome! To set up the VPN on your new laptop: ...",
  "feedback": "not_helpful",
  "human_response": "For M3 MacBooks, use the new VPN client at vpn.university.edu/mac-arm64 — the standard installer does not support Apple Silicon yet.",
  "category": "vpn",
  "escalated_to_human": true
}
```

#### How Feedback Becomes New Data

Every week, the IT team runs a data pipeline that processes the feedback logs:

1. **Positive examples** — Question-answer pairs rated "helpful" are added directly to the training set as confirmed good answers.
2. **Corrected examples** — Questions where the chatbot failed but a human provided a correct answer become high-value training pairs. The human's answer replaces the chatbot's answer in the training data.
3. **Failure patterns** — Questions that consistently receive "not helpful" ratings are flagged for the team to write new knowledge-base articles.

After one month of operation, the chatbot has collected:

| Metric | Count |
|--------|-------|
| Total conversations | 2,000 |
| Rated "helpful" | 1,540 (77%) |
| Rated "not helpful" | 460 (23%) |
| Human-corrected answers | 312 |
| New knowledge-base articles written | 8 |

The team retrains the model using the original 1,200 tickets **plus** 1,540 confirmed good answers **plus** 312 human-corrected answers. The training set has grown from 1,200 examples to 3,052 examples — and critically, these new examples reflect *real student questions*, not just historical tickets.

#### The Second Revolution

After retraining, the chatbot's accuracy on VPN questions jumps from 71% helpful to 89% helpful because it now has specific training data about Apple Silicon laptops, Chromebooks, and other edge cases that the original knowledge base did not cover.

More accurate predictions → more "helpful" clicks → more confirmed training data → an even better model next month. **The flywheel is spinning.**

#### Mapping the Case Study to the Flywheel

| Flywheel Stage | Chatbot Example |
|----------------|-----------------|
| **Data** | Help-desk tickets, knowledge-base articles, and accumulated feedback logs |
| **Model** | The fine-tuned language model trained on question-answer pairs |
| **Prediction** | The chatbot's generated response to a student's question |
| **Feedback** | The thumbs-up/thumbs-down button click and any human-corrected answers |

---

### Part 3: Group Activity (15 minutes)

Divide students into groups of 3-4. Each group picks one of the following AI products and diagrams its flywheel on a whiteboard:

1. **A music recommendation engine** (e.g., Spotify Discover Weekly)
2. **An email spam filter** (e.g., Gmail's "Report Spam" button)
3. **A navigation app** (e.g., Google Maps real-time traffic)
4. **An autocomplete keyboard** (e.g., smartphone predictive text)

For each product, groups must identify:

- What is the **Data**?
- What is the **Model**?
- What is the **Prediction**?
- What is the **Feedback** mechanism, and how does it flow back into Data?

---

### Part 4: Wrap-Up Discussion (5 minutes)

Close with these questions:

- Which of the four group examples has the **fastest** flywheel? Why?
- What happens when feedback is **noisy** or **biased** (for example, only frustrated users click the feedback button)?
- How might a company deliberately **slow down** its flywheel for safety reasons?

### Assessment

Ask students to write a one-page response (due next class) answering:

> Pick an AI product you use regularly. Identify its four flywheel stages and describe one specific way the product has visibly improved over time because of its feedback loop. Then describe one risk: how could the same feedback loop make the product worse for certain users?

!!! mascot-tip "Percy's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Percy shares a tip">
    Here's a fun fact about getting your flywheel started! Studies show that if a chatbot gets at least **one-third** of its responses correct, users will keep using it and clicking that feedback button — giving you the data you need to improve. But if accuracy drops below that one-third threshold, users abandon the chatbot entirely, and the flywheel **stops spinning**. So your initial training data doesn't have to be perfect — it just has to clear that critical one-third bar to keep the feedback flowing!

---

## References

1. [AI Flywheel Effect — Wikipedia](https://en.wikipedia.org/wiki/Flywheel_(AI))
2. [Reinforcing Feedback Loop — Wikipedia](https://en.wikipedia.org/wiki/Positive_feedback)
3. [Causal Loop Diagram — Wikipedia](https://en.wikipedia.org/wiki/Causal_loop_diagram)
4. [Machine Learning — Wikipedia](https://en.wikipedia.org/wiki/Machine_learning)
5. [Reinforcement Learning from Human Feedback — Wikipedia](https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback)

