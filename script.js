let Questions = [];
let correctAnswer;
let ques = document.querySelector("#question");
let opt = document.querySelector("#options");
let btn = document.querySelector("#submit");

const url =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

const fetchQuestions = async () => {
  try {
    let response = await fetch(url);
    let data = await response.json();

    Questions = data.results;
  } catch (error) {
    console.log(error);
    ques.innerHTML = `<h5 style='color: red'>${error}</h5>`;
  }
};
fetchQuestions();

let currQuestion = 0;
let score = 0;

if (Questions.length === 0) {
  ques.innerHTML = `<h5 style="font-size: 2rem;">Please Wait!!
    Loading Questions...</h5>`;
}

const loadQuestion = () => {
  let currentQuestion = Questions[currQuestion].question
    .replace(/&quot;/g, "")
    .replace(/&#039;/g, "");
  console.log(currentQuestion);
  ques.innerText = currentQuestion;
  opt.innerHTML = "";
  correctAnswer = Questions[currQuestion].correct_answer.replace(/&#039;/g, "");
  console.log(correctAnswer);
  const incorrectAnswers = Questions[currQuestion].incorrect_answers.map(
    (answer) => answer.replace(/&#039;/g, "")
  );
  //const options = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5);
  incorrectAnswers.unshift(correctAnswer);
  options = incorrectAnswers.sort(() => Math.random() - 0.5);
  console.log(options);
  options.forEach((option) => {
    const choicesdiv = document.createElement("div");
    choicesdiv.setAttribute("class", "option");
    choicesdiv.textContent = option;
    opt.appendChild(choicesdiv);
    choicesdiv.addEventListener("click", () => {
      // Remove the id attribute from all elements with class "option"
      document.querySelectorAll(".option").forEach((element) => {
        element.removeAttribute("id");
      });
      // Set the id attribute on the clicked element
      choicesdiv.setAttribute("id", "selected");
    });
  });
};

setTimeout(() => {
  loadQuestion();
  if (Questions.length === 0) {
    ques.innerHTML = `<h5 style='color: red'>Unable
          to fetch data, Please try again!!</h5>`;
  }
}, 2000);

const loadScore = () => {
  let quizContainer = document.querySelector("#quiz-container");
  const title = document.createElement("h1");
  title.innerText = "Your Score";
  const scoreBoard = document.createElement("div");
  scoreBoard.setAttribute("id", "score-board");
  const score1 = document.createElement("div");
  score1.setAttribute("class", "score");
  const correctTitle = document.createElement("div");
  correctTitle.innerText = "Correct";
  const correctScore = document.createElement("div");
  correctScore.setAttribute("id", "correct");
  correctScore.textContent = score;
  const score2 = document.createElement("div");
  score2.setAttribute("class", "score");
  const incorrectTitle = document.createElement("div");
  incorrectTitle.textContent = "Incorrect";
  const incorrectScore = document.createElement("div");
  incorrectScore.setAttribute("id", "correct");
  incorrectScore.textContent = Questions.length - score;
  const button = document.createElement("button");
  button.setAttribute("id", "load");
  button.textContent = "Play Again.";

  quizContainer.appendChild(title);
  quizContainer.appendChild(scoreBoard);
  scoreBoard.appendChild(score1);
  score1.appendChild(correctTitle);
  score1.appendChild(correctScore);
  scoreBoard.appendChild(score2);
  score2.appendChild(incorrectTitle);
  score2.appendChild(incorrectScore);
  quizContainer.appendChild(button);

  button.addEventListener("click", () => {
    location.reload();
  });
};

const nextQuestion = () => {
  if (currQuestion < Questions.length - 1) {
    currQuestion++;
    loadQuestion();
  } else {
    ques.remove();
    opt.remove();
    btn.remove();
    loadScore(); // Call loadScore when all questions are answered
  }
};

const checkAns = () => {
  btn.addEventListener("click", () => {
    const selectedOption = document.querySelector(".option#selected");
    if (selectedOption) {
      const selectedAnswer = selectedOption.textContent;
      if (selectedAnswer === correctAnswer) {
        score++;
      }
      nextQuestion();
    } else {
      console.log("Please select an answer.");
    }
  });
};

checkAns();




editButton.addEventListener("click", () => {
  textContent.remove();
  let editField = document.createElement("input");
  editField.type = "text";
  editField.placeholder = "New Task...";
  if (editField.value.trim() === "") {
      alert("Enter New Task");
  } else {
      let newContent = document.createElement("div"); // Rename variable
      newContent.innerHTML = editField.value.trim(); // Rename variable
      editField.remove();
      newTask.appendChild(newContent);
  }
});