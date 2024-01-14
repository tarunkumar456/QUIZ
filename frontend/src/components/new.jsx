<>
      <div className="start_btn"><button>Start Quiz</button></div>
      <div className="info_box">
        <div className="info-title"><span>Some Rules of this Quiz</span></div>
        <div className="info-list">
          <div className="info">1. You will have only <span>15 seconds</span> per each question.</div>
          <div className="info">2. Once you select your answer, it can't be undone.</div>
          <div className="info">3. You can't select any option once time goes off.</div>
          <div className="info">4. You can't exit from the Quiz while you're playing.</div>
          <div className="info">5. You'll get points on the basis of your correct answers.</div>
        </div>
        <div className="buttons">
          <button className="quit">Exit Quiz</button>
          <button className="restart">Continue</button>
        </div>
      </div>
      <div className="quiz_box">
        <header>
          <div className="title">Awesome Quiz Application</div>
          <div className="timer">
            <div className="time_left_txt">Time Left</div>
            <div className="timer_sec">15</div>
          </div>
          <div className="time_line"></div>
        </header>
        <section>
          <div className="que_text">

          </div>
          <div className="option_list">

          </div>
        </section>
        <footer>
          <div className="total_que">
          </div>
          <button className="next_btn">Next Que</button>
        </footer>
      </div>
      <div className="result_box">
        <div className="icon">
          <i className="fas fa-crown"></i>
        </div>
        <div className="complete_text">You've completed the Quiz!</div>
        <div className="score_text">
        </div>
        <div className="buttons">
          <button className="restart">Replay Quiz</button>
          <button className="quit">Quit Quiz</button>
        </div>
      </div>

    </>