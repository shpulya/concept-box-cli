import {Component, OnInit} from '@angular/core';
import {NgModule, ErrorHandler} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService, UserService, IdeaService, TagsService} from '../_services/index';
import {HttpClientModule} from '@angular/common/http';
import {Idea, User} from '../_models';

@Component({
  moduleId: module.id.toString(),
  templateUrl: './idea.component.html'
})

export class IdeaComponent  implements OnInit{

  email: string;
  currentUser: User;
  model: any = {};
  loading = false;
  tagsList: any = [];


  constructor(
    private router: Router,
    private ideaService: IdeaService,
    private userService: UserService,
    private alertService: AlertService,
    private tagsService: TagsService) {

    // this.email = (atob(JSON.parse(localStorage.getItem('currentUser')))).split(':')[0];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.email = this.currentUser.email;
  }

  ngOnInit() {
    this.loadTags();
  }

  private loadTags() {
    this.tagsService.getAllTags().subscribe(tags => this.tagsList = tags);
  }

  addIdea() {
    this.loading = true;
    this.model.userId = this.currentUser.id;
    this.model.status = "NEW";
    this.model.tags = this.model.tags.toString();


    console.log(this.model);
    console.log(this.currentUser.id);

    this.ideaService.createIdea(this.model)
      .subscribe(
        data => {
          this.alertService.success('Idea was created successfully!', true);
          this.router.navigate(['/user-profile/'+this.currentUser.id]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}


