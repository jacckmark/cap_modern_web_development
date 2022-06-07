const tmpl = document.createElement("template");

tmpl.innerHTML = `
  <style>
    /* The switch - the box around the slider */
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
    .slider:before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
    :host(.toggle-on) .slider {
      background-color: #2196f3;
    }
    :host(.toggle-on) .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }
    .slider.round:before {
      border-radius: 50%;
    }
  </style>

  <div class='switch'>
  <div class='slider round'></div>
  </div>
`;

class ToggleButton extends HTMLElement {
  constructor() {
    super();
    // attaching shadow dom to the component and added open mode (you will be able to modify the styles but only by JS manipulations, not by CSS). Close would result with no option to change the styles even with the JS
    const shadowRoot = this.attachShadow({ mode: "open" });
    // added our component to the shadow DOM
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
    this.addEventListener("click", this.changeToggleButtonState);
    this.onToggleButtonChange = new Event("toggleButtonChanged", { bubbles: true, composed: true });
  }

  changeToggleButtonState() {
    this.value = !this.value;
    this.value ? this.setAttribute("class", "toggle-on") : this.removeAttribute("class");
    this.dispatchEvent(this.onToggleButtonChange);
  }

  static get observedAttribute() {
    return ["checked"];
  }

  attributeChangeCallback() {
    this.changeToggleButtonState();
  }
}

customElements.define("toggle-button", ToggleButton);
