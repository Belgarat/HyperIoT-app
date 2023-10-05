import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HytModalService, HytStepperComponent} from 'components';
import { Algorithm, AlgorithmIOField, AlgorithmsService } from 'core';
import { Subject } from 'rxjs';
import { EntitiesService } from 'src/app/services/entities/entities.service';

//TO DO: sistemare dipendenze
import { AlgorithmFormEntity, LoadingStatusEnum } from 'src/app/pages/algorithms/algorithm-forms/algorithm-form-entity';
import { AlgorithmInfoFormComponent } from 'src/app/pages/algorithms/algorithm-forms/algorithm-info-form/algorithm-info-form.component';
import { AlgorithmJarFormComponent } from 'src/app/pages/algorithms/algorithm-forms/algorithm-jar-form/algorithm-jar-form.component';
import { InputFieldsFormComponent } from 'src/app/pages/algorithms/algorithm-forms/input-fields-form/input-fields-form.component';
import { OutputFieldsFormComponent } from 'src/app/pages/algorithms/algorithm-forms/output-fields-form/output-fields-form.component';
import { AlgorithmWizardReportModalComponent } from 'src/app/pages/algorithms/algorithm-wizard/algorithm-wizard-report-modal/algorithm-wizard-report-modal.component';
import {
  MachineLearningInfoFormComponent
} from "../machinelearning-forms/machinelearning-info-form/machinelearning-info-form.component";
import {MlAlgorithmsModel} from "../models/ml.model";
//

