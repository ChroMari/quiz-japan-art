import {Idate} from './../abstaraction-types/interfaces';

class ModelCategorie {
  datePerson: Array<Idate>;
  dateScene: Array<Idate>;
  activeCategoria: string;

  constructor() {
    this.datePerson = [];
    this.dateScene = [];
    this.activeCategoria = 'person';

    this.localDate('person');
    this.localDate('sceen');
  }

  localDate(type: string): void {
    const ind = Math.floor(Math.random() * 10) % 2;

    if (type === 'sceen') {
      const date = localStorage.getItem('chromari-categorie-sceen');
      if (date) {
        this.dateScene = JSON.parse(date);
      } else {
        const url = ['./public/date1-sceen.json', './public/date-sceen.json'];
        fetch(url[ind]).then((res) => res.json()).then((data) => {
          this.dateScene = data;
        }).catch(err => {
          console.log("Error Reading data " + err);
          this.dateScene = [];
        });
      }
    } else {
      const date = localStorage.getItem('chromari-categorie-person');
      if (date) {
        this.datePerson = JSON.parse(date);
      } else {
        const url = ['./public/date-person.json', './public/date1-person.json'];
        fetch(url[ind]).then((res) => res.json()).then((data) => {
          this.datePerson = data;
        }).catch(err => {
          console.log("Error Reading data " + err);
          this.datePerson = [];
        });
      }
    }
  }

  commit() {
    localStorage.setItem('chromari-categorie-sceen', JSON.stringify(this.dateScene));
    localStorage.setItem('chromari-categorie-person', JSON.stringify(this.datePerson));
  }

  updateCategorieDate(type: string, card: number, cardQuestion: number) {
    if (type === 'scene') this.dateScene[card].numberQuestion = cardQuestion;
    else this.datePerson[card].numberQuestion = cardQuestion;

    this.commit();
  }
}

export default ModelCategorie;
