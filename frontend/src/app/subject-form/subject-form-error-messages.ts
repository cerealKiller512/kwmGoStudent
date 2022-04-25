export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const SubjectFormErrorMessages = [
  new ErrorMessage("title", "required", "Ein Buchtitel muss angegeben werden"),
  new ErrorMessage("id", "required", "Es muss eine ID eingegeben werden"),
  new ErrorMessage("published", "required", "Es muss ein Erscheinungsdatum angegeben werden"),
  new ErrorMessage("user", "required", "Es muss ein Lehrer angegeben werden!"),
  new ErrorMessage("appointments", "required", "Es muss zumindest ein Termin angegeben werden")
];
