# GPub: A Go Publishing Utility

[![Travis Build Status](https://travis-ci.org/Kashomon/gpub.svg?branch=master)](https://travis-ci.org/Kashomon/gpub)

## Overview

![Marks Demo](/marks-demo.svg)

_Note: GPub is under active development and users may find unexpected API-breaking
changes until a 1.0.0 release occurs_

GPub is a book-generating platform written in JavaScript, with the goal of
quickly making high-quality books without the need for auxilary software.

Currently, I am working to support generating books in 3 formats: PDF (for
print), GoBooks (SmartGo), and EPub (Ebooks).

GPub that relies on the same Go logic that [Glift](www.gliftgo.com) uses. This
library (called [glift-core](github.com/Kashomon/glift-core) is is responsible
for providing an understanding of Go files and generated a flattened
representation of a go position, while GPub is responsible for generating an
intermediate representation and for the ultimate rendering diagrams for print

### Installation

1. Install [LaTeX](http://www.latex-project.org/)
2. Install the GNos Font. For font-installation instructions, see
   [Kashomon/go-type1](https://www.github.com/Kashomon/go-type1). The recommended font
   is gnos.
3. Install [NodeJS](https://nodejs.org/)
4. Use NPM to install `gpub-go`. See
   [GPub-Examples](www.github.com/Kashomon/gpub-examples) for some worked
   examples how to use GPub.

## --Deprecated Information--

**Below is no-longer current information that I need to re-write**

### Book Generation

1. Determine which digarams should be generate for the relevant SGFs. The output
   of this step is a Glift Spec, although most users won't deal with this phase.
2. Generate the Diagrams.
3. Insert the diagrams into the relevant book template.

Note: There are some caveats to this process.

1. All number-marks are removed and replaced with the actual move number marks.
   This might be unintuitive for some users, but this process removes a
   significant amount of human error.

### The Glift Spec

The Glift Spec is an options definition that is consumable by Glift, and is the
intermediate form of the book. Thus, all specs generated by GPub should be
consumable by Glift directly (modulo the addition of a HTML element ID).

The output of spec-generation is configured by the __`Book Purpose`__ option.
Currently gpub supports two book purposes:

  * `GAME_COMMENTARY`: An SGF that has been processed into examples to display commentary in a book form.
  * `PROBLEM_SET`: A set of problems, used to create a book problems (with or without answers).

###  Book Generation

Once we have generated the Glift Spec, we can proceed with the task of
generating a book.   Book generation is configured by the following parameters:

#### Output Format

The __`Output Format`__ represents type of data that GPub produces.  Some currently supported output formats:

  * `LATEX`: The orginal target for GPub. LaTeX itself is an intermediate
    format that uses the TeX compiler to ultimately produce PDF. Diagrams may
    be of multiple types
  * `HTMLPAGE`: Since all Glift Specs are required to be renderable by Glift, we
    can simple create an HTML page embedded with Glift and the glift spec. This
    output type is primarily used for testing. Diagrams don't require any
    processing since Glift is responsible for generating the UI in this case.
  * `ASCII`: A simple ASCII format, possibly RTF, used for testing and editing.
    Diagrams are intended to be generated as ASCII diagrams, or perhaps as
    rasterized images.

#### Diagram Type

__`Diagram Type`__ indicates how diagrams should be rendered. Note that most diagrams
have an intended target output format. It is left as future work to indicate to
the user how the diagram types are restricted.

Various diagram types:

  * `SENSEIS_ASCII`: Generate SENSEIS\_ASCII Images.
  * `GNOS`: Uses the Gnos LaTeX font.
  * `GOOE`: Uses the GOOE LaTeX font
  * `IGO`: Uses the IGO LaTeX font (\*not currently supported).
  * `PDF`: Generate raw PDFs (\*not currently supported).

#### Styling via Markdown
By default, GPub uses
[Markdown](http://daringfireball.net/projects/markdown/syntax) to add styling to
diagram comments via [Marked.js](https://github.com/chjj/marked). In the near
future, all the major output formats will support
custom renderers. See the [Markdown Page](http://daringfireball.net/projects/markdown/syntax)
for more details about the supported syntax.

GPub also uses Markdown to gather diagram-level Metadata. The following headers will be used to generate chapter-data.

    # Foo Bar => Book Foo Bar
    ## Foo Bar => Part Foo Bar
    ### Foo Bar => Chapter Foo Bar

#### Templating and Templating Variables
The basic structure of the output file generated is provided by a template, that
is ultimately rendered by [Mustache.js](https://github.com/janl/mustache.js/).
See the Mustache docs for more information about what is supported.

To override the default template (for the particular output type), set the
options.template variable.

__Note__: We will probably switch to using special tags for LaTeX `<% %>` rather
than the default `{{ }}` brackets, since curly-brackets are used as control
characters in LaTeX

Generally, the structure of a template looks like:

```latex
\documentclass[letterpaper,12pt]{article}
\begin{document}

\title{ {{title%}} }
\author{ {{author}} }

\maketitle

{{content}}

\end{document}
```

This allows the user to specify `title`, and `author`, which is discussed below.
The `content` variable is reserved.

__Reserved Template Variables__

  * `content`

#### Templating Variables

A user may specify template variables in one of two ways:

  1. As JSON within the GC comment of the first SGF.
  2. As keys to the `bookOptions` option.

As per 1., template parameters may be provided embedded with an SGF property as JSON.  For example:

```
GC[{
  "title": "My Book!",
  "authors": ["Kashomon"]
}]
```

Where `GC` is the Game Commentary SGF field.  The field used for metadata storage is
specified in the `glift.parse.sgfMetadataProperty` field.

As per 2., template prameters may also be provided via the gpub API:

```javascript
gpub.create([sgf1, sgf2, ...], {
  bookOptions: {
    title: 'My Book',
    authors: ['Kashomon']
  }
});
```

## Scripts

GPub comes with a numeber of scripts to help with book generation and
renversion. It's usually convenient ta have something like:

```shell
PATH=/Users/kashomon/inprogress/gpub/scripts:$PATH
```

in your `.bashrc` or `.bash_profile`

This will enable you to use:

* `book_gen.js` A script to generate go books.
* `convert_tygem.js` A script to convert Tygem `.gib` files to SGF. Not terribly
  robust; relies on Glift functionality.

### Flags

GPub has a custom flag parsing library (sorry). The format for flags is as follows:

```
--flag_name=value
--foo (boolean only, equivalent to --foo=true)
--nofoo (boolean only, equivalent to --foo=false)
```

*Examples*
```
--debug -- turn debugging on
--nodebug -- turn debugging on
```

### Converting Tygem files to SGF

`convert_tygem.js` converts .gib files into .sgfs (automatically making new sgf
files).

```shell
convert_tygem.js *.gib
```

## Development

To work on / contribute to Gpub, you will need to install 

* NodeJS
* Gulp
* Java.

Then, to install all the deps, you'll need:

```
npm install
```

And then to run the tests:

```
gulp build-test
