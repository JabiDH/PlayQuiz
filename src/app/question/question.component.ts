import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question = {};
  questions: any = [];
  quiz = {};
  quizId;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private auth: AuthService) {

  }

  ngOnInit() {
    if (this.auth.isAuthenticated) {
      this.quizId = this.route.snapshot.paramMap.get('quizId');
      this.api.questionSelected.subscribe(q => {
        this.question = q;
      });
      this.api.getQuizById(this.quizId).subscribe(q => {
        this.quiz = q;
      })
      this.getQuestions();
    } else {
      this.router.navigateByUrl("/login");
    }

  }


  post(question) {
    if (question && question.text) {
      question.quizId = this.quizId;
      this.api.postQuestion(question).subscribe(res => {
        if (res) {
          this.questions.push(res);
          this.api.selectQuestion(res);
          //this.router.navigateByUrl(`/question/${res.quizId}`);
        }
      });
    }
  }

  put(question) {
    this.api.putQuestion(question).subscribe(res => {
      this.router.navigateByUrl(`/question/${res.quizId}`);
    });
  }

  delete(question) {
    this.api.deleteQuestion(question).subscribe(res => {
      this.questions.pop(quiz => quiz.id == res.id);
      this.question = {};
      this.api.selectQuestion(this.question);
    });
  }

  getQuestions() {
    this.api.getQuestions(this.quizId).subscribe(res => {
      if (res) {
        this.questions = res;
      }
    });
  }
}
