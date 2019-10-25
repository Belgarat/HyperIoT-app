import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AssetTag, AssetstagsService } from '@hyperiot/core';
import { MatChipInputEvent } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { ProjectWizardService } from 'src/app/services/projectWizard/project-wizard.service';

export enum TagStatus {
  Default = 0,
  Loaded = 1,
  Error = -1
}

@Component({
  selector: 'hyt-asset-tag',
  templateUrl: './asset-tag.component.html',
  styleUrls: ['./asset-tag.component.scss']
})
export class AssetTagComponent implements OnInit {

  selectedTags: number[] = [];

  tagStatus: TagStatus = TagStatus.Default;

  @Output() tagIds: EventEmitter<number[]> = new EventEmitter<number[]>();

  constructor(
    private wizardService: ProjectWizardService,
    private assetsTagService: AssetstagsService,
  ) { }

  ngOnInit() {
    this.assetsTagService.findAllAssetTag().subscribe(
      res => {
        this.allTags = res;
        this.tagChoice = [...this.allTags];
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
          startWith(null),
          map((ser: string | null) => ser ? this._filter(ser) : this.tagChoice.slice()));
        this.tagStatus = TagStatus.Loaded;
      },
      err => {
        this.tagStatus = TagStatus.Error;
      }
    )
  }

  tagCtrl = new FormControl();
  filteredTags: Observable<AssetTag[]>;
  tags: AssetTag[] = [];
  allTags: AssetTag[] = [];
  tagChoice: AssetTag[] = [];

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {

      let assetTag: AssetTag;

      if (this.tags.find(x => x.name === event.value))
        return;
      else if (this.allTags.some(x => x.name === event.value)) {
        assetTag = this.allTags.find(x => x.name === event.value);
        this.selected({ option: { value: assetTag } });
      }
      else {
        assetTag = {
          name: event.value,
          owner: {
            ownerResourceName: 'it.acsoftware.hyperiot.hproject',
            ownerResourceId: this.wizardService.getHProject().id
          },
          entityVersion: 1
        }
        this.assetsTagService.saveAssetTag(assetTag).subscribe(
          res => {
            this.allTags.push(res)
            this.tags.push(res);
            this.outTags();
          },
          err => { }
        );

      }

    }

    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: AssetTag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      if (this.allTags.find(x => x.name == tag.name)) {
        this.tagChoice.push(tag);
        this.tagCtrl.setValue(null);
      }
      this.outTags();
    }
  }

  selected(event): void {
    this.tags.push(event.option.value);
    for (let k = 0; k < this.tagChoice.length; k++) {
      if (this.tagChoice[k].name == event.option.value.name)
        this.tagChoice.splice(k, 1);
    }
    this.outTags();
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string | AssetTag): AssetTag[] {
    let filterValue: string = (typeof value == 'string') ? value.toLowerCase() : value.name.toLowerCase();
    return this.tagChoice.filter(tag => tag.name.toLowerCase().includes(filterValue));
  }

  outTags() {
    let selectedTagsIds: number[] = []
    this.tags.forEach(t => {
      selectedTagsIds.push(t.id);
    })
    this.tagIds.emit(selectedTagsIds);
  }

}