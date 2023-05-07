import { Directive, Input, TemplateRef, ElementRef, HostListener, Renderer2 } from "@angular/core";
import { ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { PopoverComponent } from "./popover.component";
export declare type PopoverPlacement = "left" | "top" | "right" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "right-top" | "right-bottom" | "left-top" | "left-bottom";

@Directive({
  selector: "[cdmPopover]"
})
export class PopoverDirective {
  @Input() contentTemplate: TemplateRef<any>;
  @Input('placement') placement: PopoverPlacement;
  @Input('customizeClass') customizeClass: string = '';
  @Input('title') title: string = '';
  @Input('disableInteractivity') disableInteractivity: boolean = true;
  @Input('disableArrow') disableArrow: boolean;
  @Input('isDropDrag') isDropDrag: boolean = false;
  private _overlayRef: OverlayRef;
  private _popoverInstance;
  private _mouseInTooltip: boolean = false;
  private _hasListeners: boolean = false;

  constructor(
    private _overlay: Overlay,
    private _overlayPositionBuilder: OverlayPositionBuilder,
    private _elementRef: ElementRef,
    private _r2: Renderer2
  ) { }


  ngOnInit() {
    const positionStrategy = this.getPosition();
    this._overlayRef = this._overlay.create({ positionStrategy });
  }


  @HostListener("mouseenter")
  show() {
    if (!this.isDropDrag && this._overlayRef && !this._overlayRef.hasAttached()) {
      this._popoverInstance = this._overlayRef.attach(
        new ComponentPortal(PopoverComponent)
      ).instance;

      this._popoverInstance.placement = this.placement;
      this._popoverInstance.contentTemplate = this.contentTemplate;
      this._popoverInstance.customizeClass = this.customizeClass;
      this._popoverInstance.title = this.title;
      this._popoverInstance.disableInteractivity = this.disableInteractivity;
      this._popoverInstance.disableArrow = this.disableArrow;
      this._popoverInstance.isDropDrag = this.isDropDrag;


      if (!this.disableInteractivity && !this._hasListeners) {
        this._hasListeners = true;
        this._r2.listen(this._overlayRef.overlayElement, "mouseleave", () => {
          this._mouseInTooltip = false;
          this.hide();
        });

        this._r2.listen(this._overlayRef.overlayElement, "mouseenter", () => {
          this._mouseInTooltip = true;
        });
      }
    }
  }

  @HostListener("mouseleave")
  hide() {
    setTimeout(() => {
      if (this._overlayRef.hasAttached() && !this._mouseInTooltip) this._overlayRef.detach();
    }, 50);
  }

  private getPosition(): FlexibleConnectedPositionStrategy {
    const positionMap = {
      "right": { positions: [{ originX: "end", originY: "center", overlayX: "start", overlayY: "center" }], offsetX: 10, offsetY: 0 },
      "bottom": { positions: [{ originX: "center", originY: "bottom", overlayX: "center", overlayY: "top" }], offsetX: -10, offsetY: 10 },
      "top": { positions: [{ originX: "center", originY: "top", overlayX: "center", overlayY: "bottom" }], offsetX: 0, offsetY: -10 },
      "left": { positions: [{ originX: "start", originY: "center", overlayX: "end", overlayY: "center" }], offsetX: -10, offsetY: 0 },
      "bottom-right": { positions: [{ originX: "start", originY: "bottom", overlayX: "start", overlayY: "top" }], offsetX: 10, offsetY: 10 },
      "bottom-left": { positions: [{ originX: "end", originY: "bottom", overlayX: "end", overlayY: "top" }], offsetX: 0, offsetY: 10 },
      "top-right": { positions: [{ originX: "start", originY: "top", overlayX: "start", overlayY: "bottom" }], offsetX: 10, offsetY: -10 },
      "top-left": { positions: [{ originX: "end", originY: "top", overlayX: "end", overlayY: "bottom" }], offsetX: 0, offsetY: -10 },
      "right-bottom": { positions: [{ originX: "end", originY: "top", overlayX: "start", overlayY: "top" }], offsetX: 10, offsetY: 0 },
      "right-top": { positions: [{ originX: "end", originY: "bottom", overlayX: "start", overlayY: "bottom" }], offsetX: 10, offsetY: -10 },
      "left-top": { positions: [{ originX: "start", originY: "top", overlayX: "end", overlayY: "bottom" }], offsetX: -10, offsetY: 0 },
      "left-bottom": { positions: [{ originX: "start", originY: "top", overlayX: "end", overlayY: "top" }], offsetX: -10, offsetY: 0 }
    };

    const { positions, offsetX, offsetY } = positionMap[this.placement] || positionMap['bottom'];

    const strategy = this._overlayPositionBuilder
    .flexibleConnectedTo(this._elementRef)
    .withPositions(positions as ConnectedPosition[])
    .withDefaultOffsetX(offsetX)
    .withDefaultOffsetY(offsetY);

    return strategy;
  }
}
