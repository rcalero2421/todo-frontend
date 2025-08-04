export class GetMenuAction {
  static readonly type = '[MenuStatus] Get MenuStatus';
  constructor(private visible: boolean) {}
}