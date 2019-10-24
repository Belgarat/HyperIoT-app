import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HProject, HprojectsService } from '@hyperiot/core';
import { ProjectWizardHttpErrorHandlerService } from 'src/app/services/errorHandler/project-wizard-http-error-handler.service';
import { HYTError } from 'src/app/services/errorHandler/models/models';
import { PageStatusEnum } from '../../model/pageStatusEnum'
import { ProjectWizardService } from 'src/app/services/projectWizard/project-wizard.service';

@Component({
  selector: 'hyt-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  hProject: HProject;

  @Output() projectOutput = new EventEmitter<HProject>();

  projectForm: FormGroup;

  PageStatus = PageStatusEnum;
  pageStatus: PageStatusEnum = PageStatusEnum.Default;

  errors: HYTError[] = [];

  constructor(
    private fb: FormBuilder,
    private hProjectService: HprojectsService,
    private errorHandler: ProjectWizardHttpErrorHandlerService,
    private wizardService: ProjectWizardService,
    private router: Router
  ) { }

  ngOnInit() {
    this.projectForm = this.fb.group({});
  }

  submitProject() {
    if (this.pageStatus == PageStatusEnum.Submitted) {
      this.updateProject();
    }
    else {
      this.createProject();
    }
  }

  projectObs = {
    next: (res) => {
      this.hProject = res;
      this.wizardService.setHProject(this.hProject);
      this.projectOutput.emit(this.hProject);
      this.pageStatus = PageStatusEnum.Submitted;
    },
    error: (err) => {
      this.pageStatus = PageStatusEnum.Error;
      this.errors = this.errorHandler.handleCreateHProject(err);
      this.errors.forEach(e => {
        if (e.container != 'general')
          this.projectForm.get(e.container).setErrors({
            validateInjectedError: {
              valid: false
            }
          });
      })
    }
  }

  updateProject() {

    this.pageStatus = PageStatusEnum.Loading;
    this.errors = [];

    this.hProject.name = this.projectForm.value.projectName;
    this.hProject.description = this.projectForm.value.projectDescription;
    this.hProjectService.updateHProject(this.hProject).subscribe(this.projectObs);

  }

  createProject() {

    this.pageStatus = PageStatusEnum.Loading;
    this.errors = [];
    let currentUser;

    if (localStorage.getItem('user'))
      currentUser = JSON.parse(localStorage.getItem('user'));
    else
      this.router.navigate(['/auth/login']);

    this.hProject = {
      name: this.projectForm.value.projectName,
      description: this.projectForm.value.projectDescription,
      user: { id: currentUser.id, entityVersion: currentUser.entityVersion },
      entityVersion: 1
    }

    this.hProjectService.saveHProject(this.hProject).subscribe(this.projectObs);

  }

  getError(field: string): string {
    return (this.errors.find(x => x.container == field)) ? this.errors.find(x => x.container == field).message : null;
  }

  invalid(): boolean {
    return (
      this.projectForm.get('projectName').invalid ||
      this.projectForm.get('projectDescription').invalid
    )
  }

  updateHint(event: string) {
    this.wizardService.updateHint(event, 0);
  }

}