import { BEM_Block, BEM_Element, BEM_Modifier } from "./index";

// Blocks
const menu = new BEM_Block("menu");

// Elements
const menuItem = new BEM_Element("item", menu);
const searchBox = new BEM_Element("searchbox", menu);

// Modifier
const menuItemActiveModifier = new BEM_Modifier("active", menuItem);
const menuItemFocusedModifier = new BEM_Modifier("focused", menuItem);

menuItem.addModifier(menuItemActiveModifier);
menuItem.addModifier(menuItemFocusedModifier);

const render = () =>
  (document.body.innerText = `
  Block:

  ${menu.className}
  ${menu.selector}


  Elements:
  
  ${menuItem.className}
  ${menuItem.fullClassName}
  ${menuItem.selector}
  ${menuItem.fullSelector}
  ${searchBox.className}
  ${searchBox.fullClassName}
  ${searchBox.selector}
  ${searchBox.fullSelector}


  Modifier:

  ${menuItemActiveModifier.className}
  ${menuItemActiveModifier.selector}
`);

render();
