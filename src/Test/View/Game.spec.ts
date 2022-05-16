import {GamePageComponent} from "../../app/view/game-page/game-page.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {DebugElement} from "@angular/core";

describe("Game Page", () =>{
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;
  let de: DebugElement
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GamePageComponent],
    }).compileComponents()
  }))
  beforeEach(() => {
    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  })
  it('should create The Game Page', () => {
    expect(component).toBeTruthy();
  })
  it('should display a levle when given an levelid', () => {
    expect(component).toBeTruthy();
  })
})
