import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import Avatar from "@material-ui/core/Avatar";
import IntlMessages from "../../../util/IntlMessages";

const myCustomLocale = {
    // months list by order
    months: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
    ],


  
    // week days by order
    weekDays: [
      {
        name: 'Dimanche', // used for accessibility 
        short: 'Dim', // displayed at the top of days' rows
        isWeekend: true, // is it a formal weekend or not?
      },
      {
        name: 'Lundi',
        short: 'Lun',
      },
      {
        name: 'Mardi',
        short: 'Mar',
      },
      {
        name: 'Mercredi',
        short: 'Mer',
      },
      {
        name: 'Jeudi',
        short: 'Jeu',
      },
      {
        name: 'Vendredi',
        short: 'Ven',
      },
      {
        name: 'Samedi',
        short: 'Sam',
        isWeekend: true,
      },
    ],
  
    // just play around with this number between 0 and 6
    weekStartingIndex: 0,
  
    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
      return gregorainTodayObject;
    },
  
    // return a native JavaScript date here
    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },
  
    // return a number for date's month length
    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },
  
    // return a transformed digit to your locale
    transformDigit(digit) {
      return digit;
    },
  
    // texts in the date picker
    nextMonth: 'Mois prochain',
    previousMonth: 'Mois précédent',
    openMonthSelector: 'Ouvrir le sélecteur de mois',
    openYearSelector: 'Ouvrir le sélecteur d année',
    closeMonthSelector: 'Fermer le sélecteur de mois',
    closeYearSelector: 'Fermer le sélecteur d année',
    defaultPlaceholder: 'Sélectionner...',
  
    // for input range value
    from: 'de',
    to: 'à',
  
  
    // used for input value when multi dates are selected
    digitSeparator: ',',
  
    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,
  
    // is your language rtl or ltr?
    isRtl: false,
  }
const CalendarComponentNew = (data) => {

  const [selectedDay, setSelectedDay] = useState(null);
  const { newArrOfEvent } = data;

  return (
    <Calendar
      calendarClassName="custom-calendar"
      value={selectedDay}
      onChange={setSelectedDay}
      shouldHighlightWeekends
      customDaysClassName={newArrOfEvent}
      renderFooter={() => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem 2rem",
          }}
        >
          <div className="d-flex flex-row ">
            <div className="p-2 d-flex flex-row ">
              <div className="p-2">
                <Avatar className="size-30" style={{ background: "#008000" }}>
                  <h3 className="m-0 text-white">JF</h3>
                </Avatar>
              </div>
              <div className="p-2">
                <IntlMessages id="components.event.freeday" />
              </div>
            </div>
            <div className="p-2 d-flex flex-row ">
              <div className="p-2">
                <Avatar className=" size-30" style={{ background: "#ffc0cb" }}>
                  <h3 className="m-0 text-white">V</h3>
                </Avatar>
              </div>
              <div className="p-2">
                <IntlMessages id="components.event.vacance" />
              </div>
            </div>
          </div>
        </div>
      )}
      locale={myCustomLocale}
    />
  );
};

export default CalendarComponentNew;
