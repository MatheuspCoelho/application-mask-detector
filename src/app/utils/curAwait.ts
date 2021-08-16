export class CurAwait {

  public cursorAwaitAdd(){
    const element = document.getElementById('main-body')
    if(element){
      element.classList.add('global-cur-await');
    }
  }

  public cursorAwaitRemove(){
    const element = document.getElementById('main-body')
    if(element){
      element.classList.remove('global-cur-await');
    }
  }
}

