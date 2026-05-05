/* ═══════════════════════════════════════════════
   SEED POSTS — Pre-published content for free modules
   Admin-published content in localStorage takes priority.
   ═══════════════════════════════════════════════ */

const SEED_POSTS = {

  /* ──────────────────────────────────────────────
     FOUNDATION · Module 1
     What is Artificial Intelligence?
     Class 5–8
  ────────────────────────────────────────────── */
  'foundation_0': {
    tier: 'foundation', moduleIndex: 0, status: 'published',
    publishedAt: '2026-05-01T00:00:00Z',
    updatedAt:   '2026-05-01T00:00:00Z',
    content: `## Welcome to Your AI Journey! 🤖

Have you ever talked to Siri, Alexa, or Google Assistant? Noticed how YouTube knows *exactly* what video to play next? Or how your phone unlocks just by looking at it?

That is **Artificial Intelligence** at work — and by the end of this module, you will understand exactly how it happens.

---

## What Does "Artificial Intelligence" Mean?

Let us break the two words:

- **Artificial** = made by humans (not natural)
- **Intelligence** = the ability to think, learn, and solve problems

So **Artificial Intelligence (AI)** means: *human-made thinking built inside a computer.*

> "AI is not magic. It is mathematics, data, and a lot of practice."

A regular calculator is **not** AI — it only does what you tell it. An AI system **learns on its own** from thousands of examples, just like you learn from experience.

---

## Normal Computer vs AI Computer

| Normal Computer | AI Computer |
|----------------|-------------|
| Follows exact instructions only | Learns from examples |
| Cannot improve itself | Gets better with more practice |
| Fails if the situation changes | Adapts to new situations |
| Example: Calculator | Example: Google Translate |

A regular calculator always gives \`2 + 2 = 4\`. But Google Translate learns from millions of sentences and keeps improving its translations every day!

---

## 3 Types of AI You Already Use Every Day

### 1. 🗣️ Voice AI
When you say *"Hey Google, play music"* — the phone listens, understands your words, and acts. This is called **Speech Recognition**.

### 2. 👁️ Vision AI
When you unlock your phone with your face — the camera uses AI to recognise your unique features in milliseconds. This is called **Computer Vision**.

### 3. 📱 Recommendation AI
When YouTube shows *"You might also like..."* — AI has studied your watch history and is guessing what you will enjoy next. This is called a **Recommendation System**.

---

## How Does AI Learn? (The Dog Analogy 🐕)

Think of teaching a dog a new trick:

1. You show the dog a ball and say **"ball"**
2. The dog makes a mistake — picks up a shoe instead
3. You correct it: *"No, that is a shoe. THIS is a ball."*
4. After many tries, the dog learns the difference!

**AI works exactly the same way:**

- You give it **thousands of examples** (called *training data*)
- It makes **guesses** — some right, some wrong
- It **corrects itself** based on mistakes
- After enough practice, it becomes very **accurate**

The more examples you give, the smarter it becomes. This process is called **Machine Learning** — and we will explore it in Module 3!

---

## AI in India 🇮🇳

AI is not just for big tech companies in America. India is using it right now in powerful ways:

- 🌾 **Farmers** use AI apps to photograph their crops and instantly detect diseases
- 🏥 **Doctors** use AI to read X-rays and detect cancer faster than any human
- 🚆 **Indian Railways** uses AI to manage ticket booking for over 8 million passengers daily
- 🗺️ **Google Maps in India** uses AI to predict traffic and suggest the fastest route
- 🏏 **IPL teams** use AI to study player performance and plan strategies

India has over 1 million AI jobs opening up in the next few years. You are starting at exactly the right time! 🚀

---

## Quick Quiz — Test Yourself! ✏️

**Q1. Which of these is an example of AI?**

- A) A light switch turning on automatically at 6pm
- B) A calculator giving the answer to 12 × 8
- **C) Google Photos recognising your friend's face in a photo ✓**

---

**Q2. What does AI need to learn something new?**

- A) A human to program every possible answer
- **B) Lots of training examples and practice ✓**
- C) Only a fast internet connection

---

**Q3. Which Indian application uses AI?**

- A) Only English apps
- **B) Crop disease detection for farmers ✓**
- C) AI is not used in India yet

---

## What You Learned Today ✅

- ✅ **AI = Artificial Intelligence** — human-made thinking inside computers
- ✅ AI **learns from examples**, unlike regular programs that follow fixed instructions
- ✅ You use AI **every day** — in your phone, apps, YouTube, and Google Maps
- ✅ India is using AI in **farming, healthcare, railways, and cricket**
- ✅ AI needs **training data** (examples) to learn, just like you need practice

---

## Coming Up in Module 2 →

In the next module we explore **How AI Actually Thinks** — patterns, data, and the brain of a machine. Get ready to think like a computer! 🧠
`},

  /* ──────────────────────────────────────────────
     FOUNDATION · Module 2
     How Does AI Think? Data & Patterns
     Class 5–8
  ────────────────────────────────────────────── */
  'foundation_1': {
    tier: 'foundation', moduleIndex: 1, status: 'published',
    publishedAt: '2026-05-01T00:00:00Z',
    updatedAt:   '2026-05-01T00:00:00Z',
    content: `## How Does AI Think? 🧠

In Module 1, you discovered that AI learns from examples. But have you ever wondered *what* exactly happens inside the computer when it "thinks"?

In this module we will uncover the two most important ideas behind all AI: **Data** and **Patterns**.

---

## Everything Starts with Data

**Data** simply means *information*. It can be:

| Type of Data | Examples |
|---|---|
| 📝 Numbers | Temperatures, prices, scores |
| 🖼️ Images | Photos, X-rays, satellite maps |
| 🔤 Text | Books, tweets, WhatsApp messages |
| 🔊 Audio | Songs, voice recordings, calls |
| 📍 Location | GPS coordinates, maps |

Every time you use an app, it generates data. Every photo you take, every search you type, every video you watch — all of it becomes data that AI can learn from.

> In 2025, the world creates over **2.5 million GB of data every single minute.** That is more than all the books ever written — created every 60 seconds!

---

## What is a Pattern?

A **pattern** is something that repeats in a predictable way.

Look at this sequence: **2, 4, 6, 8, ___**

Your brain instantly found the pattern: *add 2 each time*. The answer is **10**.

You recognised that pattern without anyone explaining the rule. AI does the same thing — but with millions of data points at once.

### Patterns in Real Life

- 🌦️ **Weather AI** finds patterns: *"When pressure drops + humidity rises + wind increases → it usually rains"*
- 📧 **Spam Filter AI** finds patterns: *"Emails with words like 'FREE!!!' and 'CLICK NOW' are usually spam"*
- 🎵 **Spotify AI** finds patterns: *"This user always skips slow songs on Monday mornings"*

---

## The 3 Steps of How AI Thinks

### Step 1 — Collect Data 📥

First, AI needs a lot of examples. To teach AI to identify mangoes:
- Collect **10,000 photos** of mangoes
- Collect **10,000 photos** of things that are NOT mangoes (apples, oranges, cricket balls)

This collection of examples is called **training data**.

---

### Step 2 — Find Patterns 🔍

The AI studies all 20,000 photos and looks for patterns:
- *"Mangoes are usually yellow or green..."*
- *"Mangoes have an oval shape..."*
- *"Mangoes have a smooth skin with a stem at the top..."*

It does this by doing billions of tiny math calculations — looking at every pixel in every image.

---

### Step 3 — Make Predictions 🎯

Now show the AI a new photo it has never seen. It uses the patterns it found to predict: *"This looks 94% like a mango."*

Show it a lemon — it predicts: *"This is only 3% likely to be a mango."*

This three-step process — **Data → Patterns → Prediction** — is the foundation of ALL artificial intelligence.

---

## A Simple Example: Is This Email Spam?

Let us trace how a spam-detection AI thinks.

**Training data given to AI:**

| Email Content | Label |
|---|---|
| "Congratulations! You WON ₹10 LAKH! Click NOW!" | Spam |
| "Your electricity bill for April is attached" | Not Spam |
| "FREE iPhone! Limited time! Act FAST!" | Spam |
| "Meeting at 3pm in Conference Room B" | Not Spam |

**Patterns the AI discovers:**
- Words like "FREE", "WON", "CLICK NOW", "LIMITED TIME" → often spam
- Emails with many exclamation marks → often spam
- Emails with a sender you have messaged before → usually not spam

**New email arrives:**
> *"Earn ₹5000 daily from home! FREE training! Click NOW!"*

AI checks: multiple spam pattern words found → **Prediction: 98% Spam** ✅

Your Gmail does this for hundreds of millions of emails every day.

---

## The Brain of AI: Neurons 🧠

Human brains have **86 billion neurons** (brain cells) connected to each other. When you learn something, connections between neurons get stronger.

AI copies this idea using **Artificial Neural Networks**:

- Thousands of **artificial neurons** (just mathematical functions)
- Connected together in **layers**
- When AI learns, the connections get **stronger or weaker** based on what works

This is why AI learning is also called **Deep Learning** — because information passes through many deep layers of neurons.

We will explore Neural Networks in detail in Module 3 of the Explorer track! For now, just remember: *AI thinks in layers, just like your brain.*

---

## Patterns All Around You in India 🇮🇳

Can you spot the AI patterns in these Indian scenarios?

🏏 **Cricket AI:** Studies 10 years of batting data → finds pattern: *"This batsman struggles against left-arm spin on wet pitches"* → prediction helps team set a field

🚗 **Ola/Uber AI:** Studies past rides → finds pattern: *"Demand spikes near train stations at 6–9pm on weekdays"* → predicts surge pricing automatically

🏥 **AIIMS AI:** Studies 50,000 chest X-rays → finds pattern: *"This shadow shape at this location = early tuberculosis"* → helps doctors catch disease earlier

---

## Activity: Be the AI! 🎮

Look at this data from a student's study habits:

| Day | Hours Studied | Exam Score |
|-----|--------------|------------|
| Mon | 2 hours | 65% |
| Tue | 4 hours | 78% |
| Wed | 1 hour | 52% |
| Thu | 5 hours | 89% |
| Fri | 3 hours | 71% |

**Can you find the pattern?**

*The more hours studied → the higher the score!*

This is exactly what AI does — it would study this data and predict: *"If this student studies 6 hours, they will likely score around 95-100%."*

Congratulations — you just thought like an AI! 🎉

---

## What You Learned Today ✅

- ✅ **Data** is information — numbers, images, text, audio, or location
- ✅ **Patterns** are repeating trends that AI discovers in data
- ✅ AI thinks in 3 steps: **Collect Data → Find Patterns → Make Predictions**
- ✅ AI copies the human brain using **Artificial Neural Networks**
- ✅ AI is already finding patterns in cricket, ride-sharing, and healthcare in India

---

## 🔒 Ready for More?

The next 5 modules — including **Machine Learning**, **Prompt Engineering**, **Creative AI**, and the final project — are available in the **full Foundation course**.

**Enroll now for ₹799** and complete your journey from curious learner to AI creator! 🚀
`},


  /* ──────────────────────────────────────────────
     FOUNDATION · Module 3
     Machine Learning — Teaching Machines
     Class 5–8
  ────────────────────────────────────────────── */
  'foundation_2': {
    tier: 'foundation', moduleIndex: 2, status: 'published',
    publishedAt: '2026-05-01T00:00:00Z',
    updatedAt:   '2026-05-01T00:00:00Z',
    content: `## 🌲 Machine Learning — Teaching Machines

Welcome back, future AI expert! 🎉

In Module 2, you learned that AI finds **patterns in data** to make predictions. But *how* does it actually learn those patterns?

The answer is **Machine Learning** — and it is one of the most exciting ideas in all of science. By the end of this module, you will understand exactly how computers teach themselves, using examples from your everyday life. Let's dive in! 🚀

---

## 🤔 What is Machine Learning?

Imagine you are learning to ride a bicycle 🚲.

- Your parents don't give you a 100-page manual to read.
- They don't write out every single rule: "if you lean left 3 degrees, pedal faster by 20%…"
- They just let you **try, fail, try again** — and slowly, your body *learns on its own*.

**Machine Learning works exactly the same way.**

Instead of a programmer writing thousands of rules like:
> *"If the email has the word FREE and !!!, mark it as spam"*

We give the computer **thousands of examples** and say:
> *"Here, look at these. Figure out the rules yourself."*

The computer studies the examples, finds the patterns, and then applies what it learned to new situations. That's Machine Learning! 🧠

> **Simple definition:** Machine Learning (ML) is a way of teaching computers by giving them **examples** instead of written rules.

---

## 🍛 The Dabbawala Analogy

Mumbai has over **5,000 dabbawalas** who deliver 200,000 lunchboxes every single day — with almost zero mistakes! 📦

How do new dabbawalas learn the job?

| Method | Description |
|--------|-------------|
| ❌ Manual | Reading a 500-page guide about every street in Mumbai |
| ✅ Learning | Shadowing senior dabbawalas for weeks, making mistakes, getting corrections |

After shadowing hundreds of deliveries, the new dabbawala *automatically* knows:
- Which trains to take at which time
- How to read the colour codes on the boxes
- Which buildings have lifts vs. stairs

**They learned from examples, not rules.** That's Machine Learning in real life! 🎯

---

## 🎓 3 Ways Machines Learn

Just like there are different ways YOU learn (from teachers, from friends, from games), machines also have **3 types of learning**.

---

### 1. 📚 Supervised Learning — Learning with a Teacher

**What it is:** You give the computer **labelled examples** — data where you already know the answer.

**Real-life example — Cricket Score Predictor 🏏**

Imagine you want to teach an AI to predict a cricket team's final score after 10 overs.

You give it historical match data:

| Runs at 10 Overs | Wickets Lost | Final Score |
|-----------------|--------------|-------------|
| 65 | 1 | 180 |
| 42 | 4 | 120 |
| 78 | 0 | 210 |
| 50 | 3 | 135 |

The AI studies thousands of such past matches. It learns the pattern:
> *"Higher runs at 10 overs + fewer wickets = higher final score"*

Now give it today's data: 70 runs, 2 wickets after 10 overs → AI predicts: **~190 runs** 🎯

This is called **Supervised Learning** because the examples had the "correct answer" (final score) provided — like a teacher marking your answers! ✅

---

### 2. 🔍 Unsupervised Learning — Learning by Exploring

**What it is:** You give the computer data **without** labelling anything. The computer finds hidden groups and patterns on its own.

**Real-life example — Swiggy's Food Grouping 🍔**

Swiggy has millions of customers. Without any labels, it groups them by ordering habits:

| Group | What they order |
|-------|----------------|
| 🌅 Group A | Idli-dosa in the morning, light food |
| 🍕 Group B | Pizza and burgers on weekends, night owls |
| 🥗 Group C | Salads and juices, health-conscious |
| 🎉 Group D | Large orders on Fridays — office parties |

Nobody told Swiggy these groups exist. The AI **discovered** them on its own by looking at millions of orders!

Now Swiggy can send the right offers to the right group:
- Group D gets "Party pack discount" on Thursday night 🎊
- Group C gets "New healthy menu" notifications 🥑

This is **Unsupervised Learning** — the machine finds its own patterns without a teacher! 🔍

---

### 3. 🎮 Reinforcement Learning — Learning by Playing

**What it is:** The computer learns by **trial and error**, getting a reward for good decisions and a penalty for bad ones — just like a video game!

**Real-life example — Learning to play LUDO 🎲**

When you first play LUDO:
- You don't read a strategy book
- You just play, make moves, win tokens → 😊 good feeling (reward!)
- You get your tokens eaten → 😣 bad feeling (penalty!)
- After many games, you develop a winning strategy naturally

AI games like **chess programs** and **PUBG bots** learn exactly this way:
- **Win the game** → +100 points (reward) 🏆
- **Lose a life** → -10 points (penalty) 💀
- After millions of games, the AI becomes unbeatable! 🤖

This is **Reinforcement Learning** — the machine learns what works by experiencing rewards and penalties!

---

## 🌳 How ML Makes Decisions — The Decision Tree

One of the simplest ways machines learn is called a **Decision Tree**. It's exactly what it sounds like — a tree of yes/no questions!

Let's see how an AI decides: **"Should this student get extra homework?"**

```
Is the student's test score below 60%?
        |
    YES ─────────────────── NO
        |                       |
Did the student miss        Is the score above 90%?
any classes this week?              |
        |                   YES ───── NO
    YES ─── NO                |         |
        |       |         Give a    No extra
  Give   Give   No        bonus      homework
  extra  extra  extra    challenge!
  work   work   work
```

The computer builds this tree automatically by studying thousands of students' records! 🌲

Decision trees are used everywhere:
- 🏥 Doctors deciding which medicine to prescribe
- 🏦 Banks deciding whether to give a loan
- 📱 Apps deciding what to show you next

---

## 🇮🇳 Machine Learning in Your Daily Life in India

You probably use Machine Learning **at least 10 times every day** without realising it! Here's proof:

### 🎵 JioSaavn / Spotify — Music Recommendation
Every time you skip a song, the app learns: *"This user doesn't like slow songs in the morning."*
After 50 songs, it knows your taste better than your best friend! 🎵

### 🚕 Ola Auto Pricing
The fare changes automatically based on:
- Time of day 🕐
- Number of drivers nearby 🚗
- Upcoming rain forecast 🌧️
- Local events (IPL match nearby!) 🏏

An ML model runs every 5 minutes updating prices across India!

### 📷 Instagram Face Filters
When you use a dog-ears filter, the app must:
1. Find your face in the image 👤
2. Locate your eyes, nose, and ears precisely 👁️
3. Place the filter perfectly on top 🐶

This happens in real-time using a Machine Learning model trained on millions of face photos!

### 🛒 Flipkart "You May Also Like..."
When you search for cricket bat, Flipkart shows: batting gloves, leg guards, cricket bag...

It learned this by studying what **millions of other customers** bought together. That's ML! 🛒

### 🏥 Government Health Schemes
**Ayushman Bharat AI** uses Machine Learning to:
- Predict which villages may have disease outbreaks 🦠
- Help doctors in rural areas diagnose diseases from smartphone photos 📱
- Route ambulances faster using traffic prediction 🚑

---

## 🤔 How Does ML Actually "Learn"? (The Maths Made Simple)

Don't worry — no scary equations here! Just the idea. 😊

Imagine you're teaching a child to guess your age from a photo.

**Round 1:**
- You show a photo of a 30-year-old → child guesses **60** → Very wrong! 😬
- You say: "No, they're 30. You were off by 30 years."
- Child adjusts their thinking.

**Round 2:**
- You show another photo → child guesses **35** → closer! 😊
- "They're actually 32. Off by 3 years."
- Child adjusts again.

**After 1,000 photos:**
- Child guesses **31** for a 30-year-old → Almost perfect! 🎯

The ML computer does this with **millions of examples** and adjusts millions of tiny numbers (called **weights**) every single round. After enough practice — it becomes amazingly accurate! ✨

This process of adjusting weights after every example is called **Training** — and it's the heart of all Machine Learning! 💪

---

## 🎮 Activity: You Are the Algorithm!

Let's play a game where YOU act as a Machine Learning algorithm!

**Task:** Learn to predict if tomorrow will be a good day for a picnic 🧺

**Your training data:**

| Cloudy? | Wind? | Temperature | Good Picnic Day? |
|---------|-------|-------------|-----------------|
| No ☀️ | Low 🍃 | Hot 🥵 | No ❌ |
| No ☀️ | Low 🍃 | Warm 😊 | Yes ✅ |
| Yes 🌥️ | High 💨 | Cold 🥶 | No ❌ |
| No ☀️ | Low 🍃 | Warm 😊 | Yes ✅ |
| Yes 🌥️ | Low 🍃 | Warm 😊 | Yes ✅ |
| No ☀️ | High 💨 | Warm 😊 | No ❌ |

**Now predict:**

| Cloudy? | Wind? | Temperature | Your Prediction |
|---------|-------|-------------|----------------|
| No ☀️ | Low 🍃 | Warm 😊 | ? |
| Yes 🌥️ | High 💨 | Warm 😊 | ? |

**Answers:**
- Row 1: **Yes ✅** — sunny, low wind, warm = perfect picnic day!
- Row 2: **No ❌** — high wind ruins picnics even if warm!

You just did what a Machine Learning algorithm does — found patterns and applied them to new data! 🏆

---

## 🧩 Quick Quiz — Test Yourself! ✏️

**Q1. What is the main difference between normal programming and Machine Learning?**

- A) Normal programming is faster
- **B) ML learns rules from examples; normal programming follows manually written rules ✓**
- C) ML only works on phones

---

**Q2. Which type of ML is used when you give the computer labelled examples with correct answers?**

- **A) Supervised Learning ✓**
- B) Unsupervised Learning
- C) Reinforcement Learning

---

**Q3. Spotify recommending songs based on your history is an example of which type of ML?**

- A) Reinforcement Learning
- **B) Supervised / Recommendation Learning ✓**
- C) A regular "if-else" program

---

**Q4. In Reinforcement Learning, how does the machine improve?**

- A) A human corrects every mistake
- **B) It gets rewards for good actions and penalties for bad actions ✓**
- C) It reads a textbook about the rules

---

## ✅ What You Learned Today

- ✅ **Machine Learning** = teaching computers with **examples** instead of writing rules
- ✅ **Supervised Learning** = learning from labelled data (like cricket score prediction)
- ✅ **Unsupervised Learning** = discovering hidden groups without labels (like Swiggy customer grouping)
- ✅ **Reinforcement Learning** = learning by trial and error with rewards (like games)
- ✅ **Decision Trees** = a simple ML method using yes/no questions
- ✅ ML is already in JioSaavn, Ola, Instagram, Flipkart, and healthcare across India
- ✅ Machines learn by adjusting weights after seeing millions of examples

---

## 🔜 Coming Up in Module 4 →

In the next module — **AI in Daily Life — Indian Examples** — we go even deeper into how AI is quietly running some of the biggest systems in India: from Indian Railways to ISRO, from farming to banking. You'll be amazed at how much AI is already around you! 🇮🇳
`},


  /* ══════════════════════════════════════════════════════
     EXPLORER TRACK — Free Modules (Class 9–12)
  ══════════════════════════════════════════════════════ */

  /* ──────────────────────────────────────────────
     EXPLORER · Module 1
     Python for AI — Fast Track
  ────────────────────────────────────────────── */
  'explorer_0': {
    tier: 'explorer', moduleIndex: 0, status: 'published',
    publishedAt: '2026-05-01T00:00:00Z',
    updatedAt:   '2026-05-01T00:00:00Z',
    content: `## 🐍 Python for AI — Fast Track

Welcome to the Explorer track! 🎉

You already understand *what* AI is. Now it's time to learn the language every AI developer speaks — **Python**.

Python powers Google, Instagram, Netflix, and almost every AI system on the planet. It is also the **#1 skill** companies look for in India's fastest-growing tech jobs. Let's get started. 🚀

---

## Why Python for AI?

There are hundreds of programming languages. So why does everyone use Python for AI?

| Feature | Why It Matters |
|---------|----------------|
| 🔤 Simple syntax | Reads almost like English — easy to learn |
| 📦 Huge library ecosystem | NumPy, Pandas, scikit-learn, TensorFlow — all free |
| 🌍 Massive community | Millions of tutorials, answers on Stack Overflow |
| ⚡ Fast to prototype | Build and test ideas in minutes |
| 🏢 Industry standard | Used at Google, Microsoft, ISRO, Infosys, Zomato |

> **Real talk:** A Python + AI skill set can get you ₹6–25 LPA jobs in India right now. Learning it in Class 11 puts you 3–4 years ahead of most graduates.

---

## Your First Python AI Program

Here is a real Python program. Don't worry if you don't understand every line yet — just notice how readable it is:

\`\`\`python
# Predict whether a student will pass based on study hours
study_hours = [1, 2, 3, 4, 5, 6, 7, 8]
passed      = [0, 0, 0, 1, 1, 1, 1, 1]   # 0 = fail, 1 = pass

# Train a model (just 3 lines!)
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit([[h] for h in study_hours], passed)

# Predict: will a student who studies 5 hours pass?
prediction = model.predict([[5]])
print("Pass?", "Yes ✅" if prediction[0] == 1 else "No ❌")
\`\`\`

**Output:** \`Pass? Yes ✅\`

That is a working AI model in 8 lines of Python! By the end of this track, you will build far more powerful ones.

---

## Python Basics You Need for AI

### 📦 Variables — storing information
\`\`\`python
name        = "Priya"          # text (string)
age         = 17               # number (integer)
score       = 92.5             # decimal (float)
is_enrolled = True             # yes/no (boolean)
\`\`\`

### 📋 Lists — collections of data (AI loves lists!)
\`\`\`python
marks       = [85, 92, 78, 95, 88]
print(sum(marks) / len(marks))   # average = 87.6
\`\`\`

### 🔄 Loops — repeating actions on data
\`\`\`python
temperatures = [22, 35, 28, 40, 18]
for temp in temperatures:
    if temp > 35:
        print(f"{temp}°C — Too hot! 🥵")
    else:
        print(f"{temp}°C — Comfortable 😊")
\`\`\`

### ⚙️ Functions — reusable blocks of logic
\`\`\`python
def predict_result(hours_studied):
    if hours_studied >= 4:
        return "Pass ✅"
    else:
        return "Needs more study 📚"

print(predict_result(6))   # Pass ✅
print(predict_result(2))   # Needs more study 📚
\`\`\`

---

## The 5 Python Libraries Every AI Developer Uses

| Library | What it does | Real use |
|---------|-------------|----------|
| 🔢 **NumPy** | Fast number crunching on huge arrays | Image processing, matrix math |
| 📊 **Pandas** | Load, clean, and analyse datasets | Reading CSV files of lakhs of rows |
| 📈 **Matplotlib** | Draw charts and graphs | Visualising model performance |
| 🤖 **scikit-learn** | Ready-made ML models | Train a classifier in 3 lines |
| 🔥 **TensorFlow / PyTorch** | Deep learning and neural networks | Image recognition, language models |

We cover all five in depth across this course.

---

## 🇮🇳 Python + AI in India — Who's Hiring?

Right now, these Indian companies are actively hiring Python + AI developers:

- **Zomato / Swiggy** — delivery time prediction, fraud detection
- **Ola / Rapido** — route optimisation, surge pricing models
- **CRED / Paytm** — credit risk scoring, transaction fraud AI
- **Flipkart / Amazon India** — recommendation engines, warehouse bots
- **Infosys / TCS / Wipro** — building AI products for global clients
- **ISRO** — satellite image analysis, launch prediction systems

Starting salary for a Python AI developer fresh out of college: **₹5–10 LPA**. With 2–3 years of experience: **₹15–30 LPA**.

---

## ✅ What You Learned in This Preview

- ✅ Python is the **universal language of AI** — simple, powerful, and industry-standard
- ✅ You can build a working AI model in **8 lines of Python**
- ✅ Variables, lists, loops, and functions are the **building blocks** you need
- ✅ **5 key libraries** — NumPy, Pandas, Matplotlib, scikit-learn, TensorFlow
- ✅ Python AI skills are **directly hireable** at top Indian companies today

---

## 🔒 What's Inside the Full Explorer Course →

The next 6 modules go deep:
- **Machine Learning Deep Dive** — linear regression, decision trees, SVM, model evaluation
- **Neural Networks** — build and train your own network from scratch
- **NLP** — make computers understand human language
- **Computer Vision** — teach AI to see and recognise images
- **AI Tools & APIs** — integrate ChatGPT, Gemini, and Claude into your own apps
- **Final Project** — build a fully working AI agent

**Enroll for ₹1,499** — one-time, lifetime access. 🚀
`},

  /* ──────────────────────────────────────────────
     EXPLORER · Module 2
     Machine Learning Deep Dive
  ────────────────────────────────────────────── */
  'explorer_1': {
    tier: 'explorer', moduleIndex: 1, status: 'published',
    publishedAt: '2026-05-01T00:00:00Z',
    updatedAt:   '2026-05-01T00:00:00Z',
    content: `## 📊 Machine Learning Deep Dive

In Module 1 you wrote your first AI model in 8 lines of Python. Now let's pull back the curtain and understand **exactly how Machine Learning works** — the math, the code, and the real-world engineering behind it.

This module gives you the conceptual depth that separates a casual user of AI from someone who can *build* AI systems. 🧠

---

## The ML Workflow — What Real Engineers Do

Every professional ML project follows the same 6-step pipeline:

\`\`\`
1. Define the Problem  →  What exactly do we want to predict?
2. Collect Data        →  Get enough relevant examples
3. Clean & Prepare     →  Handle missing values, fix inconsistencies
4. Choose a Model      →  Which algorithm fits this problem?
5. Train & Evaluate    →  Fit the model, measure performance
6. Deploy              →  Integrate into a real application
\`\`\`

Most beginners skip steps 2–4 and wonder why their model is inaccurate. Professionals spend **70% of their time** on data preparation alone. We cover each step in depth in this course.

---

## 3 Core ML Algorithms You Must Know

### 📈 1. Linear Regression — Predicting Numbers

**Use case:** Predict house prices, stock movement, delivery time

\`\`\`python
from sklearn.linear_model import LinearRegression
import numpy as np

# Training data: area (sq ft) vs price (₹ lakhs)
area  = np.array([[500],[750],[1000],[1250],[1500]])
price = np.array([25, 35, 50, 62, 78])

model = LinearRegression()
model.fit(area, price)

# Predict price of a 1100 sq ft flat
print(model.predict([[1100]]))   # ≈ ₹55 lakhs
\`\`\`

---

### 🌳 2. Decision Tree — Predicting Categories

**Use case:** Loan approval, disease diagnosis, spam detection

\`\`\`python
from sklearn.tree import DecisionTreeClassifier

# Features: [income (L), cibil_score, employment_years]
X = [[5, 650, 2], [12, 750, 5], [3, 580, 1], [20, 800, 10]]
y = ['Rejected', 'Approved', 'Rejected', 'Approved']

clf = DecisionTreeClassifier()
clf.fit(X, y)

# Should we approve this applicant?
print(clf.predict([[8, 700, 3]]))   # Approved ✅
\`\`\`

---

### 🎯 3. Logistic Regression — Yes/No Decisions

**Use case:** Will a user click an ad? Will a patient have diabetes?

\`\`\`python
from sklearn.linear_model import LogisticRegression

# [age, bmi, glucose] → diabetic (1) or not (0)
X = [[25, 22, 85], [45, 30, 140], [60, 35, 180], [30, 24, 90]]
y = [0, 1, 1, 0]

model = LogisticRegression()
model.fit(X, y)

print(model.predict([[50, 32, 160]]))   # [1] → likely diabetic
\`\`\`

---

## How to Measure If Your Model Is Good

Training a model is easy. Knowing whether it's *actually good* is the hard part.

### The Confusion Matrix
After testing on unseen data, count the outcomes:

|  | Predicted: Yes | Predicted: No |
|--|---------------|--------------|
| **Actual: Yes** | ✅ True Positive (TP) | ❌ False Negative (FN) |
| **Actual: No** | ❌ False Positive (FP) | ✅ True Negative (TN) |

### Key Metrics
\`\`\`python
from sklearn.metrics import accuracy_score, precision_score, recall_score

y_true = [1, 0, 1, 1, 0, 1, 0, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1, 0]

print("Accuracy: ", accuracy_score(y_true, y_pred))    # 0.75
print("Precision:", precision_score(y_true, y_pred))   # 0.75
print("Recall:   ", recall_score(y_true, y_pred))      # 0.75
\`\`\`

**Accuracy** alone is misleading! A fraud-detection model that flags 0 fraud cases has 99% accuracy (since fraud is rare) — but catches nothing. That's why we also look at **Precision** and **Recall**.

---

## Overfitting — The #1 Enemy of ML Models

**Overfitting** = your model memorises the training data instead of learning general patterns. It scores 99% on training data and 60% on new data.

\`\`\`python
from sklearn.model_selection import train_test_split

# Always split your data before training!
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model.fit(X_train, y_train)
print("Test accuracy:", model.score(X_test, y_test))  # honest score
\`\`\`

> **Rule:** Never evaluate a model on the same data you trained it on. Always hold back a **test set**.

---

## Real Project: IPL Match Win Predictor 🏏

In the full course, Module 2 ends with a hands-on project:

1. Download 10 years of IPL match data (CSV from Kaggle)
2. Clean the data with Pandas (handle missing overs, player changes)
3. Engineer features (run rate, wickets left, required run rate)
4. Train a Random Forest classifier
5. Predict win probability in real time from user input

By the end you'll have a working web-deployable ML model — not just a script.

---

## ✅ What You Learned in This Preview

- ✅ ML follows a **6-step pipeline** — problem → data → clean → model → evaluate → deploy
- ✅ **Linear Regression, Decision Trees, Logistic Regression** — three algorithms covering 80% of real problems
- ✅ A model must be evaluated on **unseen test data** — never training data
- ✅ **Accuracy alone lies** — use Precision and Recall for imbalanced problems
- ✅ Overfitting is the most common mistake — always use \`train_test_split\`

---

## 🔒 Continue in the Full Explorer Course →

The remaining 6 modules cover Neural Networks, NLP, Computer Vision, AI APIs, and your final AI agent project.

**Enroll for ₹1,499** — build real, deployable AI systems. 🚀
`},

  /* ══════════════════════════════════════════════════════
     EXPERT TRACK — Free Modules (Graduation)
  ══════════════════════════════════════════════════════ */

  /* ──────────────────────────────────────────────
     EXPERT · Module 1
     Advanced ML & MLOps
  ────────────────────────────────────────────── */
  'expert_0': {
    tier: 'expert', moduleIndex: 0, status: 'published',
    publishedAt: '2026-05-01T00:00:00Z',
    updatedAt:   '2026-05-01T00:00:00Z',
    content: `## ⚙️ Advanced ML & MLOps

Welcome to the Expert track. 🏆

You know how to train models. You can evaluate them with proper metrics. But in the real world, building the model is only 20% of the job.

The other 80%? **Making it actually work in production** — reliably, scalably, and reproducibly. That is **MLOps**, and it is the skill that separates a student project from an industry-grade AI system.

---

## What is MLOps?

**MLOps** = Machine Learning Operations. It is the practice of applying DevOps principles to ML systems.

Without MLOps, what typically happens:

> *"The model worked perfectly on my laptop... but crashed in production. The data format changed and nobody noticed. Accuracy dropped from 94% to 61% over three months and we never knew."*

Sound familiar? MLOps prevents all of this. Here is the gap it fills:

| Without MLOps | With MLOps |
|---------------|-----------|
| Model works on researcher's laptop | Containerised, runs identically anywhere |
| Training code lives in a Jupyter notebook | Version-controlled Python scripts |
| No record of which data was used | Full data lineage and versioning |
| Model degrades silently over time | Automated monitoring and alerts |
| Retraining is manual and ad-hoc | Automated retraining pipelines |

---

## The ML Production Lifecycle

\`\`\`
Data Collection → Feature Engineering → Model Training
        ↓                                      ↓
Data Versioning (DVC)              Experiment Tracking (MLflow)
        ↓                                      ↓
Model Registry → Deployment → Monitoring → Retraining
                    ↓               ↓
              (FastAPI/Docker)  (Evidently AI / custom)
\`\`\`

Every box in this diagram is a skill. We cover all of them in this module.

---

## Experiment Tracking with MLflow

Without tracking, you run 50 experiments and forget which hyperparameters gave the best result. MLflow solves this:

\`\`\`python
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

mlflow.set_experiment("credit-risk-model")

with mlflow.start_run():
    # Log parameters
    n_estimators = 200
    max_depth    = 10
    mlflow.log_param("n_estimators", n_estimators)
    mlflow.log_param("max_depth", max_depth)

    # Train
    model = RandomForestClassifier(n_estimators=n_estimators, max_depth=max_depth)
    model.fit(X_train, y_train)

    # Log metrics
    acc = accuracy_score(y_test, model.predict(X_test))
    mlflow.log_metric("accuracy", acc)

    # Save model to registry
    mlflow.sklearn.log_model(model, "random_forest_model")
    print(f"Run logged — Accuracy: {acc:.4f}")
\`\`\`

After 50 runs you open \`mlflow ui\` and instantly compare all experiments in a dashboard.

---

## Data Versioning with DVC

Models are only as good as their data. DVC (Data Version Control) tracks data the same way Git tracks code:

\`\`\`bash
# Initialize DVC in your project
dvc init

# Track a large dataset (never commit CSVs to Git)
dvc add data/training_data.csv

# Store data remotely (S3, GCS, local NAS)
dvc remote add -d myremote s3://my-bucket/dvc-store
dvc push

# Later, on a different machine, restore exact data
dvc pull
\`\`\`

Now every model version is reproducible — you know exactly which data, code, and hyperparameters produced it.

---

## Serving a Model as an API

Once trained, your model needs to serve predictions to applications. The industry standard is a REST API:

\`\`\`python
# serve.py — production model server
from fastapi import FastAPI
import mlflow.sklearn
import numpy as np

app   = FastAPI()
model = mlflow.sklearn.load_model("models:/credit-risk-model/Production")

@app.post("/predict")
def predict(income: float, cibil: int, years: int):
    features = np.array([[income, cibil, years]])
    pred     = model.predict(features)[0]
    prob     = model.predict_proba(features)[0][pred]
    return {"decision": "Approved" if pred == 1 else "Rejected",
            "confidence": round(float(prob) * 100, 1)}
\`\`\`

\`\`\`bash
# Run locally
uvicorn serve:app --reload

# Now any app can call:
# POST /predict  {"income": 8, "cibil": 720, "years": 4}
# → {"decision": "Approved", "confidence": 87.3}
\`\`\`

---

## 🇮🇳 MLOps in India — Who Is Doing It?

- **Flipkart** runs 400+ ML models in production simultaneously — MLOps keeps them all healthy
- **Zomato** uses automated retraining pipelines that update delivery ETA models every 6 hours
- **PhonePe** monitors their fraud detection model 24/7, automatically alerting when accuracy drops
- **Ola Maps** uses CI/CD for their routing models — new model versions are A/B tested before full deployment

MLOps engineers in India earn **₹15–40 LPA** — one of the highest-paying niches in tech.

---

## ✅ What You Learned in This Preview

- ✅ **MLOps** closes the gap between research models and production systems
- ✅ **MLflow** tracks experiments so you never lose a good model version
- ✅ **DVC** versions data the same way Git versions code — full reproducibility
- ✅ **FastAPI** turns any trained model into a production REST API in 20 lines
- ✅ Top Indian companies run hundreds of ML models in production using these exact tools

---

## 🔒 Full Expert Track →

The remaining 7 modules cover LLMs & Transformers, the Claude API, Claude Code, Model Context Protocol, Cloud AI (AWS/GCP/Azure), Multi-Agent Systems, and a cloud-level production project.

**Enroll for ₹2,499** — become genuinely industry-ready. 🏆
`},

  /* ──────────────────────────────────────────────
     EXPERT · Module 2
     LLMs, Transformers & Foundation Models
  ────────────────────────────────────────────── */
  'expert_1': {
    tier: 'expert', moduleIndex: 1, status: 'published',
    publishedAt: '2026-05-01T00:00:00Z',
    updatedAt:   '2026-05-01T00:00:00Z',
    content: `## 🔥 LLMs, Transformers & Foundation Models

The most important shift in AI history happened in 2017 — a paper called **"Attention Is All You Need"** introduced the **Transformer architecture** and changed everything.

GPT-4, Claude, Gemini, LLaMA, BERT — every major language model today is built on this one idea. In this module you will understand exactly how it works, and why it is so powerful. 🧠

---

## Before Transformers — Why Old Methods Failed

Before 2017, language AI used **Recurrent Neural Networks (RNNs)**. They processed text word by word, left to right:

\`\`\`
"The cricket player who had injured his knee last year finally scored a century"
  ↓        ↓      ↓    ↓    ↓         ↓     ↓     ↓    ↓      ↓
 The   cricket  player who  had    injured  his  knee  last   year ...
\`\`\`

By the time the RNN reached "scored", it had almost forgotten "cricket player" — it couldn't connect distant words. Translations were poor, understanding was shallow.

**Transformers solved this with one idea: Attention.**

---

## The Attention Mechanism — The Core Idea

When you read "The bat flew out of the cave", how do you know *bat* means an animal and not a cricket bat?

You look at **context**: "flew" and "cave" tell you it's an animal. Your brain connects distant words. Attention does the same for AI.

For every word, Attention asks: **"Which other words in this sentence are most relevant to understanding THIS word?"**

\`\`\`
"The cricket player scored a century at the Eden Gardens stadium"

For the word "century":
  cricket player  → 0.45  (high relevance — sports context)
  scored          → 0.38  (high relevance — scoring action)
  Eden Gardens    → 0.12  (moderate — location context)
  the, at, a      → 0.02  (low — just grammar words)
\`\`\`

These relevance scores (called **attention weights**) let the model understand that "century" here means 100 runs, not 100 years.

---

## The Transformer Architecture

\`\`\`
Input Text
    ↓
[Tokenizer] → "cricket" "player" "scored" → token IDs
    ↓
[Embedding Layer] → converts tokens to vectors (numbers)
    ↓
[Multi-Head Attention] × 12 layers → finds relationships between all tokens simultaneously
    ↓
[Feed-Forward Network] × 12 layers → processes and transforms representations
    ↓
[Output Layer] → predicts next token probabilities
\`\`\`

The key insight: instead of processing left-to-right like RNNs, Transformers look at **all words simultaneously** — making them far more powerful AND faster to train on GPUs.

---

## Foundation Models — Train Once, Use Everywhere

A **Foundation Model** is a massive Transformer trained on enormous amounts of data that can be **fine-tuned** for specific tasks.

| Model | Made by | Parameters | Trained on |
|-------|---------|-----------|-----------|
| GPT-4 | OpenAI | ~1.8 trillion | Internet, books, code |
| Claude 3.5 | Anthropic | Unknown | High-quality curated data |
| Gemini 1.5 | Google | Unknown | Multimodal (text, image, video) |
| LLaMA 3 | Meta | 8B–70B | Open source, free to use |

**Fine-tuning** lets you take one of these models and specialise it:

\`\`\`python
# Using Hugging Face to fine-tune LLaMA on medical data
from transformers import AutoModelForCausalLM, AutoTokenizer, Trainer

model     = AutoModelForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-8B")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3-8B")

# your_medical_dataset → fine-tune → specialized medical AI
trainer = Trainer(model=model, train_dataset=your_medical_dataset)
trainer.train()
# Now the model can answer medical questions far better than the base model
\`\`\`

---

## BERT vs GPT — Two Flavours of Transformers

| | BERT | GPT |
|--|------|-----|
| Direction | Reads whole sentence at once (bidirectional) | Predicts left to right (unidirectional) |
| Best for | Classification, NER, question answering | Text generation, conversation, coding |
| Indian use | Google Search ranking, Flipkart search | ChatGPT, Claude, Gemini |

\`\`\`python
# BERT for sentiment analysis of product reviews
from transformers import pipeline

sentiment = pipeline("sentiment-analysis",
                     model="nlptown/bert-base-multilingual-uncased-sentiment")

reviews = [
    "यह कोर्स बहुत अच्छा है! मुझे बहुत कुछ सीखने को मिला।",
    "Delivery was late and product was damaged",
    "Best purchase I made this year!"
]
for r in reviews:
    print(sentiment(r))
\`\`\`

BERT supports Hindi and other Indian languages out of the box — making it invaluable for Indian AI products.

---

## 🇮🇳 LLMs Reshaping India

- **Krutrim** (Ola's AI) — India's first homegrown LLM, trained on Indian languages and contexts
- **Sarvam AI** — building LLMs specifically for Indic languages (Hindi, Tamil, Telugu, etc.)
- **IIT research** — multiple IITs are building domain-specific LLMs for agriculture, healthcare, and judiciary
- **Indian Banks** — HDFC, ICICI are deploying LLMs for customer service and loan processing
- **Startups** — hundreds of Indian AI startups are building products on top of foundation models

LLM Engineers in India earn **₹20–50 LPA** — the highest-paying AI specialisation right now.

---

## ✅ What You Learned in This Preview

- ✅ **Transformers** replaced RNNs by processing all words simultaneously with the Attention mechanism
- ✅ **Attention weights** allow AI to connect distant words in context — like "century" and "cricket player"
- ✅ **Foundation Models** are trained once on massive data and fine-tuned for specific tasks
- ✅ **BERT** is bidirectional (classification); **GPT** is unidirectional (generation)
- ✅ India is building its own LLMs — Krutrim, Sarvam, and dozens of startups

---

## 🔒 Continue in the Full Expert Track →

Upcoming: Claude API & Prompt Engineering Pro, Claude Code for AI-assisted development, MCP, Cloud AI platforms, Multi-agent systems, and a production-scale final project.

**Enroll for ₹2,499** and build with the latest LLMs. 🔥
`},

  /* ══════════════════════════════════════════════════════
     AI ENGINEERING TRACK — Free Modules (Professional)
  ══════════════════════════════════════════════════════ */

  /* ──────────────────────────────────────────────
     AI ENGINEERING · Module 1
     Data Engineering Fundamentals
  ────────────────────────────────────────────── */
  'ai_engineer_0': {
    tier: 'ai_engineer', moduleIndex: 0, status: 'published',
    publishedAt: '2026-05-01T00:00:00Z',
    updatedAt:   '2026-05-01T00:00:00Z',
    content: `## 🏗️ Data Engineering Fundamentals

Welcome to the AI Engineering track — the most career-accelerating path in this program.

AI models get all the attention. But the truth every senior engineer knows is this: **without clean, reliable data pipelines, there is no AI**. Data Engineering is the invisible foundation that every ML system runs on.

This is the module that starts your journey from "knows some Python" to "builds production-grade AI infrastructure". 🚀

---

## What is Data Engineering?

**Data Engineering** is the practice of designing, building, and maintaining the systems that collect, store, transform, and deliver data for analysis and AI.

Think of it as the **plumbing of data** — nobody notices it when it works, but everything breaks when it doesn't.

\`\`\`
Raw Data Sources          Data Engineering            Consumers
─────────────────    ──────────────────────────    ──────────────────
App databases     →  Ingest → Clean → Transform →  ML Models
API streams       →  Store → Validate → Serve   →  Dashboards
IoT sensors       →  Schedule → Monitor → Alert  →  Data Scientists
User logs         →                                  Business Teams
\`\`\`

---

## ETL vs ELT — The Two Paradigms

**ETL (Extract → Transform → Load)** — traditional approach:
1. Extract data from source
2. Transform it in a separate processing engine
3. Load the clean data into a warehouse

**ELT (Extract → Load → Transform)** — modern cloud approach:
1. Extract data from source
2. Load raw data directly into the warehouse (storage is cheap)
3. Transform inside the warehouse using SQL

| | ETL | ELT |
|--|-----|-----|
| When data is transformed | Before loading | After loading |
| Where it's transformed | Separate server | Inside the data warehouse |
| Best for | On-premise, sensitive data | Cloud, big data, analytics |
| Tools | Informatica, SSIS | dbt, Dataform, BigQuery |
| Indian company using it | TCS legacy systems | Zomato, Razorpay, Meesho |

**Modern data teams use ELT** — we cover dbt in depth later in this course.

---

## The Data Stack — Tools Every Engineer Must Know

\`\`\`
INGESTION          STORAGE            TRANSFORMATION     ORCHESTRATION
──────────         ─────────          ──────────────     ─────────────
Airbyte         →  Amazon S3       →  dbt             →  Apache Airflow
Fivetran           Google BigQuery     Spark SQL          Prefect
Kafka (streaming)  Snowflake           Python (Pandas)    Dagster
Custom Python      Delta Lake          SQL
\`\`\`

We cover every layer of this stack in this course. By the end, you can design and build the complete data infrastructure for a real company.

---

## Your First Data Pipeline

Here is a real, working data pipeline in Python:

\`\`\`python
import pandas as pd
import sqlite3
from datetime import datetime

# ── EXTRACT ──────────────────────────────────────────
def extract():
    # In production: read from Postgres, APIs, Kafka...
    df = pd.read_csv("raw_orders.csv")
    print(f"Extracted {len(df)} rows")
    return df

# ── TRANSFORM ────────────────────────────────────────
def transform(df):
    # Clean: drop duplicates, fix types
    df = df.drop_duplicates(subset='order_id')
    df['order_date'] = pd.to_datetime(df['order_date'])
    df['amount']     = pd.to_numeric(df['amount'], errors='coerce')
    df = df.dropna(subset=['amount'])

    # Enrich: add derived columns
    df['year_month']    = df['order_date'].dt.to_period('M')
    df['is_high_value'] = df['amount'] > 5000

    print(f"Transformed: {len(df)} clean rows")
    return df

# ── LOAD ─────────────────────────────────────────────
def load(df, db_path="warehouse.db"):
    conn = sqlite3.connect(db_path)
    df.to_sql("orders_clean", conn, if_exists='replace', index=False)
    conn.close()
    print(f"Loaded to warehouse at {datetime.now()}")

# ── RUN PIPELINE ─────────────────────────────────────
if __name__ == "__main__":
    raw  = extract()
    clean = transform(raw)
    load(clean)
\`\`\`

This is a simple version. In production, each step runs on distributed infrastructure handling terabytes — but the pattern is identical.

---

## Data Warehouse vs Data Lake vs Lakehouse

| | Data Warehouse | Data Lake | Data Lakehouse |
|--|---------------|-----------|---------------|
| Data type | Structured only | Any (raw) | Any |
| Storage | Expensive, fast | Cheap, S3/GCS | S3/GCS + query layer |
| Query speed | Very fast (pre-organised) | Slow (needs processing) | Fast (Delta/Iceberg) |
| Best for | Business reports, dashboards | Raw storage, ML training | Both — modern choice |
| Examples | BigQuery, Snowflake, Redshift | AWS S3, GCS, ADLS | Databricks, Apache Iceberg |

**Most Indian data teams are moving to the Lakehouse architecture** — cheap storage with fast SQL queries directly on raw data. We build one in Module 5 of this course.

---

## 🇮🇳 Data Engineering in India — Real Scale

| Company | Data Volume | What DE team does |
|---------|------------|-------------------|
| **Zepto** | Millions of orders/day | Real-time inventory pipelines feeding demand ML models |
| **Razorpay** | ₹50,000 Cr+ transactions | Fraud detection pipelines processing every payment |
| **IRCTC** | 8M ticket queries/day | Data pipelines for surge pricing and availability prediction |
| **Jio** | Petabytes of network data | Streaming pipelines for network quality AI |
| **Meesho** | 140M+ users | Supply chain data pipelines for seller ML models |

**Salary range for Data Engineers in India:**
- Fresher: ₹8–15 LPA
- 2–4 years: ₹20–40 LPA
- Senior/Principal: ₹40–80 LPA

Data Engineering is one of the **fastest-growing, highest-paying roles** in Indian tech right now.

---

## ✅ What You Learned in This Preview

- ✅ **Data Engineering** is the infrastructure that makes AI possible — models need clean, reliable data
- ✅ **ETL vs ELT** — modern teams use ELT on cloud warehouses for scalability
- ✅ The **modern data stack**: Airbyte → S3/BigQuery → dbt → Airflow
- ✅ A complete working **ETL pipeline** in Python — Extract, Transform, Load
- ✅ **Warehouse vs Lake vs Lakehouse** — and why Indian companies are choosing Lakehouse
- ✅ Data Engineering pays **₹8–80 LPA** depending on experience

---

## 🔒 Full AI Engineering Track →

The remaining 9 modules cover Python & SQL mastery, Apache Spark, Airflow orchestration, Cloud Data Platforms (BigQuery, Redshift, S3), LLM integration, Building AI Agents, and a production-grade final project.

**Enroll for ₹3,999** — build the infrastructure that powers India's AI industry. ⚡
`},

  /* ──────────────────────────────────────────────
     AI ENGINEERING · Module 2
     Python & SQL for Data Engineering
  ────────────────────────────────────────────── */
  'ai_engineer_1': {
    tier: 'ai_engineer', moduleIndex: 1, status: 'published',
    publishedAt: '2026-05-01T00:00:00Z',
    updatedAt:   '2026-05-01T00:00:00Z',
    content: `## 🐍 Python & SQL for Data Engineering

Module 1 gave you the big picture of data engineering. Now we get hands-on with the two tools you will use every single day on the job: **Python** and **SQL**.

Data engineers don't just know these languages — they use them to move, transform, and validate millions of rows reliably. This module gives you the production-grade patterns that textbooks skip. 🛠️

---

## Python for Data Engineering — Beyond Basics

You probably know basic Python. Data engineering needs specific patterns. Here are the most important ones:

### 🔄 Chunked Processing — Handle Any File Size

\`\`\`python
import pandas as pd

# ❌ This crashes on a 10GB file
df = pd.read_csv("huge_transactions.csv")

# ✅ Process in chunks — works on any size
chunk_size = 100_000  # 100k rows at a time
results = []

for chunk in pd.read_csv("huge_transactions.csv", chunksize=chunk_size):
    # Process each chunk independently
    filtered = chunk[chunk['amount'] > 1000]
    aggregated = filtered.groupby('city')['amount'].sum()
    results.append(aggregated)

final = pd.concat(results).groupby(level=0).sum()
print(final)
\`\`\`

### ⚡ Parallel Processing — Use All Your CPU Cores

\`\`\`python
from concurrent.futures import ThreadPoolExecutor
import requests

def fetch_api_data(city):
    url = f"https://api.weather.example.com/current?city={city}"
    return requests.get(url).json()

cities = ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad",
          "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat"]

# Sequential: ~10 seconds (one city at a time)
# Parallel: ~1 second (all cities simultaneously)
with ThreadPoolExecutor(max_workers=10) as executor:
    results = list(executor.map(fetch_api_data, cities))

print(f"Fetched weather for {len(results)} cities in parallel")
\`\`\`

### 🔁 Retry Logic — Handle Real-World Failures

\`\`\`python
import time

def fetch_with_retry(url, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            wait = 2 ** attempt  # exponential backoff: 1s, 2s, 4s
            print(f"Attempt {attempt+1} failed: {e}. Retrying in {wait}s...")
            time.sleep(wait)
    raise RuntimeError(f"Failed after {max_retries} attempts")
\`\`\`

Production pipelines hit failures constantly. Retry logic is non-negotiable.

---

## SQL for Data Engineering — The Patterns That Matter

### Window Functions — Analytics Without Loops

\`\`\`sql
-- Rank customers by total spend within each city
SELECT
    customer_id,
    city,
    total_spend,
    RANK() OVER (PARTITION BY city ORDER BY total_spend DESC) AS city_rank,
    SUM(total_spend) OVER (PARTITION BY city) AS city_total,
    ROUND(total_spend * 100.0 /
          SUM(total_spend) OVER (PARTITION BY city), 2) AS pct_of_city
FROM customer_orders
ORDER BY city, city_rank;
\`\`\`

This query — which would require complex loops in Python — runs in milliseconds on a billion rows in BigQuery.

### CTEs — Readable, Maintainable Complex Queries

\`\`\`sql
-- Find high-value customers who churned in last 30 days
WITH customer_last_order AS (
    SELECT
        customer_id,
        MAX(order_date)   AS last_order_date,
        SUM(amount)       AS lifetime_value
    FROM orders
    GROUP BY customer_id
),
high_value AS (
    SELECT customer_id, last_order_date, lifetime_value
    FROM customer_last_order
    WHERE lifetime_value > 50000
),
churned AS (
    SELECT customer_id, last_order_date, lifetime_value
    FROM high_value
    WHERE last_order_date < CURRENT_DATE - INTERVAL '30 days'
)
SELECT c.customer_id, u.name, u.email,
       c.lifetime_value, c.last_order_date
FROM churned c
JOIN users u USING (customer_id)
ORDER BY c.lifetime_value DESC;
\`\`\`

**CTEs make complex queries readable.** Senior engineers write CTEs — junior engineers write nested subqueries nobody can maintain.

### Incremental Loading — Only Process New Data

\`\`\`sql
-- Only load records newer than last pipeline run
-- (avoids reprocessing the entire table every time)
INSERT INTO warehouse.orders_clean
SELECT *
FROM staging.orders_raw
WHERE created_at > (
    SELECT COALESCE(MAX(created_at), '1970-01-01')
    FROM warehouse.orders_clean
);
\`\`\`

Running a full table scan every hour is expensive and slow. Incremental loading is standard in production pipelines.

---

## Data Validation — The Skill Nobody Teaches

The biggest difference between junior and senior data engineers is **data validation**. Broken data flowing silently into production models is catastrophic.

\`\`\`python
import pandas as pd

def validate_orders(df: pd.DataFrame) -> None:
    errors = []

    # Check for nulls in critical columns
    for col in ['order_id', 'customer_id', 'amount', 'order_date']:
        null_count = df[col].isnull().sum()
        if null_count > 0:
            errors.append(f"NULL in {col}: {null_count} rows")

    # Check business rules
    if (df['amount'] <= 0).any():
        errors.append(f"Non-positive amounts: {(df['amount'] <= 0).sum()} rows")

    if df['order_id'].duplicated().any():
        errors.append(f"Duplicate order_ids: {df['order_id'].duplicated().sum()}")

    # Check for data freshness
    max_date = pd.to_datetime(df['order_date']).max()
    if (pd.Timestamp.now() - max_date).days > 2:
        errors.append(f"Stale data — latest record is {max_date}")

    if errors:
        raise ValueError("Data validation failed:\n" + "\n".join(errors))

    print(f"✅ Validation passed — {len(df):,} rows, all checks clean")
\`\`\`

In production, this validation runs automatically before any data reaches the ML models.

---

## 🇮🇳 What Indian Companies Pay for These Skills

Based on current Naukri, LinkedIn, and Glassdoor data (2025–2026):

| Role | Skills | Typical CTC |
|------|--------|------------|
| Data Engineer (0–2 yr) | Python, SQL, Pandas | ₹8–18 LPA |
| Data Engineer (2–5 yr) | + Spark, Airflow, dbt | ₹20–40 LPA |
| Senior Data Engineer | + Cloud, Architecture | ₹35–60 LPA |
| Data Engineering Lead | + ML pipelines, LLM infra | ₹50–90 LPA |

Companies actively hiring right now: **Swiggy, Zepto, PhonePe, Razorpay, Meesho, Groww, Zerodha, CRED, Juspay, and every major Indian bank**.

---

## ✅ What You Learned in This Preview

- ✅ **Chunked processing** — handle files of any size without running out of memory
- ✅ **Parallel execution** — cut API fetch times by 10× using ThreadPoolExecutor
- ✅ **Retry logic** — production pipelines must handle failures gracefully
- ✅ **Window functions** — analytics queries that replace thousands of lines of Python
- ✅ **CTEs** — the difference between readable production SQL and unmaintainable spaghetti
- ✅ **Incremental loading** — only process new data, not the full table every time
- ✅ **Data validation** — catch broken data before it reaches your ML models

---

## 🔒 Full AI Engineering Track →

Next: **Apache Spark** for distributed processing of billions of rows, **Airflow** for scheduling and monitoring pipelines, **Cloud Data Platforms** on BigQuery/Redshift/S3, **LLM Integration**, and building production **AI Agents**.

**Enroll for ₹3,999** — build the infrastructure powering India's AI revolution. ⚡
`},

};
