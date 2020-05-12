export class FullTimelineEventModel {
  public id: number;
  public date: number;
  public title: string;
  public description: string;
  public img: string;
}

export class FullTimelineEventRenderModel extends FullTimelineEventModel {
  topPosition: number;
  leftPosition: number;
  zIndex: number;
}
