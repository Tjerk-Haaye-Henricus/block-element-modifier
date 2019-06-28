class BEM_Block {
  name: string;
  elements: BEM_Element[] = [];
  modifier: BEM_Modifier[] = [];

  constructor(blockName: string) {
    this.name = blockName.toLowerCase();
  }

  addElement(element: BEM_Element) {
    this.elements.push(element);
  }

  get className() {
    return this.name;
  }

  get selector() {
    return `.${this.name}`;
  }
}

class BEM_Element {
  name: string;
  modifier: BEM_Modifier[] = [];
  block: BEM_Block;

  constructor(name: string, block: BEM_Block) {
    this.name = name.toLowerCase();
    this.block = block;
  }

  addModifier(modifier: BEM_Modifier) {
    if (modifier.parent === this) {
      this.modifier.push(modifier);
    } else {
      throw new Error("Parent of given modifier is not this Element");
    }
  }

  get className() {
    return `${this.block.name}__${this.name}`;
  }

  get fullClassName() {
    const classes = [
      this.className,
      ...this.modifier.map(modifier => modifier.className)
    ];

    return classes.join(" ");
  }

  get selector() {
    return `.${this.block.name}__${this.name}`;
  }

  get fullSelector() {
    const classes = [
      this.selector,
      ...this.modifier.map(modifier => modifier.className)
    ];

    return classes.join(" .");
  }
}

class BEM_Modifier {
  name: string;
  parent: BEM_Block | BEM_Element;

  constructor(name: string, parent: BEM_Block | BEM_Element) {
    this.name = name.toLowerCase();
    this.parent = parent;
  }

  get className() {
    return `${this.parent.className}--${this.name}`;
  }

  get selector() {
    return `.${this.parent.className}--${this.name}`;
  }
}

const menu = new BEM_Block("menu");
const menuItem = new BEM_Element("item", menu);
const searchBox = new BEM_Element("searchbpx", menu);
const menuItemActiveModifier = new BEM_Modifier("active", menuItem);
const menuItemFocusedModifier = new BEM_Modifier("focused", menuItem);

menu.addElement(menuItem);
menuItem.addModifier(menuItemActiveModifier);
menuItem.addModifier(menuItemFocusedModifier);

const render = () =>
  (document.body.innerText = `
  ${menu.className}
  ${menu.selector}
  ${menuItem.className}
  ${menuItem.fullClassName}
  ${menuItem.selector}
  ${menuItem.fullSelector}
  ${menuItemActiveModifier.className}
  ${menuItemActiveModifier.selector}
`);

render();
