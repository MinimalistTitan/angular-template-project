export class TargetToolGuideRelease {
  versions: TargetToolGuideVersion[];
  currentVersion: TargetToolGuideVersion;
  todayRelativeProgress: number;
  today: Date;
  constructor() {
    this.versions = [];
  }
}

export class TargetToolGuideVersion {
  public id: number;
  public currentVersionDate: Date;
  public toolGuideReleaseDate: Date;
  public message: string;
  public modified: Date;
  public created: Date;
  public relativeProgress: number;

  public original: TargetToolGuideVersion;

  constructor(init?: Partial<TargetToolGuideVersion>) {
    if (!init) {
      this.id = 0;
      this.currentVersionDate = null;
      this.toolGuideReleaseDate = null;
      this.message = null;
      this.modified = null;
      this.created = null;
      this.relativeProgress = null;
      this.original = null;
    } else {
      Object.assign(this, init);
    }
  }

  get isValid(): boolean {
    return (
      !!this.currentVersionDate && !!this.toolGuideReleaseDate && !!this.message
    );
  }
}

export const toTargetToolGuideVersion = (raw: any): TargetToolGuideVersion => {
  const model = new TargetToolGuideVersion();
  if (raw != null) {
    model.id = raw.Id;
    model.currentVersionDate = new Date(raw.currentVersionDate || null);
    model.toolGuideReleaseDate = new Date(raw.toolGuideReleaseDate || null);
    model.message = raw.message;
    model.modified = new Date(raw.modified || null);
    model.created = new Date(raw.created || null);
    model.relativeProgress = raw.relativeProgress;
  }

  return model;
};

export const toTargetToolGuideRelease = (raw: any): TargetToolGuideRelease => {
  const model = new TargetToolGuideRelease();
  if (raw != null) {
    model.versions = raw.versions.map(toTargetToolGuideVersion);
    model.currentVersion = toTargetToolGuideVersion(raw.currentVersion);
    model.todayRelativeProgress = raw.todayRelativeProgress;
    model.today = new Date(raw.today || null);
  }
  return model;
};
