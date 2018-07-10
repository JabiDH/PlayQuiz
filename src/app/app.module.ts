import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { QuestionComponent } from './question/question.component'
import { ApiService } from './api/api.service';
import { AuthService } from './api/auth.service';
import { AuthInterceptor } from './api/auth.interceptor';
import { QuestionsComponent } from './questions/questions.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PlayComponent } from './play/play.component';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { FinishedComponent } from './finished/finished.component';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: 'quizzes', component: QuizzesComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'question/:quizId', component: QuestionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'play', component: PlayComponent },
  { path: 'playQuiz/:quizId', component: PlayQuizComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionsComponent,
    HomeComponent,
    NavComponent,
    QuizComponent,
    QuizzesComponent,
    RegisterComponent,
    LoginComponent,
    PlayComponent,
    PlayQuizComponent,
    FinishedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [ApiService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [FinishedComponent]
})

export class AppModule { }
