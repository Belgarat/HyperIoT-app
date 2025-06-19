import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, NgForm, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { ActivatedRoute } from "@angular/router";
import { Rule, RulesService } from 'core';
import { Threshold } from '../../../base/base-widget/model/widget.model';
import { LineTypes } from '../../model/line.model';
import { PageStatus } from '../models/page-status';
import { PacketSelectComponent } from '../packet-select/packet-select.component';

@Component({
    selector: 'hyperiot-time-chart-settings',
    templateUrl: './time-chart-settings.component.html',
    styleUrls: ['./time-chart-settings.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class TimeChartSettingsComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild(PacketSelectComponent, { static: true }) packetSelect: PacketSelectComponent;

    subscription: any;
    @Input() modalApply: Subject<any>;
    @Input() widget;
    @Input() areaId;
    @Input() hDeviceId;
    @Input() checkbox: boolean = false;
    selectedFields = [];
    selectedPackets = [];

    thresholds: any = {};
    filteredThresholds: any = {};
    thresholdsIds: number[] = [];
    thresholdActive: boolean = false;
    thresholdsForm: FormArray = this.fb.array([]);
    collapseThresold: boolean = false;
    
    collapsedThresholdValues: any = {};

    trendActive: boolean = false;
    trendForm: FormArray = this.fb.array([]);
    trendFields = [];
    trendSelectedFields = [];

    defaultOpacity: number = 0.55;
    defaultColor: string = `rgba(5, 186, 0, ${this.defaultOpacity})`;
    defaultLine = { color: this.defaultColor, thickness: 2, type: LineTypes.Linear };
    packetPageStatus: PageStatus = PageStatus.Loading;
    pageStatus: PageStatus = PageStatus.Loading;
    useSpinner: boolean = true;

    lineTypes = LineTypes;
    private defaultConfig = {
        timeAxisRange: 10,
        //no limits in data points
        maxDataPoints: 0,
        timeWindow: 60,
        refreshIntervalMillis: 100,
        layout: {
            showlegend: true,
            legend: {
                orientation: 'h',
                x: 0.25,
                y: 1,
                traceorder: 'normal',
                font: {
                    family: 'sans-serif',
                    size: 10,
                    color: '#000'
                },
                bgcolor: '#FFFFFF85',
                borderwidth: 0
            }
        }
    };

    get lineTypeOptions() {
        return Object.values(LineTypes);
    }

    constructor(public settingsForm: NgForm,
        private activatedRoute: ActivatedRoute,
        private ruleService: RulesService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        if (this.widget.config == null) {
            this.widget.config = {};
        }

        if (this.widget.config.seriesConfig == null || this.widget.config.seriesConfig.length === 0) {
            Object.assign(this.widget.config, this.defaultConfig);
        }

        // Add trend to form
        if (1==1){
            this.addTrendToForm(null);
        }

        if (this.widget.config.threshold) {
            this.thresholdActive = this.widget.config.threshold.thresholdActive;
            if (this.thresholdActive) {
                if (this.widget.config.threshold.thresholds.length > 0) {
                    this.widget.config.threshold.thresholds.forEach(threshold => {
                        this.addThresholdToForm(threshold);
                    });
                }
                this.isChecked();
            } else {
                this.pageStatus = PageStatus.Ready;
            }
        }
        if (this.thresholdActive && this.widget.config.threshold.thresholds.length === 0 && !this.emptyControlFound()) {
            this.addThresholdToForm({
                id: null,
                line: this.defaultLine
            })
        }
        if (!this.thresholdActive) {
            this.pageStatus = PageStatus.Ready;
        }
        this.subscription = this.modalApply.subscribe((event) => {
            if (event === 'apply') {
                this.apply();
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.modalApply && changes.modalApply.currentValue) {
            const dataToSend = { isLoading: this.checkLoadingStatus() };
            changes.modalApply.currentValue.source.next(dataToSend);
        }
    }

    checkLoadingStatus() {
        return this.packetPageStatus === PageStatus.Loading || this.pageStatus === PageStatus.Loading
            || this.pageStatus === PageStatus.Error && this.packetPageStatus === PageStatus.Error;
    }
    
    updateModalApplyIsLoading(value: boolean) {
        const dataToSend = { isLoading: value };
        this.modalApply.next(dataToSend);
    }

    addThresholdToForm(threshold) {
        const thresholdGroup = this.fb.group({
            id: [threshold.id ? threshold.id : null, Validators.required],
            line: this.fb.group({
                color: [threshold.line?.color || this.defaultColor, Validators.required],
                thickness: [threshold.line?.thickness || 2, [Validators.min(1), Validators.max(5)]],
                type: [threshold.line?.type || null]
            })
        });

        if (threshold.id === null) this.thresholdsForm.insert(0, thresholdGroup);
        else this.thresholdsForm.push(thresholdGroup);
    }

    addTrendToForm(trend) {
        const trendGroup = this.fb.group({
            id: [null, Validators.required],
            line: this.fb.group({
                color: [this.defaultColor, Validators.required],
                thickness: [2, [Validators.min(1), Validators.max(5)]],
                type: [null]
            })
        });

        this.trendForm.insert(0, trendGroup);
    }

    onSelectedFieldsChange(fields) {
        this.selectedFields = fields;
        this.trendFields = fields;
    }

    onSelectedPacketChange(packet) {
        this.selectedPackets = [packet.id];
    }

    onPacketFieldTrendChange(event) {

    }

    updatePageStatus(status) {
        this.packetPageStatus = status;
    }

    apply() {
        this.assignThresholdsFormValuesToConfig();
        this.packetSelect.apply();
    }

    assignThresholdsFormValuesToConfig() {
        const thresholds: Threshold[] = this.thresholdsForm.controls.map(control => {
            return {
                id: control.get('id').value,
                rule: control.get('rule')?.value,
                line: {
                    color: control.get('line.color').value,
                    thickness: control.get('line.thickness').value,
                    type: control.get('line.type').value
                }
            };
        });

        if (this.thresholdActive) {
            this.widget.config.threshold = {
                thresholdActive: this.thresholdActive,
                thresholds: thresholds
            };
        }

        //if collapsed, i have to assign previos values
        else this.widget.config.threshold = this.collapsedThresholdValues;     

    }

    isChecked() {
        // if collapsed save previous values
        if (!this.thresholdActive) this.collapsedThresholdValues = this.widget.config.threshold;
        
        // collapse or not
        this.collapseThresold = this.thresholdActive;

        if ((this.selectedFields.length === 0 && !this.widget.config.packetId) || !this.thresholdActive) {
            return this.pageStatus = PageStatus.Ready;
        };

        // First show && nothing
        if (this.thresholdActive && Object.keys(this.thresholdsForm.controls).length == 0) {
            this.addThresholdToForm({
                id: null,
                line: this.defaultLine
            })
        }

        this.ruleService.findAllRuleByProjectId(this.widget.projectId).subscribe({
            next: (rules) => {
                this.pageStatus = PageStatus.Ready;
                this.thresholds = rules
                    .filter((rule) => {
                        let ruleDefinition = rule.ruleDefinition;
                        if (rule.type !== Rule.TypeEnum.ALARMEVENT) return false;

                        ruleDefinition = ruleDefinition.replace(/"/g, '').trim();
                        const ruleArray: string[] = ruleDefinition.match(/[^AND|OR]+(AND|OR)?/g).map(x => x.trim());
                        const packets: number[] = this.widget.config.packetId
                            ? this.widget.config.packetId
                            : this.selectedPackets;
                        const fields: number[] = this.widget.config.packetFields && Object.keys(this.widget.config.packetFields).length > 0
                            ? [...new Set(Object.keys(this.widget.config.packetFields))].map(field => parseInt(field))
                            : [...new Set(this.selectedFields.map(field => parseInt(field.id)))];

                        for (let k = 0; k < ruleArray.length; k++) {
                            const tempSplitted: string[] = ruleArray[k].split(' ').filter(i => i);
                            const packetFieldPart = tempSplitted.shift();
                            const splitted: string[] = packetFieldPart.split('.');

                            if (this.getOperator(ruleArray[k]) === "=" || this.getOperator(ruleArray[k]) === "!=") return false;

                            if (splitted.length === 1) return false;
                            else {
                                if (!(packets && (typeof packets === 'number' ? packets === parseInt(splitted[0]) : packets.includes(parseInt(splitted[0]))) && fields.includes(parseInt(splitted[1])))) {
                                    return false;
                                }
                            }
                        }
                        return true;
                    })
                    .reduce((groupedRules, rule) => {
                        const alarmName = rule.actions[0].alarmName;
                        if (!groupedRules[alarmName]) {
                            groupedRules[alarmName] = [];
                        }
                        groupedRules[alarmName].push(rule);
                        return groupedRules;
                    }, {});
                this.filterThresholds();
            },
            error: (err) => {
                console.error('Error retrieving thresholds', err);
                this.pageStatus = PageStatus.Error;
            }
        })
    }

    isTrendChecked() {
    }

    /**
     * Extract the operator from the rule part.
     * @param rulePart - A portion of the ruleDefinition to analyze.
     */
    getOperator(rulePart: string): string {
        const tempSplitted = rulePart.split(' ').filter(i => i);
        return tempSplitted.length > 1 ? tempSplitted[1].toLowerCase() : "";
    }

    getSelectedThresholdName(id: string): string {
        for (const group of Object.keys(this.thresholds)) {
            const rule = this.thresholds[group].find(rule => rule.id === id);
            if (rule) return rule.name;
        }
        return '';
    }

    deleteSelected(index: number): void {
        this.thresholdsForm.removeAt(index);
        this.filterThresholds();
        if (Object.keys(this.filteredThresholds).length > 0 && !this.emptyControlFound()) {
            this.addThresholdToForm({
                id: null,
                line: this.defaultLine
            });
        }
    }

    getFilteredIds(thresholdsIds): string[] {
        if (!thresholdsIds) return [];
        const ids = [];
        Object.keys(thresholdsIds).map(key => thresholdsIds[key].map(value => {
            if (!value) return
            else return ids.push(value.id)
        }));
        const filteredIds = [...new Set(ids)];
        return filteredIds.length > 0 ? filteredIds : [];
    }

    formatRulePrettyDefinition(rulePrettyDefinition: string) {
        const parts = rulePrettyDefinition.split('.');
        parts.shift();
        return `${parts[0]}=>${parts.slice(1).join('.')}`;
    }

    onThresholdSelected(selectedId: string, replaceThreshold: boolean) {
        const singleRule: boolean = this.findThresholdRule(selectedId)?.ruleDefinition.match(/[^AND|OR]+(AND|OR)?/g).map(x => x.trim()).length === 1;
        const selectedThresholdIndex = this.thresholdsForm.controls.findIndex(thresholdGroup => {
            return thresholdGroup.get('id')?.value === selectedId;
        });

        if (selectedThresholdIndex === -1 && !replaceThreshold) {
            const thresholdGroup = this.fb.group({
                id: [selectedId, Validators.required],
                line: this.fb.group({
                    color: [this.defaultColor, Validators.required],
                    thickness: [2, [Validators.min(1), Validators.max(5)]],
                    type: [singleRule ? LineTypes.Linear : null]
                })
            });
            this.thresholdsForm.push(thresholdGroup);
        } else {
            const thresholdFormGroup = this.thresholdsForm.at(selectedThresholdIndex);
            if (thresholdFormGroup) {
                thresholdFormGroup.get('line.color')?.setValue(this.defaultColor);
                thresholdFormGroup.get('line.thickness')?.setValue(2);
                thresholdFormGroup.get('line.type')?.setValue(singleRule ? LineTypes.Linear : null);
            }
        }
        
        this.filterThresholds();
        if (Object.keys(this.filteredThresholds).length > 0 && !this.emptyControlFound()) {
            this.addThresholdToForm({
                id: null,
                line: this.defaultLine
            });
        }
    }

    emptyControlFound() {
        const emptyControl = this.thresholdsForm.controls.filter(control => control.get('id').value === null);
        return emptyControl.length > 0;
    }

    filterThresholds() {
        const selectedThresholdIds = this.thresholdsForm.controls
            .map(thresholdGroup => thresholdGroup.get('id')?.value)
            .filter((id): id is string => id !== undefined); // Ensure we only keep defined IDs

        if (selectedThresholdIds.length === 0) {
            this.filteredThresholds = { ...this.thresholds };
        } else {
            this.filteredThresholds = Object.keys(this.thresholds).reduce((groupedRules, key) => {
                if (typeof key !== 'string') {
                    console.error('Unexpected key format:', key);
                    return groupedRules;
                }

                const unselectedRules = this.thresholds[key].filter(rule => {
                    return !selectedThresholdIds.includes(rule.id);
                });

                if (unselectedRules.length > 0) {
                    if (!groupedRules[key]) {
                        groupedRules[key] = [];
                    }
                    groupedRules[key] = unselectedRules;
                }

                return groupedRules;
            }, {} as { [key: string]: any[] });
        }
    }

    findThresholdRule(id: string) {
        for (const group of Object.keys(this.thresholds)) {
            const rule = this.thresholds[group].find(rule => rule.id === id);
            if (rule) return rule;
        }
        return null;
    }

    disabledThresholdOption(rule) {
        return !this.getFilteredIds(this.filteredThresholds).includes(rule.id)
    }

    setThresholdColor(control, color) {
        control.setValue(color)
    }
}
