# Quiz: Causal Loop Diagrams and Systems Thinking

Test your understanding of systems thinking, causal loop diagrams, feedback loops, and leverage points.

---

#### 1. What is systems thinking?

<div class="upper-alpha" markdown>
1. A programming methodology for building large software systems
2. An approach to understanding the world that focuses on relationships and interactions rather than isolated components
3. A technique for organizing files into hierarchical directory structures
4. A method for testing software systems for bugs and errors
</div>

??? question "Show Answer"
    The correct answer is **B**. Systems thinking focuses on relationships and interactions rather than isolated components. Instead of asking "What caused this?", a systems thinker asks "What patterns of interaction produced this behavior over time?" This perspective is essential for understanding phenomena driven by feedback among interconnected parts.

    **Concept Tested:** Systems Thinking

---

#### 2. What is circular causality?

<div class="upper-alpha" markdown>
1. A cause-and-effect chain that forms a straight line from input to output
2. A visual design pattern that uses circular shapes for diagram elements
3. A causal chain that loops back so that effects eventually influence their own causes
4. A debugging technique that traces errors in circular data structures
</div>

??? question "Show Answer"
    The correct answer is **C**. Circular causality is the defining feature of causal loop diagrams. In a linear causal chain, cause A leads to effect B and the story ends. In circular causality, the chain eventually loops back — C influences A, creating a closed cycle of mutual influence. This is found everywhere: in ecology, economics, and education.

    **Concept Tested:** Circular Causality

---

#### 3. What are the three building blocks of every causal loop diagram?

<div class="upper-alpha" markdown>
1. Variables, causal links, and polarity indicators
2. Nodes, edges, and labels
3. Inputs, processes, and outputs
4. Headers, bodies, and footers
</div>

??? question "Show Answer"
    The correct answer is **A**. Every causal loop diagram is built from variables (quantities that can increase or decrease), causal links (directed arrows showing that a change in one variable causes a change in another), and polarity indicators (+ or − symbols specifying whether variables move in the same or opposite directions).

    **Concept Tested:** Variable, Causal Link, Polarity Indicator

---

#### 4. What does a positive polarity indicator (+) on a causal link mean?

<div class="upper-alpha" markdown>
1. The relationship is beneficial or desirable
2. The cause variable always increases
3. The variables move in the same direction — if the cause increases, the effect increases
4. The link is stronger than links with negative polarity
</div>

??? question "Show Answer"
    The correct answer is **C**. Positive polarity (+) means the variables move in the same direction. If the cause increases, the effect increases; if the cause decreases, the effect decreases. Importantly, "positive" has nothing to do with "good" — a positive link from Pollution to Health Problems means both increase together, which is clearly not a good outcome.

    **Concept Tested:** Positive Polarity

---

#### 5. How do you distinguish a reinforcing loop from a balancing loop?

<div class="upper-alpha" markdown>
1. Reinforcing loops use blue arrows and balancing loops use red arrows
2. Count the negative polarity links — an even count (including zero) means reinforcing, an odd count means balancing
3. Reinforcing loops always have exactly three variables
4. Balancing loops contain more variables than reinforcing loops
</div>

??? question "Show Answer"
    The correct answer is **B**. To identify the loop type, count the number of negative (−) polarity links in the loop. If the count is even (including zero), the loop is reinforcing — it amplifies change. If the count is odd, the loop is balancing — it resists change and drives the system toward equilibrium.

    **Concept Tested:** Reinforcing Loop, Balancing Loop

---

#### 6. What is the difference between a vicious cycle and a virtuous cycle?

<div class="upper-alpha" markdown>
1. Vicious cycles have more variables than virtuous cycles
2. Vicious cycles use negative polarity while virtuous cycles use positive polarity
3. Both are reinforcing loops, but a vicious cycle amplifies undesirable outcomes while a virtuous cycle amplifies desirable outcomes
4. Vicious cycles are found only in economics while virtuous cycles are found only in education
</div>

??? question "Show Answer"
    The correct answer is **C**. Both vicious and virtuous cycles are reinforcing loops — they amplify change in whichever direction they start. The difference is in the outcome: a virtuous cycle reinforces desirable growth (e.g., confidence → effort → performance → more confidence), while a vicious cycle reinforces decline or undesirable outcomes (e.g., poor grades → low motivation → less effort → worse grades).

    **Concept Tested:** Vicious Cycle, Virtuous Cycle

---

#### 7. What is a leverage point in a causal loop diagram?

<div class="upper-alpha" markdown>
1. The variable with the longest label in the diagram
2. A point in the system where a small intervention can produce a large change in overall behavior
3. The first variable drawn when constructing a CLD
4. A decorative element added to make the diagram more visually appealing
</div>

??? question "Show Answer"
    The correct answer is **B**. A leverage point is a place in a system where a small intervention can produce a disproportionately large change in the system's overall behavior. Identifying leverage points is one of the most valuable outcomes of CLD analysis because it helps decision-makers focus their limited resources where they will have the greatest impact.

    **Concept Tested:** Leverage Point

---

#### 8. A thermostat system where rising room temperature causes heating to decrease, which causes temperature to drop back toward the setpoint, is an example of what type of loop?

<div class="upper-alpha" markdown>
1. Reinforcing loop
2. Vicious cycle
3. Virtuous cycle
4. Balancing loop
</div>

??? question "Show Answer"
    The correct answer is **D**. A thermostat is a classic balancing loop. When the room temperature rises above the setpoint, the heating system reduces output, which brings the temperature back down. The loop resists change and drives the system toward equilibrium (the setpoint temperature). Balancing loops contain an odd number of negative polarity links.

    **Concept Tested:** Balancing Loop

---

#### 9. An instructional designer is building a CLD showing how student engagement leads to better grades, which increases confidence, which further increases engagement. What type of feedback loop is this?

<div class="upper-alpha" markdown>
1. A balancing loop because it stabilizes student performance
2. A linear process because it flows in one direction
3. A reinforcing loop because engagement amplifies itself through the chain of effects
4. An unintended consequence because the designer did not plan for this outcome
</div>

??? question "Show Answer"
    The correct answer is **C**. This is a reinforcing loop (specifically a virtuous cycle) because the initial change in engagement is amplified through the chain: engagement → grades → confidence → more engagement. The loop reinforces the initial change, driving exponential growth in engagement. All the polarity links are positive, so the count of negative links is zero (even), confirming it is reinforcing.

    **Concept Tested:** Reinforcing Loop, Feedback Loop

---

#### 10. Which of the following is a best practice for naming variables in a causal loop diagram?

<div class="upper-alpha" markdown>
1. Use binary states like "Is Enrolled" or "Has Graduated"
2. Use action verbs like "Teach Students" or "Run Experiments"
3. Use short noun phrases that can naturally go up or down, such as "Student Motivation" or "Course Enrollment"
4. Use single letters like X, Y, and Z for brevity
</div>

??? question "Show Answer"
    The correct answer is **C**. Effective CLD variable names are short noun phrases that can naturally "go up" or "go down," such as Student Motivation, Course Enrollment, or Teacher Workload. Avoid binary states (cannot increase or decrease), action verbs (not quantities), overly broad labels (too vague), and single letters (not meaningful).

    **Concept Tested:** CLD Best Practices, Variable
