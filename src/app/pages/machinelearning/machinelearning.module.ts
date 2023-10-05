import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MachineLearningComponent } from './machinelearning.component';

// DA CORREGGERE
import { MachineLearningCardComponent } from './machinelearning-card/machinelearning-card.component';
import { MachineLearningWizardComponent } from '../machinelearning/machinelearning-wizard/machinelearning-wizard.component';
import { MachineLearningInfoFormComponent } from '../machinelearning/machinelearning-forms/machinelearning-info-form/machinelearning-info-form.component';
import { InputFieldsFormComponent } from '../machinelearning/machinelearning-forms/input-fields-form/input-fields-form.component';
import { OutputFieldsFormComponent } from '../machinelearning/machinelearning-forms/output-fields-form/output-fields-form.component';;
import { MachineLearningWizardReportModalComponent } from '../machinelearning/machinelearning-wizard/machinelearning-wizard-report-modal/machinelearning-wizard-report-modal.component';
import { MachineLearningJarFormComponent } from '../machinelearning/machinelearning-forms/machinelearning-jar-form/machinelearning-jar-form.component';

import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [
    MachineLearningComponent,
    MachineLearningCardComponent,
    MachineLearningWizardComponent,
    MachineLearningInfoFormComponent,
    OutputFieldsFormComponent,
    MachineLearningJarFormComponent,
    MachineLearningWizardReportModalComponent,
    InputFieldsFormComponent
  ],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatChipsModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatInputModule,
    MatExpansionModule,
    DragDropModule,
    MatListModule
  ]
})
export class MachineLearningModule { }
