import {Component, Prop, h, Host, Listen, Watch, Event, EventEmitter, State} from '@stencil/core';

@Component({
  tag: 'toggle-button',
  styleUrl: 'toggle-button.scss',
  shadow: true
})
export class ToggleButton {
  @Prop() checked: boolean;
  @State() value: boolean;
  @Event({bubbles: true, composed: true}) stateHasBeenChanged: EventEmitter;

  @Listen('click')
  changeState() {
    this.value = !this.value;
    this.stateHasBeenChanged.emit(this.value);
  }

  @Watch('checked')
  onStateBeingChanged() {
    this.checked ? this.value = true : this.value = false;
  }

    componentWillLoad() {
      this.value = this.checked;
    }

  render() {
    return (
      <Host class={{'toggle-on': this.value}}>
        <div class="switch">
          <div class="slider round"></div>
        </div>
      </Host>
    )
  }
}
