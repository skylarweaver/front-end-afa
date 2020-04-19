[![AFA LOGO](./readme-header.png)](https://projectafa.org)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/skylarweaver/front-end-afa/blob/release/production/LICENSE)

# Adventures for Alopecia: Gatsby & Netlify CMS front-end

___

## What is Adventures for Alopecia?

[Adventures for Alopecia](https://projectafa.org) (Project AFA) is a 501(c)(3) nonprofit organization supporting children and adults living with Alopecia. We achieve our mission through three main program areas: support, awareness, and research.

**Support.** We host support group events throughout North America, Central America, and South America.
**Awareness.** We educate the public about Alopecia through social media, press, word of mouth, and speaking engagements.
**Research.** We contribute a portion of the funds we raise to the National Alopecia Areata Foundation, an existing 501(c)(3) nonprofit dedicated to discovering a cure for Alopecia.


After Skylar's inaugural Adventure for Alopecia, Project AFA will use donations to sponsor adventures for other Alopecians to regain their confidence through adventure and travel.

## What is this repo?

Here lies the front-end source code for AFA's website, which has two main components marketing/communications to inform the audience of our mission, and a donations portal to allow tax-deductable contributions to support people with Alopecia.

## Tech Stack

### Front-end

*Gatsby.* We use (Gatsby)[https://www.gatsbyjs.org/] to ensure our web app is preformant. 
*Netlify CMS.* We use a Gatsby plugin to implement Netlify CMS to allow GUI content updates while maintaining a static, preformant site.

### Backend

*Lambda.* (Our backend)[https://github.com/skylarweaver/serverless-afa] runs entirely on serverless AWS Lambda functions to process all donations, load map content, and live-update Skylar's motorcycle coordinates.
*Google Sheeets.* To serve our needs: a simple place to store data that can be viewed and manipulated by both tech-savvy and non-tech-savvy AFA board members, we use Google Sheets as our database.

### Misc
*Stripe.* We use (Stripe)[https://stripe.com] to handle all donations securely.
*Estimote.* We use (Estimote's)[https://estimote.com/] LTE Beacon which is installed into Skylar's Motorcycle to track the most recent location and update the map accordingly (after appropriate obfuscation).

## Setup

### Dependencies

- Node 11.1 or above (We use (nvm)[https://github.com/nvm-sh/nvm])
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)
- A running (backend)[https://github.com/skylarweaver/serverless-afa]

### Run

```
npm i
git clone https://github.com/FiloSottile/mkcert && cd mkcert
npm run start
```

### Build

```
npm run build
```

### Credits



We use SCSS for CSS generation.

Our naming conventions are adapted heavily from the work of Nicolas Gallagher’s [SUITCSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md). Which it to say, we relay on structured, meaningful class names.This is to help better communicate the relationships between classes and limit non-reusable code. We also rely heavily on the principles from Harry Roberts’ [css guidelines](http://cssguidelin.es/).

We use Bootstrap as the foundation for our grid as it does much of the heavy lifting and makes for a more seamless transition between the design and dev teams.

Our primary goal is to create a scalable, maintainable, reusable system that can be used across the MCFP platforms and eventually DD.

[Scalable CSS Reading List ](https://github.com/davidtheclark/scalable-css-reading-list)


___


### Contents
1. A quick word about the dangers of SCSS
1. Document Anatomy
- Single File vs Many Files
- Table of Contents
- File Titles
- Comments
1. Methodology
- Types of Files
- BEM
- Atomic Design
- Naming Convention
- Utilities
- Components
- Extends
- Mixins
1. Rule Structuring

### A quick word about the dangers of SCSS
SCSS can be a powerful tool in the right hands, but in the wrong hands you can quickly end up with selectors like this:

```
body.getaways-gallery-gig .page_header #filters #categories_filter
.pane .categories_container .categories ul li.selectBox-selected a {
	color: #333;
}
```

Due to the ease of nesting in SCSS, people frequently nest without understanding the ramifications on the compiled code. This adds unnecessary specificity that requires the same selector to override, or the use of *gasp* `!important`. This also adds extra processing time for the browser to render.

___


### Document Anatomy

#### Single File vs Many Files
While some people choose to work in single, large files we choose to work in many small files based on their usage. This allows us to add these components, utilities, etc at will and makes each file more scannable and focused.

When you are creating files make sure to make imported files silent. This ensures that they will not be compiled into a unique file.

```
_normalize.scss
```

#### Table of Contents
We choose to make the main stylesheet contain includes only. This makes it easy to scan the cascade. We also include a table of contents at the top of this file to tell the next developer(s) exactly what they will find.
```
/*------------------------------------*\
    #CONTENTS
\*------------------------------------*/
/**
   * CONTENTS............It's what you are reading
   * RESET...............Set our reset defaults
   * FONT-FACE...........Import brand font files
 */
```

#### File Titles
The table of contents is useless without mapping to corresponding file titles. Denote the name of a file at the top like so:

```
/*------------------------------------*\
    #RESET
\*------------------------------------*/
```
The `#` prefix allows us to run a quick find command to limit the search scope to the name of the file titles only.

#### Comments

Code is written and maintained by people. Ensure your code is well structured, descriptive and well-commented. This makes it approachable when working with a team of developers and helps to onboard new members.

Be sure to write in complete sentences for larger comments and succinct phrases for general notes.

No need to worry about this impact on the final css as the comments should be removed in the compression/compilation process.

**Bad Comment:**
```
/* Modal header */
.modal-header {
  ...
}
```

**Good Comment:**
```
/* Wrapping element for .modal-title and .modal-close */
.modal-header {
  ...
}
```

___


### Methodology
Our goal is to have our codebase look as if it was all developed by a single person, regardless of how many people have contributed. Here are some of the methodologies we have in place to accomplish this.

#### Types of Files

**Stylesheets will be broken down into the following buckets**:
- Templates - Templates hold "template/page" specific styling
- Components - Components hold class specified elements and id targeted elements
- Elements - Elements can be seen as "atoms" in Atomic Design, these are unclassified HTML elements
- Generic - Generic will be a place for Vendor related CSS files or CSS files that Reset or Normalize CSS on a project
- Settings - Settings will not have a prefix they should be where variables are placed that will be utilized throughout the project
- Tools - Tools will not have a prefix they should be where mixins and functions are placed that will be utilized throughout the project
- Utilities (u) - Utilities are single rules that can be applied in multiple places to adjust elements. Generally these consist of visual cues / positioning cues / spacing cues

Each of these buckets will contain numerous small targeted .scss files that will directly relate to a certain grouping of CSS rules. Each of these files should be broken out based on its purpose within the project.

#### BEM

BEM, meaning Block, Element, Modifier, is a front-end methodology created by the developers at Yandex. BEM is a methodology, but lets only worry about the implications for naming at the moment.

Our convention is BEM-like in principle but the actual syntax is different.

- Block: The base of the component.
- Element: A component of the Block.
- Modifier: A variant or extension of the Block.


#### Naming Convention
Lets break down the way we use the BEM methodology in our syntax.

Let us use this analogy:

```
.house{ … }
.house-bedroom { … }
.house--rancher { … }
```

The Block, `.house`, is the root of a discrete entity. `.house-bedroom` is an Element, a smaller part of the `.house`. The modifier, `.house--rancher`, is a variant of the `.house` Block.

In our methodology we use the following syntax for our Blocks, Elements and Modifiers

- Blocks are camelCased ex. `titleBlock`
- Elements have a single dash between the name of the block and the following element, ex. `titleBlock-title`
- A Modifier should have a double dash between it and the preceding Element, ex. `titleBlock--feature`


Full Example:

```
testCard-image--background
```

Breakdown: `-testCard` (Block camelCased) `-image` (Element Single Dash) `--background` (Modifier Double Dash)

#### Atomic Design

Atomic Design is a useful way of thinking about design systems created by Brad Frost. He has created a methodology composed of five distinct stages to build an interface system in a deliberate a hierarchical manner. These fives stages are:

1. Atoms
1. Molecules
1. Organisms
1. Templates
1. Pages

Here is a breakdown taken from a post on [Atomic Design](http://atomicdesign.bradfrost.com/chapter-2/)

**Atoms** are the base HTML elements like form labels, inputs, buttons, etc that can’t be broken down any further.

**Molecules** are the groupings of the atoms together to create relatively simple groups of UI. A form label and button can be combined to create a simple form.

**Organisms** are relatively complex UI components composed of groups of molecules, atoms or other organisms.

**Templates** are page-level objects that place components into a layout and articulate the design’s underlying content structure.

**Pages** are specific instances of templates with real content in place

#### Utilities

Utilities are *mostly* single rule helpers that are placed on HTML elements that would not otherwise be blocks. These allow us to handle the composition without resulting in duplication.

Alignment is a prime example of this.

```
.u-textLeft {
  text-align: left;
}
.u-textRight {
  text-align: right;
}
```

#### Components
Components are small pieces of code that can be reused across the site—think objects. These general contain Blocks, Elements and Modifiers.

It is important to name these with agnosticism and reusability in mind.

Example:

```
.blockList {
	list-style-type: none;
	margin-bottom: 24px;
}

	.blockList-item {
		display: block;
	}
```

#### Extends
Extends in SCSS can be dangerous, because they alter the cascade in ways you may not expect. It essentially pulls something higher up in the cascade and adds in to a lower component. Use with caution and when you do, only use silent extends.

Example:
```
%baseSpacing {
	margin-bottom: 24px;
}

h1, h2, h3, h4, h5, ul, div, section, main, article {
	@extend %baseSpacing;
}
```


#### Mixins
In addition to being used to handle more complex math and other good things, mixins can be used the same way you would handle extends. Gzip is very good a compressing code that is exactly repeated in this fashion.

Example:

```
@mixin list-reset() {
   margin:  0;
   padding: 0;
   list-style: none;
}

.listInline {
  @include list-reset();

  & > li,
  listInline-item {
    display: inline-block;
  }
}

.listBlock {
  @include list-reset();

  & > li {
    display: block;
  }
}
```

___


### Property Order
Properties should be organized in the following order:

1. Extends (Use with extreme caution. More to come on this)
1. Empty Mixins
1. Positioning
1. Display and Box Model
1. Color
1. Text
1. Other
1. Mixins
1. Media Queries
1. Nested Properties

```
.selector {
  /* Extend */
  @extend %component;

  @include clearfix;

  /* Positioning */
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;

  /* Display & Box Model */
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 10px solid #333333;
  margin: 10px;

  /* Color */
  background: #000000;
  color: #ffffff;

  /* Text */
  font-family: sans-serif;
  line-height: 1.4;
  text-align: right;

  /* Other */
  cursor: pointer;

  /* Mixins */
  @include font-size(16px);

  /* Media query mixin */
  @media only screen (min-width: 800px)
    ...
  }

  .selector-child{
    ...
  }
}
```

___


### Additional Resources
- [SCSS Linter]( https://davidtheclark.com/scss-lint-styleguide/)
- [Fluid Typography](https://olivermak.es/2017/02/fluid-typography/)

___

## Angular Web App Information:
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
