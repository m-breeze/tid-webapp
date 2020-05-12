export class EventModel {
  public id?: number;
  public date: string | number;
  public title: string;
  public description: string;
  public img?: string;

  constructor(init?: Partial<EventModel>) {
    Object.assign(this, init);
  }
}
