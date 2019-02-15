import * as CSS from 'csstype';

export class Renderer {
  /** Holds instance of root RendererElement */
  private fRootElement: RendererElement;

  constructor (rootEl: HTMLElement) {
    // Create initial RendererElement and append it to root DOM el
    this.fRootElement = new RendererElement('div', {
      class: 'jsr',
    });

    rootEl.appendChild(this.fRootElement.element);
  }

  /**
   * Returns root element
   */
  public get root (): RendererElement {
    return this.fRootElement;
  }

  /**
   * Creates RendererElement.
   *
   * @param tag name of the tag to create
   * @param attributes set of attributes to append to element
   */
  public requestElement (tag: string, attributes?: Record<string, any>, parent?: RendererElement): RendererElement {
    return new RendererElement(tag, attributes, parent);
  }
}

export class RendererElement {
  /** Holds DOM element reference */
  private fElement: HTMLElement;

  /**
   * Creates RendererElement instance.
   *
   * @param tag name of the tag to create
   * @param attributes set of attributes to append to element
   */
  constructor (tag: string, attributes?: Record<string, any>, parent?: RendererElement) {
    this.fElement = this.createDOMElement(tag, attributes);

    // Save itself to parent
    if (parent) {
      parent.addChild(this);
    }
  }

  /**
   * Returns DOM element RendererElement is bound to.
   */
  public get element (): HTMLElement {
    return this.fElement;
  }

  /**
   * Patches element styles.
   *
   * @param el element to patch
   * @param styles set of styles
   */
  public patchStyles (styles: CSS.Properties): Promise<RendererElement> {
    return new Promise((resolve) => {
      window.requestAnimationFrame(() => {
        Object.assign(this.fElement.style, styles);
        resolve(this);
      });
    });
  }

  /**
   * Allows to add child to DOM element
   *
   * @param child RendererElement to be added
   */
  public addChild (child: RendererElement): void {
    this.fElement.appendChild(child.element);
  }

  /**
   * Creates element and assigns attributes to it.
   *
   * @param tag name of the tag to create
   * @param attributes set of attributes to append to element
   */
  private createDOMElement (tag: string, attributes?: Record<string, any>): HTMLElement {
    const newEl: HTMLElement = document.createElement(tag);

    if (attributes) {
      for (const attr in attributes) {
        newEl.setAttribute(attr, attributes[attr]);
      }
    }

    return newEl;
  }
}
