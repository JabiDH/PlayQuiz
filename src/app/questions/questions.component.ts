import { Component, OnInit } from '@angular/core'
import { ApiService } from '../api/api.service'
import { QuestionComponent } from '../question/question.component'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../api/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions: any = [];
  quizId;

  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router) {

  }

  ngOnInit() {
    if (this.auth.isAuthenticated == true) {
      this.quizId = this.route.snapshot.paramMap.get('quizId');
      this.api.getQuestions(this.quizId).subscribe(res => {
        if (res) {
          this.questions = res;
          console.log(this.questions);
        }
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
