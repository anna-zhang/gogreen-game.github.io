(function() {
  var questions = [{
    question: "What can NOT be recycled?",
    choices: ["Apple", "Plastic Bottles", "Newspapers",],
    correctAnswer: "Apple"
  },
   {
    question: "What can be put in the compost bin?",
    choices: ["T-shirt", "Styrofoam", "Egg Shell",],
    correctAnswer: "Egg Shell"
  }, {
    question: "What can be recycled?",
    choices: ["Tea Bag", "Milk Carton", "Coffee Grinds",],
    correctAnswer:"Milk Carton"
  }, {
    question: "How many years will it take for a plastic bottle to decompose?",
    choices: ["1 Million Years", "50% of an Average Human Life Span",  "700 Years", ],
    correctAnswer: "700 Years"
  }, {
    question: "What diseases are caused by garbage?",
    choices: ["Stomach Pain", "Vomiting", "Diarrhea", "Cholera", "Typhoid", "All the Above",],
    correctAnswer: "All the Above"
  }
];
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();
  var numCorrect = 0;

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    var answer = selections[questionCounter];

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    }
    else{

        if (questions[questionCounter].choices[answer] === questions[questionCounter].correctAnswer){
          alert("Good job!!");
          numCorrect++;

        }
        else{
          alert("Sorry the correct answer is " + questions[questionCounter].correctAnswer)
        }
      questionCounter++;
      displayNext();
    }
    lastindex = questions.length - 1;




  });


  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
      var score = $('<p>',{id: 'question'});
      // var myanswer = selections[i];
      // console.log(typeof myanswer)
//       var numCorrect = 0;
//       for (var i = 0; i < selections.length; i++) {
//         console.log(questions[i].choices)//.choices[myanswer])
//         console.log(questions[i].correctAnswer)
//         if (questions[i].choices[myanswer] === questions[i].correctAnswer){
//
// //
//           numCorrect++;
//         }
//       }

      score.append('You got ' + numCorrect + ' questions out of ' +
                   questions.length + ' right!!!');
      displayImage();
      return score;
    }
    function displayImage() {
      var emoji = document.getElementById('emoji')
      if (numCorrect===5){
        emoji.src="Images/Slightly_Smiling_Face_Emoji.png";
        emoji.width="60";
      }
      else {
        emoji.src="Images/Sad_Face_Emoji.png";
        emoji.width="60";
      }
      emoji.style.display = "block";
    }
})();
