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
   * Returns root element.
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
  public createElement (
    tag: string, attributes?: Record<string, any>, children?: (string | RendererElement)[],
  ): RendererElement {
    return new RendererElement(tag, attributes, children);
  }
}

/**
 * Instance of HTMLElement wrapper which optimizes certain operations
 * like modyfing styles on inserting children.
 */
export class RendererElement {

  /** Holds DOM element reference */
  private fElement: HTMLElement;

  /**
   * Creates RendererElement instance.
   *
   * @param tag name of the tag to create
   * @param attributes set of attributes to append to element
   */
  constructor (
    tag: string, attributes?: Record<string, any> | null, children: (string | RendererElement)[] = [],
  ) {
    this.fElement = this.createDOMElement(tag, attributes);
    children.forEach((child) => this.addChild(child));
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
   * Allows to add child to DOM element.
   * Actions is rAFed, because element is probably already in DOM.
   *
   * @param child RendererElement to be added
   */
  public addChild (child: string | RendererElement): Promise<RendererElement> {
    return new Promise((resolve) => {
      window.requestAnimationFrame(() => {
        const element = (typeof child === 'string') ? document.createTextNode(child) : child.element;
        this.fElement.appendChild(element);

        resolve(this);
      });
    });
  }

  /**
   * Creates element and assigns attributes to it.
   *
   * @param tag name of the tag to create
   * @param attributes set of attributes to append to element
   */
  private createDOMElement (tag: string, attributes?: Record<string, any> | null): HTMLElement {
    const newEl: HTMLElement = document.createElement(tag);

    if (attributes) {
      for (const attr in attributes) {
        const kebabCasedAttr: string = this.camelToKebab(attr);
        newEl.setAttribute(kebabCasedAttr, attributes[attr]);
      }
    }

    return newEl;
  }

  /**
   * Converts given string in camel case to kebab-case alternative.
   * Source: https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707
   *
   * @param camelCase string in camelCase to be converted
   */
  private camelToKebab (camelCase: string): string {
    return camelCase.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }
}
