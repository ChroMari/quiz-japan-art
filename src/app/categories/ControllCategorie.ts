import ViewCategories from './ViewCategories';
import ModelCategorie from './ModelCategorie';

class ControllerCategorie {
  view: ViewCategories;

  model: ModelCategorie;

  constructor(view: ViewCategories, model: ModelCategorie) {
    this.view = view;
    this.model = model;
  }

  showComponent(handlerClick: () => void, type: string, handlerScore: (id: string) => void,
    handlerGame: (typez: string) => void) {
    this.view.showComponent();
    this.model.activeCategoria = type;
    if (type === 'scene') {
      this.model.dateScene.forEach((item, index) => {
        const { img } = item;
        const numQuest = item.numberQuestion;
        this.view.showCard(index, img, numQuest, handlerScore, handlerGame, handlerClick);
        return item;
      });
    } else {
      if (this.model.datePerson.length === 0) {
        this.view.showError();
      } else {
        this.model.datePerson.forEach((item, index) => {
          const { img } = item;
          const numQuest = item.numberQuestion;
          this.view.showCard(index, img, numQuest, handlerScore, handlerGame, handlerClick);
          return item;
        });
      }
    }
  }
}

export default ControllerCategorie;
