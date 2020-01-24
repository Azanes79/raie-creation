import { L10n } from '@syncfusion/ej2-base';
import { Component, OnInit } from '@angular/core';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService, ScheduleComponent, GroupModel, PopupOpenEventArgs, EJ2Instance } from '@syncfusion/ej2-angular-schedule';
import { isNullOrUndefined } from 'util';
import { SalonService } from './_services/salon.service';
import { MeetingService } from './_services/meeting.service';
L10n.load({
  'en-US': {
    'schedule': {
      'saveButton': 'Add',
      'cancelButton': 'Close',
      'deleteButton': 'Remove',
      'newEvent': 'New Meeting',
    },
  }
});
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService]
})

export class AppComponent implements OnInit {


  title = 'raie-creation';


  // Liste de rendez-vous
  public eventData: EventSettingsModel = {
    dataSource: [{
      Id: 1,
      Subject: 'Task 1 Paris',
      StartTime: new Date(2020, 0, 24, 9, 0),
      EndTime: new Date(2020, 0, 24, 11, 0)
    },
    {
      Id: 2,
      Subject: 'Task 2 Paris',
      StartTime: new Date(2020, 0, 22, 15, 0),
      EndTime: new Date(2020, 0, 22, 17, 0)
    },
    {
      Id: 3,
      Subject: 'Task 3 Paris',
      StartTime: new Date(2020, 0, 23, 9, 30),
      EndTime: new Date(2020, 0, 23, 11, 0)
    }]
  }
  // Liste de rendez-vous
  public eventData2: EventSettingsModel = {
    dataSource: [{
      Id: 1,
      Subject: 'Task 1 Toulouse',
      StartTime: new Date(2020, 0, 23, 9, 0),
      EndTime: new Date(2020, 0, 23, 11, 0)
    },
    {
      Id: 2,
      Subject: 'Task 2 Toulouse',
      StartTime: new Date(2020, 0, 19, 15, 0),
      EndTime: new Date(2020, 0, 19, 17, 0)
    },
    {
      Id: 3,
      Subject: 'Task 3 Toulouse',
      StartTime: new Date(2020, 0, 23, 9, 30),
      EndTime: new Date(2020, 0, 23, 11, 0)
    }]
  }

  // Liste de rendez-vous
  public eventSettings: EventSettingsModel = {
    dataSource: this.eventData.dataSource,
    fields: {
      id: 'Id',
      subject: { name: 'Subject', title: 'Event Name' },
      location: { name: 'Location', title: 'Event Location' },
      description: { name: 'Description', title: 'Event Description' },
      startTime: { name: 'StartTime', title: 'Start Duration' },
      endTime: { name: 'EndTime', title: 'End Duration' }
    }
  };

  // Liste de rendez-vous selon le salon sélectionné
  // Liste des rendez-vous affiché
  public eventDataSalon: EventSettingsModel = this.eventData;

  // Liste des salons
  // eventData = liste de rendez-vous
  public salons = []
  constructor(private salonService: SalonService, private meetingService: MeetingService) {
    this.salonService.getAllSalon().subscribe(_salons => {
      console.log(_salons);
      _salons[0].eventData = this.eventData2;
      _salons[1].eventData = this.eventData;
      this.salons = _salons
    })
    this.meetingService.getAllMeeting().subscribe(_meeting => { console.log(_meeting)})
  }
  ngOnInit(): void {
  }

  /**
   * 
   * @param event Evènement renvoyé
   * 
   * Méthode utilisée lorsque le salon sélectionné est changé.
   * Permet d'assimiler les rendez-vous au planning
   */
  change(event: any) {
    this.eventDataSalon = event.value.eventData;
  }


  public selectedDate: Date = new Date();
    public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
    public showQuickInfo: Boolean = false;
    onPopupOpen(args: PopupOpenEventArgs): void {
        if (args.type === 'Editor') {
            if (!isNullOrUndefined(document.getElementById("EventType_Error"))) {
                document.getElementById("EventType_Error").style.display = "none";
                document.getElementById("EventType_Error").style.left = "351px";
            }
            let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
            let salonElement: HTMLInputElement = args.element.querySelector('#salonElement') as HTMLInputElement;
            if (!salonElement.classList.contains('e-dropdownlist')) {
                let dropDownListObject: DropDownList = new DropDownList({
                    placeholder: 'Choose salon', value: salonElement.value,
                    dataSource: this.salons,
                    fields: {
                      value: 'name'
                    },
                    select: function(args) {
                        if (!isNullOrUndefined(document.getElementById("EventType_Error"))) {
                            document.getElementById("EventType_Error").style.display = "none";
                        }
                    }
                });
                dropDownListObject.appendTo(salonElement);
                salonElement.setAttribute('name', 'EventType');
            }
            let serviceElement: HTMLInputElement = args.element.querySelector('#serviceElement') as HTMLInputElement;
            if (!serviceElement.classList.contains('e-dropdownlist')) {
                let dropDownListObject: DropDownList = new DropDownList({
                    placeholder: 'Choose service', value: serviceElement.value,
                    dataSource: ['court', 'mèches', 'coloration'],
                    select: function(args) {
                        if (!isNullOrUndefined(document.getElementById("EventType_Error"))) {
                            document.getElementById("EventType_Error").style.display = "none";
                        }
                    }
                });
                dropDownListObject.appendTo(serviceElement);
                serviceElement.setAttribute('name', 'EventType');
            }
            let validator: FormValidator = ((formElement as EJ2Instance).ej2_instances[0] as FormValidator);
            validator.addRules('EventType', { required: true });
            let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
            if (!startElement.classList.contains('e-datetimepicker')) {
                new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
            }
            let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
            if (!endElement.classList.contains('e-datetimepicker')) {
                new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
            }
        }
    }
}
