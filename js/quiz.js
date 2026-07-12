/* Shared Quiz Functionality for DTC Eligibility Project */

// Generic quiz functionality
function setupQuiz(quizAnswers, totalQuestions) {
  let currentScore = 0;
  let answeredQuestions = new Set();

  // Initialize quiz inputs
  document.querySelectorAll('.quiz-card input[type="radio"]').forEach(input => {
    input.addEventListener('change', function() {
      const card = this.closest('.quiz-card');
      const qNum = card.getAttribute('data-q');
      const feedback = document.getElementById('fb-' + qNum);
      const answer = quizAnswers[qNum];

      // Remove previous feedback
      card.classList.remove('correct', 'incorrect');

      if (this.value === answer.correct) {
        card.classList.add('correct');
        feedback.className = 'quiz-feedback show correct';
        feedback.innerHTML = '✓ ' + answer.explanation;

        // Update score if this question hasn't been answered correctly before
        if (!answeredQuestions.has(qNum)) {
          answeredQuestions.add(qNum);
          currentScore++;
          updateScoreDisplay();
        }
      } else {
        card.classList.add('incorrect');
        feedback.className = 'quiz-feedback show incorrect';
        feedback.innerHTML = '✗ ' + answer.explanation;

        // If this was previously correct, remove from score
        if (answeredQuestions.has(qNum)) {
          answeredQuestions.delete(qNum);
          currentScore--;
          updateScoreDisplay();
        }
      }
    });
  });

  function updateScoreDisplay() {
    const scoreFill = document.getElementById('quizScoreFill');
    const scoreText = document.getElementById('quizScoreText');

    if (scoreFill && scoreText) {
      const percentage = (currentScore / totalQuestions) * 100;
      scoreFill.style.width = percentage + '%';
      scoreText.textContent = currentScore + ' / ' + totalQuestions + ' correct (' + percentage.toFixed(0) + '%)';

      // Color coding based on score
      if (percentage >= 80) {
        scoreFill.style.background = 'var(--green)';
      } else if (percentage >= 60) {
        scoreFill.style.background = 'var(--gold)';
      } else {
        scoreFill.style.background = 'var(--red)';
      }
    }
  }

  // Reset quiz
  function resetQuiz() {
    currentScore = 0;
    answeredQuestions.clear();
    updateScoreDisplay();

    // Reset all inputs
    document.querySelectorAll('.quiz-card input[type="radio"]').forEach(input => {
      input.checked = false;
    });

    // Reset all cards
    document.querySelectorAll('.quiz-card').forEach(card => {
      card.classList.remove('correct', 'incorrect');
    });

    // Reset all feedback
    document.querySelectorAll('.quiz-feedback').forEach(fb => {
      fb.className = 'quiz-feedback';
      fb.innerHTML = '';
    });

    const result = document.getElementById('quizResult');
    if (result) result.className = 'quiz-result';
  }

  // Expose this closure-aware reset globally so the page's static
  // "Reset Quiz" button (onclick="resetQuiz()") stays in sync with the
  // internal score state instead of relying on a separate, stale definition.
  window.resetQuiz = resetQuiz;

  // Only create a dynamic reset button if the page doesn't already have one
  if (!document.querySelector('.quiz-reset') && !document.querySelector('.quiz-btn-secondary')) {
    const quizSection = document.querySelector('.quiz-section');
    if (quizSection) {
      const resetBtn = document.createElement('button');
      resetBtn.className = 'quiz-reset';
      resetBtn.textContent = 'Reset Quiz';
      resetBtn.onclick = resetQuiz;

      const quizActions = document.querySelector('.quiz-actions');
      if (quizActions) {
        quizActions.appendChild(resetBtn);
      }
    }
  }
}

// Initialize quiz when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    // This will be called with document-specific answers
  });
} else {
  // This will be called with document-specific answers
}