export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const SubjectFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Titel muss angegeben werden'),
  new ErrorMessage('published', 'required', 'Es muss ein Erscheinungsdatum angegeben werden'),
  new ErrorMessage('user', 'required', 'Es muss ein Autor angegeben werden'),
 ];
