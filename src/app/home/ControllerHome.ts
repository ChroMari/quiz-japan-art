import ViewHome from './ViewHome';

class ControllerHome {
  view: ViewHome;

  constructor(view: ViewHome) {
    this.view = view;

    this.view.bindButtonHover();
  }

  displayComponent() {
    this.view.showComponent();
  }
}

export default ControllerHome;
