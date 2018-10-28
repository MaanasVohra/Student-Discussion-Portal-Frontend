import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// material.angular.io requirements for animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// miscellaneous imports for reusable angular components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';

// custom components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Browser } from 'protractor';
import { AppRoutingModule } from './/app-routing.module';
import { AboutComponent } from './about/about.component';
import { SignupComponent } from './signup/signup.component';
import { EditorComponent } from './editor/editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionListItemComponent } from './question-list-item/question-list-item.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { AnswerComponent } from './answer/answer.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    SignupComponent,
    EditorComponent,
    DashboardComponent,
    QuestionListItemComponent,
    QuestionDetailComponent,
    AnswerComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
    MatDividerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