@Component({
  selector: 'hyt-machinelearning-wizard',
  templateUrl: './machinelearning-wizard.component.html',
  styleUrls: ['./machinelearning-wizard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MachineLearningWizardComponent implements OnInit {

  algorithmId: number;
  currentAlgorithm: Algorithm;
  currentAlgorithmSubject: Subject<Algorithm> = new Subject<Algorithm>();
  currentForm: AlgorithmFormEntity;
  currentInput: AlgorithmIOField[] = [];
  currentOutput: AlgorithmIOField[] = [];
  currentStepIndex = 0;

  finishData: { iconPath: string, type: string, entities: string[] }[] = [];
  hintMessage = '';
  hintVisible = false;
  optionModalViewed = false;
  panelIsVisible = true;

  @ViewChild('algorithmInfoForm')
  algorithmInfoForm: AlgorithmInfoFormComponent;

  @ViewChild('inputFieldsForm')
  inputFieldsForm: InputFieldsFormComponent;

  @ViewChild('outputFieldsForm')
  outputFieldsForm: OutputFieldsFormComponent;

  @ViewChild('algorithmJarForm')
  algorithmJarForm: AlgorithmJarFormComponent;

  @ViewChild('stepper')
  stepper: HytStepperComponent;

  constructor(
      private algorithmsService: AlgorithmsService,
      public entitiesService: EntitiesService,
      private hytModalService: HytModalService,
      private route: ActivatedRoute,
      private cd: ChangeDetectorRef) {
    this.route.params.subscribe(routeParams => {
      this.algorithmId = +(route.snapshot.params.id);
    });
   }

  ngOnInit() {
    this.cd.detectChanges();
    if (this.algorithmId) {

        this.algorithmsService.findAlgorithm(this.algorithmId).subscribe((a: Algorithm) => {
          this.currentAlgorithm = a;
          this.currentInput = JSON.parse(this.currentAlgorithm.baseConfig).input;
          this.currentOutput = JSON.parse(this.currentAlgorithm.baseConfig).output;
          this.currentAlgorithmSubject.next(this.currentAlgorithm);
        });

    }
    else {
      this.algorithmInfoForm.loadingStatus = LoadingStatusEnum.Ready;
    }

    this.currentForm = this.algorithmInfoForm;
    this.currentForm.entity.type = "MACHINE_LEARNING"; //Obbligatorio in questa area
}

  getDirty(index: number): boolean {
    switch (index) {
      case 0: {
        return (this.algorithmInfoForm) ? this.algorithmInfoForm.isDirty() : false;
      }
      case 1: {
        return (this.inputFieldsForm) ? this.inputFieldsForm.isDirty() : false;
      }
      case 2: {
        return (this.outputFieldsForm) ? this.outputFieldsForm.isDirty() : false;
      }
      case 3: {
        return (this.algorithmJarForm) ? this.algorithmJarForm.isDirty() : false;
      }
      default: {
        return false;
      }
    }
  }

  hideHintMessage(): void {
    this.hintVisible = false;
  }

  isNextDisabled(): boolean {
    switch (this.currentStepIndex) {
      case 0: {
        return !this.currentAlgorithm;
      }
      case 1: {
        return this.currentInput.length === 0;
      }
      case 2: {
        return this.currentOutput.length === 0;
      }
      case 3: {
        return true
        //return !this.currentAlgorithm.jarName || this.currentAlgorithm.jarName.length === 0;
      }
    }
  }

  isWizardDirty() {
    return this.algorithmInfoForm.isDirty();
  }

  onCancelClick(e) {
    this.currentForm.cancel();
  }

  onEntityEvent(data: any) {
    switch (data.event) {
      case 'hint:show':
        this.showHintMessage(data.message);
        break;
      case 'hint:hide':
        this.hideHintMessage();
        break;
      case 'pw:algorithm-updated':
        this.currentAlgorithm = data.algorithm;
        this.currentInput = JSON.parse(this.currentAlgorithm.baseConfig).input;
        this.currentOutput = JSON.parse(this.currentAlgorithm.baseConfig).output;
        this.currentAlgorithmSubject.next(this.currentAlgorithm);
        break;
    }
  }

  onSaveClick(e) {
    // Salvo nome del file python associato
    if (this.currentForm['pyToUpload']) {this.currentForm.entity.algorithmFileName = this.currentForm['pyToUpload'].name;}

    interface mlAlghorithm {
      input: any[],
      output: any[],
      customConfig: any[]
    }

    // Salvo configurazioni ML -> occorre capire come passare le config (Error 500: cannot deserialize value of type 'it.acsoftware.hyperiot.algorithm.model.Algorithm')
    const formML: MlAlgorithmsModel[] = JSON.parse(JSON.stringify(this.currentForm["paramgMLOptions"]));
    this.currentForm.entity.baseConfig = {
      input:[],
      output:[],
      customConfig: formML
    };
    console.log('onSaveClick ML: ', formML);

    //    Formato vecchio corretto
    //    "{\"input\":["ciao"],\"output\":["ciao output"]}"
    //    Formato attuale errato
    //    "[{\"type\":\"slider\",\"min\":0,\"max\":1,\"default\":0.5,\"steps\":0.1,\"label\":\"Learning Rate\"},{\"type\":\"slider\",\"min\":0,\"max\":10,\"default\":5,\"steps\":1,\"label\":\"Early Stop\"},{\"type\":\"radio\",\"choices\":[{\"value\":\"gradient\",\"label\":\"GRADIENT\",\"checked\":true},{\"value\":\"nan_gradient\",\"label\":\"NaN GRADIENT\"},{\"value\":\"stochastic\",\"label\":\"Stochastic\"}],\"label\":\"Solver\"},{\"type\":\"radio\",\"choices\":[{\"value\":\"mse\",\"label\":\"MEAN SQUARED ERROR\",\"checked\":true},{\"value\":\"bce\",\"label\":\"BINARY CROSSENTROPY\"},{\"value\":\"cce\",\"label\":\"CATEGORICAL CROSSENTROPY\"}],\"label\":\"Loss\"}]"

    this.currentForm.save((ent, isNew) => {
      if (this.currentForm instanceof MachineLearningInfoFormComponent) {
        this.currentAlgorithm = ent;

        this.algorithmsService.saveAlgorithm(this.currentAlgorithm);

        // wait for step 0 validation (next cicle)
        this.cd.detectChanges();
        this.stepper.next();
      }
    }, (error) => {
        // TODO: ...
    });
  }

  openFinishModal() {
    this.cd.detectChanges();
    const modalRef = this.hytModalService.open(AlgorithmWizardReportModalComponent, this.finishData);
  }

  showCancel(): boolean {
    return this.currentForm instanceof InputFieldsFormComponent || this.currentForm instanceof OutputFieldsFormComponent;
  }

  showHintMessage(message: string): void {
    this.hintMessage = message;
    this.hintVisible = true;
  }

  stepChanged(event) {
    this.currentStepIndex = event.selectedIndex;
    // setting current form...
    switch (event.selectedIndex) {
      case 0: {
        this.currentForm = this.algorithmInfoForm;
        break;
      }
      case 1: {
        this.currentForm = this.inputFieldsForm;
        break;
      }
      case 2: {
        this.currentForm = this.outputFieldsForm;
        break;
      }
      case 3: {
        this.currentForm = this.algorithmJarForm;
        break;
      }
      default: {
        console.log('error');
      }
    }
  }

  togglePanel() {
    this.panelIsVisible = !this.panelIsVisible;
  }

}
