import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Option } from '@hyperiot/components/lib/hyt-radio-button/hyt-radio-button.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HPacketField, HpacketsService, HPacket, HDevice } from '@hyperiot/core';
import { SelectOption } from '@hyperiot/components';
import { HYTError } from 'src/app/services/errorHandler/models/models';
import { ProjectWizardHttpErrorHandlerService } from 'src/app/services/errorHandler/project-wizard-http-error-handler.service';
import { Node } from '@hyperiot/components/lib/hyt-tree-view-editable/hyt-tree-view-editable.component';

interface deviceTreeView {
  packet: HPacket;
  tree: Node[];
}

interface FieldForm {
  packet: HPacket,
  fieldId: number;
  isPacket: boolean;
  form: FormGroup;
}

@Component({
  selector: 'hyt-fields-step',
  templateUrl: './fields-step.component.html',
  styleUrls: ['./fields-step.component.scss']
})
export class FieldsStepComponent implements OnInit, OnChanges {

  @Input() hDevices: HDevice[] = [];

  @Input() hPackets: HPacket[] = [];

  deviceTreeView: deviceTreeView[] = [];

  fieldForm: FieldForm;

  multiplicityOptions: Option[] = [
    { value: 'SINGLE', label: 'Single', checked: true },
    { value: 'ARRAY', label: 'Array' },
    { value: 'MATRIX', label: 'Matrix' }
  ];

  typeOptions: SelectOption[] = [
    { value: 'OBJECT', label: 'OBJECT' },
    { value: 'INTEGER', label: 'INTEGER' },
    { value: 'DOUBLE', label: 'DOUBLE' },
    { value: 'FLOAT', label: 'FLOAT' },
    { value: 'BOOLEAN', label: 'BOOLEAN' },
    { value: 'DATE', label: 'DATE' },
    { value: 'TEXT', label: 'TEXT' },
    { value: 'TIMESTAMP', label: 'TIMESTAMP' },
    { value: 'CATEGORY', label: 'CATEGORY' },
    { value: 'TAG', label: 'TAG' }
  ];

  errors: HYTError[] = [];

  @Output() hPacketsOutput = new EventEmitter<HPacket[]>();

  formDeviceActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private hPacketService: HpacketsService,
    private errorHandler: ProjectWizardHttpErrorHandlerService
  ) { }

  ngOnInit() { }

  devicesOptions: SelectOption[] = [];

  currentDevice: HDevice;

  ngOnChanges() {
    this.devicesOptions = [];
    this.deviceTreeView = [];
    for (let el of this.hDevices)
      this.devicesOptions.push({ value: el.id.toString(), label: el.deviceName })
    this.updateDeviceTreeView();
  }

  updateDeviceTreeView() {
    this.deviceTreeView = [];
    if (this.currentDevice) {
      let packetsForDevice = this.hPackets.filter(x => x.device.id == this.currentDevice.id)
      packetsForDevice.forEach(pack => {
        this.deviceTreeView.push({
          packet: pack,
          tree: this.createTree(pack.fields, true)
        })
      })
    }
  }

  createTree(fields: HPacketField[], root: boolean): Node[] {
    let node: Node[] = [];
    fields.forEach(element => {
      node.push({
        id: element.id,
        root: false,
        name: element.name,
        lom: element.multiplicity,
        type: element.type,
        children: (element.innerFields) ? this.createTree(element.innerFields, false) : null
      })
    });
    return node;
  }

  findField(fields: HPacketField[], id: number, hPacketField: HPacketField): HPacketField {
    fields.forEach(x => {
      if (x.innerFields != null) {
        if (x.id == id) {
          x.innerFields.push(hPacketField);
        }
        else {
          this.findField(x.innerFields, id, hPacketField)
        }
      }
    })
    return;
  }

  deviceChanged(event) {
    this.currentDevice = this.hDevices.find(x => x.id == event.value)
    this.updateDeviceTreeView();
  }

  createField() {

    this.errors = [];

    let field: HPacketField = {
      entityVersion: 1,
      name: this.fieldForm.form.value['fieldName'],
      multiplicity: this.fieldForm.form.value.fieldMultiplicity.value,
      type: this.fieldForm.form.value.fieldType,
      description: this.fieldForm.form.value.fieldDescription,
      innerFields: (this.fieldForm.form.value.fieldMultiplicity.value == 'SINGLE') ? null : []
    }

    if (this.fieldForm.isPacket) {
      console.log("aggiungendo a packet")
      this.hPacketService.addHPacketField(this.fieldForm.packet.id, field).subscribe(
        res => {
          this.hPackets.find(x => x.id == this.fieldForm.packet.id).fields.push(res);
          this.hPacketsOutput.emit(this.hPackets);
          this.fieldForm = null;
        },
        err => {
          this.errors = this.errorHandler.handleCreateField(err);
          this.errors.forEach(e => {
            if (e.container != 'general')
              this.fieldForm.form.get(e.container).setErrors({
                validateInjectedError: {
                  valid: false
                }
              });
          })
        }
      );
    }
    else {
      this.findField(this.fieldForm.packet.fields, this.fieldForm.fieldId, field);

      this.hPacketService.updateHPacket(this.fieldForm.packet).subscribe(
        res => {
          this.hPackets.find(x => x.id == this.fieldForm.packet.id).fields = res.fields;
          this.hPacketsOutput.emit(this.hPackets);
          this.fieldForm = null;
        },
        err => {
          this.errors = this.errorHandler.handleCreateField(err);
          this.errors.forEach(e => {
            if (e.container != 'general')
              this.fieldForm.form.get(e.container).setErrors({
                validateInjectedError: {
                  valid: false
                }
              });
          })
        }
      );
    }

  }

  getError(field: string): string {
    return (this.errors.find(x => x.container == field)) ? this.errors.find(x => x.container == field).message : null;
  }

  invalid() {
    return (
      this.fieldForm.form.get('fieldName').invalid ||
      this.fieldForm.form.get('fieldType').invalid
    )
  }

  addField(event, packet: HPacket) {
    this.fieldForm = {
      packet: packet,
      fieldId: (!event.root) ? event.id : null,
      isPacket: event.root,
      form: this.fb.group({})
    }
  }

  removeField(event) {
    console.log("remove")
  }

}
